// build.js — statik saytni yig'adi. Bog'liqliklarsiz, faqat Node.
//   node build.js        → dist/ ichiga to'liq sayt
// Chiqish natijasi — sof HTML/CSS/JS. Hech qanday server yoki API kerak emas.

import { mkdir, writeFile, copyFile, readdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { site } from "./src/site.js";
import { layout } from "./src/layout.js";

import home from "./src/pages/home.js";
import nftRent from "./src/pages/nft-rent.js";
import scheduled from "./src/pages/scheduled.js";
import sendGift from "./src/pages/send-gift.js";
import nftBuy from "./src/pages/nft-buy.js";
import premium from "./src/pages/premium.js";
import birthday from "./src/pages/birthday.js";
import { loadPosts, blogIndexPage, postPage, llmsTxt } from "./src/blog/index.js";

const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, "dist");

// Sitemap ustuvorligi: bosh sahifa eng yuqori, keyin asosiy xizmatlar.
const pages = [
  { page: home, priority: "1.0", changefreq: "weekly" },
  { page: nftRent, priority: "0.9", changefreq: "weekly" },
  { page: scheduled, priority: "0.9", changefreq: "weekly" },
  { page: sendGift, priority: "0.9", changefreq: "weekly" },
  { page: nftBuy, priority: "0.8", changefreq: "weekly" },
  { page: premium, priority: "0.8", changefreq: "weekly" },
  { page: birthday, priority: "0.8", changefreq: "monthly" },
];

const out = async (rel, data) => {
  const file = path.join(dist, rel);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, data);
  return file;
};

// ── Rasmlar ────────────────────────────────────────────────────────────
// Logo, ikonkalar va OG rasm assets/ da tayyor holda turadi — build ularni
// faqat nusxalaydi (Vercel Linux'da build qiladi, u yerda rasm vositalari yo'q).
// Logo o'zgarsa: python3 brand/images.py

// ── Yig'ish ────────────────────────────────────────────────────────────
async function build() {
  if (existsSync(dist)) await rm(dist, { recursive: true, force: true });
  await mkdir(dist, { recursive: true });
  const posts = await loadPosts(root);

  // 1. HTML sahifalar
  for (const { page } of pages) {
    const rel = page.slug ? `${page.slug}/index.html` : "index.html";
    const html = layout(page);
    await out(rel, html);
    console.log(`  ✓ /${page.slug ? page.slug + "/" : ""}  (${(html.length / 1024).toFixed(1)} KB)`);
  }

  // 1b. Blog: /blog/ va har maqola /blog/<slug>/ (src/blog/posts/*.json)
  const blogPages = [blogIndexPage(posts), ...posts.map((p) => postPage(p, posts))];
  for (const page of blogPages) {
    await out(`${page.slug}/index.html`, layout(page));
  }
  console.log(`  ✓ /blog/  (${posts.length} ta maqola)`);

  // 2. 404
  await out(
    "404.html",
    layout({
      slug: "404",
      noindex: true,
      title: "Sahifa topilmadi | SovgaTG",
      description: "Bunday sahifa yo'q. Bosh sahifaga qayting yoki sovg'a xizmatlaridan birini tanlang.",
      body: `
<section class="phead wrap" style="padding-bottom:60px">
  <h1>Bunday sahifa <span class="gt">topilmadi</span></h1>
  <p class="lead">Havola eskirgan yoki manzilda xatolik bor. Quyidagilardan birini tanlang:</p>
  <div class="btns">
    <a class="btn btn-primary" href="/">Bosh sahifa</a>
    <a class="btn btn-ghost" href="/nft-sovga-ijara/">NFT sovg'a ijarasi</a>
    <a class="btn btn-ghost" href="/rejalashtirilgan-sovga/">Rejalashtirilgan sovg'a</a>
  </div>
</section>`,
    })
  );

  // 3. Assetlar: CSS, JS va tayyor rasmlar. favicon.ico ildizga — brauzerlar
  //    va qidiruv robotlari uni /favicon.ico dan so'raydi.
  await mkdir(path.join(dist, "assets"), { recursive: true });
  for (const e of await readdir(path.join(root, "assets"), { withFileTypes: true })) {
    if (!e.isFile() || e.name.startsWith(".")) continue;
    const to = e.name === "favicon.ico" ? path.join(dist, e.name) : path.join(dist, "assets", e.name);
    await copyFile(path.join(root, "assets", e.name), to);
  }

  // 4. sitemap.xml
  const today = new Date().toISOString().slice(0, 10);
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(({ page, priority, changefreq }) => {
    const loc = page.slug ? `${site.origin}/${page.slug}/` : `${site.origin}/`;
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${page.updated || today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .concat(
    blogPages
      .filter((page) => !page.noindex)
      .map(
        (page) => `  <url>
    <loc>${site.origin}/${page.slug}/</loc>
    <lastmod>${page.updated || today}</lastmod>
    <changefreq>${page.slug === "blog" ? "weekly" : "monthly"}</changefreq>
    <priority>${page.slug === "blog" ? "0.7" : "0.6"}</priority>
  </url>`
      )
  )
  .join("\n")}
</urlset>
`;
  await out("sitemap.xml", sitemap);

  // 4b. llms.txt — javob mashinalari uchun xarita va avtoblogyoz katalogi
  await out("llms.txt", llmsTxt(pages.map(({ page }) => page), posts));

  // 5. robots.txt
  await out(
    "robots.txt",
    `User-agent: *
Allow: /

# Sayt statik — indekslashga to'siq yo'q
Sitemap: ${site.origin}/sitemap.xml
`
  );

  // 6. manifest
  await out(
    "site.webmanifest",
    JSON.stringify(
      {
        name: site.brandFull,
        short_name: site.brand,
        description:
          "Telegram sovg'alari, NFT giftlar, sovg'a ijarasi va rejalashtirilgan sovg'a — O'zbek so'mida.",
        start_url: "/",
        display: "standalone",
        background_color: site.themeColor,
        theme_color: site.themeColor,
        lang: "uz",
        icons: [
          { src: "/assets/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/assets/icon-512.png", sizes: "512x512", type: "image/png" },
          { src: "/assets/icon-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
      null,
      2
    )
  );

  console.log(`\n  Tayyor → dist/  (${pages.length + blogPages.length + 1} sahifa)\n`);
}

build().catch((e) => {
  console.error("Build xatosi:", e);
  process.exit(1);
});
