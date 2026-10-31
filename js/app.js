/* ---------- constants ---------- */
const AYLAR=['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];
const PALETTE={rose:'#E3A79C',peach:'#EBB88C',butter:'#E9CF8E',olive:'#BEBB80',sage:'#A6C29A',teal:'#8EBDB0',sky:'#A0C3DB',navy:'#93A0C6',lilac:'#BEAFD3',plum:'#C29DB4',mauve:'#DBB4BF',sand:'#DCC7A1',tan:'#C9A27A',terracotta:'#CB8264',blush:'#F2C4C0',apricot:'#F5CBA7',lemon:'#F1E2A0',pistachio:'#CFE0B4',mint:'#B5DCC6',aqua:'#A9D6D8',powder:'#B9CFE8',periwinkle:'#BFC3E8',lavender:'#D6C7EA',orchid:'#E6BFD8',wheat:'#E8D6AE',moss:'#C3CFA8'};
const PCOLS=Object.values(PALETTE);
const FORMATS={print:'Basılı',ebook:'E-kitap',audio:'Sesli'};
const STATUS={want:'Okunacak',reading:'Okuyorum',read:'Okudum'};
const G={ /* 24px stroke glyphs */
  print:'M3 5c3-1 6-1 9 1 3-2 6-2 9-1v14c-3-1-6-1-9 1-3-2-6-2-9-1z M12 6v14',
  ebook:'M7 2h10a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z M10.5 19h3',
  audio:'M4 15v-3a8 8 0 0 1 16 0v3 M4 15h3v5H4z M17 15h3v5h-3z',
  shelf:'M3 20h18 M5 20V7h3v13 M9 20V4h3v16 M14 20l2-13 3 .5-2 12.5',
  covers:'M4 4h6v8H4z M14 4h6v8h-6z M4 15h6v5H4z M14 15h6v5h-6z',
  pen:'M4 20l4-1 11-11-3-3L5 16z M14 7l3 3',
  list:'M4 6h1.5 M9 6h11 M4 12h1.5 M9 12h11 M4 18h1.5 M9 18h11',
  stamp:'M5 3h14v18H5z M8.5 3v1 M12 3v1 M15.5 3v1 M8.5 20v1 M12 20v1 M15.5 20v1 M12 8l1.5 3 3.3.4-2.4 2.3.6 3.3L12 15.4 9 17l.6-3.3-2.4-2.3 3.3-.4z',
  grid:'M4 4h16v16H4z M4 9.3h16 M4 14.6h16 M9.3 4v16 M14.6 4v16',
  seed:'M12 21v-8 M12 13c0-4-3-6-7-6 0 4 3 6 7 6z M12 11c0-3 3-6 7-6 0 4-3 6-7 6z',
  bolt:'M13 2 4 14h7l-1 8 9-12h-7z',
  brick:'M3 5h18v4.5H3z M5 9.5h14V14H5z M3 14h18v5H3z',
  mountain:'M2 20 9 7l4 7 2.5-4L22 20z M7.5 10l1.5 1.5 1.5-1.5',
  calendar:'M4 6h16v14H4z M4 10h16 M8 3v5 M16 3v5 M8 14h3v3H8z',
  compass:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M15.5 8.5l-2 5-5 2 2-5z',
  hourglass:'M7 3h10 M7 21h10 M8 3c0 5 8 5 8 9s-8 4-8 9 M16 3c0 5-8 5-8 9s8 4 8 9',
  thin:'M8 3h8v18H8z M11 7h2',
  moon:'M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z',
  star:'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z',
  person:'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M4 21a8 8 0 0 1 16 0',
  flame:'M12 3c1 4 5 6 5 11a5 5 0 0 1-10 0c0-3 2-4 2-7 1 1 2 2 3 3 .3-2.5 0-5 0-7z',
  trophy:'M8 4h8v5a4 4 0 0 1-8 0z M8 6H5a3 3 0 0 0 3 4 M16 6h3a3 3 0 0 1-3 4 M12 13v4 M8 20h8 M10 17h4v3h-4z',
  check:'M4 6h1.5 M9 6h11 M4 12h1.5 M9 12h11 M3.5 18l1.5 1.5 2.5-3 M11 18h9',
  stack:'M4 20h16 M5 20v-4h14v4 M6 16v-4h12v4 M5 12V8h14v4',
  globe:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M3 12h18 M12 3c3 3 3 15 0 18 M12 3c-3 3-3 15 0 18',
  sparkle:'M12 3v4 M12 17v4 M3 12h4 M17 12h4 M6 6l2.5 2.5 M15.5 15.5 18 18 M18 6l-2.5 2.5 M8.5 15.5 6 18',
  phone:'M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z M11 18.5h2',
  desktop:'M3 4h18v12H3z M8 20h8 M12 16v4',
  sun:'M12 3v2 M12 19v2 M3 12h2 M19 12h2 M5.6 5.6l1.4 1.4 M17 17l1.4 1.4 M5.6 18.4 7 17 M17 7l1.4-1.4 M12 16.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9z',
  tick:'M5 12.5l4.5 4.5L19 7.5',
  filmi:'M4 5h16v14H4z M8 5v14 M16 5v14 M4 9.5h4 M4 14.5h4 M16 9.5h4 M16 14.5h4',
  tvi:'M4 8h16v11H4z M9 3l3 5 3-5',
  pad:'M7 8h10a5 5 0 0 1 4.8 6.4l-.7 2.2a2.4 2.4 0 0 1-4.2.6L15.5 15h-7l-1.4 2.2a2.4 2.4 0 0 1-4.2-.6l-.7-2.2A5 5 0 0 1 7 8z M8 10.5v3 M6.5 12h3 M15.5 11.5h.01 M17.5 13h.01',
  chart:'M4 20V11 M10 20V5 M16 20v-7 M3 20h18 M19 8l2-2',
  camera:'M4 8h3l2-3h6l2 3h3v11H4z M12 17a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z',
  plant:'M12 21v-7 M12 14c-4 0-6-3-6-7 4 0 6 3 6 7z M12 12c0-3 2-6 6-6 0 4-2 6-6 6z M8 21h8l-1-4H9z'
};
const ico=(k,sw=1.7)=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${G[k]}"/></svg>`;
const TABS=[['shelf','Kitaplık','shelf','Raf'],['covers','Kapaklar','covers','Kapak'],['notes','Notlar','pen','Notlar'],['stats','Yıl Özeti','chart','Özet'],['tbr','Okunacaklar','list','Liste'],['stamps','Hedef','stamp','Hedef'],['bingo','Bingo','grid','Bingo']];
const BINGO_POOL=['Bir klasik','Çeviri kitap','Türk yazar','Kadın yazar','Yazarın ilk kitabı','500+ sayfa','200 sayfadan kısa','Sesli kitap','E-kitap','Arkadaş önerisi','Filme uyarlanmış','Diziye uyarlanmış','Serinin devamı','Serinin ilk kitabı','Tek kelimelik başlık','Başlığında renk var','Başlığında hayvan var','Başlıkta şehir adı','Başlıkta bir isim','Mavi kapaklı','Yeşil kapaklı','Kapağında çiçek var','Bu yıl çıkan','100 yıldan eski','Doğduğun yıl çıkan','Distopya','Polisiye','Bilim kurgu','Fantastik','Tarihi roman','Anı / biyografi','Deneme','Şiir kitabı','Kurgu dışı','Yeniden okuma','Kütüphaneden','Hediye gelen','İkinci el kitap','Başka ülkede geçen','Senin şehrinde geçen','Adada geçen','Kışın geçen','Yazın geçen','Öykü kitabı','Çizgi roman','Ödüllü kitap','Hiç okumadığın tür','Hep ertelediğin','Bir günde biten','Rafta en uzun bekleyen','Aşk hikâyesi','Gerilim','Korku','Yeni bir yazar','Rus edebiyatı','Latin Amerika','Japon yazar','Koreli yazar','Afrikalı yazar','İskandinav yazar','Kitap hakkında kitap','Kitapçıda geçen','Doğa / bilim','Psikoloji','Kişisel gelişim','Felsefe','Mitoloji','Masal / efsane','Yazarı 30 yaşından genç','Yazarı 70 yaşından büyük','Kadın kahraman','Çocuk anlatıcı','Hayvan anlatıcı','Mektup ya da günlük biçiminde','Birden çok anlatıcı','Kapak tasarımına âşık olduğun','Arkadaşınla birlikte okuduğun','Kitap kulübü seçimi','Annenin/babanın sevdiği kitap','Çocukken okuduğun bir kitap','Gülümseten kitap','Ağlatan kitap','Gece yarısına kadar okuduğun','Tren/uçak yolculuğunda okuduğun','Yemek ya da mutfak geçen','Müzik temalı','Yolculuk hikâyesi','300 sayfa civarı','Yazarın son kitabı','Aynı yazardan ikinci kitap'];

/* ---------- utils ---------- */
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const newId=()=>'b'+Date.now().toString(36)+Math.random().toString(36).slice(2,7);
const pad=n=>String(n).padStart(2,'0');
const todayISO=()=>{const t=new Date();return `${t.getFullYear()}-${pad(t.getMonth()+1)}-${pad(t.getDate())}`};
const yOf=d=>d?+d.slice(0,4):null, mOf=d=>d?+d.slice(5,7)-1:null;
const days=(a,b)=>Math.round((Date.parse(b)-Date.parse(a))/864e5);
const fmtDate=d=>d?`${+d.slice(8,10)} ${AYLAR[mOf(d)].slice(0,3)} ${d.slice(0,4)}`:'';
const hash=s=>{let h=0;for(const c of String(s))h=(h*31+c.charCodeAt(0))|0;return Math.abs(h)};
const autoColor=t=>PCOLS[hash(t)%PCOLS.length];
/* light text on dark covers, dark ink on light ones */
function inkFor(hex){const m=/^#?([0-9a-f]{6})$/i.exec(String(hex||''));if(!m)return'#3A2C24';const n=parseInt(m[1],16),r=n>>16&255,g=n>>8&255,b=n&255;return(0.299*r+0.587*g+0.114*b)<140?'#FBF4E6':'#3A2C24'}
const colorVars=b=>{const c=b.color||autoColor(b.title||'x');return`--c:${esc(c)};--cink:${inkFor(c)}`};
const stars=r=>A().scale===10?`<span class="score10">${r?String(+r).replace('.',','):'–'}<small>/10</small></span>`:`<span class="stars" style="--r:${+r||0}" aria-label="${+r||0} / 5 yıldız">★★★★★</span>`;
const fmtIco=f=>f&&A().formats[f]?`<span class="fmt-dot" title="${A().formats[f]}">${ico(A().fmtIcon[f])}</span>`:'';
const nf=n=>new Intl.NumberFormat('tr-TR').format(n);
function rng(seed){return()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
let toastT,undoFn=null;
function toast(m,undo){const t=$('#toast');if(!m){t.hidden=true;return}undoFn=undo||null;t.innerHTML=esc(m)+(undo?' <button class="undo" data-act="undo">Geri al</button>':'');t.hidden=false;clearTimeout(toastT);toastT=setTimeout(()=>{t.hidden=true;undoFn=null},undo?6000:3200)}

/* ---------- example books (shown only while the journal is empty) ---------- */
const DY=new Date().getFullYear(), dd=(m,d)=>`${DY}-${pad(m)}-${pad(d)}`;
const DEMO=[
 {id:'d1',title:'Kürk Mantolu Madonna',author:'Sabahattin Ali',pages:160,year:1943,genre:'Roman',color:PALETTE.rose,status:'read',owned:true,format:'print',startDate:dd(1,4),endDate:dd(1,6),rating:5,review:'Raif Efendi’nin sessizliğinin altındaki fırtına. Son sayfalarda boğazım düğümlendi.'},
 {id:'d2',title:'Dune',author:'Frank Herbert',pages:712,year:1965,genre:'Bilim kurgu',color:PALETTE.butter,status:'read',owned:true,format:'print',startDate:dd(1,10),endDate:dd(2,2),rating:4.5,review:'Dünya kurgusu inanılmaz. İlk yüz sayfa ağır ama sonra bırakamadım.'},
 {id:'d3',title:'Körlük',author:'José Saramago',pages:336,year:1995,genre:'Distopya',color:PALETTE.sky,status:'read',owned:false,format:'audio',startDate:dd(2,8),endDate:dd(2,20),rating:4,review:'Sesli dinledim; noktalama azlığı dinlerken hiç sorun olmadı.'},
 {id:'d4',title:'Bir İdam Mahkûmunun Son Günü',author:'Victor Hugo',pages:112,year:1829,genre:'Klasik',color:PALETTE.lilac,status:'read',owned:true,format:'print',startDate:dd(3,6),endDate:dd(3,7),rating:4,review:''},
 {id:'d5',title:'Saatleri Ayarlama Enstitüsü',author:'Ahmet Hamdi Tanpınar',pages:400,year:1961,genre:'Roman',color:PALETTE.sage,status:'read',owned:true,format:'ebook',startDate:dd(3,10),endDate:dd(4,5),rating:5,review:'Hayri İrdal hem komik hem hüzünlü. Zekice bir kitap.'},
 {id:'d6',title:'Martin Eden',author:'Jack London',pages:480,year:1909,genre:'Roman',color:PALETTE.peach,status:'read',owned:true,format:'print',startDate:dd(5,2),endDate:dd(5,19),rating:4,review:'Kendini yetiştirme hırsı çok tanıdık geldi.'},
 {id:'d7',title:'Fareler ve İnsanlar',author:'John Steinbeck',pages:111,year:1937,genre:'Klasik',color:PALETTE.teal,status:'read',owned:false,format:'ebook',startDate:dd(7,12),endDate:dd(7,13),rating:4.5,review:'Kısacık ama çok sert. George ile Lennie aklımdan çıkmıyor.'},
 {id:'d8',title:'Tutunamayanlar',author:'Oğuz Atay',pages:724,year:1972,genre:'Roman',color:PALETTE.navy,status:'reading',owned:true,format:'print',startDate:dd(9,20)},
 {id:'d9',title:'Simyacı',author:'Paulo Coelho',pages:188,year:1988,genre:'Roman',color:PALETTE.sand,status:'want',owned:true},
 {id:'d10',title:'Beyaz Diş',author:'Jack London',pages:280,year:1906,genre:'Macera',color:PALETTE.olive,status:'want',owned:true},
 {id:'d11',title:'Yüzyıllık Yalnızlık',author:'Gabriel García Márquez',pages:464,year:1967,genre:'Roman',status:'want',owned:false},
 {id:'d12',title:'Suç ve Ceza',author:'Fyodor Dostoyevski',pages:687,year:1866,genre:'Klasik',status:'want',owned:false},
 {id:'d13',title:'Fahrenheit 451',author:'Ray Bradbury',pages:208,year:1953,genre:'Distopya',status:'want',owned:false}
];

/* ---------- state ---------- */
/* mode: loading · pick (choose whose library) · ready · offline
   canEdit: this device holds the repo key and is looking at its own person's library */
const S={books:[],settings:{goals:{},bingo:{}},tab:'shelf',year:new Date().getFullYear(),coverMode:'month',shelfFilter:'all',noteFilter:'all',mode:'loading',canEdit:false,people:[],me:null,viewing:null,save:'',area:'home'};
const T=TABS.map(t=>t[0]);if(T.includes(location.hash.slice(1)))S.tab=location.hash.slice(1);
const demo=()=>false;
const BOOKS=()=>S.books;
/* Seyir Defteri can look at every year and one type at a time; its dates are approximate, so all years is the default */
const filmAll=()=>curArea()==='film'&&S.filmAll;
const fmtOk=b=>S.statFmt==='all'||(b.format||'film')===S.statFmt;
const viewBase=y=>filmAll()?BOOKS().filter(b=>b.status==='read').sort((a,b)=>(a.endDate||'')<(b.endDate||'')?-1:1):readIn(y);
const viewRead=y=>curArea()==='film'?viewBase(y).filter(fmtOk):readIn(y);
const yearLabel=()=>filmAll()?'Tüm yıllar':S.year;
const readIn=y=>BOOKS().filter(b=>b.status==='read'&&yOf(b.endDate)===y).sort((a,b)=>a.endDate<b.endDate?-1:1);
const goalOf=y=>+S.settings.goals?.[y]||24;

/* ---------- storage: JSON files in the GitHub repo ----------
   data/kisiler.json            people list
   data/kitapliklar/<id>.json   one person's books + settings
   Everyone reads; a device that holds the repo key writes, and only into the library of the person chosen as "me" on it. */
const REPO={owner:'Koloboros',repo:'ReadingJournal',branch:'main'};
const ROOT=location.pathname.includes('/beta/')?'beta/':'';
const API=`https://api.github.com/repos/${REPO.owner}/${REPO.repo}/contents/${ROOT}`;
const K={token:'rj-token',me:'rj-me',viewing:'rj-viewing'};
/* opened from this computer for testing: read the files next to the page and only log commits */
const LOCAL=/^(localhost|127\.0\.0\.1)$/.test(location.hostname);
const ls={get:k=>{try{return localStorage.getItem(k)}catch{return null}},set:(k,v)=>{try{v==null?localStorage.removeItem(k):localStorage.setItem(k,v)}catch{}}};
const b64enc=s=>{const u=new TextEncoder().encode(s);let bin='';for(let i=0;i<u.length;i+=0x8000)bin+=String.fromCharCode.apply(null,u.subarray(i,i+0x8000));return btoa(bin)};
const b64dec=s=>new TextDecoder().decode(Uint8Array.from(atob(s.replace(/\s/g,'')),c=>c.charCodeAt(0)));
const GH={
  token:()=>ls.get(K.token),
  headers(){const h={Accept:'application/vnd.github+json'};const t=this.token();if(t)h.Authorization='Bearer '+t;return h},
  /* {data, sha} · null when the file does not exist yet */
  async get(path){
    if(LOCAL){const r=await fetch(path+'?_='+Date.now(),{cache:'no-store'});return r.ok?{data:await r.json(),sha:'local'}:null}
    try{
      const r=await fetch(API+path+'?ref='+REPO.branch+'&_='+Date.now(),{headers:this.headers(),cache:'no-store'});
      if(r.status===404)return null;
      if((r.status===401||r.status===403)&&this.token()&&r.headers.get('x-ratelimit-remaining')!=='0')S.keyProblem=r.status;
      if(!r.ok)throw Object.assign(new Error('http '+r.status),{status:r.status});
      const j=await r.json();
      const txt=j.content?b64dec(j.content):await (await fetch(j.download_url+'?_='+Date.now(),{cache:'no-store'})).text();
      return{data:JSON.parse(txt),sha:j.sha};
    }catch(e){
      /* API unreachable or over its hourly limit: read the copy GitHub Pages serves (may be a minute behind) */
      try{const r=await fetch(path+'?_='+Date.now(),{cache:'no-store'});if(r.ok)return{data:await r.json(),sha:null};if(r.status===404)return null}catch{}
      throw e;
    }
  },
  async sha(path){
    if(LOCAL)return 'local';
    const r=await fetch(API+path+'?ref='+REPO.branch+'&_='+Date.now(),{headers:this.headers(),cache:'no-store'});
    if(r.status===404)return null;if(!r.ok)throw Object.assign(new Error('http '+r.status),{status:r.status});
    return (await r.json()).sha;
  },
  async put(path,data,sha,message,keepalive=false){
    if(LOCAL){console.info('[yerel deneme] commit:',message,path,data);return 'local'}
    const body=JSON.stringify({message,content:b64enc(JSON.stringify(data,null,1)),branch:REPO.branch,...(sha?{sha}:{})});
    const r=await fetch(API+path,{method:'PUT',headers:{...this.headers(),'Content-Type':'application/json'},body,keepalive:keepalive&&body.length<60000});
    if(!r.ok)throw Object.assign(new Error('http '+r.status),{status:r.status});
    return (await r.json()).content.sha;
  },
  async check(token){
    const r=await fetch(`https://api.github.com/repos/${REPO.owner}/${REPO.repo}`,{headers:{Accept:'application/vnd.github+json',Authorization:'Bearer '+token}});
    if(!r.ok)return false;const j=await r.json();return !!j.permissions?.push;
  }
};
const personName=id=>(S.people.find(p=>p.id===id)||{}).name||'Biri';
const slug=s=>s.toLocaleLowerCase('tr').replace(/ı/g,'i').replace(/ğ/g,'g').replace(/ü/g,'u').replace(/ş/g,'s').replace(/ö/g,'o').replace(/ç/g,'c').normalize('NFD').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'')||'kisi';
const cleanBook=b=>{const o={};for(const[k,v]of Object.entries(b))if(!k.startsWith('_')&&v!==undefined&&v!==''&&k!=='kind')o[k]=v;return o};
const Store={
  sha:{},msgs:[],timer:null,flushing:false,again:false,
  path:id=>`data/kitapliklar/${id}.json`,
  async init(){
    const m=/[#&]kurulum=([^&]+)/.exec(location.hash);
    const mk=/[#&]ara=([^&]+)/.exec(location.hash);if(mk){try{saveKeys(JSON.parse(atob(decodeURIComponent(mk[1]))))}catch{}}
    if(m){ls.set(K.token,decodeURIComponent(m[1]));history.replaceState(null,'',location.pathname+location.search);S.justSetup=true}
    S.mode='loading';render();
    try{const p=await GH.get('data/kisiler.json');S.people=p?.data?.kisiler||[];this.sha.people=p?.sha||null}
    catch{S.mode='offline';setSync();render();return}
    S.me=ls.get(K.me);if(S.me&&!S.people.some(p=>p.id===S.me))S.me=null;
    const v=ls.get(K.viewing);
    const start=S.me||((v&&S.people.some(p=>p.id===v))?v:null);
    if(S.justSetup)toast(GH.token()?'Kurulum tamam. Eklediklerin otomatik kaydedilecek.':'');
    if(!start){S.mode='pick';setSync();render();return}
    await this.open(start);
  },
  async open(id){
    if(this.msgs.length)await this.flush();
    S.viewing=id;ls.set(K.viewing,id);S.mode='loading';S.books=[];S.settings=normSettings();render();
    try{const f=await GH.get(this.path(id));const{lists,sets,extra}=splitFile(f?.data||{});this.lists=lists;this.sets=sets;this.extra=extra;this.useArea();this.sha[id]=f?.sha||null;S.mode='ready'}
    catch{S.mode='offline'}
    S.canEdit=!!GH.token()&&S.viewing===S.me;setSync();render();
    if(S.mode==='ready')Onboard.maybe();
  },
  /* one screen set, three lists: S.books and S.settings always point at the open area */
  sync(){if(this.lists){const a=curArea();this.lists[a]=S.books;this.sets[a]=S.settings}},
  useArea(){const a=curArea();S.books=this.lists?.[a]||[];S.settings=this.sets?.[a]||normSettings()},
  fileData(){this.sync();const L=this.lists,Z=this.sets;return{...(this.extra||{}),schema:2,books:L.book.map(cleanBook),films:L.film.map(cleanBook),games:L.game.map(cleanBook),settings:Z.book,filmSettings:Z.film,gameSettings:Z.game}},
  async saveBook(b){
    if(!S.canEdit)return toast('Bu rafı yalnızca sahibi düzenleyebilir.');
    const data={...b,kind:'book',updatedAt:Date.now()};Object.keys(data).forEach(k=>{if(k.startsWith('_')||data[k]===undefined)delete data[k]});
    const i=S.books.findIndex(x=>x.id===b.id);if(i>=0)S.books[i]=data;else S.books.push(data);
    render();this.schedule(`"${b.title}" ${i>=0?'güncellendi':'eklendi'}`);
  },
  async deleteBook(id){
    if(!S.canEdit)return;const b=S.books.find(x=>x.id===id);
    S.books=S.books.filter(x=>x.id!==id);render();this.schedule(`"${b?.title||'kayıt'}" silindi`);
  },
  saveSettings(){if(S.canEdit)this.schedule('hedef/bingo güncellendi')},
  /* collect edits for a moment, then write one commit */
  schedule(msg){if(!S.canEdit)return;this.msgs.push(msg);S.save='pending';setSync();clearTimeout(this.timer);this.timer=setTimeout(()=>this.flush(),2500)},
  async flush(leaving=false){
    clearTimeout(this.timer);
    if(this.flushing){this.again=true;return}
    if(!this.msgs.length||!S.me)return;
    const id=S.me,msgs=this.msgs.splice(0),path=this.path(id);this.flushing=true;S.save='saving';setSync();
    const message=`${personName(id)}: ${msgs.length>3?msgs.length+' değişiklik':msgs.join(', ')}`;
    const data=this.fileData();
    try{
      if(!this.sha[id]||this.sha[id]==='local')this.sha[id]=await GH.sha(path);
      try{this.sha[id]=await GH.put(path,data,this.sha[id],message,leaving)}
      catch(e){if(e.status!==409&&e.status!==422)throw e;
        /* another device saved first: keep whatever else it wrote to the file, our books and settings win */
        const f=await GH.get(path),{extra}=splitFile(f?.data||{});this.extra={...extra};
        this.sha[id]=await GH.put(path,{...data,...extra},f?.sha||await GH.sha(path),message,leaving)}
      S.save='saved';S.saveErr=null;S.keyProblem=null;
    }catch(e){
      this.msgs.unshift(...msgs);S.save='error';S.saveErr=saveReason(e);
      toast('Kaydedilemedi: '+S.saveErr);
      if(!(e.status===401||e.status===403||e.status===404))this.timer=setTimeout(()=>this.flush(),15000);
      render();
    }finally{this.flushing=false;setSync();if(this.again){this.again=false;this.flush()}}
  },
  async addPerson(name){
    if(!GH.token())return openSetup();
    name=name.trim();if(!name)return;
    let id=slug(name),n=2;while(S.people.some(p=>p.id===id))id=slug(name)+'-'+n++;
    const person={id,name,color:PCOLS[S.people.length%PCOLS.length]};
    try{
      const f=await GH.get('data/kisiler.json');const list=f?.data?.kisiler||[];list.push(person);
      this.sha.people=await GH.put('data/kisiler.json',{kisiler:list},f?.sha,`Yeni kişi: ${name}`);
      this.sha[id]=await GH.put(this.path(id),{books:[],settings:normSettings()},null,`${name} için boş kitaplık`);
      S.people=list;return person;
    }catch(e){toast(e.status===401||e.status===403?'Anahtar geçersiz; kurulumu kontrol et.':'Kişi eklenemedi; tekrar dene.')}
  }
};
addEventListener('pagehide',()=>{if(Store.msgs.length)Store.flush(true)});
addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden'&&Store.msgs.length)Store.flush(true)});
/* a short, specific reason for a failed save */
function saveReason(e){
  const st=e?.status;
  if(st===401)return'anahtar geçersiz ya da süresi dolmuş (401). Kurulum ekranından yeni anahtar gir.';
  if(st===403)return'anahtarın bu repoya yazma izni yok (403). Contents: Read and write izni seçili olmalı.';
  if(st===404)return'repo ya da dosya bulunamadı (404). Anahtar doğru repoya mı bağlı?';
  if(st===409||st===422)return'aynı anda başka bir yerden kayıt yapıldı ('+st+'). Birazdan yeniden denenecek.';
  if(st)return'GitHub hata verdi ('+st+'). Birazdan yeniden denenecek.';
  return'GitHub’a ulaşılamadı (bağlantı). Birazdan yeniden denenecek.';
}
/* bingo cards live in a list (several per year, none overwritten); the old one-card-per-year format is moved into it */
const FILE_KEYS=['schema','books','films','games','settings','filmSettings','gameSettings'];
function splitFile(d){
  const extra={};for(const k of Object.keys(d))if(!FILE_KEYS.includes(k))extra[k]=d[k];
  const mark=a=>(a||[]).map(b=>({...b,kind:'book'}));
  return{extra,lists:{book:mark(d.books),film:mark(d.films),game:mark(d.games)},sets:{book:normSettings(d.settings),film:normSettings(d.filmSettings),game:normSettings(d.gameSettings)}};
}
function normSettings(s){
  const{bingo:_old,...rest}=s||{};const o={...rest,goals:{...(s?.goals||{})},bingoCards:[...(s?.bingoCards||[])],bingoActive:{...(s?.bingoActive||{})}};
  for(const[y,c]of Object.entries(s?.bingo||{}))if(c&&Array.isArray(c.cells)&&!o.bingoCards.some(k=>k.id==='y'+y))
    o.bingoCards.push({id:'y'+y,year:+y,name:'Kart 1',size:c.size||Math.round(Math.sqrt(c.cells.length)),cells:c.cells});
  return o;
}
function fail(){toast('Kaydedilemedi. Tekrar dene.')}
function setSync(){
  const el=$('#sync');if(!el)return;
  const who=S.viewing?personName(S.viewing):'';
  el.textContent=S.mode==='loading'?'Yükleniyor…':S.mode==='offline'?'Bağlantı kurulamadı':S.mode==='pick'?'Sen kimsin?'
    :!S.canEdit?`${who} · ${S.viewing===S.me?'görüntüleme (anahtar yok)':'misafir görünümü'}`
    :({pending:'Değişiklikler kaydedilecek…',saving:'GitHub’a kaydediliyor…',saved:'Kaydedildi ✓',error:'Kaydedilemedi'}[S.save]||`${who} · senin evin`);
  const w=$('#who');if(w)w.innerHTML=`${avatarOf(S.people.find(p=>p.id===S.viewing))?`<span class="whoav">${personAv(S.people.find(p=>p.id===S.viewing))}</span>`:ico('person')}<span>${esc(S.viewing?personName(S.viewing):'Kimin evi?')}</span><span aria-hidden="true">▾</span>`;
}

/* ---------- covers ---------- */
function coverSrc(b){return b._preview||b.coverData||b.coverUrl||''}
/* painted cover underneath; a real cover image sits on top and simply disappears if it fails to load */
function coverHTML(b,extra=''){
  const src=coverSrc(b);
  const rib=b.status==='reading'?'<span class="ribbon"></span>':'';
  return `<div class="cover gen" style="${colorVars(b)}">${rib}<span class="cv-band"></span><span class="cv-title">${esc(b.title||A().Item+' adı')}</span><span class="cv-author">${esc(b.author||'')}</span>${src?`<img class="cv-img" src="${esc(src)}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove()">`:''}</div>`;
}
const citem=(b,sub=true)=>`<button class="citem" data-act="open" data-id="${b.id}" title="${esc(b.title)}">${coverHTML(b)}${sub?`<span>${b.status==='read'?stars(b.rating):''} ${fmtIco(b.format)}</span>`:''}</button>`;

/* ---------- phone / desktop view ----------
   auto: phone layout on touch phones or narrow windows; a choice from the header toggle is remembered on this device. */
const VIEW_KEY='okuma-defteri-view';
const viewPref=()=>{try{return localStorage.getItem(VIEW_KEY)||'auto'}catch{return'auto'}};
const isPhone=()=>matchMedia('(pointer:coarse)').matches&&Math.min(screen.width,screen.height)<=820;
function setViewport(content){let m=document.querySelector('meta[name="viewport"]');if(!m){m=document.createElement('meta');m.name='viewport';document.head.appendChild(m)}if(m.content!==content)m.content=content}
function applyView(){
  document.documentElement.toggleAttribute('data-night',isDark());
  const pref=viewPref(),phone=isPhone(),root=document.documentElement;
  if(phone)setViewport(pref==='desktop'?'width=1100':'width=device-width,initial-scale=1,viewport-fit=cover');
  const mode=pref!=='auto'?pref:(phone||innerWidth<=720?'mobile':'desktop');
  root.dataset.view=mode;
  root.toggleAttribute('data-narrow',mode==='mobile'&&!phone&&innerWidth>720);
  const devW=Math.min(screen.width,screen.height,innerWidth);
  const clamp=mode==='mobile'&&phone&&innerWidth>devW+40;
  root.toggleAttribute('data-clamp',clamp);if(clamp)root.style.setProperty('--phone-w',devW+'px');
  const vs=$('#viewsel');if(vs)vs.innerHTML=[['mobile','phone','Telefon görünümü'],['desktop','desktop','Masaüstü görünümü']].map(([v,i,l])=>`<button data-act="view" data-v="${v}" aria-pressed="${mode===v}" title="${l}" aria-label="${l}">${ico(i)}</button>`).join('')
    +`<span class="vs-sep"></span><button data-act="theme" title="${isDark()?'Aydınlık moda geç':'Karanlık moda geç'}" aria-label="${isDark()?'Aydınlık moda geç':'Karanlık moda geç'}">${ico(isDark()?'sun':'moon')}</button>`;
}
/* light / dark: follows the device until chosen here; the choice is remembered on this device */
const THEME_KEY='rj-theme';
const isDark=()=>{const t=document.documentElement.dataset.theme;return t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches};
function applyTheme(){let t=null;try{t=localStorage.getItem(THEME_KEY)}catch{}if(t==='dark'||t==='light')document.documentElement.dataset.theme=t;else delete document.documentElement.dataset.theme}
applyTheme();
matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change',()=>applyView());
addEventListener('resize',()=>{if(viewPref()==='auto'){const was=document.documentElement.dataset.view;applyView();if(was!==document.documentElement.dataset.view)render()}});

/* ---------- render ---------- */
function render(){
  $('#view').classList.toggle('all-years',filmAll());
  if(S.mode==='ready'&&!Peers.ready&&!Peers.loading)Peers.ensure().then(render);
  if(S.mode==='ready'&&!Kid.idx&&!Kid.loading)Kid.loadIdx();
  if(S.mode==='ready'&&partnerOf()&&!Home.data&&!Home.loading)Home.load();
  $('#yr').textContent=S.year;
  const addT=document.querySelector('#btn-add .add-txt');if(addT)addT.textContent=curArea()==='film'&&S.tab==='shelf'?A().formats[S.fmt]+' ekle':A().add;
  $('#brandname').textContent=S.area==='home'||S.mode==='pick'?'Bizim Ev':S.area==='kid'?'Çocuk Rafı':A().brand;
  $('#tabs').innerHTML=A().tabs.map(([k,l,i,s])=>`<button class="tab" data-act="tab" data-tab="${k}" ${S.tab===k?'aria-current="page"':''}>${ico(i)}<span class="lf">${l}</span><span class="ls">${s}</span></button>`).join('');
  if(!A().tabs.some(t=>t[0]===S.tab))S.tab='shelf';
  const vf={shelf:vShelf,covers:vCovers,notes:vNotes,stats:vStats,tbr:vTbr,stamps:vStamps,bingo:vBingo,kesfet:vKesfet}[S.tab];
  const skip=S.area==='home'||S.area==='kid'||S.mode==='pick',v=skip?'':['stats','stamps','bingo'].includes(S.tab)?areaWords(vf()):vf();
  document.documentElement.toggleAttribute('data-readonly',!S.canEdit);
  document.documentElement.dataset.area=S.mode==='pick'?'home':S.area;
  setSync();
  if(S.mode==='pick'){$('#view').innerHTML=vPick();return}
  if(S.area==='home'&&S.mode==='ready'){$('#view').innerHTML=vHome();Pet.mount();return}
  if(S.area==='kid'&&S.mode==='ready'){clearTimeout(Pet.t);$('#view').innerHTML=vKid();return}
  const who=esc(personName(S.viewing));
  const ban=S.mode==='loading'?`<div class="banner"><span class="busy"><span class="spin"></span>Yükleniyor…</span></div>`
    :S.mode==='offline'?`<div class="banner"><span>Veriler şu an yüklenemedi. İnternet bağlantını kontrol edip sayfayı yenile.</span></div>`
    :S.viewing!==S.me?`<div class="banner"><span><b>${esc(gen(personName(S.viewing)))} rafına bakıyorsun.</b> Dokunarak notlarını okuyabilirsin.</span><button class="btn" data-act="people">Kişi değiştir</button></div>`
    :S.save==='error'&&S.viewing===S.me?`<div class="banner warn"><span><b>Son değişiklik kaydedilemedi:</b> ${esc(S.saveErr||'')}</span><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn primary" data-act="retry-save">Tekrar dene</button><button class="btn" data-act="setup">Kurulum</button></div></div>`
    :S.keyProblem&&S.viewing===S.me?`<div class="banner warn"><span><b>Kayıt anahtarı çalışmıyor (${S.keyProblem}).</b> Süresi dolmuş ya da iptal edilmiş olabilir. Kurulum ekranından yeni anahtar gir.</span><button class="btn primary" data-act="setup">Kurulum</button></div>`
    :!GH.token()?`<div class="banner"><span><b>Bu cihazda kayıt anahtarı yok.</b> ${A().Item} ekleyebilmek için bir kez kurulum yap ya da arkadaşının gönderdiği kurulum bağlantısını aç.</span><button class="btn primary" data-act="setup">Kurulum</button></div>`
    :S.mode==='ready'&&!S.books.length?`<div class="banner"><span><b>Rafın boş.</b> İlk ${A().item} kaydını ekle; her değişiklik GitHub’a otomatik kaydedilir.</span><button class="btn primary" data-act="add">Ekle</button></div>`:'';
  $('#view').innerHTML=ban+(['shelf','stamps','covers'].includes(S.tab)?fillBanner():'')+v+`<p class="foot">Raflar GitHub’daki <a href="https://github.com/${REPO.owner}/${REPO.repo}" target="_blank" rel="noopener">${REPO.owner}/${REPO.repo}</a> reposunda saklanıyor. <button class="linkbtn" data-act="setup">Kurulum</button><br>${A().credit||''}</p><button class="fab" data-act="rec" aria-label="Öneri al">${(()=>{const p=Store.extra?.pet;return p?petSVG(p.type,p.coat):ico('sparkle')})()}<span>Öneri al</span></button>`;
  if($('#petwrap'))Pet.mount();else clearTimeout(Pet.t);
}

/* one genre list for the shelf, the stats and the genre picker; related genres sit next to each other */
const GENRES=GENRE_SETS.book;
const gkeyOf=()=>new Map(GENRE_SETS[curArea()].map((g,i)=>[g.toLocaleLowerCase('tr'),i]));
const GKEY=new Map(GENRES.map((g,i)=>[g.toLocaleLowerCase('tr'),i]));
function genreOf(b){const g=String(b?.genre||'').split(',')[0].trim().replace(/\s+/g,' ');if(!g)return'Türsüz';const i=gkeyOf().get(g.toLocaleLowerCase('tr'));return i!=null?GENRE_SETS[curArea()][i]:g.charAt(0).toLocaleUpperCase('tr')+g.slice(1)}
const genreRank=g=>{const i=gkeyOf().get(g.toLocaleLowerCase('tr'));return i!=null?i:g==='Türsüz'?999:500};
function allGenres(){const s=new Set(GENRE_SETS[curArea()]);S.books.forEach(b=>{const g=genreOf(b);if(g!=='Türsüz')s.add(g)});return[...s]}
const surname=a=>{const p=String(a||'').trim().split(/\s+/);return(p[p.length-1]||'').toLocaleLowerCase('tr')};
const cmp=(x,y)=>String(x??'').localeCompare(String(y??''),'tr');
function shelfOrder(a,b){
  const ga=genreOf(a),gb=genreOf(b);const g=genreRank(ga)-genreRank(gb)||cmp(ga,gb);if(g)return g;
  return cmp(surname(a.author),surname(b.author))||cmp(a.author,b.author)||cmp(a.series,b.series)
    ||((+a.seriesNo||0)-(+b.seriesNo||0))||((+a.year||0)-(+b.year||0))||cmp(a.title,b.title);
}
/* painted shelf trinkets, one per topic: plant, mushroom dome, candles, crystals, books with tea */
const DECOR=[
 `<path d="M16 52h28l-4 26H20z" fill="#C97C5D"/><rect x="13" y="48" width="34" height="7" rx="2" fill="#A9604A"/><g fill="#5F8A57"><ellipse cx="30" cy="28" rx="5" ry="17"/><ellipse cx="20" cy="33" rx="5" ry="14" transform="rotate(-30 20 33)"/><ellipse cx="40" cy="33" rx="5" ry="14" transform="rotate(30 40 33)"/></g><g fill="#8DB97A"><ellipse cx="13" cy="42" rx="4" ry="10" transform="rotate(-58 13 42)"/><ellipse cx="47" cy="42" rx="4" ry="10" transform="rotate(58 47 42)"/><ellipse cx="26" cy="20" rx="3" ry="9" transform="rotate(-12 26 20)"/></g>`,
 `<rect x="8" y="73" width="44" height="6" rx="2" fill="#8B5B35"/><ellipse cx="30" cy="72" rx="17" ry="3.5" fill="#7FA872"/><rect x="21" y="58" width="4" height="14" fill="#F1E3CC"/><path d="M14 60a9 7.5 0 0 1 18 0z" fill="#C6533F"/><rect x="35" y="63" width="3" height="9" fill="#F1E3CC"/><path d="M30 64a6.5 5 0 0 1 13 0z" fill="#D97A55"/><g fill="#FFF8EC"><circle cx="19" cy="56" r="1.1"/><circle cx="25" cy="54.5" r="1.2"/><circle cx="36.5" cy="61.5" r=".9"/></g><path d="M11 73V42a19 19 0 0 1 38 0v31" fill="rgba(190,225,240,.22)" stroke="#9FB8C2" stroke-width="1.5"/><path d="M17 44a13 13 0 0 1 8-12" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".7"/><circle cx="30" cy="20" r="2.6" fill="#9FB8C2"/>`,
 `<circle cx="30" cy="40" r="22" fill="var(--glow)" opacity=".18"/><rect x="5" y="73" width="50" height="6" rx="3" fill="#C9A27A"/><rect x="11" y="46" width="11" height="27" rx="2" fill="#F3E6CF"/><rect x="25" y="34" width="11" height="39" rx="2" fill="#F8F0DF"/><rect x="39" y="54" width="11" height="19" rx="2" fill="#EBDBBE"/><g fill="var(--glow)"><path d="M16.5 44c-3.5-4 0-8.5 0-11 2.5 3.5 4.5 7 0 11z"/><path d="M30.5 32c-3.5-4 0-8.5 0-11 2.5 3.5 4.5 7 0 11z"/><path d="M44.5 52c-3.5-4 0-8.5 0-11 2.5 3.5 4.5 7 0 11z"/></g>`,
 `<ellipse cx="30" cy="77" rx="24" ry="3" fill="rgba(60,40,25,.18)"/><g stroke="#8E7FA8" stroke-width="1.2" stroke-linejoin="round"><path d="M10 77V56l6-7 6 8-2 20z" fill="#EEE8F6"/><path d="M20 77l-3-37 8-12 7 12-2 37z" fill="#E1D8F0"/><path d="M30 77l2-43 8-13 7 13-5 43z" fill="#CFC2E6"/><path d="M42 77l4-21 6-5 3 9-4 17z" fill="#E7E0F3"/></g><path d="M36 30l4-7" stroke="#fff" stroke-width="1.5" stroke-linecap="round" opacity=".8"/>`,
 `<rect x="6" y="67" width="48" height="11" rx="2" fill="#A7C29A"/><rect x="10" y="57" width="42" height="10" rx="2" fill="#E6A9A0"/><rect x="8" y="48" width="44" height="9" rx="2" fill="#EBD08C"/><g stroke="rgba(60,40,25,.35)"><path d="M12 72h36M15 62h32M13 52h34"/></g><path d="M20 36h17v5a8.5 8.5 0 0 1-17 0z" fill="#FFFAF1" stroke="#7B695C"/><path d="M37 38a3 3 0 0 1 0 6" fill="none" stroke="#7B695C"/><path d="M25 32c-2-3 2-4 0-8M31 32c-2-3 2-4 0-8" fill="none" stroke="#B6AA96" stroke-linecap="round"/>`
];
DECOR.push(PROPS.glasses,PROPS.stanley);
const decor=i=>`<svg class="dec" viewBox="0 0 60 82" aria-hidden="true">${DECOR[i%DECOR.length]}</svg>`;
const IVY=`<svg class="ivy" viewBox="0 0 130 170" aria-hidden="true"><path d="M2 8C40 16 80 4 130 14" fill="none" stroke="#5F8A57" stroke-width="2"/><path d="M8 10C24 40 8 70 24 100S30 145 40 170" fill="none" stroke="#5F8A57" stroke-width="2"/><g fill="#6E9A5E">${[[30,10,-20],[58,11,10],[86,8,-15],[112,12,15],[14,30,-40],[20,52,35],[12,74,-40],[23,96,30],[28,120,-35],[34,142,30],[39,164,-20]].map(([x,y,r])=>`<path d="M0 0c-6-4-7-11-2-12 2 0 2 2 2 2s0-2 2-2c5 1 4 8-2 12z" transform="translate(${x} ${y}) rotate(${r}) scale(1.25)"/>`).join('')}</g><g fill="#8DB97A">${[[44,14,25],[100,10,-10],[18,42,-20],[16,86,25],[31,131,-25]].map(([x,y,r])=>`<path d="M0 0c-6-4-7-11-2-12 2 0 2 2 2 2s0-2 2-2c5 1 4 8-2 12z" transform="translate(${x} ${y}) rotate(${r})"/>`).join('')}</g></svg>`;
function vShelf(){
  const area=curArea(),film=area==='film';
  const seen=film?BOOKS().filter(b=>b.status==='read'||b.status==='reading'):[];
  const all=BOOKS().filter(b=>area==='game'||(film?(b.status==='read'||b.status==='reading')&&(b.format||'film')===S.fmt:(b.owned||b.status!=='want')&&b.status!=='skip'));
  const f=film&&S.shelfFilter==='owned'&&!homeOpen()?'all':S.shelfFilter,pool=film?BOOKS().filter(b=>(b.format||'film')===S.fmt):all;
  /* Benim rafım, what is finished, what waits, and everything the household owns */
  const shared=()=>homePool().filter(b=>(!film||(b.format||'film')===S.fmt)&&!BOOKS().some(x=>sameItem(x,b)));
  let list=(f==='owned'?[...pool.filter(b=>!film&&b.owned&&b.status!=='skip'),...shared()]:f==='unread'?pool.filter(b=>b.status==='want'):all.filter(b=>f==='all'||f===b.status)).sort(shelfOrder);
  const readN=all.filter(b=>b.status==='read').length, waitN=all.filter(b=>b.owned&&b.status==='want').length, readingN=all.filter(b=>b.status==='reading').length;
  const chip=(k,l)=>`<button class="chip" data-act="shelf-f" data-f="${k}" aria-pressed="${f===k}">${l}</button>`;
  let prevG=null,gi=0,recent=[];
  let spines=area!=='book'?'':list.map((b,i)=>{
    const w=Math.max(24,Math.min(48,Math.round((+b.pages||250)/14)));const h=118+hash(b.title)%46;
    const cls=b.status==='read'?'':b.status==='reading'?'reading':'unread';
    const g=genreOf(b);const deco=g!==prevG?`<div class="slot"><span class="bookend ${gi%2?'slim':''}"><span class="tag">${esc(g)}</span>${gi++%2?'<span class="bk-end"></span>':decor(gi>>1)}</span></div>`:'';prevG=g;
    /* neighbours never share a colour: step through the palette until it differs from the last two spines */
    let c=b.color||autoColor(b.title),k=PCOLS.indexOf(c);while(recent.includes(c)&&k>=0){k=(k+5)%PCOLS.length;c=PCOLS[k]}recent=[c,recent[0]];
    return deco+`<div class="slot"><button class="spine ${cls}" style="--c:${esc(c)};--cink:${inkFor(c)};width:${w}px;height:${h}px" data-act="${b._home?'home-open':'open'}" data-id="${b.id}" title="${esc(b.title)} — ${b._home?'ortak':A().status[b.status]||''}"><span class="st">${esc(b.title)}</span></button></div>`;
  }).join('');
  return `${film?fmtBar(seen):''}<div class="head"><h2 class="hand">${film?A().formatsPl[S.fmt]:A().shelf}</h2><div class="chips">${chip('all','Benim rafım')}${chip('read',A().doneTitle)}${chip('unread','Bekleyenler')}${!film?chip('owned','Sahip olduklarım'):homeOpen()?chip('owned',A().share.title):''}</div></div>
  ${area==='game'?'':`<div class="legend"><span><i style="background:${PALETTE.sage}"></i>${A().legend[0]}</span>${film?'':`<span><i style="border:1.5px solid var(--ink-2)"></i>${A().legend[1]}</span>`}<span><i style="background:var(--postmark);width:6px"></i>${A().legend[2]}</span></div>`}
  <div class="shelf-stats"><span><b>${f==='owned'||f==='unread'?list.length:all.length}</b> toplam ${film?A().formats[S.fmt].toLocaleLowerCase('tr'):A().item}</span><span><b>${readN}</b> ${A().done}</span>${readingN?`<span><b>${readingN}</b> ${A().status.reading.toLocaleLowerCase('tr')}</span>`:''}${film?'':`<span><b>${waitN}</b> ${A().waitLabel}</span>`}</div>
  ${area==='game'?gameScreen(list):!list.length?`<div class="empty">Bu filtrede ${A().item} yok.</div>`:film?filmStand(list):`<div class="shelf">${IVY.replace('class="ivy"','class="ivy ivy-l"')}${IVY.replace('class="ivy"','class="ivy ivy-r"')}${spines}${petRail()}</div>`}`;
}

function vCovers(){
  const film=curArea()==='film',R=viewRead(S.year), reading=BOOKS().filter(b=>b.status==='reading'&&(!film||fmtOk(b)));
  const tog=(k,l)=>`<button class="chip" data-act="cover-m" data-m="${k}" aria-pressed="${S.coverMode===k}">${l}</button>`;
  let body='';
  if(!R.length)body=`<div class="empty">${filmAll()?'Bu seçimde':S.year+' yılında'} bitirilmiş ${A().item} yok. “${A().status.read}” olarak kaydettiğinde burada, bittiği ayın altında görünür.</div>`;
  else if(S.coverMode==='year'||filmAll())body=`<div class="month"><div class="month-h"><h3>${yearLabel()}</h3><span>${R.length} ${A().item}</span>${decor(S.year)}</div><div class="cgrid ledge">${R.map(b=>citem(b)).join('')}</div></div>`;
  else for(let m=11;m>=0;m--){const L=R.filter(b=>mOf(b.endDate)===m);if(!L.length)continue;
    const pg=L.reduce((s,b)=>s+(+b.pages||0),0);
    body+=`<section class="month"><div class="month-h"><h3>${AYLAR[m]}</h3><span>${L.length} ${A().item}${pg?' · '+nf(pg)+' '+A().unit:''}</span>${decor(m)}</div><div class="cgrid ledge">${L.map(b=>citem(b)).join('')}</div></section>`}
  return `${curArea()==='game'?`<div class="buhar"><b>BUHAR</b><span>Kütüphane</span><span>${BOOKS().filter(b=>b.status!=='skip').length} oyun</span><span>${nf(BOOKS().reduce((s,b)=>s+(+b.pages||0),0))} saat ömür</span></div>`:''}${film?seyirBar(viewBase(S.year)):''}<div class="head"><h2 class="hand">${A().doneTitle} <small>${yearLabel()}</small></h2>${filmAll()?'':`<div class="chips">${tog('month','Aylık')}${tog('year','Yıllık')}</div>`}</div>
  ${reading.length?`<div class="sec-h"><h3>${A().nowLabel}</h3></div><div class="reading-row">${reading.map(b=>citem(b,false)).join('')}</div>`:''}${body}`;
}

function vNotes(){
  const film=curArea()==='film',f=A().formats[S.noteFilter]&&!film?S.noteFilter:'all';
  const R=viewRead(S.year).slice().reverse().filter(b=>f==='all'||b.format===f);
  const chip=(k,l)=>`<button class="chip" data-act="note-f" data-f="${k}" aria-pressed="${f===k}">${k!=='all'?ico(A().fmtIcon[k]):''}${l}</button>`;
  const card=(b,i)=>`<button class="rcard taped" style="--tape:${PCOLS[(i*3)%PCOLS.length]}" data-act="open" data-id="${b.id}">${coverHTML(b)}<div style="min-width:0"><span class="rlabel">${A().noteLabel}</span><h3>${esc(b.title)}</h3>
    <div class="rmeta"><span>${esc(b.author||'')}</span>${b.pages?`<span>${b.pages} ${A().unit}</span>`:''}${b.format&&A().formats[b.format]?`<span>${fmtIco(b.format)} ${A().formats[b.format]}</span>`:''}</div>
    <div class="rmeta">${stars(b.rating)}<span>${b.startDate?fmtDate(b.startDate)+' → ':''}${fmtDate(b.endDate)}</span></div>
    <p class="rtext ${b.review?'':'none'}">${b.review?esc(b.review):'Henüz not yazılmadı. Eklemek için dokun.'}</p></div></button>`;
  const grouped=film&&S.statFmt==='all'?Object.keys(A().formats).map(k=>{const L=R.filter(b=>(b.format||'film')===k);return L.length?`<h3 class="fmt-h">${A().formatsPl[k]} <small>${L.length}</small></h3><div class="rgrid">${L.map(card).join('')}</div>`:''}).join(''):`<div class="rgrid">${R.map(card).join('')}</div>`;
  return `${film?seyirBar(viewBase(S.year)):''}<div class="head"><h2 class="hand">${A().notes} <small>${yearLabel()}</small></h2>${film?'':`<div class="chips">${chip('all','Tümü')}${Object.entries(A().formats).map(([k,l])=>chip(k,l)).join('')}</div>`}</div>
  ${R.length?grouped:`<div class="empty">Bu seçim için not yok. Bitirdiğin bir ${A().item} için puan ve kısa yorum eklediğinde burada toplanır.</div>`}`;
}

/* small painted shelf with books and a plant/candles, for notebook page headers */
function shelfIllu(v){
  let x=6,books='';const hs=[52,60,46,58,64,50,56];
  for(let i=0;i<7;i++){const w=[12,10,14,11,9,13,12][i],h=hs[(i+v*3)%7],c=PCOLS[(i*2+v*5)%PCOLS.length];
    if(i===5){books+=`<rect x="${x+4}" y="${78-h}" width="${w}" height="${h}" rx="2" fill="${c}" transform="rotate(14 ${x+4} 78)"/>`;x+=w+10;continue}
    books+=`<rect x="${x}" y="${78-h}" width="${w}" height="${h}" rx="2" fill="${c}"/><rect x="${x}" y="${84-h}" width="${w}" height="2" fill="rgba(60,40,25,.2)"/>`;x+=w+1.5}
  return `<svg class="nb-illu" viewBox="0 0 190 86" aria-hidden="true">${books}<rect x="2" y="78" width="186" height="7" rx="2" fill="var(--wood)"/><g transform="translate(${x+2} 0) scale(.95)">${DECOR[v?2:0]}</g></svg>`;
}
/* to-read lists: a tick moves a book one step along  wish list → on my shelf → reading → finished */
function vTbr(){
  const W=BOOKS(),T=A().list,wish=W.filter(b=>b.status==='want'&&!b.owned),wait=W.filter(b=>b.status==='want'&&b.owned),now=W.filter(b=>b.status==='reading');
  const row=(b,i,act,label,extra='')=>`<li class="trow" style="--c:${PCOLS[i%PCOLS.length]}"><button class="chk" data-act="${act}" data-id="${b.id}" aria-label="${esc(b.title)}: ${label}" title="${label}">${ico('tick',3)}</button>
    <button class="tt" data-act="open" data-id="${b.id}">${esc(b.title)}${b.author?`<small>${esc(b.author)}</small>`:''}</button>${extra}</li>`;
  const sec=(t,list,illu,rows)=>`<section class="notebook"><div class="nb-top"><h3 class="nb-title">${t[0]}<small>${t[1]}</small></h3>${illu}</div>
    ${list.length?`<p class="nb-hint">${ico('tick',3)} ${t[2]}</p><ul class="tlist">${rows}</ul>`:`<div class="empty">${t[4]}</div>`}</section>`;
  const film=curArea()==='film';
  return `<div class="head"><h2 class="hand">${T.title}</h2><span class="muted">${film?`${W.filter(b=>b.status==='want').length} istek`:`${wish.length} istek · ${wait.length} bekleyen`} · ${now.length} devam eden</span></div>
  <form class="tbr-add" id="tbr-form"><input type="text" id="tbr-in" placeholder="${T.ph}" autocomplete="off"><button class="btn primary" type="submit">${T.add}</button></form>
  <div class="nb-pages">
  ${film?sec(T.wish,[...wish,...wait],shelfIllu(0),[...wish,...wait].map((b,i)=>row(b,i,'tbr-start',T.wish[3])).join('')):sec(T.wish,wish,shelfIllu(0),wish.map((b,i)=>row(b,i,'tbr-own',T.wish[3],`<button class="mini" data-act="tbr-start" data-id="${b.id}" title="Almadan başladım">Başladım</button>`)).join(''))}
  ${film?'':sec(T.wait,wait,shelfIllu(1),wait.map((b,i)=>row(b,i+5,'tbr-start',T.wait[3])).join(''))}
  ${sec(T.now,now,shelfIllu(2),now.map((b,i)=>row(b,i+9,'tbr-done',T.now[3])).join(''))}
  ${film?unratedSec(sec,T):''}
  </div>`;
}

/* ---------- yearly stats ---------- */
/* genre colours for charts: fixed order, validated for colour-blind separation; text stays in ink tokens */
const GCOL=['#9CC59A','#9FC1E3','#EBA798','#C3AEDD','#EFCB7C','#8FCBC2'],GOTHER='#D6CEC3';
const gName=genreOf;
const chunk=(a,n)=>a.reduce((r,x,i)=>(i%n?r[r.length-1].push(x):r.push([x]),r),[]);
function vStats(){
  const y=S.year,film=curArea()==='film',allR=film?viewBase(y):readIn(y),R=film?allR.filter(fmtOk):allR;
  const head=`<div class="head"><h2 class="hand">Yıl Özeti <small>${yearLabel()}</small></h2>${film?yearChips():''}</div>${film?statCards(allR):''}`;
  if(!R.length)return head+`<div class="empty">${decor(3)}<p>${filmAll()?'Bu seçimde':y+' yılında'} bitirilmiş kitap yok. Kitap bitirdikçe tür, puan ve ay grafiklerin burada oluşur.</p></div>`;
  const cnt={};R.forEach(b=>{const g=gName(b);cnt[g]=(cnt[g]||0)+1});
  const sorted=Object.entries(cnt).sort((a,b)=>b[1]-a[1]||cmp(a[0],b[0]));
  const top=sorted.slice(0,sorted.length>6?5:6).map(e=>e[0]);
  const cat=b=>top.includes(gName(b))?gName(b):'Diğer';
  const cats=[...top];if(sorted.length>top.length)cats.push('Diğer');
  const col=c=>c==='Diğer'?GOTHER:GCOL[top.indexOf(c)];
  const ofCat=c=>R.filter(b=>cat(b)===c);
  const byCat=(a,b)=>cats.indexOf(cat(a))-cats.indexOf(cat(b))||cmp(a.endDate,b.endDate);
  const sq=b=>`<button class="sq" style="background:${col(cat(b))}" data-act="open" data-id="${b.id}" title="${esc(b.title)} · ${esc(gName(b))}${b.rating?' · '+String(b.rating).replace('.',',')+'★':''}"></button>`;
  /* pie of genres */
  const cx=90,cy=90,r=82;let a0=-Math.PI/2,lbl='';
  const pie=cats.map(c=>{const v=ofCat(c).length,a1=a0+v/R.length*2*Math.PI,mid=(a0+a1)/2;
    const d=v===R.length?`M${cx} ${cy-r}A${r} ${r} 0 1 1 ${cx-.01} ${cy-r}Z`:`M${cx} ${cy}L${(cx+r*Math.cos(a0)).toFixed(2)} ${(cy+r*Math.sin(a0)).toFixed(2)}A${r} ${r} 0 ${a1-a0>Math.PI?1:0} 1 ${(cx+r*Math.cos(a1)).toFixed(2)} ${(cy+r*Math.sin(a1)).toFixed(2)}Z`;
    if(v/R.length>=.07)lbl+=`<text x="${(cx+r*.64*Math.cos(mid)).toFixed(1)}" y="${(cy+r*.64*Math.sin(mid)).toFixed(1)}" text-anchor="middle" dominant-baseline="central">${v}</text>`;
    a0=a1;return `<path d="${d}" fill="${col(c)}"><title>${esc(c)}: ${v} kitap</title></path>`}).join('');
  const legend=cats.map(c=>{const v=ofCat(c).length;return `<li><i style="background:${col(c)}"></i><span>${esc(c)}</span><b>${v}</b></li>`}).join('');
  const useCount=curArea()==='film';
  const avgOf=a=>{const x=a.filter(b=>+b.rating>0);return x.length?(x.reduce((s,b)=>s+ +b.rating,0)/x.length):null};
  const withPages=R.filter(b=>+b.pages>0),pages=withPages.reduce((s,b)=>s+ +b.pages,0);
  const phone=document.documentElement.dataset.view==='mobile';
  /* pages read per month */
  const mp=AYLAR.map((_,i)=>{const L=R.filter(b=>mOf(b.endDate)===i);return useCount?L.length:L.reduce((s,b)=>s+(+b.pages||0),0)}),mpMax=Math.max(...mp,1);
  const nice=Math.pow(10,Math.floor(Math.log10(mpMax))),top2=Math.ceil(mpMax/nice)*nice,grid=[top2/2,top2];
  const pageBars=`<div class="pchart" style="--h:150px">${grid.map(v=>`<span class="pgrid" style="bottom:calc(${v/top2} * var(--h))"><em>${nf(v)}</em></span>`).join('')}<div class="pbars">${mp.map((v,i)=>`<div class="pcol" title="${AYLAR[i]}: ${nf(v)} ${useCount?A().item:A().unit}"><span class="pval">${v&&(!phone||v===mpMax)?nf(v):''}</span><i style="height:calc(${v/top2} * var(--h))"></i><span class="plab">${AYLAR[i].slice(0,3)}</span></div>`).join('')}</div></div>`;
  /* unit columns: books by star rating */
  const rated=R.filter(b=>+b.rating>0),unrated=R.length-rated.length;
  const starCols=[1,2,3,4,5].map(s=>{const L=rated.filter(b=>Math.floor(+b.rating)===s).sort(byCat);
    return `<div class="ucol"><span class="ucount">${L.length||''}</span><div class="ustack">${chunk(L,phone?3:4).map(row=>`<div class="urow">${row.map(sq).join('')}</div>`).join('')}</div><span class="ulab">${s}★</span></div>`}).join('');
  const monCols=AYLAR.map((m,i)=>{const L=R.filter(b=>mOf(b.endDate)===i).sort(byCat);
    return `<div class="ucol"><span class="ucount">${L.length||''}</span><div class="ustack">${chunk(L,phone?1:2).map(row=>`<div class="urow">${row.map(sq).join('')}</div>`).join('')}</div><span class="ulab sm">${m.slice(0,3)}</span></div>`}).join('');
  /* tiles */
  const avg=avgOf(R);
  const au={};R.forEach(b=>{const k=(b.author||'').trim();if(k)au[k]=(au[k]||0)+1});
  const earlier=new Set(BOOKS().filter(b=>b.status==='read'&&yOf(b.endDate)<y).map(b=>(b.author||'').trim()));
  const newAu=Object.keys(au).filter(a=>!earlier.has(a)).length;
  const favs=Object.entries(au).filter(e=>e[1]>1).sort((a,b)=>b[1]-a[1]||cmp(a[0],b[0])).slice(0,6);
  const tile=(k,v,n='')=>`<div class="tile"><div class="k">${k}</div><div class="v">${v}</div>${n?`<div class="n">${n}</div>`:''}</div>`;
  return head+`<div class="st-hero"><div class="st-title">${filmAll()?'TÜM YILLAR':y}<br>İSTATİSTİKLERİ</div>
    <div class="sticky taped" style="--tape:${PALETTE.sage}"><div><b>${avg==null?'–':avg.toFixed(1).replace('.',',')}</b><span>ortalama puan</span></div><div><b>${R.length}</b><span>toplam kitap</span></div></div></div>
  <div class="tiles">${tile(useCount?'Toplam':'Okunan sayfa',useCount?R.length:pages?nf(pages):'–',!useCount&&withPages.length<R.length?`${R.length-withPages.length} kaydın bilgisi yok`:'')}${tile(A().who,Object.keys(au).length,`${newAu} tanesi yeni tanışma`)}${tile(A().howLabel.replace(/\?$/,''),`<span class="fmts">${Object.keys(A().formats).map(f=>`<span title="${A().formats[f]}">${ico(A().fmtIcon[f])}${R.filter(b=>b.format===f).length}</span>`).join('')}</span>`)}${tile('En verimli ay',(()=>{const m=AYLAR.map((_,i)=>R.filter(b=>mOf(b.endDate)===i).length);const mx=Math.max(...m);return mx?AYLAR[m.indexOf(mx)]+' · '+mx:'–'})())}</div>
  <div class="st-grid">
    <section class="panel taped" style="--tape:${PALETTE.rose}"><h3 class="st-h">Türler</h3><div class="pie-wrap"><svg class="pie" viewBox="0 0 180 180" role="img" aria-label="Türlere göre kitap dağılımı">${pie}${lbl}</svg><ul class="lg">${legend}</ul></div>
      <div class="by-month"><h3 class="st-h" style="margin-top:18px">${useCount?'Aylara göre izlenen':'Aylara göre '+A().unit}</h3>${pageBars}</div>${!useCount&&withPages.length<R.length?`<p class="note">${R.length-withPages.length} kaydın ${A().unit} bilgisi olmadığı için sayılmadı.</p>`:''}</section>
    <section class="panel taped by-month" style="--tape:${PALETTE.sky}"><h3 class="st-h">Aylara göre ${A().item}</h3><p class="note">Her kare bir kitap; rengi türünü gösterir. Kareye dokununca kitap açılır.</p>
      <div class="units months">${monCols}</div><ul class="lg lg-inline">${legend}</ul></section>
  </div>
  ${favs.length?`<section class="panel taped favs" style="--tape:${PALETTE.butter}"><h3 class="st-h">En çok ${A().who.toLocaleLowerCase('tr')}</h3><ol>${favs.map(([a,n])=>`<li><span>${esc(a)}</span><b>${n} kitap</b></li>`).join('')}</ol></section>`:''}`;
}

/* ---------- challenge & stamps ---------- */
/* bingo cards: 3×3, 4×4 or 5×5; odd sizes get a free centre square */
const freeIdx=n=>n%2?(n*n-1)/2:-1;
function shuffled(seed){const r=rng(seed),pool=[...poolOf()];for(let i=pool.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]]}return pool}
function genCard(n,seed,keep=[]){
  const used=new Set(keep.map(c=>c.p)),pool=shuffled(seed).filter(p=>!used.has(p)),fi=freeIdx(n),cells=[];let k=0;
  for(let i=0;i<n*n;i++){if(i===fi){cells.push({p:'SERBEST',b:null});continue}cells.push(k<keep.length?keep[k++]:{p:pool.pop()||'Serbest seçim',b:null})}
  return{size:n,cells};
}
const cardsOf=y=>(S.settings.bingoCards||[]).filter(c=>c.year===y);
function bingoCard(y){
  const cards=cardsOf(y),id=S.bingoSel?.[y]||S.settings.bingoActive?.[y];
  const c=cards.find(k=>k.id===id)||cards[cards.length-1];
  if(c){const n=c.size||Math.round(Math.sqrt(c.cells.length));if(n*n===c.cells.length)return{...c,size:n}}
  return{...genCard(5,y*7919),id:null,year:y,name:'Kart 1'};
}
/* which read books fit a square: genre, pages, format, title words, dates, series */
const COLORS_RE=/kırmızı|mavi|yeşil|sarı|beyaz|siyah|mor|pembe|turuncu|gri|kara|altın|gümüş|lacivert|kahverengi|\bred\b|blue|green|yellow|white|black|silver|gold/i;
const ANIMALS_RE=/kuş|kedi|köpek|kurt|tilki|köstebek|\bfil\b|yılan|serçe|kartal|aslan|balık|\bat\b|ayı|baykuş|karga|kelebek|tavşan|bird|\bcat\b|\bdog\b|wolf|fox|horse|snake|lion/i;
function bingoMatch(p,b,y){
  const t=String(p||'').toLocaleLowerCase('tr').trim(),g=genreOf(b),pg=+b.pages||0,yr=+b.year||0;
  if(curArea()!=='book')return mediaMatch(p,b,y);
  const gi=GKEY.get(t);if(gi!=null)return g===GENRES[gi];
  const rules=[
    [/kapaklı|kapağında|kapak tasarımı/,()=>false],
    [/klasik/,()=>g==='Klasik'||(yr&&yr<1950)],[/distopya/,()=>g==='Distopya'],[/polisiye/,()=>g==='Polisiye'],[/bilim kurgu/,()=>g==='Bilim kurgu'],
    [/fantastik/,()=>g==='Fantastik'],[/tarihi roman/,()=>g==='Tarihi roman'],[/anı|biyografi/,()=>g==='Anı'||g==='Biyografi'],[/deneme/,()=>g==='Deneme'],
    [/şiir/,()=>g==='Şiir'],[/öykü/,()=>g==='Öykü'],[/çizgi roman/,()=>g==='Çizgi roman'||g==='Resimli kitap'],[/kurgu dışı/,()=>GENRES.indexOf(g)>=13],
    [/gerilim/,()=>g==='Gerilim'||g==='Polisiye'],[/korku/,()=>g==='Korku'],[/psikoloji/,()=>g==='Psikoloji'],[/kişisel gelişim/,()=>g==='Kişisel gelişim'],
    [/felsefe/,()=>g==='Felsefe'],[/doğa|bilim/,()=>g==='Popüler bilim'],[/mitoloji|masal/,()=>/mitoloji|masal/i.test(b.genre||'')],
    [/500\+/,()=>pg>=500],[/200 sayfadan kısa/,()=>pg>0&&pg<200],[/300 sayfa/,()=>pg>=260&&pg<=340],
    [/sesli/,()=>b.format==='audio'],[/e-kitap/,()=>b.format==='ebook'],
    [/tek kelimelik/,()=>String(b.title||'').trim().split(/\s+/).length===1],[/renk/,()=>COLORS_RE.test(b.title||'')],[/hayvan/,()=>ANIMALS_RE.test(b.title||'')],
    [/bu yıl çıkan/,()=>yr===y],[/100 yıldan eski/,()=>yr&&yr<=y-100],
    [/serinin devamı/,()=>+b.seriesNo>1],[/serinin ilk/,()=>b.series&&+b.seriesNo<=1],
    [/türk yazar/,()=>/[çğıöşüÇĞİÖŞÜ]/.test(b.author||'')],[/yeni bir yazar/,()=>!BOOKS().some(x=>x.status==='read'&&x.author===b.author&&yOf(x.endDate)<y)],
    [/bir günde/,()=>b.startDate&&b.startDate===b.endDate],[/rafta en uzun|ertelediğin/,()=>b.owned&&b.fromTbr],
    [/aynı yazardan/,()=>readIn(y).filter(x=>x.author&&x.author===b.author).length>1],[/kitapçı|kitap hakkında/,()=>/kitap|kütüphane|bookshop|library/i.test(b.title||'')]
  ];
  for(const[re,fn]of rules)if(re.test(t))return!!fn();
  return false;
}
/* one suggested book per open square, never the same book twice on a card */
function bingoSuggest(card,y){
  const fi=freeIdx(card.size),used=new Set(card.cells.map(c=>c.b).filter(Boolean)),out={};
  const R=readIn(y);
  card.cells.forEach((c,i)=>{if(i===fi||c.b)return;const b=R.find(x=>!used.has(x.id)&&bingoMatch(c.p,x,y));if(b){out[i]=b;used.add(b.id)}});
  return out;
}
function bingoLines(card){
  const n=card.size,cells=card.cells,fi=freeIdx(n);
  const on=i=>i===fi||!!(cells[i].b&&BOOKS().some(x=>x.id===cells[i].b));const L=[],idx=[...Array(n).keys()];
  for(let r=0;r<n;r++)L.push(idx.map(c=>r*n+c));
  for(let c=0;c<n;c++)L.push(idx.map(r=>r*n+c));
  L.push(idx.map(i=>i*n+i),idx.map(i=>i*n+(n-1-i)));
  const done=L.filter(l=>l.every(on));
  return{done,cells:new Set(done.flat()),filled:cells.filter((_,i)=>on(i)).length,total:n*n};
}
/* stamp tiers: 1 easy (bronze) · 2 medium (silver) · 3 hard (gold) */
const TIER={first:1,short:1,five:1,fast:2,weekend:2,brick:2,classic:1,audio:2,ebook:2,triple:2,genres:2,author:2,critic:2,shelf:2,tbr:2,m10:1,m25:2,m50:3,goal:3,bingo:2,fullcard:3,marathon:3,mountain:3,streak:2};
const TIERS=['','Bronz','Gümüş','Altın'];
/* painted month icons, one for each season's mood */
const MONTH_ART=[
 ['#CFE0EE','<g stroke="#5E8BB8" stroke-width="2.4" stroke-linecap="round"><path d="M20 6v28M8 13l24 14M8 27l24-14"/><path d="M16 8l4 3 4-3M16 32l4-3 4 3M7 18l4-1-1-4M33 22l-4 1 1 4M7 22l4 1-1 4M33 18l-4-1 1-4"/></g>'],
 ['#EBD5DD','<path d="M20 33S7 25 7 16a6.5 6.5 0 0 1 13-2 6.5 6.5 0 0 1 13 2c0 9-13 17-13 17z" fill="#D98C9A"/><circle cx="12" cy="9" r="1.6" fill="#fff"/><circle cx="29" cy="7" r="1.3" fill="#fff"/><circle cx="33" cy="13" r="1.1" fill="#fff"/>'],
 ['#D9E8C9','<path d="M8 33h24" stroke="#8B5B35" stroke-width="3" stroke-linecap="round"/><path d="M20 32V17" stroke="#5F8A57" stroke-width="2.4"/><path d="M20 20c-8 0-11-5-11-10 6 0 11 3 11 10z" fill="#8DB97A"/><path d="M20 17c0-6 4-10 11-10 0 6-4 10-11 10z" fill="#5F8A57"/>'],
 ['#D2E4EC','<path d="M6 19a14 14 0 0 1 28 0z" fill="#E3A79C"/><path d="M6 19c2.3-2 4.7-2 7 0 2.3-2 4.7-2 7 0 2.3-2 4.7-2 7 0 2.3-2 4.7-2 7 0" fill="none" stroke="#C97C5D" stroke-width="1.4"/><path d="M20 19v11a3 3 0 0 1-6 0" fill="none" stroke="#7B695C" stroke-width="2" stroke-linecap="round"/><g fill="#7FAACB"><path d="M8 26l-1 3"/><circle cx="9" cy="27" r="1.3"/><circle cx="30" cy="29" r="1.3"/><circle cx="26" cy="34" r="1.1"/></g>'],
 ['#F3D6DA','<path d="M20 34V19" stroke="#5F8A57" stroke-width="2.4"/><path d="M20 28c-6-1-9-5-9-9 4 0 8 3 9 9z" fill="#8DB97A"/><path d="M13 8l3 5 4-6 4 6 3-5c1 7-2 12-7 12s-8-5-7-12z" fill="#E2728A"/>'],
 ['#F6E6A6','<circle cx="20" cy="20" r="7.5" fill="#F2B53A"/><g stroke="#F2B53A" stroke-width="2.4" stroke-linecap="round"><path d="M20 5v4M20 31v4M5 20h4M31 20h4M9.4 9.4l2.8 2.8M27.8 27.8l2.8 2.8M9.4 30.6l2.8-2.8M27.8 12.2l2.8-2.8"/></g>'],
 ['#F7D3C2','<path d="M5 15a15 15 0 0 0 30 0z" fill="#7FB069"/><path d="M8 15a12 12 0 0 0 24 0z" fill="#F4F1DE"/><path d="M10 15a10 10 0 0 0 20 0z" fill="#E5636B"/><g fill="#3D2F28"><ellipse cx="15" cy="19" rx=".9" ry="1.4"/><ellipse cx="20" cy="21" rx=".9" ry="1.4"/><ellipse cx="25" cy="19" rx=".9" ry="1.4"/></g>'],
 ['#F5DE95','<path d="M20 34V24" stroke="#5F8A57" stroke-width="2.4"/><g fill="#F2B53A">'+[0,45,90,135,180,225,270,315].map(a=>`<ellipse cx="20" cy="9" rx="3" ry="6" transform="rotate(${a} 20 16)"/>`).join('')+'</g><circle cx="20" cy="16" r="5" fill="#8B5B35"/>'],
 ['#F1DDB8','<path d="M20 12c-3-3-11-3-11 6 0 8 6 15 11 13 5 2 11-5 11-13 0-9-8-9-11-6z" fill="#D9534F"/><path d="M20 12c0-3 1-5 3-6" stroke="#6B4A2F" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M22 9c3-3 7-2 8 0-3 2-6 2-8 0z" fill="#7FB069"/><ellipse cx="14" cy="17" rx="2" ry="3" fill="#fff" opacity=".35"/>'],
 ['#F0CFA8','<path d="M20 4l3 7 5-3-1 7 7-1-4 6 5 3-8 2 1 6-8-4-8 4 1-6-8-2 5-3-4-6 7 1-1-7 5 3z" fill="#D9733A"/><path d="M20 35V14" stroke="#8B4A23" stroke-width="1.6"/>'],
 ['#E2D3C1','<rect x="16.5" y="20" width="7" height="12" rx="3" fill="#F1E3CC"/><path d="M6 21a14 11 0 0 1 28 0z" fill="#B5533C"/><g fill="#FFF8EC"><circle cx="13" cy="16" r="2"/><circle cx="21" cy="12" r="2.4"/><circle cx="27" cy="17" r="1.6"/></g><path d="M8 33h24" stroke="#7FA872" stroke-width="3" stroke-linecap="round"/>'],
 ['#D2E3D8','<path d="M20 6l9 12h-5l7 9h-6l5 7H10l5-7H9l7-9h-5z" fill="#4E7A58"/><rect x="18" y="33" width="4" height="4" fill="#8B5B35"/><path d="M20 2l1.2 2.6 2.8.3-2.1 1.9.6 2.8L20 8.2l-2.5 1.4.6-2.8L16 4.9l2.8-.3z" fill="#F2B53A"/><g fill="#E5636B"><circle cx="17" cy="17" r="1.3"/><circle cx="24" cy="24" r="1.3"/><circle cx="15" cy="29" r="1.3"/></g>']
];
/* goal plant: the stem grows with progress, leaves unfold on the way, a flower opens at 100% */
function goalPlant(p){
  p=Math.max(0,Math.min(1,p));const off=(100-100*p).toFixed(1);
  const leaves=[[.12,54,104,-35],[.26,67,92,35],[.4,53,79,-40],[.54,67,66,40],[.68,54,53,-35],[.82,66,42,35]].filter(l=>p>=l[0]);
  return `<svg class="plant ${p>=1?'bloom':''}" viewBox="0 0 120 160" aria-hidden="true">
    <path d="M36 128h48l-6 28H42z" fill="#C97C5D"/><rect x="32" y="122" width="56" height="9" rx="3" fill="#A9604A"/><ellipse cx="60" cy="124" rx="24" ry="3" fill="#6B4A2F"/>
    <path class="stem" d="M60 123C56 106 66 92 60 78S54 50 60 30" pathLength="100" style="--off:${off}" fill="none" stroke="#5F8A57" stroke-width="3.2" stroke-linecap="round"/>
    ${leaves.map((l,i)=>`<path class="leaf" style="--d:${.25+i*.18}s" d="M0 0c-4-6-2-13 6-15 2 8-1 13-6 15z" transform="translate(${l[1]} ${l[2]}) rotate(${l[3]})" fill="${i%2?'#8DB97A':'#6E9A5E'}"/>`).join('')}
    ${p>=.92&&p<1?'<ellipse class="leaf" style="--d:1.2s" cx="60" cy="27" rx="5" ry="7" fill="#E3A79C"/>':''}
    ${p>=1?`<g class="flower">${[0,60,120,180,240,300].map(a=>`<ellipse cx="60" cy="16" rx="6" ry="10" transform="rotate(${a} 60 26)" fill="#E3A79C"/>`).join('')}<circle cx="60" cy="26" r="6" fill="#F2B53A"/></g>`:''}
  </svg>`;
}
function computeStamps(y){
  if(curArea()!=='book')return mediaStamps(y);
  const R=readIn(y),pages=R.reduce((s,b)=>s+(+b.pages||0),0);
  const byM=Array.from({length:12},(_,m)=>R.filter(b=>mOf(b.endDate)===m));
  const mPages=byM.map(a=>a.reduce((s,b)=>s+(+b.pages||0),0));
  let run=0,best=0;byM.forEach(a=>{run=a.length?run+1:0;best=Math.max(best,run)});
  const fmt=f=>R.filter(b=>b.format===f).length;
  const genres=new Set(R.map(genreOf).filter(g=>g!=='Türsüz')).size;
  const au={};R.forEach(b=>{const k=(b.author||'').trim().toLocaleLowerCase('tr');if(k)au[k]=(au[k]||0)+1});
  const weekend=R.filter(b=>{if(!b.startDate)return false;const dw=new Date(b.startDate+'T12:00').getDay();if(![5,6,0].includes(dw))return false;const n=days(b.startDate,b.endDate);return n>=0&&n<=(7-dw)%7}).length;
  const bl=bingoLines(bingoCard(y));
  const goal=goalOf(y);
  const B=(id,nm,ds,g,val,target,tier=TIER[id]||1)=>({id,nm,ds,g,val:Math.min(val,target),target,ok:val>=target,tier});
  return{R,pages,byM,list:[
    B('first','İlk Sayfa','Yılın ilk kitabını bitir','seed',R.length,1),
    B('fast','Şimşek Okur','Bir kitabı 3 günde bitir','bolt',R.filter(b=>b.startDate&&days(b.startDate,b.endDate)<=3).length,1),
    B('weekend','Hafta Sonu Kaçamağı','Cuma–pazar arasında başla ve bitir','moon',weekend,1),
    B('brick','Tuğla','500+ sayfalık bir kitap bitir','brick',R.filter(b=>+b.pages>=500).length,1),
    B('short','Kısa ve Öz','150 sayfadan kısa bir kitap','thin',R.filter(b=>b.pages&&+b.pages<150).length,1),
    B('marathon','Ay Maratonu','Bir ayda 1.500 sayfa oku','calendar',Math.max(...mPages),1500),
    B('mountain','Sayfa Dağı','Yıl içinde 10.000 sayfa','mountain',pages,10000),
    B('streak','Seri Okur','Üst üste 3 ay kitap bitir','flame',best,3),
    B('audio','Kulak Misafiri','3 sesli kitap dinle','audio',fmt('audio'),3),
    B('ebook','Ekran Kurdu','3 e-kitap oku','ebook',fmt('ebook'),3),
    B('triple','Üç Yol','Basılı, e-kitap ve sesli: hepsinden bir tane','globe',['print','ebook','audio'].filter(f=>fmt(f)).length,3),
    B('classic','Zaman Yolcusu','1950’den önce yayımlanmış bir kitap','hourglass',R.filter(b=>b.year&&+b.year<1950).length,1),
    B('genres','Tür Kâşifi','5 farklı türde kitap','compass',genres,5),
    B('author','Yazar Sadakati','Aynı yazardan 3 kitap','person',Math.max(0,...Object.values(au)),3),
    B('five','Beş Yıldız','Bir kitaba tam puan ver','star',R.filter(b=>+b.rating===5).length,1),
    B('critic','Kalem Ustası','10 kitaba not yaz','pen',R.filter(b=>(b.review||'').trim().length>=15).length,10),
    B('shelf','Raf Temizliği','Kitaplığındaki 5 kitabı bitir','shelf',R.filter(b=>b.owned).length,5),
    B('tbr','Liste Avcısı','Okunacaklar listesinden 3 kitap bitir','check',R.filter(b=>b.fromTbr).length,3),
    B('m10','Kitap Kurdu','10 kitap bitir','stack',R.length,10),
    B('m25','Çeyrek Asır','25 kitap bitir','stack',R.length,25),
    B('m50','Elli Kitap','50 kitap bitir','stack',R.length,50),
    B('goal','Hedef Tamam','Yıllık hedefine ulaş','trophy',R.length,goal),
    B('bingo','Bingo!','Bingo kartında bir sıra tamamla','grid',bl.done.length,1),
    B('fullcard','Dolu Kart','Bingo kartının tamamını doldur','sparkle',bl.filled,bl.total,3)
  ]};
}
function vStamps(){
  const y=S.year,{R,pages,byM,list}=computeStamps(y),goal=goalOf(y);
  const now=new Date(),cur=now.getFullYear()===y;
  const start=new Date(y,0,1),end=new Date(y+1,0,1),frac=cur?(now-start)/(end-start):(y<now.getFullYear()?1:0);
  const exp=goal*frac,diff=Math.round((R.length-exp)*10)/10;
  let pace='';
  if(R.length>=goal)pace=`<span class="pace ok">Hedefe ulaştın! ${R.length-goal>0?`Hedefin ${R.length-goal} kitap üstündesin.`:''}</span>`;
  else if(cur)pace=diff>=0?`<span class="pace ok">Yolundasın: plana göre ${diff>=1?Math.floor(diff)+' kitap öndesin.':'tam zamanında.'}</span>`:`<span class="pace behind">Plana göre ${Math.ceil(-diff)} kitap gerideyesin.</span>`;
  else if(y<now.getFullYear())pace=`<span class="muted">${y} hedefinin ${Math.round(R.length/goal*100)}%’i tamamlandı.</span>`;
  const left=cur?Math.ceil((end-now)/864e5):0;
  const rated=R.filter(b=>+b.rating>0),avg=rated.length?(rated.reduce((s,b)=>s+ +b.rating,0)/rated.length).toFixed(1):'–';
  const gc={};R.forEach(b=>{const g=(b.genre||'').trim();if(g)gc[g]=(gc[g]||0)+1});const topG=Object.entries(gc).sort((a,b)=>b[1]-a[1])[0];
  const fc=f=>R.filter(b=>b.format===f).length;
  const earned=list.filter(s=>s.ok).length+byM.filter(a=>a.length).length;
  const seenKey=`rj-stamps-${S.viewing}-${y}`;let seen=[];try{seen=JSON.parse(localStorage.getItem(seenKey)||'[]')}catch{}
  const isNew=id=>S.viewing===S.me&&seen.length>0&&!seen.includes(id);
  const stamp=(s,i)=>`<div class="stamp t${s.tier} ${s.ok?'':'locked'} ${s.ok&&isNew(s.id)?'new':''}" style="--c:${PCOLS[(i*5)%PCOLS.length]}" title="${esc(s.ds)} · ${TIERS[s.tier]}"><div class="stamp-in"><span class="tier" aria-label="${TIERS[s.tier]}"></span>${ico(s.g,1.5)}<span class="nm">${esc(s.nm)}</span><span class="ds">${esc(s.ds)}</span><span class="pr">${s.ok?'Toplandı':`${nf(s.val)} / ${nf(s.target)}`}</span>${s.ok?'':`<span class="prog"><i style="width:${Math.round(s.val/s.target*100)}%"></i></span>`}</div>${s.ok?`<span class="pm">${y}</span>`:''}</div>`;
  const mstamp=(a,m)=>`<div class="stamp mstamp ${a.length?'':'locked'} ${a.length&&isNew('m'+m)?'new':''}" style="--c:${MONTH_ART[m][0]}"><div class="stamp-in"><svg class="mart" viewBox="0 0 40 40" aria-hidden="true">${MONTH_ART[m][1]}</svg><span class="mn">${AYLAR[m]}</span><span class="pr">${a.length?a.length+' kitap':'—'}</span></div>${a.length?`<span class="pm pm-m"><b>${y}</b>${curArea()==='book'?'okundu':curArea()==='film'?'izlendi':'bitti'}</span>`:''}</div>`;
  const earnedIds=[...list.filter(s=>s.ok).map(s=>s.id),...byM.map((a,m)=>a.length?'m'+m:null).filter(Boolean)];
  if(S.viewing===S.me)setTimeout(()=>{try{localStorage.setItem(seenKey,JSON.stringify(earnedIds))}catch{}},1500);
  return `<div class="head"><h2 class="hand">Hedef <small>${y}</small></h2><span class="muted">${earned} / ${list.length+12} pul toplandı</span></div>
  <div class="ch"><div class="panel taped goal-panel" style="--tape:${PALETTE.sage}">${goalArt(R.length/goal)}<div class="goal-txt">
    <div class="goal-num">${R.length} <small>/ ${goal} kitap</small></div>
    <div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="${goal}" aria-valuenow="${R.length}"><i style="width:${Math.min(100,R.length/goal*100)}%"></i></div>
    <div>${pace}${cur?` <span class="muted">· ${left} gün kaldı</span>`:''}</div>
    <div class="goal-edit"><label for="goal-in">Yıllık hedef</label><input type="number" id="goal-in" min="1" max="999" value="${goal}"><span>kitap</span></div>
    <p class="note" style="margin:6px 0 0">${curArea()==='film'?(R.length>=goal?'Kova taştı, afiyet olsun!':'Kova, hedefe yaklaştıkça dolar.'):curArea()==='game'?(R.length>=goal?'Maksimum seviye!':'Hedefe yaklaştıkça seviye atlarsın.'):(R.length>=goal?'Çiçeğin açtı!':'Fidan, hedefe yaklaştıkça büyüyor; hedefe ulaşınca çiçek açar.')}</p></div>
  </div><div class="panel stats taped" style="--tape:${PALETTE.rose}">
    <div class="stat"><div class="k">Okunan sayfa</div><div class="v">${nf(pages)}</div></div>
    <div class="stat"><div class="k">Ortalama puan</div><div class="v">${avg}${avg!=='–'?' <span class="stars" style="--r:'+avg+';font-size:.8rem">★★★★★</span>':''}</div></div>
    <div class="stat"><div class="k">Biçim</div><div class="fmts">${Object.keys(A().formats).map(f=>`<span title="${A().formats[f]}">${ico(A().fmtIcon[f])}${fc(f)}</span>`).join('')}</div></div>
    <div class="stat"><div class="k">En çok okunan tür</div><div class="v" style="font-size:1.1rem">${topG?esc(topG[0]):'–'}</div></div>
  </div></div>
  <section class="album taped" style="--tape:${PALETTE.butter}"><div class="sec-h"><h3>Ay Pulları</h3><span>Her ay en az bir kitap bitir</span></div>
  <div class="sgrid">${byM.map(mstamp).join('')}</div></section>
  <section class="album taped" style="--tape:${PALETTE.lilac}"><div class="sec-h"><h3>Başarı Pulları</h3><span>${list.filter(s=>s.ok).length} / ${list.length} · <i class="tdot t1"></i>Bronz <i class="tdot t2"></i>Gümüş <i class="tdot t3"></i>Altın</span></div>
  <div class="sgrid">${list.map(stamp).join('')}</div></section>`;
}

function vBingo(){
  const y=S.year,card=bingoCard(y),n=card.size,bl=bingoLines(card),fi=freeIdx(n),cards=cardsOf(y);
  const sug=S.canEdit?bingoSuggest(card,y):{},nSug=Object.keys(sug).length;
  const cells=card.cells.map((c,i)=>{
    if(i===fi)return `<div class="bcell free ${bl.cells.has(i)?'line':''}"><span>Serbest</span></div>`;
    const b=c.b&&BOOKS().find(x=>x.id===c.b),sb=!b&&sug[i];
    return `<div class="bcell ${b?'done':''} ${sb?'sug':''} ${bl.cells.has(i)?'line':''}" style="--c:${b?esc(b.color||autoColor(b.title)):sb?esc(sb.color||autoColor(sb.title)):'transparent'}">
      <button class="bmain" data-act="bingo-cell" data-i="${i}"><span class="bp">${esc(c.p)}</span>${b?`<span class="bk"><i></i>${esc(b.title)}</span>`:''}${sb?`<span class="bk bks"><i></i>${esc(sb.title)}?</span>`:''}</button>
      ${b?'<svg class="bchk" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>':''}
      ${sb?`<button class="bacc" data-act="bingo-accept" data-i="${i}" data-id="${sb.id}" title="${esc(sb.title)} kitabını bu kareye koy" aria-label="Öneriyi onayla">${ico('tick',3)}</button>`:''}</div>`}).join('');
  const sz=k=>`<button class="chip" data-act="bingo-size" data-n="${k}" aria-pressed="${n===k}">${k}×${k}</button>`;
  const tabs=(cards.length?cards:[card]).map(c=>`<button class="chip ${c.id===card.id?'on':''}" data-act="bingo-card" data-id="${esc(c.id||'')}" aria-pressed="${c.id===card.id}">${esc(c.name||'Kart')}</button>`).join('');
  return `<div class="head"><h2 class="hand">Kitap Bingo <small>${y}</small></h2><div class="chips">${sz(3)}${sz(4)}${sz(5)}</div></div>
  <div class="bcards"><div class="chips">${tabs}<button class="chip add" data-act="bingo-new">+ Yeni kart</button></div></div>
  ${nSug?`<div class="banner"><span><b>${nSug} kareye uygun kitap buldum.</b> Karedeki ✓ ile tek tek onaylayabilir ya da hepsini birden ekleyebilirsin.</span><button class="btn primary" data-act="bingo-accept-all">Hepsini onayla</button></div>`:''}
  <div class="bingo-wrap taped" style="--tape:${PALETTE.rose}">${decor(1)}${decor(2)}<div class="bingo-title">Kitap <span>bingo</span></div><p class="bname">${esc(card.name||'Kart 1')} · ${y}</p>
  <div class="bgrid" data-n="${n}" style="--n:${n}">${cells}</div>
  <div class="bstat"><span><b>${bl.filled} / ${bl.total}</b> kare · <b>${bl.done.length}</b> bingo</span><span>Bir kareye dokun: görevi listeden seç ya da kendin yaz, okuduğun kitabı eşleştir.</span></div>
  <div class="bactions"><button class="btn" data-act="bingo-shuffle">${ico('sparkle')}Boşları karıştır</button>${card.id&&cards.length>1?'<button class="btn ghost danger" data-act="bingo-del">Bu kartı sil</button>':''}</div>
  <p class="note" style="text-align:center;margin:8px 0 0">Kartların saklanır: “+ Yeni kart” eskisini silmeden yanına yenisini açar. Yıl seçiciyle eski yılların kartlarına bakabilirsin.</p></div>`;
}

/* ---------- editor sheet ---------- */
let F=null,busy='';
function openSheet(html){$('#sheet').classList.remove('show-fr');$('#sheet').innerHTML=html;$('#overlay').hidden=false;document.body.style.overflow='hidden'}
function closeSheet(){$('#overlay').hidden=true;document.body.style.overflow='';F=null;S.sheetRefresh=null;const n=S.onbNext;if(n){S.onbNext=null;setTimeout(n,300)}}
function openEditor(b,preset={}){
  const isDemo=b&&demo();
  F=b?{...b,...preset}:{id:newId(),title:'',author:'',pages:'',year:'',genre:'',publisher:'',about:'',color:'',status:'want',owned:curArea()!=='film',format:Object.keys(A().formats)[0],startDate:'',endDate:'',rating:0,review:'',addedAt:Date.now(),...preset};
  if(isDemo){F.id=newId();F._fromDemo=true}
  F._orig=b?b.status:null;F._new=!b||isDemo;
  renderEditor();
  if(!b)setTimeout(()=>$('#f-title')?.focus(),50);
}
function renderEditor(){
  const b=F,col=b.color||autoColor(b.title||'x');
  const seg=(k,v,l,ic)=>`<button type="button" data-act="ed-set" data-k="${k}" data-v="${v}" aria-pressed="${b[k]===v}">${ic?ico(ic):''}${l}</button>`;
  openSheet(`<div class="sheet-h"><h2>${b._new?'Yeni '+A().item:A().Item+' kaydı'}</h2><button class="x" data-act="close" aria-label="Kapat">×</button></div>
  <form class="sheet-b" id="ed-form">
    ${itemTabs(b)}
    <div class="ed-top">
      <div class="ed-cover"><div id="ed-prev">${coverHTML({...b,color:col})}</div>
        <div class="swatches" role="group" aria-label="Kapak rengi">${PCOLS.map(c=>`<button type="button" class="sw" style="--c:${c}" data-act="ed-color" data-c="${c}" aria-pressed="${col===c}" aria-label="Renk"></button>`).join('')}<input type="color" id="f-color" data-k="color" value="${esc(/^#[0-9a-f]{6}$/i.test(col)?col:'#c9a27a')}" title="Kendi rengini seç" aria-label="Kendi rengini seç" style="width:24px;height:22px;padding:0;border:0;background:none"></div>
        <label class="btn ghost" style="justify-content:center;font-size:.8rem;padding:6px 8px">${ico('camera')}Fotoğraf<input type="file" id="f-photo" accept="image/*" hidden></label>
        ${coverSrc(b)?'<button type="button" class="btn ghost" style="font-size:.78rem;padding:5px 8px;justify-content:center" data-act="ed-nophoto">Fotoğrafı kaldır</button>':''}
      </div>
      <div style="display:grid;gap:10px;min-width:0">
        <div class="field"><label for="f-title">${A().Item} adı</label><div class="title-row"><input type="text" id="f-title" data-k="title" value="${esc(b.title)}" placeholder="Yazmaya başla, sonuçlar kendiliğinden gelir" required autocomplete="off"></div></div>
        ${busy?`<div class="busy"><span class="spin"></span>${esc(busy)}</div>`:''}
                <div class="row"><div class="field"><label for="f-author">${A().who}</label><input type="text" id="f-author" data-k="author" value="${esc(b.author)}"></div>
          <div class="field"><label for="f-pages">${A().unitLong}</label><input type="number" id="f-pages" data-k="pages" min="1" value="${esc(b.pages)}"></div></div>
        <div class="row">
          <div class="field"><label for="f-year">${A().yearL}</label><input type="number" id="f-year" data-k="year" value="${esc(b.year)}"></div></div>
        <div class="row"><div class="field"><label for="f-series">Seri</label><input type="text" id="f-series" data-k="series" value="${esc(b.series)}" placeholder="ör. Farseer Üçlemesi"></div>
          <div class="field"><label for="f-sno">Serideki sırası</label><input type="number" id="f-sno" data-k="seriesNo" step="0.5" value="${esc(b.seriesNo)}"></div></div>
      </div>
    </div>
    <div class="field"><span class="lbl">Tür</span><div class="gchips" role="group" aria-label="Tür">${allGenres().map(g=>`<button type="button" class="gchip" data-act="ed-genre" data-v="${esc(g)}" aria-pressed="${b.genre?genreOf(b)===g:false}">${esc(g)}</button>`).join('')}</div>
      <input type="text" id="f-genre" data-k="genre" value="${esc(b.genre)}" placeholder="Listede yoksa yeni türü buraya yaz" aria-label="Tür"></div>
    ${b.about?`<div class="about">${esc(b.about)}</div>`:''}
    ${peerScores(b)}
    ${b.series&&!b._new?`<p class="note" style="margin:0">Seri: ${esc(b.series)}${b.seriesNo?' #'+esc(b.seriesNo):''}</p>`:''}
    <div class="field"><span class="lbl">Durum</span><div class="seg">${Object.entries(A().status).map(([k,l])=>seg('status',k,l)).join('')}</div></div>
    ${homeToggle(b)}
    ${A().noOwn?'':`<label class="toggle"><input type="checkbox" id="f-owned" ${b.owned?'checked':''}> ${A().ownLabel}</label>`}
    <div class="field"><span class="lbl">${A().howLabel}</span><div class="seg">${Object.entries(A().formats).map(([k,l])=>seg('format',k,l,A().fmtIcon[k])).join('')}</div></div>
    ${b.status!=='want'?`<div class="row"><div class="field"><label for="f-start">${A().start}</label><input type="date" id="f-start" data-k="startDate" value="${esc(b.startDate)}"></div>
      ${b.status==='read'?`<div class="field"><label for="f-end">${A().end}</label><input type="date" id="f-end" data-k="endDate" value="${esc(b.endDate)}"></div>`:''}</div>`:''}
    ${b.status==='read'&&A().scale===10?`<div class="field"><label for="f-rate10">Puanım: <output id="o-rate">${b.rating?String(b.rating).replace('.',','):'–'}</output> / 10</label><input type="range" id="f-rate10" data-k="rating" min="0" max="10" step="0.5" value="${+b.rating||0}"></div>`:''}
    ${b.status==='read'&&A().scale===5?`<div class="field"><span class="lbl">Puanım</span><div class="rate"><span class="rb">${stars(b.rating)}${[1,2,3,4,5].map(n=>`<button type="button" style="left:${(n-1)*20}%" data-act="ed-rate" data-v="${n}" aria-label="${n} yıldız"></button>`).join('')}</span><output>${b.rating?String(b.rating).replace('.',','):'—'}</output></div><span class="note">Aynı yıldıza tekrar dokunursan yarım yıldız olur.</span></div>`:''}
    ${b.status==='read'?`<div class="field"><label for="f-review">Kısa yorumum</label><textarea id="f-review" data-k="review" placeholder="${A().reviewPh}">${esc(b.review)}</textarea></div>`:''}
    <div id="ed-results"></div>
    ${friendPanel(b)}
    <div class="ed-foot"><div>${!b._new?`<button type="button" class="btn danger ghost" data-act="ed-del" id="del-btn">Sil</button>`:''}</div>
      <div style="display:flex;gap:8px"><button type="button" class="btn" data-act="close">Vazgeç</button><button type="submit" class="btn primary">Kaydet</button></div></div>
  </form>`);
}
function syncInputs(){document.querySelectorAll('#ed-form input[data-k],#ed-form textarea[data-k]').forEach(el=>{F[el.dataset.k]=el.value});const o=$('#f-owned');if(o)F.owned=o.checked}
function updatePrev(){const p=$('#ed-prev');if(p&&F)p.innerHTML=coverHTML({...F,color:F.color||autoColor(F.title||'x')})}

async function resizeImg(file,max,q){
  const url=URL.createObjectURL(file);
  try{const img=await new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=rej;i.src=url});
    const s=Math.min(1,max/Math.max(img.width,img.height)),c=document.createElement('canvas');c.width=Math.round(img.width*s);c.height=Math.round(img.height*s);
    c.getContext('2d').drawImage(img,0,0,c.width,c.height);
    return{blob:await new Promise(r=>c.toBlob(r,'image/jpeg',q)),data:c.toDataURL('image/jpeg',q)}}
  finally{URL.revokeObjectURL(url)}
}

/* book search: Google Books first (good Turkish coverage), Open Library as fallback */
async function searchBooks(q){
  const out=[];
  try{const r=await fetch('https://www.googleapis.com/books/v1/volumes?maxResults=8&printType=books'+(KEYS.googleBooks?'&key='+KEYS.googleBooks:'')+'&q='+encodeURIComponent(q));const j=await r.json();
    for(const it of j.items||[]){const v=it.volumeInfo||{};const img=v.imageLinks?.thumbnail||v.imageLinks?.smallThumbnail||'';
      out.push({title:v.title||'',author:(v.authors||[]).join(', '),pages:v.pageCount||'',year:+(v.publishedDate||'').slice(0,4)||'',cover:img?img.replace('http://','https://').replace('&edge=curl',''):'',about:(v.description||'').replace(/<[^>]+>/g,'').slice(0,260)})}}catch{}
  if(out.filter(x=>x.cover).length<2){try{const r=await fetch('https://openlibrary.org/search.json?limit=6&fields=title,author_name,number_of_pages_median,first_publish_year,cover_i&q='+encodeURIComponent(q));const j=await r.json();
    for(const d of j.docs||[])out.push({title:d.title||'',author:(d.author_name||[]).join(', '),pages:d.number_of_pages_median||'',year:d.first_publish_year||'',cover:d.cover_i?`https://covers.openlibrary.org/b/id/${d.cover_i}-M.jpg`:'',about:''})}catch{}}
  return out.filter(x=>x.title).sort((a,b)=>!!b.cover-!!a.cover);
}
const norm=t=>String(t||'').toLocaleLowerCase('tr').replace(/[^a-z0-9çğıöşüâî]+/g,' ').trim();
const sameTitle=(a,b)=>{a=norm(a);b=norm(b);return!!a&&!!b&&(a===b||a.startsWith(b)||b.startsWith(a))};
async function fetchInfo(){
  const t=($('#f-title')?.value||'').trim();if(t.length<3)return;const my=++searchSeq;
  paintResults(null,true);
  const res=await searchMedia(t);
  if(!F||my!==searchSeq)return;F._results=res;paintResults(res,false);
}
function applyResult(r,overwrite){
  const set=(k,v)=>{if(v!==''&&v!=null&&(overwrite||!F[k]))F[k]=v};
  set('author',r.author);set('pages',r.pages);set('year',r.year);set('about',r.about);
  if(r.cover&&(overwrite||!F.coverUrl))F.coverUrl=r.cover;
  set('genre',r.genre);set('imdb',r.imdb);set('imdbId',r.imdbId);if(r.format&&A().formats[r.format])F.format=r.format;if(r.title&&overwrite)F.title=r.title;
}
async function saveEditor(){
  syncInputs();const b=F,toHome=$('#f-shared')?.checked&&!$('#f-shared').disabled;b.title=(b.title||'').trim();
  if(!b.title){toast(A().Item+' adı gerekli.');$('#f-title')?.focus();return}
  const t=todayISO();
  if(b.status==='read'&&!b.endDate)b.endDate=t;
  if(b.status==='reading'&&!b.startDate)b.startDate=t;
  if(b.endDate&&b.startDate>b.endDate)b.startDate=b.endDate;
  if(b._orig==='want'&&b.status!=='want')b.fromTbr=true;
  b.pages=b.pages?+b.pages:'';b.year=b.year?+b.year:'';b.seriesNo=b.seriesNo?+b.seriesNo:'';b.series=(b.series||'').trim();b.rating=+b.rating||0;
  if(!b.color)b.color=autoColor(b.title);
  if(b._photoBlob){b.coverData=b._small;delete b.coverUrl}
  const wasNew=b._new;closeSheet();await Store.saveBook(b);if(toHome)Home.add([b]);toast(wasNew?`“${b.title}” eklendi.`:'Kaydedildi.');
}

/* ---------- bulk fill: real covers and page counts from the book search ---------- */
const needsInfo=()=>S.books.filter(b=>!b.infoTried&&(!b.pages||(!b.coverUrl&&!b.coverData)));
function fillBanner(){
  if(!S.canEdit||curArea()==='film')return '';
  if(S.filling)return `<div class="banner"><span class="busy"><span class="spin"></span>Kapaklar ve bilgiler aranıyor: ${S.filling.done} / ${S.filling.total} ${A().item}</span></div>`;
  const n=needsInfo().length;if(!n)return '';
  return `<div class="banner"><span><b>${n} kaydın</b> kapağı ya da bilgisi eksik. İnternetten bulup ekleyebilirim; yanlış eşleşen olursa kaydı açıp düzeltebilirsin.</span><button class="btn primary" data-act="fill-missing">${ico('sparkle')}Kapakları ve bilgileri getir</button></div>`;
}
async function fillMissing(){
  const M=needsInfo();if(!M.length||S.filling||!S.canEdit)return;
  S.filling={done:0,total:M.length};render();let found=0;
  for(const c of M){
    const b=S.books.find(x=>x.id===c.id);if(!b)continue;
    const res=(await searchMedia(b.title+' '+(curArea()==='book'?(b.author||''):''))).filter(r=>sameTitle(r.title,b.title));
    const u={...b,infoTried:true};
    const r=res.find(x=>x.cover)||res[0];
    if(r){if(!u.pages)u.pages=+(res.find(x=>x.pages)||{}).pages||'';if(!u.coverUrl&&!u.coverData&&r.cover)u.coverUrl=r.cover;if(!u.year&&r.year)u.year=+r.year;if(!u.about&&r.about)u.about=r.about;found++}
    const i=S.books.findIndex(x=>x.id===b.id);if(i>=0)S.books[i]=u;
    S.filling.done++;if(S.filling.done%5===0)render();
    await new Promise(z=>setTimeout(z,250));
  }
  S.filling=null;Store.schedule(`${found} kaydın kapağı/bilgisi eklendi`);render();
  toast(`${found} ${A().item} için bilgi bulundu. Yanlış kapak varsa kaydı açıp “Fotoğrafı kaldır” ile silebilirsin.`);
}

/* ---------- whose library · setup ---------- */
const initial=n=>(n||'?').trim().charAt(0).toLocaleUpperCase('tr');
function peopleCards(act){
  return S.people.map(p=>`<button class="pcard ${p.id===S.me?'me':''}" style="--c:${esc(p.color||autoColor(p.name))}" data-act="${act}" data-id="${esc(p.id)}"><span class="av">${personAv(p)}</span><b>${esc(p.name)}</b><small>${S.mode==='pick'?'bu benim':p.id===S.viewing?'şu an açık':'evine git'}</small></button>`).join('');
}
function vPick(){
  return `<div class="picker"><h2>Sen kimsin?</h2><p>${S.people.length?'Kendini seç. Bu tarayıcı seni hatırlar, bir daha sormaz.':'Henüz kimse yok. İlk kişiyi ekleyerek başla.'}</p>
  <div class="people">${peopleCards('pick-me')}<button class="pcard add" data-act="person-new"><span class="av" style="--c:var(--line)">+</span><b>Yeni kişi</b><small>${GH.token()?'ev oluştur':'önce kurulum gerekir'}</small></button></div></div>`;
}
function openPeople(){
  openSheet(`<div class="sheet-h"><h2>Kimin evi?</h2><button class="x" data-act="close" aria-label="Kapat">×</button></div>
  <div class="sheet-b"><div class="people">${peopleCards('person')}</div>
  ${homePanel()}
  <p class="note">Bu cihazda sen: <b>${esc(S.me?personName(S.me):'seçilmedi')}</b>. Yalnızca kendi evini düzenleyebilirsin. <button class="linkbtn" data-act="me-change">Değiştir</button> · <button class="linkbtn" data-act="avatar-change">Profil resmi</button> · <button class="linkbtn" data-act="tour">Tanıtımı izle</button></p>
  ${GH.token()?`<form class="newp" id="newp-form"><input type="text" id="newp-in" placeholder="Yeni kişinin adı" maxlength="30"><button class="btn" type="submit">Kişi ekle</button></form>`:''}
  <div class="ed-foot"><button class="btn ghost" data-act="setup">Kurulum</button></div></div>`);
}
function openSetup(){
  const t=GH.token();
  const link=t?location.origin+location.pathname+'#kurulum='+encodeURIComponent(t)+'&ara='+encodeURIComponent(btoa(JSON.stringify(KEYS))):'';
  openSheet(`<div class="sheet-h"><h2>Kurulum</h2><button class="x" data-act="close" aria-label="Kapat">×</button></div>
  <div class="sheet-b">
  ${t?`<p>${S.keyProblem?'<b>Bu cihazdaki anahtar çalışmıyor.</b> Aşağıdan silip yenisini girebilirsin.':'<b>Bu cihaz kayda hazır.</b> Eklediklerin GitHub’a otomatik kaydedilir.'}</p>${S.keyProblem?`<form class="newp" id="token-form"><input type="password" id="token-in" placeholder="yeni github_pat_…" autocomplete="off"><button class="btn primary" type="submit">Yeni anahtarı kaydet</button></form>`:''}
    <div class="field"><span class="lbl">Arkadaşların için kurulum bağlantısı</span>
    <p class="note" style="margin:0">Bu bağlantıyı yalnızca siteyi kullanacak kişilere gönder; bağlantıyı bilen herkes raflara yazabilir. Arkadaşın her cihazda bir kez açması yeterli.</p>
    <div class="setup-code" id="setup-link">${esc(link)}</div>
    <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn primary" data-act="setup-copy">Bağlantıyı kopyala</button><button class="btn danger ghost" data-act="setup-clear">Anahtarı bu cihazdan sil</button></div></div>${keysForm()}`
  :`<p>Kayıt ekleyebilmek için bu cihaza bir kez kayıt anahtarı girmen gerekiyor. Arkadaşın sana kurulum bağlantısı gönderdiyse onu açman yeterli.</p>
    <ol class="steps"><li>GitHub → Settings → Developer settings → Personal access tokens → <b>Fine-grained tokens</b> → Generate new token</li>
    <li>Repository access: <b>Only select repositories</b> → ${REPO.repo}</li><li>Permissions → Contents: <b>Read and write</b></li><li>Oluşan <b>github_pat_…</b> anahtarını aşağıya yapıştır.</li></ol>
    <form class="newp" id="token-form"><input type="password" id="token-in" placeholder="github_pat_…" autocomplete="off"><button class="btn primary" type="submit">Kaydet</button></form>`}
  </div>`);
}
async function pickMe(id){S.me=id;ls.set(K.me,id);await Store.open(id)}

/* ---------- read-only book card for visitors ---------- */
const READONLY_BLOCKED=new Set(['add','tbr-done','tbr-start','tbr-own','u-seen','u-want','bingo-cell','bingo-shuffle','bingo-reset','bingo-size','bingo-new','bingo-del','bingo-accept','bingo-accept-all','fill-missing']);
function openDetail(b){
  const meta=[b.author,b.pages?b.pages+' '+A().unit:'',b.imdb?'IMDb '+b.imdb:'',b.year,b.genre,b.series?`${b.series}${b.seriesNo?' #'+b.seriesNo:''}`:''].filter(Boolean).map(x=>`<span>${esc(x)}</span>`).join('');
  openSheet(`<div class="sheet-h"><h2>${esc(A().status[b.status]||A().Item)}</h2><button class="x" data-act="close" aria-label="Kapat">×</button></div>
  <div class="sheet-b">${itemTabs(b)}<div class="ed-top"><div>${coverHTML(b)}</div><div style="min-width:0;display:grid;gap:6px;align-content:start">
    <h3 style="font-family:var(--f-display);font-weight:400;font-size:1.35rem;line-height:1.2">${esc(b.title)}</h3><div class="rmeta">${meta}</div>
    ${b.status==='read'?`<div class="rmeta">${stars(b.rating)}<span>${b.startDate?fmtDate(b.startDate)+' → ':''}${fmtDate(b.endDate)}</span></div>`:b.startDate?`<div class="rmeta"><span>Başladı: ${fmtDate(b.startDate)}</span></div>`:''}
    ${b.format?`<div class="rmeta">${fmtIco(b.format)}<span>${A().formats[b.format]||''}</span></div>`:''}</div></div>
    ${peerScores(b)}
    ${b.about?`<div class="about">${esc(b.about)}</div>`:''}
    ${b.review?`<p class="rtext">${esc(b.review)}</p>`:''}
    ${friendPanel(b)}
  </div>`);
}

/* ---------- bingo cell sheet ---------- */
let BC=null;
function openBingo(i){
  const card=structuredClone(bingoCard(S.year));BC={i,card,pick:card.cells[i].b,p:card.cells[i].p};
  renderBingoSheet();
}
function renderBingoSheet(){
  const R=readIn(S.year).slice().reverse().sort((a,b)=>bingoMatch(BC.p,b,S.year)-bingoMatch(BC.p,a,S.year)),used=new Set(BC.card.cells.map((c,j)=>j===BC.i?null:c.p));
  const opts=[BC.p,...poolOf().filter(p=>p!==BC.p&&!used.has(p))];
  openSheet(`<div class="sheet-h"><h2>Bingo karesi</h2><button class="x" data-act="close" aria-label="Kapat">×</button></div>
  <div class="sheet-b">
    <div class="field"><span class="lbl">Görev (birini seç)</span><div class="gchips bopts">${opts.map(p=>`<button type="button" class="gchip" data-act="bingo-opt" data-v="${esc(p)}" aria-pressed="${p===BC.p}">${esc(p)}</button>`).join('')}</div>
      <input type="text" id="bp" value="${esc(BC.p)}" maxlength="40" placeholder="ya da kendi görevini yaz" aria-label="Kendi görevin"></div>
    <div class="field"><span class="lbl">${S.year} yılında ${A().doneVerb} bir ${A().withItem} eşleştir</span>
      ${R.length?`<div class="pick">${R.map(b=>`<button type="button" data-act="bingo-pick" data-id="${b.id}" aria-pressed="${BC.pick===b.id}">${bingoMatch(BC.p,b,S.year)?'<span class="fit">uygun</span> ':''}${esc(b.title)} <span class="muted">· ${esc(b.author||'')}</span></button>`).join('')}</div>`:`<p class="muted">Bu yıl henüz bitirilmiş ${A().item} yok.</p>`}</div>
    <div class="ed-foot"><button type="button" class="btn ghost" data-act="bingo-pick" data-id="">Eşleşmeyi kaldır</button><div style="display:flex;gap:8px"><button class="btn" data-act="close">Vazgeç</button><button class="btn primary" data-act="bingo-save">Kaydet</button></div></div>
  </div>`);
}
function saveBingo(card){
  const st=S.settings,list=[...(st.bingoCards||[])],year=card.year??S.year;
  let id=card.id;if(!id){id='b'+Date.now().toString(36);card={...card,name:card.name&&card.name!=='Kart 1'||list.some(c=>c.year===year)?`Kart ${list.filter(c=>c.year===year).length+1}`:'Kart 1'}}
  const rec={id,year,name:card.name||'Kart',size:card.size,cells:card.cells};
  const i=list.findIndex(c=>c.id===id);if(i>=0)list[i]=rec;else list.push(rec);
  S.settings={...st,bingoCards:list,bingoActive:{...(st.bingoActive||{}),[year]:id}};S.bingoSel={...(S.bingoSel||{}),[year]:id};Store.saveSettings();render();
}

/* ---------- events ---------- */
/* a short tick animation before the row moves to its next list */
function tick(a,fn){const b=BOOKS().find(x=>x.id===a.dataset.id);if(!b)return;a.closest('.trow')?.classList.add('ticked');setTimeout(()=>fn(b),320)}
const ACT={
  view:a=>{const v=a.dataset.v;try{localStorage.setItem(VIEW_KEY,v)}catch{}applyView();render();toast(v==='mobile'?'Telefon görünümü':'Masaüstü görünümü')},
  tab:a=>{S.tab=a.dataset.tab;try{history.replaceState(null,'','#'+S.tab)}catch{}render();scrollTo({top:0})},
  year:a=>{S.year+=+a.dataset.d;render()},
  add:()=>GH.token()?openEditor(null,S.tab==='tbr'?{owned:false}:curArea()==='film'?{status:'read',format:S.fmt}:{}):openSetup(),
  open:a=>{const b=BOOKS().find(x=>x.id===a.dataset.id);if(b)(S.canEdit?openEditor:openDetail)(b)},
  close:closeSheet,
  'shelf-f':a=>{S.shelfFilter=a.dataset.f;render()},
  'cover-m':a=>{S.coverMode=a.dataset.m;render()},
  'note-f':a=>{S.noteFilter=a.dataset.f;render()},
  'ed-set':a=>{syncInputs();F[a.dataset.k]=a.dataset.v;renderEditor()},
  'ed-color':a=>{syncInputs();F.color=a.dataset.c;renderEditor()},
  'ed-rate':a=>{syncInputs();const n=+a.dataset.v,r=+F.rating||0;F.rating=r===n?n-.5:r===n-.5?0:n;renderEditor()},
  'ed-fetch':fetchInfo,
  'fill-missing':fillMissing,
  'ed-pick':a=>{syncInputs();const r=F._results?.[+a.dataset.i];if(r){applyResult(r,true);delete F._preview;delete F._photoBlob;delete F._small;delete F.coverData;F._results=null;renderEditor();toast('Bilgiler dolduruldu; kontrol edip kaydet.')}},
  people:()=>openPeople(),
  'retry-save':()=>{toast('Yeniden deneniyor…');Store.flush()},
  person:a=>{closeSheet();Store.open(a.dataset.id)},
  'pick-me':a=>pickMe(a.dataset.id),
  'me-change':()=>{closeSheet();S.mode='pick';render()},
  'person-new':()=>{if(!GH.token())return openSetup();openPeople();setTimeout(()=>$('#newp-in')?.focus(),50)},
  setup:()=>openSetup(),
  'setup-copy':()=>{const t=$('#setup-link')?.textContent||'';Promise.resolve(navigator.clipboard?.writeText(t)).then(()=>toast('Bağlantı kopyalandı.'),()=>{getSelection().selectAllChildren($('#setup-link'));toast('Bağlantıyı seçtim; kopyala ile al.')})},
  'setup-clear':a=>{if(a.dataset.sure){ls.set(K.token,null);S.canEdit=false;closeSheet();render();toast('Anahtar bu cihazdan silindi.')}else{a.dataset.sure='1';a.textContent='Emin misin? Evet, sil'}},
  'ed-nophoto':()=>{syncInputs();delete F._preview;delete F._photoBlob;delete F._small;delete F.coverData;delete F.coverUrl;renderEditor()},
  'ed-del':a=>{if(a.dataset.sure){const id=F.id,t=F.title;closeSheet();Store.deleteBook(id);toast(`“${t}” silindi.`)}else{a.dataset.sure='1';a.textContent='Emin misin? Evet, sil'}},
  'tbr-done':a=>tick(a,b=>openEditor(b,{status:'read',endDate:todayISO()})),
  'tbr-start':a=>tick(a,b=>{Store.saveBook({...b,status:'reading',startDate:todayISO(),fromTbr:true});toast(`“${b.title}” ${A().startMsg}`,()=>Store.saveBook(b))}),
  'tbr-own':a=>tick(a,b=>{Store.saveBook({...b,owned:true});toast(`“${b.title}” ${A().ownMsg}.`,()=>Store.saveBook(b))}),
  'bingo-cell':a=>openBingo(+a.dataset.i),
  'bingo-opt':a=>{BC.p=a.dataset.v;const i=$('#bp');if(i)i.value=BC.p;document.querySelectorAll('.bopts .gchip').forEach(x=>x.setAttribute('aria-pressed',x===a))},
  'bingo-size':a=>{const n=+a.dataset.n,cur=bingoCard(S.year);if(n===cur.size)return;const fi=freeIdx(cur.size);
    const keep=cur.cells.filter((c,i)=>i!==fi).sort((x,y)=>!!y.b-!!x.b).slice(0,n*n-(n%2));
    const prev=structuredClone(cur);saveBingo({...cur,...genCard(n,Date.now(),keep)});toast(`Kart ${n}×${n} oldu.`,()=>saveBingo(prev))},
  undo:()=>{const f=undoFn;undoFn=null;toast('');if(f){f();toast('Geri alındı.')}},
  theme:()=>{const next=isDark()?'light':'dark';try{localStorage.setItem(THEME_KEY,next)}catch{}applyTheme();applyView()},
  'ed-genre':a=>{syncInputs();F.genre=F.genre&&genreOf(F)===a.dataset.v?'':a.dataset.v;renderEditor()},
  'bingo-pick':a=>{BC.pick=a.dataset.id||null;const p=$('#bp')?.value;if(p!=null)BC.p=p;renderBingoSheet()},
  'bingo-save':()=>{const c=BC.card.cells[BC.i];c.p=($('#bp')?.value||BC.p).trim()||BC.p;c.b=BC.pick||null;saveBingo(BC.card);closeSheet()},
  'bingo-card':a=>{S.bingoSel={...(S.bingoSel||{}),[S.year]:a.dataset.id};render()},
  'bingo-new':()=>{const cur=bingoCard(S.year);saveBingo({...genCard(cur.size||5,Date.now()),id:null,year:S.year,name:''});toast('Yeni kart açıldı; önceki kartın saklı.')},
  'bingo-del':a=>{if(!a.dataset.sure){a.dataset.sure='1';a.textContent='Emin misin? Evet, sil';return}
    const cur=bingoCard(S.year);if(!cur.id)return;const prevAll=structuredClone(S.settings.bingoCards||[]);
    S.settings={...S.settings,bingoCards:prevAll.filter(c=>c.id!==cur.id)};S.bingoSel={...(S.bingoSel||{}),[S.year]:null};Store.saveSettings();render();
    toast(`${cur.name} silindi.`,()=>{S.settings={...S.settings,bingoCards:prevAll};Store.saveSettings();render()})},
  'bingo-accept':a=>{const card=structuredClone(bingoCard(S.year)),i=+a.dataset.i,prev=structuredClone(card);card.cells[i].b=a.dataset.id;saveBingo(card);toast('Kareye eklendi.',()=>saveBingo(prev))},
  'bingo-accept-all':()=>{const card=structuredClone(bingoCard(S.year)),prev=structuredClone(card),sug=bingoSuggest(card,S.year);for(const[i,b]of Object.entries(sug))card.cells[i].b=b.id;saveBingo(card);toast(`${Object.keys(sug).length} kare dolduruldu.`,()=>saveBingo(prev))},
  'bingo-shuffle':()=>{const card=structuredClone(bingoCard(S.year)),prev=structuredClone(card),fi=freeIdx(card.size),used=new Set(card.cells.map(c=>c.p));const pool=poolOf().filter(p=>!used.has(p)).sort(()=>Math.random()-.5);
    card.cells.forEach((c,i)=>{if(i!==fi&&!c.b&&pool.length){c.p=pool.pop()}});saveBingo(card);toast('Boş kareler yenilendi.',()=>saveBingo(prev))},
  'bingo-reset':()=>ACT['bingo-new'](),
};
document.addEventListener('click',e=>{
  if(e.target.id==='overlay')return closeSheet();
  const a=e.target.closest('[data-act]');if(!a)return;
  if(!S.canEdit&&READONLY_BLOCKED.has(a.dataset.act))return;
  const f=ACT[a.dataset.act];if(f){e.preventDefault();f(a,e)}
});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('#overlay').hidden)closeSheet()});
document.addEventListener('input',e=>{
  if(!F)return;const k=e.target.dataset?.k;if(k){F[k]=e.target.value;if(k==='title'||k==='author'||k==='color')updatePrev()}
});
document.addEventListener('change',async e=>{
  if(e.target.id==='goal-in'){const v=Math.max(1,Math.min(999,+e.target.value||24));S.settings.goals={...S.settings.goals,[S.year]:v};Store.saveSettings();render();return}
  if(e.target.id==='f-owned'&&F){F.owned=e.target.checked;return}
  if(e.target.id==='f-photo'&&F){const file=e.target.files?.[0];if(!file)return;syncInputs();
    try{const big=await resizeImg(file,700,.84),small=await resizeImg(file,360,.72);F._photoBlob=big.blob;F._preview=big.data;F._small=small.data;renderEditor();}
    catch{toast('Bu fotoğraf açılamadı; başka bir dosya dene.')}}
});
document.addEventListener('submit',async e=>{
  e.preventDefault();
  if(e.target.id==='ed-form')return saveEditor();
  if(e.target.id==='newp-form'){const n=$('#newp-in').value.trim();if(!n)return;const p=await Store.addPerson(n);if(p){toast(p.name+' eklendi.');closeSheet();if(!S.me)return pickMe(p.id);openPeople()}return}
  if(e.target.id==='token-form'){const t=$('#token-in').value.trim();if(!t)return;toast('Anahtar deneniyor…');
    if(await GH.check(t)){ls.set(K.token,t);S.keyProblem=null;S.save='';if(Store.msgs.length)Store.flush();S.canEdit=!!S.me&&S.viewing===S.me;closeSheet();render();toast('Anahtar çalışıyor. Artık kayıtların otomatik kaydedilecek.');openSetup()}
    else toast('Bu anahtar repoya yazamıyor. Contents: Read and write izni ve doğru repo seçili mi?');return}
  if(e.target.id==='tbr-form'){
    const inp=$('#tbr-in'),raw=inp.value.trim();if(!raw)return;
    const [title,author]=raw.split(/\s+[-–—]\s+/);
    const b={id:newId(),title:title.trim(),author:(author||'').trim(),status:'want',owned:false,format:Object.keys(A().formats)[0],color:autoColor(title),addedAt:Date.now(),rating:0};
    inp.value='';await Store.saveBook(b);toast(`“${b.title}” listeye eklendi.`);
    try{const res=(await searchMedia(b.title+' '+b.author)).filter(r=>sameTitle(r.title,b.title));const cur=S.books.find(x=>x.id===b.id);
      if(cur&&res.length){const r=res.find(x=>x.cover)||res[0];await Store.saveBook({...cur,author:cur.author||r.author,pages:cur.pages||+(res.find(x=>x.pages)||{}).pages||'',year:cur.year||r.year,coverUrl:r.cover||cur.coverUrl,about:cur.about||r.about})}}catch{}
  }
});

