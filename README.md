# Bizim Ev

Arkadaşlarla paylaşılan kitap, film ve oyun günlüğü: raflar, yıl özeti, hedef ve pullar, bingo, Keşfet listesi, ev hayvanı ve arkadaşların ev hayvanlarından öneriler.

Site: https://koloboros.github.io/ReadingJournal/

## Nasıl çalışır

- Açılışta "Kimin kitaplığı?" ekranından kendini seçersin; herkes herkesin kitaplığına bakabilir.
- Kitap ekleyip düzenlediğinde değişiklikler bu repoya otomatik commit edilir.
- Kitaplıklar `data/` klasöründe durur:
  - `data/kisiler.json`: kişi listesi
  - `data/kitapliklar/<kisi>.json`: her kişinin kitapları, filmleri, oyunları, hedefleri, bingo kartları ve ev hayvanı
  - `data/kesfet.json`: henüz kimsenin puanlamadığı ortak Keşfet listesi
- Arama anahtarları (TMDB, RAWG, Google Books) repoda durmaz; Kurulum ekranına girilir ve kurulum bağlantısıyla taşınır.

## Kurulum (her cihazda bir kez)

Kayıt yapabilmek için cihazda bir GitHub erişim anahtarı gerekir:

1. GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token
2. Repository access: Only select repositories → ReadingJournal
3. Permissions → Contents: Read and write
4. Sitede **Kurulum** ekranına anahtarı yapıştır.

Arkadaşlar için: Kurulum ekranındaki "Bağlantıyı kopyala" ile bir kurulum bağlantısı gönder; bağlantıyı her cihazda bir kez açmaları yeter. Bağlantıyı yalnızca kitaplığı kullanacak kişilerle paylaş. Bir sorun olursa anahtarı GitHub'dan iptal edip yenisini oluştur; repo geçmişinden her değişiklik geri alınabilir.
