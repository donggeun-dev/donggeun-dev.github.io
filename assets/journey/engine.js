/* JOURNEY — 캐릭터 중심 장면, 앞으로 걷는 전환, 단계 선택과 자동 재생. */
(function(){
'use strict';
const VERSION='stage-20261118-3',root=document.querySelector('#journey .jy');
if(!root||!window.JourneyArt)return;
if(!document.querySelector('link[data-journey-style]')){
 const css=document.createElement('link');css.rel='stylesheet';css.href='assets/journey/stage.css?v='+VERSION;css.dataset.journeyStyle='';document.head.appendChild(css);
}
// 캐시된 예전 HTML에서도 같은 새 틀을 만든다. 기존 캔버스와 그림 컨텍스트는 보존한다.
const cv=document.getElementById('jy-cv');
root.innerHTML=`<div class="jy-panel"><div class="jy-copy">
 <div class="jy-kicker"><span class="jy-count" id="jy-count"></span><i></i><span class="jy-date" id="jy-date"></span></div>
 <h3 class="jy-title" id="jy-title"></h3><p class="jy-sub" id="jy-sub"></p><p class="jy-desc" id="jy-desc"></p>
 <div class="jy-tags" id="jy-tags"></div><div class="jy-tools"><button id="jy-play" type="button"></button><button id="jy-rp" type="button">↻ 처음부터</button></div>
 </div><div class="jy-stage" id="jy-w"><div id="jy-slot"></div><div class="jy-b" id="jy-b" aria-hidden="true"></div></div></div>
 <div class="jy-l" id="jy-l" role="group" aria-label="여정 단계 선택"></div>`;
document.getElementById('jy-slot').replaceWith(cv);
const c=cv.getContext('2d'),OUT=JourneyArt.OUT,H=100;
let W=180,resolution=Math.max(1,c.getTransform().a),view={zoom:1.8,x:0,y:85},BQ=[];
const N=[
 {n:'군 전역',s:'육군 부사관으로 보낸 4년',d:'2021.12 – 2025.12',dw:3.2,out:'mil',k:'mil',desc:'4년의 군 생활을 마무리하고, 새로운 일을 배우는 여정을 시작했습니다.',tags:['책임감','꾸준함']},
 {n:'알바',s:'전역 후, 새로운 일상',d:'전역 후',dw:3.4,out:'job',k:'job',desc:'손님을 맞이하고 바코드를 찍으며, 다음 도전을 준비했습니다.',tags:['새로운 시작','일과 배움']},
 {n:'DW아카데미 입교',s:'AIoT 드론 영상 관제 과정',d:'2026.04.27',dw:3.6,out:'dw',k:'study',desc:'가방을 메고 등원해 코딩을 배우고, 직접 코드를 작성하기 시작했습니다.',tags:['Java','Spring Boot','코딩 공부']},
 {n:'Obsidian Shield',s:'5명이 함께 만든 팀 프로젝트',d:'2026.06.25',dw:5.2,out:'dw',k:'team5',desc:'역할을 나누고 코드를 리뷰하며, 사람을 찾아 알려 주는 관제 시스템을 함께 만들었습니다.',tags:['팀 5인','Flask','YOLO']},
 {n:'잿빛 원정대',s:'혼자 기획하고 구현한 게임',d:'2026.09.30',dw:3.8,out:'dw',k:'game',desc:'카드로 싸우며 나아가는 덱빌딩 게임을 직접 기획하고 만들었습니다.',tags:['개인 프로젝트','Godot','덱빌딩']},
 {n:'white-eyes',s:'6명이 함께 만든 팀 프로젝트',d:'2026.10.06',dw:5.2,out:'dw',k:'team6',desc:'화면과 API를 맞추고, 드론·CCTV 영상으로 혼잡도를 보여 주는 서비스를 함께 만들었습니다.',tags:['팀 6인','Spring Boot','Flask']},
 {n:'StudySeat · AI 팀 관제',s:'직접 만들고 다듬은 개인 프로젝트',d:'2026.11.09',dw:3.8,out:'dw',k:'web',desc:'스터디카페 예약 서비스와 여러 AI의 작업을 살펴보는 관제 도구를 만들었습니다.',tags:['개인 프로젝트','예약 서비스','AI 도구']},
 {n:'수료 예정',s:'배운 것을 모아, 다음 도전으로',d:'2026.11.24 예정',dw:4.2,out:'grad',k:'grad',desc:'배우고 만들고 확인한 경험을 바탕으로, 다음 프로젝트를 준비합니다.',tags:['배움의 기록','다음 도전']}
];
const WALK=1.6,SEG=[];let TOTAL=0;
N.forEach((n,i)=>{SEG.push({t0:TOTAL,t1:TOTAL+n.dw,i,w:0});TOTAL+=n.dw;if(i<7){SEG.push({t0:TOTAL,t1:TOTAL+WALK,a:i,b:i+1,w:1});TOTAL+=WALK}});
const segAt=t=>SEG.find(s=>t>=s.t0&&t<s.t1)||SEG[SEG.length-1],dwellStart=i=>SEG.find(s=>!s.w&&s.i===i).t0;
const nav=document.getElementById('jy-l'),play=document.getElementById('jy-play'),bubbles=document.getElementById('jy-b');
const ui={count:document.getElementById('jy-count'),date:document.getElementById('jy-date'),title:document.getElementById('jy-title'),sub:document.getElementById('jy-sub'),desc:document.getElementById('jy-desc'),tags:document.getElementById('jy-tags')};
let active=-1,autoplay=!matchMedia('(prefers-reduced-motion: reduce)').matches,reduce=!autoplay,visible=false,raf=0,lastTime=null,timeline=0,manualTime=0;
const buttons=N.map((n,i)=>{
 const button=document.createElement('button');button.type='button';button.innerHTML='<span class="jy-num">'+String(i+1).padStart(2,'0')+'</span><span class="jy-label">'+n.n+'</span>';button.setAttribute('aria-label',n.n+' · '+n.d);button.onclick=()=>select(i);button.addEventListener('keydown',e=>{let j=i;if(e.key==='ArrowRight')j=Math.min(7,i+1);else if(e.key==='ArrowLeft')j=Math.max(0,i-1);else if(e.key==='Home')j=0;else if(e.key==='End')j=7;else return;e.preventDefault();buttons[j].focus();select(j)});nav.appendChild(button);return button;
});
const BP=Array.from({length:8},()=>{const el=document.createElement('div');el.className='jy-bb';bubbles.appendChild(el);return el});
function updateUI(i){
 if(active===i)return;active=i;const n=N[i];ui.count.textContent=String(i+1).padStart(2,'0')+' / 08';ui.date.textContent=n.d;ui.title.textContent=n.n;ui.sub.textContent=n.s;ui.desc.textContent=n.desc;ui.tags.replaceChildren(...n.tags.map(t=>{const s=document.createElement('span');s.textContent=t;return s}));cv.setAttribute('aria-label',n.n+' — '+n.s);
 root.style.setProperty('--jy-accent',i===1||i===4||i===6?'var(--p3)':i===7?'var(--p2)':'var(--p1)');
 buttons.forEach((b,j)=>{b.classList.toggle('on',i===j);b.classList.toggle('past',j<i);b.setAttribute('aria-pressed',String(i===j))});
 centerStep(i);
}
function centerStep(i){if(nav.scrollWidth>nav.clientWidth)nav.scrollTo({left:Math.max(0,buttons[i].offsetLeft-nav.offsetLeft-nav.clientWidth/2+buttons[i].offsetWidth/2),behavior:reduce?'instant':'smooth'})}
function buttonState(){play.textContent=autoplay?'Ⅱ 일시정지':'▶ 이어 보기';play.setAttribute('aria-label',autoplay?'여정 자동 재생 일시정지':'여정 자동 재생 이어 보기')}
function select(i){autoplay=false;timeline=dwellStart(i);manualTime=1.35;lastTime=null;buttonState();render(timeline+manualTime);kick()}
play.onclick=()=>{if(autoplay){autoplay=false;manualTime=1.4}else{autoplay=true;timeline=dwellStart(Math.max(active,0))+.4}lastTime=null;buttonState();kick()};
document.getElementById('jy-rp').onclick=()=>{timeline=0;manualTime=0;autoplay=!reduce;lastTime=null;buttonState();render(0);kick()};
function size(){const next=document.getElementById('jy-w').clientWidth<480?140:180;if(cv.width===next*resolution&&cv.height===H*resolution&&W===next)return;W=next;cv.width=W*resolution;cv.height=H*resolution;c.setTransform(resolution,0,0,resolution,0,0);c.imageSmoothingEnabled=false;cv.style.aspectRatio=W+'/'+H;document.getElementById('jy-w').style.aspectRatio=W+'/'+H;render(autoplay?timeline:dwellStart(Math.max(0,active))+manualTime);centerStep(Math.max(0,active))}
new ResizeObserver(size).observe(document.getElementById('jy-w'));
function mk(ox,oy){return(x,y,w,h,col)=>{c.fillStyle=col;c.fillRect(Math.round((ox+x)*3)/3,Math.round((oy+y)*3)/3,w,h)}}
function person(x,y,o){JourneyArt.person(c,x,y,o)}
function bubble(txt,x,y,a=1){BQ.push({txt,x:(x-view.x)*view.zoom+W/2,y:y*view.zoom+view.y,a})}
function holo(cx,top,w,h,draw,alpha=1){c.save();c.globalAlpha=alpha;const r=mk(cx-w/2,top);r(0,0,w,h,'#28263d');r(1,1,w-2,h-2,'#35314c');r(0,0,w,1,'#9b8db9');r(0,h-1,w,1,'#635478');if(draw)draw(cx-w/2,top);c.restore()}
function floor(width){c.fillStyle='rgba(114,100,154,.12)';c.fillRect(-width/2,1,width,1);c.fillStyle='rgba(114,100,154,.08)';c.fillRect(-width/2+3,2,width-6,1)}
function chair(x){const r=mk(x,0);r(-6,-7,1,7,'#625470');r(-6,-4,9,1,'#776383');r(2,-4,1,4,'#625470')}
const FR=[{hair:'#6b4a2e',shirt:'#22b8cf'},{hair:'#1d2033',shirt:'#ff8f7a',long:1},{hair:'#e8c15a',shirt:'#6DB33F'},{hair:'#c44d7a',shirt:'#f0b429',long:1},{hair:'#3a6b8a',shirt:'#8d6be0'}];
function team(i,tl,cnt){
 const dx=cnt===5?[-34,-17,0,17,34]:[-34,-17,0,17,34,51],jump=tl>N[i].dw-2.1&&tl<N[i].dw-.7,alpha=Math.min(1,tl/.55);
 holo(cnt===5?0:8.5,-48,38,17,(x,y)=>{const r=mk(x,y);for(let k=0;k<3;k++){r(4+k*11,4,8,4,['#dcb96a','#9c86bf','#7bbdb4'][k]);if(k<2)r(12+k*11,5,3,1,'#a19ab9')}r(9,11,20,1,'#7bbdb4');r(9,13,13,1,'#d698a1')},alpha);
 dx.forEach((x,k)=>{const main=k===2,f=FR[k<2?k:k-1],enter=main?0:Math.max(0,1-tl/(.5+k*.1)),hop=jump?-Math.abs(Math.sin(tl*5+k*.8))*2.3:0,raised=!jump&&tl>1.4&&Math.floor(tl*1.2+k)%7===0;
  c.save();c.globalAlpha=main?1:Math.min(1,tl/(.3+k*.08));person(x,hop-enter*8,{outfit:main?OUT.dw:{shirt:f.shirt,pants:'#3a3f5c',shoe:'#f5f5fa'},hair:main?undefined:f.hair,long:main?0:f.long,glasses:main,arm:jump?'up':raised?'raise':Math.floor(tl*3+k)%2?'type1':'type2',nobag:true,talk:Math.floor(tl*2+k)%3===0});c.restore();
 });
 c.save();c.globalAlpha=alpha;const r=mk(0,0),left=dx[0]-12,right=dx[dx.length-1]+12;r(left,-4,right-left,4,'#94735f');r(left,-5,right-left,1,'#e7c5a3');r(left,-4,right-left,1,'#bf9a78');dx.forEach(x=>{r(x-3,-9,6,4,'#b5afc7');r(x-2,-8,4,2,'#4e526d');r(x-4,-5,8,1,'#e5dfe9')});c.restore();
 if(jump)bubble('완성!',cnt===5?0:8.5,-51);else if(tl>1){const who=Math.floor(tl/.9)%cnt;bubble(['회의!','API 설계','PR 올림','LGTM','버그 발견','머지!'][Math.floor(tl/.9)%6],dx[who],-31,.95)}
}
function seat(k,tl){
 const r=mk(0,0);floor(46);chair(0);r(4,-5,20,1,'#e7c5a3');r(4,-4,20,1,'#b68e6f');r(5,-3,1,3,'#8f705e');r(22,-3,1,3,'#8f705e');
 r(8,-17,13,11,'#3b344c');r(9,-16,11,9,'#24283b');r(13,-6,3,1,'#786b86');r(6,-6,5,1,'#d8cfdf');
 const screen=mk(10,-15);if(k==='game'){screen(0,6,9,1,'#5b486c');screen(1,2,2,4,'#a38ac4');screen(1,1,2,1,'#f3cfb2');screen(6,2,2,4,'#db979f');screen(6,3,1,1,'#f6e8df')}
 else if(k==='web'&&Math.floor(tl/1.2)%2){for(let q=0;q<4;q++)screen(q*2,6-q,1,q+1,['#a38ac4','#7bbdb4','#dcb96a','#db979f'][q])}
 else for(let q=0;q<4;q++)screen(q%2,q*2,3+(q*3+Math.floor(tl*2))%6,1,['#db979f','#a38ac4','#7bbdb4','#dcb96a'][q]);
 person(0,0,{outfit:OUT.dw,legs:'sit',arm:Math.floor(tl*3.2)%2?'tr1':'tr2',glasses:true,talk:Math.floor(tl*2)%3===0});
 if(k==='game'&&tl>.8){[-8,0,8].forEach((x,j)=>{const y=-37+Math.sin(tl*2+j)*.5;r(12+x,y,6,9,'#f6e9db');r(13+x,y+1,4,7,['#d69aaa','#a38ac4','#7bbdb4'][j]);r(14+x,y+3,2,3,'#f6e9db')})}
 if(tl>.8)bubble((k==='study'?['Hello World','Java!','Spring Boot']:k==='game'?['덱빌딩','로그라이크','혼자서도!']:['예약 완료!','AI 호출 관제','배포!'])[Math.floor(tl)%3],14,k==='game'?-40:-31);
}
function confetti(t){const colors=['#d69aaa','#a38ac4','#7bbdb4','#dcb96a'];for(let k=0;k<20;k++){const p=(t*.4+k/20)%1;c.fillStyle=colors[k%4];c.fillRect(Math.round(Math.sin(k*18.2)*34),Math.round(-49+p*48),1,2)}}
function render(t){
 t=Math.max(0,Math.min(TOTAL-.001,t));BQ=[];c.clearRect(0,0,W,H);const seg=segAt(t),walking=!!seg.w,p=walking?(t-seg.t0)/WALK:0,i=walking?seg.b:seg.i,tl=walking?0:t-seg.t0,n=N[i];updateUI(i);
 const isTeam=n.k==='team5'||n.k==='team6',center=n.k==='team6'?8.5:n.k==='team5'?0:n.k==='study'||n.k==='game'||n.k==='web'?7:n.k==='mil'?7:n.k==='job'?2:0,targetZoom=isTeam?(W<160?1.08:1.2):1.85;
 const ease=p*p*(3-2*p);view={zoom:walking?1.85+(targetZoom-1.85)*ease:targetZoom,x:center,y:85};
 c.save();c.translate(W/2-center*view.zoom,view.y);c.scale(view.zoom,view.zoom);
 if(walking){floor(70);const x=-26+p*26,phase=Math.floor((t-seg.t0)*8)%4;c.globalAlpha=Math.min(1,p/.14);person(x,0,{outfit:OUT[n.out],legs:phase<2?'A':'B',walkFrame:phase,facing:1,arm:phase<2?'wA':'wB',glasses:true})}
 else if(n.k==='mil'){floor(48);const r=mk(0,0);r(16,-8,11,8,'#66694f');r(16,-8,11,1,'#9a9b73');r(20,-9,3,1,'#444a37');r(18,-4,7,1,'#444a37');const sal=Math.floor(tl/.9)%2===0;person(0,0,{outfit:OUT.mil,arm:sal?'salute':'down',glasses:true,talk:sal});if(sal)bubble('충성!',0,-35);if(tl>2)bubble('전역!',0,-35)}
 else if(n.k==='job'){floor(49);const r=mk(0,0),cycle=(tl*1.1)%1;r(-19,-5,38,1,'#f2e8e6');r(-19,-4,38,4,'#c8becf');r(-19,-2,38,1,'#7d8cba');person(0,0,{outfit:OUT.job,arm:cycle<.5?'scan':'scan2',glasses:true,talk:cycle>.5});r(10,-13,9,7,'#8b819e');r(11,-12,7,3,'#8ec8af');r(12,-8,5,1,'#e2d8e8');const x=-14+cycle*26;r(x,-8,4,3,'#d598a6');r(x,-8,4,1,'#f5e9e3');if(cycle>.45&&cycle<.85)bubble('삑!',8,-33)}
 else if(isTeam){floor(n.k==='team6'?113:96);team(i,tl,n.k==='team5'?5:6)}
 else if(n.k==='study'||n.k==='game'||n.k==='web')seat(n.k,tl);
 else{floor(51);confetti(tl);person(0,-Math.abs(Math.sin(tl*3.2))*2,{outfit:OUT.grad,arm:'diploma',legs:'jump',glasses:true,talk:true});bubble('수료!',0,-37)}
 c.restore();BP.forEach((el,j)=>{const b=BQ[j];el.style.opacity=b?b.a:0;if(!b)return;el.textContent=b.txt;el.style.left=Math.max(12,Math.min(88,b.x/W*100))+'%';el.style.top=Math.max(14,b.y)/H*100+'%'});
}
function frame(now){raf=0;if(!visible||!root.offsetParent){lastTime=null;return}const dt=lastTime===null?0:Math.min(.08,(now-lastTime)/1000);lastTime=now;
 if(autoplay){timeline=Math.min(TOTAL-.001,timeline+dt);render(timeline);if(timeline>=TOTAL-.001){autoplay=false;manualTime=1.5;buttonState()}}
 else{const i=Math.max(0,active),span=Math.max(.9,N[i].dw-1.4);manualTime=1.1+((manualTime-1.1+dt+span)%span);render(dwellStart(i)+manualTime)}
 if(!reduce)raf=requestAnimationFrame(frame);
}
function kick(){if(visible&&!raf){lastTime=null;if(reduce)render(autoplay?timeline:dwellStart(Math.max(0,active))+manualTime);else raf=requestAnimationFrame(frame)}}
new IntersectionObserver(es=>{visible=es.some(e=>e.isIntersecting);if(visible)kick();else{cancelAnimationFrame(raf);raf=0;lastTime=null}},{threshold:.15}).observe(root);
document.addEventListener('visibilitychange',()=>{lastTime=null});
window.addEventListener('journeyartready',()=>render(autoplay?timeline:dwellStart(Math.max(active,0))+manualTime));
window.__jy={render,total:TOTAL,seg:SEG};buttonState();size();render(0);
})();
