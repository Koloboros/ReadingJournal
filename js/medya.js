/* ---------- live search, the shared Discover list, friends' scores ---------- */
let searchSeq=0,searchT=null;
const wikiOf=async(q,re)=>{
  try{const r=await fetch('https://en.wikipedia.org/w/api.php?action=query&generator=prefixsearch&gpslimit=12&prop=pageimages|description&piprop=thumbnail&pithumbsize=300&format=json&origin=*&gpssearch='+encodeURIComponent(q));
    const j=await r.json();return Object.values(j.query?.pages||{}).sort((a,b)=>(a.index||0)-(b.index||0)).filter(p=>re.test(p.description||'')).map(p=>({title:p.title.replace(/\s*\([^)]*\)\s*$/,''),year:+((p.description||'').match(/\b(19|20)\d\d\b/)||[])[0]||'',cover:p.thumbnail?.source||'',about:p.description||'',author:''}))}catch{return[]}
};
const TMDB_GENRE={28:'Aksiyon',12:'Macera',16:'Animasyon',35:'Komedi',80:'Suç',99:'Belgesel',18:'Drama',10751:'Aile',14:'Fantastik',36:'Tarih',27:'Korku',10402:'Müzikal',9648:'Gizem',10749:'Romantik',878:'Bilim kurgu',53:'Gerilim',10752:'Savaş',37:'Tarih',10759:'Aksiyon',10762:'Aile',10764:'Belgesel',10765:'Bilim kurgu',10766:'Drama',10768:'Savaş'};
const tmdbGenre=ids=>{const g=(ids||[]).map(i=>TMDB_GENRE[i]).filter(Boolean);return g.find(x=>x!=='Animasyon')||g[0]||''};
async function searchFilm(q){
  if(KEYS.tmdb){try{const r=await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${KEYS.tmdb}&language=tr-TR&query=${encodeURIComponent(q)}`);const j=await r.json();
    const list=(j.results||[]).filter(x=>x.media_type==='movie'||x.media_type==='tv').slice(0,8).map(x=>({title:x.title||x.name,year:+(x.release_date||x.first_air_date||'').slice(0,4)||'',cover:x.poster_path?`https://image.tmdb.org/t/p/w342${x.poster_path}`:'',about:(x.overview||'').slice(0,260),format:(x.genre_ids||[]).includes(16)?'animasyon':x.media_type==='tv'?'dizi':'film',genre:tmdbGenre(x.genre_ids),imdb:x.vote_average?+x.vote_average.toFixed(1):''}));if(list.length)return list}catch{}}
  const[tv,wk]=await Promise.all([fetch('https://api.tvmaze.com/search/shows?q='+encodeURIComponent(q)).then(r=>r.json()).catch(()=>[]),wikiOf(q,/film|series|show|miniseries/i)]);
  const shows=(tv||[]).slice(0,5).map(({show:s})=>({title:s.name,year:+(s.premiered||'').slice(0,4)||'',cover:(s.image?.medium||'').replace('http://','https://'),about:(s.summary||'').replace(/<[^>]+>/g,'').slice(0,260),format:'dizi',imdbId:s.externals?.imdb||''}));
  return[...wk.map(w=>({...w,format:/series|show/i.test(w.about)?'dizi':'film'})),...shows];
}
const RAWG_GENRE={Action:'Aksiyon',Adventure:'Macera',RPG:'RPG',Strategy:'Strateji',Simulation:'Simülasyon',Puzzle:'Bulmaca',Platformer:'Platform',Racing:'Yarış',Sports:'Spor',Fighting:'Dövüş',Shooter:'Nişancı',Indie:'Indie',Casual:'Cozy'};
async function searchGame(q){
  if(KEYS.rawg){try{const r=await fetch(`https://api.rawg.io/api/games?key=${KEYS.rawg}&page_size=8&search=${encodeURIComponent(q)}`);const j=await r.json();
    const list=(j.results||[]).map(g=>({title:g.name,year:+(g.released||'').slice(0,4)||'',cover:g.background_image||'',pages:g.playtime||'',genre:RAWG_GENRE[g.genres?.[0]?.name]||g.genres?.[0]?.name||'',about:''}));if(list.length)return list}catch{}}
  return wikiOf(q,/video game|game/i);
}
function keysForm(){return `<form class="field" id="keys-form"><span class="lbl">Arama anahtarları</span><p class="note" style="margin:0">Daha iyi arama sonuçları ve kapaklar için. Bu cihazda saklanır, repoya yazılmaz, kurulum bağlantısıyla arkadaşlarına geçer.</p>
  <input type="password" id="key-tmdb" autocomplete="off" placeholder="TMDB anahtarı" value="${esc(KEYS.tmdb)}" aria-label="TMDB anahtarı"><input type="password" id="key-rawg" autocomplete="off" placeholder="RAWG anahtarı" value="${esc(KEYS.rawg)}" aria-label="RAWG anahtarı"><input type="password" id="key-gb" autocomplete="off" placeholder="Google Books anahtarı" value="${esc(KEYS.googleBooks)}" aria-label="Google Books anahtarı"><button class="btn" type="submit">Arama anahtarlarını kaydet</button></form>`}
document.addEventListener('submit',e=>{if(e.target.id!=='keys-form')return;saveKeys({tmdb:$('#key-tmdb').value.trim(),rawg:$('#key-rawg').value.trim(),googleBooks:$('#key-gb').value.trim()});toast('Arama anahtarları bu cihaza kaydedildi.');openSetup()});
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
/* same work on two people's lists; editions and subtitles differ, so books also match on title start + author */
function sameItem(a,b){
  if(a.imdbId&&b.imdbId)return a.imdbId===b.imdbId;const t=norm(a.title),u=norm(b.title);if(!t||!u)return false;
  if(t===u)return curArea()==='book'||!a.year||!b.year||Math.abs(a.year-b.year)<=1;
  return curArea()==='book'&&!!a.author&&sameTitle(a.title,b.title)&&surname(a.author)===surname(b.author);
}
const peerRows=b=>!Peers.ready||!b?.title?[]:S.people.filter(p=>p.id!==S.viewing).map(p=>{const x=Peers.list(p.id,curArea()).find(i=>sameItem(i,b));return x&&{p,x}}).filter(Boolean);
const peerScore=x=>x.status==='skip'?A().status.skip:x.rating?String(x.rating).replace('.',',')+'/'+A().scale:A().status[x.status]||'–';
const peerDot=p=>`<i style="background:${esc(p.color||'#ddd')}">${esc(initial(p.name))}</i>`;
function peerScores(b){
  const row=peerRows(b).map(({p,x})=>`<span class="pscore">${peerDot(p)}${esc(p.name)} <b>${esc(peerScore(x))}</b></span>`).join('');
  return row?`<div class="pscores">${row}</div>`:'';
}
function itemTabs(b){
  if(b._new&&!peerRows(b).length)return'';const n=peerRows(b).filter(r=>(r.x.review||'').trim()).length;
  return `<div class="seg itabs"><button type="button" data-act="item-tab" data-t="me" aria-pressed="true">Bilgiler</button><button type="button" data-act="item-tab" data-t="fr" aria-pressed="false">Arkadaş Yorumu${n?` (${n})`:''}</button></div>`;
}
function friendPanel(b){
  const rows=peerRows(b);
  return `<div class="frpanel">${rows.length?rows.map(({p,x})=>`<article class="fritem">${peerDot(p)}<div><div class="frhead"><b>${esc(p.name)}</b><span>${esc(peerScore(x))}</span></div>${(x.review||'').trim()?`<p>${esc(x.review)}</p>`:'<p class="muted">Yorum yazmamış.</p>'}</div></article>`).join(''):`<p class="muted">${Peers.ready?`Bu ${A().item} henüz arkadaşlarının rafında yok.`:'Arkadaşların yükleniyor…'}</p>`}</div>`;
}
ACT['item-tab']=a=>{$('#sheet').classList.toggle('show-fr',a.dataset.t==='fr');document.querySelectorAll('.itabs button').forEach(x=>x.setAttribute('aria-pressed',x===a))};
/* titles the viewer has no record of: friends' lists plus Discover, always current, stored nowhere */
S.ulimit=60;
function unratedSec(sec,T){
  if(!Peers.ready)return`<section class="notebook"><div class="busy"><span class="spin"></span>Oylamadıkların toplanıyor…</div></section>`;
  const mine=new Set(BOOKS().map(itemKey)),L=catalog('film').filter(e=>!mine.has(e.k)&&!BOOKS().some(b=>sameItem(b,e.item))).sort((x,y)=>cmp(x.item.title,y.item.title)),a=L.slice(0,S.ulimit);
  const rows=a.map((e,i)=>`<li class="trow" style="--c:${PCOLS[i%PCOLS.length]}"><button class="chk" data-act="u-seen" data-k="${esc(e.k)}" aria-label="${esc(e.item.title)}: ${T.unrated[3]}" title="${T.unrated[3]}">${ico('tick',3)}</button><button class="tt" data-act="k-open" data-k="${esc(e.k)}">${esc(e.item.title)}<small>${esc([e.item.yearLabel||e.item.year,e.item.author].filter(Boolean).join(' · '))}</small></button><button class="mini" data-act="u-want" data-k="${esc(e.k)}">İstiyorum</button></li>`).join('');
  return sec([T.unrated[0],L.length+' '+T.unrated[1],T.unrated[2],T.unrated[3],T.unrated[4]],L,shelfIllu(1),rows)+(L.length>S.ulimit?'<div class="bactions"><button class="btn" data-act="u-more">Daha fazla göster</button></div>':'');
}
const unratedPick=a=>catalog('film').find(x=>x.k===a.dataset.k)?.item;
Object.assign(ACT,{'u-more':()=>{S.ulimit+=60;render()},
  'u-seen':a=>{const b=unratedPick(a);if(b)openEditor({...myCopy(b,{status:'read'}),endDate:todayISO()})},
  'u-want':a=>{const b=unratedPick(a);if(b){Store.saveBook(myCopy(b,{status:'want'}));toast(`“${b.title}” izlemek istediklerine eklendi.`)}}});
/* film boxes pile up by genre on low TV stands; friendly colours, never the same twice in a row */
const pileColor=(b,recent)=>{let c=b.color||autoColor(b.title),k=PCOLS.indexOf(c);while(recent.includes(c)&&k>=0){k=(k+5)%PCOLS.length;c=PCOLS[k]}recent.splice(0,2,c,recent[0]);return c};
/* biggest genre first; a genre longer than size spills into the next pile */
const byGenre=(list,size)=>{const m=new Map();list.forEach(b=>{const g=genreOf(b);if(!m.has(g))m.set(g,[]);m.get(g).push(b)});return[...m].sort((x,y)=>(x[0]==='Türsüz')-(y[0]==='Türsüz')||y[1].length-x[1].length||cmp(x[0],y[0])).flatMap(([g,a])=>{const o=[];for(let i=0;i<a.length;i+=size)o.push({g,n:a.length,first:!i,items:a.slice(i,i+size)});return o})};
const TVSET=`<svg class="tvset" viewBox="0 0 150 120" aria-hidden="true"><rect x="6" y="6" width="138" height="92" rx="9" fill="var(--wood-2)"/><rect x="14" y="14" width="122" height="76" rx="5" fill="#3B4A5C"/><path d="M14 90 136 14v76z" fill="#fff" opacity=".06"/><path d="M28 30q20-10 42-6" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".28"/><rect x="62" y="98" width="26" height="12" fill="var(--wood-2)"/><rect x="42" y="109" width="66" height="7" rx="3" fill="var(--wood-2)"/></svg>`;
/* film, series and animation never share a stand; stats can be cut the same way */
S.fmt='film';S.statFmt='all';S.filmAll=true;
const yearChips=()=>`<div class="chips"><button class="chip" data-act="film-all" data-v="1" aria-pressed="${S.filmAll}">Tüm yıllar</button><button class="chip" data-act="film-all" data-v="" aria-pressed="${!S.filmAll}">${S.year}</button></div>`;
function seyirBar(L){return `<div class="seyirbar"><div class="fmtbar" role="group" aria-label="Tip">${[['all','Tümü'],...Object.entries(A().formatsPl)].map(([k,l])=>`<button data-act="stat-fmt" data-v="${k}" aria-pressed="${S.statFmt===k}">${l}<small>${k==='all'?L.length:L.filter(b=>(b.format||'film')===k).length}</small></button>`).join('')}</div>${yearChips()}</div>`}
function fmtBar(L){return `<div class="fmtbar" role="group" aria-label="Tip">${Object.entries(A().formatsPl).map(([k,l])=>`<button data-act="fmt" data-v="${k}" aria-pressed="${S.fmt===k}">${l}<small>${L.filter(b=>(b.format||'film')===k).length}</small></button>`).join('')}</div>`}
function statCards(R){
  const avg=L=>{const n=L.map(b=>+b.rating).filter(Boolean);return n.length?(n.reduce((x,y)=>x+y,0)/n.length).toFixed(1).replace('.',','):'–'};
  const card=(k,l,L)=>`<button class="fmtcard" data-act="stat-fmt" data-v="${k}" aria-pressed="${S.statFmt===k}"><b>${L.length}</b><span>${l}</span><small>ortalama ${avg(L)}</small></button>`;
  return `<div class="fmtcards">${card('all','Tümü',R)}${Object.entries(A().formatsPl).map(([k,l])=>card(k,l,R.filter(b=>(b.format||'film')===k))).join('')}</div>`;
}
Object.assign(ACT,{fmt:a=>{S.fmt=a.dataset.v;render()},'stat-fmt':a=>{S.statFmt=a.dataset.v;render()},'film-all':a=>{S.filmAll=!!a.dataset.v;render()}});
const FILM_PROPS=['popcorn','glasses','stanley','remote','clapper'];
function filmStand(list){
  const per=Math.max(2,Math.floor((Math.min(innerWidth,1120)-48)/176)),recent=[];
  const piles=byGenre(list,10).map(({g,n,items,first})=>`<div class="pile">${first?`<span class="ptag">${esc(g)} · ${n}</span>`:''}${items.map(b=>{const c=pileColor(b,recent);return `<button class="dvd ${b.status==='reading'?'reading':''}" style="--c:${esc(c)};--cink:${inkFor(c)};--off:${hash(b.title)%11-5}px" data-act="open" data-id="${b.id}" title="${esc(b.title)} — ${A().status[b.status]||''}"><span>${esc(b.title)}</span>${b.rating?`<b>${String(b.rating).replace('.',',')}</b>`:''}</button>`}).join('')}</div>`);
  piles.splice(Math.min(per-1,piles.length),0,`<div class="pile tvpile">${TVSET}</div>`);
  let out='';for(let i=0,r=0;i<piles.length;i+=per,r++){const row=piles.slice(i,i+per);row.splice(r%2?0:row.length,0,prop(FILM_PROPS[r%FILM_PROPS.length]));if(row.length>3)row.splice(r%2?row.length:0,0,prop(FILM_PROPS[(r+2)%FILM_PROPS.length]));out+=`<div class="stand"><div class="piles">${row.join('')}</div>${r?'':petRail()}<div class="stand-top"></div><div class="stand-body"><i></i><i></i></div></div>`}
  return `<div class="stands f-${S.fmt}">${out}</div>`;
}
/* the game library is a tiny pixel desktop on a desk, so a long list stays easy to scan */
S.gGenre='all';
const upTR=t=>String(t).toLocaleUpperCase('tr');
function gameScreen(list){
  const gs=byGenre(list,1e6),g=gs.some(x=>x.g===S.gGenre)?S.gGenre:'all',rows=g==='all'?gs.flatMap(x=>x.items):gs.find(x=>x.g===g).items;
  const hours=list.reduce((s,b)=>s+(+b.pages||0),0),steam=Store.extra?.steam?.profile;
  const side=[['all','TÜMÜ',list.length],...gs.map(x=>[x.g,upTR(x.g),x.n])].map(([k,l,n])=>`<button class="px-g" data-act="g-genre" data-v="${esc(k)}" aria-pressed="${g===k}"><span>${esc(l)}</span><b>${n}</b></button>`).join('');
  const row=b=>{const c=b.color||autoColor(b.title),src=coverSrc(b);return `<button class="px-row" data-act="open" data-id="${b.id}"><span class="px-th" style="--c:${esc(c)}">${src?`<img src="${esc(src)}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove()">`:''}<i>${esc(initial(b.title))}</i></span><span class="px-t"><b>${esc(b.title)}</b><small>${esc([A().formats[b.format],b.pages?String(b.pages).replace('.',',')+' saat':'',b.achievements?b.achievements.unlocked+'/'+b.achievements.total+' başarım':''].filter(Boolean).join(' · '))}</small></span><span class="px-s s-${esc(b.status)}">${esc(upTR(A().status[b.status]||''))}</span><span class="px-r">${b.rating?'★'+String(b.rating).replace('.',','):''}</span></button>`};
  return `<div class="pxdesk"><div class="pxmon"><div class="pxscreen">
    <div class="px-bar"><b>▶ BUHAR</b><span>${list.length} OYUN</span><span>${nf(hours)} SAAT</span>${steam?`<a href="${esc(steam)}" target="_blank" rel="noopener">STEAM PROFİLİ${Store.extra.steam.gameCount?` · ${Store.extra.steam.gameCount} OYUN`:""}</a>`:''}</div>
    <div class="px-body"><nav class="px-side" aria-label="Türler">${side}</nav><div class="px-list">${rows.map(row).join('')||'<p class="px-empty">&gt; BURASI BOŞ. BİR OYUN EKLE_</p>'}</div></div>
  </div></div><div class="pxsurface">${prop('pad')}${prop('stanley')}<span class="pxneck"></span>${prop('headset')}${prop('can')}${prop('mug')}${petRail()}</div><div class="pxtop"></div></div>`;
}
ACT['g-genre']=a=>{S.gGenre=a.dataset.v;render()};
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
  return `<button class="kcard" data-act="k-open" data-k="${esc(e.k)}">${coverHTML({...b,status:''})}<div class="kbody"><b>${esc(b.title)}</b><span class="muted">${esc([b.yearLabel||b.year,b.author].filter(Boolean).join(' · '))}</span>${b.imdb?`<span class="imdb">IMDb ${String(b.imdb).replace('.',',')}</span>`:''}<div class="kscores">${sc||`<span class="muted">${A().noneShort}</span>`}</div></div></button>`;
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
  <div class="sheet-b">${itemTabs(b)}<div class="ed-top"><div>${coverHTML({...b,status:''})}</div><div style="min-width:0;display:grid;gap:6px;align-content:start">
    <h3 style="font-family:var(--f-display);font-weight:400;font-size:1.3rem;line-height:1.2">${esc(b.title)}</h3><div class="rmeta">${[b.yearLabel||b.year,b.author,b.genre,b.imdb?'IMDb '+String(b.imdb).replace('.',','):''].filter(Boolean).map(x=>`<span>${esc(x)}</span>`).join('')}</div>
    ${b.imdbId?`<a class="note" href="https://www.imdb.com/title/${esc(b.imdbId)}/" target="_blank" rel="noopener">IMDb sayfası</a>`:''}</div></div>
  ${others?`<div class="kwhos">${others}</div>`:`<p class="muted">${A().noneYet}</p>`}
  ${S.canEdit?(mine?`<button class="btn primary" data-act="open" data-id="${mine.id}">Kaydımı düzenle</button>`:`<div class="seg">${Object.entries({read:A().status.read,want:A().status.want,skip:A().status.skip}).map(([k2,l])=>`<button type="button" data-act="k-add" data-s="${k2}">${l}</button>`).join('')}</div>`):''}${friendPanel(b)}</div>`);
}
Object.assign(ACT,{
  'k-open':a=>openCatalog(a.dataset.k),'k-more':()=>{S.klimit+=60;paintK()},
  'k-fmt':a=>{S.kfmt=a.dataset.v;S.klimit=60;render()},'k-mine':a=>{S.kmine=a.dataset.v;S.klimit=60;render()},
  'k-add':a=>{const s=a.dataset.s,b=S.kOpen?.item;if(!b)return;const c=myCopy(b,{status:s});closeSheet();
    if(s==='read')return openEditor({...c,endDate:todayISO()});Store.saveBook(c);toast(`“${b.title}” eklendi.`);if(S.tab==='tbr')render();else paintK()}
});
document.addEventListener('change',e=>{if(e.target.id==='k-sort'){S.ksort=e.target.value;paintK()}});
function areaWords(h){
  if(curArea()==='book')return h;const film=curArea()==='film',a=film&&S.statFmt!=='all'?{...A(),item:A().formats[S.statFmt].toLocaleLowerCase('tr'),Item:A().formats[S.statFmt]}:A();
  return h.replaceAll('Kitap <span>bingo',a.Item+' <span>bingo').replaceAll('>kitap<','>'+a.item+'<').replaceAll('Kitap Bingo',a.Item+' Bingo').replaceAll('Kitap bitirdikçe',a.Item+' bitirdikçe').replaceAll(' kitap',' '+a.item).replaceAll('Okunan sayfa','Toplam '+a.unit).replaceAll('okuduğun',film?'izlediğin':'oynadığın').replaceAll('okunan tür',film?'izlenen tür':'oynanan tür').replaceAll('kitabı eşleştir',a.item+' eşleştir');
}
