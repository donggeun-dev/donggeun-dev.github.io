// 시작 파일: 각 기능을 순서대로 켠다
import { projects } from './data/projects.js';
import { initTheme } from './theme.js';
import { initNav } from './nav.js';
import { initCarousel } from './carousel.js';
import { initRouter } from './router.js';
import { initLightbox } from './lightbox.js';

initTheme();
initNav();
initCarousel(projects);
initRouter(projects);
initLightbox();
