// 홈의 3D 프로젝트 카드 캐러셀과 팀/개인 구분 버튼
const SECONDS_PER_SLIDE = 6;

export function initCarousel(projects) {
  const root = document.getElementById('cv');
  if (!root) return;
  const dotsBox = document.getElementById('cvd');
  const reduceMotion = matchMedia('(prefers-reduced-motion:reduce)').matches;
  let list = projects, current = 0, timer = null, hovering = false, inView = false, cards = [], prevOffsets = [];

  // 구분 버튼의 개수는 데이터에서 센다(프로젝트를 추가해도 숫자가 어긋나지 않는다)
  const countOf = (group) => (group === 'all' ? projects.length : projects.filter((p) => p.card.group === group).length);
  document.querySelectorAll('.pf [data-count]').forEach((el) => { el.textContent = countOf(el.dataset.count); });

  const tags = (items) => '<ul class="cvt">' + items.map((t) => '<li>' + t + '</li>').join('') + '</ul>';
  function cardHtml(p, index) {
    const c = p.card;
    return '<article class="cvc" data-i="' + index + '"><div class="cvi"><figure class="cvm"><img src="' + c.image + '" alt="' + c.label + ' 화면" loading="lazy">'
      + (c.video ? '<video src="' + c.video + '" muted loop playsinline preload="none"></video>' : '')
      + '<span class="cvk">' + c.chip + '</span></figure><div class="cvb"><small>' + c.label + ' · ' + c.period + '</small><h3>' + c.hook + '</h3><p>' + c.summary + '</p>'
      + tags(c.tags) + '<a class="cvg" href="#/projects/' + p.id + '" tabindex="-1">자세히 보기 →</a></div></div></article>';
  }

  function build() {
    root.innerHTML = list.map(cardHtml).join('');
    dotsBox.innerHTML = list.map((_, i) => '<button type="button" class="dot" data-i="' + i + '" aria-label="' + (i + 1) + '번째 프로젝트"></button>').join('');
    cards = [...root.querySelectorAll('.cvc')];
    cards.forEach((el, i) => { el.style.setProperty('--c1', list[i].card.colors[0]); el.style.setProperty('--c2', list[i].card.colors[1]); });
    prevOffsets = cards.map((_, i) => i);
    current = Math.min(current, list.length - 1);
    layout();
    arm();
  }

  function offset(i) {
    const n = list.length;
    let o = i - current;
    if (o > n / 2) o -= n;
    if (o < -n / 2) o += n;
    return o;
  }

  function layout() {
    cards.forEach((c, i) => {
      const o = offset(i), a = Math.abs(o);
      if (Math.abs(o - prevOffsets[i]) > 2) c.classList.add('nt');
      c.style.transform = 'translateX(' + (o * 340) + 'px) translateZ(' + (-a * 200) + 'px) rotateY(' + (-o * 32) + 'deg) scale(' + (o ? 0.94 : 1) + ')';
      c.style.zIndex = 10 - a;
      c.style.opacity = a > 2 ? 0 : 1;
      c.querySelector('.cvi').style.setProperty('--dim', Math.min(0.8, a * 0.34));
      if (c.classList.contains('nt')) { void c.offsetWidth; c.classList.remove('nt'); }
      prevOffsets[i] = o;
      const video = c.querySelector('video'), media = c.querySelector('.cvm'), isOn = i === current;
      c.classList.toggle('on', isOn);
      if (video) {
        if (isOn && inView && !reduceMotion) {
          video.preload = 'auto';
          try { video.currentTime = 4; } catch (e) {}
          video.classList.add('pl'); media.classList.add('vp');
          video.play().catch(() => {});
        } else {
          video.classList.remove('pl'); media.classList.remove('vp');
          setTimeout(() => { if (!c.classList.contains('on') || !inView) video.pause(); }, 700);
        }
      }
    });
    dotsBox.querySelectorAll('.dot').forEach((x, i) => x.classList.toggle('on', i === current));
  }

  function arm() {
    clearTimeout(timer);
    if (!hovering && inView && !reduceMotion && list.length > 1) {
      timer = setTimeout(() => { current = (current + 1) % list.length; layout(); arm(); }, SECONDS_PER_SLIDE * 1000);
    }
  }
  function show(i) { current = (i + list.length) % list.length; layout(); arm(); }

  root.addEventListener('click', (e) => {
    const card = e.target.closest('.cvc');
    if (!card) return;
    e.preventDefault();
    const i = +card.dataset.i;
    if (i === current) location.hash = '#/projects/' + list[i].id; else show(i);
  });
  dotsBox.addEventListener('click', (e) => { const d = e.target.closest('.dot'); if (d) show(+d.dataset.i); });
  document.getElementById('cvp').addEventListener('click', () => show(current - 1));
  document.getElementById('cvx').addEventListener('click', () => show(current + 1));
  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { show(current - 1); e.preventDefault(); }
    else if (e.key === 'ArrowRight') { show(current + 1); e.preventDefault(); }
    else if (e.key === 'Enter') { location.hash = '#/projects/' + list[current].id; }
  });
  const section = document.getElementById('projects');
  section.addEventListener('mouseenter', () => { hovering = true; clearTimeout(timer); });
  section.addEventListener('mouseleave', () => { hovering = false; arm(); });
  document.addEventListener('visibilitychange', () => { document.hidden ? clearTimeout(timer) : arm(); });
  new IntersectionObserver((entries) => { inView = entries[0].isIntersecting; layout(); arm(); }, { threshold: 0.35 }).observe(root);

  const buttons = document.querySelectorAll('.pf button');
  buttons.forEach((b) => b.addEventListener('click', () => {
    buttons.forEach((x) => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', String(x === b)); });
    const f = b.dataset.f;
    list = f === 'all' ? projects : projects.filter((p) => p.card.group === f);
    current = 0;
    build();
  }));
  build();
}
