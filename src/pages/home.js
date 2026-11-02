// src/pages/home.js — bosh sahifa.
// Kalit so'zlar yadrosi: telegram sovg'a, sovg'a yuborish, telegram gift,
// nft sovg'a, sovg'a ijarasi, rejalashtirilgan sovg'a, sovg'a narxi.

import { site } from "../site.js";
import { head2, cards, steps, faqList, statBar, ctaBlock, checks, table, ic } from "../layout.js";

const services = [
  {
    icon: "gift",
    title: "Telegram sovg'a yuborish",
    text: "Do'stingizga @username orqali Telegram sovg'a (gift) yuboring. Anonim rejim ham bor — kimdan kelgani sir qoladi.",
    meta: "Bir daqiqada yetadi",
    href: "/telegram-sovga-yuborish/",
  },
  {
    icon: "gem",
    title: "NFT gift sotib olish",
    text: "Kolleksion NFT sovg'alar: noyob modellar, fon va naqshlar. Sotib oling, profilingizga qo'ying yoki sovg'a qiling.",
    meta: "Kolleksion bozor",
    href: "/nft-gift-sotib-olish/",
  },
  {
    icon: "refresh",
    title: "NFT sovg'a ijarasi",
    text: "Qimmat NFT giftni butunlay sotib olmang — kerakli kunga ijaraga oling. Narxi to'liq bahodan bir necha barobar arzon.",
    meta: "Kunlik to'lov",
    href: "/nft-sovga-ijara/",
  },
  {
    icon: "clock",
    title: "Rejalashtirilgan sovg'a",
    text: "Hozir to'lang — sovg'a siz belgilagan sana va daqiqada o'zi yetkaziladi. Tunda ham, siz band bo'lsangiz ham.",
    meta: "Taymer + kafolat",
    href: "/rejalashtirilgan-sovga/",
  },
  {
    icon: "crown",
    title: "Premium va Stars sovg'a",
    text: "Telegram Premium obunasi yoki Stars'ni sovg'a qiling. Obuna qabul qiluvchining akkauntiga to'g'ridan-to'g'ri ulanadi.",
    meta: "3 / 6 / 12 oy",
    href: "/telegram-premium-sovga/",
  },
  {
    icon: "user",
    title: "O'z akkauntingizdan sovg'a",
    text: "Sovg'a sizning ismingizdan ketishi kerakmi? Bot o'z Stars balansingizdan yuboradi — xizmat haqi eng past.",
    meta: "1 000 so'mdan",
    href: "/telegram-sovga-yuborish/#oz-akkaunt",
  },
];

const howSteps = [
  {
    title: "Botni oching",
    text: `Telegram'da <b>${site.botHandle}</b> ni oching. Ro'yxatdan o'tish, parol va SMS kod kerak emas — akkauntingiz o'zi kifoya.`,
  },
  {
    title: "Sovg'ani tanlang",
    text: "Oddiy gift, kolleksion NFT, ijara yoki taymerli sovg'a — katalogdan tanlang va qabul qiluvchi @username'ini kiriting.",
  },
  {
    title: "So'mda to'lang",
    text: "Uzcard, Humo, Click, Payme yoki Paynet. Karta ma'lumotlari bankning himoyalangan sahifasida kiritiladi, bizda saqlanmaydi.",
  },
  {
    title: "Sovg'a yetib boradi",
    text: "To'lov tasdiqlangach tizim sovg'ani avtomatik yuboradi. Taymer tanlagan bo'lsangiz — aynan siz belgilagan daqiqada.",
  },
];

const faq = [
  {
    q: "Telegram sovg'a yuborish uchun nima kerak?",
    a: "Faqat qabul qiluvchining @username'i. Uning telefon raqami, parol yoki kirish kodi kerak emas. Sovg'a to'g'ridan-to'g'ri Telegram akkauntiga tushadi.",
  },
  {
    q: "Sovg'a qancha vaqtda yetib boradi?",
    a: "To'lov tasdiqlangach odatda 10 soniya ichida. Tizim 24/7 avtomatik ishlaydi — tunda, dam olish kunlarida va bayramlarda ham.",
  },
  {
    q: "Anonim sovg'a yubora olamanmi?",
    a: "Ha. Anonim rejimni yoqsangiz, qabul qiluvchi sovg'ani oladi, lekin kim yuborganini ko'rmaydi. Tabrik matni ham yozilmaydi — syurpriz to'liq saqlanadi.",
  },
  {
    q: "NFT sovg'a ijarasi nima degani?",
    a: "Siz noyob NFT giftni butunlay sotib olmaysiz, balki belgilangan kunga vaqtincha olasiz. U profilingizda oddiy NFT gift kabi ko'rinadi, muddat tugagach o'z egasiga qaytadi. Shuning uchun narxi to'liq bahodan bir necha barobar arzon.",
  },
  {
    q: "Sovg'ani oldindan to'lab, keyinroq yuborsa bo'ladimi?",
    a: "Ha, bu rejalashtirilgan sovg'a. Bugun to'laysiz, sana va daqiqani belgilaysiz — sovg'a o'sha paytda avtomatik ketadi. Narx to'lagan kunidagidek qotiriladi, kurs oshsa ham qo'shimcha so'ralmaydi.",
  },
  {
    q: "To'lovni qanday usullar bilan qilsam bo'ladi?",
    a: "Uzcard, Humo, Click, Payme, Paynet va ichki balans. Hammasi O'zbek so'mida — valyuta almashtirish, xalqaro karta yoki VPN kerak emas.",
  },
  {
    q: "Sovg'a yetkazilmasa pul qaytadimi?",
    a: "Ha. Agar biror sababga ko'ra sovg'a yetkazilmasa, to'langan summa balansingizga to'liq qaytariladi va sizga xabar beriladi. Rejalashtirilgan sovg'ani yetkazishdan oldin istalgan vaqtda bekor qilib, pulni qaytarib olish mumkin.",
  },
  {
    q: "Qabul qiluvchi @username'ini o'zgartirsa nima bo'ladi?",
    a: "Rejalashtirilgan sovg'ada yetkazishdan oldin username tekshiriladi. Topilmasa, sovg'a jim yo'qolmaydi — biz siz bilan bog'lanamiz, yangi username berasiz yoki pulni qaytarib olasiz.",
  },
  {
    q: "Sovg'a narxi qanday shakllanadi?",
    a: "Har bir mahsulotning so'mdagi narxi botda to'lovdan oldin to'liq ko'rsatiladi: xizmat haqi va to'lov usuli ustamasi bilan birga. Yashirin komissiya yo'q — to'lash tugmasidagi summa aynan yechiladi.",
  },
  {
    q: "Bu xizmat O'zbekistonda ishlaydimi?",
    a: "Ha, xizmat aynan O'zbekiston foydalanuvchilari uchun qilingan: so'mda to'lov, mahalliy kartalar, o'zbekcha interfeys va o'zbekcha qo'llab-quvvatlash.",
  },
];

const occasions = [
  { icon: "gift", t: "Tug'ilgan kunga", d: "Yarim tunda aniq vaqtda", href: "/tugilgan-kunga-sovga/" },
  { icon: "heart", t: "Sevgiliga", d: "Anonim yoki tabrik bilan", href: "/tugilgan-kunga-sovga/#sevgiliga" },
  { icon: "star", t: "8-mart va Yangi yil", d: "Bayramga oldindan tayyorlang", href: "/tugilgan-kunga-sovga/#bayramlar" },
  { icon: "globe", t: "Masofadan", d: "Chet elda bo'lsa ham yetadi", href: "/tugilgan-kunga-sovga/#masofadan" },
];

const guides = [
  {
    icon: "gift",
    title: "Telegram sovg'a qanday yuboriladi",
    text: "Bosqichma-bosqich qo'llanma: username, anonim rejim, tabrik matni va tez-tez uchraydigan xatolar.",
    href: "/telegram-sovga-yuborish/",
  },
  {
    icon: "refresh",
    title: "NFT sovg'a ijarasi qanday ishlaydi",
    text: "Nima uchun ijara sotib olishdan arzon, narx qanday hisoblanadi va muddat tugagach nima bo'ladi.",
    href: "/nft-sovga-ijara/",
  },
  {
    icon: "clock",
    title: "Taymer bilan sovg'a: to'liq qo'llanma",
    text: "Bugun to'lab, tug'ilgan kunning aynan 00:00 da yetkazish. Kafolat shartlari va muddat chegaralari.",
    href: "/rejalashtirilgan-sovga/",
  },
];

export default {
  slug: "",
  title: "Telegram sovg'a yuborish, NFT gift va sovg'a ijarasi | SovgaTG",
  description:
    "Telegram sovg'a yuborish, NFT gift sotib olish, NFT sovg'a ijarasi va taymerli rejalashtirilgan sovg'a. So'mda to'lov: Uzcard, Humo, Click, Payme.",
  ogTitle: "SovgaTG — Telegram sovg'alari bir joyda",
  updated: "2026-09-10",
  faq,
  howto: {
    name: "Telegram'da sovg'a qanday yuboriladi",
    description:
      "Telegram sovg'asini @username orqali yuborish: botni ochish, sovg'ani tanlash, so'mda to'lash va avtomatik yetkazish.",
    time: "PT3M",
    steps: howSteps,
  },
  service: {
    name: "Telegram sovg'alari va NFT gift xizmati",
    type: "Telegram sovg'a yuborish, NFT gift savdosi va ijarasi",
    description:
      "O'zbekistonda Telegram sovg'alarini so'mda sotib olish, NFT giftlarni ijaraga olish va sovg'ani belgilangan vaqtga rejalashtirish xizmati.",
    offers: { priceCurrency: "UZS", lowPrice: "1000" },
  },
  body: `
<section class="hero wrap">
  <div class="hero-tx">
    <span class="hero-badge"><i class="dot"></i> <b>10 700+</b> foydalanuvchi ishonadi</span>
    <h1>Telegram sovg'a yuborish — <span class="gt">gift, NFT va ijara</span> bir joyda</h1>
    <p class="hero-lead">
      Do'stingizga sovg'a yuboring, kolleksion <b>NFT gift</b> sotib oling yoki bir necha kunga
      <b>ijaraga</b> oling. Sovg'ani <b>aniq daqiqaga rejalashtirish</b> ham mumkin — hammasi
      O'zbek so'mida, mahalliy kartalar bilan.
    </p>
    <div class="btns">
      <a class="btn btn-primary" href="${site.bot}" target="_blank" rel="noopener">${ic("send")} Sovg'a yuborish</a>
      <a class="btn btn-ghost" href="#xizmatlar">${ic("arrow")} Xizmatlarni ko'rish</a>
    </div>
    <div class="hero-pays">${site.pay.map((p) => `<span class="pay">${p}</span>`).join("")}</div>
  </div>
  <div class="hero-art" aria-hidden="true">
    <span class="hero-orb"></span>
    <span class="hero-ring"></span>
    <img class="hero-logo" src="/assets/logo-hero.webp" width="556" height="760" alt="" fetchpriority="high">
    <span class="chip c1"><i>${ic("gift")}</i>Gift · ~10 soniya</span>
    <span class="chip c2"><i>${ic("gem")}</i>NFT ijara</span>
    <span class="chip c3"><i>${ic("clock")}</i>00:00 da yetkazish</span>
    <span class="chip c4"><i>${ic("star")}</i>Premium · Stars</span>
  </div>
  ${statBar()}
</section>

<section class="sec wrap rv" id="xizmatlar">
  ${head2({
    kicker: "Xizmatlar",
    title: "Qanday sovg'a qidiryapsiz?",
    lead: "Oddiy giftdan tortib noyob kolleksion NFT'gacha — oltita yo'nalish, bittasi albatta sizga to'g'ri keladi.",
  })}
  ${cards(services)}
</section>

<section class="sec sec-alt rv" id="qanday">
  <div class="wrap">
    ${head2({
      kicker: "Qanday ishlaydi",
      title: "To'rt qadam, uch daqiqa",
      lead: "Ro'yxatdan o'tish yo'q, ilova o'rnatish yo'q. Hamma narsa Telegram ichida bo'ladi.",
    })}
    ${steps(howSteps)}
  </div>
</section>

<section class="sec wrap rv" id="nega">
  <div class="split">
    <div>
      ${head2({
        kicker: "Nega SovgaTG",
        title: "Sovg'a — bu ishonch masalasi",
        lead: "Pulni bugun berasiz, natijani do'stingiz ko'radi. Shuning uchun tizim xatoni yashirmaydigan qilib qurilgan.",
      })}
      ${checks([
        "<b>Avtomatik yetkazish</b> — operator kutilmaydi, tizim to'lovni ko'rgach o'zi ishga tushadi.",
        "<b>Pul yo'qolmaydi</b> — sovg'a ketmasa, summa balansga to'liq qaytadi va sizga xabar keladi.",
        "<b>Narx qotiriladi</b> — rejalashtirilgan sovg'ada kurs oshsa ham qo'shimcha to'lov so'ralmaydi.",
        "<b>Anonim rejim</b> — syurprizni buzmasdan sovg'a yuborish mumkin.",
        "<b>Karta bizda saqlanmaydi</b> — to'lov bank sahifasida, 3D Secure bilan o'tadi.",
        "<b>O'zbekcha qo'llab-quvvatlash</b> — savolingizga jonli odam javob beradi.",
      ])}
    </div>
    <div>
      <div class="panel">
        <h3>${ic("shield")} Yetkazish kafolati</h3>
        <p style="color:var(--mut);font-size:15.5px">
          Har bir buyurtma alohida kuzatiladi. Yetkazishda muammo chiqsa, buyurtma "muvaffaqiyatli" deb
          belgilanmaydi — u qayta urinishga tushadi yoki pul qaytariladi. Jim yo'qolgan sovg'a bo'lmaydi.
        </p>
      </div>
      <div class="panel">
        <h3>${ic("bolt")} 24/7 ishlaydi</h3>
        <p style="color:var(--mut);font-size:15.5px">
          Tug'ilgan kun ko'pincha yarim tunda boshlanadi. Tizim ish vaqtiga bog'liq emas: soat 03:00 da ham
          buyurtma qabul qiladi va yetkazadi.
        </p>
      </div>
      <div class="panel">
        <h3>${ic("wallet")} So'mda, mahalliy kartada</h3>
        <p style="color:var(--mut);font-size:15.5px">
          Xalqaro karta, dollar hisobi yoki VPN kerak emas. Uzcard va Humo kartangiz yoki Click/Payme
          ilovangiz yetarli.
        </p>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-alt rv" id="narx">
  <div class="wrap">
    ${head2({
      kicker: "Narx va to'lov",
      title: "Narx to'lashdan oldin to'liq ko'rinadi",
      lead: "Botda yakuniy summa xizmat haqi va to'lov usuli ustamasi bilan birga chiqadi. Yashirin komissiya yo'q.",
    })}
    ${table(
      ["Xizmat", "Narx qanday hisoblanadi", "Yetkazish"],
      [
        ["Telegram sovg'a (gift)", "Sovg'a qiymati + xizmat haqi", "<b>~10 soniya</b>"],
        ["O'z akkauntingizdan sovg'a", "Balans yetsa — <b>1 000 so'mdan</b> xizmat haqi", "~1 daqiqa"],
        ["NFT gift sotib olish", "Bozor narxi + xizmat haqi", "~1 daqiqa"],
        ["NFT sovg'a ijarasi", "Kunlik narx × kun + tarmoq xarajati", "~2 daqiqa"],
        ["Rejalashtirilgan sovg'a", "Mahsulot narxi + muddat ustamasi (0–12%)", "<b>Belgilangan daqiqada</b>"],
        ["Premium / Stars sovg'a", "Tarif narxi + xizmat haqi", "~10 soniya"],
      ]
    )}
    <p class="note">
      <b>Muddat ustamasi nega bor?</b> Rejalashtirilgan sovg'ada siz bugun to'laysiz, biz esa sovg'ani
      oylar keyin sotib olamiz. Oradagi vaqtda kurs oshsa, farqni biz qoplaymiz. Ustama — shu riskning
      bahosi: yaqin muddatga <b>0%</b>, o'rta muddatga <b>~5%</b>, eng uzoq muddatga <b>~12%</b>.
    </p>
  </div>
</section>

<section class="sec wrap rv" id="munosabat">
  ${head2({
    kicker: "Munosabat bilan",
    title: "Qaysi bayramga sovg'a qidiryapsiz?",
    lead: "Tug'ilgan kun, sevgi kuni, 8-mart, Yangi yil yoki shunchaki sababsiz syurpriz.",
  })}
  <div class="occ">
    ${occasions
      .map(
        (o) => `<a href="${o.href}">${ic(o.icon)}<b>${o.t}</b><em>${o.d}</em></a>`
      )
      .join("")}
  </div>
</section>

<section class="sec sec-alt rv" id="qollanma">
  <div class="wrap">
    ${head2({
      kicker: "Qo'llanmalar",
      title: "Sovg'a haqida bilishingiz kerak bo'lgan hamma narsa",
      lead: "Har bir xizmat bo'yicha batafsil, o'zbekcha qo'llanma — misollar va aniq raqamlar bilan.",
    })}
    ${cards(guides)}
  </div>
</section>

<section class="sec wrap rv" id="savollar">
  ${head2({
    kicker: "Savol-javob",
    title: "Ko'p so'raladigan savollar",
    lead: "Javobini topa olmadingizmi? Telegramda yozing — javob beramiz.",
  })}
  ${faqList(faq)}
</section>

${ctaBlock({
  title: "Sovg'angizni hozir yuboring",
  text: "Botni oching, sovg'ani tanlang va so'mda to'lang. Bir necha daqiqa — va do'stingiz syurprizni oladi.",
  btn: "Sovg'a yuborish",
  note: `Savol bo'lsa: <a href="${site.support}" style="color:var(--gold)" target="_blank" rel="noopener">${site.supportHandle}</a>`,
})}
`,
};
