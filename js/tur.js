/* ---------- pixel profile pictures, first-run flow, the pet's guided tour ---------- */
/* each face is the left half of a 14x14 grid and gets mirrored; a main, b dark, c light, k black, w white, p pink, o orange */
const AVATARS={
  kedi:{n:'Kedi',bg:'#F6C9D0',pal:{a:'#E9A66B',b:'#C57F45',c:'#FBE9D4'},px:['.a.....','.aa....','.apa...','.aaaaaa','aaaaaaa','aaaaaaa','aawkaaa','aakkaaa','aaaaaap','aacccck','.accccc','..aaaaa','...aaaa','.......']},
  kopek:{n:'Köpek',bg:'#FBE3A6',pal:{a:'#E9CFA6',b:'#A9794F',c:'#FFF6EA'},px:['.......','..aaaaa','bbaaaaa','bbaaaaa','bbaaaaa','bbawkaa','bbakkaa','bbaaaaa','.baaccc','.baccck','..acccc','..acccp','...aaap','.......']},
  tavsan:{n:'Tavşan',bg:'#D5CCEB',pal:{a:'#F6F0E8',b:'#D9CDBF',c:'#FFFFFF'},px:['..aa...','..ap...','..ap...','..ap...','..aa...','..aaaaa','.aaaaaa','.awkaaa','.akkaaa','.aaaaap','.apaccc','..acccc','...aaaa','.......']},
  tilki:{n:'Tilki',bg:'#BFE0D8',pal:{a:'#E58A4E',b:'#4F3A35',c:'#FFF6EA'},px:['b......','aa.....','aaa....','aaaa.aa','aaaaaaa','aaaaaaa','aawkaaa','cakkaaa','ccaaaac','.cccccc','.cccccc','..ccccc','....cck','.......']},
  baykus:{n:'Baykuş',bg:'#BFD3EE',pal:{a:'#A9805E',b:'#7E5B41',c:'#F1E3CC'},px:['.a.....','.aa....','.aaaaaa','aaaaaaa','awwwaaa','awkwaaa','awwwaaa','aaaaaao','aacccao','aaccccc','aaccccc','.aaaaaa','..o...o','.......']},
  ayi:{n:'Ayı',bg:'#EBB88C',pal:{a:'#9C6F4E',b:'#7A5238',c:'#D9B48F'},px:['.bb....','baab...','bbaaaaa','.aaaaaa','aaaaaaa','aaaaaaa','aawkaaa','aakkaaa','aaaaccc','aaaccck','aaaaccc','.aaaaaa','..aaaaa','.......']},
  kurbaga:{n:'Kurbağa',bg:'#D9EBC7',pal:{a:'#8DBF74',b:'#6B9C57',c:'#DDEFC2'},px:['.......','.aaa...','awwwa..','awkka..','awkkaaa','aaaaaaa','aaaaaaa','aaaaaaa','kaaaaaa','akkkkkk','aaaaaaa','.cccccc','..ccccc','.......']},
  penguen:{n:'Penguen',bg:'#FFF1D6',pal:{a:'#4A5068',b:'#343A4E',c:'#FFFFFF'},px:['...aaaa','..aaaaa','.aaaaaa','.accaac','.ackcac','.acccaa','.acccco','.accoo','.acccoo','..acccc','..acccc','...accc','....ooo','.......'].map(r=>r.padEnd(7,'c'))}
};
function avatarSVG(id){
  const v=AVATARS[id];if(!v)return'';const col=c=>({k:'#2E2A33',w:'#FFFFFF',p:'#EFA3AE',o:'#EDA24B'}[c]||v.pal[c]);let r='';
  v.px.forEach((row,y)=>{const full=row+[...row].reverse().join('');[...full].forEach((c,x)=>{if(c!=='.')r+=`<rect x="${x+1}" y="${y+1}" width="1.02" height="1.02" fill="${col(c)}"/>`})});
  return `<svg class="pxav" viewBox="0 0 16 16" shape-rendering="crispEdges" aria-hidden="true"><rect width="16" height="16" fill="${v.bg}"/>${r}</svg>`;
}
const avatarOf=p=>p?.avatar||ls.get('rj-avatar-'+p?.id);
const personAv=p=>avatarSVG(avatarOf(p))||esc(initial(p?.name));
async function saveAvatar(id){
  const me=S.people.find(p=>p.id===S.me);if(!me)return;me.avatar=id;ls.set('rj-avatar-'+me.id,id);render();if(!GH.token())return;
  try{const f=await GH.get('data/kisiler.json'),list=f?.data?.kisiler||[],m=list.find(p=>p.id===me.id);if(m){m.avatar=id;await GH.put('data/kisiler.json',{kisiler:list},f.sha,`${me.name}: profil resmi seçildi`)}}
  catch{toast('Profil resmi kaydedilemedi; bu cihazda duruyor.')}
}
function openAvatar(){
  const cur=avatarOf(S.people.find(p=>p.id===S.me));
  openSheet(`<div class="sheet-h"><h2>Profil resmini seç</h2><button class="x" data-act="close" aria-label="Kapat">×</button></div>
  <div class="sheet-b"><div class="avgrid">${Object.entries(AVATARS).map(([k,v])=>`<button class="avopt" data-act="avatar-pick" data-v="${k}" aria-pressed="${cur===k}">${avatarSVG(k)}<span>${v.n}</span></button>`).join('')}</div></div>`);
}

/* first open on this browser: picture, then pet, then the tour */
const TOUR_KEY='rj-tour-done';
const Onboard={
  maybe(){if(S.onbChecked||!S.me||S.viewing!==S.me||ls.get(TOUR_KEY))return;S.onbChecked=true;setTimeout(()=>this.step1(),450)},
  step1(){if(avatarOf(S.people.find(p=>p.id===S.me)))return this.step2();S.onbNext=()=>this.step2();openAvatar()},
  step2(){if(petOf()||!GH.token())return Tour.start();S.onbNext=()=>Tour.start();PS=null;openPetSetup()}
};

/* the tour: sections of short lines; a line may open a tab and light up one thing on the page */
const home=()=>{if(S.area!=='home')ACT['go-home']()},area=a=>()=>{if(S.area!==a)ACT.area({dataset:{a}})};
const TOUR_OPEN={kedi:n=>`Ben ${n}. Burası artık benim evim, sen de kalabilirsin.`,kopek:n=>`BEN ${n}! Sonunda geldin! Sana her yeri göstereceğim!`,tavsan:n=>`Ben ${n}. Çabuk olalım, gezecek çok yer var!`,kirpi:n=>`Ben ${n}. Yavaşça gezelim. Ev bir yere kaçmıyor.`};
const TOUR_CLOSE={kedi:'Tur bitti. Şimdi beni rahat bırakabilirsin. Ama uzağa gitme.',kopek:'BİTTİ! Harikaydın! Yine gezelim mi? Şaka, ama gezelim mi?',tavsan:'Bitti! Yetiştik! Neye yetiştiysek artık, hadi başla!',kirpi:'Hepsi bu. Gerisini sen yaşarken öğrenirsin.'};
const TOUR=[
 {t:'Evimiz',go:home,lines:[{s:'.room',x:(n,y)=>TOUR_OPEN[y](n)},{s:'.room',x:()=>'Bu senin odan. Raf kitaplarına, televizyon film ve dizilerine, konsol oyunlarına götürür.'}]},
 {t:'Kitap Rafı',go:area('book'),lines:[{s:'.shelf',x:()=>'Kitapların burada, türlerine göre dizili. Renkliler okuduğun, renksizler sırada bekleyenler.'},{s:'#btn-add',x:()=>'Yeni kayıt buradan eklenir. Adını yazmaya başla, sonuçlar kendiliğinden gelir.'},{s:'#tabs',x:()=>'Üstteki sekmelerde kapaklar, notlar, yıl özeti, okunacaklar, hedef ve bingo var.'}]},
 {t:'Seyir Defteri',go:area('film'),lines:[{tab:'shelf',s:'.fmtbar',x:()=>'Filmler, diziler ve animasyonlar ayrı sehpalarda durur. Buradan geçiş yaparsın.'},{tab:'kesfet',s:'.ktools',x:()=>'Keşfet’te arkadaşlarının izlediklerini ve puanlarını görürsün.'},{tab:'tbr',s:'.nb-pages',x:()=>'İzlenecekler’de izlemek istediklerin ve henüz oylamadıkların toplanır.'}]},
 {t:'Oyunlar',go:area('game'),lines:[{tab:'shelf',s:'.pxscreen',x:()=>'Oyunların bu ekranda. Soldan türü seç, sağdan oyunu aç.'},{tab:'tbr',s:'.nb-pages',x:()=>'Oyun Arşivi’nde istek listen ve sırada bekleyen oyunların durur.'}]},
 {t:'Arkadaşlar',go:area('book'),lines:[{tab:'shelf',s:'#who',x:()=>'Buradan arkadaşlarının evine gidersin. Raflarına bakabilirsin, değiştiremezsin.'},{s:'.shelf',x:()=>'Bir kaydı açınca aynısı arkadaşında varsa puanını görürsün. Arkadaş Yorumu sekmesinde yorumları okursun.'}]},
 {t:'Öneri',go:area('book'),lines:[{s:'.fab',x:()=>'Kararsızsan beni rafta bul ya da Öneri al’a bas. Bir arkadaş seç, onun hayvanı gelip anlatsın.'}]},
 {t:'Bilgisayar',go:home,lines:[{s:'.spot[data-act="pc"]',x:()=>'Bu bilgisayardan tüm verini Excel’e alabilir, şablonla Excel’den yükleyebilirsin.'},{s:'.room',x:(n,y)=>TOUR_CLOSE[y]}]}
];
const Tour={i:0,j:0,typing:null,on:false,full:'',
  pet(){return petOf()||{type:'kedi',coat:0,name:'Pati'}},
  start(){
    if(Tour.on)return;closeSheet();Tour.on=true;Tour.i=0;Tour.j=0;document.documentElement.setAttribute('data-tour','');const p=Tour.pet();
    document.getElementById('tour')?.remove();document.body.insertAdjacentHTML('beforeend',`<div class="tour" id="tour" role="dialog" aria-label="Tanıtım"><div class="tour-pet" id="tour-pet">${petSVG(p.type,p.coat)}</div><div class="tour-box"><div class="tour-sec"><b id="tour-sec"></b><span id="tour-n"></span></div><p id="tour-txt" aria-live="polite" data-act="tour-fast"></p><div class="tour-btns"><button class="btn primary" data-act="tour-next" id="tour-next">İleri</button><button class="btn ghost" data-act="tour-section">Bu bölümü geç</button><button class="linkbtn" data-act="tour-end">Turu atla</button></div></div></div>`);
    Tour.show(true);
  },
  hot(sel){document.querySelectorAll('.tour-hot').forEach(e=>e.classList.remove('tour-hot'));const e=sel&&document.querySelector(sel);if(e){e.classList.add('tour-hot');e.scrollIntoView({block:'center',behavior:'smooth'})}},
  show(enter){
    const sec=TOUR[this.i],l=sec.lines[this.j],p=this.pet();if(this.j===0)sec.go();if(l.tab&&S.tab!==l.tab&&S.area!=='home')ACT.tab({dataset:{tab:l.tab}});
    $('#tour-sec').textContent=sec.t;$('#tour-n').textContent=`${this.i+1} / ${TOUR.length}`;$('#tour-next').textContent=this.i===TOUR.length-1&&this.j===sec.lines.length-1?'Bitir':'İleri';
    const pet=$('#tour-pet');if(enter||this.j===0){pet.classList.remove('enter');void pet.offsetWidth;pet.classList.add('enter')}
    setTimeout(()=>this.hot(l.s),120);this.say(l.x(p.name,PETS[p.type]?p.type:'kedi'));
  },
  say(t){
    clearInterval(this.typing);this.full=t;const el=$('#tour-txt'),pet=$('#tour-pet');if(matchMedia('(prefers-reduced-motion: reduce)').matches){el.textContent=t;return}
    let k=0;el.textContent='';pet.classList.add('walking');this.typing=setInterval(()=>{k+=2;el.textContent=t.slice(0,k);if(k>=t.length)this.fast()},24);
  },
  fast(){clearInterval(this.typing);this.typing=null;const e=$('#tour-txt');if(e)e.textContent=this.full;$('#tour-pet')?.classList.remove('walking')},
  next(){if(this.typing)return this.fast();const sec=TOUR[this.i];if(this.j<sec.lines.length-1){this.j++;this.show()}else this.section()},
  section(){this.fast();if(this.i<TOUR.length-1){this.i++;this.j=0;this.show()}else this.end()},
  end(){clearInterval(this.typing);this.typing=null;this.on=false;this.hot(null);document.getElementById('tour')?.remove();document.documentElement.removeAttribute('data-tour');ls.set(TOUR_KEY,'1');home();scrollTo({top:0})}
};
Object.assign(ACT,{'avatar-pick':a=>{saveAvatar(a.dataset.v);closeSheet()},'avatar-change':()=>{closeSheet();openAvatar()},tour:()=>{closeSheet();Tour.start()},'tour-next':()=>Tour.next(),'tour-fast':()=>Tour.fast(),'tour-section':()=>Tour.section(),'tour-end':()=>Tour.end()});
document.addEventListener('keydown',e=>{if(Tour.on&&e.key==='Escape')Tour.end()});
