-- ============================================================
-- Commercient Academy — upgrade 005
-- Run once in the Supabase SQL Editor.
-- REPLACES the answer key for the rebuilt Commercient AI & Data Lake
-- Platform Certification (course_id 'platform'). Rebuilt from Nick's new
-- source: 19 modules (each with a knowledge check) + a 45-question,
-- 6-section quiz. Pass 80% = 36 of 45. Key lives ONLY here / in quiz_keys.
-- ============================================================

insert into public.quiz_keys (course_id, pass_mark, answers) values
  ('platform', 0.8, array[2,0,1,2,0,1,3,3,0,0,1,1,2,0,1,0,2,1,1,0,3,1,0,0,2,2,3,2,0,3,0,3,0,1,2,0,0,0,1,2,1,3,0,1,2])
on conflict (course_id) do update
  set pass_mark = excluded.pass_mark, answers = excluded.answers;
