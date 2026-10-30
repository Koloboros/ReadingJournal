/* ---------- the three areas share one set of screens; everything that differs lives here ---------- */
const AREAS={
  book:{key:'book',brand:'Okuma Defteri',item:'kitap',Item:'Kitap',shelf:'Kitaplığım',who:'Yazar',unit:'sayfa',unitLong:'Sayfa',scale:5,howLabel:'Nasıl okudum?',ownLabel:'Kitaplığımda var (sahibim)',
    status:{want:'Okunacak',reading:'Okuyorum',read:'Okudum'},done:'okunduklarım',doneTitle:'Okuduklarım',nowLabel:'Şu an okuduklarım',notes:'Kitap Notlarım',noteLabel:'KİTAP NOTU',reviewPh:'Bu kitap bende ne bıraktı?',start:'Başladım',end:'Bitirdim',
    formats:{print:'Basılı',ebook:'E-kitap',audio:'Sesli'},fmtIcon:{print:'print',ebook:'ebook',audio:'audio'},
    legend:['Renkli: okudum','Renksiz: henüz okumadım','Kurdele: okuyorum'],
    list:{title:'Okunacaklar',wish:['İstek listem','elimde yok, okumak istiyorum','İşaretle: kitabı aldım, rafa geçsin','Aldım, rafa koy','İstek listen boş.'],wait:['Rafta bekleyenler','sahibim, henüz okumadım','İşaretle: okumaya başladım','Okumaya başladım','Rafta bekleyen kitap yok.'],now:['Okuyorum','şu an elimdekiler','İşaretle: bitirdim, puanını ver','Bitirdim','Şu an okuduğun kitap yok.'],ph:'Okumak istediğin kitabın adı (ve yazarı)',add:'Listeye ekle'},
    tabs:[['shelf','Kitaplık','shelf','Raf'],['covers','Kapaklar','covers','Kapak'],['notes','Notlar','pen','Notlar'],['stats','Yıl Özeti','chart','Özet'],['tbr','Okunacaklar','list','Liste'],['stamps','Hedef','stamp','Hedef'],['bingo','Bingo','grid','Bingo']]},
  film:{key:'film',brand:'Seyir Defteri',item:'yapım',Item:'Yapım',shelf:'DVD Rafım',who:'Yönetmen',unit:'dakika',unitLong:'Dakika',scale:10,howLabel:'Türü',ownLabel:'Koleksiyonumda var',
    status:{want:'İzlenecek',reading:'İzliyorum',read:'İzledim',skip:'İzlemem'},done:'izlediklerim',doneTitle:'İzlediklerim',nowLabel:'Şu an izlediklerim',notes:'İzleme Notlarım',noteLabel:'SEANS NOTU',reviewPh:'Jenerik akarken aklında ne kaldı?',start:'Başladım',end:'Bitirdim',
    formats:{film:'Film',dizi:'Dizi',animasyon:'Animasyon'},fmtIcon:{film:'filmi',dizi:'tvi',animasyon:'sparkle'},
    legend:['Renkli: izledim','Renksiz: henüz izlemedim','Kurdele: izliyorum'],
    list:{title:'İzlenecekler',wish:['İzleme listem','henüz izlemedim, merak ediyorum','İşaretle: izlemeye başladım','İzlemeye başladım','İzleme listen boş.'],wait:['Koleksiyonda bekleyenler','elimde var, sıra gelmedi','İşaretle: izlemeye başladım','İzlemeye başladım','Bekleyen yapım yok.'],now:['İzliyorum','şu an devam edenler','İşaretle: bitirdim, puanını ver','Bitirdim','Şu an izlediğin bir şey yok.'],ph:'İzlemek istediğin film ya da dizi',add:'Listeye ekle'},
    tabs:[['shelf','Raf','shelf','Raf'],['kesfet','Keşfet','compass','Keşfet'],['covers','Afişler','covers','Afiş'],['notes','Notlar','pen','Notlar'],['stats','Yıl Özeti','chart','Özet'],['tbr','İzlenecekler','list','Liste'],['stamps','Hedef','stamp','Hedef'],['bingo','Bingo','grid','Bingo']]},
  game:{key:'game',brand:'Oyun Defteri',item:'oyun',Item:'Oyun',shelf:'Oyun Rafım',who:'Stüdyo',unit:'saat',unitLong:'Saat',scale:10,howLabel:'Nerede oynadım?',ownLabel:'Kütüphanemde var',
    status:{want:'Backlog',reading:'Oynuyorum',read:'Bitirdim',skip:'Bıraktım'},done:'bitirdiklerim',doneTitle:'Bitirdiklerim',nowLabel:'Şu an oynadıklarım',notes:'Oyun Günlüğüm',noteLabel:'KAYIT NOKTASI',reviewPh:'Son kayıt noktasından notlar…',start:'Başladım',end:'Bitirdim',
    formats:{pc:'PC',ps:'PlayStation',xbox:'Xbox',switch:'Switch',mobil:'Mobil'},fmtIcon:{pc:'desktop',ps:'pad',xbox:'pad',switch:'pad',mobil:'phone'},
    legend:['Renkli: bitirdim','Renksiz: henüz oynamadım','Kurdele: oynuyorum'],
    list:{title:'Backlog',wish:['İstek listem','henüz almadım, gözüm üstünde','İşaretle: aldım, kütüphaneye geçsin','Aldım','İstek listen boş.'],wait:['Kütüphanede bekleyenler','satın aldım, hiç açmadım (herkes yapıyor)','İşaretle: oynamaya başladım','Oynamaya başladım','Bekleyen oyun yok. Bu bir mucize.'],now:['Oynuyorum','şu anki kayıtlar','İşaretle: bitirdim, puanını ver','Bitirdim','Şu an oynadığın bir oyun yok.'],ph:'Oynamak istediğin oyun',add:'Listeye ekle'},
    tabs:[['shelf','Raf','shelf','Raf'],['kesfet','Keşfet','compass','Keşfet'],['covers','Buhar','covers','Buhar'],['notes','Günlük','pen','Günlük'],['stats','Yıl Özeti','chart','Özet'],['tbr','Backlog','list','Liste'],['stamps','Hedef','stamp','Hedef'],['bingo','Bingo','grid','Bingo']]}
};
AREAS.book.credit='Kitap verileri: Google Books ve Open Library.';
AREAS.film.credit='Bu ürün TMDB API’sini kullanır ancak TMDB tarafından onaylanmamış veya sertifikalandırılmamıştır. Veriler: TMDB, TVmaze, Wikipedia.';
AREAS.game.credit='Oyun verileri: <a href="https://rawg.io" target="_blank" rel="noopener">RAWG</a>.';
const curArea=()=>S.area==='film'||S.area==='game'?S.area:'book';
const A=()=>AREAS[curArea()];
const GENRE_SETS={
  book:['Fantastik','Bilim kurgu','Distopya','Çizgi roman','Resimli kitap','Polisiye','Gerilim','Korku','Roman','Tarihi roman','Klasik','Öykü','Şiir','Anı','Biyografi','Deneme','Tarih','Felsefe','Psikoloji','Kişisel gelişim','Ebeveynlik','Popüler bilim','Beslenme','Kurgu dışı'],
  film:['Bilim kurgu','Fantastik','Aksiyon','Macera','Gerilim','Korku','Suç','Gizem','Drama','Romantik','Komedi','Tarih','Savaş','Biyografi','Belgesel','Animasyon','Aile','Müzikal'],
  game:['RPG','Aksiyon','Macera','Strateji','Simülasyon','Bulmaca','Platform','Roguelike','Korku','Hikâye','Yarış','Spor','Dövüş','Nişancı','Hayatta kalma','Cozy','Indie']
};
const POOLS={
  film:['Bilim kurgu','Fantastik','Aksiyon','Gerilim','Korku','Suç','Gizem','Drama','Romantik','Komedi','Savaş','Belgesel','Animasyon','Müzikal','Bir dizi','Bir animasyon','IMDb 8+','IMDb 9+','IMDb 7 altı','1980 öncesi','90’lardan','2000’lerden','Bu yıl çıkan','Tek kelimelik ad','Adında renk var','Adında sayı var','Tam puan verdiğin','4 puan altı verdiğin','Yeniden izlediğin','Sinemada izlediğin','Arkadaşınla izlediğin','Oscar’lı','Başka dilde','Kore yapımı','Japon yapımı','Türk yapımı','Fransız yapımı','Üçlemenin bir parçası','Uyarlama','Bir kitabı okuyup filmini izlediğin','Gece yarısı izlediğin','Ağlatan','Güldüren','Uykun kaçtı','Yarım bıraktığın dizi','Tek oturuşta bitirdiğin dizi','3 saatten uzun','Çocukluk filmi','Annenin önerdiği','Hep ertelediğin'],
  game:['RPG','Aksiyon','Macera','Strateji','Simülasyon','Bulmaca','Platform','Roguelike','Korku','Hikâye','Yarış','Spor','Nişancı','Hayatta kalma','Cozy','Indie','PC oyunu','PlayStation oyunu','Xbox oyunu','Switch oyunu','Mobil oyun','10 saatten kısa','50 saat+','100 saat+','Tam puan verdiğin','Bıraktığın oyun','Yeniden başladığın','Co-op','Arkadaşınla oynadığın','Adında sayı var','Tek kelimelik ad','Bu yıl çıkan','2000 öncesi','Pikselli grafik','Gece sabahladığın','Backlog’dan çıkan','Sinir krizi geçirten','Müziğine âşık olduğun','Kediyle oynanabilen','Ağlatan oyun','Bir devam oyunu','Serinin ilk oyunu','%100 bitirdiğin','İndirimde aldığın','Ücretsiz oyun','Hediye gelen','Türk yapımı','Japon yapımı','Hep ertelediğin','Bir saat diye başlayıp sabahladığın']
};
const poolOf=()=>curArea()==='book'?BINGO_POOL:POOLS[curArea()];
function mediaMatch(p,b,y){
  const t=String(p||'').toLocaleLowerCase('tr').trim(),g=genreOf(b),yr=+b.year||0,r=+b.rating||0,h=+b.pages||0,ti=String(b.title||'');
  if(GENRE_SETS[curArea()].some(x=>x.toLocaleLowerCase('tr')===t))return g.toLocaleLowerCase('tr')===t;
  const rules=[[/bir dizi/,()=>b.format==='dizi'],[/bir animasyon/,()=>b.format==='animasyon'],[/imdb 9/,()=>+b.imdb>=9],[/imdb 8/,()=>+b.imdb>=8],[/imdb 7 altı/,()=>b.imdb&&+b.imdb<7],
    [/1980 öncesi/,()=>yr&&yr<1980],[/90/,()=>yr>=1990&&yr<2000],[/2000’lerden/,()=>yr>=2000&&yr<2010],[/2000 öncesi/,()=>yr&&yr<2000],[/bu yıl çıkan/,()=>yr===y],
    [/tek kelimelik/,()=>ti.trim().split(/\s+/).length===1],[/renk/,()=>COLORS_RE.test(ti)],[/sayı/,()=>/\d/.test(ti)],[/tam puan/,()=>r>=10],[/4 puan altı/,()=>r&&r<4],
    [/pc oyunu/,()=>b.format==='pc'],[/playstation/,()=>b.format==='ps'],[/xbox/,()=>b.format==='xbox'],[/switch/,()=>b.format==='switch'],[/mobil/,()=>b.format==='mobil'],
    [/10 saatten/,()=>h&&h<10],[/100 saat/,()=>h>=100],[/50 saat/,()=>h>=50],[/backlog/,()=>b.fromTbr]];
  for(const[re,fn]of rules)if(re.test(t))return!!fn();
  return false;
}
/* stamps for films and games: same album, their own jokes */
function mediaStamps(y){
  const area=curArea(),R=readIn(y),mins=R.reduce((s,b)=>s+(+b.pages||0),0),byM=Array.from({length:12},(_,m)=>R.filter(b=>mOf(b.endDate)===m));
  let run=0,best=0;byM.forEach(a=>{run=a.length?run+1:0;best=Math.max(best,run)});
  const genres=new Set(R.map(genreOf).filter(g=>g!=='Türsüz')).size,goal=goalOf(y),bl=bingoLines(bingoCard(y));
  const au={};R.forEach(b=>{const k=(b.author||'').trim().toLocaleLowerCase('tr');if(k)au[k]=(au[k]||0)+1});const sameA=Math.max(0,...Object.values(au));
  const B=(id,nm,ds,g,val,target,tier=1)=>({id,nm,ds,g,val:Math.min(val,target),target,ok:val>=target,tier});
  const ten=R.filter(b=>+b.rating>=10).length,fmt=f=>R.filter(b=>b.format===f).length,rev=R.filter(b=>(b.review||'').trim().length>=15).length,skip=BOOKS().filter(b=>b.status==='skip').length;
  const list=area==='film'?[
    B('first','İlk Bilet','Yılın ilk yapımını bitir','seed',R.length,1),B('ten','Ayakta Alkış','Bir yapıma 10 ver','star',ten,1),B('imdb','IMDb Avcısı','IMDb 9+ bir yapım izle','trophy',R.filter(b=>+b.imdb>=9).length,1,2),
    B('old','Siyah Beyaz Ruh','1970 öncesi bir film izle','hourglass',R.filter(b=>b.year&&+b.year<1970).length,1,2),B('serial','Sezon Canavarı','5 dizi bitir','tvi',fmt('dizi'),5,2),B('anim','Çocuk Kalbi','5 animasyon izle','sparkle',fmt('animasyon'),5),
    B('genres','Tür Gezgini','6 farklı türde yapım','compass',genres,6,2),B('dir','Yönetmen Hayranı','Aynı yönetmenden 3 yapım','person',sameA,3,2),B('critic','Salon Eleştirmeni','10 seans notu yaz','pen',rev,10,2),
    B('no','Kararlı Seyirci','5 yapıma “izlemem” de','thin',skip,5),B('streak','Sezonluk Bilet','Üst üste 3 ay izle','flame',best,3),B('m25','Çeyrek Salon','25 yapım','stack',R.length,25),B('m100','Yüzlük Kulübü','100 yapım','stack',R.length,100,3),
    B('goal','Vizyon Tamam','Yıllık hedefine ulaş','trophy',R.length,goal,3),B('bingo','Bingo!','Kartta bir sıra tamamla','grid',bl.done.length,1,2),B('fullcard','Dolu Salon','Kartın tamamını doldur','sparkle',bl.filled,bl.total,3)
  ]:[
    B('first','Yeni Oyun','Yılın ilk oyununu bitir','seed',R.length,1),B('ten','Başyapıt Dedin','Bir oyuna 10 ver','star',ten,1),B('h100','Hayatım Oldu','Bir oyunda 100 saat','mountain',R.filter(b=>+b.pages>=100).length,1,3),
    B('short','Akşam Yemeği Oyunu','10 saatten kısa bir oyun bitir','thin',R.filter(b=>b.pages&&+b.pages<10).length,1),B('total','Dokunmatik Parmak','Yılda 500 saat','flame',mins,500,3),B('plat','Platform Göçebesi','3 farklı platform','compass',Object.keys(AREAS.game.formats).filter(f=>fmt(f)).length,3,2),
    B('genres','Tür Gezgini','5 farklı türde oyun','compass',genres,5,2),B('back','Backlog Katili','Listeden 3 oyun bitir','check',R.filter(b=>b.fromTbr).length,3,2),B('quit','Kendine Saygı','3 oyunu bırak, suçluluk duyma','thin',skip,3),
    B('dev','Stüdyo Sadakati','Aynı stüdyodan 3 oyun','person',sameA,3,2),B('critic','Oyun Dergisi','10 günlük notu yaz','pen',rev,10,2),B('streak','Günlük Görev','Üst üste 3 ay bitir','flame',best,3),B('m10','On Kredi','10 oyun bitir','stack',R.length,10,2),
    B('goal','Son Boss','Yıllık hedefine ulaş','trophy',R.length,goal,3),B('bingo','Bingo!','Kartta bir sıra tamamla','grid',bl.done.length,1,2),B('fullcard','%100 Kart','Kartın tamamını doldur','sparkle',bl.filled,bl.total,3)
  ];
  return{R,pages:mins,byM,list};
}
/* goal art: plant for books, popcorn for films, XP orb for games */
function goalArt(p){
  p=Math.max(0,Math.min(1,p));
  if(curArea()==='film'){const top=132-p*92;return `<svg class="plant" viewBox="0 0 120 160" aria-hidden="true"><path d="M26 58h68l-10 94H36z" fill="#FFF6EA"/><g fill="#EBA3AF"><path d="M34 58h13l4 94H42z"/><path d="M73 58h13l-8 94h-9z"/></g><clipPath id="pc"><rect x="20" y="${top.toFixed(1)}" width="80" height="150"/></clipPath><g clip-path="url(#pc)" fill="#FBE3A6" stroke="#EFCB7C" stroke-width="1.4">${[[36,50],[50,42],[66,44],[82,52],[44,60],[60,56],[74,62],[38,74],[56,72],[72,76],[46,90],[64,88],[52,106],[68,104],[56,122],[62,136]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="9"/>`).join('')}</g>${p>=1?'<g class="flower" fill="#FBE3A6" stroke="#EFCB7C"><circle cx="50" cy="28" r="9"/><circle cx="66" cy="26" r="10"/><circle cx="58" cy="16" r="8"/></g>':''}</svg>`}
  if(curArea()==='game'){const lvl=Math.floor(p*9)+1;return `<svg class="plant" viewBox="0 0 120 160" aria-hidden="true"><circle cx="60" cy="74" r="50" fill="#D5CCEB"/><circle cx="60" cy="74" r="50" fill="none" stroke="#FFF6EA" stroke-width="10"/><circle cx="60" cy="74" r="50" fill="none" stroke="#8FCBC2" stroke-width="10" stroke-linecap="round" pathLength="100" stroke-dasharray="${(p*100).toFixed(1)} 100" transform="rotate(-90 60 74)"/><text x="60" y="68" text-anchor="middle" font-size="14" font-weight="700" fill="#3A2C24" font-family="Figtree,sans-serif">LVL</text><text x="60" y="96" text-anchor="middle" font-size="32" font-weight="700" fill="#3A2C24" font-family="Figtree,sans-serif">${p>=1?'MAX':lvl}</text><rect x="28" y="136" width="64" height="16" rx="8" fill="#FBE3A6"/><text x="60" y="148" text-anchor="middle" font-size="10" font-weight="700" fill="#3A2C24" font-family="Figtree,sans-serif">${Math.round(p*100)} XP%</text></svg>`}
  return goalPlant(p);
}
