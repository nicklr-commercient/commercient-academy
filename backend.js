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

  /* ---------- marketing lead capture (HubSpot form, fire-and-forget) ----------
     Posts Academy sign-ups to a HubSpot form via the public Forms API v3 —
     no tokens or secrets involved; a form submission endpoint is public by
     design. HubSpot dedupes by email, so firing at sign-in (email only) and
     again at quiz registration (full name + company) upgrades one contact.
     Disabled until HUBSPOT_PORTAL_ID + HUBSPOT_FORM_GUID are set in config.js.
     MUST never block or break the learner flow — every failure is swallowed. */
  function lead(fields){
    try{
      const c = cfg();
      if(!c.HUBSPOT_PORTAL_ID || !c.HUBSPOT_FORM_GUID || !fields || !fields.email) return;
      const url = 'https://api.hsforms.com/submissions/v3/integration/submit/'
                + c.HUBSPOT_PORTAL_ID + '/' + c.HUBSPOT_FORM_GUID;
      const map = { email: 'email', first: 'firstname', last: 'lastname', company: 'company' };
      const payload = {
        fields: Object.keys(map).filter(k => fields[k])
                  .map(k => ({ objectTypeId: '0-1', name: map[k], value: fields[k] })),
        context: { pageUri: (c.SITE_URL || location.origin) + '/', pageName: 'Commercient Academy' }
      };
      fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' },
                   body: JSON.stringify(payload) }).catch(()=>{});
    }catch(e){ /* lead capture must never break the app */ }
  }

  return { init, enabled, user, profile, refreshProfile, onChange,
           signIn, signOut, fetchProgress, pushProgress,
           gradeQuiz, fetchCredentials, verifyUrl, lead };
})();
window.Backend = Backend; // top-level const doesn't create a window property
