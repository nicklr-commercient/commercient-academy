/* Commercient Academy — backend adapter.
   ─────────────────────────────────────────────────────────────
   AUTH IS A SWAPPABLE LAYER. Today this uses Supabase magic-link
   sign-in as a stand-in. When the Academy is embedded in the
   Commercient admin panel, replace ONLY the auth section (signIn/
   signOut/session wiring) with the panel's SSO handoff — progress
   sync, quiz grading, and the credential registry stay the same.
   Exposes a single global: `Backend`.
   ───────────────────────────────────────────────────────────── */
const Backend = (function(){
  let sb = null;            // supabase client
  let curUser = null;       // supabase auth user
  let curProfile = null;    // row from public.profiles
  const changeCbs = [];

  function cfg(){ return window.ACADEMY_CONFIG || {}; }
  function enabled(){ return !!sb; }
  function user(){ return curUser; }
  function profile(){ return curProfile; }
  function onChange(cb){ changeCbs.push(cb); }
  function emit(){ changeCbs.forEach(cb=>{ try{ cb(); }catch(e){ console.error(e); } }); }

  function init(){
    const c = cfg();
    if(!window.supabase || !c.SUPABASE_URL || !c.SUPABASE_ANON_KEY ||
       c.SUPABASE_URL.indexOf('PASTE_') === 0) return false;
    sb = window.supabase.createClient(c.SUPABASE_URL, c.SUPABASE_ANON_KEY);
    sb.auth.onAuthStateChange(async (_evt, session)=>{
      const u = session ? session.user : null;
      const changed = (u && u.id) !== (curUser && curUser.id);
      curUser = u;
      if(!u){ curProfile = null; if(changed) emit(); return; }
      if(changed){ curProfile = await fetchProfile(); emit(); }
    });
    return true;
  }

  /* ---------- auth (the swappable part) ---------- */
  async function signIn(email){
    const { error } = await sb.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: location.origin + location.pathname }
    });
    if(error) throw new Error(error.message);
  }
  async function signOut(){ await sb.auth.signOut(); }

  /* ---------- profile ---------- */
  async function fetchProfile(){
    if(!curUser) return null;
    const { data } = await sb.from('profiles').select('*').eq('id', curUser.id).maybeSingle();
    return data || null;
  }
  async function refreshProfile(){ curProfile = await fetchProfile(); return curProfile; }

  /* ---------- progress sync ---------- */
  async function fetchProgress(){
    if(!curUser) return [];
    const { data, error } = await sb.from('progress').select('course_id,done,quiz');
    if(error){ console.error('fetchProgress', error); return []; }
    return data || [];
  }
  // coursesMap: { [courseId]: {done, quiz, ...} } — pushes a clean snapshot.
  async function pushProgress(coursesMap){
    if(!curUser) return;
    const rows = Object.keys(coursesMap).map(id=>{
      const c = coursesMap[id];
      const quiz = c.quiz ? { passed: !!c.quiz.passed, score: c.quiz.score,
                              total: c.quiz.total, when: c.quiz.when } : null;
      return { user_id: curUser.id, course_id: id,
               done: c.done || {}, quiz, updated_at: new Date().toISOString() };
    });
    if(!rows.length) return;
    const { error } = await sb.from('progress').upsert(rows);
    if(error) console.error('pushProgress', error);
  }

  /* ---------- quiz grading + credentials (server-side) ---------- */
  async function gradeQuiz(course, answers, reg){
    if(!curUser) throw new Error('You must be signed in to take a certification quiz.');
    const { data, error } = await sb.rpc('grade_quiz', {
      p_course_id: course.id,
      p_answers: answers,
      p_first: (reg && reg.first) || '',
      p_last: (reg && reg.last) || '',
      p_company: (reg && reg.company) || '',
      p_course_title: course.title,
      p_badge_name: course.badge.name
    });
    if(error) throw new Error(error.message || 'Grading failed — please try again.');
    return data; // {correct,total,passed,results[],credential|null}
  }
  async function fetchCredentials(){
    if(!curUser) return [];
    const { data, error } = await sb.from('credentials')
      .select('credential_id,cred_no,course_id,course_title,badge_name,holder_name,company,email,score,total,issued_at,expires_at,revoked')
      .eq('revoked', false);
    if(error){ console.error('fetchCredentials', error); return []; }
    return data || [];
  }

  function verifyUrl(credId){
    const base = (cfg().SITE_URL || location.origin).replace(/\/$/,'');
    return base + '/verify.html?id=' + encodeURIComponent(credId);
  }

  return { init, enabled, user, profile, refreshProfile, onChange,
           signIn, signOut, fetchProgress, pushProgress,
           gradeQuiz, fetchCredentials, verifyUrl };
})();
window.Backend = Backend; // top-level const doesn't create a window property
