-- ============================================================
-- Commercient Academy — upgrade 007
-- Run once in the Supabase SQL Editor, after 006.
-- Seeds the answer key for Commercient Implementation Training
-- and Roadmap (course_id 'implementation', 12 questions,
-- pass 80% = 10/12). Key lives ONLY here / in quiz_keys.
-- ============================================================
insert into public.quiz_keys (course_id, pass_mark, answers) values
  ('implementation', 0.8, array[1,2,0,3,1,2,0,3,1,0,2,1])
on conflict (course_id) do update
  set pass_mark = excluded.pass_mark, answers = excluded.answers;
