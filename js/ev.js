/* ---------- home: the cozy room, its three doors, and the pet who lives there ---------- */
const COATS={
  kedi:[['#F2C9A1','#DDA877','#FBE9D4'],['#C9C4D8','#A9A3BE','#ECE9F3'],['#4F4A58','#39353F','#8C8796']],
  kopek:[['#E9CFA6','#C9A673','#FAF0DE'],['#D9A98A','#B9825F','#F6E3D4'],['#F4EEE3','#D7CCB9','#FFFFFF']],
  tavsan:[['#F6EDE3','#DDD0C0','#FFFFFF'],['#D8C3B0','#B9A08A','#F2E7DC'],['#D9D6E6','#B7B3CC','#F2F0F8']],
  kirpi:[['#E8D6BE','#8F6F55','#F7EDE0'],['#EAD9C8','#6F6A7E','#F8F0E6'],['#EFDCC2','#A97F5B','#FBF0E0']]
};
const PETS={
  kedi:{n:'Kedi',tag:'Kibirli. Her şeyi bilir, hiçbir şeyi beğenmez.'},
  kopek:{n:'Köpek',tag:'Coşkulu. Sana inanıyor, kitaplarını yemese de.'},
  tavsan:{n:'Tavşan',tag:'Telaşlı. Hep bir yere yetişiyor, listelerin onu geriyor.'},
  kirpi:{n:'Kirpi',tag:'Filozof. Az konuşur, konuşunca insan düşünür.'}
};
const EYES=`<g class="eyes"><circle cx="91" cy="47" r="3" fill="#3A2C24"/><circle cx="106" cy="47" r="3" fill="#3A2C24"/><circle cx="92" cy="46" r="1" fill="#fff"/><circle cx="107" cy="46" r="1" fill="#fff"/></g><g class="eyes-c" fill="none" stroke="#3A2C24" stroke-width="2" stroke-linecap="round"><path d="M87 47q4 3 8 0M102 47q4 3 8 0"/></g>`;
const BLUSH=`<circle cx="85" cy="54" r="4" fill="#F2A7B0" opacity=".6"/><circle cx="112" cy="54" r="4" fill="#F2A7B0" opacity=".6"/>`;
const LEGS=(y,h)=>`<g class="legs"><rect class="lg l2" x="52" y="${y}" width="9" height="${h}" rx="4.5" fill="var(--pd)"/><rect class="lg l4" x="84" y="${y}" width="9" height="${h}" rx="4.5" fill="var(--pd)"/><rect class="lg l1" x="40" y="${y}" width="10" height="${h}" rx="5" fill="var(--pm)"/><rect class="lg l3" x="73" y="${y}" width="10" height="${h}" rx="5" fill="var(--pm)"/></g>`;
const PET_ART={
  kedi:`<path class="ptail" d="M32 70C12 66 8 44 20 32" fill="none" stroke="var(--pd)" stroke-width="8" stroke-linecap="round"/>${LEGS(78,24)}<ellipse cx="62" cy="68" rx="34" ry="20" fill="var(--pm)"/><ellipse cx="66" cy="76" rx="22" ry="10" fill="var(--pl)"/><path d="M83 38l-3-22 18 12zM113 38l3-22-18 12z" fill="var(--pm)"/><path d="M85 33l-1-11 9 6zM111 33l1-11-9 6z" fill="#F2B8C0"/><circle cx="98" cy="48" r="20" fill="var(--pm)"/>${EYES}${BLUSH}<path d="M96 53h4l-2 3z" fill="#E08A97"/><path d="M98 56q-3 4-6 1M98 56q3 4 6 1" fill="none" stroke="#3A2C24" stroke-width="1.3" stroke-linecap="round"/><g stroke="#3A2C24" stroke-width="1" opacity=".45" stroke-linecap="round"><path d="M80 52l-9-2M80 56l-9 2M116 52l9-2M116 56l9 2"/></g>`,
  kopek:`<path class="ptail" d="M30 62C18 54 16 42 22 34" fill="none" stroke="var(--pd)" stroke-width="9" stroke-linecap="round"/>${LEGS(78,24)}<ellipse cx="62" cy="67" rx="35" ry="21" fill="var(--pm)"/><ellipse cx="66" cy="76" rx="22" ry="10" fill="var(--pl)"/><circle cx="98" cy="46" r="21" fill="var(--pm)"/><ellipse cx="78" cy="48" rx="8" ry="16" fill="var(--pd)" transform="rotate(10 78 48)"/><ellipse cx="118" cy="48" rx="8" ry="16" fill="var(--pd)" transform="rotate(-10 118 48)"/><ellipse cx="99" cy="56" rx="11" ry="8" fill="var(--pl)"/>${EYES}<ellipse cx="99" cy="52" rx="4" ry="3" fill="#3A2C24"/><path d="M99 55v4" stroke="#3A2C24" stroke-width="1.3"/><path class="tongue" d="M96 60h6v5a3 3 0 0 1-6 0z" fill="#EE9AA8"/>`,
  tavsan:`<circle class="ptail" cx="27" cy="68" r="10" fill="var(--pl)"/>${LEGS(84,18)}<ellipse cx="60" cy="70" rx="34" ry="22" fill="var(--pm)"/><ellipse cx="64" cy="78" rx="22" ry="11" fill="var(--pl)"/><g class="ears"><ellipse cx="88" cy="16" rx="7" ry="20" fill="var(--pm)" transform="rotate(-10 88 16)"/><ellipse cx="88" cy="17" rx="3.5" ry="14" fill="#F2B8C0" transform="rotate(-10 88 17)"/><ellipse cx="106" cy="16" rx="7" ry="20" fill="var(--pm)" transform="rotate(10 106 16)"/><ellipse cx="106" cy="17" rx="3.5" ry="14" fill="#F2B8C0" transform="rotate(10 106 17)"/></g><circle cx="98" cy="50" r="19" fill="var(--pm)"/>${EYES}${BLUSH}<path d="M96 54h4l-2 2.5z" fill="#E08A97"/><path d="M98 57v3" stroke="#3A2C24" stroke-width="1.2"/><rect x="96" y="60" width="4" height="4" rx="1" fill="#fff" stroke="#D8CFC3" stroke-width=".6"/>`,
  kirpi:`${LEGS(88,14)}<path class="spikes" d="M18 84L12 70l10 2-5-14 12 6-1-15 11 9 3-15 9 12 7-14 7 13 9-11 2 15 11-6-3 14 11-1-7 10 8 4-14 5v10z" fill="var(--pd)"/><ellipse cx="62" cy="78" rx="38" ry="18" fill="var(--pd)"/><ellipse cx="86" cy="72" rx="24" ry="20" fill="var(--pm)"/><path d="M104 62q16 8 18 14-8 6-20 6z" fill="var(--pl)"/>${`<g class="eyes"><circle cx="97" cy="66" r="3" fill="#3A2C24"/><circle cx="98" cy="65" r="1" fill="#fff"/></g><g class="eyes-c" fill="none" stroke="#3A2C24" stroke-width="2" stroke-linecap="round"><path d="M93 66q4 3 8 0"/></g>`}<circle cx="122" cy="76" r="3.4" fill="#3A2C24"/><circle cx="94" cy="76" r="4" fill="#F2A7B0" opacity=".6"/>`
};
function petSVG(type,coat=0){
  const c=(COATS[type]||COATS.kedi)[coat]||COATS[type][0];
  return `<svg class="pet-svg" viewBox="0 0 140 110" style="--pm:${c[0]};--pd:${c[1]};--pl:${c[2]}" aria-hidden="true"><ellipse class="pshadow" cx="66" cy="104" rx="44" ry="5" fill="rgba(60,40,25,.14)"/><g class="pet-body">${PET_ART[type]||PET_ART.kedi}</g></svg>`;
}
const petOf=()=>Store.extra?.pet||null;

/* what each pet says when you tap it; {s} is its name, numbers come from the open library */
function petLine(){
  const p=petOf();if(!p)return'';
  const r=S.books.filter(b=>b.status==='read').length,w=S.books.filter(b=>b.status==='want'&&!b.owned).length,now=S.books.filter(b=>b.status==='reading').length,y=readIn(new Date().getFullYear()).length;
  const L={
    kedi:[`${r} kitap okumuşsun. Fena değil. Ben hiç okumadım ve yine de daha bilgiliyim.`,`İstek listende ${w} kitap var. Bunu hedef sanıyorsun, ben depo diyorum.`,`Okşayabilirsin. Üç saniye. Sayıyorum.`,`Şu an ${now} kitabı aynı anda okuyorsun. Ben aynı anda dört koltukta uyuyorum, anlıyorum seni.`,`Kitabın üstüne oturdum, çünkü en iyi yorum budur.`],
    kopek:[`${r} KİTAP MI OKUDUN?! Sen harikasın! Ne okuduğunu bilmiyorum ama harikasın!`,`Bu yıl ${y} kitap! Ben de bu yıl çok şey ısırdım, ikimiz de çok başarılıyız!`,`Televizyonu açalım mı? Konsolu açalım mı? Topu açalım mı? Top açılır mı?`,`İstek listende ${w} kitap var! Hepsini getireyim mi? Nereden getireceğimi bilmiyorum ama koşarım!`,`Geldin! Yine geldin! En sevdiğim an bu!`],
    tavsan:[`${w} kitap bekliyor, ${now} kitap yarıda, saat kaç, neden kimse paniklemiyor?`,`Bu yıl ${y} kitap bitirmişsin. Hesapladım, geride miyiz, önde miyiz, tekrar hesaplıyorum.`,`Hızlı olalım. Neye geç kaldık bilmiyorum ama hızlı olalım.`,`Rafa bakınca kalbim hızlanıyor. Bu normal mi? Bende her şey hızlı.`,`Bir kitap bitirdin mi? Bitirince söyle, bir sonrakini şimdiden aldım kafamda.`],
    kirpi:[`${r} kitap. İnsan okudukça mı dolar, yoksa boşaldığını mı fark eder?`,`Herkesin dikeni var. Benimki sadece daha görünür.`,`${now} kitabı yarıda bırakmak da bir tercih. Ben de çoğu cümleyi yarıda`,`Raf doldukça ev küçülür, insan büyür. Sanırım.`,`Sessizce yanında oturabilirim. En iyi yaptığım şey bu.`]
  }[p.type]||[];
  return L[Math.floor(Math.random()*L.length)];
}

/* the room, painted in SVG with the page's tokens so it follows light and dark */
function roomBooks(){
  let out='',r=rng(7);
  [[126,118],[206,198],[286,278],[366,358]].forEach(([base],row)=>{
    let x=66;while(x<262){const w=10+r()*12|0,h=52+r()*20|0,c=PCOLS[(r()*PCOLS.length)|0];
      if(r()<.1){x+=14;continue}
      const lean=r()<.1?` transform="rotate(7 ${x} ${base})"`:'';
      out+=`<rect x="${x}" y="${base-h}" width="${w}" height="${h}" rx="2" fill="${c}"${lean}/><rect x="${x}" y="${base-h+8}" width="${w}" height="2" fill="rgba(60,40,25,.18)"${lean}/>`;x+=w+1.5}
  });
  return out;
}
const PEEK_LINES=['Hey. Evet, sen. İçerisi sıcak mı?','Camı açsan fena olmaz. Yağmur yağmıyor ama ilke olarak.','Seni izliyorum. Kötü bir şey değil, sadece fazla.','Bu rafta bana yer var. Bakmadım ama var.','Tıkla da içeri gireyim. Mamayı sonra konuşuruz.','Burada dakikalardır bekliyorum. Saat tuttum.'];
const ROOM=()=>`<svg class="room-svg" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" role="group" aria-label="Oda">
  <defs><pattern id="wp" width="46" height="46" patternUnits="userSpaceOnUse"><circle cx="11" cy="11" r="2.4" fill="var(--wall-dot)"/><path d="M34 30l2.4 5 5.4.6-4 3.7 1 5.3-4.8-2.6-4.8 2.6 1-5.3-4-3.7 5.4-.6z" fill="var(--wall-dot)"/></pattern>
  <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--win-1)"/><stop offset="1" stop-color="var(--win-2)"/></linearGradient>
  <linearGradient id="scr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#BFD8EE"/><stop offset="1" stop-color="#E9CFE6"/></linearGradient>
  <radialGradient id="lamp"><stop offset="0" stop-color="#FFE9A8" stop-opacity=".75"/><stop offset="1" stop-color="#FFE9A8" stop-opacity="0"/></radialGradient></defs>
  <rect width="1000" height="600" fill="var(--wall)"/><rect width="1000" height="440" fill="url(#wp)"/>
  <rect y="378" width="1000" height="62" fill="var(--wall-2)"/><rect y="372" width="1000" height="7" fill="var(--trim)"/>
  <rect y="440" width="1000" height="160" fill="var(--floor)"/><rect y="440" width="1000" height="8" fill="var(--trim)"/>
  <g stroke="var(--floor-2)" stroke-width="2"><path d="M0 490h1000M0 545h1000M120 448v42M340 448v42M610 448v42M850 448v42M230 490v55M480 490v55M740 490v55M60 545v55M390 545v55M660 545v55M920 545v55"/></g>
  <!-- window -->
  <g><rect x="382" y="34" width="236" height="168" rx="10" fill="var(--trim)"/><rect x="394" y="46" width="212" height="144" fill="url(#glass)"/>
    <g class="win-day"><circle cx="560" cy="86" r="18" fill="#FFE29A"/><ellipse cx="450" cy="92" rx="30" ry="9" fill="#fff" opacity=".9"/><ellipse cx="468" cy="84" rx="16" ry="10" fill="#fff" opacity=".9"/></g>
    <g class="win-night" fill="#FFF6DA"><circle cx="430" cy="74" r="1.6"/><circle cx="470" cy="100" r="1.3"/><circle cx="520" cy="66" r="1.5"/><circle cx="590" cy="108" r="1.2"/><circle cx="560" cy="84" r="16" fill="#F6E3A8"/><circle cx="567" cy="79" r="14" fill="var(--win-1)"/></g>
    <path d="M394 190v-36q50-26 104-8t108-6v50z" fill="var(--hill-2)"/><path d="M394 190v-16q70-18 212 0v16z" fill="var(--hill-3)"/>
    ${!petOf()&&S.viewing===S.me?`<g class="peek" data-act="pet-setup" role="button" tabindex="0" aria-label="Pencereden bakan ev arkadaşını seç"><rect x="430" y="128" width="140" height="62" fill="transparent"/><g class="peek-eyes"><ellipse cx="478" cy="160" rx="12" ry="14" fill="#FFF6EA" stroke="#3A2C24" stroke-width="2.5"/><ellipse cx="522" cy="160" rx="12" ry="14" fill="#FFF6EA" stroke="#3A2C24" stroke-width="2.5"/><circle class="pupil" cx="480" cy="163" r="6.5" fill="#2E2A3A"/><circle class="pupil" cx="524" cy="163" r="6.5" fill="#2E2A3A"/><circle cx="482" cy="160" r="2" fill="#fff"/><circle cx="526" cy="160" r="2" fill="#fff"/></g></g>`:''}
    <path d="M500 46v144M394 118h212" stroke="var(--trim)" stroke-width="7"/><rect x="376" y="198" width="248" height="11" rx="4" fill="var(--wood-3)"/>
    <path d="M372 28h256" stroke="var(--wood-2)" stroke-width="6" stroke-linecap="round"/><path d="M380 30c6 60 4 120 22 164-22 4-34 2-40-2 10-50 8-110 4-162z" fill="#F6C9D0"/><path d="M620 30c-6 60-4 120-22 164 22 4 34 2 40-2-10-50-8-110-4-162z" fill="#F6C9D0"/></g>
  <!-- string lights -->
  <path d="M0 20Q170 72 340 22" fill="none" stroke="var(--wood-2)" stroke-width="1.6"/><path d="M660 22Q830 72 1000 20" fill="none" stroke="var(--wood-2)" stroke-width="1.6"/>
  <g class="fairy">${[[50,34],[110,48],[170,52],[230,46],[290,32],[710,32],[770,46],[830,52],[890,48],[950,34]].map(([x,y],i)=>`<circle class="fl f${i%3}" cx="${x}" cy="${y}" r="5" fill="${['#FBE3A6','#F6C9D0','#CFE6C2'][i%3]}"/>`).join('')}</g>
  <!-- bookcase -->
  <g class="spot" data-act="area" data-a="book" role="button" tabindex="0" aria-label="Kitap Rafı">
    <rect class="halo" x="34" y="30" width="266" height="430" rx="14"/>
    <rect x="48" y="50" width="236" height="396" rx="6" fill="var(--wood-2)"/><rect x="58" y="60" width="216" height="376" fill="var(--case)"/>
    ${roomBooks()}
    <g fill="var(--wood)"><rect x="58" y="126" width="216" height="10"/><rect x="58" y="206" width="216" height="10"/><rect x="58" y="286" width="216" height="10"/><rect x="58" y="366" width="216" height="10"/></g>
    <rect x="58" y="376" width="216" height="60" fill="var(--wood-2)" opacity=".55"/><rect x="100" y="392" width="56" height="30" rx="3" fill="var(--wood)"/><rect x="176" y="392" width="56" height="30" rx="3" fill="var(--wood)"/><circle cx="148" cy="407" r="3" fill="#F2B53A"/><circle cx="184" cy="407" r="3" fill="#F2B53A"/>
    <g transform="translate(232 -4) scale(.82)"><path d="M16 52h28l-4 18H20z" fill="#C97C5D"/><rect x="13" y="48" width="34" height="7" rx="2" fill="#A9604A"/><g fill="#7FA872"><ellipse cx="30" cy="30" rx="5" ry="17"/><ellipse cx="20" cy="35" rx="5" ry="14" transform="rotate(-30 20 35)"/><ellipse cx="40" cy="35" rx="5" ry="14" transform="rotate(30 40 35)"/></g></g>
  </g>
  <!-- TV -->
  <g class="spot" data-act="area" data-a="film" role="button" tabindex="0" aria-label="Seyir Defteri">
    <rect class="halo" x="352" y="222" width="300" height="250" rx="14"/>
    <path d="M470 246l-34-34M530 246l34-34" stroke="var(--ink-2)" stroke-width="3" stroke-linecap="round"/><circle cx="436" cy="212" r="4" fill="#EBA3AF"/><circle cx="564" cy="212" r="4" fill="#EBA3AF"/>
    <rect x="384" y="244" width="232" height="146" rx="20" fill="#A9D3C7"/><rect x="384" y="376" width="232" height="14" rx="7" fill="#8FBFB3"/>
    <rect x="400" y="258" width="156" height="118" rx="16" fill="#35404F"/><rect x="408" y="266" width="140" height="102" rx="12" fill="url(#scr)"/>
    <path class="tvplay" d="M466 298l32 19-32 19z" fill="#fff" opacity=".9"/><path d="M416 276q40-8 70-4" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".5" fill="none"/>
    <circle cx="586" cy="282" r="11" fill="#F6C9D0"/><circle cx="586" cy="282" r="3" fill="#C98592"/><circle cx="586" cy="316" r="11" fill="#FBE3A6"/><circle cx="586" cy="316" r="3" fill="#C9A25B"/><g stroke="#7CAA9D" stroke-width="2.4" stroke-linecap="round"><path d="M574 342h24M574 350h24M574 358h24"/></g>
    <rect x="364" y="392" width="272" height="60" rx="8" fill="var(--wood)"/><rect x="364" y="392" width="272" height="9" rx="4" fill="var(--wood-3)"/>
    <g><rect x="382" y="410" width="74" height="30" rx="3" fill="var(--wood-2)"/><rect x="544" y="410" width="74" height="30" rx="3" fill="var(--wood-2)"/><rect x="470" y="410" width="60" height="7" rx="1" fill="#C3AEDD"/><rect x="466" y="418" width="66" height="7" rx="1" fill="#EBB88C"/><rect x="472" y="426" width="58" height="7" rx="1" fill="#9FC1E3"/></g>
    <rect x="384" y="452" width="14" height="14" fill="var(--wood-2)"/><rect x="602" y="452" width="14" height="14" fill="var(--wood-2)"/>
  </g>
  <!-- console -->
  <g class="spot" data-act="area" data-a="game" role="button" tabindex="0" aria-label="Oyunlar">
    <rect class="halo" x="694" y="288" width="280" height="196" rx="14"/>
    <ellipse cx="836" cy="474" rx="128" ry="12" fill="rgba(60,40,25,.1)"/>
    <rect x="714" y="396" width="244" height="14" rx="7" fill="var(--wood-3)"/><rect x="730" y="408" width="14" height="62" fill="var(--wood)"/><rect x="928" y="408" width="14" height="62" fill="var(--wood)"/>
    <rect x="744" y="322" width="150" height="74" rx="14" fill="#D5CCEB"/><rect x="744" y="378" width="150" height="18" rx="9" fill="#BEB2DC"/>
    <rect x="768" y="310" width="86" height="20" rx="4" fill="#EBA3AF"/><rect x="778" y="302" width="66" height="14" rx="3" fill="#FBE3A6"/><rect x="788" y="304" width="46" height="8" rx="1" fill="#fff" opacity=".7"/>
    <circle cx="768" cy="356" r="9" fill="#F6C9D0"/><circle cx="794" cy="356" r="6" fill="#9FC1E3"/><rect x="816" y="348" width="60" height="6" rx="3" fill="#A79AC9"/><rect x="816" y="360" width="60" height="6" rx="3" fill="#A79AC9"/>
    <path d="M894 372c26 2 26 24 40 24" fill="none" stroke="var(--ink-2)" stroke-width="2.4"/>
    <g transform="translate(902 366)"><rect x="0" y="10" width="56" height="30" rx="14" fill="#A9D3C7"/><path d="M12 18v14M5 25h14" stroke="#fff" stroke-width="4" stroke-linecap="round"/><circle cx="40" cy="22" r="3.4" fill="#EBA3AF"/><circle cx="47" cy="28" r="3.4" fill="#FBE3A6"/></g>
    <g><rect x="946" y="350" width="0" height="0"/><rect x="706" y="372" width="30" height="24" rx="2" fill="#EBB88C"/><rect x="702" y="350" width="34" height="22" rx="2" fill="#9FC1E3"/></g>
  </g>
  <!-- lamp and plant -->
  <circle cx="330" cy="244" r="80" fill="url(#lamp)" class="lampglow"/><path d="M330 450V250" stroke="var(--wood-2)" stroke-width="5"/><path d="M304 252l12-40h28l12 40z" fill="#FBE3A6"/><ellipse cx="330" cy="452" rx="24" ry="6" fill="var(--wood-2)"/>
  <!-- rug -->
  <ellipse cx="500" cy="530" rx="330" ry="54" fill="var(--rug)"/><ellipse cx="500" cy="530" rx="292" ry="44" fill="none" stroke="var(--rug-2)" stroke-width="7" stroke-dasharray="4 13" stroke-linecap="round"/>
</svg>`;


function vHome(){
  const mine=S.viewing===S.me,who=personName(S.viewing),pet=petOf(),rd=S.books.filter(b=>b.status==='read').length;
  const L=Store.lists||{book:[],film:[],game:[]},cnt=(a)=>`${L[a].filter(b=>b.status==='read').length} ${a==='book'?'okundu':a==='film'?'izlendi':'bitti'}`;
  const card=(a,t,n,cls)=>`<div class="hcard ${cls}"><button class="hgo" data-act="area" data-a="${a}"><b>${t}</b><span>${n}</span></button><button class="hrec" data-act="rec" data-a="${a}">Öneri al</button></div>`;
  return `<section class="home">
  <div class="home-hi"><h2 class="hand">${mine?`Hoş geldin, ${esc(who)}`:`${esc(gen(who))} evi`}</h2><p class="muted">${mine?'Bugün ne yapıyoruz? Odada neye tıklarsan oraya gidersin.':'Arkadaşının odasına bakıyorsun. Rafını gezebilirsin.'}</p></div>
  <div class="room">${ROOM()}${!pet&&mine?`<span class="peeksay" id="peeksay">${esc(PEEK_LINES[0])}</span>`:''}<div class="pet-layer" id="petlayer">${pet?`<button class="petwrap" id="petwrap" aria-label="${esc(pet.name)} ile konuş"><span class="bubble" id="bubble" hidden></span><span class="petflip">${petSVG(pet.type,pet.coat)}</span></button>`:''}</div></div>
  <div class="hcards">${card('book','Kitap Rafı',`${L.book.length} kitap · ${cnt('book')}`,'c1')}${card('film','Seyir Defteri',`${L.film.length} film · ${cnt('film')}`,'c2')}${card('game','Oyunlar',`${L.game.length} oyun · ${cnt('game')}`,'c3')}</div>
  ${pet?`<div class="petbar"><span class="petmini">${petSVG(pet.type,pet.coat)}</span><div><b>${esc(pet.name)}</b><span class="muted"> · ${PETS[pet.type]?.n||''}</span><p>${esc(PETS[pet.type]?.tag||'')}</p></div><div class="petbtns"><button class="btn" data-act="taste">Zevkimi yorumla</button>${mine&&S.canEdit?'<button class="btn ghost" data-act="pet-setup">Değiştir</button>':''}</div></div>`
   :mine?`<p class="note" style="text-align:center;margin:0">Pencereden biri bakıyor. Gözlerine tıkla, içeri al.</p>`:''}
  </section>`;
}

/* the stranger at the window */
let peekT=null;
function peekLoop(){clearInterval(peekT);const el=$('#peeksay');if(!el)return;let i=0;peekT=setInterval(()=>{const e=$('#peeksay');if(!e)return clearInterval(peekT);i=(i+1)%PEEK_LINES.length;e.textContent=PEEK_LINES[i]},6500)}
/* wandering */
const Pet={x:46,dir:1,t:null,sayT:null,
  mount(){
    clearTimeout(this.t);peekLoop();this.el=$('#petwrap');if(!this.el)return;
    this.el.style.left=this.x+'%';this.flip();
    if(!matchMedia('(prefers-reduced-motion: reduce)').matches)this.t=setTimeout(()=>this.next(),1400);
  },
  flip(){this.el.querySelector('.petflip').style.transform=this.dir<0?'scaleX(-1)':'none'},
  set(c){this.el.classList.remove('walking','sleeping');if(c)this.el.classList.add(c)},
  next(){
    if(!this.el?.isConnected)return;const r=Math.random();
    if(r<.6){const to=4+Math.random()*80,d=Math.abs(to-this.x),ms=Math.max(1400,d*110);
      this.dir=to>this.x?1:-1;this.flip();this.set('walking');this.el.style.transitionDuration=ms+'ms';this.el.style.left=to+'%';this.x=to;
      this.t=setTimeout(()=>{this.set();this.t=setTimeout(()=>this.next(),1500+Math.random()*3000)},ms)}
    else if(r<.82){this.set('sleeping');this.t=setTimeout(()=>{this.set();this.next()},6000+Math.random()*5000)}
    else this.t=setTimeout(()=>this.next(),2500);
  },
  say(txt){const b=$('#bubble');if(!b)return;b.textContent=txt;b.hidden=false;b.classList.toggle('left',this.x>58);clearTimeout(this.sayT);this.sayT=setTimeout(()=>{b.hidden=true},6000)}
};

/* choosing a pet */
let PS=null;
function openPetSetup(){
  if(!GH.token())return openSetup();
  const p=petOf();PS=PS||{type:p?.type||'kedi',coat:p?.coat||0,name:p?.name||''};
  openSheet(`<div class="sheet-h"><h2>Ev arkadaşın</h2><button class="x" data-act="close" aria-label="Kapat">×</button></div>
  <form class="sheet-b" id="pet-form">
    <div class="petgrid">${Object.keys(PETS).map(k=>`<button type="button" class="petopt" data-act="pet-type" data-v="${k}" aria-pressed="${PS.type===k}">${petSVG(k,PS.type===k?PS.coat:0)}<b>${PETS[k].n}</b><span>${PETS[k].tag}</span></button>`).join('')}</div>
    <div class="field"><span class="lbl">Rengi</span><div class="coatrow">${COATS[PS.type].map((c,i)=>`<button type="button" class="sw" style="--c:${c[0]}" data-act="pet-coat" data-v="${i}" aria-pressed="${PS.coat===i}" aria-label="Renk ${i+1}"></button>`).join('')}</div></div>
    <div class="field"><label for="pet-name">Adı</label><input type="text" id="pet-name" maxlength="20" value="${esc(PS.name)}" placeholder="Ona bir isim ver" required></div>
    <div class="ed-foot"><span></span><div style="display:flex;gap:8px"><button type="button" class="btn" data-act="close">Vazgeç</button><button type="submit" class="btn primary">Eve al</button></div></div>
  </form>`);
}
function keepPetName(){const i=$('#pet-name');if(i&&PS)PS.name=i.value}
Object.assign(ACT,{
  area:a=>{Store.sync();S.area=a.dataset.a;S.tab='shelf';Store.useArea();scrollTo({top:0});render();if(curArea()!=='book')Peers.ensure().then(()=>{if(S.area!=='home')render()})},
  'go-home':()=>{Store.sync();S.area='home';Store.useArea();if(S.me&&S.viewing!==S.me)Store.open(S.me);else render();scrollTo({top:0})},
  'pet-setup':()=>{PS=null;openPetSetup()},
  'pet-type':a=>{keepPetName();PS.type=a.dataset.v;PS.coat=0;openPetSetup()},
  'pet-coat':a=>{keepPetName();PS.coat=+a.dataset.v;openPetSetup()}
});
document.addEventListener('click',e=>{if(e.target.closest('#petwrap'))Pet.say(petLine())});
document.addEventListener('keydown',e=>{const g=e.target.closest?.('.spot');if(g&&(e.key==='Enter'||e.key===' ')){e.preventDefault();g.dispatchEvent(new MouseEvent('click',{bubbles:true}))}});
document.addEventListener('submit',e=>{
  if(e.target.id!=='pet-form')return;keepPetName();const name=PS.name.trim();if(!name)return;
  const had=petOf();Store.extra={...(Store.extra||{}),pet:{type:PS.type,coat:PS.coat,name}};
  Store.schedule(had?`${name} güncellendi`:`${name} eve taşındı`);closeSheet();render();
  setTimeout(()=>Pet.say(`Ben ${name}. Burası artık benim evim. Sen de kalabilirsin.`),300);
});
