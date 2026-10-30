/* ---------- live search, the shared Discover list, friends' scores ---------- */
let searchSeq=0,searchT=null;
const wikiOf=async(q,re)=>{
  try{const r=await fetch('https://en.wikipedia.org/w/api.php?action=query&generator=prefixsearch&gpslimit=12&prop=pageimages|description&piprop=thumbnail&pithumbsize=300&format=json&origin=*&gpssearch='+encodeURIComponent(q));
    const j=await r.json();return Object.values(j.query?.pages||{}).sort((a,b)=>(a.index||0)-(b.index||0)).filter(p=>re.test(p.description||'')).map(p=>({title:p.title.replace(/\s*\([^)]*\)\s*$/,''),year:+((p.description||'').match(/\b(19|20)\d\d\b/)||[])[0]||'',cover:p.thumbnail?.source||'',about:p.description||'',author:''}))}catch{return[]}
};
async function searchFilm(q){
  if(KEYS.tmdb){try{const r=await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${KEYS.tmdb}&language=tr-TR&query=${encodeURIComponent(q)}`);const j=await r.json();
    const list=(j.results||[]).filter(x=>x.media_type==='movie'||x.media_type==='tv').slice(0,8).map(x=>({title:x.title||x.name,year:+(x.release_date||x.first_air_date||'').slice(0,4)||'',cover:x.poster_path?`https://image.tmdb.org/t/p/w342${x.poster_path}`:'',about:(x.overview||'').slice(0,260),format:x.media_type==='tv'?'dizi':'film',imdb:x.vote_average?+x.vote_average.toFixed(1):''}));if(list.length)return list}catch{}}
  const[tv,wk]=await Promise.all([fetch('https://api.tvmaze.com/search/shows?q='+encodeURIComponent(q)).then(r=>r.json()).catch(()=>[]),wikiOf(q,/film|series|show|miniseries/i)]);
  const shows=(tv||[]).slice(0,5).map(({show:s})=>({title:s.name,year:+(s.premiered||'').slice(0,4)||'',cover:(s.image?.medium||'').replace('http://','https://'),about:(s.summary||'').replace(/<[^>]+>/g,'').slice(0,260),format:'dizi',imdbId:s.externals?.imdb||''}));
  return[...wk.map(w=>({...w,format:/series|show/i.test(w.about)?'dizi':'film'})),...shows];
}
async function searchGame(q){
  if(KEYS.rawg){try{const r=await fetch(`https://api.rawg.io/api/games?key=${KEYS.rawg}&page_size=8&search=${encodeURIComponent(q)}`);const j=await r.json();
    const list=(j.results||[]).map(g=>({title:g.name,year:+(g.released||'').slice(0,4)||'',cover:g.background_image||'',pages:g.playtime||'',genre:g.genres?.[0]?.name||'',about:''}));if(list.length)return list}catch{}}
  return wikiOf(q,/video game|game/i);
}
const searchMedia=q=>curArea()==='film'?searchFilm(q):curArea()==='game'?searchGame(q):searchBooks(q);
function paintResults(res,loading){
  const el=$('#ed-results');if(!el)return;
  if(loading){el.innerHTML='<div class="busy"><span class="spin"></span>Aranıyor…</div>';return}
  if(!res?.length){el.innerHTML='<p class="note">Sonuç bulunamadı; bilgileri elle doldurabilirsin.</p>';return}
  el.innerHTML=`<div class="results">${res.map((r,i)=>`<button type="button" class="res" data-act="ed-pick" data-i="${i}">${r.cover?`<img src="${esc(r.cover)}" alt="" loading="lazy" referrerpolicy="no-referrer">`:'<i></i>'}<span><b>${esc(r.title)}</b>${esc([r.author,r.year,r.pages?r.pages+' '+A().unit:''].filter(Boolean).join(' · '))}</span></button>`).join('')}</div>`;
}
document.addEventListener('input',e=>{
  if(e.target.id==='f-title'&&F&&F._new){clearTimeout(searchT);searchT=setTimeout(fetchInfo,420)}
  if(e.target.id==='f-rate10'){const o=$('#o-rate');if(o)o.textContent=String(e.target.value).replace('.',',')}
  if(e.target.id==='k-q'){S.kq=e.target.value;S.klimit=60;paintK()}
});

/* everyone's lists, read from the published files; the viewer's own list always comes from memory */
const Peers={data:{},kesfet:{films:[],games:[]},ready:false,loading:null,
  ensure(){
    if(this.ready)return Promise.resolve();
    return this.loading=this.loading||(async()=>{
      await Promise.all(S.people.map(async p=>{try{const r=await fetch(`data/kitapliklar/${p.id}.json?_=${Date.now()}`,{cache:'no-store'});if(!r.ok)return;const d=await r.json();this.data[p.id]={book:d.books||[],film:d.films||[],game:d.games||[],pet:d.pet||null}}catch{}}));
      try{const r=await fetch(`data/kesfet.json?_=${Date.now()}`,{cache:'no-store'});if(r.ok)this.kesfet=await r.json()}catch{}
      this.ready=true;
    })();
  },
  list(pid,a){if(pid===S.viewing&&Store.lists){Store.sync();return Store.lists[a]}return this.data[pid]?.[a]||[]},
  pet(pid){return pid===S.viewing?Store.extra?.pet:this.data[pid]?.pet}
};
const itemKey=b=>b.imdbId||norm(b.title)+'|'+(b.year||'');
const pName=personName;
/* key -> {item, who:{person:{rating,status}}} */
function catalog(a){
  const map=new Map(),put=(b,pid)=>{const k=itemKey(b);let e=map.get(k);if(!e){e={k,item:b,who:{}};map.set(k,e)}if(!e.item.coverUrl&&b.coverUrl)e.item=b;if(pid)e.who[pid]={rating:b.rating,status:b.status}};
  S.people.forEach(p=>Peers.list(p.id,a).forEach(b=>put(b,p.id)));
  (a==='film'?Peers.kesfet.films:Peers.kesfet.games||[]).forEach(b=>put(b,null));
  return[...map.values()];
}
function peerScores(b){
  if(curArea()==='book'||!Peers.ready)return'';const k=itemKey(b),row=S.people.map(p=>{const x=Peers.list(p.id,curArea()).find(i=>itemKey(i)===k);if(!x)return'';return `<span class="pscore"><i style="background:${esc(p.color||'#ddd')}">${esc(initial(p.name))}</i>${esc(p.name)} <b>${x.status==='skip'?A().status.skip:x.rating?String(x.rating).replace('.',','):'–'}</b></span>`}).join('');
  return row?`<div class="pscores">${row}</div>`:'';
}
S.kq='';S.kfmt='all';S.kmine='all';S.ksort='score';S.klimit=60;
function kList(){
  const a=curArea(),me=S.me,q=norm(S.kq||'');
  let L=catalog(a).filter(e=>(S.kfmt==='all'||e.item.format===S.kfmt)&&(!q||norm(e.item.title+' '+(e.item.author||'')).includes(q))&&(S.kmine==='all'||(S.kmine==='todo'&&!e.who[me])||(S.kmine==='mine'&&e.who[me])));
  const avg=e=>{const n=Object.values(e.who).map(w=>+w.rating).filter(Boolean);return n.length?n.reduce((x,y)=>x+y,0)/n.length:0};
  const by={score:(x,y)=>(+y.item.imdb||avg(y))-(+x.item.imdb||avg(x)),avg:(x,y)=>avg(y)-avg(x),name:(x,y)=>cmp(x.item.title,y.item.title),year:(x,y)=>(+y.item.year||0)-(+x.item.year||0)}[S.ksort];
  return L.sort(by);
}
function kcard(e){
  const b=e.item,sc=S.people.filter(p=>e.who[p.id]).map(p=>{const w=e.who[p.id];return `<span class="pscore mini"><i style="background:${esc(p.color||'#ddd')}">${esc(initial(p.name))}</i><b>${w.status==='skip'?'✕':w.rating?String(w.rating).replace('.',','):'•'}</b></span>`}).join('');
  return `<button class="kcard" data-act="k-open" data-k="${esc(e.k)}">${coverHTML({...b,status:''})}<div class="kbody"><b>${esc(b.title)}</b><span class="muted">${esc([b.yearLabel||b.year,b.author].filter(Boolean).join(' · '))}</span>${b.imdb?`<span class="imdb">IMDb ${String(b.imdb).replace('.',',')}</span>`:''}<div class="kscores">${sc||'<span class="muted">Henüz kimse izlemedi</span>'}</div></div></button>`;
}
function paintK(){const g=$('#kgrid');if(!g)return;const L=kList(),a=L.slice(0,S.klimit);g.innerHTML=a.map(kcard).join('')||`<div class="empty">Sonuç yok.</div>`;const m=$('#kmore');if(m)m.hidden=L.length<=S.klimit;const c=$('#kcount');if(c)c.textContent=`${L.length} ${A().item}`}
function vKesfet(){
  if(!Peers.ready){Peers.ensure().then(()=>{if(S.tab==='kesfet')render()});return `<div class="banner"><span class="busy"><span class="spin"></span>Herkesin rafı toplanıyor…</span></div>`}
  setTimeout(paintK);
  const chip=(k,l,act,cur)=>`<button class="chip" data-act="${act}" data-v="${k}" aria-pressed="${cur===k}">${l}</button>`;
  return `<div class="head"><h2 class="hand">Keşfet</h2><span class="muted" id="kcount"></span></div>
  <div class="ktools"><input type="text" id="k-q" value="${esc(S.kq)}" placeholder="Ad ya da ${A().who.toLocaleLowerCase('tr')} ara" autocomplete="off">
    <select id="k-sort" aria-label="Sırala">${[['score','En yüksek puan'],['avg','Arkadaş ortalaması'],['year','En yeni'],['name','Ada göre']].map(([k,l])=>`<option value="${k}" ${S.ksort===k?'selected':''}>${l}</option>`).join('')}</select></div>
  <div class="chips kchips">${chip('all','Tümü','k-fmt',S.kfmt)}${Object.entries(A().formats).map(([k,l])=>chip(k,l,'k-fmt',S.kfmt)).join('')}<span class="ksep"></span>${chip('all','Hepsi','k-mine',S.kmine)}${chip('todo','Benim görmediklerim','k-mine',S.kmine)}${chip('mine','Benimkiler','k-mine',S.kmine)}</div>
  <div class="kgrid" id="kgrid"></div><div class="bactions"><button class="btn" id="kmore" data-act="k-more" hidden>Daha fazla göster</button></div>`;
}
function myCopy(b,extra){const{id,kind,rating,review,status,startDate,endDate,updatedAt,owned,fromTbr,...rest}=b;return{id:id&&!Store.lists[curArea()].some(x=>x.id===id)?id:newId(),...rest,owned:false,rating:0,...extra}}
function openCatalog(k){
  const e=catalog(curArea()).find(x=>x.k===k);if(!e)return;const b=e.item,mine=S.canEdit?S.books.find(x=>itemKey(x)===k):null;
  const others=S.people.filter(p=>e.who[p.id]).map(p=>{const w=e.who[p.id];return `<div class="kwho"><i style="background:${esc(p.color||'#ddd')}">${esc(initial(p.name))}</i><span>${esc(p.name)}</span><b>${w.status==='skip'?A().status.skip:w.rating?String(w.rating).replace('.',','):A().status[w.status]||''}</b></div>`}).join('');
  S.kOpen=e;
  openSheet(`<div class="sheet-h"><h2>${esc(A().Item)}</h2><button class="x" data-act="close" aria-label="Kapat">×</button></div>
  <div class="sheet-b"><div class="ed-top"><div>${coverHTML({...b,status:''})}</div><div style="min-width:0;display:grid;gap:6px;align-content:start">
    <h3 style="font-family:var(--f-display);font-weight:400;font-size:1.3rem;line-height:1.2">${esc(b.title)}</h3><div class="rmeta">${[b.yearLabel||b.year,b.author,b.genre,b.imdb?'IMDb '+String(b.imdb).replace('.',','):''].filter(Boolean).map(x=>`<span>${esc(x)}</span>`).join('')}</div>
    ${b.imdbId?`<a class="note" href="https://www.imdb.com/title/${esc(b.imdbId)}/" target="_blank" rel="noopener">IMDb sayfası</a>`:''}</div></div>
  ${others?`<div class="kwhos">${others}</div>`:'<p class="muted">Henüz kimse izlemedi. İlk sen ol.</p>'}
  ${S.canEdit?(mine?`<button class="btn primary" data-act="open" data-id="${mine.id}">Kaydımı düzenle</button>`:`<div class="seg">${Object.entries({read:A().status.read,want:A().status.want,skip:A().status.skip}).map(([k2,l])=>`<button type="button" data-act="k-add" data-s="${k2}">${l}</button>`).join('')}</div>`):''}</div>`);
}
Object.assign(ACT,{
  'k-open':a=>openCatalog(a.dataset.k),'k-more':()=>{S.klimit+=60;paintK()},
  'k-fmt':a=>{S.kfmt=a.dataset.v;S.klimit=60;render()},'k-mine':a=>{S.kmine=a.dataset.v;S.klimit=60;render()},
  'k-add':a=>{const s=a.dataset.s,b=S.kOpen?.item;if(!b)return;const c=myCopy(b,{status:s});closeSheet();
    if(s==='read')return openEditor({...c,endDate:todayISO()});Store.saveBook(c);toast(`“${b.title}” eklendi.`);paintK()}
});
document.addEventListener('change',e=>{if(e.target.id==='k-sort'){S.ksort=e.target.value;paintK()}});
function areaWords(h){
  if(curArea()==='book')return h;const a=A(),film=curArea()==='film';
  return h.replaceAll('Kitap <span>bingo',a.Item+' <span>bingo').replaceAll('Kitap Bingo',a.Item+' Bingo').replaceAll(' kitap',' '+a.item).replaceAll('Okunan sayfa','Toplam '+a.unit).replaceAll('okuduğun',film?'izlediğin':'oynadığın').replaceAll('okunan tür',film?'izlenen tür':'oynanan tür').replaceAll('kitabı eşleştir',a.item+' eşleştir');
}
