/* Commercient Academy — app logic
   Multi-course: academy home (catalog) → course → module/quiz/certificate.
   Progress is stored per-course under cpa_progress_v2 and migrates v1. */
(function(){
  const LS_KEY = "cpa_progress_v2";
  const LS_LEGACY = "cpa_progress_v1";
  let progress = load();

  function blankCourse(){ return {done:{}, quiz:null, reg:null, emailed:false}; }
  function load(){
    try{
      const v2 = JSON.parse(localStorage.getItem(LS_KEY));
      if(v2 && v2.courses) return v2;
    }catch(e){}
    // migrate the single-course v1 blob into the platform course
    const p = {courses:{}};
    try{
      const v1 = JSON.parse(localStorage.getItem(LS_LEGACY));
      if(v1) p.courses.platform = {done:v1.done||{}, quiz:v1.quiz||null, reg:v1.reg||null, emailed:!!v1.emailed};
    }catch(e){}
    return p;
  }
  function save(){ try{ localStorage.setItem(LS_KEY, JSON.stringify(progress)); }catch(e){} schedulePush(); }
  function cs(id){ if(!progress.courses[id]) progress.courses[id]=blankCourse(); return progress.courses[id]; }

  /* ---------- Account sync (Backend adapter — see backend.js) ----------
     Local-first: localStorage stays the working copy; signed-in users get
     it mirrored to their account (debounced push, merge on sign-in). */
  let pushT = null;
  function schedulePush(){
    if(!window.Backend || !Backend.enabled() || !Backend.user()) return;
    clearTimeout(pushT);
    pushT = setTimeout(()=>Backend.pushProgress(progress.courses), 800);
  }
  async function syncFromServer(){
    const [rows, creds] = await Promise.all([Backend.fetchProgress(), Backend.fetchCredentials()]);
    rows.forEach(r=>{
      const c = cs(r.course_id);
      c.done = Object.assign({}, r.done||{}, c.done);
      const sq = r.quiz;
      const better = sq && (!c.quiz || (sq.passed && !c.quiz.passed) ||
        (!!sq.passed === !!(c.quiz && c.quiz.passed) && (sq.when||0) > ((c.quiz && c.quiz.when)||0)));
      if(better) c.quiz = Object.assign({}, c.quiz, sq);
    });
    creds.forEach(cr=>{
      const c = cs(cr.course_id);
      if(!c.quiz || !c.quiz.passed)
        c.quiz = {passed:true, score:cr.score, total:cr.total, when:new Date(cr.issued_at).getTime()};
      c.quiz.cred = cr;
      if(!c.reg){
        const p = Backend.profile() || {};
        c.reg = {first:p.first_name||'', last:p.last_name||'', company:p.company||cr.company||'', email:cr.email};
      }
    });
    save();
  }

  /* ---------- Gamification: XP, levels, Charlie ----------
     XP is derived from progress (never stored) so it can't drift across
     devices. Levels are the credential ladder — earned by certifications.
     Charlie is the journey guide: he appears on the path, NEVER on the
     certificate or badge (those stay clean and professional). */
  function certCount(){ return COURSES.filter(c=>c.status==='available' && isCertified(c)).length; }
  function totalXP(){
    let xp = 0;
    COURSES.filter(c=>c.status==='available').forEach(c=>{
      const s = cs(c.id);
      xp += Object.keys(s.done||{}).filter(k=>s.done[k]).length * GAME.xpModule;
      if(s.quiz && s.quiz.passed) xp += GAME.xpCert;
    });
    return xp;
  }
  function curLevel(){
    const n = certCount(); let l = GAME.levels[0];
    GAME.levels.forEach(L=>{ if(n >= L.certs) l = L; });
    return l;
  }
  function nextLevel(){
    const n = certCount();
    return GAME.levels.find(L=>L.certs > n) || null;
  }
  function xpChipHTML(){
    const l = curLevel(), nxt = nextLevel(), certs = certCount();
    const next = nxt ? `<span class="xp-next">${nxt.certs - certs} cert${nxt.certs-certs>1?'s':''} to ${nxt.name.replace('Certified ','')}</span>` : '';
    return `<div class="sb-xp" data-go="achievements" title="View My Achievements">
      <span class="xp-ico">${icon(l.icon)}</span>
      <span class="xp-main"><b>${l.name}</b><em>${icon('zap','ic-xs')} ${totalXP()} XP</em>${next}</span>
    </div>`;
  }
  function xpToast(amount, label){
    const t = document.createElement('div');
    t.className = 'xp-toast';
    t.innerHTML = `<b>+${amount} XP</b>${label?` <span>${label}</span>`:''}`;
    document.body.appendChild(t);
    requestAnimationFrame(()=>t.classList.add('show'));
    setTimeout(()=>{ t.classList.remove('show'); setTimeout(()=>t.remove(), 400); }, 2400);
  }
  /* Charlie's gear — milestone cosmetics unlocked by certifications (the
     credentials table is the server-side truth, so unlocks can't be farmed).
     Overlays are optional PNGs in assets/charlie/ — a missing file simply
     doesn't render (onerror), and the whole feature stays hidden until the
     first gear asset exists (gear-ready flag set at init). Guardrail applies:
     gear lives on Charlie, on the journey — never on the credential. */
  const GEAR = [
    { certs: 1, slot: 'hat',    src: 'assets/charlie/gear-hat.png',    name: 'Graduation cap' },
    { certs: 2, slot: 'shades', src: 'assets/charlie/gear-shades.png', name: 'Sunglasses' },
    { certs: 3, slot: 'pet',    src: 'assets/charlie/gear-pet.png',    name: 'Robo-pup' }
  ];
  function gearUnlocked(){ const n = certCount(); return GEAR.filter(g => n >= g.certs); }
  function charlieHTML(msg, cls){
    const gear = gearUnlocked().map(g =>
      `<img class="charlie-gear ${g.slot}" src="${g.src}" alt="" onerror="this.remove()">`).join('');
    return `<div class="charlie ${cls||''}">
      <span class="charlie-avatar"><img class="charlie-img" src="assets/charlie.png" alt="Charlie" onerror="this.closest('.charlie').classList.add('noimg')">${gear}</span>
      <div class="charlie-bubble">${msg}</div>
    </div>`;
  }

  /* ---------- Icon system ----------
     Inline SVGs, stroke = currentColor, so they inherit brand colors from
     CSS. Replaces emoji everywhere (emoji render inconsistently across OSes
     and read consumer-grade — wrong signal for an enterprise credential). */
  const ICONS = {
    handshake:`<circle cx="8.5" cy="12" r="5.5"/><circle cx="15.5" cy="12" r="5.5"/>`,
    building:`<rect x="5" y="3" width="14" height="18" rx="1.5"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"/><path d="M10 21v-3h4v3"/>`,
    compass:`<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5 13.5 13.5 8.5 15.5 10.5 10.5Z"/>`,
    code:`<path d="m8 8-4.5 4L8 16"/><path d="m16 8 4.5 4L16 16"/><path d="m13 5-2 14"/>`,
    gradcap:`<path d="M12 4 22 9l-10 5L2 9Z"/><path d="M6.5 11.5V16c0 1.5 2.5 3 5.5 3s5.5-1.5 5.5-3v-4.5"/><path d="M22 9v5"/>`,
    coins:`<path d="M12 2.5v19"/><path d="M17 5.5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>`,
    clock:`<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>`,
    star:`<path d="M12 2.5l2.94 5.95 6.57.96-4.75 4.63 1.12 6.54L12 17.5l-5.88 3.08 1.12-6.54-4.75-4.63 6.57-.96Z"/>`,
    medal:`<path d="M9 9.8 6.7 3M15 9.8 17.3 3M10.5 3l1.5 4.4L13.5 3"/><circle cx="12" cy="14.5" r="5.5"/><path d="m12 12.5.9 1.8 2 .3-1.45 1.4.35 2-1.8-.95-1.8.95.35-2-1.45-1.4 2-.3Z"/>`,
    trophy:`<path d="M7 3h10v6a5 5 0 0 1-10 0Z"/><path d="M7 5H4a2.5 2.5 0 0 0 2.7 4M17 5h3a2.5 2.5 0 0 1-2.7 4"/><path d="M12 14v4"/><path d="M8 21h8M9 18h6"/>`,
    lock:`<rect x="5.5" y="10.5" width="13" height="9.5" rx="2"/><path d="M8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3"/>`,
    shield:`<path d="M12 2.5 19.5 5v5.7c0 4.6-3.1 8.1-7.5 10.3-4.4-2.2-7.5-5.7-7.5-10.3V5Z"/><path d="m8.8 11.6 2.3 2.3 4.1-4.2"/>`,
    zap:`<path d="M13 2.5 4.5 13.5H11L10 21.5l8.5-11H12.5Z"/>`,
    arrow:`<path d="M4 12h15"/><path d="m13 6 6 6-6 6"/>`,
    menu:`<path d="M4 7h16M4 12h16M4 17h16"/>`,
    linkedin:`<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10.5V17M8 7.2v.1M12 17v-3.8a2.4 2.4 0 0 1 4.8 0V17" />`
  };
  function icon(name, cls){
    return `<svg class="ic ${cls||''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]||ICONS.star}</svg>`;
  }

  /* One-off celebration on the JOURNEY (quiz pass) — never on the
     certificate page, which stays corporate (see HANDOFF guardrail). */
  function confettiBurst(){
    const colors = ['#29ABE2','#1B3A5C','#7BA7C8','#4caf7d','#B8D4E4'];
    const holder = document.createElement('div');
    holder.className = 'confetti';
    for(let i=0;i<48;i++){
      const p = document.createElement('i');
      p.style.left = (8+Math.random()*84)+'%';
      p.style.background = colors[i%colors.length];
      p.style.animationDelay = (Math.random()*0.35)+'s';
      p.style.animationDuration = (1.1+Math.random()*0.9)+'s';
      p.style.transform = `rotate(${Math.random()*360}deg)`;
      holder.appendChild(p);
    }
    document.body.appendChild(holder);
    setTimeout(()=>holder.remove(), 2600);
  }

  /* ---------- Course helpers ---------- */
  const courseById = id => COURSES.find(c=>c.id===id);
  let cur = null;          // current course object
  let order = [];          // [moduleId..., 'quiz'] for current course

  function setCourse(id){
    cur = courseById(id) || COURSES[0];
    order = [];
    cur.groups && cur.groups.forEach(g=>g.modules.forEach(m=>order.push(m)));
  }
  function moduleById(mid){ return cur.modules.find(m=>m.id===mid); }
  function totalUnits(){ return cur.modules.length + 1; }
  function st(){ return cs(cur.id); }
  function completedCount(){
    const s = st();
    return cur.modules.filter(m=>s.done[m.id]).length + (s.quiz && s.quiz.passed ? 1 : 0);
  }
  function coursePct(c){
    const s = cs(c.id);
    if(c.status!=='available') return 0;
    const total = c.modules.length + 1;
    const done = c.modules.filter(m=>s.done[m.id]).length + (s.quiz && s.quiz.passed ? 1 : 0);
    return Math.round(done/total*100);
  }
  function isCertified(c){ const s=cs(c.id); return !!(s.quiz && s.quiz.passed); }

  function goName(item){ return item==='quiz' ? 'quiz' : 'm:'+item; }
  function nextItem(id){ const i=order.indexOf(id); return i>=0 && i<order.length-1 ? order[i+1] : null; }
  function prevItem(id){ const i=order.indexOf(id); return i>0 ? order[i-1] : null; }

  const main = document.getElementById('main');
  const sb = document.getElementById('sidebar');

  /* ---------- Sidebar ---------- */
  function renderSidebarHome(){
    let html = `<div class="sb-title">${ACADEMY.name}</div>
      <div class="sb-tag">Commercient AI, certified.</div>
      ${xpChipHTML()}
      <div class="sb-group"><h4>Courses</h4>`;
    COURSES.forEach(c=>{
      const soon = c.status!=='available';
      const pct = coursePct(c);
      const certified = isCertified(c);
      html += `<div class="sb-item ${certified?'done':''}" data-go="${soon?'home':'c:'+c.id}">
        <span class="dot"></span>
        <span>${c.title}${soon?' <em class="soon-tag">Soon</em>':(pct?` <em class="pct">${pct}%</em>`:'')}</span></div>`;
    });
    html += `</div>`;
    sb.innerHTML = html;
    bindSb();
  }
  function renderSidebarCourse(active){
    const pct = Math.round(completedCount()/totalUnits()*100);
    let html = `<div class="sb-crumb" data-go="home">&larr; All courses</div>
      <div class="sb-title">${cur.title}</div>
      <div class="sb-progress"><div class="sb-bar"><i style="width:${pct}%"></i></div></div>
      <div class="sb-count">${completedCount()} of ${totalUnits()} complete</div>
      ${xpChipHTML()}`;
    cur.groups.forEach(g=>{
      html += `<div class="sb-group"><h4>${g.name}</h4>`;
      g.modules.forEach(id=>{
        if(id==='quiz'){
          const done = st().quiz && st().quiz.passed;
          html += item('quiz','Certification Quiz', done, active==='quiz');
          if(done) html += item('cert', `${icon('medal','ic-inline')} Your Certificate`, false, active==='cert');
        }else{
          const m = moduleById(id);
          html += item('m:'+id, `Module ${id} — ${m.title}`, !!st().done[id], active==='m:'+id);
        }
      });
      html += `</div>`;
    });
    sb.innerHTML = html;
    bindSb();
  }
  function item(go,label,done,isActive){
    return `<div class="sb-item ${done?'done':''} ${isActive?'active':''}" data-go="${go}"><span class="dot"></span><span>${label}</span></div>`;
  }
  function bindSb(){ sb.querySelectorAll('[data-go]').forEach(wireGo); }

  /* ---------- Academy home / catalog ---------- */
  // First not-yet-done unit of a course → the deep link "Resume" should land on.
  function firstIncomplete(c){
    const s = cs(c.id);
    for(const g of c.groups) for(const id of g.modules){
      if(id==='quiz'){ if(!(s.quiz && s.quiz.passed)) return 'quiz:'+c.id; }
      else if(!s.done[id]) { setCourse(c.id); return 'm:'+id; }
    }
    return 'c:'+c.id;
  }

  function renderHome(){
    cur = null;
    const aud = ACADEMY.audiences.map(a=>
      `<div class="aud-card"><div class="aud-ic">${icon(a.icon)}</div><h4>${a.title}</h4><p>${a.desc}</p></div>`).join('');

    // "Continue where you left off" — the single highest-value action for a
    // returning learner, so it gets its own strip above the catalog.
    const inProg = COURSES.filter(c=>c.status==='available' && !isCertified(c) && coursePct(c)>0);
    const resume = inProg.length ? `
      <section class="block">
        <div class="resume-strip">
          <div class="resume-ring" style="--p:${coursePct(inProg[0])}"><b>${coursePct(inProg[0])}%</b></div>
          <div class="resume-main">
            <p class="eyebrow">Continue where you left off</p>
            <h3>${inProg[0].title}</h3>
          </div>
          <button class="cta" data-go="${firstIncomplete(inProg[0])}">Resume ${icon('arrow','ic-btn')}</button>
        </div>
      </section>` : '';

    const earned = COURSES.filter(isCertified);
    const badgeStrip = earned.length ? `
      <section class="block">
        <h2>Your badges</h2>
        <p class="lead">Earned credentials — share them and show your authority.</p>
        <div class="badge-strip">${earned.map(c=>`<div class="badge-link" data-go="cert:${c.id}">${badgeHTML(c,'sm')}</div>`).join('')}</div>
      </section>` : '';

    const tiles = COURSES.map(c=>{
      const soon = c.status!=='available';
      const pct = coursePct(c);
      const certified = isCertified(c);
      const cta = soon ? `<span class="tile-soon">Coming soon</span>`
        : `<button class="cta" data-go="c:${c.id}">${certified?'Review course':(pct?'Continue':'Start course')}</button>`;
      const prog = (!soon && pct>0 && !certified) ? `<div class="tile-bar"><i style="width:${pct}%"></i></div>` : '';
      const cert = certified ? `<span class="tile-badge">✓ Certified</span>` : '';
      return `<div class="course-tile ${soon?'soon':''}">
        <div class="tile-top">
          <img class="tile-mark ${c.badge&&c.badge.img?'is-badge':''}" src="${(c.badge&&c.badge.img)||c.icon}" onerror="this.onerror=null;this.classList.remove('is-badge');this.src='${c.icon}'">
          ${soon?`<span class="tile-tag">In development</span>`:cert}
        </div>
        <h3>${c.title}</h3>
        <p class="tile-aud">${c.audience}</p>
        <p class="tile-desc">${c.tagline}</p>
        <div class="callout money tile-money">${icon('coins','ic-money')}<strong>${c.payoffShort||c.payoff||''}</strong></div>
        ${prog}
        <div class="tile-foot"><span class="tile-time">${icon('clock','ic-xs')} ${c.estTime}</span>${cta}</div>
      </div>`;
    }).join('');

    const anyProgress = inProg.length || earned.length;
    main.innerHTML = `
      <div class="page">
      <div class="hero home-hero">
        <div class="circle"></div><div class="circle c2"></div>
        <div class="hero-inner">
          <p class="eyebrow">${ACADEMY.name}</p>
          <h1>${ACADEMY.headline}</h1>
          <p>${ACADEMY.intro}</p>
          <button class="cta hero-cta" data-go="${anyProgress?'achievements':'c:'+COURSES[0].id}">${anyProgress?'View my progress':'Start free'} ${icon('arrow','ic-btn')}</button>
          <div class="hero-trust">
            <span>${icon('shield','ic-xs')} Verifiable credentials</span>
            <span>${icon('linkedin','ic-xs')} LinkedIn-ready badges</span>
            <span>${icon('zap','ic-xs')} Free &amp; self-paced</span>
          </div>
        </div>
      </div>

      ${resume}

      <section class="block">
        <h2>Who is this for?</h2>
        <p class="lead">Whoever you are, it's for you. Pick the angle that fits and start earning from Commercient AI.</p>
        <div class="aud-grid">${aud}</div>
      </section>

      <section class="block money-band">
        <div class="money-ic">${icon('coins')}</div>
        <div><h2>${ACADEMY.payoff.title}</h2>
        <p>${ACADEMY.payoff.body}</p></div>
      </section>

      <section class="block">
        <h2>Course catalog</h2>
        <p class="lead">Self-paced certifications. Start free, earn a badge, get paid for the skill.</p>
        <div class="catalog">${tiles}</div>
      </section>

      ${badgeStrip}
      </div>`;
    bindGo();
    renderSidebarHome();
    window.scrollTo(0,0);
  }

  /* ---------- My Achievements ---------- */
  function renderAchievements(){
    cur = null;
    const avail = COURSES.filter(c=>c.status==='available');
    const completed=[], certInProg=[], courseInProg=[];
    avail.forEach(c=>{
      const s = cs(c.id);
      if(s.quiz && s.quiz.passed) completed.push(c);
      else if(s.reg || (s.quiz && !s.quiz.passed)) certInProg.push(c);   // reached the quiz/registration
      else if(Object.keys(s.done||{}).length) courseInProg.push(c);       // some modules done
    });

    const badgeCard = c=>`<div class="badge-link" data-go="cert:${c.id}" title="View your ${c.badge.name} certificate">${badgeHTML(c,'')}</div>`;
    const progRow = (c, sub, goto)=>{
      const pct = coursePct(c);
      return `<div class="ach-row">
        <img class="ach-ico" src="${c.icon}" onerror="this.style.display='none'">
        <div class="ach-row-main">
          <h4>${c.title}</h4>
          <div class="ach-bar"><i style="width:${pct}%"></i></div>
          <span class="ach-meta">${pct}% complete · ${sub}</span>
        </div>
        <button class="cta ghost" data-go="${goto}">Resume</button>
      </div>`;
    };

    const lvl = curLevel(), nxt = nextLevel(), certs = certCount();
    const ladder = GAME.levels.map(L=>{
      const reached = certs >= L.certs;
      const isCur = L.name === lvl.name;
      return `<div class="lvl ${reached?'reached':''} ${isCur?'current':''}">
        <span class="lvl-ico">${icon(L.icon)}</span>
        <span class="lvl-name">${L.name}</span>
        <span class="lvl-req">${L.certs === 0 ? 'Join the Academy' : `${L.certs} certification${L.certs>1?'s':''}`}</span>
      </div>`;
    }).join('<span class="lvl-link"></span>');

    main.innerHTML = `<div class="page">
      <div class="hero sm"><div class="hero-inner"><p class="eyebrow">${ACADEMY.name}</p><h1>My Achievements</h1></div></div>

      <section class="block">
        <div class="level-panel">
          <div class="level-now">
            <span class="lvl-ico big">${icon(lvl.icon)}</span>
            <div><p class="eyebrow">Your level</p><h3>${lvl.name}</h3>
            <span class="lvl-xp">${totalXP()} XP · ${certs} certification${certs===1?'':'s'}</span></div>
          </div>
          <div class="ladder">${ladder}</div>
          ${nxt ? `<p class="lvl-next">Next: <b>${nxt.name}</b> — ${nxt.certs - certs} more certification${nxt.certs-certs>1?'s':''} to go.</p>` : `<p class="lvl-next">Top of the ladder — every certification in the catalog is yours.</p>`}
          <div class="gear-row"><span class="gear-label">Charlie's gear</span>${GEAR.map(g=>{
            const un = certs >= g.certs;
            return `<span class="gear-chip ${un?'on':''}">${un?'&#10003;':icon('lock','ic-xs')} ${g.name}${un?'':` &middot; ${g.certs} cert${g.certs>1?'s':''}`}</span>`;
          }).join('')}</div>
        </div>
      </section>

      <section class="block">
        <h2>Certifications completed</h2>
        ${completed.length
          ? `<p class="lead">Click a badge to view, download, or share its certificate.</p><div class="badge-strip">${completed.map(badgeCard).join('')}</div>`
          : charlieHTML(`No badges yet — but your first one is closer than you think. Pick a course from the catalog and I'll walk you through it.`)}
      </section>

      ${certInProg.length ? `<section class="block">
        <h2>Certifications in progress</h2>
        ${certInProg.map(c=>progRow(c,'at the certification quiz','quiz:'+c.id)).join('')}
      </section>` : ''}

      <section class="block">
        <h2>Courses in progress</h2>
        ${courseInProg.length
          ? courseInProg.map(c=>progRow(c,'in progress','c:'+c.id)).join('')
          : `<p class="lead empty">No courses underway. <a href="#" data-go="home">Browse the catalog &rarr;</a></p>`}
      </section>
      </div>`;
    bindGo();
    renderSidebarHome();
    window.scrollTo(0,0);
  }

  /* ---------- Course overview ---------- */
  function renderCourse(){
    const s = st();
    const started = completedCount()>0;
    const pct = Math.round(completedCount()/totalUnits()*100);
    let road = cur.roadmap.map(r=>`<div class="rm-card"><div class="step">Step ${r.step}</div><h4>${r.title}</h4><p>${r.desc}</p></div>`).join('');
    let learn = cur.learn.map(l=>`<div class="li"><span class="ck">&#10003;</span><span>${l}</span></div>`).join('');
    const firstMod = cur.groups[0].modules[0];
    const certified = isCertified(cur);
    const resumeGo = started && !certified ? firstIncomplete(cur) : 'm:'+firstMod;
    main.innerHTML = `
      <div class="page">
      <div class="hero">
        <div class="circle"></div><div class="circle c2"></div>
        <div class="hero-inner">
          <p class="eyebrow">${ACADEMY.name}</p>
          <h1>${cur.title}</h1>
          <p>${cur.tagline}</p>
          <div class="hero-actions">
            <button class="cta hero-cta" data-go="${resumeGo}">${certified?'Review the course':started?`Continue — ${pct}% done`:'Start the course'} ${icon('arrow','ic-btn')}</button>
            ${certified?`<button class="cta ghost" data-go="cert">View your certificate</button>`:''}
            <span class="est">${icon('clock','ic-xs')} ${cur.estTime} &middot; ${cur.audience}</span>
          </div>
        </div>
      </div>
      <section class="block">
        ${charlieHTML(certified
          ? `Look who's back! You're already <b>${cur.badge.name}</b> — feel free to review any module, or check the catalog for your next certification.`
          : started
            ? `Welcome back — you're <b>${pct}%</b> of the way there. Each module has a quick knowledge check worth <b>${GAME.xpModule} XP</b>, and the certification is worth <b>${GAME.xpCert}</b>.`
            : `Hi, I'm Charlie — I'll be your guide through this course. Every module ends with a quick knowledge check (<b>+${GAME.xpModule} XP</b>), and passing the certification quiz earns the <b>${cur.badge.name}</b> badge and <b>${GAME.xpCert} XP</b>. Let's get you certified.`)}
      </section>
      <section class="block">
        <div class="earn-panel">
          <div class="earn-badge ${certified?'':'locked'}">${badgeHTML(cur,'')}</div>
          <div class="earn-copy">
            <p class="eyebrow">${certified?'Your credential':'The credential you’ll earn'}</p>
            <h3>${cur.badge.name}</h3>
            <p>${cur.badge.blurb} Registered with a public Credential ID, verifiable by anyone, and ready to add to LinkedIn in one click.</p>
            <div class="earn-meta">
              <span>${icon('shield','ic-xs')} Verifiable credential</span>
              <span>${icon('zap','ic-xs')} ${GAME.xpCert} XP</span>
              <span>${icon('linkedin','ic-xs')} LinkedIn-ready</span>
            </div>
          </div>
        </div>
      </section>
      <section class="block">
        <div class="callout money">${icon('coins','ic-money')}<strong>${cur.payoff}</strong></div>
      </section>
      <section class="block">
        <h2>Course roadmap</h2>
        <p class="lead">Your path to the badge:</p>
        <div class="roadmap">${road}</div>
      </section>
      <section class="block">
        <h2>What you'll learn</h2>
        <div class="learn-list">${learn}</div>
      </section>
      </div>`;
    bindGo();
    renderSidebarCourse('overview');
    window.scrollTo(0,0);
  }

  /* ---------- Module reader ---------- */
  function renderModule(id){
    const m = moduleById(id);
    if(!m) return renderCourse();
    const s = st();
    const prev = prevItem(id);
    const next = nextItem(id);
    const prevIsModule = typeof prev === 'number';
    const done = !!s.done[id];
    const nextM = typeof next === 'number' ? moduleById(next) : null;
    const short = t => t.length > 34 ? t.slice(0, 32).replace(/\s+\S*$/,'') + '…' : t;
    const nextLabel = next==='quiz' ? 'Certification quiz &rarr;' : (nextM ? `Next: ${short(nextM.title)} &rarr;` : '');
    const pos = order.indexOf(id) + 1;
    const coursePctNow = Math.round(completedCount()/totalUnits()*100);
    const ck = m.check;

    // Knowledge check: answering correctly is what completes the module.
    // Low-stakes practice (client-graded); the certification quiz stays server-side.
    let checkHTML = '';
    if(ck){
      const opts = ck.a.map((opt,j)=>
        `<button class="kc-opt ${done && j===ck.c ? 'correct' : ''}" data-kc="${j}" ${done?'disabled':''}>${opt}</button>`).join('');
      checkHTML = `
        <div class="kcheck ${done?'kc-done':''}" id="kcheck">
          ${charlieHTML(done
            ? `Nice — you've already nailed this one. <b>+${GAME.xpModule} XP</b> banked.`
            : `Quick check before you move on — get it right and the module is yours.`)}
          <p class="kc-q">${ck.q}</p>
          <div class="kc-opts">${opts}</div>
          <p class="kc-feedback hide" id="kcFeedback"></p>
        </div>`;
    }

    const objectives = m.objectives && m.objectives.length ? `
        <div class="obj"><h4>In this module</h4><ul>${m.objectives.map(o=>`<li>${o}</li>`).join('')}</ul></div>` : '';
    const takeawaysHTML = m.takeaways && m.takeaways.length ? `
        <div class="takeaways"><h4>Key takeaways</h4><ul>${m.takeaways.map(t=>`<li>${t}</li>`).join('')}</ul></div>` : '';
    main.innerHTML = `
      <div class="reader">
        <div class="hero sm">
          <p class="eyebrow">Module ${pos} of ${cur.modules.length} &middot; ${m.group}${m.time?` &middot; ${m.time}`:''}</p>
          <h1>${m.title}</h1>
          <div class="hero-course-bar" title="${coursePctNow}% of course complete"><i style="width:${coursePctNow}%"></i></div>
        </div>
        ${objectives}
        <div class="reader-body">${m.body}</div>
        ${takeawaysHTML}
        ${checkHTML}
        <div class="pager">
          ${prevIsModule?`<button class="cta ghost" data-go="m:${prev}">&larr; ${short(moduleById(prev).title)}</button>`:`<span></span>`}
          <button class="cta" id="markBtn" ${ck && !done ? 'disabled title="Answer the knowledge check to complete this module"' : ''}>${done?'&#10003; Completed — Continue':'Mark complete &amp; continue'}</button>
          ${next?`<button class="cta ghost" data-go="${goName(next)}">${nextLabel}</button>`:`<span></span>`}
        </div>
      </div>`;

    const complete = ()=>{
      const first = !s.done[id];
      s.done[id] = true; save();
      if(first) xpToast(GAME.xpModule, `Module ${m.id} complete`);
      if(next) route(goName(next));
      else renderModule(id);
    };
    document.getElementById('markBtn').addEventListener('click', complete);

    if(ck && !done){
      main.querySelectorAll('.kc-opt').forEach(btn=>btn.addEventListener('click',()=>{
        const j = parseInt(btn.dataset.kc);
        const fb = document.getElementById('kcFeedback');
        if(j === ck.c){
          btn.classList.add('correct');
          main.querySelectorAll('.kc-opt').forEach(o=>o.disabled=true);
          fb.textContent = '✓ Correct — module complete. On you go.';
          fb.className = 'kc-feedback ok';
          const mb = document.getElementById('markBtn');
          mb.disabled = false; mb.removeAttribute('title');
          setTimeout(complete, 900);
        }else{
          btn.classList.add('wrong'); btn.disabled = true;
          fb.textContent = 'Not quite — the answer is in this module. Have another look and try again.';
          fb.className = 'kc-feedback err';
        }
      }));
    }

    bindGo();
    renderSidebarCourse('m:'+id);
    window.scrollTo(0,0);
  }

  /* ---------- Sign-in (magic link stand-in; swappable for admin-panel SSO) ---------- */
  function renderSignIn(msg){
    main.innerHTML = `
      <div class="page">
        <div class="hero sm"><div class="hero-inner"><p class="eyebrow">${ACADEMY.name}</p><h1>Sign in</h1></div></div>
        ${!Backend.enabled() ? `
        <div class="note" style="margin-top:18px"><h4>Backend not configured</h4>
          <p>Fill in <code>config.js</code> with the Supabase project URL and anon key (run <code>supabase/schema.sql</code> first), then reload.</p></div>` : `
        <p class="lead" style="margin-top:18px">${msg||"Enter your email and we'll send you a one-time sign-in link. Your progress, badges, and credentials are saved to your account — on any device."}</p>
        <section class="block" style="padding:0;margin-top:6px;margin-bottom:14px">
          ${charlieHTML(`I'll keep your progress, XP, and credentials safe under your account — sign in once and pick up on any device, right where you left off.`)}
        </section>
        <div class="regform">
          <label class="field"><span>Email</span><input id="siEmail" type="email" placeholder="you@example.com"></label>
          <p class="form-err hide" id="siErr"></p>
          <p class="form-ok hide" id="siOk"></p>
          <button class="cta" id="siSend">Email me a sign-in link</button>
        </div>`}
      </div>`;
    const btn = document.getElementById('siSend');
    if(btn) btn.addEventListener('click', async ()=>{
      const email = document.getElementById('siEmail').value.trim();
      const err = document.getElementById('siErr'), ok = document.getElementById('siOk');
      err.classList.add('hide'); ok.classList.add('hide');
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ err.textContent='Please enter a valid email address.'; err.classList.remove('hide'); return; }
      btn.disabled = true; btn.textContent = 'Sending…';
      // Remember where the learner was headed — the magic link lands on a fresh
      // page load, and this gets them back to (e.g.) the quiz instead of home.
      try{ localStorage.setItem('cpa_next', toHash(lastGo==='signin' ? 'home' : lastGo)); }catch(e){}
      try{
        await Backend.signIn(email);
        ok.textContent = '✓ Check your inbox — click the link in the email to sign in.'; ok.classList.remove('hide');
        btn.textContent = 'Link sent';
      }catch(e){
        err.textContent = e.message || 'Could not send the link.'; err.classList.remove('hide');
        btn.disabled = false; btn.textContent = 'Email me a sign-in link';
      }
    });
    bindGo(); if(cur) renderSidebarCourse('quiz'); else renderSidebarHome(); window.scrollTo(0,0);
  }

  function renderNavAuth(){
    const el = document.getElementById('navAuth'); if(!el) return;
    if(!Backend.enabled()){ el.innerHTML = '<span class="avatar">A</span>'; return; }
    const u = Backend.user(), p = Backend.profile();
    if(u){
      const ini = (((p && p.first_name) || u.email || '?').charAt(0)).toUpperCase();
      el.innerHTML = `<span class="avatar" title="${u.email}">${ini}</span><a href="#" class="nav-auth-link">Sign out</a>`;
      el.querySelector('.nav-auth-link').addEventListener('click', e=>{ e.preventDefault(); Backend.signOut(); });
    }else{
      el.innerHTML = `<a href="#" class="nav-auth-link">Sign in</a>`;
      el.querySelector('.nav-auth-link').addEventListener('click', e=>{ e.preventDefault(); route('signin'); });
    }
  }

  /* ---------- Pre-quiz registration form ---------- */
  function renderRegForm(){
    if(!Backend.enabled() || !Backend.user())
      return renderSignIn(`<strong>${cur.title}</strong> certification requires a free account — your credential is registered to it and becomes publicly verifiable. Enter your email to get a sign-in link.`);
    const r0 = st().reg || {};
    const p = Backend.profile() || {};
    const u = Backend.user();
    const r = { first: r0.first || p.first_name || '',
                last:  r0.last  || p.last_name  || '',
                company: r0.company || p.company || '',
                email: u.email };
    main.innerHTML = `
      <div class="page">
        <div class="hero sm"><p class="eyebrow">${cur.title}</p><h1>Before you begin</h1></div>
        <p class="lead" style="margin-top:18px">Confirm your details. Your certificate and <strong>${cur.badge.name}</strong> badge will be issued in this name the moment you pass — registered with a public Credential ID that anyone can verify, and ready to add to LinkedIn.</p>
        <div class="regform">
          <div class="field-row">
            <label class="field"><span>First name</span><input id="rfFirst" type="text" value="${r.first||''}" placeholder="First name"></label>
            <label class="field"><span>Last name</span><input id="rfLast" type="text" value="${r.last||''}" placeholder="Last name"></label>
          </div>
          <label class="field"><span>Company / organization</span><input id="rfCompany" type="text" value="${r.company||''}" placeholder="Company, school, or organization"></label>
          <label class="field"><span>Email (your account)</span><input id="rfEmail" type="email" value="${r.email||''}" disabled title="Credentials are issued to your account email"></label>
          <p class="form-err hide" id="rfErr">Please fill out every field with a valid email address.</p>
          <button class="cta" id="rfStart">Start the quiz &rarr;</button>
        </div>
      </div>`;
    document.getElementById('rfStart').addEventListener('click',()=>{
      const first=val('rfFirst'), last=val('rfLast'), company=val('rfCompany'), email=val('rfEmail');
      const emailOk=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if(!first||!last||!company||!emailOk){ document.getElementById('rfErr').classList.remove('hide'); return; }
      st().reg = {first,last,company,email}; save();
      renderQuiz();
    });
    bindGo(); renderSidebarCourse('quiz'); window.scrollTo(0,0);
  }
  function val(id){ return document.getElementById(id).value.trim(); }

  /* ---------- Quiz ---------- */
  function renderQuiz(){
    const s = st();
    if(!Backend.enabled() || !Backend.user() || !s.reg) return renderRegForm();
    const QUIZ = cur.quiz;
    let lastSec = -1, html = '';
    QUIZ.questions.forEach((q,i)=>{
      if(q.s!==lastSec){ html += `<div class="qsec-head">${QUIZ.sections[q.s]}</div>`; lastSec=q.s; }
      html += `<div class="q-block" data-q="${i}"><p class="qn"><span>${i+1}.</span>${q.q}</p>`;
      q.a.forEach((opt,j)=>{
        html += `<label class="opt"><input type="radio" name="q${i}" value="${j}"><span>${opt}</span></label>`;
      });
      html += `</div>`;
    });
    const total = QUIZ.questions.length, passN = Math.ceil(QUIZ.passMark*total);
    main.innerHTML = `
      <div class="page">
      <div class="quiz-intro">
        <div class="hero sm"><p class="eyebrow">${cur.title}</p><h1>${total}-Question Certification Quiz</h1>
        <span class="est">Pass mark: ${Math.round(QUIZ.passMark*100)}% (${passN} / ${total})</span></div>
        <p class="lead" style="margin-top:20px">Taking this as <strong>${s.reg.first} ${s.reg.last}</strong> (${s.reg.company}). Answer all ${total} questions, then submit. Passing earns your <strong>${cur.badge.name}</strong> badge and certificate.</p>
        ${charlieHTML(`Pass mark is <b>${Math.round(QUIZ.passMark*100)}%</b> — you've got this. Wrong answers get marked when you submit, so even a miss tells you exactly what to review. Graded securely on our servers; passing registers your verifiable credential.`)}
      </div>
      ${html}
      <div class="scorebar no-print">
        <button class="cta" id="submitQuiz">Submit quiz</button>
        <span class="count" id="quizCount"></span>
        <span class="res" id="quizRes"></span>
        <div class="spacer"></div>
        <button class="cta ghost" id="resetQuiz">Reset answers</button>
      </div>
      </div>`;
    document.getElementById('submitQuiz').addEventListener('click',gradeQuiz);
    document.getElementById('resetQuiz').addEventListener('click',()=>{ s.quizDraft = {}; save(); renderQuiz(); });
    // Selections persist locally as a draft — a reload or misclick doesn't
    // wipe 40+ answers. Cleared on reset and on a passing submit.
    const draft = s.quizDraft || {};
    QUIZ.questions.forEach((q,i)=>{
      if(draft[i]>=0){
        const inp = main.querySelector(`input[name="q${i}"][value="${draft[i]}"]`);
        if(inp) inp.checked = true;
      }
    });
    const counter = document.getElementById('quizCount');
    const updCount = ()=>{ counter.textContent = `${main.querySelectorAll('.q-block input:checked').length}/${total} answered`; };
    main.querySelectorAll('.q-block input[type=radio]').forEach(inp=>inp.addEventListener('change',()=>{
      (s.quizDraft = s.quizDraft || {})[parseInt(inp.name.slice(1))] = parseInt(inp.value);
      save(); updCount();
    }));
    updCount();
    bindGo(); renderSidebarCourse('quiz'); window.scrollTo(0,0);
  }
  async function gradeQuiz(){
    // Grading happens SERVER-SIDE (grade_quiz RPC) — the answer key never
    // ships to the browser, and passing registers a verifiable credential.
    const s = st(); const QUIZ = cur.quiz;
    const answers = QUIZ.questions.map((q,i)=>{
      const sel = main.querySelector(`input[name="q${i}"]:checked`);
      return sel ? parseInt(sel.value) : -1;
    });
    const unanswered = answers.filter(a=>a<0).length;
    const res = document.getElementById('quizRes');
    const btn = document.getElementById('submitQuiz');
    btn.disabled = true; res.textContent = 'Grading…'; res.className = 'res';
    let r;
    try{
      r = await Backend.gradeQuiz(cur, answers, s.reg);
    }catch(err){
      btn.disabled = false;
      res.textContent = err.message || 'Could not grade — check your connection and try again.';
      res.className = 'res fail';
      return;
    }
    btn.disabled = false;
    // Mark right/wrong on the chosen options only — the key itself is never revealed.
    QUIZ.questions.forEach((q,i)=>{
      const block = main.querySelector(`[data-q="${i}"]`);
      const opts = block.querySelectorAll('.opt');
      opts.forEach(o=>o.classList.remove('correct','wrong'));
      if(answers[i]>=0) opts[answers[i]].classList.add(r.results[i] ? 'correct' : 'wrong');
    });
    const passed = r.passed, correct = r.correct, total = r.total;
    res.textContent = `${correct}/${total} correct (${Math.round(correct/total*100)}%)${unanswered?` · ${unanswered} unanswered`:''} — ${passed?'PASS':'not yet — review the marked questions and try again'}`;
    res.className = 'res ' + (passed?'pass':'fail');
    const prevPassed = s.quiz && s.quiz.passed;
    const prevCred = s.quiz && s.quiz.cred;
    s.quiz = {passed, score:correct, total, when: (prevPassed && s.quiz.when) ? s.quiz.when : Date.now(),
              cred: r.credential || prevCred || null};
    if(passed) s.quizDraft = {};
    if(!passed) s.emailed = false;
    save();
    renderSidebarCourse('quiz');
    if(passed && !document.getElementById('toCert')){
      const b = document.createElement('button');
      b.className='cta'; b.id='toCert'; b.textContent='Claim your badge →';
      b.addEventListener('click',()=>route('cert'));
      document.querySelector('.scorebar').appendChild(b);
      // Celebrate on the journey (here), never on the certificate itself.
      if(!prevPassed){ confettiBurst(); xpToast(GAME.xpCert, `${cur.badge.name}!`); }
    }
    // Charlie reacts below the scorebar — encouragement on a miss, cheer on a pass.
    let cq = document.getElementById('charlieQuiz');
    if(cq) cq.remove();
    const cDiv = document.createElement('div');
    cDiv.id = 'charlieQuiz'; cDiv.className = 'no-print';
    cDiv.innerHTML = charlieHTML(passed
      ? `<b>${correct}/${total}!</b> That's what I'm talking about. Go claim your badge — and don't forget to add it to LinkedIn.`
      : `${correct}/${total} — closer than it feels. The marked questions map straight back to modules in the sidebar. Review those, then come back and take it again. I'll be here.`);
    document.querySelector('.scorebar').after(cDiv);
    main.querySelector('.scorebar').scrollIntoView({behavior:'smooth',block:'center'});
  }

  /* ---------- Badge ---------- */
  function badgeHTML(c, size){
    const certified = isCertified(c);
    // Image badge (circular-masked). Falls back to the CSS disc if the file is missing.
    if(c.badge.img){
      return `<div class="badge img ${size||''} ${certified?'earned':'locked'}">
        <img class="badge-img" src="${c.badge.img}" alt="${c.badge.name}"
             onerror="this.closest('.badge').classList.add('noimg');this.remove()">
        <span class="badge-fallback">
          <span class="badge-disc"><span class="badge-ring"></span><span class="badge-ic">${icon(certified?'medal':'lock')}</span></span>
          <span class="badge-name">${c.badge.name}</span>
          <span class="badge-sub">${ACADEMY.name}</span>
        </span>
      </div>`;
    }
    return `<div class="badge ${size||''} ${certified?'earned':'locked'}">
      <div class="badge-disc">
        <span class="badge-ring"></span>
        <span class="badge-ic">${icon(certified?'medal':'lock')}</span>
      </div>
      <div class="badge-name">${c.badge.name}</div>
      <div class="badge-sub">${ACADEMY.name}</div>
    </div>`;
  }

  /* ---------- Certificate + badge + share ---------- */
  function fmt(d){ return d.toLocaleString('en-US',{year:'numeric',month:'long',day:'numeric',hour:'numeric',minute:'2-digit'}); }
  function fmtDate(d){ return d.toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'}); }

  function emailCertificate(reg, score, total, issuedStr, expStr, credId, verify){
    const subject = `${cur.title} — Certificate of Completion`;
    const body =
`Hi ${reg.first},

Congratulations on completing the ${cur.title} at ${ACADEMY.name}.

You've earned the "${cur.badge.name}" badge.

Name: ${reg.first} ${reg.last}
Organization: ${reg.company}
Email: ${reg.email}
Score: ${score}/${total}
Credential ID: ${credId}
Verify this credential: ${verify}
Issued: ${issuedStr}
Valid through: ${expStr}

partners@commercient.com is cc'd on this email. You can also download the certificate and add the credential to LinkedIn from ${ACADEMY.name}.

— ${ACADEMY.name}`;
    const href = `mailto:${encodeURIComponent(reg.email)}?cc=${encodeURIComponent('partners@commercient.com')}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const a = document.createElement('a');
    a.href = href; a.style.display='none';
    document.body.appendChild(a); a.click(); a.remove();
  }

  function linkedInAddUrl(issued, expiry, credId, verify){
    // LinkedIn "Add to profile" certification flow.
    // certUrl points at the PUBLIC VERIFY PAGE — anyone who clicks the
    // credential on LinkedIn sees live proof it's real and current.
    // Note: LinkedIn's deep link supports only these fields — skills and media
    // are not URL-addressable and must be added by the user in the dialog.
    // With LINKEDIN_ORG_ID set (config.js), the credential links to the
    // Commercient company page and shows the logo; the free-text name is
    // only the fallback.
    const orgId = (window.ACADEMY_CONFIG || {}).LINKEDIN_ORG_ID;
    const p = new URLSearchParams({
      startTask: 'CERTIFICATION_NAME',
      name: cur.title,
      issueYear: String(issued.getFullYear()),
      issueMonth: String(issued.getMonth()+1),
      expirationYear: String(expiry.getFullYear()),
      expirationMonth: String(expiry.getMonth()+1),
      certId: credId,
      certUrl: verify
    });
    if(orgId) p.set('organizationId', String(orgId));
    else p.set('organizationName', 'Commercient');
    return 'https://www.linkedin.com/profile/add?' + p.toString();
  }

  // One-click LinkedIn post (distinct from adding the credential to the
  // profile): opens the feed composer prefilled with the brag + verify link.
  function linkedInPostUrl(text){
    return 'https://www.linkedin.com/feed/?shareActive=true&text=' + encodeURIComponent(text);
  }

  // Render the certificate to a PNG and download it (for LinkedIn "Add media", etc.)
  function downloadCertImage(reg, score, total, issuedStr, expStr, credId, verify){
    const W=1600, H=1130, c=document.createElement('canvas'); c.width=W; c.height=H;
    const x=c.getContext('2d'), cx=W/2;
    x.fillStyle='#ffffff'; x.fillRect(0,0,W,H);
    x.lineWidth=12; x.strokeStyle='#29ABE2'; x.strokeRect(28,28,W-56,H-56);
    x.lineWidth=2;  x.strokeStyle='#B8D4E4'; x.strokeRect(56,56,W-112,H-112);
    x.textAlign='center';
    const drawText=()=>{
      x.fillStyle='#4A7FA5'; x.font='700 26px Raleway, Arial, sans-serif'; x.fillText('COMMERCIENT ACADEMY', cx, 250);
      x.fillStyle='#1B3A5C'; x.font='800 62px Raleway, Arial, sans-serif'; x.fillText('Certificate of Completion', cx, 330);
      x.fillStyle='#52606d'; x.font='400 30px "Open Sans", Arial, sans-serif'; x.fillText('This certifies that', cx, 400);
      x.fillStyle='#29ABE2'; x.font='800 58px Raleway, Arial, sans-serif'; x.fillText(`${reg.first} ${reg.last}`, cx, 478);
      x.fillStyle='#42505c'; x.font='400 28px "Open Sans", Arial, sans-serif';
      wrapText(x, `of ${reg.company} has successfully completed the ${cur.title} and earned the ${cur.badge.name} credential, passing the certification quiz with a score of ${score}/${total}.`, cx, 552, 1120, 42);
      x.fillStyle='#3D3D3D'; x.font='600 24px "Open Sans", Arial, sans-serif';
      x.fillText(`Issued ${issuedStr}    ·    Valid through ${expStr}`, cx, 900);
      x.fillStyle='#6a7886'; x.font='600 22px "Open Sans", Arial, sans-serif';
      x.fillText(`Credential ID: ${credId}`, cx, 944);
      if(verify){
        x.fillStyle='#8a97a5'; x.font='400 20px "Open Sans", Arial, sans-serif';
        x.fillText(`Verify: ${verify.replace('https://','')}`, cx, 982);
      }
    };
    const finish=()=>{
      const a=document.createElement('a');
      a.download = `Commercient-Academy-Certificate-${reg.last}.png`;
      a.href = c.toDataURL('image/png'); a.click();
    };
    const drawBadge=(next)=>{
      if(!cur.badge || !cur.badge.img) return next();
      const b=new Image();
      b.onload=()=>{ const r=94, bx=W-232, by=236;
        x.save(); x.beginPath(); x.arc(bx,by,r,0,Math.PI*2); x.closePath(); x.clip();
        x.drawImage(b, bx-r, by-r, r*2, r*2); x.restore(); next(); };
      b.onerror=()=>next();
      b.src=cur.badge.img;
    };
    const proceed=()=>drawBadge(()=>{ drawText(); finish(); });
    const logo=new Image();
    logo.onload=()=>{ const lw=380, lh=logo.height*(lw/logo.width); x.drawImage(logo, cx-lw/2, 120, lw, lh); proceed(); };
    logo.onerror=proceed;
    logo.src='assets/commercient-logo.png';
  }
  function wrapText(ctx, text, cx, y, maxW, lh){
    const words=text.split(' '); let line='', yy=y;
    words.forEach(w=>{ const t=line+w+' ';
      if(ctx.measureText(t).width>maxW && line){ ctx.fillText(line.trim(), cx, yy); line=w+' '; yy+=lh; }
      else line=t;
    });
    ctx.fillText(line.trim(), cx, yy);
  }

  // Fun, social-square share card (Charlie + badge). This is a SOCIAL artifact
  // for the feed — deliberately separate from the certificate, which stays
  // corporate and Charlie-free (see HANDOFF guardrail).
  function downloadShareCard(reg, cred, credId){
    const W=1080, H=1080, c=document.createElement('canvas'); c.width=W; c.height=H;
    const x=c.getContext('2d'), cx=W/2;
    const g=x.createLinearGradient(0,0,W,H);
    g.addColorStop(0,'#1B3A5C'); g.addColorStop(1,'#2f6ea0');
    x.fillStyle=g; x.fillRect(0,0,W,H);
    x.fillStyle='rgba(123,167,200,.20)'; x.beginPath(); x.arc(W-90,60,240,0,Math.PI*2); x.fill();
    x.fillStyle='rgba(41,171,226,.16)';  x.beginPath(); x.arc(120,H-60,220,0,Math.PI*2); x.fill();
    const circImg=(img,bx,by,r)=>{ x.save(); x.beginPath(); x.arc(bx,by,r,0,Math.PI*2); x.clip();
      x.drawImage(img,bx-r,by-r,r*2,r*2); x.restore(); };
    const drawText=()=>{
      x.textAlign='center';
      x.fillStyle='#bcd6ea'; x.font='700 30px Raleway, Arial, sans-serif';
      x.fillText('COMMERCIENT ACADEMY · ACHIEVEMENT UNLOCKED', cx, 130);
      x.fillStyle='#ffffff'; x.font='800 62px Raleway, Arial, sans-serif';
      x.fillText(`${reg.first} ${reg.last}`, cx, 230);
      x.fillStyle='#7fd4ff'; x.font='800 44px Raleway, Arial, sans-serif';
      wrapText(x, `is ${cur.badge.name}`, cx, 300, 900, 54);
      x.fillStyle='#dceaf4'; x.font='600 26px "Open Sans", Arial, sans-serif';
      const no = cred && cred.cred_no ? `Founding credential #${String(cred.cred_no).padStart(4,'0')} · ` : '';
      x.fillText(`${no}${credId}`, cx, 960);
      x.fillStyle='#9fc3dc'; x.font='400 24px "Open Sans", Arial, sans-serif';
      x.fillText(`Verify: ${Backend.verifyUrl(credId).replace('https://','')}`, cx, 1000);
    };
    const finish=()=>{
      drawText();
      const a=document.createElement('a');
      a.download=`Commercient-Academy-${(cur.badge.name||'badge').replace(/[^A-Za-z0-9]+/g,'-')}-Card.png`;
      a.href=c.toDataURL('image/png'); a.click();
    };
    let pending=2;
    const done=()=>{ if(--pending===0) finish(); };
    const charlie=new Image();
    charlie.onload=()=>{ circImg(charlie, 300, 620, 210); done(); };
    charlie.onerror=done;
    charlie.src='assets/charlie.png';
    if(cur.badge && cur.badge.img){
      const badge=new Image();
      badge.onload=()=>{ circImg(badge, 760, 620, 190); done(); };
      badge.onerror=done;
      badge.src=cur.badge.img;
    } else done();
  }

  function renderCert(){
    const s = st();
    const passed = s.quiz && s.quiz.passed;
    if(!passed || !s.reg){
      main.innerHTML = `<div class="cert-wrap"><div class="note"><h4>Certificate locked</h4><p>Complete the registration details and pass the certification quiz to earn the <strong>${cur.badge.name}</strong> badge and unlock your certificate.</p></div><br><button class="cta" data-go="quiz">Go to the quiz</button></div>`;
      bindGo(); renderSidebarCourse('cert'); return;
    }
    // The credential is issued SERVER-SIDE when the quiz is passed and is
    // publicly verifiable. No registered credential = no certificate.
    const cred = s.quiz.cred;
    if(!cred){
      main.innerHTML = `<div class="cert-wrap"><div class="note"><h4>Credential not registered yet</h4><p>Your pass predates the credential registry (or hasn't synced to your account). Sign in and retake the certification quiz — passing registers a <strong>verifiable</strong> credential.</p></div><br><button class="cta" data-go="quiz">Go to the quiz</button></div>`;
      bindGo(); renderSidebarCourse('cert'); return;
    }
    const reg = s.reg;
    const total = cred.total || s.quiz.total || (cur.quiz && cur.quiz.questions.length) || 0;
    const issued = new Date(cred.issued_at);
    const issuedStr = fmt(issued);
    const expiry = new Date(cred.expires_at);
    const expStr = fmtDate(expiry);
    const credId = cred.credential_id;
    const verify = Backend.verifyUrl(credId);

    // Share copy is per-course (data.js `brag`), with the founding credential
    // number woven in when we have one — scarce, real, screenshot-able status.
    const credNoStr = cred.cred_no ? `#${String(cred.cred_no).padStart(4,'0')}` : '';
    const bragBase = cur.brag || `I'm now ${cur.badge.name} — certified at ${ACADEMY.name}.`;
    const brag = `${bragBase}${credNoStr ? ` Founding credential ${credNoStr}.` : ''} Verify it live: ${verify} #CommercientAcademy #CommercientAI`;
    const skillChips = (cur.skills||[]).map(sk=>`<button class="skill-chip" data-skill="${sk.replace(/"/g,'&quot;')}">${sk}</button>`).join('');

    // Pull the finisher toward their next badge at the moment of peak energy.
    const nextCourse = COURSES.find(c=>c.status==='available' && c.id!==cur.id && !isCertified(c));

    main.innerHTML = `
      <div class="cert-wrap">
        <div class="achieve no-print">
          ${badgeHTML(cur,'lg')}
          <div class="achieve-copy">
            <p class="eyebrow">Achievement unlocked</p>
            <h2>You're ${cur.badge.name}!</h2>
            ${credNoStr ? `<p class="cred-no">Founding credential ${credNoStr} — one of the first in the program.</p>` : ''}
            <p>${cur.badge.blurb} You can now speak with authority about Commercient AI — and get paid for it. Share the win.</p>
            <div class="share-row">
              <a class="cta share-li" id="addLi" href="${linkedInAddUrl(issued, expiry, credId, verify)}" target="_blank" rel="noopener">Add to LinkedIn</a>
              <a class="cta ghost" id="postLi" href="${linkedInPostUrl(brag)}" target="_blank" rel="noopener">Post on LinkedIn</a>
              <button class="cta ghost" id="dlCard">Download share card</button>
              <button class="cta ghost" id="dlMedia">Download for media</button>
              <button class="cta ghost" id="copyBrag">Copy brag post</button>
            </div>
            <span class="copy-note hide" id="copyNote">✓ Copied to clipboard.</span>
            <div class="li-help">
              <p>LinkedIn pre-fills the name, dates, <strong>Credential ID (${credId})</strong>, and the <strong>verification URL</strong> — anyone who clicks your credential sees live proof it's valid. Two fields it won't let us pre-fill — add them in the dialog:</p>
              <p class="li-step"><strong>① Skills</strong> — click a skill to copy, then paste into “Add skill”:</p>
              <div class="skill-chips">${skillChips}</div>
              <p class="li-step"><strong>② Media</strong> — your certificate image auto-downloads when you click “Add to LinkedIn”; drop it into “Add media”.</p>
            </div>
          </div>
        </div>
        <div class="email-banner no-print">&#10003; Your credential is registered and publicly verifiable at <a href="${verify}" target="_blank" rel="noopener">${verify.replace('https://','')}</a> — anyone can confirm it, any time.</div>
        <div class="no-print" style="margin-bottom:18px">
          <button class="cta" id="printCert">Download / Print certificate</button>
          ${cur.badge.img?`<a class="cta ghost hide" id="dlBadge" href="${cur.badge.img}" download="${(cur.badge.name||'Commercient-Badge').replace(/[^A-Za-z0-9]+/g,'-')}-Badge.png">Download badge</a>`:''}
          <button class="cta ghost" id="resendCert" title="Opens a pre-filled email draft in your mail app">Email me a copy</button>
          <button class="cta ghost" data-go="home">Browse more courses</button>
        </div>
        ${nextCourse ? `
        <div class="note no-print next-course">
          <h4>Your next badge</h4>
          <p>Most people take the <strong>${nextCourse.title}</strong> next — ${nextCourse.estTime}, and it stacks straight onto what you just learned.</p>
          <button class="cta" data-go="c:${nextCourse.id}">Start it &rarr;</button>
        </div>` : ''}
        <div class="certificate" id="certBox">
          <img class="cert-logo" src="assets/commercient-logo.png" onerror="this.style.display='none'">
          <div class="ttl">${ACADEMY.name}</div>
          <h2>Certificate of Completion</h2>
          <p class="body">This certifies that</p>
          <div class="name">${reg.first} ${reg.last}</div>
          <p class="body">of <strong>${reg.company}</strong> has successfully completed the <strong>${cur.title}</strong> and earned the <strong>${cur.badge.name}</strong> credential, passing the certification quiz with a score of ${s.quiz.score}/${total}.</p>
          ${cur.badge.img?`<img class="cert-seal" src="${cur.badge.img}" alt="${cur.badge.name}" onerror="this.style.display='none'">`:''}
          <div class="cert-meta">
            <div><span>Name</span>${reg.first} ${reg.last}</div>
            <div><span>Organization</span>${reg.company}</div>
            <div><span>Email</span>${reg.email}</div>
            <div><span>Credential</span>${cur.badge.name}</div>
            <div><span>Credential ID</span>${credId}</div>
            ${cred.cred_no ? `<div><span>Credential №</span>#${String(cred.cred_no).padStart(4,'0')}</div>` : ''}
            <div><span>Issued</span>${issuedStr}</div>
            <div><span>Valid through</span>${expStr}</div>
            <div class="cert-verify"><span>Verify</span><a href="${verify}" target="_blank" rel="noopener">${verify.replace('https://','')}</a></div>
          </div>
        </div>
      </div>`;
    const copyText = (text)=>{
      const note = document.getElementById('copyNote');
      const done = ()=>{ if(note) note.classList.remove('hide'); };
      if(navigator.clipboard && navigator.clipboard.writeText){ navigator.clipboard.writeText(text).then(done, done); }
      else{ const ta=document.createElement('textarea'); ta.value=text; document.body.appendChild(ta); ta.select(); try{document.execCommand('copy');}catch(e){} ta.remove(); done(); }
    };
    const getMedia = ()=> downloadCertImage(reg, s.quiz.score, total, issuedStr, expStr, credId, verify);
    document.getElementById('printCert').addEventListener('click',()=>window.print());
    // Email is a user-initiated mailto DRAFT (nothing is auto-sent) — the
    // credentials table in Supabase is the system of record for who certified.
    document.getElementById('resendCert').addEventListener('click',()=>{
      emailCertificate(reg, s.quiz.score, total, issuedStr, expStr, credId, verify);
    });
    document.getElementById('dlMedia').addEventListener('click', getMedia);
    document.getElementById('dlCard').addEventListener('click', ()=>downloadShareCard(reg, cred, credId));
    // "Download badge" only appears once the badge file is confirmed to exist
    // (missing art would otherwise serve a broken link).
    const dlB = document.getElementById('dlBadge');
    if(dlB){ const probe=new Image(); probe.onload=()=>dlB.classList.remove('hide'); probe.src=cur.badge.img; }
    // auto-download the cert image when heading to LinkedIn, so it's ready for "Add media"
    document.getElementById('addLi').addEventListener('click', getMedia);
    document.getElementById('copyBrag').addEventListener('click',()=>copyText(brag));
    main.querySelectorAll('.skill-chip').forEach(ch=>ch.addEventListener('click',()=>{
      copyText(ch.dataset.skill);
      const note=document.getElementById('copyNote'); if(note) note.textContent=`✓ Copied “${ch.dataset.skill}” — paste into Add skill.`;
      ch.classList.add('copied'); setTimeout(()=>ch.classList.remove('copied'),1200);
    }));
    bindGo(); renderSidebarCourse('cert'); window.scrollTo(0,0);
  }

  /* ---------- Router ----------
     Every route maps to a URL hash (#/course/platform/module/3) so views are
     deep-linkable, the back button works, and refresh keeps your place.
     Hashes containing '=' are left alone — those are Supabase auth tokens. */
  let lastGo = 'home';
  let settingHash = false;
  function toHash(go){
    if(!go || go==='home') return '#/';
    if(go==='achievements') return '#/achievements';
    if(go==='signin') return '#/signin';
    if(go.indexOf('c:')===0) return '#/course/'+go.slice(2);
    if(go.indexOf('cert:')===0) return '#/course/'+go.slice(5)+'/cert';
    if(go.indexOf('quiz:')===0) return '#/course/'+go.slice(5)+'/quiz';
    if(go.indexOf('m:')===0 && cur) return '#/course/'+cur.id+'/module/'+go.slice(2);
    if(go==='quiz' && cur) return '#/course/'+cur.id+'/quiz';
    if(go==='cert' && cur) return '#/course/'+cur.id+'/cert';
    if(go==='overview' && cur) return '#/course/'+cur.id;
    return '#/';
  }
  function parseHash(h){
    if(!h || h==='#' || h==='#/') return 'home';
    if(h.indexOf('=')>=0) return null;                 // auth token hash — not ours
    const parts = h.replace(/^#\/?/,'').split('/').filter(Boolean);
    if(!parts.length) return 'home';
    if(parts[0]==='achievements') return 'achievements';
    if(parts[0]==='signin') return 'signin';
    if(parts[0]==='course' && parts[1] && courseById(parts[1])){
      if(parts[2]==='module' && parts[3]){ setCourse(parts[1]); return 'm:'+parseInt(parts[3],10); }
      if(parts[2]==='quiz') return 'quiz:'+parts[1];
      if(parts[2]==='cert') return 'cert:'+parts[1];
      return 'c:'+parts[1];
    }
    return 'home';
  }
  function doRoute(go){
    lastGo = go || 'home';
    if(!go || go==='home') return renderHome();
    if(go==='signin') return renderSignIn();
    if(go==='achievements') return renderAchievements();
    if(go.indexOf('c:')===0){ setCourse(go.slice(2)); return renderCourse(); }
    if(go.indexOf('cert:')===0){ setCourse(go.slice(5)); return renderCert(); }
    if(go.indexOf('quiz:')===0){ setCourse(go.slice(5)); return renderQuiz(); }
    if(go.indexOf('m:')===0){ if(!cur) setCourse(COURSES[0].id); return renderModule(parseInt(go.slice(2))); }
    if(go==='quiz'){ if(!cur) setCourse(COURSES[0].id); return renderQuiz(); }
    if(go==='cert'){ if(!cur) setCourse(COURSES[0].id); return renderCert(); }
    if(go==='overview') return cur ? renderCourse() : renderHome();
    renderHome();
  }
  function route(go){
    doRoute(go);
    closeCourseNav();
    const h = toHash(lastGo);
    if(location.hash !== h){ settingHash = true; location.hash = h; }
  }
  window.addEventListener('hashchange', ()=>{
    if(settingHash){ settingHash = false; return; }
    const go = parseHash(location.hash);
    if(go !== null){ doRoute(go); closeCourseNav(); }
  });
  // Wire a data-go element for mouse AND keyboard (divs aren't focusable by
  // default — tabIndex + Enter/Space keeps the whole app keyboard-navigable).
  function wireGo(el){
    const go = ()=>route(el.dataset.go);
    el.addEventListener('click', e=>{ if(el.tagName==='A') e.preventDefault(); go(); });
    if(el.tagName!=='A' && el.tagName!=='BUTTON'){
      el.tabIndex = 0; el.setAttribute('role','link');
      el.addEventListener('keydown', e=>{ if(e.key==='Enter' || e.key===' '){ e.preventDefault(); go(); } });
    }
  }
  function bindGo(){ main.querySelectorAll('[data-go]').forEach(wireGo); }
  document.querySelectorAll('.topnav [data-go]').forEach(wireGo);

  /* ---------- Mobile course nav (sidebar drawer ≤820px) ---------- */
  const sbToggle = document.createElement('button');
  sbToggle.id = 'sbToggle'; sbToggle.className = 'sb-toggle';
  sbToggle.innerHTML = `${icon('menu')} <span>Course menu</span>`;
  sbToggle.setAttribute('aria-label','Open course menu');
  document.body.appendChild(sbToggle);
  const sbBackdrop = document.createElement('div');
  sbBackdrop.className = 'sb-backdrop';
  document.body.appendChild(sbBackdrop);
  function closeCourseNav(){ sb.classList.remove('open'); sbBackdrop.classList.remove('show'); }
  sbToggle.addEventListener('click', ()=>{ sb.classList.toggle('open'); sbBackdrop.classList.toggle('show', sb.classList.contains('open')); });
  sbBackdrop.addEventListener('click', closeCourseNav);

  /* ---------- Init ---------- */
  // Screenshot placeholders are an AUTHORING aid — on the live site, a module
  // figure with no PNG renders nothing rather than a placeholder stripe with
  // an internal filename (styles.css: .prod .shot.missing).
  if(!(/^(localhost|127\.|0\.0\.0\.0)/.test(location.hostname) || location.protocol==='file:'))
    document.documentElement.classList.add('prod');
  // Charlie's gear stays invisible until the first gear asset actually exists.
  (function(){ const t=new Image(); t.onload=()=>document.documentElement.classList.add('gear-ready'); t.src=GEAR[0].src; })();

  if(window.Backend && Backend.init()){
    Backend.onChange(async ()=>{
      renderNavAuth();
      if(Backend.user()){
        await syncFromServer();            // merge account ↔ local, pull credentials
        // Resume the route stashed before the magic-link round trip (e.g. the
        // quiz the learner was about to take) instead of dropping them on home.
        let next = null;
        try{ next = localStorage.getItem('cpa_next'); localStorage.removeItem('cpa_next'); }catch(e){}
        const go = next ? parseHash(next) : null;
        if(go && go !== 'signin') lastGo = go;
        else if(lastGo==='signin') lastGo='home';
      }
      route(lastGo);                       // re-render with fresh auth/progress state
    });
  }
  renderNavAuth();
  route(parseHash(location.hash) || 'home'); // deep link on load; auth-token hashes fall through to home
})();
