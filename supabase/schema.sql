-- ============================================================
-- Commercient Academy — trust spine schema (v1)
-- Paste this whole file into Supabase SQL Editor and run once.
-- Provides: profiles, per-course progress, server-side quiz
-- grading, credential registry, public verification RPC.
-- ============================================================

-- ---------- 1. Profiles (one row per auth user) ----------
create table if not exists public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  email      text not null,
  first_name text,
  last_name  text,
  company    text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- Auto-create a profile row on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email) values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- 2. Progress (per user, per course) ----------
-- done: {"1":true,...} module completion map (mirrors the client shape)
-- quiz: latest attempt summary {passed,score,total,when} (server cred is truth for passes)
create table if not exists public.progress (
  user_id    uuid not null references auth.users(id) on delete cascade,
  course_id  text not null,
  done       jsonb not null default '{}'::jsonb,
  quiz       jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, course_id)
);

alter table public.progress enable row level security;

drop policy if exists "progress_all_own" on public.progress;
create policy "progress_all_own" on public.progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------- 3. Quiz answer keys (server-only, never readable) ----------
create table if not exists public.quiz_keys (
  course_id text primary key,
  pass_mark numeric not null default 0.8,
  answers   int[] not null            -- 0-based correct option index per question
);

alter table public.quiz_keys enable row level security;
-- RLS on + no policies = nobody can read via the API. Only definer functions can.
revoke all on public.quiz_keys from anon, authenticated;

-- Seed: Platform course (25 questions, pass 80%)
insert into public.quiz_keys (course_id, pass_mark, answers) values
  ('platform', 0.8, array[1,0,1,1,2,0,1,1,0,1,1,1,2,0,1,1,1,1,1,1,2,1,2,1,1])
on conflict (course_id) do update
  set pass_mark = excluded.pass_mark, answers = excluded.answers;

-- ---------- 4. Credential registry ----------
create table if not exists public.credentials (
  id            uuid primary key default gen_random_uuid(),
  credential_id text unique not null,          -- e.g. CA-PLAT-2026-1A2B3C
  user_id       uuid not null references auth.users(id) on delete cascade,
  course_id     text not null,
  course_title  text not null,
  badge_name    text not null,
  holder_name   text not null,
  company       text,
  email         text not null,
  score         int not null,
  total         int not null,
  issued_at     timestamptz not null default now(),
  expires_at    timestamptz not null,
  revoked       boolean not null default false
);

alter table public.credentials enable row level security;

drop policy if exists "credentials_select_own" on public.credentials;
create policy "credentials_select_own" on public.credentials
  for select using (auth.uid() = user_id);
-- Inserts happen only inside grade_quiz (security definer). No client writes.

-- ---------- 5. grade_quiz RPC ----------
-- Grades server-side, updates the profile name/company, issues (or returns
-- the existing valid) credential on pass. Returns per-question right/wrong
-- booleans but NEVER the answer key.
create or replace function public.grade_quiz(
  p_course_id    text,
  p_answers      int[],       -- learner's 0-based picks, -1 or null = unanswered
  p_first        text,
  p_last         text,
  p_company      text,
  p_course_title text,
  p_badge_name   text
) returns jsonb
language plpgsql security definer set search_path = public as $$
declare
  k          record;
  v_total    int;
  v_correct  int := 0;
  v_results  boolean[] := '{}';
  v_passed   boolean;
  v_uid      uuid := auth.uid();
  v_email    text;
  v_cred     record;
  v_cred_id  text;
  v_ok       boolean;
  i          int;
begin
  if v_uid is null then
    raise exception 'You must be signed in to take a certification quiz.';
  end if;

  select * into k from quiz_keys where course_id = p_course_id;
  if not found then
    raise exception 'No quiz is registered for course "%".', p_course_id;
  end if;

  v_total := array_length(k.answers, 1);
  for i in 1..v_total loop
    v_ok := (i <= coalesce(array_length(p_answers, 1), 0))
            and p_answers[i] is not null
            and p_answers[i] = k.answers[i];
    if v_ok then v_correct := v_correct + 1; end if;
    v_results := v_results || v_ok;
  end loop;

  v_passed := v_correct::numeric / v_total >= k.pass_mark;

  select email into v_email from profiles where id = v_uid;

  update profiles
     set first_name = coalesce(nullif(trim(p_first), ''), first_name),
         last_name  = coalesce(nullif(trim(p_last), ''), last_name),
         company    = coalesce(nullif(trim(p_company), ''), company),
         updated_at = now()
   where id = v_uid;

  -- persist latest attempt summary
  insert into progress (user_id, course_id, quiz, updated_at)
  values (v_uid, p_course_id,
          jsonb_build_object('passed', v_passed, 'score', v_correct,
                             'total', v_total, 'when',
                             (extract(epoch from now()) * 1000)::bigint),
          now())
  on conflict (user_id, course_id) do update
    set quiz = excluded.quiz, updated_at = now();

  if v_passed then
    select * into v_cred
      from credentials
     where user_id = v_uid and course_id = p_course_id
       and not revoked and expires_at > now()
     order by issued_at desc limit 1;

    if not found then
      v_cred_id := 'CA-' || upper(left(p_course_id, 4)) || '-'
                   || to_char(now(), 'YYYY') || '-'
                   || upper(substr(md5(v_uid::text || p_course_id || clock_timestamp()::text), 1, 6));
      insert into credentials
        (credential_id, user_id, course_id, course_title, badge_name,
         holder_name, company, email, score, total, issued_at, expires_at)
      values
        (v_cred_id, v_uid, p_course_id, p_course_title, p_badge_name,
         trim(p_first) || ' ' || trim(p_last), nullif(trim(p_company), ''),
         v_email, v_correct, v_total, now(), now() + interval '1 year')
      returning * into v_cred;
    end if;
  end if;

  return jsonb_build_object(
    'correct', v_correct,
    'total',   v_total,
    'passed',  v_passed,
    'results', to_jsonb(v_results),
    'credential', case when v_passed then jsonb_build_object(
        'credential_id', v_cred.credential_id,
        'holder_name',   v_cred.holder_name,
        'company',       v_cred.company,
        'score',         v_cred.score,
        'total',         v_cred.total,
        'issued_at',     v_cred.issued_at,
        'expires_at',    v_cred.expires_at
      ) else null end
  );
end $$;

revoke all on function public.grade_quiz from public, anon;
grant execute on function public.grade_quiz to authenticated;

-- ---------- 6. Public credential verification ----------
-- Exact-ID lookup only (no listing/enumeration). Safe for anonymous use;
-- this is what the public verify page and LinkedIn certUrl hit.
create or replace function public.verify_credential(p_credential_id text)
returns jsonb
language plpgsql security definer set search_path = public stable as $$
declare c record;
begin
  select credential_id, holder_name, company, course_title, badge_name,
         issued_at, expires_at, revoked
    into c
    from credentials
   where upper(credential_id) = upper(trim(p_credential_id));

  if not found then
    return jsonb_build_object('found', false);
  end if;

  return jsonb_build_object(
    'found', true,
    'credential_id', c.credential_id,
    'holder_name',   c.holder_name,
    'company',       c.company,
    'course_title',  c.course_title,
    'badge_name',    c.badge_name,
    'issued_at',     c.issued_at,
    'expires_at',    c.expires_at,
    'status', case when c.revoked then 'revoked'
                   when c.expires_at < now() then 'expired'
                   else 'valid' end
  );
end $$;

grant execute on function public.verify_credential to anon, authenticated;
