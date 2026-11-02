// Munosabatlar sahifasi. Kalit so'zlar: tug'ilgan kunga sovg'a, sevgiliga sovg'a,
// qizga sovg'a, yigitga sovg'a, 8-mart sovg'a, yangi yil sovg'asi, onlayn sovg'a.

import { site } from "../site.js";
import { phead, head2, faqList, ctaBlock, checks, table, cards, ic } from "../layout.js";

const ideas = [
  { icon: "crown", title: "Telegram Premium", text: "Uzoq muddatli va har kuni ko'rinadigan sovg'a. Do'stingiz uni oylar davomida ishlatadi va har safar sizni eslaydi.", meta: "Eng ishonchli tanlov", href: "/telegram-premium-sovga/" },
  { icon: "gem", title: "Kolleksion NFT sovg'a", text: "Esda qoladigan, noyob va \"faqat menda bor\" deydigan sovg'a. Profilda ko'rinadi va saqlanib qoladi.", meta: "Esda qoladigan", href: "/nft-gift-sotib-olish/" },
  { icon: "star", title: "Telegram Stars", text: "Nima yoqishini bilmasangiz — tanlovni o'ziga qoldiring. U o'zi xohlagan sovg'ani oladi.", meta: "Xato qilmaysiz", href: "/telegram-premium-sovga/" },
  { icon: "refresh", title: "Bir kunlik NFT ijarasi", text: "Byudjet cheklangan bo'lsa: noyob giftni bayram kuniga ijaraga oling — ta'siri katta, narxi kichik.", meta: "Arzon variant", href: "/nft-sovga-ijara/" },
  { icon: "gift", title: "Oddiy gift + tabrik", text: "Kichik, samimiy e'tibor. Tabrik matni bilan birga boradi va chatda ko'rinib turadi.", meta: "Kundalik e'tibor", href: "/telegram-sovga-yuborish/" },
  { icon: "clock", title: "Taymerli sovg'a", text: "Yuqoridagilarning istalgan birini 00:00 ga qo'ying — birinchi bo'lib siz tabriklaysiz.", meta: "Aniq daqiqada", href: "/rejalashtirilgan-sovga/" },
];

const faq = [
  { q: "Tug'ilgan kunga Telegram orqali qanday sovg'a qilsa bo'ladi?", a: "Telegram sovg'asi (gift), kolleksion NFT sovg'a, Telegram Stars yoki Premium obuna. Hammasini @username orqali yuborish mumkin — manzil, pochta yoki uchrashuv kerak emas." },
  { q: "Sovg'ani aynan yarim tunda yetkazsa bo'ladimi?", a: "Ha. Rejalashtirilgan sovg'a xizmatida sana va daqiqani o'zingiz belgilaysiz — masalan, 00:00. Tizim aynan o'sha daqiqada yuboradi, siz uxlab yotsangiz ham." },
  { q: "Arzon, lekin ta'sirli sovg'a nima bo'lishi mumkin?", a: "Ikki variant yaxshi ishlaydi: kichik gift bilan samimiy tabrik matni, yoki noyob NFT sovg'ani bir kunga ijaraga olib berish — ko'rinishi qimmat, narxi esa ancha past." },
  { q: "Sevgilimga anonim sovg'a yubora olamanmi?", a: "Ha, anonim rejim bor: u sovg'ani oladi, lekin kim yuborganini bilmaydi. Keyin o'zingiz aytishingiz mumkin." },
  { q: "Qabul qiluvchi chet elda bo'lsa ishlaydimi?", a: "Ha. Sovg'a Telegram ichida yetkaziladi, shuning uchun joylashuv ahamiyatsiz. To'lovni siz O'zbekistondan so'mda qilasiz." },
  { q: "Qaysi bayramlarga sovg'a ko'p yuboriladi?", a: "Tug'ilgan kun, 14-fevral, 8-mart, Yangi yil, Navro'z va bitiruv kunlari. Bayram oldidan navbat oshadi — oldindan rejalashtirib qo'yish qulayroq." },
  { q: "Bir necha kishiga birdan sovg'a yubora olamanmi?", a: "Ha, cheklov yo'q. Har biriga alohida sovg'a, alohida tabrik matni va kerak bo'lsa alohida vaqt belgilash mumkin." },
];

export default {
  slug: "tugilgan-kunga-sovga",
  title: "Tug'ilgan kunga sovg'a — Telegram orqali onlayn, 00:00 da",
  description:
    "Tug'ilgan kunga onlayn sovg'a: Telegram gift, NFT sovg'a, Stars yoki Premium. Aynan yarim tunda yetkazish, anonim rejim, so'mda to'lov. G'oyalar to'plami.",
  ogTitle: "Tug'ilgan kunga sovg'a — aynan 00:00 da yetkazamiz",
  updated: "2026-09-10",
  breadcrumb: [{ name: "Bosh sahifa", slug: "" }, { name: "Tug'ilgan kunga sovg'a", slug: "tugilgan-kunga-sovga" }],
  faq,
  service: {
    name: "Tug'ilgan kunga onlayn sovg'a",
    type: "Bayramga sovg'a yetkazish",
    description: "Tug'ilgan kun va bayramlarga Telegram orqali onlayn sovg'a yuborish. Belgilangan vaqtda yetkazish imkoniyati bilan.",
    offers: { priceCurrency: "UZS" },
  },
  body: `
${phead({
  crumbs: [{ text: "Tug'ilgan kunga sovg'a" }],
  h1: "Tug'ilgan kunga <span class=\"gt\">sovg'a</span>",
  lead: "Do'kon qidirish, o'rash va yetkazib berishni kutish shart emas. Sovg'a Telegram orqali ketadi va aynan siz belgilagan daqiqada — masalan, tug'ilgan kunning 00:00 da — yetib boradi.",
  tags: ["00:00 da yetkazish", "Anonim rejim", "Masofa muhim emas", "So'mda to'lov"],
  btn: "Sovg'a tanlash",
})}

<section class="sec wrap rv" id="goyalar">
  ${head2({
    kicker: "G'oyalar",
    title: "Tug'ilgan kunga nima yuborish mumkin",
    lead: "Byudjet va munosabatga qarab oltita ishlaydigan variant.",
  })}
  ${cards(ideas)}
</section>

<section class="sec sec-alt rv" id="sevgiliga">
  <div class="wrap split">
    <div class="prose">
      <h2>Sevgiliga sovg'a</h2>
      <p>
        Bu yerda narx emas, <b>vaqt va e'tibor</b> hal qiladi. Ikkita narsa ta'sirni bir necha
        barobar oshiradi: sovg'a <b>birinchi bo'lib</b> kelishi va unga <b>shaxsiy matn</b>
        qo'shilishi.
      </p>
      <ul>
        <li><b>00:00 ga qo'ying.</b> Tug'ilgan kun boshlanishi bilan birinchi tabrik sizniki bo'ladi.</li>
        <li><b>Tabrik matnini oldindan yozing.</b> Shoshilinch yozilgan matn ko'rinib qoladi — bir kun oldin yozib qo'ying.</li>
        <li><b>Anonim variant.</b> Hali oshkor qilmoqchi bo'lmasangiz, anonim yuboring va keyin o'zingiz ayting.</li>
        <li><b>NFT sovg'a.</b> U saqlanib qoladi va profilida ko'rinib turadi — oddiy giftdan ko'ra uzoq eslanadi.</li>
      </ul>
    </div>
    <div class="panel">
      <h3>${ic("heart")} Qizga yoki yigitga?</h3>
      <p style="color:var(--mut);font-size:15.5px;margin-bottom:16px">
        Amaliyotda farq kichik, lekin bor:
      </p>
      ${checks([
        "<b>Chiroyli ko'rinish muhim bo'lsa</b> — kolleksion NFT sovg'a yoki uning bir kunlik ijarasi.",
        "<b>Foydalilik muhim bo'lsa</b> — Telegram Premium obunasi.",
        "<b>Tanlovni o'ziga qoldirmoqchi bo'lsangiz</b> — Stars.",
        "<b>Har holda</b> — tabrik matni sovg'aning yarmi.",
      ])}
    </div>
  </div>
</section>

<section class="sec wrap rv" id="bayramlar">
  ${head2({
    kicker: "Bayramlar",
    title: "Qaysi kunga oldindan tayyorlanish kerak",
    lead: "Bayram oldidan hamma bir vaqtda esga oladi. Oldindan bron qilsangiz, o'sha shovqinga tushmaysiz.",
  })}
  ${table(
    ["Sana", "Munosabat", "Nima yaxshi ishlaydi"],
    [
      ["14-fevral", "Sevgi kuni", "Anonim gift yoki NFT sovg'a, 00:00 ga qo'yilgan"],
      ["8-mart", "Xotin-qizlar kuni", "Premium obuna yoki kolleksion NFT sovg'a"],
      ["21-mart", "Navro'z", "Oila a'zolariga bir nechta gift birdan"],
      ["1-sentabr", "Bilim kuni", "Talabalarga Stars yoki Premium"],
      ["31-dekabr", "Yangi yil", "<b>Oldindan bron qiling</b> — eng band kun"],
      ["Istalgan kun", "Tug'ilgan kun", "Taymer 00:00 ga — birinchi tabrik siznikiga"],
    ]
  )}
  <p class="note" style="max-width:760px">
    <b>Amaliy maslahat:</b> tug'ilgan kunlarni bir marta o'tirib rejalashtiring. Bir yilgacha
    oldindan bron qilish mumkin — keyin butun yil davomida hech kimni unutib qo'ymaysiz.
  </p>
</section>

<section class="sec sec-alt rv" id="masofadan">
  <div class="wrap prose">
    <h2>Masofadan sovg'a yuborish</h2>
    <p>
      Oila a'zosi boshqa shaharda yoki chet elda bo'lsa, oddiy sovg'a muammoga aylanadi: yetkazib
      berish, bojxona, kutish va sovg'aning yo'lda shikastlanishi. Raqamli sovg'ada bularning
      hech biri yo'q — u <b>Telegram ichida</b> yetkaziladi.
    </p>
    <ul>
      <li><b>Manzil kerak emas</b> — faqat @username.</li>
      <li><b>Yetkazish vaqti bir xil</b> — qo'shni uydami yoki boshqa qit'adami, farqi yo'q.</li>
      <li><b>Vaqt mintaqasi</b> — taymerni qabul qiluvchining vaqtiga moslab qo'ying.</li>
      <li><b>To'lov siz tomondan</b> — so'mda, O'zbekiston kartangiz bilan.</li>
    </ul>
    <p class="note">
      <b>Vaqt mintaqasiga e'tibor bering.</b> Do'stingiz boshqa mintaqada bo'lsa, uning 00:00 i
      sizning 00:00 ingiz emas. Taymerni qo'yishdan oldin farqni hisoblab oling.
    </p>
  </div>
</section>

<section class="sec wrap rv" id="savollar">
  ${head2({ kicker: "Savol-javob", title: "Tug'ilgan kun sovg'asi bo'yicha savollar" })}
  ${faqList(faq)}
</section>

${ctaBlock({
  title: "Keyingi tug'ilgan kunni bugun rejalashtiring",
  text: "Sovg'ani tanlang, sanani belgilang va unuting — tizim o'z vaqtida yetkazadi.",
  btn: "Sovg'a tanlash",
  note: `Savol bo'lsa: <a href="${site.support}" target="_blank" rel="noopener">${site.supportHandle}</a>`,
})}
`,
};
