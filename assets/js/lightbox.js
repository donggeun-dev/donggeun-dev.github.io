// 영상 크게 보기: 영상 가운데를 누르면 크게 뜬다(아래 컨트롤 막대는 그대로 재생·소리·전체화면)
export function initLightbox() {
  const box = document.createElement('div');
  box.id = 'lb';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-label', '영상 크게 보기');
  box.innerHTML = '<span class="lbc"></span><button class="lbx" aria-label="닫기">✕</button><button class="lbp" aria-label="이전 영상">‹</button><video controls playsinline></video><p></p><button class="lbn" aria-label="다음 영상">›</button>';
  document.body.appendChild(box);
  const video = box.querySelector('video'), caption = box.querySelector('p'), counter = box.querySelector('.lbc');
  const prevBtn = box.querySelector('.lbp'), nextBtn = box.querySelector('.lbn');
  let list = [], index = 0, source = null;

  const captionOf = (v) => { const c = v.closest('figure')?.querySelector('figcaption'); return c ? c.textContent : ''; };

  function show(i, time) {
    index = (i + list.length) % list.length;
    const v = list[index];
    source = v;
    video.src = v.currentSrc || v.src;
    caption.textContent = captionOf(v);
    counter.textContent = list.length > 1 ? (index + 1) + ' / ' + list.length : '';
    prevBtn.style.display = nextBtn.style.display = list.length > 1 ? '' : 'none';
    video.currentTime = time || 0;
    video.play().catch(() => {});
  }
  function open(v) {
    list = [...document.querySelectorAll('#detailView .vg video,#detailView .vd video')];
    if (!list.length) list = [v];
    list.forEach((x) => x.pause());
    show(Math.max(0, list.indexOf(v)), v.currentTime > 1 ? v.currentTime : 0);
    box.classList.add('on');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    video.pause();
    if (source) try { source.currentTime = video.currentTime; } catch (e) {}
    box.classList.remove('on');
    document.body.style.overflow = '';
    video.removeAttribute('src');
    video.load();
  }

  document.addEventListener('click', (e) => {
    const v = e.target.closest && e.target.closest('.vg video,.vd video');
    if (!v || document.fullscreenElement) return;
    const r = v.getBoundingClientRect();
    if (e.clientY > r.bottom - 64) return; // 아래 컨트롤 막대는 건드리지 않는다
    e.preventDefault();
    e.stopPropagation();
    open(v);
  }, true);
  box.addEventListener('click', (e) => { if (e.target === box || e.target.classList.contains('lbx')) close(); });
  prevBtn.addEventListener('click', () => show(index - 1));
  nextBtn.addEventListener('click', () => show(index + 1));
  addEventListener('keydown', (e) => {
    if (!box.classList.contains('on')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft' && list.length > 1) show(index - 1);
    else if (e.key === 'ArrowRight' && list.length > 1) show(index + 1);
  });
  addEventListener('hashchange', () => { if (box.classList.contains('on')) close(); });
}
