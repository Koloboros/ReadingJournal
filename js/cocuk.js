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
const KID_CHEST=()=>{const k=Kid.of(S.viewing)[0];return k?`<g class="spot" data-act="kid-open" data-id="${esc(k.id)}" role="button" tabindex="0" aria-label="${esc(k.name)}: Çocuk Rafı"><rect class="halo" x="828" y="470" width="136" height="112" rx="12"/><ellipse cx="896" cy="574" rx="60" ry="7" fill="rgba(60,40,25,.14)"/><rect x="848" y="528" width="44" height="44" rx="6" fill="#F4CF5E"/><rect x="848" y="564" width="44" height="8" rx="4" fill="#E0B23F"/><text x="870" y="559" text-anchor="middle" font-family="Baloo 2,sans-serif" font-weight="800" font-size="30" fill="#fff">B</text><rect x="896" y="528" width="44" height="44" rx="6" fill="#7FC29B"/><rect x="896" y="564" width="44" height="8" rx="4" fill="#62A980"/><text x="918" y="559" text-anchor="middle" font-family="Baloo 2,sans-serif" font-weight="800" font-size="30" fill="#fff">C</text><g transform="rotate(-7 894 506)"><rect x="872" y="484" width="44" height="44" rx="6" fill="#EBA3AF"/><rect x="872" y="520" width="44" height="8" rx="4" fill="#D98896"/><text x="894" y="515" text-anchor="middle" font-family="Baloo 2,sans-serif" font-weight="800" font-size="30" fill="#fff">A</text></g></g>`:''};
const kidDate=d=>{const x=new Date(d+'T12:00:00');return`${x.getDate()} ${AYLAR[x.getMonth()].toLocaleLowerCase('tr')}`};
const addDays=(d,n)=>{const x=new Date(d+'T12:00:00');x.setDate(x.getDate()+n);return`${x.getFullYear()}-${pad(x.getMonth()+1)}-${pad(x.getDate())}`};
const kidCover=(b,big,now)=>{const src=b._preview||b.cover,c=autoColor(b.title);return`<span class="kcov ${big?'big':''}" style="--c:${c}">${src?`<img src="${esc(src)}" alt="" loading="${now?'eager':'lazy'}" onload="if(this.naturalWidth>this.naturalHeight*1.15)this.classList.add('wide')" onerror="this.remove()">`:''}<i>${esc(b.title)}</i></span>`};
function kidBook(b,inWeek,now){return`<button class="kbook" data-act="kid-book" data-id="${esc(b.id)}" title="${esc(b.title)}">${kidCover(b,false,now)}<span class="kmeta">${b.fav?'<b class="kfav">♥</b>':''}${b.reads?`<span>${b.reads} kez</span>`:''}${inWeek?'<span class="kwk">bu hafta</span>':''}</span></button>`}
/* little painted toys for the nursery shelves, all on one 80x80 canvas */
const TOYS={
 stack:'<rect x="24" y="70" width="32" height="7" rx="3" fill="#C9A06C"/><rect x="37" y="12" width="6" height="60" rx="3" fill="#D9B48B"/><rect x="18" y="58" width="44" height="12" rx="6" fill="#E8798A"/><rect x="22" y="46" width="36" height="12" rx="6" fill="#F4A05A"/><rect x="26" y="34" width="28" height="12" rx="6" fill="#F4CF5E"/><rect x="30" y="22" width="20" height="12" rx="6" fill="#7FC29B"/><circle cx="40" cy="15" r="7" fill="#7FB4E0"/>',
 teddy:'<circle cx="24" cy="24" r="8" fill="#B98A5E"/><circle cx="56" cy="24" r="8" fill="#B98A5E"/><circle cx="24" cy="24" r="4" fill="#E7C7A3"/><circle cx="56" cy="24" r="4" fill="#E7C7A3"/><ellipse cx="40" cy="60" rx="18" ry="17" fill="#B98A5E"/><ellipse cx="40" cy="62" rx="10" ry="10" fill="#E7C7A3"/><circle cx="40" cy="31" r="17" fill="#C79A6B"/><ellipse cx="40" cy="36" rx="8" ry="6" fill="#EFD7BA"/><circle cx="33" cy="28" r="2" fill="#3A2C24"/><circle cx="47" cy="28" r="2" fill="#3A2C24"/><path d="M38 34h4l-2 3z" fill="#3A2C24"/><ellipse cx="22" cy="66" rx="7" ry="9" fill="#B98A5E"/><ellipse cx="58" cy="66" rx="7" ry="9" fill="#B98A5E"/>',
 bunny:'<ellipse cx="31" cy="16" rx="6" ry="15" fill="#F2E9DE"/><ellipse cx="49" cy="16" rx="6" ry="15" fill="#F2E9DE"/><ellipse cx="31" cy="16" rx="3" ry="11" fill="#F6C9D0"/><ellipse cx="49" cy="16" rx="3" ry="11" fill="#F6C9D0"/><ellipse cx="40" cy="62" rx="17" ry="16" fill="#E6D8C8"/><circle cx="40" cy="38" r="15" fill="#F2E9DE"/><circle cx="34" cy="36" r="2" fill="#3A2C24"/><circle cx="46" cy="36" r="2" fill="#3A2C24"/><path d="M38 41h4l-2 3z" fill="#E8798A"/><circle cx="30" cy="42" r="3" fill="#F6C9D0" opacity=".7"/><circle cx="50" cy="42" r="3" fill="#F6C9D0" opacity=".7"/>',
 blocks:'<rect x="6" y="46" width="30" height="30" rx="4" fill="#F4CF5E"/><rect x="42" y="46" width="30" height="30" rx="4" fill="#7FC29B"/><rect x="24" y="16" width="30" height="30" rx="4" fill="#EBA3AF"/><g font-family="Baloo 2,sans-serif" font-weight="800" font-size="20" fill="#fff" text-anchor="middle"><text x="21" y="68">B</text><text x="57" y="68">C</text><text x="39" y="38">A</text></g>',
 ball:'<circle cx="40" cy="48" r="29" fill="#FFF3D6"/><path d="M40 19a29 29 0 0 1 0 58c12-14 12-44 0-58z" fill="#7FB4E0"/><path d="M40 19a29 29 0 0 0 0 58c-12-14-12-44 0-58z" fill="#EBA3AF"/>',
 duck:'<ellipse cx="38" cy="58" rx="27" ry="17" fill="#F4CF5E"/><circle cx="52" cy="32" r="15" fill="#F4CF5E"/><path d="M65 30l11 4-11 5z" fill="#F4A05A"/><circle cx="56" cy="29" r="2.200" fill="#3A2C24"/><path d="M12 54l-10-8 4 16z" fill="#F4CF5E"/><path d="M26 54q12 10 24 0" fill="none" stroke="#E0B23F" stroke-width="3"/>',
 rocket:'<path d="M40 4c14 14 17 34 12 52H28C23 38 26 18 40 4z" fill="#F2E9DE"/><path d="M40 4c6 6 10 13 12 20H28c2-7 6-14 12-20z" fill="#E8798A"/><circle cx="40" cy="36" r="8" fill="#7FB4E0" stroke="#C9A06C" stroke-width="3"/><path d="M28 44L14 62l16-4zM52 44l14 18-16-4z" fill="#F4A05A"/><path d="M32 58h16l-8 18z" fill="#F4CF5E"/>',
 train:'<rect x="8" y="34" width="44" height="28" rx="4" fill="#7FC29B"/><rect x="42" y="18" width="28" height="44" rx="4" fill="#E8798A"/><rect x="48" y="24" width="16" height="14" rx="2" fill="#E6F3FA"/><rect x="16" y="22" width="10" height="14" fill="#F4CF5E"/><circle cx="20" cy="68" r="8" fill="#4E5468"/><circle cx="56" cy="68" r="8" fill="#4E5468"/><circle cx="20" cy="68" r="3" fill="#F4CF5E"/><circle cx="56" cy="68" r="3" fill="#F4CF5E"/>',
 plant:'<path d="M26 54h28l-4 24H30z" fill="#F4A05A"/><path d="M40 54c0-22-2-30-12-40 12 2 16 12 14 24 2-14 10-22 18-22-4 12-10 24-16 38z" fill="#7FC29B"/><path d="M40 54C34 44 26 40 16 40c6 8 14 14 24 14z" fill="#5FAE80"/>',
 giraffe:'<path d="M26 74V40h24v34h-6V52H32v22z" fill="#F4CF5E"/><path d="M44 42V14h10v28z" fill="#F4CF5E"/><ellipse cx="54" cy="14" rx="12" ry="8" fill="#F4CF5E"/><circle cx="56" cy="12" r="1.8" fill="#3A2C24"/><path d="M50 7V2M56 7V2" stroke="#C9A06C" stroke-width="2.500"/><g fill="#D9963F"><circle cx="34" cy="48" r="3.500"/><circle cx="44" cy="54" r="3"/><circle cx="49" cy="26" r="2.500"/><circle cx="48" cy="38" r="2.500"/></g>',
 star:'<path d="M40 10l9 19 21 3-15 15 4 21-19-10-19 10 4-21L10 32l21-3z" fill="#F4CF5E" stroke="#E0B23F" stroke-width="2"/>',
 basket:'<ellipse cx="28" cy="34" rx="15" ry="14" fill="#F6C9D0"/><circle cx="52" cy="32" r="13" fill="#BFE0D8"/><path d="M8 42h64l-7 34H15z" fill="#D9B48B"/><path d="M10 50h60M12 60h56M14 70h52" stroke="#B98A5E" stroke-width="3"/><path d="M6 42h68" stroke="#B98A5E" stroke-width="6" stroke-linecap="round"/>'
};
const toy=k=>`<svg class="ktoy" viewBox="0 0 80 80" aria-hidden="true">${TOYS[k]}</svg>`;
const KID_BLOCKS=['#EBA3AF','#F4CF5E','#7FC29B','#7FB4E0','#C3AEDD','#F4A05A'];
const nameBlocks=n=>[...n].map((c,i)=>c===' '?'<span class="kgap"></span>':`<span class="kblock" style="--c:${KID_BLOCKS[i%KID_BLOCKS.length]};--r:${[-3,2,-2,3,-1][i%5]}deg">${esc(c)}</span>`).join('');
/* a series stays together; everything else falls in by title */
const kidColl=new Intl.Collator('tr',{numeric:true,sensitivity:'base'});
const kidKeyOf=b=>b.series?.[0]||b.title;
const kidOrder=(a,b)=>kidColl.compare(kidKeyOf(a),kidKeyOf(b))||kidColl.compare(a.title,b.title);
/* books without a photo lie flat in piles; every so often a nook of toys breaks up the wall */
const KID_NOOKS=[['stack','plant'],['train'],['teddy','ball'],['rocket'],['giraffe','blocks'],['bunny','duck'],['basket','star']];
function kidShelf(L,inWk){
  const recent=[];let out='',buf=[],cells=0,nook=0;
  const add=h=>{out+=h;if(++cells%8===0)out+=`<div class="knook">${KID_NOOKS[nook++%KID_NOOKS.length].map(toy).join('')}</div>`};
  const flush=()=>{if(!buf.length)return;add(`<div class="kpile">${buf.map(b=>{const c=pileColor(b,recent);return`<button class="kspine" style="--c:${esc(c)};--cink:${inkFor(c)};--off:${hash(b.title)%9-4}px" data-act="kid-book" data-id="${esc(b.id)}" title="${esc(b.title)}">${b.fav?'<b>♥</b>':''}<span>${esc(b.title.includes(': ')?b.title.split(': ').pop():b.title)}</span></button>`}).join('')}</div>`);buf=[]};
  L.forEach(b=>{if(b.cover||b._preview){if(buf.length&&kidKeyOf(buf[0])!==kidKeyOf(b))flush();add(kidBook(b,inWk.has(b.id)))}else{if(buf.length&&(buf.length>=5||kidKeyOf(buf[0])!==kidKeyOf(b))&&b.series)flush();buf.push(b);if(buf.length>=5)flush()}});
  flush();return out;
}
/* the low shelf she can reach: books face out, toys in between, a slatted cabinet below */
function kidWeek(){
  const d=Kid.data,w=d.week,edit=Kid.canEdit(),top=`<div class="ks-top">${toy('basket')}${toy('teddy')}${toy('blocks')}<span class="ks-sign"><b>Haftanın Kitapları</b><small>${w?`${kidDate(w.start)} – ${kidDate(addDays(w.start,w.days))}`:'bu rafı birlikte hazırlayalım'}</small></span>${toy('stack')}${toy('bunny')}</div>`;
  const cab=`<div class="ks-board"></div><div class="ks-cab"><i></i><i></i></div>`;
  if(!w)return`<section class="kshelf">${top}<div class="ks-board"></div><div class="ks-empty"><p>Ulaşabileceği rafa koyacağınız 5-6 kitabı seçin. Sesli, uyku, dokunma gibi farklı türlerden önereyim, siz değiştirin.</p>${edit?'<button class="btn primary" data-act="kid-plan">Bu rafı hazırla</button>':''}</div>${cab}</section>`;
  const items=w.items.map(id=>Kid.book(id)).filter(Boolean),over=todayISO()>=addDays(w.start,w.days),T=['duck','ball','stack','teddy'];let rows='';
  const per=document.documentElement.dataset.view==='mobile'?3:6;for(let i=0,r=0;i<items.length;i+=per,r++){const row=items.slice(i,i+per).map(b=>`<div class="kwitem">${kidBook(b,false,true)}${edit?`<button class="kdid" data-act="kid-read" data-id="${esc(b.id)}">Okuduk</button>`:''}</div>`);row.splice(Math.min(1+r%2,row.length),0,toy(T[r%T.length]));rows+=`<div class="ks-board"></div><div class="ks-row">${row.join('')}</div>`}
  return`<section class="kshelf">${top}${over?'<p class="ks-due">Raf değişme zamanı geldi. Kitaplarını özlemiş olabilir.</p>':''}${rows}${edit?`<div class="ks-act"><button class="btn" data-act="kid-plan">${over?'Rafı değiştir':'Planı düzenle'}</button></div>`:''}${cab}</section>`;
}
S.kq='';S.ktag='';S.kage='';S.kseries='';S.klist='';
function vKid(){
  const k=Kid.cur();if(!Kid.data||!k)return`<div class="banner"><span class="busy"><span class="spin"></span>Çocuk rafı açılıyor…</span></div>`;
  const d=Kid.data,sibs=(Kid.idx||[]).filter(x=>x.parents?.some(p=>k.parents.includes(p))),inWk=new Set(d.week?.items||[]);
  const q=norm(S.kqk||''),L=d.books.filter(b=>(!S.ktag||b.tags?.includes(S.ktag))&&(!S.kage||b.age===S.kage)&&(!S.kseries||b.series?.includes(S.kseries))&&(!S.klist||d.lists.find(l=>l.id===S.klist)?.items.includes(b.id))&&(!q||norm([b.title,b.author,b.publisher,(b.series||[]).join(' '),b.about].join(' ')).includes(q))).sort(kidOrder);
  const series=[...new Set(d.books.flatMap(b=>b.series||[]))].sort(cmp);
  const chip=(act,v,l,cur)=>`<button class="chip" data-act="${act}" data-v="${esc(v)}" aria-pressed="${cur===v}">${esc(l)}</button>`;
  const month=todayISO().slice(0,7),ml=(d.log||[]).filter(x=>x.d.startsWith(month)),cnt={};ml.forEach(x=>cnt[x.b]=(cnt[x.b]||0)+1);const top=Object.entries(cnt).sort((a,b)=>b[1]-a[1])[0];
  return`<div class="khead"><span class="kav">${avatarSVG(k.avatar)||esc(initial(k.name))}</span><div><h2 class="kname" aria-label="${esc(k.name)}">${nameBlocks(k.name)}</h2><p class="muted">${d.books.length} kitap · ${series.length} seri${ml.length?` · bu ay ${ml.length} kez okudunuz${top&&Kid.book(top[0])?`, en çok: ${esc(Kid.book(top[0]).title)}`:''}`:''}</p></div>${Kid.canEdit()?'<button class="btn primary" data-act="kid-new">Kitap ekle</button>':''}</div>
  ${sibs.length>1?`<div class="chips" style="margin-bottom:10px">${sibs.map(s=>`<button class="chip" data-act="kid-open" data-id="${esc(s.id)}" aria-pressed="${s.id===k.id}">${esc(s.name)}</button>`).join('')}</div>`:''}
  ${kidWeek()}
  <div class="ktools"><input type="text" id="kid-q" value="${esc(S.kqk||'')}" placeholder="Kitap, yazar ya da konu ara" autocomplete="off">${series.length?`<select id="kid-series" aria-label="Seri"><option value="">Tüm seriler</option>${series.map(s=>`<option ${S.kseries===s?'selected':''}>${esc(s)}</option>`).join('')}</select>`:''}${d.lists.length?`<select id="kid-list" aria-label="Okuma listesi"><option value="">Tüm kitaplar</option>${d.lists.map(l=>`<option value="${esc(l.id)}" ${S.klist===l.id?'selected':''}>${esc(l.name)}</option>`).join('')}</select>`:''}</div>
  <h3 class="kroom-h">Bütün kitaplar</h3><div class="chips kchips ktoychips">${chip('kid-tag','','Hepsi',S.ktag)}${Object.entries(KID_TAGS).map(([t,l])=>chip('kid-tag',t,l,S.ktag)).join('')}</div>
  <div class="chips kchips"><span class="muted" style="white-space:nowrap;align-self:center">Yaş:</span>${chip('kid-age','','Tümü',S.kage)}${KID_AGES.map(a=>chip('kid-age',a,a,S.kage)).join('')}</div>
  <div class="krack"><div class="krack-top" aria-hidden="true">${['#EBA3AF','#F4CF5E','#7FC29B','#7FB4E0','#C3AEDD','#F4A05A','#EBA3AF','#F4CF5E','#7FC29B','#7FB4E0'].map(c=>`<i style="--c:${c}"></i>`).join('')}</div><div class="kids-grid" id="kid-grid">${kidShelf(L,inWk)||'<div class="empty">Bu seçimde kitap yok.</div>'}</div></div><div class="kfloor">${toy('giraffe')}${toy('train')}${toy('ball')}${toy('duck')}${toy('basket')}${toy('plant')}</div>`;
}
function openKidBook(id){
  const b=Kid.book(id);if(!b)return;const d=Kid.data,edit=Kid.canEdit(),wk=d.week?.items.includes(id);
  openSheet(`<div class="sheet-h"><h2>${esc(b.title)}</h2><button class="x" data-act="close" aria-label="Kapat">×</button></div>
  <div class="sheet-b"><div class="ed-top"><div>${edit?`<button class="kcovbtn" data-act="kid-cmenu" aria-expanded="false" aria-label="Kapak seçenekleri">${kidCover(b,true)}<span class="kcovtag">${ico('camera')}</span></button>`:kidCover(b,true)}</div><div style="min-width:0;display:grid;gap:6px;align-content:start"><div class="rmeta">${[b.author,b.publisher,...(b.series||[])].filter(Boolean).map(x=>`<span>${esc(x)}</span>`).join('')}</div><div class="rmeta">${(b.tags||[]).map(t=>`<span class="tag2">${esc(KID_TAGS[t]||t)}</span>`).join('')}${b.age?`<span class="tag2">${esc(b.age)} yaş</span>`:''}</div><p class="muted" style="margin:0">${b.reads?`${b.reads} kez okundu${b.lastRead?`, son: ${kidDate(b.lastRead)}`:''}`:'Henüz okundu işareti yok.'}</p></div></div>
  ${edit?`<div id="kcmenu" class="kcmenu" hidden><div class="pcrow"><label class="btn">Yeni fotoğraf yükle<input type="file" id="kb-photo" data-id="${esc(id)}" accept="image/*" hidden></label>${b.cover?`<button class="btn" data-act="kid-crop" data-id="${esc(id)}">Fotoğrafı düzenle</button>`:''}<button class="btn ghost" data-act="kid-url" data-id="${esc(id)}">İnternet adresiyle ekle</button>${b.cover?`<button class="btn danger ghost" data-act="kid-nocover" data-id="${esc(id)}">Kaldır</button>`:''}</div><form id="ku-form" data-id="${esc(id)}" class="pcrow" hidden><input id="ku-in" type="url" placeholder="https://… resim adresi" style="flex:1;min-width:0"><button class="btn" type="submit">Ekle</button></form></div>`:''}
  ${b.about?`<div class="about">${esc(b.about)}</div>`:''}${b.note?`<p class="rtext">${esc(b.note)}</p>`:''}
  ${edit?`<div class="pcrow"><button class="btn primary" data-act="kid-read" data-id="${esc(id)}">Okuduk</button><button class="btn" data-act="kid-fav" data-id="${esc(id)}">${b.fav?'♥ En sevdikleri':'♡ En sevdiklerine ekle'}</button><button class="btn" data-act="kid-toweek" data-id="${esc(id)}">${wk?'Bu haftadan çıkar':'Bu haftaya ekle'}</button></div>
  <div class="field"><span class="lbl">Okuma listeleri</span><div class="gchips">${d.lists.map(l=>`<button type="button" class="gchip" data-act="kid-inlist" data-id="${esc(id)}" data-l="${esc(l.id)}" aria-pressed="${l.items.includes(id)}">${esc(l.name)}</button>`).join('')}<button type="button" class="gchip" data-act="kid-newlist" data-id="${esc(id)}">+ Yeni liste</button></div></div>
  <div class="ed-foot"><button class="btn danger ghost" data-act="kid-del" data-id="${esc(id)}">Sil</button><div style="display:flex;gap:8px"><button class="btn" data-act="kid-edit" data-id="${esc(id)}">Düzenle</button></div></div>`:''}</div>`);
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
  <label class="btn ghost" style="justify-content:center">${ico('camera')}Kapak fotoğrafı<input type="file" id="kf-photo" accept="image/*" hidden></label><span class="note" id="kf-ph">${KF._blob?'Fotoğraf hazır.':''}</span>
  <div class="ed-foot"><span></span><div style="display:flex;gap:8px"><button type="button" class="btn" data-act="close">Vazgeç</button><button type="submit" class="btn primary">Kaydet</button></div></div></form>`);
}
const kfSync=()=>{if(!KF||!$('#kf-t'))return;KF.title=$('#kf-t').value;KF.author=$('#kf-a').value;KF.publisher=$('#kf-p').value;KF.series=$('#kf-s').value.split(',').map(s=>s.trim()).filter(Boolean);KF.about=$('#kf-k').value;KF.note=$('#kf-n').value};
async function kidUpload(id,b64){
  const p=`data/cocuk/kapak/${Kid.id}/${id}.jpg`;if(LOCAL)return p;
  const sha=await GH.sha(p),r=await fetch(API+p,{method:'PUT',headers:{...GH.headers(),'Content-Type':'application/json'},body:JSON.stringify({message:`${Kid.cur().name}: kapak fotoğrafı`,content:b64,branch:REPO.branch,...(sha?{sha}:{})})});if(!r.ok)throw 0;return p;
}
const kidKey=s=>slug(s);
/* straighten a crooked photo: drag the four corners onto the cover */
let KC=null;
function homography(from,to){const A=[];for(let i=0;i<4;i++){const[x,y]=from[i],[u,v]=to[i];A.push([x,y,1,0,0,0,-u*x,-u*y,u],[0,0,0,x,y,1,-v*x,-v*y,v])}
  for(let i=0;i<8;i++){let p=i;for(let r=i+1;r<8;r++)if(Math.abs(A[r][i])>Math.abs(A[p][i]))p=r;[A[i],A[p]]=[A[p],A[i]];for(let r=0;r<8;r++)if(r!==i){const f=A[r][i]/A[i][i];for(let c=i;c<9;c++)A[r][c]-=f*A[i][c]}}
  return A.map((r,i)=>r[8]/r[i])}
function drawCrop(){const{ctx,img,w,h,pts}=KC;ctx.drawImage(img,0,0,w,h);ctx.fillStyle='rgba(30,20,40,.35)';ctx.beginPath();ctx.rect(0,0,w,h);pts.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.closePath();ctx.fill('evenodd');ctx.strokeStyle='#F4CF5E';ctx.lineWidth=2;ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.closePath();ctx.stroke();pts.forEach(p=>{ctx.beginPath();ctx.arc(p[0],p[1],9,0,7);ctx.fillStyle='#E8798A';ctx.fill();ctx.lineWidth=2;ctx.strokeStyle='#fff';ctx.stroke()})}
function openKidCrop(id){
  const b=Kid.book(id),img=new Image();img.crossOrigin='anonymous';img.onload=()=>{
    const W=Math.min(560,innerWidth-48),s=W/img.naturalWidth,w=W,h=Math.round(img.naturalHeight*s),m=Math.min(w,h)*.08;
    openSheet(`<div class="sheet-h"><h2>Kapağı düzelt</h2><button class="x" data-act="close" aria-label="Kapat">×</button></div><div class="sheet-b"><p class="muted" style="margin:0">Dört noktayı kapağın köşelerine sürükle.</p><canvas id="kc" width="${w}" height="${h}" style="touch-action:none;max-width:100%;border-radius:8px"></canvas><div class="ed-foot"><button class="btn" data-act="kid-book" data-id="${esc(id)}">Vazgeç</button><button class="btn primary" data-act="kc-save">Kaydet</button></div></div>`);
    const c=$('#kc');KC={id,img,s,w,h,ctx:c.getContext('2d',{willReadFrequently:true}),pts:[[m,m],[w-m,m],[w-m,h-m],[m,h-m]],drag:-1};drawCrop();
    const pos=e=>{const r=c.getBoundingClientRect();return[(e.clientX-r.left)*w/r.width,(e.clientY-r.top)*h/r.height]};
    c.onpointerdown=e=>{const p=pos(e);let best=-1,bd=1e9;KC.pts.forEach((q,i)=>{const d=Math.hypot(q[0]-p[0],q[1]-p[1]);if(d<bd){bd=d;best=i}});if(bd<44){KC.drag=best;c.setPointerCapture(e.pointerId)}};
    c.onpointermove=e=>{if(KC?.drag<0)return;const[x,y]=pos(e);KC.pts[KC.drag]=[Math.max(0,Math.min(w,x)),Math.max(0,Math.min(h,y))];drawCrop()};c.onpointerup=()=>{if(KC)KC.drag=-1};
  };img.onerror=()=>toast('Bu fotoğraf düzenlenemiyor. Bilgisayarına indirip Yeni fotoğraf yükle ile ekle.');img.src=b._preview||b.cover;
}
async function saveCrop(){
  if(!KC)return;const{id,img,s,pts}=KC,P=pts.map(p=>[p[0]/s,p[1]/s]),dist=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]),W=Math.round(Math.min(800,Math.max(dist(P[0],P[1]),dist(P[3],P[2])))),H=Math.round(W*Math.max(dist(P[0],P[3]),dist(P[1],P[2]))/Math.max(dist(P[0],P[1]),dist(P[3],P[2])));
  const sc=document.createElement('canvas');sc.width=img.naturalWidth;sc.height=img.naturalHeight;const sx=sc.getContext('2d');sx.drawImage(img,0,0);const src=sx.getImageData(0,0,sc.width,sc.height).data,dc=document.createElement('canvas');dc.width=W;dc.height=H;const dx=dc.getContext('2d'),out=dx.createImageData(W,H),h=homography([[0,0],[W,0],[W,H],[0,H]],P);
  for(let y=0;y<H;y++)for(let x=0;x<W;x++){const z=h[6]*x+h[7]*y+1,u=Math.round((h[0]*x+h[1]*y+h[2])/z),v=Math.round((h[3]*x+h[4]*y+h[5])/z);if(u<0||v<0||u>=sc.width||v>=sc.height)continue;const a=(v*sc.width+u)*4,o=(y*W+x)*4;out.data[o]=src[a];out.data[o+1]=src[a+1];out.data[o+2]=src[a+2];out.data[o+3]=255}
  dx.putImageData(out,0,0);const data=dc.toDataURL('image/jpeg',.85);closeSheet();setKidCover(id,data,'kapak düzeltildi');
}
ACT['kid-crop']=a=>openKidCrop(a.dataset.id);ACT['kc-save']=()=>saveCrop();
/* a new cover: the photo is seen at once; the published copy takes a minute to appear */
async function setKidCover(id,data,msg){
  try{const p=await kidUpload(id,data.split(',')[1]);await Kid.change(d=>{const b=d.books.find(x=>x.id===id);if(b)b.cover=p+'?v='+Date.now()},msg);const b=Kid.book(id);if(b)b._preview=data;render();toast('Kapak güncellendi.')}catch{toast('Fotoğraf yüklenemedi. Tekrar dene.')}
}
ACT['kid-cmenu']=a=>{const m=$('#kcmenu');m.hidden=!m.hidden;a.setAttribute('aria-expanded',!m.hidden)};
ACT['kid-url']=()=>{const f=$('#ku-form');f.hidden=false;$('#ku-in').focus()};
ACT['kid-nocover']=a=>{if(!a.dataset.sure){a.dataset.sure='1';a.textContent='Emin misin? Evet';return}const id=a.dataset.id;closeSheet();Kid.change(d=>{const b=d.books.find(x=>x.id===id);if(b)delete b.cover},'kapak kaldırıldı').then(()=>{const b=Kid.book(id);if(b)delete b._preview;render()})};
document.addEventListener('change',async e=>{if(e.target.id!=='kb-photo')return;const f=e.target.files[0],id=e.target.dataset.id;if(!f)return;closeSheet();toast('Fotoğraf yükleniyor…');const r=await resizeImg(f,900,.82);setKidCover(id,r.data,'yeni kapak')});
document.addEventListener('submit',e=>{if(e.target.id!=='ku-form')return;e.preventDefault();const u=$('#ku-in').value.trim(),id=e.target.dataset.id;if(!/^https:\/\//.test(u))return toast('https ile başlayan bir resim adresi yapıştır.');closeSheet();Kid.change(d=>{const b=d.books.find(x=>x.id===id);if(b)b.cover=u},'internetten kapak').then(ok=>{if(ok)toast('Kapak eklendi.')})});
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
