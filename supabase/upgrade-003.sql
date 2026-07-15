-- ============================================================
-- Commercient Academy — upgrade 003
-- Run once in the Supabase SQL Editor, after 002.
-- Seeds the answer key for the Commercient Portal Certification
-- (course_id 'portal', 13 questions, pass 80% = 11/13).
-- The key lives ONLY here / in quiz_keys — never in the client.
-- ============================================================

insert into public.quiz_keys (course_id, pass_mark, answers) values
  ('portal', 0.8, array[2,0,1,0,2,1,0,3,1,0,2,1,3])
on conflict (course_id) do update
  set pass_mark = excluded.pass_mark, answers = excluded.answers;
