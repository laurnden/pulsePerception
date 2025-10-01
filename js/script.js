// ---------- text / locales ----------
    const locales = {

en: {
  scrollHint: 'scroll to reveal •',
  intro: 'micro-study on perception: small shifts flip the meaning.',
  fightersTitle: 'CHOOSE YOUR LENS',
  fightersSub: 'three angles, three logics',
  hgBadge: 'OVERVIEW · CLARITY · PATTERN',
  hgTitle: 'HIGH LENS',
  hgBody: 'from distance: the outline is simple, the noise irrelevant.',
  mgBadge: 'BALANCE · CONTEXT · FLUX',
  mgTitle: 'MID LENS',
  mgBody: 'in between: nothing is fixed, every edge negotiates.',
  lgBadge: 'DETAIL · NOISE · SUBTEXT',
  lgTitle: 'GROUND LENS',
  lgBody: 'close-up: detail screams, sense slows down.',
  ctaTitle: 'PERSPECTIVE WRITES OUTCOME',
  ctaSub: 'shift the lens, the story reorders.',
  ctaA: 'TRACE IT',
  ctaB: 'RESET THE VIEW',
  ctaFine: 'perception edits the script',
  sights: 'dual sight tool'
},


es: {
  scrollHint: 'desplaza para revelar •',
  intro: 'microestudio de percepción: un giro mínimo cambia el sentido.',
  fightersTitle: 'ELIGE TU LENTE',
  fightersSub: 'tres ángulos, tres lógicas',
  hgBadge: 'PANORAMA · CLARIDAD · PATRÓN',
  hgTitle: 'LENTE ALTA',
  hgBody: 'a distancia: el esquema es claro, el ruido irrelevante.',
  mgBadge: 'EQUILIBRIO · CONTEXTO · FLUJO',
  mgTitle: 'LENTE MEDIA',
  mgBody: 'en medio: nada es fijo, cada borde negocia.',
  lgBadge: 'DETALLE · RUIDO · SUBTEXTO',
  lgTitle: 'LENTE A RAS',
  lgBody: 'de cerca: el detalle grita, el sentido se retrasa.',
  ctaTitle: 'LA PERSPECTIVA ESCRIBE EL RESULTADO',
  ctaSub: 'cambia la lente, la historia se reordena.',
  ctaA: 'RÁSTREALO',
  ctaB: 'REINICIA LA VISTA',
  ctaFine: 'la percepción reescribe el guion',
  sights: 'herramienta de doble mirada'

      }

    };
    let currentLang = 'en';

    // refs
    const bg = document.getElementById('bg');
    const stage = document.getElementById('stage');
    const line = document.getElementById('line');
    const introHint = document.getElementById('intro-hint');
    const progressEl = document.getElementById('progress');
    const pLeft = document.getElementById('p-left');
    const pRight = document.getElementById('p-right');
    const cardsContainer = document.getElementById('cards');
    getComputedStyle(document.querySelector('.intro-line')).zIndex



const els = {
  fightersTitle: document.getElementById('fighters-title'),
  fightersSub: document.getElementById('fighters-sub'),

  hgBadge: document.getElementById('hg-badge'),
  hgTitle: document.getElementById('hg-title'),
  hgBody: document.getElementById('hg-body'),

  mgBadge: document.getElementById('mg-badge'),
  mgTitle: document.getElementById('mg-title'),
  mgBody: document.getElementById('mg-body'),

  lgBadge: document.getElementById('lg-badge'),
  lgTitle: document.getElementById('lg-title'),
  lgBody: document.getElementById('lg-body'),

  ctaTitle: document.getElementById('cta-title'),
  ctaSub: document.getElementById('cta-sub'),
  ctaA: document.getElementById('cta-a'),
  ctaB: document.getElementById('cta-b'),
  ctaFine: document.getElementById('cta-fine'),
  sights: document.getElementById('sights') 



};

function applyLocale() {
  const t = locales[currentLang];

  introHint.textContent = t.scrollHint;

  els.fightersTitle.textContent = t.fightersTitle;
  els.fightersSub.textContent = t.fightersSub;

  els.hgBadge.textContent = t.hgBadge;
  els.hgTitle.textContent = t.hgTitle;
  els.hgBody.textContent = t.hgBody;

  els.mgBadge.textContent = t.mgBadge;
  els.mgTitle.textContent = t.mgTitle;
  els.mgBody.textContent = t.mgBody;

  els.lgBadge.textContent = t.lgBadge;
  els.lgTitle.textContent = t.lgTitle;
  els.lgBody.textContent = t.lgBody;

  els.ctaTitle.textContent = t.ctaTitle;
  els.ctaSub.textContent = t.ctaSub;
  els.ctaA.textContent = t.ctaA;
  els.ctaB.textContent = t.ctaB;
  els.ctaFine.textContent = t.ctaFine;
  els.sights.textContent = t.sights;

  buildIntroLine(t.intro);
}

    //  span for intro text
    let spans = []; let progress = 0; let charWidth = 40; 
    function buildIntroLine(text){
      line.innerHTML = '';
      spans = [];
      for(const ch of text){
        const s = document.createElement('span');
        s.textContent = ch === ' ' ? '\u00A0' : ch;
        s.addEventListener('mouseenter', ()=>{
          const x = (Math.random() - .5) * 18;
          const y = (Math.random() - .5) * 18;
          s.style.transform = `translate(${x}px, ${y}px) rotate(${(Math.random()-.5)*4}deg)`;
        });
        s.addEventListener('mouseleave', ()=>{ s.style.transform = curveTransform(spans.indexOf(s)); });
        line.appendChild(s);
        spans.push(s);
      }

      requestAnimationFrame(()=>{
        if(spans.length > 1){
          const rect0 = spans[0].getBoundingClientRect();
          const rectLast = spans[Math.min(40, spans.length-1)].getBoundingClientRect();
          charWidth = Math.max(16, (rectLast.left - rect0.left) / Math.max(1, Math.min(40, spans.length-1)));
        }
        progress = 0; // reset
        updateLine(true);
      });
    }

    // curve wave
    function curveTransform(i){
      const k = 0.18; 
      const amp = Math.min(80, Math.max(24, window.innerHeight * 0.06)); 
      const dx = i - progress;
      const ty = Math.sin(dx * k) * amp;
      const rot = Math.cos(dx * k) * 6;
      return `translateY(${ty}px) rotate(${rot}deg)`;
    }

    function updateLine(applyCurve=false){
      const tx = -progress * charWidth;
      line.style.transform = `translateX(${tx}px)`;
      if(applyCurve){
        for(let i=0;i<spans.length;i++){
          spans[i].style.transform = curveTransform(i);
        }
      }
      const intra = spans.length ? (progress/(spans.length-1)) : 0;
      setProjectProgress(0, intra);
      const pct = Math.round(intra*100);
      pLeft.textContent = `Intro ${pct}%`;
    }

    
    const WEIGHTS = [0.25, 0.25, 0.25, 0.25]; 
    function setProjectProgress(pageIndex, intra=0){
     
      let acc = 0;
      for(let i=0;i<pageIndex;i++){ acc += WEIGHTS[i]; }
      let frac = acc + (Math.max(0, Math.min(1, intra)) * (WEIGHTS[pageIndex] || 0));
      // Cap at 1
      if(frac > 1) frac = 1;
      progressEl.style.width = `${Math.round(frac*100)}%`;
    }
    
  
    window.addEventListener('mousemove', (e)=>{
      const x = (e.clientX / window.innerWidth - .5) * 60;
      const y = (e.clientY / window.innerHeight - .5) * 60;
      bg.style.backgroundPosition = `${50 + x/3}% ${50 + y/3}%, ${50 - x/2}% ${50 - y/2}%, ${50 + x}% ${50 - y}%, ${50 - x}% ${50 + y}%`;
    });

    // horizontal flow | desktop
    let page = 0; // 
    function setPage(p){
      page = Math.max(0, Math.min(3,p));
      if(window.innerWidth > 980){
        stage.style.transform = `translateX(${-page*100}vw)`;
      }else{
        // vertical flow | mobile
        const ids = ['s-intro','s-fighters','s-cta','s-eye'];
        document.getElementById(ids[page]).scrollIntoView({behavior:'smooth', block:'start'});
      }
      pRight.textContent = `${page+1}/4`; setProjectProgress(page, page===3 ? 1 : 0);
      if(page>0){ pLeft.textContent = page===1?'Fighters': (page===2?'CTA':'Eye'); }
    }

    // intro: wheel advances characters per notch
    const intro = document.getElementById('s-intro');
    intro.addEventListener('wheel', (e)=>{
      e.preventDefault();
      const dir = Math.sign(e.deltaY);
      const max = Math.max(0, spans.length - 1);
      if((dir>0 && progress < max) || (dir<0 && progress>0)){
        progress = Math.max(0, Math.min(max, progress + dir));
        updateLine(true);
        if(progress>0){ introHint.style.display='none' }
      } else if(dir>0 && progress >= max){
        setPage(1);
      }
    }, {passive:false});

    // intro: touch / swipe | mobile
    let touchX=null;
    intro.addEventListener('touchstart', (e)=>{ touchX = e.touches[0].clientX }, {passive:true});
    intro.addEventListener('touchmove', (e)=>{
      if(touchX==null) return;
      const dx = e.touches[0].clientX - touchX;
      const step = Math.round(-dx/8);
      const max = Math.max(0, spans.length - 1);
      const newProg = Math.max(0, Math.min(max, progress + step));
      if(newProg!==progress){
        progress = newProg;
        updateLine(true);
        if(progress>0){ introHint.style.display='none' }
      }
    }, {passive:true});
    intro.addEventListener('touchend', ()=>{
      if(progress >= spans.length-1){ setPage(1) }
      touchX=null;
    });

    // wheel switches pages
    ['s-fighters','s-cta','s-eye'].forEach((id)=>{
      document.getElementById(id).addEventListener('wheel', (e)=>{
        const dir = Math.sign(e.deltaY);
        if(dir>0) setPage(Math.min(3, page+1)); else setPage(Math.max(0, page-1));
      }, {passive:true});
    });

    // keyboard arrows
    window.addEventListener('keydown', (e)=>{
      if(e.key==='ArrowRight' || e.key==='PageDown'){
        if(page===0 && progress < spans.length-1){ progress++; updateLine(true); }
        else setPage(page+1);
      } else if(e.key==='ArrowLeft' || e.key==='PageUp'){
        if(page===0 && progress>0){ progress--; updateLine(true); }
        else setPage(page-1);
      }
    });

    // language switcher
    document.getElementById('lang-en').onclick = ()=>{
      currentLang='en';
      document.getElementById('lang-en').classList.add('active');
      document.getElementById('lang-es').classList.remove('active');
      applyLocale();
    };
    document.getElementById('lang-es').onclick = ()=>{
      currentLang='es';
      document.getElementById('lang-es').classList.add('active');
      document.getElementById('lang-en').classList.remove('active');
      applyLocale();
    };

    // fighters |  3D tilt and selection
    const cards = Array.from(document.querySelectorAll('.card'));
    let selectedCard = null;

    cards.forEach((card, idx)=>{
      // tilt
      card.addEventListener('mousemove', (e)=>{
        const rect = card.getBoundingClientRect();
        const cx = e.clientX - rect.left;
        const cy = e.clientY - rect.top;
        const rx = ((cy / rect.height) - 0.5) * -10; // tilt X
        const ry = ((cx / rect.width) - 0.5) *  10; // tilt Y
        card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
      card.addEventListener('mouseleave', ()=>{
        card.style.transform = 'rotateX(0deg) rotateY(0deg)';
      });

      // selection

    cards.forEach(card=>{
      card.querySelectorAll('.card-inner, .card-inner *').forEach(el=>{
        el.addEventListener('click', (e)=>{
          // bubble to card
          card.click();
        });
      });
    });

      card.addEventListener('click', ()=>{
        if(selectedCard === card) return; 
        cards.forEach(c=> c.classList.remove('selected'));
        card.classList.add('selected');
        selectedCard = card;
      });
    });


 

    // CTA buttons
    const ctaButtons = Array.from(document.querySelectorAll('#s-cta .btn'));
    let selectedBtn = null;
    ctaButtons.forEach(btn => {
      btn.setAttribute('aria-pressed', 'false');
      btn.addEventListener('click', ()=>{
        if(selectedBtn === btn) return;
        ctaButtons.forEach(b=>{ b.classList.remove('selected'); b.setAttribute('aria-pressed','false'); });
        btn.classList.add('selected');
        btn.setAttribute('aria-pressed','true');
        selectedBtn = btn;
      });
    });
    
  document.addEventListener('DOMContentLoaded', () => {
  applyLocale();
  pRight.textContent = '1/4';
});
