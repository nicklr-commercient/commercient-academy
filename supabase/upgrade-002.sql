-- ============================================================
-- Commercient Academy — upgrade 002
-- Run once in the Supabase SQL Editor, after schema.sql (+001).
-- Seeds the answer key for the Agentic Enterprise Fluency
-- Certification (course_id 'fluency', 12 questions, pass 80%).
-- The key lives ONLY here / in quiz_keys — never in the client.
-- ============================================================

insert into public.quiz_keys (course_id, pass_mark, answers) values
  ('fluency', 0.8, array[1,2,0,3,1,2,0,3,1,2,1,0])
on conflict (course_id) do update
  set pass_mark = excluded.pass_mark, answers = excluded.answers;
