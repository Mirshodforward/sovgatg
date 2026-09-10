// Rejalashtirilgan sovg'a (taymer). Kalit so'zlar: sovg'a rejalashtirish,
// taymer bilan sovg'a, tug'ilgan kunga oldindan sovg'a, aniq vaqtda sovg'a yuborish.

import { site } from "../site.js";
import { phead, head2, steps, faqList, ctaBlock, checks, table, cards, ic } from "../layout.js";

const howSteps = [
  { title: "Sovg'ani tanlang", text: `<b>${site.botHandle}</b> da nima yubormoqchi ekaningizni tanlang: oddiy gift, NFT sovg'a, Telegram Stars yoki Premium obuna.` },
  { title: "Qabul qiluvchini kiriting", text: "Do'stingizning @username'ini yozing. Telefon raqami yoki boshqa ma'lumot kerak emas." },
  { title: "Sana va daqiqani belgilang", text: "Masalan, 12-sentabr, 00:00. Eng yaqini — 15 daqiqadan keyin, eng uzog'i bir yilgacha." },
  { title: "Tabrik matnini yozing", text: "Sovg'a tushgach qabul qiluvchiga alohida xabar bo'lib boradi. Anonim rejimni tanlasangiz, hech qanday matn yozilmaydi." },
  { title: "Hozir to'lang", text: "So'mda, oddiy karta bilan. Shu daqiqadan boshlab narx qotiriladi — kurs oshsa ham qo'shimcha so'ralmaydi." },
  { title: "Belgilangan daqiqada yetkaziladi", text: "Siz uxlab yotgan bo'lsangiz ham, internetingiz bo'lmasa ham sovg'a o'z vaqtida ketadi va sizga hisobot keladi." },
];

const guarantees = [
  { icon: "clock", title: "Aniq vaqtda yetkazish", text: "Sovg'a siz tanlagan sana va daqiqada yuboriladi. Texnik kechikish bo'lsa ham bir daqiqadan oshmaydi." },
  { icon: "lock", title: "Narx qotiriladi", text: "To'lagan summangiz o'zgarmaydi. Yetkazish kuni kurs yoki Telegram narxi oshsa ham sizdan qo'shimcha pul so'ralmaydi." },
  { icon: "refresh", title: "Yetkazolmasak — qaytaramiz", text: "Sovg'a biror sababga ko'ra ketmasa, to'langan pul balansingizga to'liq qaytariladi va sizga darhol xabar beriladi." },
  { icon: "shield", title: "Istalgan vaqtda bekor qilish", text: "Yetkazishdan oldin fikringiz o'zgarsa — bekor qiling, pul to'liq qaytadi. Jarima yo'q." },
  { icon: "user", title: "Username tekshiriladi", text: "Qabul qiluvchi username'ini o'zgartirsa yoki akkauntini o'chirsa, buyurtma jim yo'qolmaydi — biz siz bilan bog'lanamiz." },
  { icon: "chat", title: "Tabrik matni yetkaziladi", text: "Sovg'a tushgandan so'ng tabrigingiz alohida xabar bo'lib boradi. Uning sozlamalari yozishga ruxsat bermasa ham, sovg'aning o'zi baribir yetadi." },
];

const faq = [
  { q: "Rejalashtirilgan sovg'a nima?", a: "Bu hozir to'lab, sovg'ani kelajakdagi aniq sana va daqiqada yetkazish. Masalan, bugun to'laysiz, sovg'a esa do'stingizning tug'ilgan kunida, 12-sentabr soat 00:00 da avtomatik ketadi." },
  { q: "Eng uzog'i qancha vaqtga rejalashtirsam bo'ladi?", a: "Bir yilgacha. Eng yaqin muddat esa hozirgi vaqtdan 15 daqiqa keyin — to'lov o'tishi va buyurtma tayyorlanishi uchun shuncha vaqt kerak." },
  { q: "Qaysi sovg'alarga taymer qo'ysa bo'ladi?", a: "Barchasiga: oddiy Telegram giftlar, kolleksion NFT sovg'alar, Telegram Stars va Premium obuna. Har birida sana va daqiqa tanlash bo'limi bor." },
  { q: "Narx keyin oshib ketmaydimi?", a: "Yo'q. To'lagan summangiz qotiriladi. Yetkazish kuni dollar kursi yoki Telegram narxi oshsa, farqni biz qoplaymiz — sizdan qo'shimcha pul so'ralmaydi." },
  { q: "Nega uzoq muddatga ustama qo'shiladi?", a: "Siz bugun to'laysiz, biz esa sovg'ani oylar keyin sotib olamiz. Oradagi vaqtda narx oshish riski bor va uni biz o'z zimmamizga olamiz. Ustama — shu riskning bahosi: yaqin muddatga umuman qo'shilmaydi." },
  { q: "Bekor qilsam pul qaytadimi?", a: "Ha, yetkazishdan oldin istalgan vaqtda bekor qilishingiz mumkin — summa balansingizga to'liq qaytariladi. Hech qanday jarima yoki ushlab qolish yo'q." },
  { q: "Server o'chib qolsa sovg'a ketmay qoladimi?", a: "Yo'q. Buyurtma dasturning xotirasida emas, bazada saqlanadi. Tizim qayta ishga tushsa ham vaqti kelgan buyurtmalarni topib yetkazadi." },
  { q: "Anonim rejalashtirilgan sovg'a yubora olamanmi?", a: "Ha. Anonim rejimda qabul qiluvchi sovg'ani oladi, lekin kim yuborganini bilmaydi va tabrik xabari yozilmaydi." },
  { q: "Sovg'a ketganini qanday bilaman?", a: "Yetkazilgach botdan sizga xabar keladi. Buyurtmalar tarixida holati ham ko'rinib turadi: kutilmoqda, yetkazildi yoki bekor qilindi." },
  { q: "Bir vaqtning o'zida bir nechta sovg'a rejalashtirsam bo'ladimi?", a: "Ha, cheklov yo'q. Masalan, bir kunda oilangizdagi bir necha kishiga alohida sana va matn bilan sovg'a bron qilishingiz mumkin." },
];

export default {
  slug: "rejalashtirilgan-sovga",
  title: "Rejalashtirilgan sovg'a — taymer bilan aniq daqiqada yetkazish",
  description:
    "Sovg'ani oldindan to'lang — tizim uni siz belgilagan sana va daqiqada yuboradi. Tug'ilgan kunga 00:00 da. Narx qotiriladi, yetkazilmasa pul qaytadi.",
  ogTitle: "Taymer bilan sovg'a — aynan o'sha daqiqada yetadi",
  updated: "2026-09-10",
  breadcrumb: [{ name: "Bosh sahifa", slug: "" }, { name: "Rejalashtirilgan sovg'a", slug: "rejalashtirilgan-sovga" }],
  faq,
  howto: {
    name: "Telegram sovg'asini taymer bilan qanday rejalashtirish mumkin",
    description: "Sovg'ani oldindan to'lab, kelajakdagi aniq sana va daqiqaga rejalashtirish tartibi.",
    time: "PT4M",
    steps: howSteps,
  },
  service: {
    name: "Rejalashtirilgan sovg'a yetkazish",
    type: "Taymer bilan sovg'a yetkazish xizmati",
    description: "Telegram sovg'asini oldindan to'lab, belgilangan sana va daqiqada avtomatik yetkazish. Narx kafolati va to'liq qaytarish sharti bilan.",
    offers: { priceCurrency: "UZS" },
  },
  body: `
${phead({
  crumbs: [{ text: "Rejalashtirilgan sovg'a" }],
  h1: "Sovg'ani <span class=\"gt\">aniq daqiqaga</span> rejalashtiring",
  lead: "Hozir to'laysiz — sovg'a siz belgilagan sana va daqiqada o'zi ketadi. Siz uxlab yotgan bo'lsangiz ham, telefoningiz o'chgan bo'lsa ham. Tug'ilgan kun 00:00 da boshlanadi va tabrigingiz birinchi bo'ladi.",
  tags: ["15 daqiqadan 1 yilgacha", "Narx qotiriladi", "Bekor qilsangiz pul qaytadi", "Anonim rejim"],
  btn: "Sovg'ani rejalashtirish",
})}

<section class="sec wrap rv">
  <div class="prose">
    <h2>Muammo tanish: to'g'ri sovg'a, noto'g'ri vaqt</h2>
    <p>
      Tug'ilgan kunni eslab turasiz, lekin o'sha kuni ish ko'payadi, telefon zaryadsiz qoladi yoki
      shunchaki soatni o'tkazib yuborasiz. Tabrik ertalab emas, kechqurun ketadi — va o'sha
      "birinchi bo'lib tabriklash" imkoni yo'qoladi.
    </p>
    <p>
      Rejalashtirilgan sovg'a buni hal qiladi: siz <b>bir hafta oldin</b> ham to'lab qo'yishingiz mumkin,
      tizim esa <b>aynan siz aytgan daqiqada</b> yetkazadi.
    </p>

    <h3>Hayotiy misol</h3>
    <p>
      Do'stingizning tug'ilgan kuni — <b>12-sentabr</b>. Siz 5-sentabrda botga kirasiz,
      Telegram Premium obunasini tanlaysiz, uning @username'ini kiritasiz va taymerni
      <b>12-sentabr, 00:00</b> ga qo'yasiz. To'laysiz va unutasiz. 12-sentabr yarim tunda
      do'stingiz uyg'onib, birinchi bo'lib sizning sovg'angizni ko'radi.
    </p>
  </div>
</section>

<section class="sec sec-alt rv">
  <div class="wrap">
    ${head2({
      kicker: "Bosqichma-bosqich",
      title: "Taymerli sovg'a qanday qilinadi",
      lead: "Olti qadam, taxminan to'rt daqiqa. Keyin esa umuman esga olish shart emas.",
    })}
    ${steps(howSteps)}
  </div>
</section>

<section class="sec wrap rv" id="kafolat">
  ${head2({
    kicker: "Kafolat shartlari",
    title: "Nima va'da qilamiz",
    lead: "Siz pulni bugun berasiz, natijani esa keyin ko'rasiz. Shuning uchun shartlar og'zaki emas — ular yozma va buyurtmangiz bilan birga saqlanadi.",
  })}
  ${cards(guarantees)}
  <p class="note" style="max-width:760px">
    <b>Shartlar versiyalangan.</b> Buyurtma berayotganda qabul qilgan shartlaringiz o'sha buyurtma bilan
    birga saqlanadi. Keyinchalik shartlar yangilansa ham, sizga <b>o'zingiz rozi bo'lgan</b> versiya
    amal qiladi.
  </p>
</section>

<section class="sec sec-alt rv">
  <div class="wrap split">
    <div class="prose">
      <h2>Muddat va ustama</h2>
      <p>
        Muddat qanchalik uzoq bo'lsa, oradagi noaniqlik shunchalik katta: dollar kursi va Telegram
        narxi o'zgarishi mumkin. Biz bu riskni o'z zimmamizga olamiz, ustama esa uning bahosi —
        jarima emas.
      </p>
      <p>
        Eng muhimi: <b>yaqin muddatga ustama umuman yo'q</b>. Bir hafta ichidagi tug'ilgan kunga
        sovg'a bron qilsangiz, oddiy narxda to'laysiz.
      </p>
      <p class="note">
        Bu ustama <b>to'lov usuli</b> ustamasidan alohida hisoblanadi va undan oldin qo'llanadi.
        Yakuniy summa botda to'lash tugmasida to'liq ko'rinadi.
      </p>
    </div>
    <div>
      ${table(
        ["Muddat", "Ustama", "Odatda qachon"],
        [
          ["Bir haftagacha", "<b>0%</b>", "Yaqin tug'ilgan kun, bu hafta bayram"],
          ["Uch oygacha", "<b>~5%</b>", "Kelasi bayram, mavsumiy reja"],
          ["Bir yilgacha", "<b>~12%</b>", "Kelasi yilgi sana, yubiley"],
        ]
      )}
      <div class="panel" style="margin-top:16px">
        <h3>${ic("bolt")} Texnik chegaralar</h3>
        ${checks([
          "Eng yaqin vaqt — <b>hozirdan 15 daqiqa keyin</b>.",
          "Eng uzoq muddat — <b>bir yil</b>.",
          "Aniqlik — <b>daqiqagacha</b>, soniyagacha emas.",
          "Bir vaqtda nechta buyurtma bo'lsa ham cheklov yo'q.",
        ])}
      </div>
    </div>
  </div>
</section>

<section class="sec wrap rv">
  <div class="prose">
    <h2>Nega taymer ishonchli</h2>
    <p>
      Eng ko'p beriladigan savol — "serveringiz o'chsa-chi?". Bu yerda muhim texnik qaror bor:
      buyurtma dasturning xotirasida <b>saqlanmaydi</b>. U ma'lumotlar bazasida yozilgan bo'ladi,
      tizim esa har necha soniyada "vaqti kelganlari bormi?" deb tekshirib turadi.
    </p>
    <p>
      Shuning uchun dastur qayta ishga tushsa, yangilansa yoki kutilmaganda to'xtasa ham
      rejalashtirilgan sovg'a yo'qolmaydi — tizim tiklangach uni topib yetkazadi. Bu odatiy
      "taymer" yondashuvidan farq qiladi va aynan shu narsa sovg'aning o'z vaqtida ketishini
      ta'minlaydi.
    </p>
  </div>
</section>

<section class="sec sec-alt rv" id="savollar">
  <div class="wrap">
    ${head2({ kicker: "Savol-javob", title: "Rejalashtirilgan sovg'a bo'yicha savollar" })}
    ${faqList(faq)}
  </div>
</section>

<section class="sec wrap rv">
  <div class="prose">
    <h2>Buni ham ko'ring</h2>
    <ul>
      <li><a href="/tugilgan-kunga-sovga/">Tug'ilgan kunga sovg'a</a> — g'oyalar va aniq tavsiyalar.</li>
      <li><a href="/telegram-premium-sovga/">Premium va Stars sovg'a qilish</a> — eng ko'p rejalashtiriladigan sovg'a.</li>
      <li><a href="/nft-sovga-ijara/">NFT sovg'a ijarasi</a> — bayram kuniga noyob gift bron qilish.</li>
    </ul>
  </div>
</section>

${ctaBlock({
  title: "Keyingi tug'ilgan kunni endi o'tkazib yubormaysiz",
  text: "Bugun to'lang, sanani belgilang va unuting. Qolganini tizim bajaradi.",
  btn: "Sovg'ani rejalashtirish",
})}
`,
};
