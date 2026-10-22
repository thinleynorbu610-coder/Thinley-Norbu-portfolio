/* ══════════════════════════════════════════════════════════
   RENDER + BEHAVIOUR — reads content from js/data.js and
   builds the page. You shouldn't need to edit this file to
   add content or images; edit js/data.js instead.
   ══════════════════════════════════════════════════════════ */
const $ = s => document.querySelector(s);
const $$ = s => Array.prototype.slice.call(document.querySelectorAll(s));
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
/* a link is "real" if it's set and isn't a bare "#" placeholder */
const real = u => !!u && u !== '#';
const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg>';

if ($('#stats')) $('#stats').innerHTML = DATA.stats.map(s =>
  `<div class="glass stat"><div class="n">${esc(s.n)}</div><div class="l">${esc(s.l)}</div></div>`).join('');

if ($('#timeline')) $('#timeline').innerHTML = DATA.timeline.map(t =>
  `<li class="${t.done?'done':''}"><div class="y">${esc(t.year)}</div><div class="t">${esc(t.title)}</div><div class="d">${esc(t.desc)}</div></li>`).join('');

/* ══════════════ PROJECTS (projects page only) ══════════════ */
if ($('#projectStage')) {
let projectCategory = 'All';
let activeProject = 0;
const projectStage = $('#projectStage');
const projectCount = $('#projectCount');
const projectDots = $('#projectDots');
const projectFilters = $('#projFilters');

function getVisibleProjects(){
  return DATA.projects.filter(p=>projectCategory==='All'||p.category===projectCategory);
}

function renderProjects(){
  const projects = getVisibleProjects();
  if (!projects.length) {
    projectStage.innerHTML = '<p class="empty">No projects in this category yet.</p>';
    projectDots.innerHTML = '';
    projectCount.textContent = '00 / 00';
    return;
  }
  activeProject = (activeProject + projects.length) % projects.length;
  projectStage.innerHTML = projects.map((p,index) => {
    const projectTags = p.focus || p.tech;
    const links = [
      real(p.github)?`<a class="mini" href="${esc(p.github)}" target="_blank" rel="noopener">GitHub ${arrow}</a>`:'',
      real(p.demo)?`<a class="mini" href="${esc(p.demo)}" ${/^https?:\/\//.test(p.demo)?'target="_blank" rel="noopener"':''}>${esc(p.demoLabel || 'Live Demo')} ${arrow}</a>`:'',
      real(p.details)?`<a class="mini" href="${esc(p.details)}" ${/^https?:\/\//.test(p.details)?'target="_blank" rel="noopener"':''}>${esc(p.detailsLabel || 'Details')} ${arrow}</a>`:''
    ].join('');
    const image = p.image
      ? `<img class="project-image" src="${esc(p.image)}" alt="${esc(p.title)} project preview" loading="lazy">`
      : '<div class="project-image-empty" aria-hidden="true"></div>';
    return `<article class="glass card project-slide" data-index="${index}">
    <div class="shot">${image}<span class="state ${esc(p.status)}">${esc(p.statusLabel)}</span></div>
    <div class="card-body"><h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p>
    <div class="stack">${projectTags.map(t=>`<span>${esc(t)}</span>`).join('')}</div>
    ${links?`<div class="card-links">${links}</div>`:''}</div></article>`;
  }).join('');
  projectDots.innerHTML = projects.map((p,index)=>
    `<button class="project-dot" type="button" data-index="${index}" aria-label="Show project ${index+1}: ${esc(p.title)}"></button>`).join('');
  /* first paint: place cards without animating them in from nowhere */
  projectStage.classList.add('no-anim');
  layoutProjects();
  equalizeProjectHeights();
  void projectStage.offsetWidth;
  projectStage.classList.remove('no-anim');
}

/* positions the existing cards around the active one. Cards are never rebuilt
   here, so CSS transitions glide each card from its old spot to its new one. */
function layoutProjects(){
  const slides = $$('#projectStage .project-slide');
  const n = slides.length;
  if (!n) return;
  const offset = Math.min(projectStage.clientWidth * .39, 500);
  projectStage.style.setProperty('--slide-offset', `${offset}px`);
  slides.forEach((slide,index) => {
    /* shortest signed distance around the loop: -1 = left, +1 = right */
    let d = (index - activeProject + n) % n;
    if (d > n/2) d -= n;
    const position = d===0 ? 'active' : d===-1 ? 'prev' : d===1 ? 'next' : d<0 ? 'hidden-prev' : 'hidden-next';
    slide.className = `glass card project-slide is-${position}`;
    slide.setAttribute('aria-hidden', String(position!=='active'));
    slide.inert = position!=='active';
  });
  $$('#projectDots .project-dot').forEach((dot,index) => {
    dot.classList.toggle('is-active', index===activeProject);
    dot.setAttribute('aria-pressed', String(index===activeProject));
  });
  projectCount.textContent = `${String(activeProject+1).padStart(2,'0')} / ${String(n).padStart(2,'0')}`;
}

/* desktop: every card gets the height of the tallest one so side cards line up.
   phones: cards keep their natural height and the stage follows the active card,
   so a short card isn't padded with empty space. */
const phoneCarousel = matchMedia('(max-width:700px)');
function equalizeProjectHeights(){
  const slides = $$('#projectStage .project-slide');
  slides.forEach(s => { s.style.height = ''; });
  if (phoneCarousel.matches) {
    const active = projectStage.querySelector('.project-slide.is-active');
    if (active) projectStage.style.height = (active.offsetHeight + 56) + 'px';
    return;
  }
  const tallest = Math.max(0, ...slides.map(s => s.offsetHeight));
  if (!tallest) return;
  slides.forEach(s => { s.style.height = tallest + 'px'; });
  /* stage fits the cards with room for the active card's shadow */
  projectStage.style.height = (tallest + 56) + 'px';
}
renderProjects();
if (document.fonts && document.fonts.ready) document.fonts.ready.then(equalizeProjectHeights);
addEventListener('load', equalizeProjectHeights);

projectFilters.dataset.current = projectCategory;
projectFilters.innerHTML = ['All','Web','UI/UX','Backend','Data','Academic'].map((category,index)=>
  `<button class="chip" data-v="${esc(category)}" aria-pressed="${index===0}">${esc(category)}</button>`).join('');
projectFilters.addEventListener('click',e=>{
  const chip=e.target.closest('.chip'); if(!chip) return;
  projectCategory=chip.dataset.v;
  activeProject=0;
  projectFilters.dataset.current=projectCategory;
  $$('#projFilters .chip').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.v===projectCategory)));
  renderProjects();
});
function moveProject(direction){
  const projects=getVisibleProjects();
  if(!projects.length) return;
  activeProject=(activeProject+direction+projects.length)%projects.length;
  layoutProjects();
  if(phoneCarousel.matches) equalizeProjectHeights();
}
function selectProject(index){
  const projects=getVisibleProjects();
  if(!projects.length||index===activeProject) return;
  activeProject=index;
  layoutProjects();
  if(phoneCarousel.matches) equalizeProjectHeights();
}
projectDots.addEventListener('click',e=>{
  const dot=e.target.closest('.project-dot'); if(!dot) return;
  selectProject(Number(dot.dataset.index));
});
projectStage.addEventListener('keydown',e=>{
  if(e.key==='ArrowLeft'){e.preventDefault();moveProject(-1);}
  if(e.key==='ArrowRight'){e.preventDefault();moveProject(1);}
});
/* drag / swipe with mouse, pen or finger. The cards follow the pointer while
   dragging (via --drag-x) and glide to their new spot on release. */
let pointerStart = null;
let draggedProject = false;
let suppressClick = false;
projectStage.addEventListener('pointerdown',e=>{
  suppressClick=false;              // a fresh press never inherits the last swipe
  if(!e.isPrimary||e.button!==0||e.target.closest('a,button')) return;
  pointerStart={id:e.pointerId,x:e.clientX,y:e.clientY,t:performance.now()};
  draggedProject=false;
  try{ projectStage.setPointerCapture(e.pointerId); }catch(err){}
});
projectStage.addEventListener('pointermove',e=>{
  if(!pointerStart||e.pointerId!==pointerStart.id) return;
  const dx=e.clientX-pointerStart.x;
  const dy=e.clientY-pointerStart.y;
  if(!draggedProject&&Math.abs(dx)>8&&Math.abs(dx)>Math.abs(dy)) {
    draggedProject=true;
    projectStage.classList.add('is-dragging');
  }
  if(draggedProject) projectStage.style.setProperty('--drag-x', `${dx*.85}px`);
});
function clearProjectSwipe(e){
  if(!pointerStart||e.pointerId!==pointerStart.id) return;
  try{ if(projectStage.hasPointerCapture(e.pointerId)) projectStage.releasePointerCapture(e.pointerId); }catch(err){}
  pointerStart=null;
  draggedProject=false;
  projectStage.classList.remove('is-dragging');
  projectStage.style.removeProperty('--drag-x');
}
function endProjectSwipe(e){
  if(!pointerStart||e.pointerId!==pointerStart.id) return;
  const dx=e.clientX-pointerStart.x;
  const dy=e.clientY-pointerStart.y;
  const quick=performance.now()-pointerStart.t<300;
  /* a long drag, or a short fast flick, both count */
  if(draggedProject&&Math.abs(dx)>Math.abs(dy)&&(Math.abs(dx)>=48||(quick&&Math.abs(dx)>=24))) {
    moveProject(dx<0?1:-1);
  }
  /* swallow only the click that the mouse fires right after this drag */
  if(draggedProject){ suppressClick=true; setTimeout(()=>{suppressClick=false;},0); }
  clearProjectSwipe(e);
}
projectStage.addEventListener('pointerup',endProjectSwipe);
projectStage.addEventListener('pointercancel',clearProjectSwipe);
projectStage.addEventListener('lostpointercapture',clearProjectSwipe);
projectStage.addEventListener('click',e=>{
  if(!suppressClick) return;
  e.preventDefault();
  e.stopPropagation();
  suppressClick=false;
},true);
projectStage.addEventListener('dragstart',e=>e.preventDefault());

/* touchpad: one move per swipe gesture. A new gesture starts after a short
   pause, when the deltas speed up again during the momentum tail, or when the
   direction flips — so back-to-back swipes each register. */
let wheelAcc=0, wheelArmed=true, wheelLastT=0, wheelLastAbs=0, wheelLastSign=0;
projectStage.addEventListener('wheel',e=>{
  if(Math.abs(e.deltaX)<=Math.abs(e.deltaY)) return;
  e.preventDefault();
  const now=performance.now();
  const abs=Math.abs(e.deltaX);
  const sign=Math.sign(e.deltaX);
  const newGesture = now-wheelLastT>140
    || (sign!==wheelLastSign)
    || (!wheelArmed && abs>8 && abs>wheelLastAbs*1.6);
  if(newGesture){ wheelAcc=0; wheelArmed=true; }
  wheelLastT=now; wheelLastAbs=abs; wheelLastSign=sign;
  if(!wheelArmed) return;
  wheelAcc+=e.deltaX;
  if(Math.abs(wheelAcc)>=50){
    moveProject(wheelAcc>0?1:-1);
    wheelAcc=0;
    wheelArmed=false;
  }
},{passive:false});
let projectResizeTimer;
addEventListener('resize',()=>{
  clearTimeout(projectResizeTimer);
  projectResizeTimer=setTimeout(()=>{
    projectStage.classList.add('no-anim');
    layoutProjects();
    equalizeProjectHeights();
    void projectStage.offsetWidth;
    projectStage.classList.remove('no-anim');
  },120);
},{passive:true});
} /* end projects */

function buildFilter(mountSel, targetSel, cats, attr){
  const mount = $(mountSel);
  mount.dataset.current = 'All';
  mount.innerHTML = ['All'].concat(cats).map((category,index)=>
    `<button class="chip" data-v="${esc(category)}" aria-pressed="${index===0}">${esc(category)}</button>`).join('');
  mount.addEventListener('click',e=>{
    const chip=e.target.closest('.chip'); if(!chip) return;
    const value=chip.dataset.v;
    mount.dataset.current=value;
    $$(mountSel+' .chip').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.v===value)));
    $$(targetSel).forEach(item=>{item.hidden=!(value==='All'||item.dataset[attr]===value);});
  });
}

if ($('#stackGroups')) $('#stackGroups').innerHTML = DATA.stack.map(g=>`<div class="glass sg"><h4>${esc(g.group)}</h4>
  ${g.items.map(t=>`<div class="tech" tabindex="0"><span class="dot" aria-hidden="true"></span>
  <span>${esc(t.name)}</span><span class="lv">${esc(t.level)}</span>
  <div class="pop"><b>${esc(t.used)}</b>${esc(t.note)}</div></div>`).join('')}</div>`).join('');

if ($('#skillGrid')) $('#skillGrid').innerHTML = DATA.skills.map(s=>{
  const f = Math.round(s.pct/10);
  return `<div class="glass skill"><div class="skill-top"><span>${esc(s.name)}</span><span class="pc">${s.pct}%</span></div>
  <div class="meter" role="img" aria-label="${esc(s.name)}: ${s.pct} percent">
  ${Array.from({length:10},(_,i)=>`<i class="${i<f?'on':''}"></i>`).join('')}</div></div>`;
}).join('');

if ($('#logs')) {
$('#logs').innerHTML = DATA.logs.map(l=>{
  const d = Array.from({length:5},(_,i)=>`<i class="${i<l.difficulty?'on':''}"></i>`).join('');
  return `<article class="glass log" data-cat="${esc(l.category)}">
  <div class="log-meta"><span class="cat">${esc(l.category)}</span><span>${esc(l.date)}</span>
  <span class="diff" aria-label="Difficulty ${l.difficulty} of 5">${d}</span><span class="st">${esc(l.status)}</span></div>
  <h3>${esc(l.topic)}</h3><dl>
  <div><dt>What I learned</dt><dd>${esc(l.learned)}</dd></div>
  <div><dt>How I applied it</dt><dd>${esc(l.applied)}</dd></div>
  <div><dt>What's next</dt><dd>${esc(l.next)}</dd></div></dl>
  <div class="stack">${l.tech.map(t=>`<span>${esc(t)}</span>`).join('')}</div></article>`;
}).join('');
buildFilter('#logFilters','#logs .log',['Frontend','Backend','Database','DevOps','UI/UX','Programming','Project Management','Data','Mathematics'],'cat');
}

const roadLabel = {done:'Completed',now:'In progress',next:'Ahead'};
if ($('#road')) $('#road').innerHTML = DATA.road.map(r=>
  `<div class="glass node ${esc(r.state)}"><span class="st">${roadLabel[r.state]}</span><div class="nm">${esc(r.name)}</div></div>`).join('');

/* ══════════════ TEAM (team page only) ══════════════ */
const T = DATA.team;
const personIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="12" cy="8.5" r="3.8"/><path d="M4.5 20.2c1.2-3.6 4.1-5.6 7.5-5.6s6.3 2 7.5 5.6"/></svg>';
if (T && $('#teamMembers')) {
  $('#teamMembers').innerHTML = T.members.map(m => `
  <article class="glass member${m.lead?' is-lead':''}${m.me?' is-me':''}">
    <div class="member-avatar">${m.photo
      ? `<img src="${esc(m.photo)}" alt="${esc(m.name)}" loading="lazy">`
      : personIcon}</div>
    <div class="member-badges">${m.lead?'<span class="mb lead">Team lead</span>':''}${m.me?'<span class="mb me">That\'s me</span>':''}</div>
    <h3>${esc(m.name)}</h3>
    <p class="member-role">${esc(m.role)}</p>
    <p class="member-tag">${esc(m.tagline)}</p>
    <div class="stack">${m.skills.map(s=>`<span>${esc(s)}</span>`).join('')}</div>
  </article>`).join('');
}
if (T && $('#teamWork')) {
  $('#teamWork').innerHTML = T.work.map(w => `
  <article class="glass tw">
    <div class="tw-head"><h3>${esc(w.title)}</h3><span class="tw-status">${esc(w.status)}</span></div>
    <dl>
      <div><dt>The problem</dt><dd>${esc(w.problem)}</dd></div>
      <div><dt>What we're building</dt><dd>${esc(w.solution)}</dd></div>
    </dl>
    <div class="stack">${w.tech.map(t=>`<span>${esc(t)}</span>`).join('')}</div>
  </article>`).join('');
}
if (T && $('#teamServices')) {
  $('#teamServices').innerHTML = T.services.map((s,i) => `
  <div class="glass svc"><span class="svc-n">${String(i+1).padStart(2,'0')}</span><h4>${esc(s.title)}</h4><p>${esc(s.desc)}</p></div>`).join('');
}
if (T && $('#teamSite') && real(T.site)) { $('#teamSite').href = T.site; $('#teamSite').hidden = false; }

/* contact links — filled from DATA.contact; unset ones stay hidden */
const C = DATA.contact || {};
function setLink(id, url){
  const a = document.getElementById(id);
  if (!a) return;
  if (real(url)) { a.href = url; a.hidden = false; } else { a.hidden = true; }
}
/* the footer is on every page; the contact rows only on the contact page */
const reachEmail = $('#reachEmail'), reachGithub = $('#reachGithub'), reachLinkedin = $('#reachLinkedin');
if (real(C.email) && reachEmail) {
  reachEmail.href = 'mailto:' + C.email;
  reachEmail.querySelector('span').textContent = C.email;
}
/* github may be one URL or a list — each account gets its own contact row
   and footer link, labelled with its username so they're easy to tell apart */
const githubs = [].concat(C.github || []).filter(real);
const ghName = url => url.replace(/\/+$/,'').split('/').pop();
/* footer social links are icons: name them with a tooltip + screen-reader label */
function labelIcon(a, label){ a.title = label; a.setAttribute('aria-label', label); }
const footGithub = $('#footGithub');
setLink('reachGithub', githubs[0]); setLink('footGithub', githubs[0]);
if (githubs[0]) {
  if (reachGithub) reachGithub.querySelector('span').textContent = 'github.com/' + ghName(githubs[0]);
  if (footGithub) labelIcon(footGithub, 'GitHub @' + ghName(githubs[0]));
}
githubs.slice(1).reverse().forEach(url => {
  if (reachGithub) {
    const row = reachGithub.cloneNode(true);
    row.removeAttribute('id'); row.href = url;
    row.querySelector('span').textContent = 'github.com/' + ghName(url);
    reachGithub.after(row);
  }
  if (footGithub) {
    const foot = footGithub.cloneNode(true);
    foot.removeAttribute('id'); foot.href = url;
    labelIcon(foot, 'GitHub @' + ghName(url));
    footGithub.after(foot);
  }
});
setLink('reachLinkedin', C.linkedin); setLink('footLinkedin', C.linkedin);
setLink('footResume', C.resume);
const liUser = real(C.linkedin) && C.linkedin.replace(/\/+$/,'').split('/').pop();
if (liUser && reachLinkedin) reachLinkedin.querySelector('span').textContent = 'linkedin.com/in/' + liUser;
if (liUser && $('#footLinkedin')) labelIcon($('#footLinkedin'), 'LinkedIn: ' + liUser);
/* footer email (icon + written address) and the current year */
if (real(C.email)) {
  if ($('#footEmail')) { $('#footEmail').href = 'mailto:' + C.email; labelIcon($('#footEmail'), 'Email ' + C.email); }
  if ($('#footEmailText')) { $('#footEmailText').href = 'mailto:' + C.email; $('#footEmailText span').textContent = C.email; }
}
if ($('#footYear')) $('#footYear').textContent = new Date().getFullYear();

/* ══════════════ BEHAVIOUR ══════════════ */
const nav = $('#nav'), links = $('#navLinks'), burger = $('#burger'),
      drawer = $('#drawer'), progress = $('#progress');

$('#drawerLinks').innerHTML = links.innerHTML;

addEventListener('scroll', ()=>{
  nav.classList.toggle('stuck', scrollY > 12);
  const max = document.body.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${max>0 ? scrollY/max : 0})`;
}, {passive:true});

burger.addEventListener('click', ()=>{
  const open = drawer.classList.toggle('open');
  burger.setAttribute('aria-expanded', String(open));
});
drawer.addEventListener('click', e=>{
  if(e.target.tagName==='A'){ drawer.classList.remove('open'); burger.setAttribute('aria-expanded','false'); }
});

/* highlight the page we're on. Works for /about.html and for hosts that
   serve it as /about; the home page is / or /index.html. */
const here = (location.pathname.split('/').pop() || 'index.html').replace(/\.html$/,'') || 'index';
$$('.nav-links a, .drawer a').forEach(a=>{
  const target = a.getAttribute('href').replace(/\.html$/,'');
  if (target === here) a.setAttribute('aria-current','page');
  else a.removeAttribute('aria-current');
});

/* theme — remembered per browser; storage failures just mean it isn't remembered */
try { const t = localStorage.getItem('portfolioTheme'); if (t==='light'||t==='dark') document.documentElement.dataset.theme = t; } catch(e){}
$('#theme').addEventListener('click', ()=>{
  const el = document.documentElement;
  el.dataset.theme = el.dataset.theme==='dark' ? 'light' : 'dark';
  try { localStorage.setItem('portfolioTheme', el.dataset.theme); } catch(e){}
});

/* contact form — sends straight to DATA.contact.email through FormSubmit
   (formsubmit.co), so visitors never leave the page or need a mail app.
   The very first message triggers a one-time "Activate" email from
   FormSubmit to that inbox; after you click it, every message arrives. */
const sendBtn = $('#send');
function setNote(text, color, html){
  const note = $('#formNote');
  if (html) note.innerHTML = html; else note.textContent = text;
  note.style.color = color;
}
if (sendBtn) sendBtn.addEventListener('click', async ()=>{
  const n=$('#cname').value.trim(), m=$('#cmail').value.trim(), msg=$('#cmsg').value.trim();
  if(!n||!m||!msg){ setNote('Please fill in all three fields.','#E06C6C'); return; }
  if(!$('#cmail').checkValidity()){ setNote('That email address doesn\'t look right.','#E06C6C'); return; }
  if(!real(C.email)){ setNote('Email contact is not configured yet.','#E06C6C'); return; }
  const endpoint = C.formEndpoint || `https://formsubmit.co/ajax/${C.email.trim()}`;
  const subject = 'Portfolio message from ' + n;

  sendBtn.disabled = true;
  setNote('Sending…','var(--fg-2)');
  try {
    const res = await fetch(endpoint, {
      method:'POST',
      headers:{'Content-Type':'application/json', Accept:'application/json'},
      body:JSON.stringify({
        name:n, email:m, message:msg,      // "email" becomes the Reply-To in your inbox
        _subject:subject, _template:'table', _captcha:'false', _honey:$('#chp').value
      })
    });
    const data = await res.json().catch(()=>({}));
    if (!res.ok || String(data.success) !== 'true') throw new Error(data.message || 'Send failed');
    $('#cname').value = ''; $('#cmail').value = ''; $('#cmsg').value = '';
    setNote(`Thanks ${n} — your message was sent. I’ll reply to ${m}.`,'var(--mint)');
  } catch (err) {
    /* never lose a message: offer a direct email link with everything pre-filled */
    const body = msg + '\n\n— ' + n + '\nReply to: ' + m;
    const mailto = `mailto:${C.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setNote('', '#E06C6C', `Couldn’t send right now. <a href="${esc(mailto)}" style="color:inherit">Email me directly</a> instead.`);
  } finally {
    sendBtn.disabled = false;
  }
});

if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
  $$('section > .wrap > *').forEach(el=>el.classList.add('rv'));
  const io = new IntersectionObserver(es=>{
    es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
  },{threshold:.08, rootMargin:'0px 0px -40px 0px'});
  $$('.rv').forEach(el=>io.observe(el));
}else{ $$('.rv').forEach(el=>el.classList.add('in')); }
