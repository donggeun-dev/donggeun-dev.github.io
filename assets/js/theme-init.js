// 화면이 그려지기 전에 테마를 정해 깜빡임을 막는다(작은 일반 스크립트, head에서 먼저 실행).
(function () {
  var t = null;
  try { t = localStorage.getItem('theme'); } catch (e) {}
  if (!t) t = matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
  document.documentElement.dataset.theme = t;
})();
