-- ============================================================
-- Commercient Academy — upgrade 004
-- Run once in the Supabase SQL Editor, after 003.
-- Seeds the answer key for the Commercient Customer Panel
-- Certification (course_id 'customer-panel', 13 questions,
-- pass 80% = 11/13). The key lives ONLY here / in quiz_keys.
-- ============================================================

insert into public.quiz_keys (course_id, pass_mark, answers) values
  ('customer-panel', 0.8, array[2,0,1,2,2,0,1,3,0,1,0,2,1])
on conflict (course_id) do update
  set pass_mark = excluded.pass_mark, answers = excluded.answers;
