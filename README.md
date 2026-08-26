# Güç Hesabı

100-200 (veya 60-160) süresinden motor gücü tahmini. Tek dosyalık React arayüzü, sunucusuz, hesap yok.

## Yapı

```
index.html            web giriş noktası
src/main.jsx          React kökü
src/App.jsx           uygulamanın tamamı (tema, çeviri, hesap, arayüz)
public/privacy.html   gizlilik sayfası (TR/EN/ES)
public/support.html   destek sayfası (TR/EN/ES)
capacitor.config.json iOS sarmalayıcı ayarı
```

## Çalıştırma

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # dist/
```

## Değiştirmen gerekenler

| Nerede | Ne |
| --- | --- |
| `src/App.jsx` → `BANNER_SRC` | 320×50 banner görselinin yolu. Boşsa yer tutucu çıkar. |
| `src/App.jsx` → `APP` | Geliştirici adı, sürüm, gizlilik ve destek bağlantıları. |
| `public/privacy.html` → `CONTACT` | E-posta adresin. |
| `public/support.html` → `CONTACT` | E-posta adresin. |
| `src/App.jsx` → `CARS` | Araç kütüphanesi. Her satır: ad, CdA, aktarma kaybı %, ağırlık kg. |
| `capacitor.config.json` → `appId` | Kendi bundle kimliğin. |

Banner görselini `public/` içine koyup `BANNER_SRC = "./banner.png"` yazman yeterli.

## GitHub Pages

1. Depoyu oluştur, kodu it.
2. Alt dizinde yayınlanacaksa `vite.config.js` içindeki `base` satırını `"/depo-adi/"` yap.
3. `npm run build`, sonra `dist/` klasörünü `gh-pages` dalına gönder:

```bash
npm install -D gh-pages
npx gh-pages -d dist
```

4. Depo ayarlarında Pages kaynağını `gh-pages` dalı olarak seç.

`privacy.html` ve `support.html` derlemede `dist/` köküne kopyalanır; uygulamadaki bağlantılar hem webde hem iOS'ta çalışır.

## iOS (Capacitor)

```bash
npm install @capacitor/core @capacitor/ios
npm install -D @capacitor/cli
npx cap add ios
npm run ios          # build + sync + Xcode'u açar
```

Xcode'da yapılacaklar:

- **Signing & Capabilities** → kendi Team'ini seç.
- **Deployment Info** → yalnız Portrait bırak; arayüz dikey için tasarlandı.
- App Icon ve Launch Screen ekle; arka planı `#0b0e11` yap ki açılışta beyaz parlama olmasın.
- App Store Connect'te **Privacy Policy URL** alanına GitHub Pages'teki `privacy.html` adresini, **Support URL** alanına `support.html` adresini yaz. İkisi de mağaza için zorunlu.
- Veri toplama bildiriminde "Veri toplanmıyor" seçilebilir — reklam SDK'sı eklersen bu değişir, o zaman `privacy.html` da güncellenmeli.

## Hesap hakkında

Güç, ölçülen süreden geriye doğru çözülür:

```
P = ivme + sürüklenme + yuvarlanma + eğim
P_motor = P_teker / (1 − aktarma kaybı)
```

Sabitler `App.jsx` tepesinde: `CRR` 0,012 (asfalt), `ROT` 1,04 (dönen kütle), `G` 9,80665. Hava yoğunluğu barometrik formül ve Buck denklemiyle sıcaklık, rakım ve nemden hesaplanır.

Sonuç **ham** değerdir; SAE J1349 veya DIN 70020 düzeltmesi uygulanmaz. Farklı hava koşullarında alınan ölçümler birebir karşılaştırılamaz.

Birim metrik beygirdir (1 HP = 735,49875 W), yani Avrupa'da PS ile aynı sayı.
