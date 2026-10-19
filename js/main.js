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

$('#stats').innerHTML = DATA.stats.map(s =>
  `<div class="glass stat"><div class="n">${esc(s.n)}</div><div class="l">${esc(s.l)}</div></div>`).join('');

$('#timeline').innerHTML = DATA.timeline.map(t =>
  `<li class="${t.done?'done':''}"><div class="y">${esc(t.year)}</div><div class="t">${esc(t.title)}</div><div class="d">${esc(t.desc)}</div></li>`).join('');

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
  const offset = Math.min(projectStage.clientWidth * .39, 500);
  projectStage.style.setProperty('--slide-offset', `${offset}px`);
  projectStage.innerHTML = projects.map((p,index) => {
    const projectTags = p.focus || p.tech;
    const links = [
      real(p.github)?`<a class="mini" href="${esc(p.github)}" target="_blank" rel="noopener">GitHub ${arrow}</a>`:'',
      real(p.demo)?`<a class="mini" href="${esc(p.demo)}" ${p.demo.startsWith('#')?'':'target="_blank" rel="noopener"'}>${esc(p.demoLabel || 'Live Demo')} ${arrow}</a>`:'',
      real(p.details)?`<a class="mini" href="${esc(p.details)}" target="_blank" rel="noopener">Details ${arrow}</a>`:''
    ].join('');
    const image = p.image
      ? `<img class="project-image" src="${esc(p.image)}" alt="${esc(p.title)} project preview" loading="lazy">`
      : '<div class="project-image-empty" aria-hidden="true"></div>';
    const position = index===activeProject ? 'active' : index===(activeProject-1+projects.length)%projects.length ? 'prev' : index===(activeProject+1)%projects.length ? 'next' : 'hidden';
    return `<article class="glass card project-slide is-${position}" data-position="${position}" aria-hidden="${position!=='active'}" ${position==='active'?'':'inert'}>
    <div class="shot">${image}<span class="state ${esc(p.status)}">${esc(p.statusLabel)}</span></div>
    <div class="card-body"><h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p>
    <div class="stack">${projectTags.map(t=>`<span>${esc(t)}</span>`).join('')}</div>
    ${links?`<div class="card-links">${links}</div>`:''}</div></article>`;
  }).join('');
  projectDots.innerHTML = projects.map((p,index)=>
    `<button class="project-dot${index===activeProject?' is-active':''}" type="button" data-index="${index}" aria-label="Show project ${index+1}: ${esc(p.title)}" aria-pressed="${index===activeProject}"></button>`).join('');
  projectCount.textContent = `${String(activeProject+1).padStart(2,'0')} / ${String(projects.length).padStart(2,'0')}`;
}
renderProjects();

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
  projectStage.dataset.swapDirection=direction>0?'next':'prev';
  renderProjects();
}
function selectProject(index){
  const projects=getVisibleProjects();
  if(!projects.length||index===activeProject) return;
  const forward=(index-activeProject+projects.length)%projects.length;
  projectStage.dataset.swapDirection=forward<=projects.length/2?'next':'prev';
  activeProject=index;
  renderProjects();
}
projectStage.addEventListener('animationend',e=>{
  if(e.target.matches('.project-slide.is-active')) delete projectStage.dataset.swapDirection;
});
projectDots.addEventListener('click',e=>{
  const dot=e.target.closest('.project-dot'); if(!dot) return;
  selectProject(Number(dot.dataset.index));
});
projectStage.addEventListener('keydown',e=>{
  if(e.key==='ArrowLeft'){e.preventDefault();moveProject(-1);}
  if(e.key==='ArrowRight'){e.preventDefault();moveProject(1);}
});
let pointerStart = null;
let draggedProject = false;
projectStage.addEventListener('pointerdown',e=>{
  if(!e.isPrimary||e.button!==0||e.target.closest('a,button')) return;
  pointerStart={id:e.pointerId,x:e.clientX,y:e.clientY};
  draggedProject=false;
  projectStage.setPointerCapture(e.pointerId);
});
projectStage.addEventListener('pointermove',e=>{
  if(!pointerStart||e.pointerId!==pointerStart.id) return;
  const dx=e.clientX-pointerStart.x;
  const dy=e.clientY-pointerStart.y;
  if(Math.abs(dx)>8&&Math.abs(dx)>Math.abs(dy)) {
    draggedProject=true;
    projectStage.classList.add('is-dragging');
  }
});
function clearProjectSwipe(e){
  if(!pointerStart||e.pointerId!==pointerStart.id) return;
  if(projectStage.hasPointerCapture(e.pointerId)) projectStage.releasePointerCapture(e.pointerId);
  pointerStart=null;
  projectStage.classList.remove('is-dragging');
}
function endProjectSwipe(e){
  if(!pointerStart||e.pointerId!==pointerStart.id) return;
  const dx=e.clientX-pointerStart.x;
  const dy=e.clientY-pointerStart.y;
  if(draggedProject&&Math.abs(dx)>=48&&Math.abs(dx)>Math.abs(dy)) {
    moveProject(dx<0?1:-1);
  }
  clearProjectSwipe(e);
}
projectStage.addEventListener('pointerup',endProjectSwipe);
projectStage.addEventListener('pointercancel',e=>{
  clearProjectSwipe(e);
  draggedProject=false;
});
projectStage.addEventListener('click',e=>{
  if(!draggedProject) return;
  e.preventDefault();
  e.stopPropagation();
  draggedProject=false;
},true);

let horizontalWheel=0;
let wheelLocked=false;
let wheelResetTimer;
projectStage.addEventListener('wheel',e=>{
  if(Math.abs(e.deltaX)<=Math.abs(e.deltaY)) return;
  e.preventDefault();
  clearTimeout(wheelResetTimer);
  if(wheelLocked) {
    wheelResetTimer=setTimeout(()=>{wheelLocked=false;},450);
    return;
  }
  horizontalWheel+=e.deltaX;
  if(Math.abs(horizontalWheel)<55) {
    wheelResetTimer=setTimeout(()=>{horizontalWheel=0;},450);
    return;
  }
  moveProject(horizontalWheel>0?1:-1);
  horizontalWheel=0;
  wheelLocked=true;
  wheelResetTimer=setTimeout(()=>{wheelLocked=false;},450);
},{passive:false});
addEventListener('resize',renderProjects,{passive:true});

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

$('#stackGroups').innerHTML = DATA.stack.map(g=>`<div class="glass sg"><h4>${esc(g.group)}</h4>
  ${g.items.map(t=>`<div class="tech" tabindex="0"><span class="dot" aria-hidden="true"></span>
  <span>${esc(t.name)}</span><span class="lv">${esc(t.level)}</span>
  <div class="pop"><b>${esc(t.used)}</b>${esc(t.note)}</div></div>`).join('')}</div>`).join('');

$('#skillGrid').innerHTML = DATA.skills.map(s=>{
  const f = Math.round(s.pct/10);
  return `<div class="glass skill"><div class="skill-top"><span>${esc(s.name)}</span><span class="pc">${s.pct}%</span></div>
  <div class="meter" role="img" aria-label="${esc(s.name)}: ${s.pct} percent">
  ${Array.from({length:10},(_,i)=>`<i class="${i<f?'on':''}"></i>`).join('')}</div></div>`;
}).join('');

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

const noteCats = Array.from(new Set(DATA.notes.map(n=>n.cat)));
$('#notes').innerHTML = DATA.notes.map(n=>`
  <article class="glass note" data-cat="${esc(n.cat)}" data-hay="${esc((n.title+' '+n.body+' '+n.tags.join(' ')+' '+n.cat).toLowerCase())}">
  <h4>${n.fav?'<span class="star">★</span>':''}${esc(n.title)}</h4><p>${esc(n.body)}</p>
  ${n.code?`<code>${esc(n.code)}</code>`:''}
  <div class="tg">${n.tags.map(t=>`<span>#${esc(t)}</span>`).join('')}</div></article>`).join('')
  + '<div class="empty" id="noEmpty" hidden>No notes match that search.</div>';

let gardenCat = 'All';
function filterGarden(){
  const q = $('#gardenSearch').value.trim().toLowerCase();
  let shown = 0;
  $$('#notes .note').forEach(n=>{
    const ok = (gardenCat==='All'||n.dataset.cat===gardenCat) && (!q||n.dataset.hay.indexOf(q)!==-1);
    n.hidden = !ok; if(ok) shown++;
  });
  $('#noEmpty').hidden = shown>0;
}
$('#gardenFilters').innerHTML = ['All'].concat(noteCats).map((c,i)=>
  `<button class="chip" data-v="${esc(c)}" aria-pressed="${i===0}">${esc(c)}</button>`).join('');
$('#gardenFilters').addEventListener('click', e=>{
  const chip = e.target.closest('.chip'); if(!chip) return;
  gardenCat = chip.dataset.v;
  $$('#gardenFilters .chip').forEach(c=>c.setAttribute('aria-pressed', String(c.dataset.v===gardenCat)));
  filterGarden();
});
$('#gardenSearch').addEventListener('input', filterGarden);

const roadLabel = {done:'Completed',now:'In progress',next:'Ahead'};
$('#road').innerHTML = DATA.road.map(r=>
  `<div class="glass node ${esc(r.state)}"><span class="st">${roadLabel[r.state]}</span><div class="nm">${esc(r.name)}</div></div>`).join('');

/* contact links — filled from DATA.contact; unset ones stay hidden */
const C = DATA.contact || {};
function setLink(id, url){
  const a = document.getElementById(id);
  if (!a) return;
  if (real(url)) { a.href = url; a.hidden = false; } else { a.hidden = true; }
}
if (real(C.email)) {
  $('#reachEmail').href = 'mailto:' + C.email;
  $('#reachEmail span').textContent = C.email;
}
setLink('reachGithub', C.github);   setLink('footGithub', C.github);
setLink('reachLinkedin', C.linkedin); setLink('footLinkedin', C.linkedin);
setLink('footResume', C.resume);
const ghUser = real(C.github) && C.github.replace(/\/+$/,'').split('/').pop();
if (ghUser) $('#reachGithub span').textContent = 'github.com/' + ghUser;
const liUser = real(C.linkedin) && C.linkedin.replace(/\/+$/,'').split('/').pop();
if (liUser) $('#reachLinkedin span').textContent = 'linkedin.com/in/' + liUser;

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

/* highlight the section currently in view */
const ids = ['top','about','projects','stack','learning','skills','garden','contact'];
const io2 = new IntersectionObserver(entries=>{
  const vis = entries.filter(e=>e.isIntersecting);
  if(!vis.length) return;
  const id = '#'+vis[0].target.id;
  $$('.nav-links a, .drawer a').forEach(a=>{
    if(a.getAttribute('href')===id) a.setAttribute('aria-current','true');
    else a.removeAttribute('aria-current');
  });
}, {rootMargin:'-20% 0px -70% 0px'});
ids.map(i=>document.getElementById(i)).filter(Boolean).forEach(s=>io2.observe(s));

/* theme — remembered per browser; storage failures just mean it isn't remembered */
try { const t = localStorage.getItem('portfolioTheme'); if (t==='light'||t==='dark') document.documentElement.dataset.theme = t; } catch(e){}
$('#theme').addEventListener('click', ()=>{
  const el = document.documentElement;
  el.dataset.theme = el.dataset.theme==='dark' ? 'light' : 'dark';
  try { localStorage.setItem('portfolioTheme', el.dataset.theme); } catch(e){}
});

$('#send').addEventListener('click', ()=>{
  const n=$('#cname').value.trim(), m=$('#cmail').value.trim(), msg=$('#cmsg').value.trim();
  const note=$('#formNote');
  if(!n||!m||!msg){ note.textContent='Please fill in all three fields.'; note.style.color='#E06C6C'; return; }
  if(!$('#cmail').checkValidity()){ note.textContent='That email address doesn\'t look right.'; note.style.color='#E06C6C'; return; }
  if(!real(C.email)){ note.textContent='Email contact is not configured yet.'; note.style.color='#E06C6C'; return; }
  note.textContent='Opening Gmail compose…'; note.style.color='var(--mint)';
  const subject='Portfolio message from '+n;
  const body=msg+'\n\n— '+n+'\nReply to: '+m;
  const composeUrl=`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(C.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.open(composeUrl,'_blank','noopener,noreferrer');
});

if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
  $$('section > .wrap > *').forEach(el=>el.classList.add('rv'));
  const io = new IntersectionObserver(es=>{
    es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
  },{threshold:.08, rootMargin:'0px 0px -40px 0px'});
  $$('.rv').forEach(el=>io.observe(el));
}else{ $$('.rv').forEach(el=>el.classList.add('in')); }
