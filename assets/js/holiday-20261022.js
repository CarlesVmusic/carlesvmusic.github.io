/* Carles V · temporary holiday screen · expires 2026-10-22T20:42:00Z */
(() => {
'use strict';
const start=Date.parse('2026-10-22T20:32:00Z'), end=Date.parse('2026-10-22T20:42:00Z');
if(Date.now()>=end)return;
const oldTitle=document.title;
let style,screen,timer,cloak;
const css=`
html.cv-holiday,html.cv-holiday body{margin:0!important;overflow:hidden!important;background:#082c3b!important}
html.cv-holiday body>:not(#cv-holiday-screen){display:none!important}
#cv-holiday-screen{position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;overflow:auto;background:radial-gradient(ellipse at 50% 20%,#194c56 0%,#082c3b 62%);color:#fff4df;text-align:center;font-family:Arial,sans-serif;padding:32px 24px;box-sizing:border-box;isolation:isolate}
#cv-holiday-screen *{box-sizing:border-box}
#cv-holiday-screen .cv-grain{position:absolute;inset:0;opacity:.1;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Cpath fill='%23fff' filter='url(%23n)' d='M0 0h180v180H0z'/%3E%3C/svg%3E");pointer-events:none}
#cv-holiday-screen .cv-content{width:min(100%,820px);position:relative;padding:16px 0}
#cv-holiday-screen .cv-brand{font-size:13px;letter-spacing:.38em;font-weight:700;margin:0 0 22px}
#cv-holiday-screen svg{width:min(62vw,270px);height:auto;display:block;margin:0 auto 20px;animation:cv-float 7s ease-in-out infinite}
#cv-holiday-screen .cv-kicker{font-size:11px;letter-spacing:.3em;text-transform:uppercase;color:#e8bf75;margin:0 0 14px}
#cv-holiday-screen h1{font-family:Georgia,serif;font-size:clamp(44px,8vw,90px);font-weight:400;letter-spacing:-.045em;line-height:1.02;color:#fff4df;margin:0 0 22px}
#cv-holiday-screen h1 em{color:#edb969;font-weight:400}
#cv-holiday-screen .cv-line{width:52px;height:1px;background:#edb969;margin:24px auto}
#cv-holiday-screen .cv-sub{font-size:clamp(15px,2vw,18px);line-height:1.65;color:#d2e0dc;margin:0}
#cv-holiday-screen .cv-foot{font-size:10px;letter-spacing:.2em;text-transform:uppercase;margin:27px 0 0;color:#9db8b9}
@keyframes cv-float{50%{transform:translateY(-8px) rotate(2deg)}}
@media(max-height:700px){#cv-holiday-screen svg{width:150px}#cv-holiday-screen .cv-brand{margin-bottom:14px}#cv-holiday-screen h1{font-size:clamp(40px,7vw,70px)}#cv-holiday-screen .cv-line{margin:16px auto}}
@media(prefers-reduced-motion:reduce){#cv-holiday-screen svg{animation:none}}
`;
function restore(){
document.documentElement.classList.remove('cv-holiday');
if(screen)screen.remove();if(style)style.remove();if(cloak)cloak.remove();
if(document.title==='Tancat per vacances — Carles V')document.title=oldTitle;
clearInterval(timer);document.removeEventListener('visibilitychange',tick);window.removeEventListener('pageshow',tick);
}
function tick(){
const now=Date.now();if(now>=end){restore();return;}
if(now<start||screen||!document.body||document.readyState==='loading')return;
style=document.createElement('style');style.textContent=css;document.head.appendChild(style);
document.documentElement.classList.add('cv-holiday');
screen=document.createElement('main');screen.id='cv-holiday-screen';screen.setAttribute('aria-label','Tancat per vacances');
screen.innerHTML=`<div class="cv-grain" aria-hidden="true"></div><div class="cv-content"><p class="cv-brand">CARLES V</p><svg viewBox="0 0 300 230" fill="none" aria-hidden="true"><circle cx="150" cy="100" r="83" fill="#edb969"/><circle cx="150" cy="100" r="59" stroke="#ab793e" stroke-width="1" opacity=".55"/><circle cx="150" cy="100" r="49" stroke="#ab793e" stroke-width="1" opacity=".55"/><circle cx="150" cy="100" r="39" stroke="#ab793e" stroke-width="1" opacity=".55"/><circle cx="150" cy="100" r="13" fill="#103d48"/><circle cx="150" cy="100" r="3" fill="#edb969"/><path d="M12 154Q80 130 150 155T288 153V218H12Z" fill="#34737b"/><path d="M12 178Q80 153 150 178T288 175" stroke="#80b3ae" stroke-width="2"/><path d="M12 200Q80 175 150 200T288 197" stroke="#80b3ae" stroke-width="2"/><path d="M188 60q8-9 16 0m0 0q8-9 16 0" stroke="#103d48" stroke-width="2.5" stroke-linecap="round"/><path d="m50 225 30-40 23 40" fill="#ddb785"/><path d="M80 185v-44m0 0q-25-27-40-5 25-8 40 5m0 0q22-30 40-11-24-3-40 11m0 0q-3-28-18-26 13 10 18 26" stroke="#ddb785" stroke-width="4" stroke-linecap="round"/></svg><p class="cv-kicker">Una petita pausa</p><h1>Tancat per<br><em>vacances.</em></h1><div class="cv-line"></div><p class="cv-sub">Fins i tot les cançons necessiten respirar.<br>Torno d’aquí a una estona.</p><p class="cv-foot">La música continua aviat</p></div>`;
document.body.appendChild(screen);document.title='Tancat per vacances — Carles V';
}
if(Date.now()>=start){cloak=document.createElement('style');cloak.textContent='html{visibility:hidden}';document.head.appendChild(cloak);document.addEventListener('DOMContentLoaded',()=>{cloak.remove();tick();},{once:true});}
timer=setInterval(tick,500);
document.addEventListener('visibilitychange',tick);window.addEventListener('pageshow',tick);
if(document.readyState!=='loading')tick();
})();