# Okuma Defteri

Arkadaşlarla paylaşılan okuma günlüğü: kitaplık rafı, aylık kapaklar, kitap notları, yıl özeti, okunacaklar, okuma hedefi ve pullar, kitap bingosu.

Site: https://koloboros.github.io/ReadingJournal/

## Nasıl çalışır

- Açılışta "Kimin kitaplığı?" ekranından kendini seçersin; herkes herkesin kitaplığına bakabilir.
- Kitap ekleyip düzenlediğinde değişiklikler bu repoya otomatik commit edilir.
- Kitaplıklar `data/` klasöründe durur:
  - `data/kisiler.json`: kişi listesi
  - `data/kitapliklar/<kisi>.json`: her kişinin kitapları, hedefleri ve bingo kartı

## Kurulum (her cihazda bir kez)

Kayıt yapabilmek için cihazda bir GitHub erişim anahtarı gerekir:

1. GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token
2. Repository access: Only select repositories → ReadingJournal
3. Permissions → Contents: Read and write
4. Sitede **Kurulum** ekranına anahtarı yapıştır.

Arkadaşlar için: Kurulum ekranındaki "Bağlantıyı kopyala" ile bir kurulum bağlantısı gönder; bağlantıyı her cihazda bir kez açmaları yeter. Bağlantıyı yalnızca kitaplığı kullanacak kişilerle paylaş. Bir sorun olursa anahtarı GitHub'dan iptal edip yenisini oluştur; repo geçmişinden her değişiklik geri alınabilir.
