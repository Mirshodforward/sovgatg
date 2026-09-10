// Telegram sovg'a yuborish. Kalit so'zlar: telegram sovg'a yuborish, telegram gift,
// sovg'a jo'natish, anonim sovg'a, username orqali sovg'a, telegram sovga sotib olish.

import { site } from "../site.js";
import { phead, head2, steps, faqList, ctaBlock, checks, table, cards, ic } from "../layout.js";

const howSteps = [
  { title: "Botni oching", text: `Telegram'da <b>${site.botHandle}</b> ni oching va "Sovg'alar" bo'limiga kiring. Ro'yxatdan o'tish talab qilinmaydi.` },
  { title: "Sovg'ani tanlang", text: "Katalogda arzon giftlardan qimmat kolleksionlarigacha bor. Har biri yonida so'mdagi narxi turadi." },
  { title: "@username kiriting", text: "Qabul qiluvchining Telegram username'ini yozing. Telefon raqami, parol yoki kod kerak emas." },
  { title: "Tabrik yozing yoki anonim tanlang", text: "Tabrik matni sovg'a bilan birga boradi. Anonim rejimda esa kim yuborgani ko'rinmaydi." },
  { title: "So'mda to'lang", text: "Uzcard, Humo, Click, Payme, Paynet yoki ichki balans. Yakuniy summa to'lashdan oldin to'liq ko'rinadi." },
  { title: "Sovg'a yetib boradi", text: "To'lov tasdiqlangach odatda 10 soniya ichida. Sizga yetkazilgani haqida xabar keladi." },
];

const faq = [
  { q: "Telegram sovg'a yuborish uchun nima kerak?", a: "Faqat qabul qiluvchining @username'i va to'lov uchun karta. Uning telefon raqami, paroli yoki tasdiqlash kodi kerak emas va hech qachon so'ralmaydi." },
  { q: "Username'i yo'q odamga sovg'a yubora olamanmi?", a: "Telegram sovg'asi username orqali yuboriladi, shuning uchun qabul qiluvchida u bo'lishi kerak. Username'ni sozlamalardan bir daqiqada qo'yish mumkin — do'stingizdan shuni so'rang." },
  { q: "Sovg'a qancha vaqtda yetadi?", a: "To'lov tasdiqlangach odatda 10 soniya ichida. Tizim avtomatik, shuning uchun tunda va bayramda ham bir xil tezlikda ishlaydi." },
  { q: "Anonim sovg'a qanday yuboriladi?", a: "Buyurtma berayotganda anonim rejimni yoqasiz. Qabul qiluvchi sovg'ani oladi, lekin yuborganning ismi ko'rinmaydi va tabrik xabari yozilmaydi — syurpriz to'liq saqlanadi." },
  { q: "Tabrik matni qanday yetkaziladi?", a: "Sovg'a tushgandan so'ng matningiz qabul qiluvchiga alohida xabar bo'lib boradi. Agar uning maxfiylik sozlamalari begonalardan xabar qabul qilmasa, sovg'aning o'zi baribir yetadi." },
  { q: "Sovg'ani o'z akkauntimdan yuborsam bo'ladimi?", a: "Ha. Bu alohida xizmat: sovg'a bot nomidan emas, aynan sizning akkauntingizdan ketadi. Bunda Stars balansingiz ishlatiladi, xizmat haqi esa 1 000 so'mdan boshlanadi." },
  { q: "Noto'g'ri username yozsam nima bo'ladi?", a: "Tizim username'ni yuborishdan oldin tekshiradi. Topilmasa, buyurtma bajarilmaydi va pul balansingizga qaytariladi — sovg'a begona odamga ketmaydi." },
  { q: "Sovg'ani qaytarib olsa bo'ladimi?", a: "Yetkazilgan sovg'ani qaytarib olib bo'lmaydi — u qabul qiluvchining mulki. Lekin agar yetkazish umuman amalga oshmasa, to'langan summa to'liq qaytariladi." },
  { q: "Bir vaqtda bir necha kishiga sovg'a yubora olamanmi?", a: "Ha. Har bir sovg'a alohida buyurtma bo'ladi, har biriga o'z username'i va o'z tabrik matni bilan." },
  { q: "To'lov xavfsizmi?", a: "Karta ma'lumotlari bankning himoyalangan sahifasida kiritiladi va bizda saqlanmaydi. To'lov 3D Secure tasdiqlashidan o'tadi." },
];

const kinds = [
  { icon: "gift", title: "Oddiy Telegram gift", text: "Arzon va tez. Chat va profilda ko'rinadi. Kundalik tabrik, rahmat yoki kichik e'tibor uchun eng ko'p tanlanadigan variant.", meta: "Eng ommabop" },
  { icon: "gem", title: "Kolleksion NFT sovg'a", text: "Noyob model, fon va naqsh. Qabul qiluvchi uni saqlab qo'yishi, sotishi yoki profiliga qo'yishi mumkin.", meta: "Qimmatroq, esda qoladi", href: "/nft-gift-sotib-olish/" },
  { icon: "user", title: "O'z akkauntingizdan", text: "Sovg'a bot nomidan emas, sizning ismingizdan ketadi. Do'stingiz uni sizdan kelgan deb ko'radi.", meta: "1 000 so'mdan" },
  { icon: "clock", title: "Taymer bilan", text: "Hozir to'lab, sovg'ani kelajakdagi aniq daqiqaga qo'yish. Tug'ilgan kun 00:00 uchun ideal.", meta: "1 yilgacha oldindan", href: "/rejalashtirilgan-sovga/" },
];

export default {
  slug: "telegram-sovga-yuborish",
  title: "Telegram sovg'a yuborish — @username orqali, so'mda to'lov",
  description:
    "Telegram'da do'stingizga sovg'a (gift) yuboring: faqat @username kerak. Anonim rejim, tabrik matni, ~10 soniyada yetkazish. So'mda, mahalliy kartada.",
  ogTitle: "Telegram sovg'a yuborish — bir daqiqada",
  updated: "2026-09-10",
  breadcrumb: [{ name: "Bosh sahifa", slug: "" }, { name: "Telegram sovg'a yuborish", slug: "telegram-sovga-yuborish" }],
  faq,
  howto: {
    name: "Telegram'da sovg'a qanday yuboriladi",
    description: "Telegram giftini @username orqali yuborish: botni ochish, sovg'ani tanlash, tabrik yozish va so'mda to'lash.",
    time: "PT2M",
    steps: howSteps,
  },
  service: {
    name: "Telegram sovg'a yuborish xizmati",
    type: "Telegram gift yetkazish",
    description: "Telegram sovg'alarini @username orqali yuborish. O'zbek so'mida to'lov, anonim rejim va avtomatik yetkazish.",
    offers: { priceCurrency: "UZS", lowPrice: "1000" },
  },
  body: `
${phead({
  crumbs: [{ text: "Telegram sovg'a yuborish" }],
  h1: "Telegram sovg'a <span class=\"gt\">yuborish</span>",
  lead: "Do'stingizga sovg'a jo'natish uchun faqat uning @username'i kerak. Telefon raqami ham, kod ham so'ralmaydi. To'lov O'zbek so'mida, oddiy kartangiz bilan.",
  tags: ["Faqat @username", "Anonim rejim", "~10 soniyada", "So'mda to'lov"],
  btn: "Sovg'a yuborish",
})}

<section class="sec wrap rv">
  ${head2({
    kicker: "Variantlar",
    title: "Qanday sovg'a yuborish mumkin",
    lead: "Kichik e'tibordan noyob kolleksion sovg'agacha — vaziyatga qarab tanlang.",
  })}
  ${cards(kinds)}
</section>

<section class="sec sec-alt rv">
  <div class="wrap">
    ${head2({
      kicker: "Bosqichma-bosqich",
      title: "Sovg'a qanday yuboriladi",
      lead: "Butun jarayon Telegram ichida. Ilova o'rnatish, sayt ochish yoki ro'yxatdan o'tish kerak emas.",
    })}
    ${steps(howSteps)}
  </div>
</section>

<section class="sec wrap rv" id="anonim">
  <div class="split">
    <div class="prose">
      <h2>Anonim sovg'a yuborish</h2>
      <p>
        Ba'zan sovg'aning eng qimmatli qismi — <b>kim yuborganini bilmaslik</b>. Anonim rejimda
        qabul qiluvchi sovg'ani oladi, ammo yuboruvchining ismi ko'rsatilmaydi va tabrik xabari
        umuman yozilmaydi.
      </p>
      <p>
        Bu quyidagi holatlar uchun qulay:
      </p>
      <ul>
        <li>Yoqtirgan odamingizga birinchi qadam qo'yish.</li>
        <li>Syurprizni oxirigacha saqlab, keyin o'zingiz aytish.</li>
        <li>Jamoada yoki guruhda ismsiz e'tibor ko'rsatish.</li>
      </ul>
      <p class="note">
        Anonim rejim <b>tabrik matnini o'chiradi</b>: matn yozsangiz ham u yuborilmaydi, chunki matn
        orqali kimligingiz bilinib qolishi mumkin.
      </p>
    </div>
    <div id="oz-akkaunt">
      <div class="panel">
        <h3>${ic("user")} O'z akkauntingizdan sovg'a</h3>
        <p style="color:var(--mut);font-size:15.5px;margin-bottom:14px">
          Sovg'a bot nomidan emas, aynan <b>sizning ismingizdan</b> ketsin desangiz — shu xizmat.
          Tizim sovg'ani sizning Telegram Stars balansingizdan yuboradi.
        </p>
        ${checks([
          "Balansingiz yetsa — xizmat haqi <b>1 000 so'mdan</b>.",
          "Stars yetmasa — tizim yetishmaganini avtomatik to'ldiradi.",
          "Do'stingiz sovg'ani <b>sizdan</b> kelgan deb ko'radi.",
          "Sovg'ani profilingizga qo'shish ham mumkin.",
        ])}
      </div>
      <div class="panel">
        <h3>${ic("card")} To'lov usullari</h3>
        <div class="pays">${site.pay.map((p) => `<span class="pay">${p}</span>`).join("")}</div>
        <p style="color:var(--mut);font-size:15px;margin-top:14px">
          Karta ma'lumotlari bank sahifasida kiritiladi va bizda saqlanmaydi. Xalqaro karta,
          dollar hisobi yoki VPN kerak emas.
        </p>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-alt rv">
  <div class="wrap">
    ${head2({
      kicker: "Xatolardan qochish",
      title: "Sovg'a yubormasdan oldin tekshiring",
      lead: "Bu uchta narsa eng ko'p muammo keltiradi — oldindan ko'rib qo'ysangiz, hammasi silliq o'tadi.",
    })}
    ${table(
      ["Nima", "Nega muhim", "Nima qilish kerak"],
      [
        ["@username to'g'riligi", "Sovg'a aynan shu manzilga ketadi", "Do'stingizning profilidan nusxa oling, qo'lda yozmang"],
        ["Username bor-yo'qligi", "Usernamesiz sovg'a yuborib bo'lmaydi", "Sozlamalar → Username bo'limidan qo'yish so'rang"],
        ["Maxfiylik sozlamalari", "Tabrik xabari yetmasligi mumkin", "Sovg'a baribir yetadi — bu faqat matnga taalluqli"],
      ]
    )}
  </div>
</section>

<section class="sec wrap rv" id="savollar">
  ${head2({ kicker: "Savol-javob", title: "Sovg'a yuborish bo'yicha savollar" })}
  ${faqList(faq)}
</section>

<section class="sec sec-alt rv">
  <div class="wrap prose">
    <h2>Buni ham ko'ring</h2>
    <ul>
      <li><a href="/rejalashtirilgan-sovga/">Rejalashtirilgan sovg'a</a> — sovg'ani kelajakdagi daqiqaga qo'yish.</li>
      <li><a href="/nft-gift-sotib-olish/">NFT gift sotib olish</a> — kolleksion, esda qoladigan sovg'a.</li>
      <li><a href="/tugilgan-kunga-sovga/">Tug'ilgan kunga sovg'a</a> — nima yuborish kerakligi bo'yicha g'oyalar.</li>
    </ul>
  </div>
</section>

${ctaBlock({
  title: "Sovg'ani hozir yuboring",
  text: "Bir daqiqa vaqtingizni oladi, do'stingizning kayfiyatini esa butun kunga ko'taradi.",
  btn: "Sovg'a yuborish",
})}
`,
};
