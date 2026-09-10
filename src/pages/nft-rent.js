// NFT sovg'a ijarasi. Kalit so'zlar: nft sovg'a ijarasi, nft gift ijaraga olish,
// telegram nft ijara, noyob sovg'a arzon, kolleksion gift arenda.

import { site } from "../site.js";
import { phead, head2, steps, faqList, ctaBlock, checks, table, cards, ic } from "../layout.js";

const howSteps = [
  { title: "Botda ijara bo'limini oching", text: `<b>${site.botHandle}</b> → "NFT sovg'a ijarasi". Katalog jonli — hozir bo'sh turgan giftlar ko'rinadi.` },
  { title: "Giftni tanlang", text: "Kolleksiya, model, fon va naqsh bo'yicha filtrlang. Har bir gift yonida bir kunlik narxi turadi." },
  { title: "Muddatni belgilang", text: "Necha kunga kerakligini tanlaysiz — bir kundan boshlab. Yakuniy summa darhol so'mda ko'rinadi." },
  { title: "So'mda to'lang", text: "Uzcard, Humo, Click, Payme yoki balans. To'lov tasdiqlangach ijara boshlanadi." },
  { title: "Gift sizga ulanadi", text: "NFT sovg'a profilingizda oddiy gift kabi ko'rinadi — do'stlaringiz farqni sezmaydi." },
  { title: "Muddat tugaydi", text: "Belgilangan kun tugagach gift avtomatik qaytadi. Yoqib qolsa — tugagunga qadar uzaytirish mumkin." },
];

const faq = [
  { q: "NFT sovg'a ijarasi nima?", a: "Bu noyob Telegram NFT giftini butunlay sotib olmasdan, belgilangan muddatga vaqtincha olish. Ijara davrida gift sizning profilingizda ko'rinadi, muddat tugagach egasiga qaytadi. To'liq sotib olishga nisbatan bir necha barobar arzon." },
  { q: "Ijaraga olingan gift profilimda haqiqiy ko'rinadimi?", a: "Ha. U oddiy NFT gift kabi ko'rinadi — model, fon va naqshi bilan. Tashqaridan qaraganda ijara ekanini bilib bo'lmaydi." },
  { q: "Ijara narxi qanday hisoblanadi?", a: "Narx uchta qismdan iborat: giftning bir kunlik ijara narxi, tanlangan kunlar soni va blokcheyn tarmog'ining bir martalik xarajati. Yig'indi so'mga o'giriladi va to'lashdan oldin to'liq ko'rsatiladi." },
  { q: "Eng kam ijara muddati qancha?", a: "Bir kun. Ko'p odam tug'ilgan kun yoki bayram uchun aynan bir-ikki kunga oladi — shu vaqtga profilni bezash uchun yetarli." },
  { q: "Ijara muddatini uzaytira olamanmi?", a: "Ha, muddat tugamasdan oldin uzaytirish mumkin. Qo'shimcha kunlar uchun to'lov o'sha paytdagi narx bo'yicha hisoblanadi." },
  { q: "Muddat tugagach gift bilan nima bo'ladi?", a: "U avtomatik ravishda egasiga qaytadi — sizdan hech qanday amal talab qilinmaydi va qo'shimcha pul yechilmaydi. Qaytgach profilingizda ko'rinmay qoladi." },
  { q: "Ijaraga olingan giftni sovg'a qila olamanmi?", a: "Yo'q. Ijara — vaqtincha foydalanish, mulk emas. Sovg'a qilish uchun giftni sotib olish kerak. Sotib olish ham botda bor." },
  { q: "Ijara sotib olishdan qanchalik arzon?", a: "Qimmat kolleksiyalarda farq juda katta: to'liq sotib olish bahosining kichik ulushiga bir necha kunlik ijara olinadi. Aniq raqam giftga bog'liq — katalogda har biri yonida ko'rsatilgan." },
  { q: "TON yoki kripto hamyon kerakmi?", a: "Yo'q. Blokcheyn qismini biz o'zimiz bajaramiz. Siz oddiy so'mda, Uzcard yoki Humo kartangiz bilan to'laysiz." },
  { q: "Ijara paytida gift men bilan nima qila oladi?", a: "Uni profilingizga qo'yishingiz, sovg'alaringiz ro'yxatida ko'rsatishingiz mumkin. Uni boshqa odamga o'tkazish yoki sotish mumkin emas — u sizniki emas, ijarada." },
];

const useCases = [
  { icon: "star", title: "Bir kunlik ko'z-ko'z", text: "Tug'ilgan kuningizga yoki muhim suhbatga noyob gift bilan chiqish — keyin uni saqlab qolish shart emas." },
  { icon: "gem", title: "Sotib olishdan oldin sinash", text: "Qimmat kolleksiyani olishdan oldin uni bir necha kun \"kiyib\" ko'ring: profilingizga yarashadimi?" },
  { icon: "crown", title: "Kanal va profil bezagi", text: "Kanal egalari uchun status belgisi — obunachilar oldida jiddiy ko'rinish arzonga tushadi." },
  { icon: "wallet", title: "Byudjetni tejash", text: "Katta summani muzlatib qo'ymang. Sovg'a bir kecha kerak bo'lsa — bir kecha uchun to'lang." },
];

export default {
  slug: "nft-sovga-ijara",
  title: "NFT sovg'a ijarasi — Telegram giftni kunlab ijaraga olish",
  description:
    "Telegram NFT sovg'asini sotib olmasdan ijaraga oling: bir kundan boshlab, so'mda to'lov. To'liq bahodan ancha arzon, muddat tugagach o'zi qaytadi.",
  ogTitle: "NFT sovg'a ijarasi — noyob Telegram gift arzonga",
  updated: "2026-09-10",
  breadcrumb: [{ name: "Bosh sahifa", slug: "" }, { name: "NFT sovg'a ijarasi", slug: "nft-sovga-ijara" }],
  faq,
  howto: {
    name: "Telegram NFT sovg'asini qanday ijaraga olish mumkin",
    description: "NFT giftni kunlik ijaraga olish: katalogdan tanlash, muddatni belgilash, so'mda to'lash va giftni profilga ulash.",
    time: "PT5M",
    steps: howSteps,
  },
  service: {
    name: "Telegram NFT sovg'a ijarasi",
    type: "NFT gift ijarasi",
    description: "Kolleksion Telegram NFT giftlarini kunlik shartlarda ijaraga berish. To'lov O'zbek so'mida, mahalliy kartalar orqali.",
    offers: { priceCurrency: "UZS" },
  },
  body: `
${phead({
  crumbs: [{ text: "NFT sovg'a ijarasi" }],
  h1: "NFT sovg'a <span class=\"gt\">ijarasi</span>",
  lead: "Noyob Telegram giftini butunlay sotib olishga hojat yo'q. Kerakli kunga ijaraga oling — u profilingizda haqiqiy NFT sovg'a kabi ko'rinadi, muddat tugagach o'zi qaytadi.",
  tags: ["1 kundan boshlab", "So'mda to'lov", "Kripto hamyon kerak emas", "Uzaytirish mumkin"],
  btn: "Katalogni ochish",
})}

<section class="sec wrap rv">
  <div class="prose">
    <h2>Ijara nima va nega u arzon</h2>
    <p>
      Telegram'dagi kolleksion NFT sovg'alar — noyob model, fon va naqshga ega raqamli buyumlar.
      Ular ochiq bozorda sotiladi va eng ko'zga tashlanadiganlarining narxi bir necha yuz dollargacha
      chiqadi. Ko'pchilikka esa gift <b>doimiy</b> emas, <b>bir kunga</b> kerak: tug'ilgan kunga,
      muhim tanishuvga yoki shunchaki chiroyli profil uchun.
    </p>
    <p>
      Ijara aynan shu ehtiyoj uchun. Siz aktivning o'zini emas, <b>undan foydalanish vaqtini</b>
      sotib olasiz. Shuning uchun bir necha kunlik ijara to'liq bahoning kichik ulushiga tushadi —
      xuddi kostyumni to'y uchun ijaraga olgandek.
    </p>

    <h2>Kimlar ijaraga oladi</h2>
  </div>
  <div style="margin-top:26px">
    ${cards(useCases)}
  </div>
</section>

<section class="sec sec-alt rv">
  <div class="wrap">
    ${head2({
      kicker: "Bosqichma-bosqich",
      title: "NFT sovg'ani qanday ijaraga olasiz",
      lead: "Butun jarayon Telegram ichida. Kripto hamyon ochish, seed-fraza yozib olish yoki birjada ro'yxatdan o'tish kerak emas.",
    })}
    ${steps(howSteps)}
  </div>
</section>

<section class="sec wrap rv">
  <div class="split">
    <div class="prose">
      <h2>Narx qanday hisoblanadi</h2>
      <p>
        Ijara narxi yashirin emas — u uchta aniq qismdan yig'iladi va to'lashdan oldin so'mda
        to'liq ko'rsatiladi:
      </p>
      <ul>
        <li><b>Kunlik narx</b> — giftning o'zi uchun. Har bir gift uchun katalogda alohida turadi.</li>
        <li><b>Kunlar soni</b> — siz tanlagan muddat. Kunlik narx shunga ko'paytiriladi.</li>
        <li><b>Tarmoq xarajati</b> — blokcheyn amaliyoti uchun bir martalik summa. U kunga emas, <b>butun ijaraga</b> bir marta qo'shiladi.</li>
      </ul>
      <p class="note">
        <b>Shuning uchun uzoqroq muddat foydaliroq.</b> Bir martalik tarmoq xarajati 1 kunlik ijarada ham,
        5 kunlikda ham bir xil — kunlar ko'paygani sayin u har bir kunga kamroq tushadi.
      </p>
      <p>
        TON kursi jonli olinadi va so'mga o'giriladi, shuning uchun katalogdagi summa bugungi haqiqiy
        bahoni ko'rsatadi.
      </p>
    </div>
    <div>
      ${table(
        ["", "Ijara", "Sotib olish"],
        [
          ["To'lov", "Kunlik, kichik summa", "Bir yo'la, to'liq baho"],
          ["Muddat", "Siz tanlagan kunlar", "Cheksiz"],
          ["Profilda ko'rinishi", "<b>Bir xil</b>", "<b>Bir xil</b>"],
          ["Boshqasiga sovg'a qilish", "Mumkin emas", "Mumkin"],
          ["Sotish", "Mumkin emas", "Mumkin"],
          ["Muddat tugagach", "O'zi qaytadi", "Sizda qoladi"],
          ["Kimga mos", "Bir martalik ehtiyoj", "Kolleksiya yig'ish"],
        ]
      )}
      <div class="panel" style="margin-top:16px">
        <h3>${ic("lock")} Xavfsizlik</h3>
        ${checks([
          "Blokcheyn qismi bizning tomonimizda — sizdan hamyon so'ralmaydi.",
          "Karta ma'lumotlari bank sahifasida kiritiladi, bizda saqlanmaydi.",
          "Ijara boshlanmasa, to'langan summa balansga qaytariladi.",
        ])}
      </div>
    </div>
  </div>
</section>

<section class="sec sec-alt rv" id="savollar">
  <div class="wrap">
    ${head2({ kicker: "Savol-javob", title: "NFT ijarasi bo'yicha savollar" })}
    ${faqList(faq)}
  </div>
</section>

<section class="sec wrap rv">
  <div class="prose">
    <h2>Buni ham ko'ring</h2>
    <ul>
      <li><a href="/nft-gift-sotib-olish/">NFT gift sotib olish</a> — giftni butunlay o'zingizniki qilish.</li>
      <li><a href="/rejalashtirilgan-sovga/">Rejalashtirilgan sovg'a</a> — ijarani kerakli sanaga oldindan bron qilish.</li>
      <li><a href="/telegram-sovga-yuborish/">Telegram sovg'a yuborish</a> — oddiy giftni do'stingizga jo'natish.</li>
    </ul>
  </div>
</section>

${ctaBlock({
  title: "Noyob giftni bugun sinab ko'ring",
  text: "Katalogni oching, yoqqanini tanlang va bir kunga oling. Yoqmasa — ertaga o'zi qaytadi.",
  btn: "Ijara katalogini ochish",
})}
`,
};
