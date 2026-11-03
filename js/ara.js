/* ---------- search: one box on each shelf, one at the top for everything ---------- */
const SEARCH_ICO='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>';
const searchText=b=>norm([b.title,b.author,Array.isArray(b.series)?b.series.join(' '):b.series,b.genre,b.publisher].filter(Boolean).join(' '));
const shelfMatch=b=>{const q=norm(S.shelfQ||'');return!q||searchText(b).includes(q)};
/* the shelf box: always open on a wide screen, behind a magnifier on a phone until used */
function shelfSearch(n){
  const open=S.shelfQOpen||S.shelfQ||document.documentElement.dataset.view!=='mobile';
  if(!open)return`<div class="shelfq"><button class="chip sq-btn" data-act="sq-open" aria-label="Rafta ara">${SEARCH_ICO}Rafta ara</button></div>`;
  return`<div class="shelfq"><label class="sq-box">${SEARCH_ICO}<input type="text" id="shelf-q" value="${esc(S.shelfQ||'')}" placeholder="Rafta ara: ad, ${A().who.toLocaleLowerCase('tr')}, seri, tür" autocomplete="off"></label>${S.shelfQ?`<span class="muted">${n} ${A().item} bulundu</span><button class="linkbtn" data-act="sq-clear">Temizle</button>`:''}</div>`;
}
document.addEventListener('input',e=>{if(e.target.id!=='shelf-q')return;S.shelfQ=e.target.value;clearTimeout(S.sqT);S.sqT=setTimeout(()=>{const pos=e.target.selectionStart;render();const i=$('#shelf-q');if(i){i.focus();i.setSelectionRange(pos,pos)}},220)});
/* the top box looks through this person's books, films, games and the shared household list */
function gsResults(q){
  q=norm(q);if(q.length<2)return'<p class="muted">En az iki harf yaz.</p>';Store.sync();
  const groups=[['book','Kitaplar'],['film','Filmler ve diziler'],['game','Oyunlar']].map(([a,l])=>{
    const own=(Store.lists?.[a]||[]).filter(b=>searchText(b).includes(q)).map(b=>({a,b,home:false}));
    const shared=homeOpen()?(Home.data?.[HOME_KEY[a]]||[]).filter(b=>searchText(b).includes(q)&&!own.some(o=>norm(o.b.title)===norm(b.title))).map(b=>({a,b,home:true})):[];
    const L=[...own,...shared];return L.length?`<section class="gs-g"><h3>${l} <small>${L.length}</small></h3>${L.slice(0,8).map(({a,b,home})=>`<button class="gs-row" data-act="gs-open" data-a="${a}" data-id="${esc(b.id)}" data-home="${home?1:''}">${coverHTML({...b,status:''})}<span><b>${esc(b.title)}</b><small>${esc([b.author,b.year].filter(Boolean).join(' · '))}</small></span><em>${home?'ortak':esc(AREAS[a].status[b.status]||'')}</em></button>`).join('')}${L.length>8?`<p class="muted">ve ${L.length-8} tane daha; o rafta arayabilirsin.</p>`:''}</section>`:''}).join('');
  return groups||'<p class="muted">Bulunamadı.</p>';
}
function openSearch(){
  openSheet(`<div class="sheet-h"><h2>Ara</h2><button class="x" data-act="close" aria-label="Kapat">×</button></div><div class="sheet-b"><label class="sq-box">${SEARCH_ICO}<input type="text" id="gs-q" placeholder="Kitap, film, dizi ya da oyun" autocomplete="off"></label><div id="gs-res" class="gs-res"></div></div>`);
  setTimeout(()=>$('#gs-q')?.focus(),50);
}
document.addEventListener('input',e=>{if(e.target.id!=='gs-q')return;clearTimeout(S.gsT);const v=e.target.value;S.gsT=setTimeout(()=>{const r=$('#gs-res');if(r)r.innerHTML=gsResults(v)},180)});
Object.assign(ACT,{
  gsearch:()=>openSearch(),'sq-open':()=>{S.shelfQOpen=true;render();setTimeout(()=>$('#shelf-q')?.focus(),30)},'sq-clear':()=>{S.shelfQ='';render()},
  'gs-open':a=>{const{a:area,id,home}=a.dataset;closeSheet();Store.sync();S.area=area;S.tab='shelf';S.shelfQ='';Store.useArea();render();scrollTo({top:0});
    if(home)return openHomeItem(id);const b=BOOKS().find(x=>x.id===id);if(b)(S.canEdit?openEditor:openDetail)(b)}
});
