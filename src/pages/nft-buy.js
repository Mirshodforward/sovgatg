// NFT gift sotib olish. Kalit so'zlar: nft gift sotib olish, telegram nft sovg'a,
// kolleksion gift, nft sovg'a narxi, nft gift sotish.

import { site } from "../site.js";
import { phead, head2, steps, faqList, ctaBlock, checks, table, cards, ic } from "../layout.js";

const howSteps = [
  { title: "Gift bozorini oching", text: `<b>${site.botHandle}</b> → "Gift Market". Katalogda hozir sotuvda turgan kolleksion NFT sovg'alar ko'rinadi.` },
  { title: "Filtrlab tanlang", text: "Kolleksiya, model, fon va naqsh bo'yicha saralang. Kamyob birikmalar alohida belgilanadi." },
  { title: "Narxni ko'ring", text: "Har bir giftning so'mdagi narxi darhol ko'rsatiladi — kurs hisoblash yoki kripto bilishning hojati yo'q." },
  { title: "So'mda to'lang", text: "Uzcard, Humo, Click, Payme yoki balans. Xalqaro karta va hamyon kerak emas." },
  { title: "Gift sizniki bo'ladi", text: "Sotib olingan NFT sovg'a akkauntingizga o'tadi: profilga qo'yish, saqlash, sovg'a qilish yoki keyin sotish mumkin." },
];

const faq = [
  { q: "Telegram NFT gift nima?", a: "Bu Telegram'ning kolleksion sovg'asi: har birining o'z modeli, foni va naqshi bor. Ayrim birikmalar juda kam uchraydi va shuning uchun qimmat baholanadi. Oddiy giftdan farqi — u haqiqiy mulk, uni saqlash, sovg'a qilish yoki sotish mumkin." },
  { q: "NFT giftni qanday sotib olaman?", a: "Botdagi Gift Market bo'limidan tanlaysiz va so'mda to'laysiz. Kripto hamyon, birja hisobi yoki xalqaro karta talab qilinmaydi — barcha texnik qismini biz bajaramiz." },
  { q: "Narx nimaga bog'liq?", a: "Kamyoblikka: model, fon va naqsh birikmasi qanchalik kam uchrasa, narx shunchalik yuqori. Katalogdagi summa bozorning joriy holatini aks ettiradi va so'mda ko'rsatiladi." },
  { q: "Sotib olgan giftni sotsam bo'ladimi?", a: "Ha. NFT gift sizning mulkingiz — uni keyinchalik sotishingiz, do'stingizga sovg'a qilishingiz yoki profilingizda saqlab qolishingiz mumkin." },
  { q: "NFT giftni boshqa odamga sovg'a qila olamanmi?", a: "Ha, sotib olingan NFT giftni istalgan Telegram foydalanuvchisiga o'tkazish mumkin. Bu esda qoladigan sovg'a variantlaridan biri." },
  { q: "Sotib olish va ijara o'rtasidagi farq nima?", a: "Sotib olishda gift butunlay sizniki bo'ladi va cheksiz qoladi. Ijarada esa uni faqat belgilangan kunlarga olasiz — arzonroq, lekin muddat tugagach qaytadi va uni sovg'a qilib bo'lmaydi." },
  { q: "Gift qachon akkauntimga tushadi?", a: "To'lov tasdiqlangach odatda bir daqiqa ichida. Jarayon avtomatik, operator kutilmaydi." },
  { q: "Narx kripto kursiga bog'liqmi?", a: "Bozor kursi hisobga olinadi, lekin siz uni bilishingiz shart emas: botda tayyor so'mdagi summa turadi va aynan shu summa kartangizdan yechiladi." },
  { q: "Kolleksion gift investitsiyami?", a: "Biz uni investitsiya sifatida taklif qilmaymiz. NFT giftlar narxi bozorga qarab ham oshadi, ham tushadi. Uni birinchi navbatda sovg'a va kolleksiya buyumi sifatida ko'ring." },
];

const traits = [
  { icon: "gem", title: "Model", text: "Sovg'aning asosiy ko'rinishi. Ba'zi modellar butun kolleksiyada bir necha o'ntagina bo'ladi." },
  { icon: "star", title: "Fon", text: "Rang gammasi va yorqinligi. Kamyob fonlar giftning umumiy bahosini sezilarli oshiradi." },
  { icon: "crown", title: "Naqsh", text: "Yuzasidagi bezak. Model va fon bilan birikkanda noyoblik darajasini belgilaydi." },
];

export default {
  slug: "nft-gift-sotib-olish",
  title: "NFT gift sotib olish — Telegram kolleksion sovg'alari",
  description:
    "Telegram kolleksion NFT sovg'alarini so'mda sotib oling: model, fon va naqsh bo'yicha tanlang. Kripto hamyon kerak emas, bir daqiqada yetkaziladi.",
  ogTitle: "NFT gift sotib olish — kolleksion Telegram sovg'alari",
  updated: "2026-09-10",
  breadcrumb: [{ name: "Bosh sahifa", slug: "" }, { name: "NFT gift sotib olish", slug: "nft-gift-sotib-olish" }],
  faq,
  howto: {
    name: "Telegram NFT giftni qanday sotib olish mumkin",
    description: "Kolleksion NFT sovg'ani botdagi bozordan tanlash va so'mda sotib olish tartibi.",
    time: "PT3M",
    steps: howSteps,
  },
  service: {
    name: "Telegram NFT gift savdosi",
    type: "Kolleksion NFT sovg'a sotib olish",
    description: "Telegram kolleksion NFT sovg'alarini O'zbek so'mida sotib olish. Kripto hamyonsiz, mahalliy kartalar bilan.",
    offers: { priceCurrency: "UZS" },
  },
  body: `
${phead({
  crumbs: [{ text: "NFT gift sotib olish" }],
  h1: "NFT gift <span class=\"gt\">sotib olish</span>",
  lead: "Telegram'ning kolleksion sovg'alari: noyob model, fon va naqsh. So'mda to'laysiz, kripto hamyon ochmaysiz — gift to'g'ridan-to'g'ri akkauntingizga tushadi.",
  tags: ["Kripto hamyonsiz", "So'mda narx", "~1 daqiqada", "Sotish ham mumkin"],
  btn: "Bozorni ochish",
})}

<section class="sec wrap rv">
  <div class="prose">
    <h2>Kolleksion NFT gift nima</h2>
    <p>
      Oddiy Telegram sovg'asi — chatdagi chiroyli e'tibor. Kolleksion NFT sovg'a esa <b>mulk</b>:
      uning noyoblik darajasi bor, u profilingizda ko'rinadi, uni boshqa odamga o'tkazish yoki
      keyinchalik sotish mumkin.
    </p>
    <p>
      Har bir NFT gift uch belgidan yig'iladi va aynan ularning birikmasi narxni belgilaydi:
    </p>
  </div>
  <div style="margin-top:26px">${cards(traits)}</div>
</section>

<section class="sec sec-alt rv">
  <div class="wrap">
    ${head2({
      kicker: "Bosqichma-bosqich",
      title: "NFT gift qanday sotib olinadi",
      lead: "Kriptovalyuta bilan ishlashni bilish shart emas — siz oddiy so'mda to'laysiz.",
    })}
    ${steps(howSteps)}
  </div>
</section>

<section class="sec wrap rv">
  <div class="split">
    <div class="prose">
      <h2>Sotib olish yoki ijara?</h2>
      <p>
        Ikkalasi ham botda bor va ular turli ehtiyoj uchun. Oddiy qoida: gift <b>sizda qolishi</b>
        kerak bo'lsa yoki uni <b>sovg'a qilmoqchi</b> bo'lsangiz — sotib oling. Faqat bir necha
        kunga chiroyli ko'rinish kerak bo'lsa — <a href="/nft-sovga-ijara/">ijara</a> ancha arzonga
        tushadi.
      </p>
      <p class="note">
        <b>Ko'p uchraydigan yechim:</b> avval bir-ikki kunga ijaraga olib sinab ko'rish, yoqsa —
        keyin sotib olish.
      </p>
    </div>
    <div>
      ${table(
        ["", "Sotib olish", "Ijara"],
        [
          ["Narx", "To'liq bozor bahosi", "<b>Ancha arzon</b>"],
          ["Muddat", "Cheksiz", "Siz tanlagan kunlar"],
          ["Sovg'a qilish", "<b>Mumkin</b>", "Mumkin emas"],
          ["Sotish", "<b>Mumkin</b>", "Mumkin emas"],
          ["Kimga mos", "Kolleksioner, sovg'a qiluvchi", "Bir martalik ehtiyoj"],
        ]
      )}
      <div class="panel" style="margin-top:16px">
        <h3>${ic("shield")} Xarid xavfsizligi</h3>
        ${checks([
          "Blokcheyn amaliyotlari bizning tomonimizda — sizdan seed-fraza so'ralmaydi.",
          "Narx to'lashdan oldin so'mda qotib turadi.",
          "Xarid amalga oshmasa, summa balansga qaytariladi.",
        ])}
      </div>
    </div>
  </div>
</section>

<section class="sec sec-alt rv" id="savollar">
  <div class="wrap">
    ${head2({ kicker: "Savol-javob", title: "NFT gift bo'yicha savollar" })}
    ${faqList(faq)}
  </div>
</section>

<section class="sec wrap rv">
  <div class="prose">
    <h2>Buni ham ko'ring</h2>
    <ul>
      <li><a href="/nft-sovga-ijara/">NFT sovg'a ijarasi</a> — sotib olmasdan bir necha kunga olish.</li>
      <li><a href="/telegram-sovga-yuborish/">Telegram sovg'a yuborish</a> — oddiy gift jo'natish.</li>
      <li><a href="/rejalashtirilgan-sovga/">Rejalashtirilgan sovg'a</a> — NFT sovg'ani bayram kuniga bron qilish.</li>
    </ul>
  </div>
</section>

${ctaBlock({
  title: "Kolleksiyangizni bugun boshlang",
  text: "Bozorni oching va bugungi taklif etilayotgan noyob giftlarni ko'ring.",
  btn: "Gift bozorini ochish",
})}
`,
};
