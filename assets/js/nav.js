// 위쪽 메뉴: 스크롤 위치에 맞춰 현재 섹션을 강조한다
import { state } from './state.js';

const links = [...document.querySelectorAll('.nav a')];

export function setActiveNav(href) {
  links.forEach((a) => a.classList.toggle('on', a.getAttribute('href') === href));
}

export function initNav() {
  const sections = links.map((a) => document.querySelector(a.getAttribute('href')));
  addEventListener('scroll', () => {
    if (state.inDetail) return;
    let index = 0;
    sections.forEach((s, k) => { if (s.getBoundingClientRect().top < 160) index = k; });
    if (innerHeight + scrollY >= document.documentElement.scrollHeight - 6) index = sections.length - 1;
    links.forEach((a, k) => a.classList.toggle('on', k === index));
  }, { passive: true });
}
