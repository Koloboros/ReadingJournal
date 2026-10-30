/* Seyir Defteri seed -> people's library files + shared Discover list. Usage: node migrate-films.js <seyir.html> <dataDir> */
const fs=require('fs');const[,,src,dir]=process.argv;
const html=fs.readFileSync(src,'utf8');
const seed=JSON.parse(html.match(/<script id="seed" type="application\/json">([\s\S]*?)<\/script>/)[1]);
const MAP={'Drama':'Drama','Dram':'Drama','Komedi':'Komedi','Aksiyon':'Aksiyon','Romantik':'Romantik','Suç':'Suç','Bilim Kurgu':'Bilim kurgu','Fantastik':'Fantastik','Gizem':'Gizem','Gerilim':'Gerilim','Korku':'Korku','Macera':'Macera','Tarih':'Tarih','Savaş':'Savaş','Belgesel':'Belgesel','Müzikal':'Müzikal','Aile':'Aile','Biyografi':'Biyografi','Psikoloji':'Gerilim'};
const genre=i=>{for(const t of i.tags||[]){if(MAP[t])return MAP[t]}return i.type==='animasyon'?'Animasyon':''};
const item=(i,extra)=>{const o={id:i.id,format:i.type,title:i.title,year:i.year,yearLabel:i.yearLabel,author:i.director||i.studio||'',genre:genre(i),...extra};
  if(i.imdb!=null)o.imdb=i.imdb;const m=(i.url||'').match(/tt\d+/);if(m)o.imdbId=m[0];if(i.tags?.length)o.tags=i.tags;if(i.designer)o.designer=i.designer;return o};
const out={melih:[],duygu:[],can:[]},kesfet=[];
for(const i of seed){let any=false;
  for(const p of Object.keys(out)){const v=i.scores[p];if(v===null||v===undefined)continue;any=true;
    out[p].push(typeof v==='number'?item(i,{status:'read',rating:v,endDate:i.updated}):item(i,{status:'skip'}))}
  if(!any)kesfet.push(item(i,{}));}
for(const p of Object.keys(out)){const f=`${dir}/kitapliklar/${p}.json`,d=JSON.parse(fs.readFileSync(f,'utf8'));
  d.schema=2;d.films=out[p];fs.writeFileSync(f,JSON.stringify(d,null,1));console.log(p,out[p].length)}
fs.writeFileSync(`${dir}/kesfet.json`,JSON.stringify({films:kesfet,games:[]},null,1));console.log('kesfet',kesfet.length);
