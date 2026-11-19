/* 걸어온 순서(JOURNEY) 도트 여정 — 장면·타이밍. 그림은 sprites.js(JourneyArt)가 담당. */
import { projects } from '../js/data/projects.js';
(function(){
const cv=document.getElementById('jy-cv'),c=cv.getContext('2d');c.imageSmoothingEnabled=false;
const H=66,GY=60,STEP=244/7,PAD=28;
const N=[
 {n:'군 전역',s:'육군 부사관 4년',d:'2021.12 – 2025.12',dw:3.2,out:'mil',ox:-8,k:'mil'},
 {n:'알바',s:'',d:'',dw:3.4,out:'job',ox:0,k:'job'},
 {n:'DW아카데미 입교',s:'AIoT 드론 영상 관제',d:'2026.04.27',dw:3.6,out:'dw',ox:-10,k:'study'},
 // 프로젝트 목록을 기준으로 여정도 함께 늘어난다. 날짜가 같은 달이면 목록 순서를 유지한다.
 ...projectStages(),
 {n:'수료 예정',s:'',d:'2026.11.24',dw:4.2,out:'grad',ox:0,k:'grad'}
];
function projectStages(){
 const scenes={
  'obsidian-shield':{k:'team5',d:'2026.06.25',dw:5.2,ox:0},
  'gray-expedition':{k:'game',d:'2026.09.30'},
  'white-eyes':{k:'team6',d:'2026.10.06',dw:5.2,ox:-8},
  studyseat:{k:'booking',d:'2026.11.09'},
  'ai-team-console':{k:'console'},
  barodam:{k:'market'}
 };
 return projects.map(p=>{
  const scene=scenes[p.id]||{},month=p.period.match(/\d{4}\.\d{2}/)?.[0]||'';
  return {n:p.title,s:p.kind.startsWith('TEAM')?'팀 '+(p.kind.match(/\d+인/)?.[0]||'프로젝트'):'개인',d:scene.d||month,dw:3.8,out:'dw',ox:-10,k:'project',...scene,month};
 }).sort((a,b)=>a.month.localeCompare(b.month));
}
const W=Math.ceil(PAD*2+STEP*(N.length-1)),density=cv.height/H;
// 지점 사이 간격과 인물 크기를 유지하고, 프로젝트 수만큼 줄을 연장한다.
cv.width=Math.round(W*density);c.setTransform(density,0,0,density,0,0);c.imageSmoothingEnabled=false;
const inner=document.querySelector('.jy-in'),viewport=document.getElementById('jy-w');
inner.style.setProperty('--jy-width',W);
inner.style.setProperty('--jy-min-width',(W*3)+'px');
inner.style.setProperty('--jy-label-width',(STEP*.94/W*100)+'%');
const WALK=2.4,XS=i=>PAD+i*STEP,SX=i=>XS(i)+N[i].ox;
const SEG=[];let T=0;
N.forEach((n,i)=>{SEG.push({t0:T,t1:T+n.dw,i,w:0});T+=n.dw;if(i<N.length-1){SEG.push({t0:T,t1:T+WALK,a:i,b:i+1,w:1});T+=WALK}});
const TOTAL=T;
let cameraSubject=SX(0);
function follow(cx){
 cameraSubject=cx;
 const width=inner.getBoundingClientRect().width;
 const max=Math.max(0,width-viewport.clientWidth);
 const x=Math.max(0,Math.min(max,cx/W*width-viewport.clientWidth*.46));
 // 캐릭터가 전진하는 만큼 줄 전체를 이동한다. 스크롤 조작이나 역방향 복귀는 없다.
 inner.style.transform='translate3d('+(-x)+'px,0,0)';
 viewport.scrollLeft=0;
}
new ResizeObserver(()=>follow(cameraSubject)).observe(viewport);
const segAt=t=>SEG.find(s=>Math.max(0,t)>=s.t0&&Math.max(0,t)<s.t1)||SEG[SEG.length-1];
const dwellStart=i=>SEG.find(s=>!s.w&&s.i===i).t0;
/* 라벨 */
const jl=document.getElementById('jy-l');
N.forEach((n,i)=>{const a=document.createElement('a');a.style.left=(XS(i)/W*100)+'%';a.innerHTML='<b>'+n.n+'</b><small>'+n.s+(n.d?'<br>'+n.d:'')+'</small>';a.tabIndex=0;a.setAttribute('role','button');a.onfocus=()=>{if(a.matches(':focus-visible'))a.click()};a.onclick=()=>{T0=performance.now()-(dwellStart(i)+.12)*1000;playing=true;render(dwellStart(i)+.12);if(!raf)raf=requestAnimationFrame(frame)};a.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();a.click()}};jl.appendChild(a)});
const LB=[...jl.children];
/* 말풍선 풀 */
const jb=document.getElementById('jy-b');const BP=[];for(let i=0;i<8;i++){const d=document.createElement('div');d.className='jy-bb';jb.appendChild(d);BP.push(d)}
let BQ=[];
/* 그리기 도구 */
const OUT=JourneyArt.OUT;
function person(cx,fy,o){JourneyArt.person(c,cx,fy,o)}
function mk(ox,oy){return(x,y,w,h,col)=>{c.fillStyle=col;c.fillRect(Math.round((ox+x)*3)/3,Math.round((oy+y)*3)/3,w,h)}}
function lerp(a,b,p){return a+(b-a)*p}
/* 소품 */
function desk(cx,fy,w,col){const m=mk(0,0);m(cx-w/2,fy-5,w,2,col||'#b8845a');m(cx-w/2,fy-3,w,3,'#8f6240');m(cx-w/2,fy-5,w,1,'#d4a373')}
function laptop(cx,fy){const m=mk(0,0);m(cx-6,fy-17,12,8,'#cfd3e6');m(cx-6,fy-17,12,1,'#e8ebf7');m(cx-1,fy-14,2,2,'#8d93b8')}
function holo(cx,top,w,h,draw,alpha){c.save();c.globalAlpha=alpha==null?1:alpha;const m=mk(0,0);m(cx-w/2,top,w,h,'rgba(34,184,207,.18)');m(cx-w/2,top,w,1,'#22b8cf');m(cx-w/2,top+h-1,w,1,'#22b8cf');m(cx-w/2,top,1,h,'#22b8cf');m(cx-w/2+w-1,top,1,h,'#22b8cf');draw&&draw(cx-w/2,top);c.restore()}
function laptop2(cx,fy){const m=mk(cx,fy);m(-3,-9.667,6,4.334,'#4a4059');m(-3.333,-9.334,6.666,3.667,'#4a4059');m(-2.667,-9.334,5.334,3.667,'#c1b6ce');m(-2.333,-9,4.666,3,'#a69bb9');m(-2.333,-9,4.666,.333,'#e4dbe9');m(-.333,-8.0,.666,.666,'#e4dbe9');m(-4,-5.334,8,.667,'#51455d');m(-3.667,-5.334,7.334,.334,'#d3c9de');m(-.667,-5.334,1.334,.334,'#f4eff7')}
function codeLines(t){return(x,y)=>{const m=mk(x,y),cols=['#ff8f7a','#8b8bff','#34d399','#f0c04a'];for(let i=0;i<4;i++){const wv=4+((Math.floor(t*3)+i*3)%7);m(2+(i%2)*2,2+i*2,wv,1,cols[(i+Math.floor(t*2))%4])}}}
function bubble(txt,x,y,a){BQ.push({txt,x,y,a:a==null?1:a})}
function ease(p){return p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2}
/* 폭죽 */
function confetti(cx,fy,t,n){const cols=['#ff8f7a','#5b5bd6','#22b8cf','#f0c04a','#34d399'];for(let k=0;k<n;k++){const sd=k*37.1,ph=(t*.9+k/n)%1,x=cx+Math.sin(sd)*44+Math.sin(t*3+sd)*3,y=fy-70+ph*70;c.fillStyle=cols[k%5];c.fillRect(Math.round(x),Math.round(y),2,2)}}
/* 장면 */
const FR=[{hair:'#6b4a2e',shirt:'#22b8cf',long:0},{hair:'#1d2033',shirt:'#ff8f7a',long:1},{hair:'#e8c15a',shirt:'#6DB33F',long:0},{hair:'#c44d7a',shirt:'#f0b429',long:1},{hair:'#3a6b8a',shirt:'#8d6be0',long:0}];
const TX5=['회의!','PR 올림','LGTM','버그 발견','머지!'],TX6=['회의!','API 설계','PR 올림','LGTM','버그 발견','머지!'];
function team(i,tl,mx,fy,cnt){
 const dw=N[i].dw,offs=cnt===5?[-34,-17,17,34]:[-34,-17,17,34,51];
 const people=[{dx:0,main:1}].concat(offs.map((d,k)=>({dx:d,f:FR[k]})));
 const xs=people.map(p=>mx+p.dx);
 const L=Math.min(...xs)-16,Rr=Math.max(...xs)+16,cxm=(L+Rr)/2;
 const exitP=Math.max(0,(tl-(dw-0.7))/0.7);
 const jump=tl>dw-2.1&&tl<dw-0.7;
 /* 뒤: 공유 화면 */
 const inP=Math.min(1,tl/.8);
 holo(cxm,fy-52,26,14,(x,y)=>{const m=mk(x,y),p=Math.floor(tl*2)%3;m(3,3,4,3,p===0?'#f0c04a':'#8b8bff');m(11,3,4,3,p===1?'#f0c04a':'#8b8bff');m(19,3,4,3,p===2?'#f0c04a':'#8b8bff');m(7,4,4,1,'#22b8cf');m(15,4,4,1,'#22b8cf');m(8,9,10,1,'#34d399');m(8,11,6,1,'#ff8f7a')},inP*(1-exitP));
 people.forEach((p,k)=>{
  const enter=p.main?0:.15+k*.22,ep=Math.max(0,Math.min(1,(tl-enter)/.55));
  if(!p.main&&ep<=0)return;
  const drop=p.main?0:(1-ease(ep))*-46,al=p.main?1:Math.min(1,ep*2)*(1-exitP);
  const jy=jump?-Math.abs(Math.sin((tl-(dw-2.1))*Math.PI*3))*5:0;
  const ph=(Math.floor(tl*3.4+k)%2)?'type1':'type2';
  let arm=ph;const rz=Math.floor(tl*1.25+k*1.7)%6;if(rz===0&&tl>1.4)arm='raise';
  if(jump)arm='up';
  c.save();c.globalAlpha=al;
  const o={outfit:p.main?OUT.dw:{shirt:p.f.shirt,pants:'#3a3f5c',shoe:'#f5f5fa'},hair:p.main?undefined:p.f.hair,long:p.f&&p.f.long,glasses:!!p.main,arm,talk:(Math.floor(tl*2.2+k)%3===0),nobag:true,skin:p.main?undefined:(k%2?'#e9b98f':'#f6cfb0')};
  person(mx+p.dx,fy+drop+jy,o);c.restore();
 });
 /* 앞: 긴 책상 + 노트북 */
 c.save();c.globalAlpha=Math.min(1,inP)*(1-exitP);
 {const m=mk(0,0),w=Rr-L;m(L,fy-5,w,.334,'#604958');m(L,fy-4.666,w,1,'#dbb48b');m(L,fy-3.666,w,.667,'#9e7358');m(L,fy-3,w,.334,'#604958');[L+3,(L+Rr)/2,Rr-4].forEach(x=>{m(x,fy-2.666,1,2.666,'#604958');m(x+.334,fy-2.666,.334,2.666,'#a28876')});for(let x=L+5;x<Rr-7;x+=8)m(x,fy-4.333,3,.334,'#c79d78')}
 people.forEach((p,k)=>{if(p.main||tl>.15+k*.22+.4)laptop2(mx+p.dx,fy)});
 c.restore();
 /* 말풍선 */
 const idx=Math.floor(tl/.85),who=idx%people.length;
 if(!jump&&tl>1.0&&tl<dw-2.2){const tx=(cnt===5?TX5:TX6)[idx%(cnt===5?5:6)];bubble(tx,mx+people[who].dx,fy-32,(1-((tl/.85)%1)*.4))}
 if(jump)bubble('완성!',cxm,fy-54,1);
}

function seat(k,tl,mx){
 const fy=GY,phase=Math.floor(tl*2.2)%3;
 JourneyArt.scene(c,mx,fy,{kind:'study',frame:phase});
 const ax=mx+14;
 if(k==='game'&&tl>.8){c.save();c.globalAlpha=Math.min(1,(tl-.8)/.5);[['#c58da5',-9],['#9b87b7',0],['#86b5a0',9]].forEach(([col,dx],q)=>{const bob=Math.sin(tl*2.4+q)*.4,cm=mk(ax+dx-3,fy-47+bob+(q===1?-1:0));cm(0,0,7,11,'#f6e9dc');cm(1,1,5,9,col);cm(3,4,1,3,'#f6e9dc');cm(2,5,3,1,'#f6e9dc')});c.restore()}
 const captions={study:['Hello World','Java!','Spring Boot','public static void'],game:['혼자서도!','덱빌딩','로그라이크'],booking:['좌석 선택!','예약 완료!','QR 입실!'],console:['AI 동시 요청!','코드 리뷰!','결과 확인!'],market:['상품 탐색!','쿠폰 적용!','주문 완료!']};
 if(tl>.9){const tx=captions[k]||['코딩 중!','구현 완료!','배포!'];bubble(tx[Math.floor(tl)%tx.length],ax,fy-(k==='game'?51:32))}
}
function render(t){
 BQ=[];c.clearRect(0,0,W,H);
 const s=segAt(t);let mx,i,tl=0,walk=false,p=0;
 if(!s.w){i=s.i;tl=t-s.t0;mx=SX(i)}else{walk=true;p=(t-s.t0)/(s.t1-s.t0);mx=lerp(SX(s.a),SX(s.b),p);i=p<.45?s.a:s.b}
 const cur=walk?(p<.5?s.a:s.b):s.i;
 follow(mx);
 /* 바닥선 */
 for(let x=2;x<W-2;x+=4){const done=x<mx;c.fillStyle=done?(x<W/2?'#5b5bd6':'#22b8cf'):'rgba(150,155,190,.45)';c.fillRect(x,GY,3,done?2:1)}
 c.fillStyle='rgba(150,155,190,.45)';c.fillRect(W-8,GY-1,3,3);c.fillRect(W-6,GY-2,2,5);
 const sceneKind=N[i].k,cover=walk?null:sceneKind==='job'?[mx-17,mx+17]:['study','game','booking','console','market','project'].includes(sceneKind)?[mx-10,mx+23]:sceneKind==='team5'?[mx-46,mx+46]:sceneKind==='team6'?[mx-46,mx+63]:sceneKind==='mil'?[mx-9,mx+28]:[mx-10,mx+10];
 /* 표지판 */
 N.forEach((n,k)=>{const x=Math.round(XS(k)),reached=k<=cur,col=n.k==='grad'?'#22b8cf':n.k==='study'?'#2a9fb5':n.k.startsWith('team')?'#5b5bd6':k<2?'#8d8aa8':'#f0764f';
  if(cover&&x>=cover[0]&&x<=cover[1]){c.fillStyle=reached?col:'rgba(150,155,190,.5)';c.fillRect(x-1,GY,3,2);return}
  c.fillStyle=reached?'#1d2033':'rgba(150,155,190,.6)';if(document.documentElement.dataset.theme==='dark')c.fillStyle=reached?'#eceefb':'rgba(150,155,190,.6)';
  c.fillRect(x,GY-9,1,10);c.fillStyle=reached?col:'rgba(150,155,190,.5)';c.fillRect(x+1,GY-9,5,3);c.fillRect(x+1,GY-8,4,1)});
 LB.forEach((a,k)=>{a.classList.toggle('off',k>cur);a.classList.toggle('on',k===cur&&!walk)});
 /* 걷는 사람 / 장면 */
 const k=N[i].k;
 if(walk){
  const sw=Math.floor(Math.abs(SX(s.b)-SX(s.a))*p/1.9)%4,ob=OUT[(p<.45?N[s.a]:N[s.b]).out];
  person(mx,GY,{outfit:ob,legs:sw<2?'A':'B',arm:sw<2?'wA':'wB',walkFrame:sw,facing:1,glasses:true,nobag:false});
  if(OUT[N[s.a].out]!==OUT[N[s.b].out]&&p>.36&&p<.62){const q=(p-.36)/.26;c.fillStyle='rgba(255,255,255,'+(1-q)+')';for(let a=0;a<10;a++){const an=a/10*6.283,rr=4+q*18;c.fillRect(Math.round(mx+Math.cos(an)*rr),Math.round(GY-14+Math.sin(an)*rr),3,3)}}
  if(N[s.b].out==='dw'&&p>.2)bubble('',0,0,0);
  flush();return;
 }
 if(k==='mil'){
  const m=mk(0,0),bx=mx+16;m(bx,GY-8,11,8,'#4b5d3a');m(bx,GY-8,11,2,'#5d7249');m(bx+4,GY-9,3,1,'#2d3a22');m(bx+2,GY-3,7,1,'#34422a');
  const sal=Math.floor(tl/.9)%2===0;
  person(mx,GY,{outfit:OUT.mil,arm:sal?'salute':'down',glasses:true,talk:sal&&tl%.9<.5});
  if(sal&&tl%1.8<.9)bubble('충성!',mx,GY-36);
  if(tl>2.0)bubble('전역!',mx,GY-36,1);
 }else if(k==='job'){
  // 사용자 확인: 편의점이 아닌 쿠팡 택배 소분 작업.
  const phase=Math.floor(tl*2.1)%3;
  JourneyArt.scene(c,mx,GY,{kind:'sort',frame:phase});
  if(tl>.3)bubble(['소분 중!','택배 분류!','분류 완료!'][phase],mx,GY-34);
 }else if(k==='team5'){team(i,tl,mx,GY,5)}else if(k==='team6'){team(i,tl,mx,GY,6)}else if(['study','game','booking','console','market','project'].includes(k)){seat(k,tl,mx)
 }else if(k==='grad'){
  const jp=Math.abs(Math.sin(tl*3.2))*7;
  confetti(mx,GY,tl,26);
  person(mx,GY-jp,{outfit:OUT.grad,arm:'diploma',glasses:true,legs:'jump',talk:true});
  if(tl>.4)bubble('수료!',mx,GY-42);
 }
 flush();
}
function flush(){
 const jbR=jb.getBoundingClientRect();
 BP.forEach((d,q)=>{const b=BQ[q];if(!b||!b.txt){d.style.opacity=0;return}d.textContent=b.txt;d.style.left=(b.x/W*100)+'%';d.style.top=(b.y/H*100)+'%';d.style.opacity=b.a});
}
window.addEventListener('journeyartready',()=>{if(!window.__started&&!matchMedia('(prefers-reduced-motion: reduce)').matches)render(0)});
/* 구동 */
let T0=null,playing=false,raf=0,reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
function frame(now){raf=0;if(!document.getElementById('jy-w').offsetParent){T0=null;raf=requestAnimationFrame(frame);return}if(T0==null)T0=now;const t=Math.max(0,(now-T0)/1000)%TOTAL;render(t);
 if(playing)raf=requestAnimationFrame(frame)}
function start(){cancelAnimationFrame(raf);T0=null;playing=true;raf=requestAnimationFrame(frame)}
window.__jy={render,total:TOTAL,seg:SEG};
if(reduce){render(TOTAL-1)}else{
 const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting&&!window.__started){window.__started=1;start()}})},{threshold:.35});io.observe(document.getElementById('jy-w'));
}
})();
