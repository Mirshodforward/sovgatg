// src/site.js — saytning global konfiguratsiyasi.
// Bitta joyda: brend, havolalar, navigatsiya, ishonch raqamlari.
// Sahifalar shu yerdan o'qiydi — matnni o'zgartirsangiz, hamma sahifada o'zgaradi.

export const site = {
  domain: "sovgatg.uz",
  origin: "https://sovgatg.uz",
  brand: "SovgaTG",
  brandFull: "SovgaTG — Telegram sovg'alari markazi",
  lang: "uz",
  locale: "uz_UZ",
  // Telegram havolalari (bot production'da ishlab turibdi)
  // 2026-11-07 (egasi): sovg'a sayti endi o'z botiga — @sovgatguz_bot. Tugmalarda manba belgisi: bot
  // `site_sovgatg` ni mijozning birinchi manbasi qilib yozadi → admin panelda Google/sayt orqali kelganlar.
  bot: "https://t.me/sovgatguz_bot?start=site_sovgatg",
  botCanonical: "https://t.me/sovgatguz_bot", // schema.org sameAs / llms — rasmiy havola belgisiz
  botHandle: "@sovgatguz_bot",
  support: "https://t.me/StarsPaymeeSupport",
  supportHandle: "@StarsPaymeeSupport",
  channel: "https://t.me/StarsPaymee",
  channelHandle: "@StarsPaymee",
  themeColor: "#0C0F45",

  // Ishonch raqamlari — production bazasidan (2026-09 holatiga).
  // Bo'rttirilmagan: pastga yaxlitlangan.
  stats: [
    { value: "10 700+", label: "foydalanuvchi", hint: "6 oyda yig'ilgan baza" },
    { value: "12 600+", label: "buyurtma", hint: "to'liq avtomatik qayta ishlangan" },
    { value: "24/7", label: "ishlaydi", hint: "tunda ham, bayramda ham" },
    { value: "~10 soniya", label: "yetkazish", hint: "to'lov tasdiqlangach" },
  ],

  pay: ["Uzcard", "Humo", "Click", "Payme", "Paynet", "Balans"],
};

// Yuqori navigatsiya — har sahifada bir xil.
export const nav = [
  { href: "/#xizmatlar", text: "Xizmatlar" },
  { href: "/nft-sovga-ijara/", text: "NFT ijara" },
  { href: "/rejalashtirilgan-sovga/", text: "Taymer sovg'a" },
  { href: "/#qanday", text: "Qanday ishlaydi" },
  { href: "/#savollar", text: "Savollar" },
  { href: "/blog/", text: "Blog" },
];

// Footer ustunlari
export const footerCols = [
  {
    title: "Sovg'a xizmatlari",
    links: [
      { href: "/telegram-sovga-yuborish/", text: "Telegram sovg'a yuborish" },
      { href: "/nft-gift-sotib-olish/", text: "NFT gift sotib olish" },
      { href: "/nft-sovga-ijara/", text: "NFT sovg'a ijarasi" },
      { href: "/rejalashtirilgan-sovga/", text: "Rejalashtirilgan sovg'a" },
      { href: "/telegram-premium-sovga/", text: "Premium va Stars sovg'a" },
      { href: "/blog/", text: "Blog va qo'llanmalar" },
    ],
  },
  {
    title: "Munosabat bilan",
    links: [
      { href: "/tugilgan-kunga-sovga/", text: "Tug'ilgan kunga sovg'a" },
      { href: "/tugilgan-kunga-sovga/#sevgiliga", text: "Sevgiliga sovg'a" },
      { href: "/tugilgan-kunga-sovga/#bayramlar", text: "8-mart va Yangi yil" },
      { href: "/tugilgan-kunga-sovga/#masofadan", text: "Masofadan sovg'a" },
    ],
  },
  {
    title: "Aloqa",
    links: [
      { href: site.bot, text: site.botHandle, ext: true },
      { href: site.support, text: "Qo'llab-quvvatlash", ext: true },
      { href: site.channel, text: "Telegram kanal", ext: true },
    ],
  },
];
