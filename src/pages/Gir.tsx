import { useEffect, useRef } from 'react'
import '../styles/pages/Gir.css'

declare global {
  interface Window {
    gg: any
  }
}

// GIR is a full-page canvas-style game that relies on imperative DOM manipulation.
// We mount the original game logic via useEffect after the HTML structure is in place.

export default function Gir() {
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    // Inject the game class and bootstrap after DOM is ready
    const script = document.createElement('script')
    script.textContent = `
(function() {
if (window.gg) return;

class G {
constructor(){
this.g=document.getElementById('g');
this.gc=document.querySelector('.gc');
this.ui={
sc:document.getElementById('sc'),
tm:document.getElementById('tm'),
tc:document.getElementById('tc'),
ic:document.getElementById('ic'),
cm:document.getElementById('cm'),
em:document.getElementById('em'),
dm:document.getElementById('dm'),
tkc:document.getElementById('tkc'),
cm2:document.getElementById('cm2'),
ct2:document.getElementById('ct2'),
cpf:document.getElementById('cpf'),
ds:document.getElementById('ds'),
gst:document.getElementById('gst'),
hs:document.getElementById('hs'),
gos:document.getElementById('gos'),
fs:document.getElementById('fs'),
hsm:document.getElementById('hsm'),
rb:document.getElementById('rb'),
me:document.getElementById('me'),
mh:document.getElementById('mh'),
lv:document.getElementById('lv'),
ws:document.getElementById('ws'),
whs:document.getElementById('whs')
};
this.score=0;this.time=0;this.tc=0;this.ic=0;this.hs=0;this.state='active';
this.pos={x:0,y:0};this.size={w:0,h:0};this.bounds={w:0,h:0};
this.stats={c:30,e:100,d:20};this.moving=false;this.speed=20;this.cost=.6;
this.rc=0;this.rr=8;this.dists=[];this.max=5;this.ct=0;
this.level=0;this.maxLevel=2;
this.levelTasks=[
[{t:'Find tacos! TACOS!',type:'taco',p:100},{t:'Chase shiny things',type:'shiny',p:80}],
[{t:'Collect rubber piggies',type:'rubber',p:60},{t:'Eat waffles',type:'waffles',p:90}],
[{t:'Dance with anything!',type:'any',p:50},{t:'Find tacos again!',type:'taco',p:70}]
];
this.tasks=this.levelTasks[this.level];
this.cm=false;this.ctimer=0;this.mct=10;this.cch=[];this.disguised=false;this.lst=0;
this.quotes={g:["DOOM SONG!",'What button?','WHEEE!'],t:['TACOS!','MORE TACOS!'],p:['PIGGY!','RUBBER!'],c:['CHAOS!','POTATOES!'],tired:['*yawn*','sleepy...'],rest:['*snoring*','tacos...']};
this.lut=0;this.af=null;this.joystickActive=false;this.moveInterval=null;this.isMobile=('ontouchstart' in window);this.uiVisible=true;this.paused=false;
this.missionItemBoost=0.65;
this.isIframe=window.self!==window.top;
this.init();
}
init(){
this.loadHS();
this.updateBounds();
this.updateGirSize();
setTimeout(()=>{this.posG()},this.isIframe?300:100);
this.setupEvents();
this.createStars();
this.updateTasks();
const db=document.getElementById('db');
if(db) db.style.backgroundImage='url("https://img1.wsimg.com/isteam/ip/e5c52ac6-7189-421d-9701-bbc6d6a027fc/d1me5u2-a9635d79-16f1-474e-8fd2-428380d93f53.png/:/rs=h:175,m")';
this.startLoop();
this.startSpawn();
this.startTimer();
this.updateUI();
}
loadHS(){try{this.hs=parseInt(localStorage.getItem('girHS')||'0');}catch(e){this.hs=window.ghs||0;}this.ui.hs.textContent=this.hs;}
saveHS(){if(this.score>this.hs){this.hs=this.score;try{localStorage.setItem('girHS',this.hs.toString());}catch(e){window.ghs=this.hs;}this.ui.hs.textContent=this.hs;this.ui.whs.textContent=this.hs;return true;}return false;}
updateBounds(){const r=this.gc.getBoundingClientRect();this.bounds.w=Math.max(200,r.width);this.bounds.h=Math.max(200,r.height);}
updateGirSize(){const cs=window.getComputedStyle(this.g);this.size.w=parseInt(cs.width)||45;this.size.h=parseInt(cs.height)||55;}
posG(){if(this.pos.x===0&&this.pos.y===0){this.pos.x=Math.max(this.size.w,(this.bounds.w-this.size.w)/2);this.pos.y=Math.max(this.size.h,(this.bounds.h-this.size.h)/2);}this.pos.x=Math.max(0,Math.min(this.pos.x,this.bounds.w-this.size.w));this.pos.y=Math.max(0,Math.min(this.pos.y,this.bounds.h-this.size.h));this.g.style.left=this.pos.x+'px';this.g.style.top=this.pos.y+'px';}
createStars(){for(let i=0;i<15;i++){const s=document.createElement('div');s.className='stars';s.style.left=Math.random()*100+'%';s.style.top=Math.random()*100+'%';s.style.animationDelay=Math.random()*2+'s';this.gc.appendChild(s);}}
setupEvents(){
document.addEventListener('contextmenu',e=>e.preventDefault());
document.addEventListener('selectstart',e=>e.preventDefault());
if(!this.isMobile){this.g.addEventListener('click',e=>{e.preventDefault();this.dance()});document.addEventListener('keydown',e=>this.handleKey(e));}
else{this.g.addEventListener('touchend',e=>{e.preventDefault();this.dance()},{passive:false});}
this.setupMobile();
const rh=()=>{this.updateBounds();this.updateGirSize();this.posG();};
window.addEventListener('resize',rh);
window.addEventListener('orientationchange',()=>{setTimeout(rh,100);});
}
handleKey(e){if(this.state==='game-over'||this.paused)return;if(this.state==='resting')return;let key=e.key.toLowerCase();if(this.stats.d>80&&Math.random()<0.15){const keys=['arrowup','arrowdown','arrowleft','arrowright'];key=keys[Math.floor(Math.random()*keys.length)];this.showFeedback('Distracted!','#fa0');}switch(key){case 'arrowup':e.preventDefault();this.moveG(0,-this.speed);break;case 'arrowdown':e.preventDefault();this.moveG(0,this.speed);break;case 'arrowleft':e.preventDefault();this.moveG(-this.speed,0);break;case 'arrowright':e.preventDefault();this.moveG(this.speed,0);break;case ' ':e.preventDefault();this.randAction();break;case 'd':e.preventDefault();this.toggleDisguise();break;case 'r':e.preventDefault();this.toggleRest();break;}}
setupMobile(){const jc=document.getElementById('jc'),js=document.getElementById('js'),ab=document.getElementById('ab'),db=document.getElementById('db'),rb=document.getElementById('rb'),tb=document.getElementById('tb'),pb=document.getElementById('pb');const cx=30,cy=30,md=25;let startPos={x:0,y:0};
const hs=e=>{if(this.state==='game-over'||this.paused)return;e.preventDefault();e.stopPropagation();this.joystickActive=true;const r=jc.getBoundingClientRect(),t=e.touches?e.touches[0]:e;startPos.x=t.clientX-r.left;startPos.y=t.clientY-r.top;jc.style.opacity='1';this.startJoystickMovement();};
const hm=e=>{if(!this.joystickActive||this.state==='game-over'||this.paused)return;e.preventDefault();e.stopPropagation();const r=jc.getBoundingClientRect(),t=e.touches?e.touches[0]:e,x=t.clientX-r.left-cx,y=t.clientY-r.top-cy,d=Math.sqrt(x*x+y*y);let fx=x,fy=y;if(d>md){const a=Math.atan2(y,x);fx=Math.cos(a)*md;fy=Math.sin(a)*md;}js.style.transform='translate(calc(-50% + '+fx+'px), calc(-50% + '+fy+'px))';this.joystickVector={x:fx/md,y:fy/md};};
const he=e=>{e.preventDefault();e.stopPropagation();this.joystickActive=false;js.style.transform='translate(-50%,-50%)';jc.style.opacity='.8';this.joystickVector={x:0,y:0};this.stopJoystickMovement();};
jc.addEventListener('touchstart',hs,{passive:false});jc.addEventListener('touchmove',hm,{passive:false});jc.addEventListener('touchend',he,{passive:false});jc.addEventListener('mousedown',hs);document.addEventListener('mousemove',hm);document.addEventListener('mouseup',he);this.joystickVector={x:0,y:0};
const bp=e=>{e.preventDefault();e.stopPropagation()};
const toggleUI=()=>{this.uiVisible=!this.uiVisible;const ui=document.querySelector('.ui'),tl=document.querySelector('.tl'),btn=tb;if(this.uiVisible){ui.style.display='block';tl.style.display='block';btn.textContent='👁️';btn.style.background='rgba(50,50,0,.8)';btn.style.borderColor='#aa0';btn.style.color='#aa0';}else{ui.style.display='none';tl.style.display='none';btn.textContent='👀';btn.style.background='rgba(100,0,0,.8)';btn.style.borderColor='#a00';btn.style.color='#a00';}};
const handleRestClick=(e)=>{bp(e);this.toggleRest();};
const handleDanceClick=(e)=>{bp(e);this.dance();};
const handleDisguiseClick=(e)=>{bp(e);this.toggleDisguise();};
const handleUIClick=(e)=>{bp(e);toggleUI();};
const handlePauseClick=(e)=>{bp(e);window.togglePause();};
['click','touchend'].forEach(evt=>{tb.addEventListener(evt,handleUIClick,{passive:false});ab.addEventListener(evt,handleDanceClick,{passive:false});db.addEventListener(evt,handleDisguiseClick,{passive:false});rb.addEventListener(evt,handleRestClick,{passive:false});pb.addEventListener(evt,handlePauseClick,{passive:false});});
rb.onclick=handleRestClick;rb.ontouchend=handleRestClick;}
startJoystickMovement(){if(this.moveInterval)clearInterval(this.moveInterval);this.moveInterval=setInterval(()=>{if(this.joystickActive&&this.joystickVector&&(Math.abs(this.joystickVector.x)>.1||Math.abs(this.joystickVector.y)>.1)){if(this.state!=='active'||this.paused)return;const baseSpeed=this.disguised?this.speed*0.6:this.speed;let mx=this.joystickVector.x*baseSpeed,my=this.joystickVector.y*baseSpeed;if(this.stats.d>80&&Math.random()<0.2){mx*=-1;my*=-1;}this.moveG(mx,my);}},50);}
stopJoystickMovement(){if(this.moveInterval){clearInterval(this.moveInterval);this.moveInterval=null;}}
moveG(dx,dy){if(this.state!=='active'||this.paused)return;if(this.stats.e<=0){this.gameOver();return;}const moveSpeed=this.disguised?0.6:1;let nx=this.pos.x+(dx*moveSpeed),ny=this.pos.y+(dy*moveSpeed);if(this.stats.d>60){const inaccuracy=Math.random()*8-4;nx+=inaccuracy;ny+=inaccuracy;}if(this.stats.c>70&&Math.random()<0.3){nx+=(Math.random()-0.5)*12;ny+=(Math.random()-0.5)*12;}nx=Math.max(0,Math.min(nx,this.bounds.w-this.size.w));ny=Math.max(0,Math.min(ny,this.bounds.h-this.size.h));if(nx!==this.pos.x||ny!==this.pos.y){this.pos.x=nx;this.pos.y=ny;this.g.style.left=nx+'px';this.g.style.top=ny+'px';const energyCost=this.disguised?this.cost*0.6:this.cost;this.modStats({e:-energyCost});this.checkCol();}}
toggleRest(){if(this.state==='game-over'||this.paused)return;if(this.state==='resting'){this.state='active';this.g.classList.remove('resting');this.showFeedback('Ready!','#0f0');this.rc=20;}else if(this.rc<=0){this.state='resting';this.g.classList.add('resting');this.sayQuote('rest');this.showFeedback('Resting...','#08f');}else{this.showFeedback('Cooldown: '+Math.ceil(this.rc)+'s','#fa0');}}
dance(){if(this.state!=='active'||this.paused)return;if(this.stats.e<=0){this.gameOver();return;}this.g.style.animation='gb .5s ease-in-out 3';if(this.disguised){this.sayQuote('g');this.modStats({c:3,e:-4});this.score+=8;}else{this.sayQuote('g');this.modStats({c:8,e:-6});this.score+=5;}setTimeout(()=>{this.g.style.animation='';},1500);}
randAction(){if(this.state!=='active'||this.paused)return;if(this.stats.e<=0){this.gameOver();return;}const normalActs=[()=>{const rx=(Math.random()-.5)*80,ry=(Math.random()-.5)*80;this.moveG(rx,ry);this.sayQuote('g');},()=>{this.modStats({c:15,e:-4});this.score+=10;},()=>{this.modStats({d:15,e:-3});},()=>{if(this.stats.c>70&&Math.random()>.6)this.enterChaos();else{this.sayQuote('c');this.modStats({e:-2});}}];const dogActs=[()=>{const rx=(Math.random()-.5)*50,ry=(Math.random()-.5)*50;this.moveG(rx,ry);},()=>{this.modStats({c:5,e:-2});this.score+=15;},()=>{this.modStats({d:5,e:-2});},()=>{this.modStats({c:-5,e:1});this.score+=10;}];const acts=this.disguised?dogActs:normalActs;acts[Math.floor(Math.random()*acts.length)]();}
toggleDisguise(){if(this.state==='game-over'||this.paused)return;this.disguised=!this.disguised;this.g.classList.toggle('disguise');const db=document.getElementById('db');if(this.disguised){this.modStats({d:-15,c:-10});this.showFeedback('DOG MODE!','#08f');db.style.backgroundImage='url("https://img1.wsimg.com/isteam/ip/e5c52ac6-7189-421d-9701-bbc6d6a027fc/GIR_open_mouth.webp/:/rs=h:175,m")';}else{this.modStats({c:5});this.showFeedback('CHAOS!','#f80');db.style.backgroundImage='url("https://img1.wsimg.com/isteam/ip/e5c52ac6-7189-421d-9701-bbc6d6a027fc/d1me5u2-a9635d79-16f1-474e-8fd2-428380d93f53.png/:/rs=h:175,m")';}}
sayQuote(cat='g'){const now=Date.now();if(now-this.lst<500)return;this.lst=now;}
modStats(changes){for(const[stat,change]of Object.entries(changes)){if(Object.prototype.hasOwnProperty.call(this.stats,stat.charAt(0))){this.stats[stat.charAt(0)]=Math.max(0,Math.min(100,this.stats[stat.charAt(0)]+change));}}if(this.stats.e<=0&&this.state!=='game-over'&&this.state!=='resting'){this.stats.e=0;this.gameOver();}}
gameOver(){this.state='game-over';this.g.classList.add('game-over');this.stopJoystickMovement();if(this.af)cancelAnimationFrame(this.af);this.ui.fs.textContent=this.score;const nhs=this.saveHS();if(nhs)this.ui.hsm.innerHTML='<div class="nhs">🎉 NEW HIGH SCORE! 🎉</div>';else this.ui.hsm.innerHTML='<div>High Score: '+this.hs+'</div>';this.ui.gos.style.display='flex';}
startSpawn(){const spawn=()=>{if(this.dists.length<this.max&&this.state==='active'&&!this.paused){const types=['taco','shiny','rubber','waffles'];let selectedType;const currentMission=this.tasks[this.ct];if(currentMission.type!=='any'&&Math.random()<this.missionItemBoost){selectedType=currentMission.type;}else{selectedType=types[Math.floor(Math.random()*types.length)];}this.createDist(selectedType);}const baseRate=[3000,2500,2000][this.level]||3000;const chaosMod=this.stats.c/100*1500;const nextSpawn=baseRate-chaosMod+Math.random()*1500;setTimeout(spawn,Math.max(800,nextSpawn));};setTimeout(spawn,1500);}
createDist(type){const d=document.createElement('div');d.className='dist '+type;const currentMission=this.tasks[this.ct];if(currentMission.type===type||(currentMission.type==='any')){d.classList.add('mission-item');}const girWidth=this.size.w,girHeight=this.size.h;const m=40;let x,y,attempts=0;do{x=m+Math.random()*(this.bounds.w-80-m);y=m+Math.random()*(this.bounds.h-80-m);attempts++;const girLeft=this.pos.x,girTop=this.pos.y;const girRight=girLeft+girWidth,girBottom=girTop+girHeight;const itemSize=parseInt(window.getComputedStyle(d).width)||30;const itemRight=x+itemSize,itemBottom=y+itemSize;const notOnGir=(x>girRight||itemRight<girLeft||y>girBottom||itemBottom<girTop);if(notOnGir||attempts>=8)break;}while(true);d.style.left=x+'px';d.style.top=y+'px';this.gc.appendChild(d);const cs=window.getComputedStyle(d);const dd={element:d,type:type,x:x,y:y,w:parseInt(cs.width)||30,h:parseInt(cs.height)||30};this.dists.push(dd);setTimeout(()=>{this.removeDist(dd);},10000+Math.random()*6000);}
removeDist(dd){if(dd.element&&dd.element.parentNode)dd.element.remove();this.dists=this.dists.filter(d=>d!==dd);}
interact(dd){if(this.state!=='active'||this.paused)return;this.removeDist(dd);const currentMission=this.tasks[this.ct];const isCorrectItem=currentMission.type==='any'||currentMission.type===dd.type;const ints={taco:{p:20,s:{c:25,e:15,d:-5},sp:'TACOS!',cc:.4,ds:{c:15,e:20,d:-10},dsp:'Dog tacos!',dcc:.1},shiny:{p:12,s:{c:10,e:-3,d:20},sp:'SHINY!',cc:0,ds:{c:3,e:5,d:5},dsp:'Shiny!',dcc:0},rubber:{p:25,s:{c:20,e:10,d:10},sp:'PIGGY!',cc:.3,ds:{c:10,e:15,d:0},dsp:'*chews*',dcc:.1},waffles:{p:18,s:{c:8,e:20,d:-8},sp:'Waffles!',cc:0,ds:{c:3,e:25,d:-15},dsp:'Good food!',dcc:0}};const int=ints[dd.type];if(!int)return;if(!isCorrectItem){const energyPenalty=this.disguised?8:12;this.modStats({e:-energyPenalty,c:10,d:8});this.showFeedback('Wrong! -'+energyPenalty,'#f44');return;}const stats=this.disguised?int.ds:int.s;const chaosChance=this.disguised?int.dcc:int.cc;const points=this.disguised?Math.floor(int.p*1.2):int.p;this.score+=points;this.ic++;this.modStats(stats);this.showFeedback('+'+points+'!',this.disguised?'#08f':'#0f0');if(Math.random()<chaosChance)setTimeout(()=>this.enterChaos(),800);this.checkTask(dd.type);}
checkTask(it){const ct=this.tasks[this.ct];let comp=ct.type==='any'||ct.type===it;if(comp){this.score+=ct.p;this.tc++;this.showFeedback('+'+ct.p,'#ff0');this.ct++;if(this.ct>=this.tasks.length){this.advanceLevel();return;}this.updateTasks();this.modStats({e:15,c:-5});}}
advanceLevel(){this.level++;if(this.level>this.maxLevel){this.level=this.maxLevel;this.ui.ws.textContent=this.score;this.saveHS();this.ui.whs.textContent=this.hs;document.getElementById('winScreen').style.display='flex';return;}this.tasks=this.levelTasks[this.level];this.ct=0;this.updateTasks();this.ui.lv.textContent=this.level+1;}
updateTasks(){const c=this.ui.tkc;c.innerHTML='';const missionEmojis={taco:'🌮',rubber:'🐖',shiny:'✨',waffles:'🧇',any:'<img src="https://img1.wsimg.com/isteam/ip/e5c52ac6-7189-421d-9701-bbc6d6a027fc/dance.png/:/rs=h:175,m" style="width:1em;height:1em;object-fit:contain;">'};const currentTask=this.tasks[this.ct];const currentType=currentTask.type;if(currentType==='rubber'){this.ui.me.innerHTML='<img src="https://img1.wsimg.com/isteam/ip/e5c52ac6-7189-421d-9701-bbc6d6a027fc/pig.png/:/rs=h:175,m" style="width:1em;height:1em;object-fit:contain;">';this.ui.mh.innerHTML='<img src="https://img1.wsimg.com/isteam/ip/e5c52ac6-7189-421d-9701-bbc6d6a027fc/pig.png/:/rs=h:175,m" style="width:100%;height:100%;object-fit:contain;">';this.ui.mh.className='mission-hint rubber-mission';}else if(currentType==='any'){this.ui.me.innerHTML='<img src="https://img1.wsimg.com/isteam/ip/e5c52ac6-7189-421d-9701-bbc6d6a027fc/dance.png/:/rs=h:175,m" style="width:1em;height:1em;object-fit:contain;">';this.ui.mh.innerHTML='<img src="https://img1.wsimg.com/isteam/ip/e5c52ac6-7189-421d-9701-bbc6d6a027fc/dance.png/:/rs=h:175,m" style="width:100%;height:100%;object-fit:contain;">';this.ui.mh.className='mission-hint dance-mission';}else{const currentEmoji=missionEmojis[currentType]||'🌮';this.ui.me.innerHTML=currentEmoji;this.ui.mh.textContent=currentEmoji;this.ui.mh.className='mission-hint';}for(let i=0;i<3;i++){const ti=(this.ct+i)%this.tasks.length,t=this.tasks[ti],td=document.createElement('div');td.className='task';td.textContent=t.t;if(i===0){td.classList.add('current');td.textContent+=' ('+t.p+'pts)';}c.appendChild(td);}}
checkCol(){if(this.state!=='active'||this.paused)return;const gb={l:this.pos.x,r:this.pos.x+this.size.w,t:this.pos.y,b:this.pos.y+this.size.h};this.dists.forEach(d=>{const db={l:d.x,r:d.x+d.w,t:d.y,b:d.y+d.h};if(!(gb.r<db.l||gb.l>db.r||gb.b<db.t||gb.t>db.b))this.interact(d);});}
enterChaos(){if(this.cm||this.state!=='active'||this.paused)return;this.cm=true;this.ctimer=this.mct;this.ui.cm2.style.display='flex';const hcc=e=>{e.preventDefault();e.stopPropagation();this.ctimer=Math.max(0,this.ctimer-1);this.modStats({c:-3});this.score+=5;const act=document.querySelector('.ca');if(act){act.style.transform='scale(1.05)';setTimeout(()=>{act.style.transform='scale(1)';},100);}if(this.ctimer<=0)setTimeout(()=>this.exitChaos(),200);};this.ui.cm2.addEventListener('click',hcc,{passive:false});this.ui.cm2.addEventListener('touchend',hcc,{passive:false});this.cch=[hcc];}
updateChaos(){if(!this.cm)return;this.ui.ct2.textContent=Math.ceil(this.ctimer);const pp=this.ctimer/this.mct*100;this.ui.cpf.style.width=pp+'%';const te=this.ui.ct2;if(this.ctimer<=2){te.style.color='#f04';te.style.animation='blink .5s infinite';}else if(this.ctimer<=5){te.style.color='#ff0';te.style.animation='none';}else{te.style.color='#0f0';te.style.animation='none';}const dl=Math.floor((this.mct-this.ctimer)/2)+1;this.ui.ds.textContent='"'+'Doom '.repeat(dl)+'..."';}
exitChaos(){this.cm=false;this.ui.cm2.style.display='none';this.cch.forEach(h=>{this.ui.cm2.removeEventListener('click',h);this.ui.cm2.removeEventListener('touchend',h);});this.cch=[];if(this.ctimer<=0){this.modStats({c:-20,e:-10});this.showFeedback('Calmed!','#0f0');this.score+=50;}else{this.modStats({c:-30,e:-15});}}
showFeedback(msg,col='#0f0'){const fb=document.createElement('div');fb.className='fp';fb.textContent=msg;fb.style.color=col;document.body.appendChild(fb);setTimeout(()=>{if(fb.parentNode)fb.remove();},1000);}
updateUI(){this.stats.c=Math.max(0,Math.min(100,this.stats.c));this.stats.e=Math.max(0,Math.min(100,this.stats.e));this.stats.d=Math.max(0,Math.min(100,this.stats.d));this.ui.cm.style.width=this.stats.c+'%';this.ui.em.style.width=this.stats.e+'%';this.ui.dm.style.width=this.stats.d+'%';if(this.stats.c>=90){this.ui.cm.style.background='linear-gradient(90deg,#f84,#f04,#f84)';this.ui.cm.style.animation='blink .5s infinite';}else if(this.stats.c>=70){this.ui.cm.style.background='linear-gradient(90deg,#f84,#f48,#f8c)';this.ui.cm.style.animation='none';}else{this.ui.cm.style.background='linear-gradient(90deg,#f04,#f48,#f8c)';this.ui.cm.style.animation='none';}if(this.stats.d>=80){this.ui.dm.style.background='linear-gradient(90deg,#f84,#fa0,#f84)';this.ui.dm.style.animation='blink .8s infinite';}else if(this.stats.d>=60){this.ui.dm.style.background='linear-gradient(90deg,#fa0,#ff4,#fa8)';this.ui.dm.style.animation='none';}else{this.ui.dm.style.background='linear-gradient(90deg,#ff0,#ff4,#ff8)';this.ui.dm.style.animation='none';}this.ui.sc.textContent=this.score;this.ui.tc.textContent=this.tc;this.ui.ic.textContent=this.ic;let statusText=this.disguised?'🐕 Dog Mode':'Active';if(this.stats.c>=90)statusText+=' 🌪️ CRITICAL!';else if(this.stats.c>=70)statusText+=' ⚡ Chaotic';if(this.stats.d>=80)statusText+=' 😵 ADHD!';else if(this.stats.d>=60)statusText+=' 😵‍💫 Distracted';const sds={active:statusText,resting:'😴 Resting','game-over':'<img src="https://img1.wsimg.com/isteam/ip/e5c52ac6-7189-421d-9701-bbc6d6a027fc/Bloody_Gir.transparent.webp/:/rs=h:175,m" style="width:16px;height:16px;object-fit:contain;vertical-align:middle;" alt="Dead"> Game Over'};this.ui.gst.innerHTML=sds[this.state];if(this.rc>0){this.ui.rb.innerHTML='<img src="https://img1.wsimg.com/isteam/ip/e5c52ac6-7189-421d-9701-bbc6d6a027fc/gir%20sleep.png/:/rs=h:175,m" style="width:20px;height:20px;object-fit:contain;"><span style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:8px;color:#fff;text-shadow:1px 1px 2px #000;font-weight:bold;">'+Math.ceil(this.rc)+'</span>';this.ui.rb.classList.remove('av');this.ui.rb.style.background='rgba(100,100,100,.8)';this.ui.rb.style.borderColor='#888';this.ui.rb.style.color='#888';this.ui.rb.style.position='relative';this.ui.rb.style.pointerEvents='auto';}else if(this.state==='resting'){this.ui.rb.innerHTML='<img src="https://img1.wsimg.com/isteam/ip/e5c52ac6-7189-421d-9701-bbc6d6a027fc/gir%20sleep.png/:/rs=h:175,m" style="width:20px;height:20px;object-fit:contain;">';this.ui.rb.classList.add('av');this.ui.rb.style.background='rgba(0,100,200,.8)';this.ui.rb.style.borderColor='#08f';this.ui.rb.style.color='#08f';this.ui.rb.style.position='static';this.ui.rb.style.pointerEvents='auto';}else{this.ui.rb.innerHTML='<img src="https://img1.wsimg.com/isteam/ip/e5c52ac6-7189-421d-9701-bbc6d6a027fc/gir%20sleep.png/:/rs=h:175,m" style="width:20px;height:20px;object-fit:contain;">';this.ui.rb.classList.remove('av');this.ui.rb.style.background='rgba(0,50,0,.8)';this.ui.rb.style.borderColor='#0f0';this.ui.rb.style.color='#0f0';this.ui.rb.style.position='static';this.ui.rb.style.pointerEvents='auto';}this.g.classList.toggle('hyperactive',this.stats.c>80&&this.state==='active');this.g.classList.toggle('distracted',this.stats.d>60&&this.state==='active');if(this.cm)this.updateChaos();}
startLoop(){const loop=ct=>{if(this.state==='game-over')return;if(this.paused){this.af=requestAnimationFrame(loop);return;}if(ct-this.lut<16.67){this.af=requestAnimationFrame(loop);return;}this.lut=ct;if(this.state==='active'){const chaosRate=this.disguised?-.25:-.15;const distractRate=this.disguised?-.2:-.1;let energyDrain=-.01;if(this.stats.c>90)energyDrain=-.25;else if(this.stats.c>80)energyDrain=-.15;else if(this.stats.c>70)energyDrain=-.08;this.modStats({c:chaosRate,e:energyDrain,d:distractRate});if(this.stats.c>=100&&!this.cm){this.enterChaos();this.stats.c=90;}if(this.stats.d>70&&Math.random()>.99){const rx=(Math.random()-.5)*30,ry=(Math.random()-.5)*30;this.moveG(rx,ry);}if(this.stats.c>80&&Math.random()>.998){const rx=(Math.random()-.5)*40,ry=(Math.random()-.5)*40;this.moveG(rx,ry);}if(this.stats.d>80&&Math.random()>.996){this.randAction();}if(Math.random()>.9998){const rx=(Math.random()-.5)*40,ry=(Math.random()-.5)*40;this.moveG(rx,ry);}}else if(this.state==='resting'){const baseRestRate=this.rr;const restMultiplier=this.stats.e<20?2.5:this.stats.e<50?2:1.5;const finalRestRate=baseRestRate*restMultiplier;const energyGain=finalRestRate/60;this.modStats({e:energyGain,c:-.6,d:-.4});}if(this.cm){this.ctimer-=.016;if(this.ctimer<=0)this.exitChaos();}if(this.rc>0)this.rc-=.016;this.updateUI();this.af=requestAnimationFrame(loop);};this.af=requestAnimationFrame(loop);}
startTimer(){setInterval(()=>{if(this.state!=='game-over'&&!this.paused){this.time++;this.ui.tm.textContent=this.time;}},1000);}
}

window.togglePause=function(){if(!window.gg||window.gg.state==='game-over')return;window.gg.paused=!window.gg.paused;const pauseScreen=document.getElementById('pauseScreen'),pauseBtn=document.getElementById('pb'),winScreen=document.getElementById('winScreen');winScreen.style.display='none';if(window.gg.paused){pauseScreen.style.display='flex';pauseBtn.textContent='▶️';pauseBtn.style.background='rgba(0,100,0,.8)';pauseBtn.style.borderColor='#0f0';pauseBtn.style.color='#0f0';}else{pauseScreen.style.display='none';pauseBtn.textContent='⏸️';pauseBtn.style.background='rgba(0,50,100,.8)';pauseBtn.style.borderColor='#08f';pauseBtn.style.color='#08f';}};

window.restart=function(){document.getElementById('gos').style.display='none';document.getElementById('pauseScreen').style.display='none';document.getElementById('winScreen').style.display='none';if(window.gg){if(window.gg.af)cancelAnimationFrame(window.gg.af);window.gg.stopJoystickMovement();if(window.gg.moveInterval)clearInterval(window.gg.moveInterval);if(window.gg.cch&&window.gg.cch.length>0){window.gg.cch.forEach(h=>{window.gg.ui.cm2.removeEventListener('click',h);window.gg.ui.cm2.removeEventListener('touchend',h);});}}document.querySelectorAll('.dist').forEach(el=>el.remove());const g=document.getElementById('g');g.classList.remove('game-over','resting','hyperactive','distracted','disguise');g.style.animation='';const db=document.getElementById('db');db.style.backgroundImage='url("https://img1.wsimg.com/isteam/ip/e5c52ac6-7189-421d-9701-bbc6d6a027fc/d1me5u2-a9635d79-16f1-474e-8fd2-428380d93f53.png/:/rs=h:175,m")';document.getElementById('cm2').style.display='none';window.gg=new G();};

window.gg = new G();
})();
`
    document.body.appendChild(script)

    return () => {
      if (window.gg) {
        if (window.gg.af) cancelAnimationFrame(window.gg.af)
        window.gg.stopJoystickMovement?.()
        window.gg = null
      }
    }
  }, [])

  return (
    <>
      <div className="gc">
        <div className="gir" id="g">
          <img className="gn" src="https://img1.wsimg.com/isteam/ip/e5c52ac6-7189-421d-9701-bbc6d6a027fc/GIR_open_mouth.webp/:/rs=h:175,m" alt="Normal GIR" />
          <img className="gd" src="https://img1.wsimg.com/isteam/ip/e5c52ac6-7189-421d-9701-bbc6d6a027fc/d1me5u2-a9635d79-16f1-474e-8fd2-428380d93f53.png/:/rs=h:175,m" alt="Disguise GIR" />
          <img className="gs" src="https://img1.wsimg.com/isteam/ip/e5c52ac6-7189-421d-9701-bbc6d6a027fc/gir%20sleep.png/:/rs=h:175,m" alt="Sleeping GIR" />
        </div>

        <div className="pause-screen" id="pauseScreen">
          <div className="pause-content">
            <div className="pause-title">⏸️ GAME PAUSED</div>
            <div className="pause-controls">
              <button className="resume-btn" onClick={() => (window as any).togglePause?.()}>RESUME GAME</button>
            </div>
            <div className="pause-section"><h4>🎮 Controls</h4><div>Joystick: Move GIR around</div><div>Dance Button: Dance/Random Action</div><div>Disguise Button: Toggle Dog Disguise</div><div>Rest Button: Rest (Restore Energy)</div><div>Eye Button: Toggle UI visibility</div><div>Pause Button: Pause/Resume game</div></div>
            <div className="pause-section"><h4>🎯 Mission</h4><p>Collect items matching your current mission! Mission items glow gold. Wrong items cause big energy penalties.</p></div>
            <div className="pause-section"><h4>🌪️ Chaos System</h4><div>• High chaos = faster energy drain &amp; erratic movement</div><div>• 100 chaos = DOOM SONG mode! Tap rapidly to calm down</div></div>
            <div className="pause-section"><h4>😵‍💫 Distraction System</h4><div>• High distraction = inaccurate movement</div><div>• 80+ distraction = controls might reverse!</div></div>
            <div className="pause-section"><h4>🐕 Dog Disguise Mode</h4><div>• Slower movement but better control</div><div>• Less chaos/distraction buildup</div><div>• Reduced energy penalties</div><div>• Bonus points for correct items!</div></div>
            <div className="pause-section"><h4>💡 Tips</h4><div>• Rest when energy is low to avoid game over</div><div>• Use dog mode when chaos gets too high</div><div>• Watch your mission indicator - it shows what to collect!</div><div>• Mission items have a golden glow and spawn more frequently!</div></div>
          </div>
        </div>

        <div className="ui">
          <h3><img src="https://img1.wsimg.com/isteam/ip/e5c52ac6-7189-421d-9701-bbc6d6a027fc/gir_-_dog_suit_art.png/:/rs=h:175,m" style={{ width: '18px', height: '18px', objectFit: 'contain', verticalAlign: 'middle' }} alt="" /> GIR Status</h3>
          <div>Level: <span id="lv">1</span></div>
          <div>Chaos:<div className="meter"><div className="mf cf" id="cm" /></div></div>
          <div>Energy:<div className="meter"><div className="mf ef" id="em" /></div></div>
          <div>Distraction:<div className="meter"><div className="mf df" id="dm" /></div></div>
          <div>Score: <span id="sc">0</span></div>
          <div className="hs">High: <span id="hs">0</span></div>
          <div>Time: <span id="tm">0</span>s</div>
          <div style={{ fontSize: '8px', marginTop: '2px' }}>
            <div>Tasks: <span id="tc">0</span> | Items: <span id="ic">0</span></div>
            <div id="gst">Active</div>
          </div>
        </div>

        <div className="tl">
          <h4><span id="me">🌮</span> Mission</h4>
          <div id="tkc" />
        </div>

        <div className="mission-hint" id="mh">🌮</div>
      </div>

      <div className="mc">
        <div className="top-controls">
          <div className="btn" id="pb" style={{ background: 'rgba(0,50,100,.8)', borderColor: '#08f', color: '#08f' }}>⏸️</div>
          <div className="center-controls">
            <div className="btn" id="ab">💃</div>
            <div className="btn" id="db">🐕</div>
            <div className="btn rb" id="rb">😴</div>
          </div>
          <div className="btn" id="tb" style={{ background: 'rgba(50,50,0,.8)', borderColor: '#aa0', color: '#aa0' }}>👁️</div>
        </div>
        <div className="jc" id="jc"><div className="js" id="js" /></div>
      </div>

      <div className="gos" id="gos">
        <div className="goc">
          <div className="got">GIR.EXE STOPPED</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', margin: '8px 0' }}>
            <img src="https://img1.wsimg.com/isteam/ip/e5c52ac6-7189-421d-9701-bbc6d6a027fc/Bloody_Gir.transparent.webp/:/rs=h:175,m" style={{ width: '32px', height: '32px', objectFit: 'contain' }} alt="Dead GIR" />
            OVERLOAD
            <img src="https://img1.wsimg.com/isteam/ip/e5c52ac6-7189-421d-9701-bbc6d6a027fc/Bloody_Gir.transparent.webp/:/rs=h:175,m" style={{ width: '32px', height: '32px', objectFit: 'contain' }} alt="Dead GIR" />
          </div>
          <div className="fs">Score: <span id="fs">0</span></div>
          <div id="hsm" />
          <div style={{ margin: '12px 0', color: '#888', fontSize: '9px' }}>GIR ran out of energy!<br />Remember to rest!</div>
          <button className="rstb" onClick={() => (window as any).restart?.()}>REBOOT</button>
        </div>
      </div>

      <div className="cm" id="cm2">
        <div className="ca">
          <h2>
            <img src="https://img1.wsimg.com/isteam/ip/e5c52ac6-7189-421d-9701-bbc6d6a027fc/gir_crazy.png/:/rs=h:175,m" style={{ width: '24px', height: '24px', objectFit: 'contain', verticalAlign: 'middle' }} alt="" />
            {' '}CHAOS MODE!{' '}
            <img src="https://img1.wsimg.com/isteam/ip/e5c52ac6-7189-421d-9701-bbc6d6a027fc/gir_crazy.png/:/rs=h:175,m" style={{ width: '24px', height: '24px', objectFit: 'contain', verticalAlign: 'middle', transform: 'scaleX(-1)' }} alt="" />
          </h2>
          <div className="ci">DOOM SONG!</div>
          <div className="ct" id="ct2">10</div>
          <div className="ci">TAP TO CALM!<br /><small>Each tap = -1 sec</small></div>
          <div className="cpb"><div className="cpf" id="cpf" /></div>
          <div style={{ color: '#0f0', fontSize: '10px' }} id="ds">"Doom..."</div>
        </div>
      </div>

      <div className="win-screen" id="winScreen">
        <div className="win-content">
          <div className="win-title">👑 YOU WIN! 👑</div>
          <div className="win-score">Score: <span id="ws">0</span></div>
          <div className="win-high">High Score: <span id="whs">0</span></div>
          <button className="win-btn" onClick={() => (window as any).restart?.()}>PLAY AGAIN</button>
        </div>
      </div>
    </>
  )
}
