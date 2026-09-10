// Premium va Stars sovg'a. Kalit so'zlar: telegram premium sovg'a qilish,
// telegram premium sotib olish, stars sovg'a, yulduz sovg'a qilish.

import { site } from "../site.js";
import { phead, head2, steps, faqList, ctaBlock, checks, table, cards, ic } from "../layout.js";

const howSteps = [
  { title: "Premium yoki Stars tanlang", text: `<b>${site.botHandle}</b> da "Premium" yoki "Stars" bo'limini oching.` },
  { title: "Tarifni belgilang", text: "Premium uchun 3, 6 yoki 12 oy. Stars uchun esa kerakli miqdorni kiritasiz." },
  { title: "Kimga ekanini ko'rsating", text: "O'zingizga yoki do'stingizning @username'iga. Sovg'a bo'lsa, tabrik matni ham qo'shishingiz mumkin." },
  { title: "So'mda to'lang", text: "Uzcard, Humo, Click, Payme, Paynet yoki balans. Xalqaro karta talab qilinmaydi." },
  { title: "Obuna ulanadi", text: "To'lov tasdiqlangach odatda 10 soniya ichida. Premium darhol faollashadi, Stars balansga tushadi." },
];

const faq = [
  { q: "Telegram Premium'ni boshqa odamga sovg'a qila olamanmi?", a: "Ha. Buyurtma berayotganda do'stingizning @username'ini ko'rsatasiz — obuna to'g'ridan-to'g'ri uning akkauntiga ulanadi. Uning parolini yoki kirish kodini bilish shart emas." },
  { q: "Premium necha oyga olsam bo'ladi?", a: "Odatda 3, 6 va 12 oylik tariflar mavjud. Uzoq muddatli tarif bir oyga hisoblaganda arzonroq tushadi." },
  { q: "Telegram Stars nima va nimaga kerak?", a: "Stars — Telegram ichidagi ichki valyuta. Sovg'a sotib olish, kanal va botlarga to'lov qilish, ba'zi xizmatlarga obuna bo'lish uchun ishlatiladi." },
  { q: "Stars'ni do'stimga sovg'a qila olamanmi?", a: "Ha, Stars'ni ham @username orqali boshqa foydalanuvchiga yuborish mumkin. U bilan qabul qiluvchi o'zi xohlagan sovg'ani tanlaydi." },
  { q: "To'lov uchun xalqaro karta kerakmi?", a: "Yo'q. Faqat mahalliy kartalar va to'lov tizimlari: Uzcard, Humo, Click, Payme, Paynet. Valyuta almashtirish yoki VPN kerak emas." },
  { q: "Premium'ni tug'ilgan kunga oldindan olsam bo'ladimi?", a: "Ha, buning uchun rejalashtirilgan sovg'a xizmati bor: bugun to'laysiz, obuna esa siz belgilagan sana va daqiqada ulanadi. Narx to'lagan kuningizdek qotiriladi." },
  { q: "Obuna qachon boshlanadi?", a: "Yetkazilgan paytdan. Agar taymer qo'ygan bo'lsangiz — aynan o'sha belgilangan daqiqadan boshlanadi." },
  { q: "Do'stimda allaqachon Premium bo'lsa nima bo'ladi?", a: "Yangi muddat mavjud obunaning ustiga qo'shiladi — ya'ni obunasi uzayadi, pul bekorga ketmaydi." },
  { q: "Yetkazilmasa pul qaytadimi?", a: "Ha, obuna ulanmasa to'langan summa balansingizga to'liq qaytariladi va sizga xabar beriladi." },
];

const why = [
  { icon: "crown", title: "Har kuni ko'rinadigan sovg'a", text: "Premium bir kunlik emas — do'stingiz uni har kuni ochganda eslaydi. Buyum emas, foydali imkoniyat." },
  { icon: "star", title: "Tanlovni o'ziga qoldirish", text: "Nima yoqishini bilmasangiz — Stars yuboring. Do'stingiz o'zi xohlagan sovg'ani tanlaydi." },
  { icon: "globe", title: "Masofa muhim emas", text: "Toshkentdami, Seuldami — sovg'a bir xil tezlikda yetadi. Pochta, bojxona va kutish yo'q." },
];

export default {
  slug: "telegram-premium-sovga",
  title: "Telegram Premium sovg'a qilish va Stars sovg'asi | SovgaTG",
  description:
    "Telegram Premium obunasini yoki Stars'ni do'stingizga sovg'a qiling: faqat @username kerak. 3, 6, 12 oylik tariflar, so'mda to'lov, 10 soniyada ulanadi.",
  ogTitle: "Telegram Premium va Stars sovg'a qilish",
  updated: "2026-09-10",
  breadcrumb: [{ name: "Bosh sahifa", slug: "" }, { name: "Premium va Stars sovg'a", slug: "telegram-premium-sovga" }],
  faq,
  howto: {
    name: "Telegram Premium'ni qanday sovg'a qilish mumkin",
    description: "Telegram Premium obunasini yoki Stars'ni boshqa foydalanuvchiga @username orqali sovg'a qilish tartibi.",
    time: "PT2M",
    steps: howSteps,
  },
  service: {
    name: "Telegram Premium va Stars sovg'a qilish",
    type: "Telegram Premium obunasi va Stars yetkazish",
    description: "Telegram Premium obunasini va Stars'ni O'zbek so'mida sotib olish hamda boshqa foydalanuvchiga sovg'a qilish.",
    offers: { priceCurrency: "UZS" },
  },
  body: `
${phead({
  crumbs: [{ text: "Premium va Stars sovg'a" }],
  h1: "Telegram Premium va Stars <span class=\"gt\">sovg'a qiling</span>",
  lead: "Obuna do'stingizning akkauntiga to'g'ridan-to'g'ri ulanadi — faqat @username kerak. Paroli ham, kodi ham so'ralmaydi. To'lov O'zbek so'mida.",
  tags: ["3 / 6 / 12 oy", "Faqat @username", "~10 soniyada", "Taymer bilan ham"],
  btn: "Premium sovg'a qilish",
})}

<section class="sec wrap rv">
  ${head2({
    kicker: "Nega aynan bu",
    title: "Nima berishni bilmasangiz — eng ishonchli tanlov",
    lead: "Premium va Stars deyarli hech qachon \"o'rinsiz\" bo'lmaydi: ular kundalik foydalaniladi.",
  })}
  ${cards(why)}
</section>

<section class="sec sec-alt rv">
  <div class="wrap">
    ${head2({ kicker: "Bosqichma-bosqich", title: "Qanday sovg'a qilinadi" })}
    ${steps(howSteps)}
  </div>
</section>

<section class="sec wrap rv">
  <div class="split">
    <div class="prose">
      <h2>Premium yoki Stars — qaysi biri?</h2>
      <p>
        Ikkalasi ham yaxshi sovg'a, lekin ular boshqa-boshqa narsa uchun. <b>Premium</b> — bu obuna:
        u belgilangan oylar davomida ishlaydi va Telegram'ning kengaytirilgan imkoniyatlarini ochadi.
        <b>Stars</b> — ichki valyuta: qabul qiluvchi u bilan o'zi xohlagan narsani oladi.
      </p>
      <p>
        Agar do'stingizning didini bilmasangiz — Stars yuboring. Agar unga uzoq muddatli, har kuni
        ko'rinadigan narsa bermoqchi bo'lsangiz — Premium tanlang.
      </p>
      <p class="note">
        <b>Maslahat:</b> ikkalasini ham <a href="/rejalashtirilgan-sovga/">taymer bilan</a> qo'ying —
        tug'ilgan kun 00:00 da sizning sovg'angiz birinchi bo'lib keladi.
      </p>
    </div>
    <div>
      ${table(
        ["", "Premium", "Stars"],
        [
          ["Turi", "Obuna", "Ichki valyuta"],
          ["Muddati", "3 / 6 / 12 oy", "Muddatsiz"],
          ["Nimaga ishlatiladi", "Telegram imkoniyatlari", "Sovg'a, bot, kanal to'lovi"],
          ["Tanlov kimda", "Siz tanlaysiz", "<b>Qabul qiluvchi tanlaydi</b>"],
          ["Yetkazish", "~10 soniya", "~10 soniya"],
        ]
      )}
      <div class="panel" style="margin-top:16px">
        <h3>${ic("lock")} Xavfsizlik</h3>
        ${checks([
          "Qabul qiluvchining <b>paroli yoki kodi hech qachon so'ralmaydi</b>.",
          "Faqat ochiq @username yetarli.",
          "Karta ma'lumotlari bank sahifasida kiritiladi.",
          "Ulanmasa — pul to'liq qaytariladi.",
        ])}
      </div>
    </div>
  </div>
</section>

<section class="sec sec-alt rv" id="savollar">
  <div class="wrap">
    ${head2({ kicker: "Savol-javob", title: "Premium va Stars bo'yicha savollar" })}
    ${faqList(faq)}
  </div>
</section>

<section class="sec wrap rv">
  <div class="prose">
    <h2>Buni ham ko'ring</h2>
    <ul>
      <li><a href="/rejalashtirilgan-sovga/">Rejalashtirilgan sovg'a</a> — obunani aniq daqiqaga qo'yish.</li>
      <li><a href="/telegram-sovga-yuborish/">Telegram sovg'a yuborish</a> — oddiy gift jo'natish.</li>
      <li><a href="/tugilgan-kunga-sovga/">Tug'ilgan kunga sovg'a</a> — g'oyalar to'plami.</li>
    </ul>
  </div>
</section>

${ctaBlock({
  title: "Premium'ni bugun sovg'a qiling",
  text: "Bir necha daqiqa — va do'stingizning akkauntida obuna faollashadi.",
  btn: "Botni ochish",
})}
`,
};
