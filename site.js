/* ============================================================
   Montenegro — One Week. Shared bilingual site script.
   EN pages live at root; FR pages live in /fr/ (lang="fr").
   Image manifest, nav/footer, treatment switcher, FR/EN
   toggle, reveal-on-scroll. One edit point for all pages.
   ============================================================ */

/* ---- Language + base path ---- */
const LANG = (document.documentElement.lang === 'fr') ? 'fr' : 'en';
const BASE = (LANG === 'fr') ? '../' : '';   // assets + EN files live at root

const P = 'assets/img/';
const IMG = {
  kotorAerial:  P+'kotorAerial.jpg',
  kotorAerial3: P+'kotorAerial3.jpg',
  kotorAerial5: P+'kotorAerial5.jpg',
  sveti:        P+'sveti.jpg',
  svetiPano:    P+'svetiPano.jpg',
  kotorWalls:   P+'kotorWalls.jpg',
  kotorNight:   P+'kotorNight.jpg',
  kotorGate:    P+'kotorGate.jpg',
  cathedral:    P+'cathedral.jpg',
  perast:       P+'perast.jpg',
  ourLady:      P+'ourLady.jpg',
  lovcenRoad:   P+'lovcenRoad.jpg',
  mausoleum:    P+'mausoleum.jpg',
  budva:        P+'budva.jpg',
  budvaNight:   P+'budvaNight.jpg',
  skadar:       P+'skadar.jpg',
  kom:          P+'kom.jpg',
  pelican:      P+'pelican.jpg',
  ham:          P+'ham.jpg',
  fish:         P+'fish.jpg',
  petrovac:     P+'petrovac.jpg',
  cetinje:      P+'cetinje.jpg',
  boat:         P+'boat.jpg',
};
window.IMG = IMG;

/* ---- Navigation model: one source of truth, bilingual ---- */
const NAV = [
  { id: 'overview',  href: 'index.html',     en: 'Overview',      fr: 'Aperçu' },
  { id: 'route',     href: 'route.html',     en: 'The Route',     fr: 'L’Itinéraire' },
  { id: 'days',      href: 'days.html',      en: 'Day by Day',    fr: 'Jour par Jour' },
  { id: 'calendar',  href: 'calendar.html',  en: 'Calendar',      fr: 'Calendrier' },
  { id: 'stay',      href: 'stay.html',      en: 'Where to Stay', fr: 'Où Loger' },
  { id: 'cycling',   href: 'cycling.html',   en: 'Cycling',       fr: 'Vélo' },
  { id: 'food',      href: 'food.html',      en: 'Food & Drink',  fr: 'Table & Vins' },
  { id: 'practical', href: 'practical.html', en: 'Practical',     fr: 'Pratique' },
];

/* ---- UI strings ---- */
const T = {
  brandSub:   { en: 'One Week on the Adriatic', fr: 'Une semaine sur l’Adriatique' },
  footTitle:  { en: 'Have a wonderful trip.',   fr: 'Faites un merveilleux voyage.' },
  footTag:    { en: 'Montenegro · One Week · Beautifully Done', fr: 'Monténégro · Une semaine · Tout en beauté' },
  footMeta1:  { en: '7 days · 7 nights',        fr: '7 jours · 7 nuits' },
  footMeta2:  { en: 'Tivat → Bay of Kotor → Budva Riviera', fr: 'Tivat → Bouches de Kotor → Riviera de Budva' },
  footMeta3:  { en: 'Prepared by your personal holiday planner', fr: 'Préparé par votre conseiller voyage personnel' },
  tswLabel:   { en: 'Visual treatment',         fr: 'Style visuel' },
  menu:       { en: 'Menu',                     fr: 'Menu' },
};
const TREATMENTS = [
  { id: 'editorial', en: 'Editorial', fr: 'Éditorial' },
  { id: 'coastal',   en: 'Coastal',   fr: 'Côtier' },
  { id: 'nocturne',  en: 'Nocturne',  fr: 'Nocturne' },
];

function applyTreatment(t){
  document.documentElement.setAttribute('data-treatment', t);
  try { localStorage.setItem('mne-treatment', t); } catch(e){}
  document.querySelectorAll('.tsw-opt').forEach(b=>{
    b.setAttribute('aria-pressed', b.dataset.t === t ? 'true' : 'false');
  });
}
function initTreatment(){
  let t = 'editorial';
  try { t = localStorage.getItem('mne-treatment') || 'editorial'; } catch(e){}
  applyTreatment(t);
}

/* ---- Language toggle: same page, other language ---- */
function langToggleHref(){
  const file = (location.pathname.split('/').pop() || 'index.html');
  return (LANG === 'en') ? ('fr/' + file) : ('../' + file);
}

function buildHeader(){
  const page = document.body.dataset.page;
  const home = (LANG === 'fr') ? 'index.html' : 'index.html';
  const header = document.createElement('header');
  header.className = 'site-head';
  header.innerHTML = `
    <a class="brand" href="${home}">
      <span class="brand-mark" aria-hidden="true"></span>
      <span class="brand-name">Montenegro<span class="brand-sub">${T.brandSub[LANG]}</span></span>
    </a>
    <nav class="nav" aria-label="Sections">
      ${NAV.map(n => `<a class="nav-link${n.id===page?' is-active':''}" href="${n.href}">${n[LANG]}</a>`).join('')}
      <a class="lang-switch" href="${langToggleHref()}" aria-label="Switch language">
        <span class="${LANG==='en'?'on':''}">EN</span><span class="sep">/</span><span class="${LANG==='fr'?'on':''}">FR</span>
      </a>
    </nav>
    <button class="nav-toggle" aria-label="${T.menu[LANG]}"><span></span><span></span><span></span></button>`;
  document.body.prepend(header);
  const toggle = header.querySelector('.nav-toggle');
  toggle.addEventListener('click', ()=> header.classList.toggle('nav-open'));
  window.addEventListener('scroll', ()=>{
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, {passive:true});
}

function buildFooter(){
  const f = document.createElement('footer');
  f.className = 'site-foot reveal';
  f.innerHTML = `
    <div class="foot-inner">
      <div class="foot-brand">
        <div class="foot-title">${T.footTitle[LANG]}</div>
        <div class="foot-tag">${T.footTag[LANG]}</div>
      </div>
      <nav class="foot-nav" aria-label="Footer">
        ${NAV.map(n => `<a href="${n.href}">${n[LANG]}</a>`).join('')}
      </nav>
      <div class="foot-meta">
        <span>${T.footMeta1[LANG]}</span><span>${T.footMeta2[LANG]}</span><span>${T.footMeta3[LANG]}</span>
      </div>
    </div>`;
  document.body.appendChild(f);
}

function buildSwitcher(){
  const el = document.createElement('div');
  el.className = 'treatment-switch';
  el.innerHTML = `
    <span class="tsw-label">${T.tswLabel[LANG]}</span>
    <div class="tsw-opts">
      ${TREATMENTS.map(t=>`<button class="tsw-opt" data-t="${t.id}">${t[LANG]}</button>`).join('')}
    </div>`;
  document.body.appendChild(el);
  el.querySelectorAll('.tsw-opt').forEach(b=>{
    b.addEventListener('click', ()=> applyTreatment(b.dataset.t));
  });
  const cur = document.documentElement.getAttribute('data-treatment');
  el.querySelectorAll('.tsw-opt').forEach(b=> b.setAttribute('aria-pressed', b.dataset.t===cur?'true':'false'));
}

function syncSwitcher(t){
  document.querySelectorAll('.tsw-opt').forEach(b=>
    b.setAttribute('aria-pressed', b.dataset.t===t?'true':'false'));
}

function reveal(){
  const els = document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){ els.forEach(e=>e.classList.add('in')); return; }
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      if(en.isIntersecting){
        const t = en.target;
        const delay = t.dataset.delay ? parseInt(t.dataset.delay,10) : 0;
        setTimeout(()=> t.classList.add('in'), delay);
        io.unobserve(t);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  els.forEach(e=>io.observe(e));
}

function bindImages(){
  document.querySelectorAll('[data-img]').forEach(el=>{
    const u = IMG[el.dataset.img];
    if(u) el.src = BASE + u;
  });
  document.querySelectorAll('[data-bg]').forEach(el=>{
    const u = IMG[el.dataset.bg];
    if(u) el.style.backgroundImage = `url("${BASE + u}")`;
  });
}

function initDays(){
  document.querySelectorAll('details.day').forEach(d=>{
    d.addEventListener('toggle', ()=>{
      if(d.open && !d.dataset.multi){
        d.closest('.days')?.querySelectorAll('details.day[open]').forEach(o=>{ if(o!==d) o.open = false; });
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  initTreatment();
  bindImages();
  buildHeader();
  buildFooter();
  buildSwitcher();
  initDays();
  reveal();
});

const _apply = applyTreatment;
window.applyTreatment = function(t){ _apply(t); syncSwitcher(t); };
