// 프로젝트 상세 화면의 HTML을 만든다
import { escapeHtml as e, GITHUB_ICON } from './utils.js';

const media = (src, caption) => '<video src="' + src + '#t=0.5" controls preload="metadata" playsinline></video><figcaption>' + e(caption) + '</figcaption>';

function neighbor(q, label, cls) {
  return '<a class="' + cls + '" href="#/projects/' + q.id + '"><small>' + label + '</small><b>' + e(q.title) + '</b><span>' + e(q.one) + '</span></a>';
}

export function detailHtml(q, prev, next) {
  const section = (title, body) => '<section><h2 class="s2">' + title + '</h2>' + body + '</section>';
  let html = '<article class="dv"><a class="back" href="#projects">← 프로젝트</a>'
    + '<header class="dh"><div><p class="kd">' + q.kind + ' · ' + q.period + '</p><h1>' + e(q.title) + '</h1><p class="one">' + e(q.one) + '</p><p class="ds">' + e(q.desc) + '</p>'
    + '<ul class="tg">' + q.tags.map((t) => '<li>' + e(t) + '</li>').join('') + '</ul>'
    + (q.links.length ? '<div class="ln"><a class="dt" href="' + q.links[0][1] + '" target="_blank" rel="noopener">' + GITHUB_ICON + 'GitHub ↗</a><a href="' + q.links[1][1] + '" target="_blank" rel="noopener">노션 ↗</a></div>' : '') + '</div>'
    + '<img src="' + q.shots[0][0] + '" alt="' + e(q.title) + '"></header>'
    + '<dl class="gl">' + q.gl.map((g) => '<div><dt>' + e(g[0]) + '</dt><dd>' + e(g[1]) + '</dd></div>').join('') + '</dl>';
  if (q.intro) html += section('소개 영상', '<figure class="vd">' + media(q.intro[0], q.intro[1]) + '</figure>');
  if (q.videos && q.videos.length) {
    html += section('시연 영상', q.videos.length > 1
      ? '<div class="vg">' + q.videos.map((v) => '<figure>' + media(v[0], v[1]) + '</figure>').join('') + '</div>'
      : q.videos.map((v) => '<figure class="vd">' + media(v[0], v[1]) + '</figure>').join(''));
  }
  html += section('핵심 흐름', '<ol class="fl">' + q.flow.map((f, i) => '<li><span class="num">' + (i + 1) + '</span><span>' + e(f) + '</span></li>').join('') + '</ol>');
  html += section('핵심 설계', '<ul class="cg">' + q.core.map((c) => '<li class="cc' + (c[2] ? ' mine' : '') + '">' + (c[2] ? '<span class="own">내 담당</span>' : '') + '<h3>' + e(c[0]) + '</h3><p>' + e(c[1]) + '</p></li>').join('') + '</ul>');
  html += section('주요 결과', '<ul class="rg">' + q.res.map((r) => '<li class="rc"><strong>' + e(r[0]) + '</strong><p>' + e(r[1]) + '</p></li>').join('') + '</ul>');
  if (q.shots.length > 1) {
    const shots = q.shots.length > 2 ? q.shots.slice(1) : q.shots;
    html += section('화면', '<div class="sg">' + shots.map((i) => '<figure><img src="' + i[0] + '" alt="' + e(i[1]) + '" loading="lazy"><figcaption>' + e(i[1]) + '</figcaption></figure>').join('') + '</div>');
  }
  if (q.links.length) html += section('근거 자료', '<ul class="lk">' + q.links.map((l) => '<li><a href="' + l[1] + '" target="_blank" rel="noopener"><span>' + e(l[0]) + '</span><span>↗</span></a></li>').join('') + '</ul>');
  html += section('다른 프로젝트', '<nav class="pn" aria-label="다른 프로젝트">' + neighbor(prev, '← 이전 프로젝트', 'pv') + neighbor(next, '다음 프로젝트 →', 'nx') + '</nav>');
  return html + '</article>';
}
