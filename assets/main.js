(() => {
  /* ---- 상단 메뉴: 현재 보고 있는 섹션 표시 ---- */
  const links = [...document.querySelectorAll('.topnav a[data-nav]')];
  const sections = links.map(a => document.getElementById(a.dataset.nav)).filter(Boolean);
  const setActive = id => links.forEach(a => a.classList.toggle('is-active', a.dataset.nav === id));
  const spy = () => {
    const y = window.scrollY + window.innerHeight * 0.35;
    let current = null;
    for (const s of sections) if (s.offsetTop <= y) current = s.id;
    setActive(current);
  };
  window.addEventListener('scroll', spy, { passive: true });
  window.addEventListener('resize', spy);
  spy();

  /* ---- 핵심 프로젝트 전환 ---- */
  const PROJECTS = {
    edr: {
      name: 'EDR/MDR 보고서',
      href: 'https://app.notion.com/p/EDR-MDR-3c9cd37b206581c5bf46d9781a6fd0ca',
      img: 'assets/img/screen-edr.webp',
      alt: 'EDR/MDR 보고서: SAMPLE4 흐름도, 분석 과정, IOC, 프로세스 트리'
    },
    s2e: {
      name: 'RAT 통신 분석 프레임워크',
      href: 'https://app.notion.com/p/Selective-Symbolic-Execution-RAT-C2-3a5cd37b2065816c90f6cdea1debc576',
      img: 'assets/img/screen-s2e.webp',
      alt: 'RAT 통신 분석 프레임워크: 전체 구조도, 분석 과정, 분석 결과 1·2'
    },
    swingft: {
      name: 'Swingft',
      href: 'https://app.notion.com/p/Swingft-e9acd37b20658329aef3813f228dd4b6',
      img: 'assets/img/screen-swingft.webp',
      alt: 'Swingft: 전체 구조도, 실행 화면, 성능 평가'
    },
    cls: {
      name: '악성코드 패밀리 분류 연구',
      href: 'https://app.notion.com/p/3a0cd37b2065817ebf5cf90c03d3791f',
      img: 'assets/img/screen-classification.webp',
      alt: '악성코드 패밀리 분류 연구: 정적분석 흐름, 동적분석 구조도, 패밀리·유형·동적 분류 결과'
    }
  };
  Object.values(PROJECTS).forEach(p => { const i = new Image(); i.src = p.img; });

  const tabs = [...document.querySelectorAll('.acc-btn')];
  const bodies = [...document.querySelectorAll('.acc-body')];
  const nameEl = document.getElementById('core-name');
  const linkEl = document.getElementById('core-link');
  const imgEl = document.getElementById('core-img');
  const panel = document.getElementById('core-screen');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function select(key, focus) {
    const p = PROJECTS[key];
    if (!p) return;
    tabs.forEach(t => {
      const on = t.dataset.key === key;
      t.setAttribute('aria-selected', on);
      t.tabIndex = on ? 0 : -1;
      if (on) { panel.setAttribute('aria-labelledby', t.id); if (focus) t.focus(); }
    });
    bodies.forEach(b => { b.hidden = b.dataset.for !== key; });
    nameEl.textContent = p.name;
    linkEl.href = p.href;
    if (imgEl.getAttribute('src') === p.img) return;
    const swap = () => { imgEl.src = p.img; imgEl.alt = p.alt; imgEl.classList.remove('is-swapping'); };
    if (reduce) swap();
    else { imgEl.classList.add('is-swapping'); setTimeout(swap, 180); }
  }
  tabs.forEach((t, i) => {
    t.tabIndex = t.getAttribute('aria-selected') === 'true' ? 0 : -1;
    t.addEventListener('click', () => select(t.dataset.key));
    t.addEventListener('keydown', e => {
      const d = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
      if (!d) return;
      e.preventDefault();
      select(tabs[(i + d + tabs.length) % tabs.length].dataset.key, true);
    });
  });

  /* ---- 이미지 크게 보기 ---- */
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  const open = (src, alt) => {
    lbImg.src = src; lbImg.alt = alt || '';
    if (typeof lb.showModal === 'function') lb.showModal();
    else window.open(src, '_blank');
  };
  document.querySelectorAll('img.zoomable').forEach(img => {
    img.tabIndex = 0;
    img.setAttribute('role', 'button');
    const go = () => open(img.currentSrc || img.src, img.alt);
    img.addEventListener('click', go);
    img.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
  });
  document.querySelector('.screen-btn').addEventListener('click', () => open(imgEl.src, imgEl.alt));
  lb.addEventListener('click', e => { if (e.target === lb || e.target === lbImg) lb.close(); });
})();
