# sovgatg.uz — SovgaTG landing

Telegram sovg'alari bo'yicha tanishtiruv sayti: oddiy gift, kolleksion NFT,
**NFT sovg'a ijarasi**, **rejalashtirilgan (taymerli) sovg'a**, Premium va Stars.

Sayt **to'liq statik** — backend, API yoki ma'lumotlar bazasi yo'q. Barcha
buyurtmalar Telegram bot ichida rasmiylashtiriladi, sayt esa faqat tushuntiradi
va botga yo'naltiradi.

---

## Yig'ish

```bash
node build.js        # → dist/
```

Bog'liqliklar yo'q (`npm install` kerak emas). Node 18+ yetarli.

Natija `dist/` ichida: 8 ta HTML sahifa, CSS, JS, ikonkalar, `sitemap.xml`,
`robots.txt`, `site.webmanifest`.

Mahalliy ko'rish:

```bash
cd dist && python3 -m http.server 8899
# → http://localhost:8899
```

## Deploy

**nginx (o'z server):**

```bash
node build.js
rsync -av --delete dist/ user@server:/var/www/sovgatg.uz/
```

`nginx.conf.example` faylini `/etc/nginx/sites-available/sovgatg.uz` ga
ko'chiring va `certbot --nginx -d sovgatg.uz -d www.sovgatg.uz` bilan TLS oling.

**Netlify / Vercel / Cloudflare Pages:** build buyrug'i `node build.js`,
chiqish papkasi `dist`. `_redirects` faylini `dist/` ga ko'chiring.

---

## Tuzilma

```
src/site.js          brend, havolalar, navigatsiya, ishonch raqamlari
src/layout.js        HTML skeleti, SEO meta, JSON-LD, komponentlar
src/pages/*.js       har bir sahifaning matni va tuzilishi
assets/style.css     dizayn tizimi (bitta fayl, tashqi kutubxonasiz)
assets/app.js        ~1 KB: menyu, sticky nav, paydo bo'lish effekti
build.js             yig'uvchi + sitemap/robots/manifest/ikonka generatori
```

**Matnni o'zgartirish:** `src/pages/` dagi kerakli faylni tahrirlang va
`node build.js` ni qayta ishga tushiring. Bot havolasi, brend nomi va
statistika — `src/site.js` da (bitta joyda, hamma sahifada o'zgaradi).

**Yangi sahifa qo'shish:** `src/pages/yangi.js` yarating (mavjudini namuna
qiling), `build.js` dagi `pages` ro'yxatiga qo'shing — sitemap va navigatsiya
o'zi yangilanadi.

---

## SEO nima qilingan

| Element | Holat |
|---|---|
| Title | Har sahifada noyob, ≤ 62 belgi |
| Meta description | Noyob, 146–154 belgi (kesilmaydi) |
| Canonical | Har sahifada, `https://sovgatg.uz/...` |
| Open Graph / Twitter | To'liq, 1200×630 JPEG rasm bilan |
| JSON-LD | `Organization`, `WebSite`, `WebPage`, `BreadcrumbList`, `FAQPage`, `Service`, `HowTo` |
| Sarlavhalar | Har sahifada bitta `h1`, mantiqiy `h2`/`h3` |
| Ichki havolalar | 263 ta havola, hammasi ishlaydi; har sahifada "Buni ham ko'ring" bloki |
| sitemap.xml | 7 ta URL, `lastmod` va `priority` bilan |
| robots.txt | Ochiq, sitemap ko'rsatilgan |
| 404 | `noindex, follow` |
| Tezlik | Tashqi JS kutubxonasi yo'q, ikonkalar inline SVG, shrift `display=swap` |
| Mobil | 390 / 768 / 1440 px da gorizontal siljish yo'q (brauzerda tekshirilgan) |
| JS'siz | Sayt to'liq o'qiladi — effektlar `.js` sinfiga bog'langan |

### Kalit so'zlar xaritasi

Har bir sahifa bitta so'rov guruhini qoplaydi. Yangi maqola qo'shsangiz,
shu mantiqni davom ettiring — bitta sahifa bitta niyat.

| Sahifa | Asosiy so'rovlar |
|---|---|
| `/` | telegram sovg'a, sovg'a yuborish, telegram gift, sovga tg, onlayn sovg'a |
| `/telegram-sovga-yuborish/` | telegram sovg'a yuborish, gift jo'natish, anonim sovg'a, username orqali sovg'a |
| `/nft-gift-sotib-olish/` | nft gift sotib olish, telegram nft sovg'a, kolleksion gift, nft sovg'a narxi |
| `/nft-sovga-ijara/` | nft sovg'a ijarasi, nft gift ijaraga olish, telegram nft ijara, arzon noyob gift |
| `/rejalashtirilgan-sovga/` | sovg'a rejalashtirish, taymer bilan sovg'a, oldindan sovg'a, aniq vaqtda yetkazish |
| `/telegram-premium-sovga/` | telegram premium sovg'a qilish, premium sotib olish, stars sovg'a, yulduz sovg'a |
| `/tugilgan-kunga-sovga/` | tug'ilgan kunga sovg'a, sevgiliga sovg'a, qizga/yigitga sovg'a, 8-mart, yangi yil sovg'asi |

> Izoh: o'zbek foydalanuvchilari apostrofni ko'pincha yozmaydi ("sovga",
> "sovg'a", "tugilgan kun"). Matnda ikkala shakl ham tabiiy uchraydi.

---

## Ishga tushirgandan keyin qilinadigan ishlar

1. **Google Search Console** — domenni tasdiqlash, `sitemap.xml` ni yuborish.
2. **Yandex Webmaster** — O'zbekistonda Yandex ulushi sezilarli, e'tibordan
   qolmasin.
3. **Google Business / kanal** — `src/site.js` dagi `sameAs` ro'yxatiga ijtimoiy
   tarmoq havolalarini qo'shing.
4. **Analitika** — hozir hech qanday kuzatuv skripti yo'q (sayt tashqi so'rov
   qilmaydi). Kerak bo'lsa `src/layout.js` ga qo'shing.
5. **Yangi maqolalar** — mavsumiy so'rovlar uchun alohida sahifalar
   (`/yangi-yil-sovgasi/`, `/8-mart-sovga/`) eng tez natija beradi.

---

## Eslatma

Saytdagi ishonch raqamlari (`src/site.js` → `stats`) production bazasidan
olingan va pastga yaxlitlangan. Ular eskirganda yangilash kerak — noto'g'ri
raqam ishonchni yo'qotadi.
