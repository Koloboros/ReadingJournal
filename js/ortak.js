/* ---------- Ortak Ev: two people share one list per area; reading, ratings and notes stay personal ---------- */
AREAS.book.share={title:'Ortak Kitaplık',add:'Ortak Kitaplığa ekle',pick:b=>b.owned};
AREAS.film.share={title:'Birlikte İzlenecekler',add:'Birlikte İzlenecek’e ekle',pick:b=>b.status==='want'};
AREAS.game.share={title:'Ortak Arşiv',add:'Ortak Arşive ekle',pick:b=>b.owned};
const HOME_KEY={book:'books',film:'films',game:'games'};
const mePerson=()=>S.people.find(p=>p.id===S.me);
const partnerOf=()=>{const id=mePerson()?.partner;return id?S.people.find(p=>p.id===id):null};
const homeOpen=()=>!!partnerOf()&&S.viewing===S.me;
const Home={data:null,loading:null,
  path(){return`data/ortak/${[S.me,partnerOf().id].sort().join('-')}.json`},
  blank:()=>({books:[],films:[],games:[]}),
  list(){return this.data?.[HOME_KEY[curArea()]]||[]},
  has(b){return this.list().some(x=>sameItem(x,b))},
  load(){return this.loading=this.loading||(async()=>{try{const f=await GH.get(this.path());this.data={...this.blank(),...(f?.data||{})}}catch{this.data=this.data||this.blank()}this.loading=null;render()})()},
  /* read, change, write: both people edit this file, so a clash re-reads and tries again */
  async change(fn,msg){
    if(!GH.token())return openSetup();
    for(let i=0;i<3;i++){
      try{const f=LOCAL?{data:this.data,sha:null}:await GH.get(this.path()),d={...this.blank(),...(f?.data||{})};fn(d);await GH.put(this.path(),d,f?.sha||null,`Ortak Ev: ${msg}`);this.data=d;render();return true}
      catch(e){if(e.status!==409&&e.status!==422){break}}
    }
    toast('Ortak Ev’e kaydedilemedi. Tekrar dene.');return false;
  },
  clean(b){const{id,kind,rating,review,status,startDate,endDate,updatedAt,owned,fromTbr,infoTried,achievements,steamLast,familyShared,coverData,...rest}=b;const o={};for(const[k,v]of Object.entries(rest))if(!k.startsWith('_')&&v!==''&&v!=null)o[k]=v;return{...o,id:'h'+newId(),addedBy:S.me,addedAt:Date.now()}},
  add(items){const key=HOME_KEY[curArea()],L=items.filter(b=>!this.has(b)).map(b=>this.clean(b));if(!L.length)return Promise.resolve(false);return this.change(d=>{d[key]=[...d[key],...L]},`${L.length===1?`"${L[0].title}"`:L.length+' kayıt'} eklendi`)},
  remove(id){const key=HOME_KEY[curArea()];return this.change(d=>{d[key]=d[key].filter(x=>x.id!==id)},'bir kayıt çıkarıldı')}
};
/* links live on each person in kisiler.json, so taking one away never touches anybody's shelves */
async function updPeople(fn,msg){
  if(!GH.token())return openSetup(),false;
  try{const f=await GH.get('data/kisiler.json'),list=f?.data?.kisiler||[];fn(list);await GH.put('data/kisiler.json',{...f.data,kisiler:list},f.sha,msg);const keep=S.people;S.people=list.map(p=>({...keep.find(k=>k.id===p.id)?.avatar&&!p.avatar?{avatar:keep.find(k=>k.id===p.id).avatar}:{},...p}));return true}
  catch{toast('Kaydedilemedi. Tekrar dene.');return false}
}
const by=(L,id)=>L.find(p=>p.id===id);
function homePanel(){
  const me=mePerson();if(!me)return'';const part=partnerOf(),sent=S.people.find(p=>p.partnerInvite===me.id),inv=me.partnerInvite&&by(S.people,me.partnerInvite);
  let body;
  if(part)body=`<p class="muted">${esc(part.name)} ile aynı evdesiniz. Ortak kayıtlarınız kitap ve oyunda Sahip olduklarım, filmde Birlikte İzlenecekler filtresinde.</p><button class="btn danger ghost" data-act="home-unlink">Bağlantıyı kaldır</button>`;
  else if(inv)body=homeInvite();
  else if(sent)body=`<p class="muted">${esc(sent.name)} onayını bekliyorsun.</p><button class="btn ghost" data-act="home-cancel" data-id="${esc(sent.id)}">Daveti geri al</button>`;
  else{const free=S.people.filter(p=>p.id!==me.id&&!p.partner);body=`<p class="muted">Eşini ya da evi paylaştığın kişiyi seç. O da onaylayınca ortak listeleriniz açılır.</p>${free.length?`<div class="pcrow">${free.map(p=>`<button class="btn" data-act="home-invite" data-id="${esc(p.id)}">${esc(p.name)}</button>`).join('')}</div>`:'<p class="note">Şu an davet edilebilecek kimse yok.</p>'}`}
  return`<section class="pcbox"><h3>Ortak Ev</h3>${body}</section>`;
}
function homeInvite(){const me=mePerson(),inv=me?.partnerInvite&&by(S.people,me.partnerInvite);return inv&&!me.partner?`<div class="banner"><span><b>${esc(inv.name)} seni Ortak Ev’e çağırıyor.</b> Ortak kitaplık, arşiv ve izlenecek listeniz olur; kendi rafların aynı kalır.</span><div class="pcrow"><button class="btn primary" data-act="home-accept">Kabul et</button><button class="btn ghost" data-act="home-decline">Reddet</button></div></div>`:''}
const homeRows=b=>[mePerson(),partnerOf()].map(p=>({p,x:Peers.list(p.id,curArea()).find(i=>sameItem(i,b))}));
const homeShort=x=>!x?'○':x.status==='skip'?'✕':x.rating?String(x.rating).replace('.',','):x.status==='reading'?'▶':x.status==='read'?'✓':'•';
/* everything the household has: the shared list, plus whatever the partner already owns, so nothing is entered twice */
function homePool(){
  const p=partnerOf();if(!p||S.viewing!==S.me)return[];const out=Home.list().map(b=>({...b,_home:true}));
  if(curArea()!=='film')Peers.list(p.id,curArea()).filter(b=>b.owned).forEach(b=>{if(!out.some(x=>sameItem(x,b)))out.push({...Home.clean(b),id:'p'+b.id,_home:true})});
  return out;
}
function openHomeItem(id){
  const b=homePool().find(x=>x.id===id);if(!b)return;
  const rows=homeRows(b).map(({p,x})=>`<div class="kwho"><i style="background:${esc(p.color||'#ddd')}">${personAv(p)}</i><span>${esc(p.name)}</span><b>${x?esc(peerScore(x)):'kayıt yok'}</b></div>`).join('');
  const notes=homeRows(b).filter(r=>(r.x?.review||'').trim()).map(({p,x})=>`<article class="fritem"><i style="background:${esc(p.color||'#ddd')}">${personAv(p)}</i><div><div class="frhead"><b>${esc(p.name)}</b></div><p>${esc(x.review)}</p></div></article>`).join('');
  openSheet(`<div class="sheet-h"><h2>${A().share.title}</h2><button class="x" data-act="close" aria-label="Kapat">×</button></div>
  <div class="sheet-b"><div class="ed-top"><div>${coverHTML({...b,status:''})}</div><div style="min-width:0;display:grid;gap:6px;align-content:start"><h3 style="font-family:var(--f-display);font-weight:400;font-size:1.3rem;line-height:1.2">${esc(b.title)}</h3><div class="rmeta">${[b.yearLabel||b.year,b.author,b.genre].filter(Boolean).map(x=>`<span>${esc(x)}</span>`).join('')}</div></div></div>
  <div class="kwhos">${rows}</div>${notes}${b.about?`<div class="about">${esc(b.about)}</div>`:''}
  ${S.canEdit?`<p class="note" style="margin:0">Kendi rafına al:</p><div class="seg">${['read','reading','want'].map(s=>`<button type="button" data-act="home-mark" data-id="${esc(b.id)}" data-s="${s}">${s==='want'?'Bekleyenlere ekle':A().status[s]}</button>`).join('')}</div>${Home.list().some(x=>x.id===b.id)?`<div class="ed-foot"><button class="btn danger ghost" data-act="home-remove" data-id="${esc(b.id)}">Ortak listeden çıkar</button><span></span></div>`:''}`:''}</div>`);
}
/* a tick box in the item editor, for anyone in a shared home */
const homeToggle=b=>{if(!partnerOf()||S.viewing!==S.me)return'';const on=!!b.title&&Home.has(b);return`<label class="toggle"><input type="checkbox" id="f-shared" ${on?'checked disabled':''}> ${A().share.add}</label>`};
const homeBtn=b=>partnerOf()&&S.canEdit&&!Home.has(b)?`<button class="btn" data-act="home-add-k">${A().share.add}</button>`:'';
Object.assign(ACT,{
  'home-open':a=>openHomeItem(a.dataset.id),
  'home-invite':async a=>{const id=a.dataset.id;if(await updPeople(L=>{by(L,id).partnerInvite=S.me},`${personName(S.me)}: Ortak Ev daveti`)){toast('Davet gönderildi. Onaylayınca açılır.');openPeople()}},
  'home-cancel':async a=>{const id=a.dataset.id;if(await updPeople(L=>{delete by(L,id).partnerInvite},`${personName(S.me)}: davet geri alındı`))openPeople()},
  'home-accept':async()=>{const me=S.me,o=mePerson().partnerInvite;if(await updPeople(L=>{const m=by(L,me),p=by(L,o);if(!p||p.partner)throw 0;delete m.partnerInvite;m.partner=o;p.partner=me},`Ortak Ev: ${personName(me)} ve ${personName(o)}`)){Home.data=null;closeSheet();render();toast('Ortak Ev açıldı.')}},
  'home-decline':async()=>{const me=S.me;if(await updPeople(L=>{delete by(L,me).partnerInvite},`${personName(me)}: davet reddedildi`)){closeSheet();render()}},
  'home-unlink':async a=>{if(!a.dataset.sure){a.dataset.sure='1';a.textContent='Emin misin? Evet, kaldır';return}const me=S.me,o=partnerOf().id;if(await updPeople(L=>{delete by(L,me).partner;delete by(L,o).partner},`Ortak Ev bağlantısı kaldırıldı`)){Home.data=null;closeSheet();render();toast('Bağlantı kaldırıldı. Kimsenin rafı değişmedi.')}},
  'home-add-k':()=>{const b=S.kOpen?.item;if(b)Home.add([b]).then(ok=>{if(ok){closeSheet();toast('Ortak listeye eklendi.')}})},
  'home-remove':a=>{if(!a.dataset.sure){a.dataset.sure='1';a.textContent='Emin misin? Evet, çıkar';return}const id=a.dataset.id;closeSheet();Home.remove(id)},
  'home-mark':a=>{const b=homePool().find(x=>x.id===a.dataset.id),s=a.dataset.s;if(!b)return;const{addedBy,addedAt,_home,...src}=b,mine=BOOKS().find(x=>sameItem(x,b)),t=todayISO();closeSheet();
    if(mine){if(s==='want')return toast('Bu kayıt zaten rafında.');return openEditor(mine,s==='read'?{status:s,endDate:mine.endDate||t}:{status:s,startDate:mine.startDate||t})}
    const c={...myCopy({...src,id:''},{status:s}),owned:curArea()!=='film'};if(s==='read')return openEditor({...c,endDate:t});Store.saveBook(s==='want'?c:{...c,startDate:t});toast(`“${b.title}” rafına eklendi.`)}
});
