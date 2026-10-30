/* ---------- the home computer: Excel export, template and import ---------- */
const XLSX_URL='https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
const XLSX_SRI='sha384-vtjasyidUo0kW94K5MXDXntzOJpQgBKXmE7e2Ga4LG0skTTLeBi97eFAXsqewJjw';
const loadXLSX=()=>window.XLSX?Promise.resolve():new Promise((ok,no)=>{const s=document.createElement('script');s.src=XLSX_URL;s.integrity=XLSX_SRI;s.crossOrigin='anonymous';s.onload=ok;s.onerror=no;document.head.append(s)});
const XL_SHEETS={book:'Kitaplar',film:'Filmler ve Diziler',game:'Oyunlar'};
const xlCols=a=>[['Ad','title'],[AREAS[a].who,'author'],['Yıl','year'],['Durum','status'],['Puan','rating'],['Tür','genre'],[a==='book'?'Biçim':a==='film'?'Tip':'Platform','format'],[AREAS[a].unitLong,'pages'],['Başladım','startDate'],['Bitirdim','endDate'],['Yorum','review'],['Sahibim','owned'],['Seri','series'],['Serideki sırası','seriesNo'],['Kayıt no','id']];
const xlRow=(a,b)=>Object.fromEntries(xlCols(a).map(([h,k])=>[h,k==='status'?AREAS[a].status[b.status]||'':k==='format'?AREAS[a].formats[b.format]||'':k==='owned'?(b.owned?'Evet':''):b[k]??'']));
function xlBook(sample){
  const wb=XLSX.utils.book_new();
  for(const a of Object.keys(XL_SHEETS)){
    const A=AREAS[a],first=Object.keys(A.formats)[0],rows=sample?[{title:`Örnek ${A.item} (bu satırı sil)`,author:'',year:2020,status:'read',rating:A.scale,genre:GENRE_SETS[a][0],format:first,endDate:todayISO(),review:'İstersen kısa yorum'}]:Store.lists[a];
    const ws=XLSX.utils.json_to_sheet(rows.map(b=>xlRow(a,b)),{header:xlCols(a).map(c=>c[0])});ws['!cols']=xlCols(a).map(([,k])=>({wch:k==='title'||k==='review'?34:14}));
    XLSX.utils.book_append_sheet(wb,ws,XL_SHEETS[a]);
  }
  const help=[['Nasıl doldurulur?'],['Sayfa adlarını ve başlıkları değiştirme. Her satır bir kayıt; yalnızca Ad zorunlu.'],['Durum: '+Object.keys(XL_SHEETS).map(a=>Object.values(AREAS[a].status).join(', ')).join(' / ')],['Tip/Biçim/Platform: '+Object.keys(XL_SHEETS).map(a=>Object.values(AREAS[a].formats).join(', ')).join(' / ')],['Puan: kitapta 0-5, film ve oyunda 0-10. Tarih: YYYY-AA-GG.'],['Kayıt no doluysa o kayıt güncellenir, boşsa adı aynı olan aranır, yoksa yeni eklenir.'],['Boş bıraktığın hücre eskisini silmez. Excel’de olmayan kayıtlar sitede kalır.']];
  XLSX.utils.book_append_sheet(wb,XLSX.utils.aoa_to_sheet(help),'Nasıl');
  return wb;
}
/* same-title matching looks at the open area, so borrow it while comparing */
const inArea=(a,fn)=>{const keep=S.area;S.area=a;try{return fn()}finally{S.area=keep}};
const xlDate=v=>{if(v instanceof Date)return `${v.getFullYear()}-${pad(v.getMonth()+1)}-${pad(v.getDate())}`;const t=String(v||'').trim(),m=/^(\d{1,2})[./](\d{1,2})[./](\d{4})$/.exec(t);return m?`${m[3]}-${pad(+m[2])}-${pad(+m[1])}`:/^\d{4}-\d{2}-\d{2}$/.test(t)?t:''};
const byLabel=(map,v)=>{const t=String(v||'').trim().toLocaleLowerCase('tr');return Object.keys(map).find(k=>k===t||map[k].toLocaleLowerCase('tr')===t)||''};
function xlParse(wb){
  const plan={};
  for(const[a,name]of Object.entries(XL_SHEETS)){
    const ws=wb.Sheets[name],P=plan[a]={add:[],upd:[],same:0,skip:0,bad:0};if(!ws)continue;const A=AREAS[a],cols=xlCols(a);
    XLSX.utils.sheet_to_json(ws,{defval:''}).forEach(row=>{
      const o={};for(const[h,k]of cols){const v=row[h];if(v!==''&&v!=null)o[k]=v}
      const title=String(o.title||'').trim();if(!title){P.skip++;return}if(title.startsWith('Örnek ')){P.skip++;return}
      const rec={title};for(const k of['author','genre','series','review'])if(o[k])rec[k]=String(o[k]).trim();
      for(const k of['year','pages','seriesNo'])if(+o[k])rec[k]=+o[k];
      if(o.rating!=null){const r=parseFloat(String(o.rating).replace(',','.'));if(r>=0&&r<=A.scale)rec.rating=r;else P.bad++}
      if(o.status){const s=byLabel(A.status,o.status);if(s)rec.status=s;else P.bad++}
      if(o.format){const f=byLabel(A.formats,o.format);if(f)rec.format=f;else P.bad++}
      for(const k of['startDate','endDate'])if(o[k]){const d=xlDate(o[k]);if(d)rec[k]=d;else P.bad++}
      if(o.owned!=null)rec.owned=/^(evet|e|x|1|true)$/i.test(String(o.owned).trim());
      const L=Store.lists[a],hit=(o.id&&L.find(b=>b.id===String(o.id)))||inArea(a,()=>L.find(b=>sameItem(b,rec)));
      if(hit){const ch=Object.entries(rec).filter(([k,v])=>String(hit[k]||'').trim()!==String(v||'').trim());if(ch.length)P.upd.push({id:hit.id,patch:Object.fromEntries(ch)});else P.same++}
      else{if(!rec.status)rec.status=rec.rating?'read':'want';P.add.push(rec)}
    });
  }
  return plan;
}
function xlApply(plan){
  Store.sync();let n=0;
  for(const[a,P]of Object.entries(plan)){const L=Store.lists[a];
    P.upd.forEach(({id,patch})=>{const i=L.findIndex(b=>b.id===id);if(i>=0){L[i]={...L[i],...patch,updatedAt:Date.now()};n++}});
    P.add.forEach(r=>{L.push({id:newId(),kind:'book',format:Object.keys(AREAS[a].formats)[0],owned:a!=='film'&&r.status!=='want',rating:0,color:autoColor(r.title),addedAt:Date.now(),updatedAt:Date.now(),...(r.status==='read'&&!r.endDate?{endDate:todayISO()}:{}),...r});n++});
  }
  Store.useArea();Store.schedule(`Excel’den ${n} kayıt`);closeSheet();render();toast(`${n} kayıt Excel’den alındı.`);
}
let PC={};
function openPC(msg=''){
  const mine=S.canEdit&&S.viewing===S.me;
  openSheet(`<div class="sheet-h"><h2>Bilgisayar</h2><button class="x" data-act="close" aria-label="Kapat">×</button></div>
  <div class="sheet-b"><div class="pcscreen"><b>C:\\BIZIM-EV&gt;</b> ${esc(gen(personName(S.viewing)))} verisi hazır_</div>
  <section class="pcbox"><h3>Excel’e al</h3><p class="muted">Kitap, film, dizi ve oyun kayıtların tek dosyada, ayrı sayfalarda iner.</p><button class="btn primary" data-act="pc-export">Excel olarak indir</button></section>
  <section class="pcbox"><h3>Excel’den yükle</h3>${mine?`<p class="muted">Önce şablonu indir, doldur, sonra yükle. Hiçbir şey silinmez; kaydetmeden önce özetini görürsün.</p><div class="pcrow"><button class="btn" data-act="pc-template">Şablonu indir</button><label class="btn">Excel seç<input type="file" id="pc-file" accept=".xlsx,.xls" hidden></label></div>${msg}`:'<p class="muted">Yüklemek için kendi evinde ve kayıt anahtarı olan bir cihazda olman gerekir.</p>'}</section></div>`);
}
const xlSave=async(sample)=>{try{await loadXLSX()}catch{return toast('Excel aracı yüklenemedi; bağlantını kontrol et.')}XLSX.writeFile(xlBook(sample),sample?'bizim-ev-sablon.xlsx':`bizim-ev-${S.viewing}-${todayISO()}.xlsx`);toast('Dosya indiriliyor.')};
Object.assign(ACT,{pc:()=>openPC(),'pc-export':()=>xlSave(false),'pc-template':()=>xlSave(true),'pc-apply':()=>{if(PC.plan&&S.canEdit)xlApply(PC.plan);PC={}}});
document.addEventListener('change',async e=>{
  if(e.target.id!=='pc-file')return;const f=e.target.files[0];if(!f)return;
  try{await loadXLSX();const wb=XLSX.read(await f.arrayBuffer(),{cellDates:true});PC.plan=xlParse(wb)}
  catch{PC={};return openPC('<p class="note">Bu dosya okunamadı. Şablondaki gibi bir .xlsx dosyası seç.</p>')}
  const P=Object.entries(PC.plan),add=P.reduce((s,[,p])=>s+p.add.length,0),upd=P.reduce((s,[,p])=>s+p.upd.length,0),bad=P.reduce((s,[,p])=>s+p.bad,0);
  const rows=P.map(([a,p])=>`<li><b>${XL_SHEETS[a]}:</b> ${p.add.length} yeni, ${p.upd.length} güncellenecek, ${p.same} aynı</li>`).join('');
  openPC(`<ul class="pclist">${rows}</ul>${bad?`<p class="note">${bad} hücre anlaşılamadı ve atlanacak.</p>`:''}${add+upd?'<button class="btn primary" data-act="pc-apply">Kaydet</button>':'<p class="note">Eklenecek ya da değişecek bir şey yok.</p>'}`);
});
