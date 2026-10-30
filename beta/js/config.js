/* Search keys never live in this public repo: they are entered once on the Setup screen, kept in the browser,
   and travel with the setup link. Without them the app uses the keyless sources.

   TICARI KULLANIM NOTU: Bu uygulama ticari bir yazilima donusturulurse TMDB anahtari KULLANILMAYACAK.
   Ucretsiz TMDB anahtari yalnizca ticari olmayan kullanim icindir; ticari surumde TMDB ile ayri lisans
   yapilmali ya da baska bir veri kaynagina gecilmelidir. RAWG ve Google Books kosullari da o zaman yeniden
   kontrol edilmelidir. */
const KEYS={tmdb:'',rawg:'',googleBooks:''};
try{Object.assign(KEYS,JSON.parse(localStorage.getItem('rj-keys')||'{}'))}catch{}
function saveKeys(k){Object.assign(KEYS,k);try{localStorage.setItem('rj-keys',JSON.stringify(KEYS))}catch{}}
