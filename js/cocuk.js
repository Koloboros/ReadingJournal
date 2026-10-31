/* ---------- Çocuk Rafı: a household's children's books, with a rotating low shelf ---------- */
const KID_TAGS={bebek:'Bebek kitapları',duygu:'Duygular ve değerler',uyku:'Uyku vakti',dokun:'Dokun, hisset',kaydir:'Kaydır, çek, aç',sesli:'Sesli kitaplar',bilim:'Doğa ve bilim',masal:'Masal, müzik, sanat',gunluk:'Günlük hayat',mizah:'Güldürenler',ingilizce:'İngilizce'};
const KID_AGES=['0-1','1-2','2-3','3-5','5+'];
const KID_SLOTS=['sesli','uyku','dokun','duygu','bilim','mizah'];
const Kid={idx:null,loading:null,id:null,data:null,sha:null,
  file(){return`data/cocuk/${this.id}.json`},
  async loadIdx(){if(this.loading)return;this.loading=true;try{const f=await GH.get('data/cocuk/index.json');this.idx=f?.data?.cocuklar||[]}catch{this.idx=[]}this.loading=false;render()},
  of(pid){return(this.idx||[]).filter(k=>k.parents?.includes(pid))},
  cur(){return(this.idx||[]).find(k=>k.id===this.id)},
  canEdit(){return!!GH.token()&&!!this.cur()?.parents?.includes(S.me)},
  async open(id){this.id=id;this.data=null;render();try{const f=await GH.get(this.file());this.data={books:[],lists:[],week:null,history:[],log:[],...(f?.data||{})}}catch{this.data={books:[],lists:[],week:null,history:[],log:[]};toast('Raf yüklenemedi.')}render()},
  async change(fn,msg){
    if(!this.canEdit())return toast('Bu rafı yalnızca çocuğun anne babası düzenleyebilir.');
    for(let i=0;i<3;i++){
      try{const f=LOCAL?{data:this.data,sha:null}:await GH.get(this.file()),d={books:[],lists:[],week:null,history:[],log:[],...(f?.data||{})};fn(d);await GH.put(this.file(),d,f?.sha||null,`${this.cur().name}: ${msg}`);this.data=d;render();return true}
      catch(e){if(e.status!==409&&e.status!==422)break}
    }
    toast('Kaydedilemedi. Tekrar dene.');return false;
  },
  book(id){return this.data?.books.find(b=>b.id===id)}
};
const kidCards=pid=>Kid.of(pid).map(k=>`<div class="hcard c5"><button class="hgo" data-act="kid-open" data-id="${esc(k.id)}"><b>${esc(k.name)}</b><span>Çocuk Rafı</span></button></div>`).join('');
const KID_CHEST=()=>{const k=Kid.of(S.viewing)[0];return k?`<g class="spot" data-act="kid-open" data-id="${esc(k.id)}" role="button" tabindex="0" aria-label="${esc(k.name)}: Çocuk Rafı"><rect class="halo" x="836" y="486" width="130" height="94" rx="12"/><rect x="850" y="522" width="102" height="48" rx="6" fill="#F6C9D0"/><path d="M846 524q55-34 110 0z" fill="#EBA3AF"/><rect x="890" y="516" width="22" height="14" rx="3" fill="#FBE3A6"/><circle cx="901" cy="546" r="9" fill="#FFF6EA"/><path d="M901 553c-8-5-8-11-4-12 2 0 3 1 4 3 1-2 2-3 4-3 4 1 4 7-4 12z" fill="#E8798A"/></g>`:''};
const kidDate=d=>{const x=new Date(d+'T12:00:00');return`${x.getDate()} ${AYLAR[x.getMonth()].toLocaleLowerCase('tr')}`};
const addDays=(d,n)=>{const x=new Date(d+'T12:00:00');x.setDate(x.getDate()+n);return`${x.getFullYear()}-${pad(x.getMonth()+1)}-${pad(x.getDate())}`};
const kidCover=(b,big)=>{const src=b._preview||b.cover,c=autoColor(b.title);return`<span class="kcov ${big?'big':''}" style="--c:${c}">${src?`<img src="${esc(src)}" alt="" loading="lazy" onerror="this.remove()">`:''}<i>${esc(b.title)}</i></span>`};
function kidBook(b,inWeek){return`<button class="kbook" data-act="kid-book" data-id="${esc(b.id)}" title="${esc(b.title)}">${kidCover(b)}<span class="kmeta">${b.fav?'<b class="kfav">♥</b>':''}${b.reads?`<span>${b.reads} kez</span>`:''}${inWeek?'<span class="kwk">bu hafta</span>':''}</span></button>`}
/* the low shelf she can reach */
function kidWeek(){
  const d=Kid.data,w=d.week,edit=Kid.canEdit();
  if(!w)return`<section class="kweek"><div class="kw-h"><h3>Haftanın Kitapları</h3></div><p class="muted">Ulaşabileceği rafa koyacağınız 5-6 kitabı seçin. Sesli, uyku, dokunma gibi farklı türlerden ben önereyim, siz değiştirin.</p>${edit?'<button class="btn primary" data-act="kid-plan">Bu rafı hazırla</button>':''}</section>`;
  const items=w.items.map(id=>Kid.book(id)).filter(Boolean),end=addDays(w.start,w.days),over=todayISO()>=end;
  return`<section class="kweek"><div class="kw-h"><h3>Haftanın Kitapları</h3><span class="muted">${kidDate(w.start)} – ${kidDate(end)}</span>${edit?`<button class="btn" data-act="kid-plan">${over?'Rafı değiştir':'Planı düzenle'}</button>`:''}</div>
  ${over?'<p class="kw-due">Raf değişme zamanı geldi. Kitaplarını özlemiş olabilir.</p>':''}
  <div class="kwgrid">${items.map(b=>`<div class="kwitem">${kidBook(b,false)}${edit?`<button class="btn kdid" data-act="kid-read" data-id="${esc(b.id)}">Okuduk</button>`:''}</div>`).join('')}</div></section>`;
}
S.kq='';S.ktag='';S.kage='';S.kseries='';S.klist='';
function vKid(){
  const k=Kid.cur();if(!Kid.data||!k)return`<div class="banner"><span class="busy"><span class="spin"></span>Çocuk rafı açılıyor…</span></div>`;
  const d=Kid.data,sibs=(Kid.idx||[]).filter(x=>x.parents?.some(p=>k.parents.includes(p))),inWk=new Set(d.week?.items||[]);
  const q=norm(S.kqk||''),L=d.books.filter(b=>(!S.ktag||b.tags?.includes(S.ktag))&&(!S.kage||b.age===S.kage)&&(!S.kseries||b.series?.includes(S.kseries))&&(!S.klist||d.lists.find(l=>l.id===S.klist)?.items.includes(b.id))&&(!q||norm([b.title,b.author,b.publisher,(b.series||[]).join(' '),b.about].join(' ')).includes(q))).sort((a,b)=>cmp(a.title,b.title));
  const series=[...new Set(d.books.flatMap(b=>b.series||[]))].sort(cmp);
  const chip=(act,v,l,cur)=>`<button class="chip" data-act="${act}" data-v="${esc(v)}" aria-pressed="${cur===v}">${esc(l)}</button>`;
  const month=todayISO().slice(0,7),ml=(d.log||[]).filter(x=>x.d.startsWith(month)),cnt={};ml.forEach(x=>cnt[x.b]=(cnt[x.b]||0)+1);const top=Object.entries(cnt).sort((a,b)=>b[1]-a[1])[0];
  return`<div class="khead"><span class="kav">${avatarSVG(k.avatar)||esc(initial(k.name))}</span><div><h2 class="hand">${esc(k.name)}</h2><p class="muted">${d.books.length} kitap · ${series.length} seri${ml.length?` · bu ay ${ml.length} kez okudunuz${top&&Kid.book(top[0])?`, en çok: ${esc(Kid.book(top[0]).title)}`:''}`:''}</p></div>${Kid.canEdit()?'<button class="btn primary" data-act="kid-new">Kitap ekle</button>':''}</div>
  ${sibs.length>1?`<div class="chips" style="margin-bottom:10px">${sibs.map(s=>`<button class="chip" data-act="kid-open" data-id="${esc(s.id)}" aria-pressed="${s.id===k.id}">${esc(s.name)}</button>`).join('')}</div>`:''}
  ${kidWeek()}
  <div class="ktools"><input type="text" id="kid-q" value="${esc(S.kqk||'')}" placeholder="Kitap, yazar ya da konu ara" autocomplete="off">${series.length?`<select id="kid-series" aria-label="Seri"><option value="">Tüm seriler</option>${series.map(s=>`<option ${S.kseries===s?'selected':''}>${esc(s)}</option>`).join('')}</select>`:''}${d.lists.length?`<select id="kid-list" aria-label="Okuma listesi"><option value="">Tüm kitaplar</option>${d.lists.map(l=>`<option value="${esc(l.id)}" ${S.klist===l.id?'selected':''}>${esc(l.name)}</option>`).join('')}</select>`:''}</div>
  <div class="chips kchips">${chip('kid-tag','','Hepsi',S.ktag)}${Object.entries(KID_TAGS).map(([t,l])=>chip('kid-tag',t,l,S.ktag)).join('')}</div>
  <div class="chips kchips"><span class="muted">Yaş (sadece süzer):</span>${chip('kid-age','','Tümü',S.kage)}${KID_AGES.map(a=>chip('kid-age',a,a,S.kage)).join('')}</div>
  <div class="kids-grid" id="kid-grid">${L.map(b=>kidBook(b,inWk.has(b.id))).join('')||'<div class="empty">Bu seçimde kitap yok.</div>'}</div>`;
}
function openKidBook(id){
  const b=Kid.book(id);if(!b)return;const d=Kid.data,edit=Kid.canEdit(),wk=d.week?.items.includes(id);
  openSheet(`<div class="sheet-h"><h2>${esc(b.title)}</h2><button class="x" data-act="close" aria-label="Kapat">×</button></div>
  <div class="sheet-b"><div class="ed-top"><div>${kidCover(b,true)}</div><div style="min-width:0;display:grid;gap:6px;align-content:start"><div class="rmeta">${[b.author,b.publisher,...(b.series||[])].filter(Boolean).map(x=>`<span>${esc(x)}</span>`).join('')}</div><div class="rmeta">${(b.tags||[]).map(t=>`<span class="tag2">${esc(KID_TAGS[t]||t)}</span>`).join('')}${b.age?`<span class="tag2">${esc(b.age)} yaş</span>`:''}</div><p class="muted" style="margin:0">${b.reads?`${b.reads} kez okundu${b.lastRead?`, son: ${kidDate(b.lastRead)}`:''}`:'Henüz okundu işareti yok.'}</p></div></div>
  ${b.about?`<div class="about">${esc(b.about)}</div>`:''}${b.note?`<p class="rtext">${esc(b.note)}</p>`:''}
  ${edit?`<div class="pcrow"><button class="btn primary" data-act="kid-read" data-id="${esc(id)}">Okuduk</button><button class="btn" data-act="kid-fav" data-id="${esc(id)}">${b.fav?'♥ En sevdikleri':'♡ En sevdiklerine ekle'}</button><button class="btn" data-act="kid-toweek" data-id="${esc(id)}">${wk?'Bu haftadan çıkar':'Bu haftaya ekle'}</button></div>
  <div class="field"><span class="lbl">Okuma listeleri</span><div class="gchips">${d.lists.map(l=>`<button type="button" class="gchip" data-act="kid-inlist" data-id="${esc(id)}" data-l="${esc(l.id)}" aria-pressed="${l.items.includes(id)}">${esc(l.name)}</button>`).join('')}<button type="button" class="gchip" data-act="kid-newlist" data-id="${esc(id)}">+ Yeni liste</button></div></div>
  <div class="ed-foot"><button class="btn danger ghost" data-act="kid-del" data-id="${esc(id)}">Sil</button><button class="btn" data-act="kid-edit" data-id="${esc(id)}">Düzenle</button></div>`:''}</div>`);
}
/* plan: one book per chosen kind; books that sat on the shelf lately and much-read ones wait their turn */
let KP=null;
function kidPick(tag,used){
  const d=Kid.data,recent=new Set((d.history||[]).slice(-3).flatMap(h=>h.items).concat(d.week?.items||[]));
  const pool=d.books.filter(b=>b.tags?.includes(tag)&&!used.includes(b.id));if(!pool.length)return null;
  const score=b=>(recent.has(b.id)?100:0)+(+b.reads||0)+Math.random()*3;return pool.sort((a,b)=>score(a)-score(b))[0].id;
}
function startPlan(){const d=Kid.data,used=[];KP={days:d.week?.days||7,slots:KID_SLOTS.map(t=>{const id=kidPick(t,used);if(id)used.push(id);return{t,id}})};drawPlan()}
function drawPlan(){
  openSheet(`<div class="sheet-h"><h2>Haftanın Kitapları</h2><button class="x" data-act="close" aria-label="Kapat">×</button></div>
  <div class="sheet-b"><p class="muted" style="margin:0">Her türden bir kitap önerdim. Yeni öner ile değiştir, ya da satırı çıkar. Yaşa bakmıyorum.</p>
  <div class="seg">${[[7,'1 hafta'],[14,'2 hafta']].map(([v,l])=>`<button type="button" data-act="kp-days" data-v="${v}" aria-pressed="${KP.days===v}">${l}</button>`).join('')}</div>
  <div class="kplan">${KP.slots.map((s,i)=>{const b=Kid.book(s.id);return`<div class="kprow">${b?kidCover(b):'<span class="kcov"></span>'}<div><b>${esc(KID_TAGS[s.t])}</b><span>${b?esc(b.title):'Bu türde kitap yok'}</span></div><button class="btn" data-act="kp-new" data-i="${i}">Yeni öner</button><button class="x" data-act="kp-del" data-i="${i}" aria-label="Çıkar">×</button></div>`}).join('')}</div>
  <div class="gchips">${Object.entries(KID_TAGS).filter(([t])=>!KP.slots.some(s=>s.t===t)).map(([t,l])=>`<button type="button" class="gchip" data-act="kp-add" data-v="${t}">+ ${esc(l)}</button>`).join('')}</div>
  <div class="ed-foot"><span></span><button class="btn primary" data-act="kp-save">Rafı kur</button></div></div>`);
}
/* add and edit */
let KF=null;
function openKidForm(b){
  KF=b?{...b}:{id:'k'+newId(),title:'',tags:[],_new:true};const age=KF.age||'';
  openSheet(`<div class="sheet-h"><h2>${KF._new?'Kitap ekle':'Düzenle'}</h2><button class="x" data-act="close" aria-label="Kapat">×</button></div>
  <form class="sheet-b" id="kid-form"><div class="field"><label for="kf-t">Kitabın adı</label><input id="kf-t" value="${esc(KF.title)}" required autocomplete="off" placeholder="Yazmaya başla, sonuçlar gelir"></div><div id="kf-res"></div>
  <div class="row"><div class="field"><label for="kf-a">Yazar / çizer</label><input id="kf-a" value="${esc(KF.author||'')}"></div><div class="field"><label for="kf-p">Yayınevi</label><input id="kf-p" value="${esc(KF.publisher||'')}"></div></div>
  <div class="field"><label for="kf-s">Seri</label><input id="kf-s" value="${esc((KF.series||[]).join(', '))}"></div>
  <div class="field"><span class="lbl">Konular</span><div class="gchips">${Object.entries(KID_TAGS).map(([t,l])=>`<button type="button" class="gchip" data-act="kf-tag" data-v="${t}" aria-pressed="${KF.tags.includes(t)}">${esc(l)}</button>`).join('')}</div></div>
  <div class="field"><span class="lbl">Yaş aralığı</span><div class="seg">${KID_AGES.map(a=>`<button type="button" data-act="kf-age" data-v="${a}" aria-pressed="${age===a}">${a}</button>`).join('')}</div></div>
  <div class="field"><label for="kf-k">Özet</label><textarea id="kf-k">${esc(KF.about||'')}</textarea></div><div class="field"><label for="kf-n">Notumuz</label><textarea id="kf-n" placeholder="Sayfayı kendi çeviriyor...">${esc(KF.note||'')}</textarea></div>
  <label class="btn ghost" style="justify-content:center">${ico('camera')}Kapak fotoğrafı<input type="file" id="kf-photo" accept="image/*" capture="environment" hidden></label><span class="note" id="kf-ph">${KF._blob?'Fotoğraf hazır.':''}</span>
  <div class="ed-foot"><span></span><div style="display:flex;gap:8px"><button type="button" class="btn" data-act="close">Vazgeç</button><button type="submit" class="btn primary">Kaydet</button></div></div></form>`);
}
const kfSync=()=>{if(!KF||!$('#kf-t'))return;KF.title=$('#kf-t').value;KF.author=$('#kf-a').value;KF.publisher=$('#kf-p').value;KF.series=$('#kf-s').value.split(',').map(s=>s.trim()).filter(Boolean);KF.about=$('#kf-k').value;KF.note=$('#kf-n').value};
async function kidUpload(id,b64){
  const p=`data/cocuk/kapak/${Kid.id}/${id}.jpg`;if(LOCAL)return p;
  const sha=await GH.sha(p),r=await fetch(API+p,{method:'PUT',headers:{...GH.headers(),'Content-Type':'application/json'},body:JSON.stringify({message:`${Kid.cur().name}: kapak fotoğrafı`,content:b64,branch:REPO.branch,...(sha?{sha}:{})})});if(!r.ok)throw 0;return p;
}
const kidKey=s=>slug(s);
function openKidAdd(){
  S.kadd=S.kadd||{};openSheet(`<div class="sheet-h"><h2>Çocuk ekle</h2><button class="x" data-act="close" aria-label="Kapat">×</button></div>
  <form class="sheet-b" id="kadd-form"><div class="field"><label for="kadd-n">Adı</label><input id="kadd-n" required maxlength="30"></div><div class="avgrid">${Object.entries(AVATARS).map(([k,v])=>`<button type="button" class="avopt" data-act="kadd-av" data-v="${k}" aria-pressed="${S.kadd.av===k}">${avatarSVG(k)}<span>${v.n}</span></button>`).join('')}</div><div class="ed-foot"><span></span><button class="btn primary" type="submit">Rafı oluştur</button></div></form>`);
}
Object.assign(ACT,{
  'kid-open':a=>{Store.sync();S.area='kid';Store.useArea();scrollTo({top:0});Kid.open(a.dataset.id)},'kid-book':a=>openKidBook(a.dataset.id),'kid-new':()=>openKidForm(null),'kid-edit':a=>openKidForm(Kid.book(a.dataset.id)),
  'kid-tag':a=>{S.ktag=a.dataset.v;render()},'kid-age':a=>{S.kage=a.dataset.v;render()},
  'kid-read':a=>{const id=a.dataset.id,t=todayISO();Kid.change(d=>{const b=d.books.find(x=>x.id===id);if(b){b.reads=(b.reads||0)+1;b.lastRead=t}d.log=[...(d.log||[]),{b:id,d:t}].slice(-2000)},'okundu').then(ok=>{if(ok){toast('Okuduk olarak işaretlendi.');if(!$('#overlay').hidden)openKidBook(id)}})},
  'kid-fav':a=>{const id=a.dataset.id;Kid.change(d=>{const b=d.books.find(x=>x.id===id);if(b)b.fav=!b.fav},'en sevdikleri').then(()=>openKidBook(id))},
  'kid-toweek':a=>{const id=a.dataset.id;if(!Kid.data.week)return startPlan();Kid.change(d=>{const w=d.week;w.items=w.items.includes(id)?w.items.filter(x=>x!==id):[...w.items,id]},'haftanın kitapları').then(()=>openKidBook(id))},
  'kid-inlist':a=>{const{id,l}=a.dataset;Kid.change(d=>{const x=d.lists.find(k=>k.id===l);if(x)x.items=x.items.includes(id)?x.items.filter(i=>i!==id):[...x.items,id]},'okuma listesi').then(()=>openKidBook(id))},
  'kid-newlist':a=>{const id=a.dataset.id,box=a.parentElement;box.insertAdjacentHTML('beforeend',`<form id="klist-form" data-id="${esc(id)}" class="pcrow"><input id="klist-n" placeholder="Liste adı" maxlength="40"><button class="btn" type="submit">Oluştur</button></form>`);a.remove();$('#klist-n').focus()},
  'kid-del':a=>{if(!a.dataset.sure){a.dataset.sure='1';a.textContent='Emin misin? Evet, sil';return}const id=a.dataset.id;closeSheet();Kid.change(d=>{d.books=d.books.filter(b=>b.id!==id);d.lists.forEach(l=>l.items=l.items.filter(i=>i!==id));if(d.week)d.week.items=d.week.items.filter(i=>i!==id)},'kitap silindi')},
  'kid-plan':()=>startPlan(),'kp-days':a=>{KP.days=+a.dataset.v;drawPlan()},
  'kp-new':a=>{const s=KP.slots[+a.dataset.i],used=KP.slots.map(x=>x.id).filter(Boolean);s.id=kidPick(s.t,used)||s.id;drawPlan()},'kp-del':a=>{KP.slots.splice(+a.dataset.i,1);drawPlan()},
  'kp-add':a=>{const t=a.dataset.v;KP.slots.push({t,id:kidPick(t,KP.slots.map(x=>x.id).filter(Boolean))});drawPlan()},
  'kp-save':()=>{const items=KP.slots.map(s=>s.id).filter(Boolean),days=KP.days,t=todayISO();if(!items.length)return toast('En az bir kitap seç.');closeSheet();Kid.change(d=>{if(d.week)d.history=[...(d.history||[]),d.week].slice(-30);d.week={start:t,days,items}},'haftanın kitapları değişti').then(ok=>{if(ok)toast('Raf hazır.')})},
  'kf-tag':a=>{kfSync();const t=a.dataset.v;KF.tags=KF.tags.includes(t)?KF.tags.filter(x=>x!==t):[...KF.tags,t];a.setAttribute('aria-pressed',KF.tags.includes(t))},
  'kf-age':a=>{KF.age=a.dataset.v;a.parentElement.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===a))},
  'kf-pick':a=>{const r=KF._res?.[+a.dataset.i];if(!r)return;kfSync();Object.assign(KF,{title:r.title,author:KF.author||r.author,about:KF.about||r.about});if(r.cover)KF.cover=KF.cover||r.cover;openKidForm(KF.id&&!KF._new?KF:{...KF});},
  'kadd-av':a=>{S.kadd.av=a.dataset.v;document.querySelectorAll('.avopt').forEach(x=>x.setAttribute('aria-pressed',x===a))},'kid-add':()=>{closeSheet();openKidAdd()}
});
document.addEventListener('input',e=>{if(e.target.id==='kid-q'){S.kqk=e.target.value;clearTimeout(S.kqT);S.kqT=setTimeout(()=>{const pos=e.target.selectionStart;render();const i=$('#kid-q');if(i){i.focus();i.setSelectionRange(pos,pos)}},250)}
  if(e.target.id==='kf-t'&&KF?._new){clearTimeout(S.kfT);const q=e.target.value.trim();if(q.length<3)return;S.kfT=setTimeout(async()=>{const r=await searchBooks(q);KF._res=r.slice(0,5);const el=$('#kf-res');if(el)el.innerHTML=`<div class="results">${KF._res.map((x,i)=>`<button type="button" class="res" data-act="kf-pick" data-i="${i}">${x.cover?`<img src="${esc(x.cover)}" alt="" referrerpolicy="no-referrer">`:'<i></i>'}<span><b>${esc(x.title)}</b>${esc(x.author||'')}</span></button>`).join('')}</div>`},450)}});
document.addEventListener('change',async e=>{
  if(e.target.id==='kid-series'){S.kseries=e.target.value;render()}if(e.target.id==='kid-list'){S.klist=e.target.value;render()}
  if(e.target.id==='kf-photo'){const f=e.target.files[0];if(!f)return;const r=await resizeImg(f,900,.8);KF._blob=r.data.split(',')[1];KF._preview=r.data;$('#kf-ph').textContent='Fotoğraf hazır.'}
});
document.addEventListener('submit',async e=>{
  if(e.target.id==='klist-form'){e.preventDefault();const n=$('#klist-n').value.trim(),id=e.target.dataset.id;if(!n)return;const lid='l'+newId();await Kid.change(d=>{d.lists.push({id:lid,name:n,items:[id]})},'yeni okuma listesi');return openKidBook(id)}
  if(e.target.id==='kid-form'){e.preventDefault();kfSync();const o={...KF},id=o.id;if(!o.title.trim())return;closeSheet();
    if(o._blob){try{o.cover=await kidUpload(id,o._blob)}catch{toast('Fotoğraf yüklenemedi; kitap fotoğrafsız kaydedildi.')}}
    const clean={};for(const[k,v]of Object.entries(o))if(!k.startsWith('_')&&v!==''&&v!=null&&!(Array.isArray(v)&&!v.length))clean[k]=v;clean.title=clean.title.trim();
    Kid.change(d=>{const i=d.books.findIndex(b=>b.id===id);if(i>=0)d.books[i]=clean;else d.books.push(clean)},`"${clean.title}" kaydedildi`).then(ok=>{if(ok)toast('Kaydedildi.')});return}
  if(e.target.id==='kadd-form'){e.preventDefault();const name=$('#kadd-n').value.trim();if(!name)return;const id=kidKey(name),p=partnerOf();
    if((Kid.idx||[]).some(k=>k.id===id))return toast('Bu adla bir raf var.');const item={id,name,avatar:S.kadd.av||'',parents:[S.me,...(p?[p.id]:[])]};
    try{const f=await GH.get('data/cocuk/index.json'),list=f?.data?.cocuklar||[];list.push(item);await GH.put('data/cocuk/index.json',{cocuklar:list},f?.sha||null,`Yeni çocuk rafı: ${name}`);await GH.put(`data/cocuk/${id}.json`,{books:[],lists:[],week:null,history:[],log:[]},null,`${name} için boş raf`);Kid.idx=list;closeSheet();ACT['kid-open']({dataset:{id}})}catch{toast('Raf oluşturulamadı. Tekrar dene.')}}
});
