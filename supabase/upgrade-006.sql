-- ============================================================
-- Commercient Academy — upgrade 006
-- Run once in the Supabase SQL Editor, after 005.
-- Seeds the answer key for the External Agent Setup Certification
-- (course_id 'external-agent', 12 questions, pass 80% = 10/12).
-- Key lives ONLY here / in quiz_keys.
-- ============================================================
insert into public.quiz_keys (course_id, pass_mark, answers) values
  ('external-agent', 0.8, array[0,1,2,1,1,2,0,2,1,2,0,2])
on conflict (course_id) do update
  set pass_mark = excluded.pass_mark, answers = excluded.answers;
