/* =====================================================================
   걸어온 순서(JOURNEY) 도트 캐릭터 그림 파일  —  Codex가 이 파일만 바꿔서 그림을 교체합니다.
   인수인계 문서: journey-dev/HANDOFF-CODEX.md   미리보기: journey-dev/sprite-test.html

   계약(바꾸면 안 되는 것)
   - window.JourneyArt.OUT      : 옷 프리셋 4개(mil, job, dw, grad). 키 이름 유지.
   - window.JourneyArt.person(c, cx, fy, o) : 캔버스 컨텍스트 c에 캐릭터 1명을 그린다.
       cx = 캐릭터 가운데 x, fy = 발바닥(바닥선) y.  o 옵션은 HANDOFF 문서 표 참고.
   - 캔버스는 300x66 칸이고 화면에서 약 3.6배로 확대되어 보인다(image-rendering: pixelated).
   ===================================================================== */
(function(){
const INK='#1d2033';
function mk(c,ox,oy){return(x,y,w,h,col)=>{c.fillStyle=col;c.fillRect(Math.round(ox+x),Math.round(oy+y),w,h)}}
const OUT={
 mil:{shirt:'#5d6e47',pants:'#4b5a39',shoe:'#23261e',hat:'mil',cam:1},
 job:{shirt:'#f4f4fa',pants:'#2f3a63',shoe:'#23253a',hat:'job',apron:1},
 dw:{shirt:'#5b5bd6',pants:'#3a3f5c',shoe:'#f5f5fa',bag:1,hood:1},
 grad:{shirt:'#23253a',pants:'#23253a',shoe:'#23253a',hat:'grad',gown:1}
};
/* 사람 한 명 그리기. cx=가운데x, fy=발바닥 y */
function person(c,cx,fy,o){
 const ox=Math.round(cx-12),oy=Math.round(fy-28)-(o.bob||0),r=mk(c,ox,oy);
 const O=o.outfit||OUT.dw,sk=o.skin||'#f6cfb0',skd='#dca587',hair=o.hair||'#2b2430',shirt=o.shirt||O.shirt;
 if(O.bag&&!o.nobag){r(4,12,4,10,'#ff8f7a');r(16,12,4,10,'#ff8f7a');r(4,12,1,10,'#df6f5a');r(19,12,1,10,'#df6f5a')}
 /* 다리 */
 const pants=o.pants||O.pants,shoe=O.shoe,L=o.legs||'stand';
 if(L==='sit'){r(3,13,2,11,'#6a6a8c');r(5,23,11,1,'#6a6a8c');r(9,24,2,3,'#555570');r(6,27,9,1,'#555570');r(8,20,10,3,pants);r(16,23,3,4,pants);r(16,26,5,2,shoe)}
 if(!O.gown&&L!=='sit'){
  if(L==='stand'){r(9,20,3,6,pants);r(12,20,3,6,pants);r(8,26,4,2,shoe);r(12,26,4,2,shoe)}
  else if(L==='A'){r(9,20,3,6,pants);r(8,26,4,2,shoe);r(12,20,3,4,pants);r(12,24,4,2,shoe)}
  else if(L==='B'){r(12,20,3,6,pants);r(12,26,4,2,shoe);r(9,20,3,4,pants);r(8,24,4,2,shoe)}
  else if(L==='jump'){r(9,20,3,4,pants);r(12,20,3,4,pants);r(8,24,4,2,shoe);r(12,24,4,2,shoe)}
 }else if(O.gown){r(7,12,10,14,'#23253a');r(7,25,10,1,'#3a3d5c');r(10,12,4,2,'#fff');r(11,14,2,1,'#fff');r(7,12,1,13,'#363a5e');r(16,12,1,13,'#363a5e');r(11,15,2,10,'#f0c04a');r(9,26,3,2,'#14152a');r(12,26,3,2,'#14152a')}
 /* 몸통 */
 if(!O.gown)r(8,12,8,8,shirt);
 if(O.hood){r(8,12,8,2,'#4a4ac2');r(11,14,1,3,'#fff');r(12,14,1,3,'#fff')}
 if(O.bag){r(9,12,1,8,'#ffb09f');r(14,12,1,8,'#ffb09f')}
 if(O.cam){r(9,14,3,2,'#46563a');r(13,16,2,2,'#46563a');r(9,18,2,2,'#7a8a5a');r(12,12,2,1,'#7a8a5a');r(9,13,2,1,'#f4f4f4')}
 if(O.apron){r(8,14,8,10,'#e0443c');r(9,18,3,3,'#f7d9d6');r(9,14,2,1,'#fff');r(8,13,1,1,'#fff');r(15,13,1,1,'#fff')}
 /* 팔 */
 const A=o.arm||'down',sc=O.gown?'#23253a':(O.apron?'#f4f4fa':shirt);
 const armL=(dy)=>{r(6,12+dy,2,6,sc);r(6,18+dy,2,2,sk)},armR=(dy)=>{r(16,12+dy,2,6,sc);r(16,18+dy,2,2,sk)};
 if(A==='down'){armL(0);armR(0)}
 else if(A==='wA'){armL(1);armR(-1)}else if(A==='wB'){armL(-1);armR(1)}
 else if(A==='up'){r(5,5,2,2,sk);r(5,7,2,5,sc);r(6,12,2,1,sc);r(17,5,2,2,sk);r(17,7,2,5,sc);r(16,12,2,1,sc)}
 else if(A==='raise'){armL(0);r(17,5,2,2,sk);r(17,7,2,5,sc);r(16,12,2,1,sc)}
 else if(A==='salute'){armL(0);r(16,12,3,2,sc);r(17,7,2,6,sc);r(15,5,3,2,sk)}
 else if(A==='type1'){r(6,12,2,4,sc);r(6,16,4,2,sc);r(9,17,2,2,sk);r(16,12,2,4,sc);r(14,16,4,2,sc);r(13,18,2,1,sk)}
 else if(A==='type2'){r(6,12,2,4,sc);r(6,16,4,2,sc);r(9,18,2,1,sk);r(16,12,2,4,sc);r(14,16,4,2,sc);r(13,17,2,2,sk)}
 else if(A==='tr1'){armL(0);r(16,12,2,3,sc);r(17,14,4,2,sc);r(21,14,2,2,sk)}
 else if(A==='tr2'){armL(0);r(16,12,2,3,sc);r(17,15,4,2,sc);r(21,15,2,2,sk)}
 else if(A==='scan'){armL(0);r(16,12,2,3,sc);r(17,14,5,2,sc);r(22,14,2,2,sk)}
 else if(A==='scan2'){armL(0);r(16,12,2,3,sc);r(17,15,5,2,sc);r(22,15,2,2,sk)}
 else if(A==='diploma'){armL(0);r(16,12,2,4,sc);r(17,14,2,2,sk);r(18,10,6,2,'#fff');r(20,10,1,2,'#e0443c');r(18,10,1,2,'#e8e8ee')}
 /* 머리 */
 r(8,3,8,1,sk);r(7,4,10,7,sk);r(8,11,8,1,sk);
 if(!O.hat||O.hat==='grad'){r(8,3,8,1,hair);r(7,4,10,2,hair);r(7,6,2,2,hair);r(15,6,2,2,hair);r(9,6,3,1,hair);r(13,6,1,1,hair);if(o.long){r(6,6,2,8,hair);r(16,6,2,8,hair)}}
 if(O.hat==='mil'){r(7,6,1,2,hair);r(16,6,1,2,hair)}
 if(O.hat==='job'){r(7,6,1,2,hair);r(16,6,1,2,hair)}
 /* 얼굴 */
 const mouth=o.talk?1:0;
 if(o.glasses){r(10,8,1,2,INK);r(13,8,1,2,INK)}else{r(9,8,1,2,INK);r(14,8,1,2,INK)}
 if(o.glasses){const G='#3b4066';r(8,7,4,1,G);r(8,10,4,1,G);r(8,8,1,2,G);r(11,8,1,2,G);r(12,7,4,1,G);r(12,10,4,1,G);r(12,8,1,2,G);r(15,8,1,2,G)}
 else{r(8,10,1,1,'#f4a6a0');r(15,10,1,1,'#f4a6a0')}
 if(mouth)r(11,10,2,2,'#a33a3a');else r(11,10,2,1,skd);
 /* 모자 */
 if(O.hat==='mil'){r(7,2,10,3,'#4b5d3a');r(7,5,10,1,'#34422a');r(11,3,2,1,'#f0c04a');r(8,2,8,1,'#5d7249')}
 if(O.hat==='job'){r(7,2,10,2,'#2f6fd6');r(7,4,10,1,'#1f4fa0');r(11,3,2,1,'#fff')}
 if(O.hat==='grad'){r(4,1,16,2,'#14152a');r(8,3,8,1,'#14152a');r(18,2,1,5,'#f0c04a');r(18,7,2,1,'#f0c04a')}
}
window.JourneyArt={OUT,person};
})();
