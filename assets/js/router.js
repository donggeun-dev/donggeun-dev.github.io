// 주소(#/projects/이름)에 따라 홈과 프로젝트 상세 화면을 바꿔 보여 준다
import { detailHtml } from './detail.js';
import { state } from './state.js';
import { setActiveNav } from './nav.js';

const HOME_TITLE = '장동근 | 개발자 포트폴리오';

export function initRouter(projects) {
  const homeView = document.getElementById('homeView');
  const detailView = document.getElementById('detailView');

  function render(index) {
    const n = projects.length;
    const q = projects[index], prev = projects[(index + n - 1) % n], next = projects[(index + 1) % n];
    detailView.innerHTML = detailHtml(q, prev, next);
    document.title = q.title + ' | 장동근';
  }

  function route() {
    const m = location.hash.match(/^#\/projects\/([\w-]+)/);
    const index = m ? projects.findIndex((x) => x.id === m[1]) : -1;
    if (index >= 0) {
      render(index);
      homeView.hidden = true;
      detailView.hidden = false;
      state.inDetail = true;
      setActiveNav('#projects');
      scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    document.title = HOME_TITLE;
    if (state.inDetail) {
      state.inDetail = false;
      detailView.hidden = true;
      homeView.hidden = false;
      const target = location.hash.length > 1 && document.querySelector(location.hash);
      if (target) target.scrollIntoView({ behavior: 'instant' });
      else scrollTo({ top: 0, behavior: 'instant' });
    }
  }

  addEventListener('hashchange', route);
  route();
}
