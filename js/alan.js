/* ---------- the three areas share one set of screens; everything that differs lives here ---------- */
const AREAS={
  book:{key:'book',brand:'Okuma Defteri',item:'kitap',Item:'Kitap',shelf:'Kitaplığım',who:'Yazar',unit:'sayfa',unitLong:'Sayfa',scale:5,howLabel:'Nasıl okudum?',ownLabel:'Kitaplığımda var (sahibim)',
    status:{want:'Okunacak',reading:'Okuyorum',read:'Okudum'},done:'okunduklarım',doneTitle:'Okuduklarım',nowLabel:'Şu an okuduklarım',notes:'Kitap Notlarım',noteLabel:'KİTAP NOTU',reviewPh:'Bu kitap bende ne bıraktı?',start:'Başladım',end:'Bitirdim',
    formats:{print:'Basılı',ebook:'E-kitap',audio:'Sesli'},fmtIcon:{print:'print',ebook:'ebook',audio:'audio'},
    legend:['Renkli: okudum','Renksiz: henüz okumadım','Kurdele: okuyorum'],
    list:{title:'Okunacaklar',wish:['İstek listem','elimde yok, okumak istiyorum','İşaretle: kitabı aldım, rafa geçsin','Aldım, rafa koy','İstek listen boş.'],wait:['Rafta bekleyenler','sahibim, henüz okumadım','İşaretle: okumaya başladım','Okumaya başladım','Rafta bekleyen kitap yok.'],now:['Okuyorum','şu an elimdekiler','İşaretle: bitirdim, puanını ver','Bitirdim','Şu an okuduğun kitap yok.'],ph:'Okumak istediğin kitabın adı (ve yazarı)',add:'Listeye ekle'},
    tabs:[['shelf','Kitaplık','shelf','Raf'],['covers','Kapaklar','covers','Kapak'],['notes','Notlar','pen','Notlar'],['stats','Yıl Özeti','chart','Özet'],['tbr','Okunacaklar','list','Liste'],['stamps','Hedef','stamp','Hedef'],['bingo','Bingo','grid','Bingo']]},
  film:{key:'film',brand:'Seyir Defteri',item:'film',Item:'Film',shelf:'DVD Sehpam',who:'Yönetmen',unit:'dakika',unitLong:'Dakika',scale:10,howLabel:'Türü',ownLabel:'Koleksiyonumda var',
    status:{want:'İzlemek istiyorum',reading:'İzliyorum',read:'İzledim',skip:'İzlemem'},done:'izlediklerim',doneTitle:'İzlediklerim',nowLabel:'Şu an izlediklerim',notes:'İzleme Notlarım',noteLabel:'SEANS NOTU',reviewPh:'Jenerik akarken aklında ne kaldı?',start:'Başladım',end:'Bitirdim',
    formats:{film:'Film',dizi:'Dizi',animasyon:'Animasyon'},fmtIcon:{film:'filmi',dizi:'tvi',animasyon:'sparkle'},
    legend:['Renkli kutu: izledim','','Kurdele: izliyorum'],
    list:{title:'İzlenecekler',wish:['İzlemek istediklerim','rafta görünmez, sırası gelince başlarsın','İşaretle: izlemeye başladım','İzlemeye başladım','İzlemek istediğin film yok.'],unrated:['Henüz oylamadıkların','arkadaşların ve Keşfet listesinden','İşaretle: izledim, puanını ver','İzledim','Oylamadığın film kalmadı.'],now:['İzliyorum','şu an devam edenler','İşaretle: bitirdim, puanını ver','Bitirdim','Şu an izlediğin bir şey yok.'],ph:'İzlemek istediğin film ya da dizi',add:'Listeye ekle'},
    tabs:[['shelf','Sehpa','shelf','Sehpa'],['kesfet','Keşfet','compass','Keşfet'],['covers','Afişler','covers','Afiş'],['notes','Notlar','pen','Notlar'],['stats','Yıl Özeti','chart','Özet'],['tbr','İzlenecekler','list','Liste'],['stamps','Hedef','stamp','Hedef'],['bingo','Bingo','grid','Bingo']]},
  game:{key:'game',brand:'Oyunlar',item:'oyun',Item:'Oyun',shelf:'Oyun Ekranım',who:'Stüdyo',unit:'saat',unitLong:'Saat',scale:10,howLabel:'Nerede oynadım?',ownLabel:'Kütüphanemde var',
    status:{want:'Arşivde',reading:'Oynuyorum',read:'Bitirdim',skip:'Bıraktım'},done:'bitirdiklerim',doneTitle:'Bitirdiklerim',nowLabel:'Şu an oynadıklarım',notes:'Oyun Günlüğüm',noteLabel:'KAYIT NOKTASI',reviewPh:'Son kayıt noktasından notlar…',start:'Başladım',end:'Bitirdim',
    formats:{pc:'PC',ps:'PlayStation',xbox:'Xbox',switch:'Switch',mobil:'Mobil'},fmtIcon:{pc:'desktop',ps:'pad',xbox:'pad',switch:'pad',mobil:'phone'},
    legend:['Renkli: bitirdim','Renksiz: henüz oynamadım','Kurdele: oynuyorum'],
    list:{title:'Oyun Arşivi',wish:['İstek listem','henüz almadım, gözüm üstünde','İşaretle: aldım, arşive geçsin','Aldım','İstek listen boş.'],wait:['Arşivde bekleyenler','satın aldım, hiç açmadım (herkes yapıyor)','İşaretle: oynamaya başladım','Oynamaya başladım','Bekleyen oyun yok. Bu bir mucize.'],now:['Oynuyorum','şu anki kayıtlar','İşaretle: bitirdim, puanını ver','Bitirdim','Şu an oynadığın bir oyun yok.'],ph:'Oynamak istediğin oyun',add:'Listeye ekle'},
    tabs:[['shelf','Ekran','shelf','Ekran'],['kesfet','Keşfet','compass','Keşfet'],['covers','Buhar','covers','Buhar'],['notes','Günlük','pen','Günlük'],['stats','Yıl Özeti','chart','Özet'],['tbr','Oyun Arşivi','list','Arşiv'],['stamps','Hedef','stamp','Hedef'],['bingo','Bingo','grid','Bingo']]}
};
Object.assign(AREAS.book,{add:'Kitap ekle',withItem:'kitapla',doneVerb:'okuduğun',yearL:'Yayın yılı',noneYet:'Henüz kimse okumadı. İlk sen ol.',noneShort:'Henüz kimse okumadı',startMsg:'okunuyor. İyi okumalar!',waitLabel:'rafta bekleyen',ownMsg:'rafa geçti'});
Object.assign(AREAS.film,{formatsPl:{film:'Filmler',dizi:'Diziler',animasyon:'Animasyonlar'},add:'Film ekle',withItem:'filmle',doneVerb:'izlediğin',yearL:'Çıkış yılı',noneYet:'Henüz kimse izlemedi. İlk sen ol.',noneShort:'Henüz kimse izlemedi',startMsg:'izleniyor. İyi seyirler!',noOwn:true});
Object.assign(AREAS.game,{add:'Oyun ekle',withItem:'oyunla',doneVerb:'oynadığın',yearL:'Çıkış yılı',noneYet:'Henüz kimse oynamadı. İlk sen ol.',noneShort:'Henüz kimse oynamadı',startMsg:'oynanıyor. İyi oyunlar!',waitLabel:'arşivde',ownMsg:'arşive geçti'});
/* little things that live next to the shelves; all share one 60x82 canvas */
const PROPS={
 popcorn:'<path d="M12 34h36l-5 46H17z" fill="#FFF6EA"/><g fill="#E58F9C"><path d="M18 34h7l2 46h-7z"/><path d="M35 34h7l-3 46h-7z"/></g><g fill="#FBE3A6" stroke="#E9C678"><circle cx="17" cy="30" r="7"/><circle cx="29" cy="24" r="8"/><circle cx="42" cy="29" r="7"/><circle cx="23" cy="33" r="6"/><circle cx="36" cy="33" r="6"/></g>',
 glasses:'<rect x="4" y="60" width="52" height="18" rx="4" fill="#3B3F52"/><rect x="9" y="64" width="19" height="10" rx="2" fill="#E8798A"/><rect x="32" y="64" width="19" height="10" rx="2" fill="#7CB7E0"/><path d="M4 66 0 58M56 66l4-8" stroke="#3B3F52" stroke-width="3" stroke-linecap="round"/><path d="M11 72l6-7" stroke="#fff" stroke-width="1.5" opacity=".6"/>',
 stanley:'<rect x="28" y="4" width="4" height="22" rx="2" fill="#E9B7C0" transform="rotate(7 30 14)"/><path d="M14 22h32v5l-4 51a3 3 0 0 1-3 3H21a3 3 0 0 1-3-3L14 27z" fill="#8FB9A6"/><rect x="12" y="19" width="36" height="8" rx="3" fill="#6F9A87"/><path d="M45 34h7a5 5 0 0 1 5 5v18a5 5 0 0 1-5 5h-8" fill="none" stroke="#6F9A87" stroke-width="5"/><path d="M21 34l2 40" stroke="#fff" stroke-width="2.5" stroke-linecap="round" opacity=".45"/>',
 remote:'<g transform="rotate(-18 30 60)"><rect x="19" y="22" width="22" height="60" rx="5" fill="#4E5468"/><circle cx="30" cy="31" r="3.5" fill="#E8798A"/><g fill="#C9D3E2"><rect x="24" y="41" width="5" height="4" rx="1"/><rect x="32" y="41" width="5" height="4" rx="1"/><rect x="24" y="49" width="5" height="4" rx="1"/><rect x="32" y="49" width="5" height="4" rx="1"/><rect x="24" y="57" width="5" height="4" rx="1"/><rect x="32" y="57" width="5" height="4" rx="1"/></g></g>',
 clapper:'<rect x="6" y="46" width="48" height="34" rx="3" fill="#3B3F52"/><path d="M12 56h36M12 64h24" stroke="#F6EEDF" stroke-width="2.5" stroke-linecap="round"/><g transform="rotate(-12 6 44)"><rect x="6" y="34" width="48" height="11" rx="2" fill="#F6EEDF"/><path d="M12 34l7 11h7l-7-11zM27 34l7 11h7l-7-11zM42 34l7 11h5l-7-11z" fill="#3B3F52"/></g>',
 pad:'<path d="M13 56h34c9 0 13 11 11 19-1 5-8 6-11 1l-5-6H18l-5 6c-3 5-10 4-11-1-2-8 2-19 11-19z" fill="#7C86A8"/><path d="M15 61v9M10.500 65.500h9" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/><circle cx="43" cy="62" r="2.500" fill="#EBA3AF"/><circle cx="49" cy="68" r="2.500" fill="#8FCBC2"/>',
 headset:'<path d="M12 62V48a18 18 0 0 1 36 0v14" fill="none" stroke="#4E5468" stroke-width="6"/><rect x="5" y="54" width="13" height="22" rx="6" fill="#C3AEDD"/><rect x="42" y="54" width="13" height="22" rx="6" fill="#C3AEDD"/>',
 can:'<rect x="16" y="20" width="28" height="60" rx="5" fill="#8FCBC2"/><rect x="19" y="16" width="22" height="5" rx="2" fill="#B9C2CC"/><path d="M34 34 24 54h8l-4 16 12-22h-8z" fill="#FBE3A6"/>',
 mug:'<path d="M12 44h32v26a9 9 0 0 1-9 9H21a9 9 0 0 1-9-9z" fill="#F6C9D0"/><path d="M44 50h5a6 6 0 0 1 0 16h-5" fill="none" stroke="#F6C9D0" stroke-width="5"/><path d="M22 36c-3-4 3-6 0-11M33 36c-3-4 3-6 0-11" fill="none" stroke="#B6AA96" stroke-width="2" stroke-linecap="round"/>'
};
const prop=k=>`<svg class="prop" viewBox="0 0 60 82" aria-hidden="true">${PROPS[k]}</svg>`;
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
  game:['RPG','Aksiyon','Macera','Strateji','Simülasyon','Bulmaca','Platform','Roguelike','Korku','Hikâye','Yarış','Spor','Nişancı','Hayatta kalma','Cozy','Indie','PC oyunu','PlayStation oyunu','Xbox oyunu','Switch oyunu','Mobil oyun','10 saatten kısa','50 saat+','100 saat+','Tam puan verdiğin','Bıraktığın oyun','Yeniden başladığın','Co-op','Arkadaşınla oynadığın','Adında sayı var','Tek kelimelik ad','Bu yıl çıkan','2000 öncesi','Pikselli grafik','Gece sabahladığın','Arşivden çıkan','Sinir krizi geçirten','Müziğine âşık olduğun','Kediyle oynanabilen','Ağlatan oyun','Bir devam oyunu','Serinin ilk oyunu','%100 bitirdiğin','İndirimde aldığın','Ücretsiz oyun','Hediye gelen','Türk yapımı','Japon yapımı','Hep ertelediğin','Bir saat diye başlayıp sabahladığın']
};
const poolOf=()=>curArea()==='book'?BINGO_POOL:POOLS[curArea()];
function mediaMatch(p,b,y){
  const t=String(p||'').toLocaleLowerCase('tr').trim(),g=genreOf(b),yr=+b.year||0,r=+b.rating||0,h=+b.pages||0,ti=String(b.title||'');
  if(GENRE_SETS[curArea()].some(x=>x.toLocaleLowerCase('tr')===t))return g.toLocaleLowerCase('tr')===t;
  const rules=[[/bir dizi/,()=>b.format==='dizi'],[/bir animasyon/,()=>b.format==='animasyon'],[/imdb 9/,()=>+b.imdb>=9],[/imdb 8/,()=>+b.imdb>=8],[/imdb 7 altı/,()=>b.imdb&&+b.imdb<7],
    [/1980 öncesi/,()=>yr&&yr<1980],[/90/,()=>yr>=1990&&yr<2000],[/2000’lerden/,()=>yr>=2000&&yr<2010],[/2000 öncesi/,()=>yr&&yr<2000],[/bu yıl çıkan/,()=>yr===y],
    [/tek kelimelik/,()=>ti.trim().split(/\s+/).length===1],[/renk/,()=>COLORS_RE.test(ti)],[/sayı/,()=>/\d/.test(ti)],[/tam puan/,()=>r>=10],[/4 puan altı/,()=>r&&r<4],
    [/pc oyunu/,()=>b.format==='pc'],[/playstation/,()=>b.format==='ps'],[/xbox/,()=>b.format==='xbox'],[/switch/,()=>b.format==='switch'],[/mobil/,()=>b.format==='mobil'],
    [/10 saatten/,()=>h&&h<10],[/100 saat/,()=>h>=100],[/50 saat/,()=>h>=50],[/backlog|arşivden/,()=>b.fromTbr]];
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
    B('first','İlk Bilet','Yılın ilk filmini bitir','seed',R.length,1),B('ten','Ayakta Alkış','Bir filme 10 ver','star',ten,1),B('imdb','IMDb Avcısı','IMDb 9+ bir film izle','trophy',R.filter(b=>+b.imdb>=9).length,1,2),
    B('old','Siyah Beyaz Ruh','1970 öncesi bir film izle','hourglass',R.filter(b=>b.year&&+b.year<1970).length,1,2),B('serial','Sezon Canavarı','5 dizi bitir','tvi',fmt('dizi'),5,2),B('anim','Çocuk Kalbi','5 animasyon izle','sparkle',fmt('animasyon'),5),
    B('genres','Tür Gezgini','6 farklı türde film','compass',genres,6,2),B('dir','Yönetmen Hayranı','Aynı yönetmenden 3 film','person',sameA,3,2),B('critic','Salon Eleştirmeni','10 seans notu yaz','pen',rev,10,2),
    B('no','Kararlı Seyirci','5 filme “izlemem” de','thin',skip,5),B('streak','Sezonluk Bilet','Üst üste 3 ay izle','flame',best,3),B('m25','Çeyrek Salon','25 film','stack',R.length,25),B('m100','Yüzlük Kulübü','100 film','stack',R.length,100,3),
    B('goal','Vizyon Tamam','Yıllık hedefine ulaş','trophy',R.length,goal,3),B('bingo','Bingo!','Kartta bir sıra tamamla','grid',bl.done.length,1,2),B('fullcard','Dolu Salon','Kartın tamamını doldur','sparkle',bl.filled,bl.total,3)
  ]:[
    B('first','Yeni Oyun','Yılın ilk oyununu bitir','seed',R.length,1),B('ten','Başyapıt Dedin','Bir oyuna 10 ver','star',ten,1),B('h100','Hayatım Oldu','Bir oyunda 100 saat','mountain',R.filter(b=>+b.pages>=100).length,1,3),
    B('short','Akşam Yemeği Oyunu','10 saatten kısa bir oyun bitir','thin',R.filter(b=>b.pages&&+b.pages<10).length,1),B('total','Dokunmatik Parmak','Yılda 500 saat','flame',mins,500,3),B('plat','Platform Göçebesi','3 farklı platform','compass',Object.keys(AREAS.game.formats).filter(f=>fmt(f)).length,3,2),
    B('genres','Tür Gezgini','5 farklı türde oyun','compass',genres,5,2),B('back','Arşiv Avcısı','Arşivden 3 oyun bitir','check',R.filter(b=>b.fromTbr).length,3,2),B('quit','Kendine Saygı','3 oyunu bırak, suçluluk duyma','thin',skip,3),
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
