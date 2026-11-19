// 밝은/어두운 테마 전환 버튼
const root = document.documentElement;

function apply(value) {
  root.dataset.theme = value;
  try { localStorage.setItem('theme', value); } catch (e) {}
}

export function initTheme() {
  apply(root.dataset.theme || 'light');
  document.getElementById('theme').addEventListener('click', () => {
    apply(root.dataset.theme === 'dark' ? 'light' : 'dark');
  });
}
