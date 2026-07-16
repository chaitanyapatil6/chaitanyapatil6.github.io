window.addEventListener("load",()=>{
 const loader=document.getElementById("loader");
 if(loader){
   setTimeout(()=>{
     loader.style.transition="opacity .5s";
     loader.style.opacity="0";
     setTimeout(()=>loader.remove(),500);
   },600);
 }
});

const typing=document.getElementById("typing");
const words=[
"Lead EUC Engineer",
"IT Infrastructure Specialist",
"Senior Technical Support Specialist",
"VIP Executive Support"
];
let wi=0,ci=0,del=false;
function type(){
 if(!typing) return;
 const w=words[wi];
 typing.textContent=del?w.slice(0,ci--):w.slice(0,ci++);
 if(!del && ci>w.length){del=true;setTimeout(type,1200);return;}
 if(del && ci<0){del=false;wi=(wi+1)%words.length;ci=0;}
 setTimeout(type,del?40:90);
}
type();

const progress=document.getElementById("progress-bar");
window.addEventListener("scroll",()=>{
 const h=document.documentElement;
 const p=(h.scrollTop/(h.scrollHeight-h.clientHeight))*100;
 if(progress) progress.style.width=p+"%";
});

document.querySelectorAll('a[href^="#"]').forEach(a=>{
 a.addEventListener("click",e=>{
   e.preventDefault();
   document.querySelector(a.getAttribute("href"))?.scrollIntoView({behavior:"smooth"});
 });
});

const observer=new IntersectionObserver(entries=>{
 entries.forEach(e=>{
   if(e.isIntersecting){
     e.target.animate([{opacity:0,transform:"translateY(40px)"},{opacity:1,transform:"translateY(0)"}],{duration:700,fill:"forwards"});
     observer.unobserve(e.target);
   }
 });
},{threshold:.15});
document.querySelectorAll(".section,.content-placeholder").forEach(el=>observer.observe(el));

const themeBtn=document.getElementById("themeToggle");
const root=document.documentElement;
const saved=localStorage.getItem("theme");
if(saved==="light"){
 root.style.setProperty("--bg","#f8fafc");
 root.style.setProperty("--text","#0f172a");
 document.body.style.background="#f8fafc";
}
themeBtn?.addEventListener("click",()=>{
 const light=localStorage.getItem("theme")==="light";
 if(light){
   localStorage.setItem("theme","dark");
   location.reload();
 }else{
   localStorage.setItem("theme","light");
   root.style.setProperty("--bg","#f8fafc");
   root.style.setProperty("--text","#0f172a");
   document.body.style.background="#f8fafc";
 }
});
