/* ---------- recommendations: a friend's pet walks in and pitches something ---------- */
/* Turkish case endings for names, by vowel harmony */
const lastV=s=>(String(s).toLocaleLowerCase('tr').match(/[aıoueiöü]/g)||['e']).pop();
const endsV=s=>/[aıoueiöü]$/i.test(String(s).toLocaleLowerCase('tr'));
const gen=s=>{const v=lastV(s),h={a:'ı',ı:'ı',o:'u',u:'u',e:'i',i:'i',ö:'ü',ü:'ü'}[v];return `${s}’${endsV(s)?'n':''}${h}n`};
const abl=s=>`${s}’${/[aıou]/.test(lastV(s))?'dan':'den'}`;
const VERB={book:['okudu','okudu','okumuş','kitap'],film:['izledi','izledi','izlemiş','film'],game:['oynadı','oynadı','oynamış','oyun']};
const pick1=a=>a[Math.floor(Math.random()*a.length)];
/* o = owner's name, t = title, s = score, n = pet's name, v = verb, g = genre */
const REC_LINES={
  kedi:[
    x=>`${x.o} bunu ${x.v}${x.s?`, ${x.s} verdi`:''}. Normalde insan zevkine güvenmem ama “${x.t}” istisna olabilir.`,
    x=>`“${x.t}”. ${x.o} bununla günlerce kafayı bozdu, ben de üstüne oturarak destek oldum. Sana da yakışır.`,
    x=>`Sana bunu öneriyorum çünkü ${x.o} yalvardı. Yalvarmadı aslında. “${x.t}” iyi işte, uzatma.`,
    x=>`${x.g?x.g+' sevdiğini fark ettim. ':''}Fark etmek benim işim. “${x.t}” al, sonra teşekkür etme, sevmiyorum.`
  ],
  kopek:[
    x=>`BUNU GÖRMELİSİN! ${x.o} “${x.t}” ile gözlerini ayırmadı! Ben de ayırmadım! Ne olduğunu bilmiyorum ama HARİKA!`,
    x=>`${x.o} ${x.s?x.s+' verdi':'çok sevdi'}! ${x.s?x.s+' çok büyük bir sayı!':''} “${x.t}”! Getireyim mi? Getireyim mi? Getiriyorum!`,
    x=>`“${x.t}”! ${x.o} bunu bitirince bana ekstra mama verdi! Yani bu iyi bir şey! Sen de bitir! Bana da mama!`,
    x=>`Sen bunu çok seveceksin! Sen her şeyi seversin! Seni seviyorum! Ha, “${x.t}”, ${abl(x.o)}!`
  ],
  tavsan:[
    x=>`Hızlı söylüyorum: ${x.o}, “${x.t}”, ${x.s?x.s+' puan':'çok iyi'}. Listeye ekle, kaçıyor, her şey kaçıyor!`,
    x=>`${x.o} bunu bir solukta bitirdi, ben de nefessiz kaldım. “${x.t}”. Şimdi başlamazsan geç kalırsın. Neye? Bilmiyorum!`,
    x=>`“${x.t}” dedi ${x.o}. Listende yer var mı? Yoksa açalım. Hemen. Şimdi. Tamam mı? Tamam.`,
    x=>`Panik yok ama ${x.o} bundan bahsederken gözleri parladı ve bu beni endişelendirdi. “${x.t}”. Bakmalısın.`
  ],
  kirpi:[
    x=>`${x.o} bu yapıttan sonra bir süre sessiz kaldı. “${x.t}”. Bazı şeyler insanı değiştirir. Bazıları sadece iyi vakit geçirtir. İkisi de güzel.`,
    x=>`“${x.t}”. ${x.o} ${x.s?x.s+' demiş':'beğenmiş'}. Puanlar geçer, his kalır. Yine de ${x.s||'iyi'} fena değil.`,
    x=>`İnsan bazen kendini başkasının rafında bulur. ${gen(x.o)} rafında “${x.t}” duruyor. Sen de bakmalısın.`,
    x=>`Dikenlerimin arasından dedim ki: “${x.t}”. Fazla konuşmayayım. ${x.o} anlatır.`
  ]
};
const REC_NONE={
  kedi:o=>`${o} sana önerecek bir şey bulamadı. Şaşırmadım. Ya sen her şeyi gördün ya da o hiçbir şey görmedi.`,
  kopek:o=>`${gen(o)} rafında sana uygun bir şey kalmadı! Üzülmedim! Hiç üzülmem! Top oynayalım mı?`,
  tavsan:o=>`${gen(o)} listesi bitti! Nasıl bitti? Şimdi ne olacak? Yeni bir şey eklesin, hızlı!`,
  kirpi:o=>`${gen(o)} sana söyleyecek yeni bir şeyi kalmamış. Bu da bir tür yakınlık.`
};
const ownerPet=pid=>Peers.pet(pid)||Store.extra?.pet||{type:'kedi',coat:1,name:'Sokak Kedisi'};
const goodScore=(b,a)=>+b.rating>=(a==='book'?4.5:8);
function recPool(a,pid){
  const mine=new Set((Store.lists?.[a]||[]).map(itemKey)),ok=b=>b.status==='read'&&!mine.has(itemKey(b));
  if(pid!=='sys'){const L=Peers.list(pid,a).filter(ok);return{top:L.filter(b=>goodScore(b,a)),any:L}}
  const all=[];S.people.forEach(p=>{if(p.id!==S.me)Peers.list(p.id,a).filter(ok).forEach(b=>all.push({...b,_by:p.id}))});
  return{top:all.filter(b=>goodScore(b,a)),any:all};
}
let REC=null;
async function openRec(a){
  REC={a};openSheet(`<div class="sheet-h"><h2>Kimden öneri?</h2><button class="x" data-act="close" aria-label="Kapat">×</button></div><div class="sheet-b"><div class="busy"><span class="spin"></span>Herkesin rafına bakılıyor…</div></div>`);
  await Peers.ensure();if(!REC)return;
  const cards=S.people.filter(p=>p.id!==S.me).map(p=>{const pet=Peers.pet(p.id);return `<button class="pcard" style="--c:${esc(p.color||'#ddd')}" data-act="rec-from" data-id="${esc(p.id)}">${pet?`<span class="recmini">${petSVG(pet.type,pet.coat)}</span>`:`<span class="av">${esc(initial(p.name))}</span>`}<b>${esc(p.name)}</b><small>${pet?esc(pet.name)+' anlatsın':'rafından seç'}</small></button>`}).join('');
  openSheet(`<div class="sheet-h"><h2>Kimden öneri?</h2><button class="x" data-act="close" aria-label="Kapat">×</button></div>
  <div class="sheet-b"><p class="muted" style="margin:0">Bir ${AREAS[a].item} önerisi için arkadaşını seç; onun ev arkadaşı gelip anlatsın.</p>
  <div class="people">${cards}<button class="pcard add" data-act="rec-from" data-id="sys"><span class="av" style="--c:var(--rose-pill)">?</span><b>Sistem seçsin</b><small>herkesin rafından</small></button></div></div>`);
}
function showRec(pid){
  const a=REC.a,{top,any}=recPool(a,pid),L=top.length?top:any;REC.pid=pid;
  if(!L.length){const p=ownerPet(pid==='sys'?S.me:pid);openSheet(`<div class="sheet-h"><h2>${esc(p.name)}</h2><button class="x" data-act="close" aria-label="Kapat">×</button></div><div class="sheet-b"><div class="recstage"><div class="recbub">${esc((REC_NONE[p.type]||REC_NONE.kedi)(pid==='sys'?'Kimse':personName(pid)))}</div><span class="recpet">${petSVG(p.type,p.coat)}</span></div></div>`);return}
  const b=pick1(L),by=pid==='sys'?b._by:pid,p=ownerPet(by);REC.item=b;
  const line=pick1(REC_LINES[p.type]||REC_LINES.kedi)({o:personName(by),t:b.title,s:b.rating?String(b.rating).replace('.',','):'',n:p.name,v:VERB[a][0],g:b.genre||''});
  openSheet(`<div class="sheet-h"><h2>${esc(p.name)} geldi</h2><button class="x" data-act="close" aria-label="Kapat">×</button></div>
  <div class="sheet-b"><div class="recstage"><div class="recbub">${esc(line)}</div><span class="recpet">${petSVG(p.type,p.coat)}</span></div>
  <div class="reccard"><div class="reccover">${coverHTML({...b,status:''})}</div><div><b>${esc(b.title)}</b><p class="muted">${esc([b.author,b.year,b.genre].filter(Boolean).join(' · '))}</p>${b.about?`<p class="note">${esc(b.about)}</p>`:''}</div></div>
  <div class="ed-foot"><button class="btn" data-act="rec-from" data-id="${esc(pid)}">Başka öner</button>${S.canEdit&&S.viewing===S.me?'<button class="btn primary" data-act="rec-add">Listeme ekle</button>':''}</div></div>`);
}
function recAdd(){
  const{a,item:b}=REC;if(!b||!S.canEdit)return;const was=curArea();
  if(was!==a){Store.sync();const keep=S.area;S.area=a==='book'?'home':a;Store.useArea();addRec(b);Store.sync();S.area=keep;Store.useArea()}else addRec(b);
  closeSheet();toast(`“${b.title}” listene eklendi.`);render();
}
function addRec(b){const{_by,id,kind,rating,review,status,startDate,endDate,updatedAt,owned,fromTbr,...rest}=b;Store.saveBook({id:newId(),...rest,status:'want',owned:false,rating:0})}

/* taste report: real numbers, delivered by a judgemental animal */
function tasteOf(a,pid){
  const L=Peers.list(pid,a),R=L.filter(b=>b.status==='read'),rated=R.filter(b=>+b.rating>0),avg=rated.length?rated.reduce((s,b)=>s+ +b.rating,0)/rated.length:0;
  const gc={};R.forEach(b=>{const g=String(b.genre||'').split(',')[0].trim();if(g&&g!=='Ebeveynlik')gc[g]=(gc[g]||0)+1});const top=Object.entries(gc).sort((x,y)=>y[1]-x[1])[0];
  const au={};R.forEach(b=>{const k=(b.author||'').trim();if(k)au[k]=(au[k]||0)+1});const fav=Object.entries(au).sort((x,y)=>y[1]-x[1])[0];
  let gap=null;if(a!=='book')S.people.forEach(p=>{if(p.id===pid)return;const m=new Map(Peers.list(p.id,a).filter(b=>+b.rating>0).map(b=>[itemKey(b),b]));rated.forEach(b=>{const o=m.get(itemKey(b));if(o){const d=Math.abs(b.rating-o.rating);if(!gap||d>gap.d)gap={d,t:b.title,me:b.rating,them:o.rating,who:p.name}}})});
  const friends=S.people.filter(p=>p.id!==pid).flatMap(p=>Peers.list(p.id,a).filter(b=>+b.rating>0).map(b=>+b.rating)),favg=friends.length?friends.reduce((x,y)=>x+y,0)/friends.length:0;
  return{n:R.length,want:L.filter(b=>b.status==='want').length,skip:L.filter(b=>b.status==='skip').length,avg,top,fav,gap,favg,scale:AREAS[a].scale};
}
const TASTE={
  kedi:{
    empty:()=>`Burada henüz hiçbir şey yapmamışsın. Saygı duyuyorum, ben de öyleyim.`,
    top:(g,c)=>`${c} tane ${g}. Çeşitlilik diye bir kavram duymuş muydun?`,
    fav:(a,c)=>`${a} ile ${c} kez görüşmüşsün. İlişkinizi tebrik ederim, bana hiç sormadın ama.`,
    high:(v,f)=>`Ortalama puanın ${v}, arkadaşlarınınki ${f}. Her şeyi seviyorsun. Standartların nerede, onları ben mi yedim?`,
    low:(v,f)=>`Ortalama puanın ${v}, arkadaşlarınınki ${f}. Beğenmeme yeteneğin var, seni ilk kez takdir ediyorum.`,
    gap:g=>`“${g.t}” için sen ${g.me}, ${g.who} ${g.them} demiş. Biriniz yanılıyor ve seni besleyen kişiyi seçiyorum.`,
    want:n=>`Listende ${n} şey var. Biriktirmek bir karakter özelliği değil.`
  },
  kopek:{
    empty:()=>`Henüz bir şey yok ama OLSUN! Birlikte başlarız! Başlayalım mı? Şimdi mi?`,
    top:(g,c)=>`${c} TANE ${g.toLocaleUpperCase('tr')}! SEN BUNA BAYILIYORSUN! Ben de bayılıyorum! Ne olduğunu bilmiyorum!`,
    fav:(a,c)=>`${a}! ${c} kere! Bu kişi kim bilmiyorum ama artık en iyi arkadaşım!`,
    high:v=>`Ortalama ${v}! Her şeyi seviyorsun! Tıpkı ben! Biz aynıyız!`,
    low:v=>`Ortalama ${v}! Biraz serttin ama eminim hepsi senin iyiliğin için! Kuyruğum sallanıyor!`,
    gap:g=>`“${g.t}” için ${g.who} ile kavga mı ettiniz? Kavga etmeyin! Sen ${g.me} dedin, o ${g.them}! Hepiniz iyisiniz!`,
    want:n=>`${n} tane daha var! Daha çok! Harika! Hiç bitmesin!`
  },
  tavsan:{
    empty:()=>`Hiçbir şey yok! Başlamamız lazım! Dün başlamamız lazımdı!`,
    top:(g,c)=>`${c} ${g}! Kalbim hızlandı. Başka türler de var, onlara yetişemiyoruz!`,
    fav:(a,c)=>`${abl(a)} ${c} tane. Ya yeni çıkarsa? Takip ediyor muyuz? Kim takip ediyor?`,
    high:v=>`Ortalama ${v}. Çok yüksek. Bu kadar iyi gitmesi normal mi? Bir şey olacak gibi.`,
    low:v=>`Ortalama ${v}. Zamanını boşa mı harcadın? Saat kaç? Daha çok var mı?`,
    gap:g=>`“${g.t}”: sen ${g.me}, ${g.who} ${g.them}. Bu fark beni geriyor. Konuşun. Hemen.`,
    want:n=>`Listede ${n} şey. Günde birini bitirsen ${n} gün. Hesapladım. Hesaplamasaydım keşke.`
  },
  kirpi:{
    empty:()=>`Boş raf, en dürüst raftır.`,
    top:(g,c)=>`${c} kez ${g}. İnsan aynı nehre dönüp durur. Belki nehir değil, sensin.`,
    fav:(a,c)=>`${a} ile ${c} kez yol yürümüşsün. Bazı yol arkadaşları seçilmez, bulunur.`,
    high:v=>`Ortalama ${v}. Çok seven insan, çok seven insandır.`,
    low:v=>`Ortalama ${v}. Beğenmemek de bir dikendir. Korur, ama yanaşılmaz.`,
    gap:g=>`“${g.t}”: sen ${g.me}, ${g.who} ${g.them}. Aynı yapıt, iki ayrı dünya. Güzel.`,
    want:n=>`Bekleyen ${n} şey. Beklemek de okumanın bir parçası.`
  }
};
async function openTaste(){
  openSheet(`<div class="sheet-h"><h2>Zevk raporu</h2><button class="x" data-act="close" aria-label="Kapat">×</button></div><div class="sheet-b"><div class="busy"><span class="spin"></span>Rafların inceleniyor. Yargılanıyorsun.</div></div>`);
  await Peers.ensure();const pet=Store.extra?.pet||{type:'kedi',coat:1,name:'Sokak Kedisi'},Tx=TASTE[pet.type]||TASTE.kedi,uid=S.viewing,fm=v=>v.toFixed(1).replace('.',',');
  const sec=a=>{const t=tasteOf(a,uid),lines=[];
    if(!t.n)lines.push(Tx.empty(personName(uid)));else{
      if(t.top)lines.push(Tx.top(t.top[0],t.top[1]));
      if(t.fav&&t.fav[1]>1)lines.push(Tx.fav(t.fav[0],t.fav[1]));
      if(t.favg&&t.avg)lines.push((t.avg>=t.favg?Tx.high:Tx.low)(fm(t.avg),fm(t.favg)));
      if(t.gap&&t.gap.d>=2)lines.push(Tx.gap(t.gap));
      if(t.want>4)lines.push(Tx.want(t.want))}
    return `<section class="taste"><h3>${{book:'Kitaplar',film:'Filmler ve diziler',game:'Oyunlar'}[a]}</h3>${t.n?`<p class="tnum"><b>${t.n}</b> ${AREAS[a].item}${t.avg?` · ortalama <b>${fm(t.avg)}</b>/${t.scale}`:''}</p>`:''}${lines.map(l=>`<p>${esc(l)}</p>`).join('')}</section>`};
  openSheet(`<div class="sheet-h"><h2>${esc(gen(pet.name))} raporu</h2><button class="x" data-act="close" aria-label="Kapat">×</button></div><div class="sheet-b"><div class="recstage"><div class="recbub">Oturdum, rafına baktım. Hazır mısın? Olmasan da söylerim.</div><span class="recpet">${petSVG(pet.type,pet.coat)}</span></div>${['book','film','game'].map(sec).join('')}</div>`);
}
Object.assign(ACT,{
  rec:a=>openRec(a.dataset.a||curArea()),
  'rec-from':a=>showRec(a.dataset.id),'rec-add':recAdd,taste:()=>openTaste()
});
