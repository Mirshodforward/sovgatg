// build.js — statik saytni yig'adi. Bog'liqliklarsiz, faqat Node.
//   node build.js        → dist/ ichiga to'liq sayt
// Chiqish natijasi — sof HTML/CSS/JS. Hech qanday server yoki API kerak emas.

import { mkdir, writeFile, copyFile, readdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

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

const run = promisify(execFile);
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

// ── Grafika (SVG) ──────────────────────────────────────────────────────
const GRAD = `<linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
  <stop offset="0" stop-color="#FF6E8A"/><stop offset=".52" stop-color="#FFC163"/><stop offset="1" stop-color="#A78BFA"/>
</linearGradient>`;

const giftPath = `<path d="M20 12v9H4v-9M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" fill="none" stroke="#20121A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`;

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><defs>${GRAD}</defs><rect width="32" height="32" rx="8" fill="url(#g)"/><g transform="translate(4 4) scale(1)">${giftPath}</g></svg>`;

const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 48" role="img" aria-label="SovgaTG"><defs>${GRAD}</defs><rect width="44" height="44" y="2" rx="13" fill="url(#g)"/><g transform="translate(10 12) scale(1.05)">${giftPath}</g><text x="58" y="32" font-family="Unbounded,system-ui,sans-serif" font-size="22" font-weight="700" fill="#F7F3F9">Sovga</text><text x="140" y="32" font-family="Unbounded,system-ui,sans-serif" font-size="22" font-weight="700" fill="url(#g)">TG</text></svg>`;

const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs>${GRAD}</defs><rect width="512" height="512" rx="112" fill="#0B0810"/><rect x="56" y="56" width="400" height="400" rx="96" fill="url(#g)"/><g transform="translate(136 136) scale(10)">${giftPath}</g></svg>`;

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" viewBox="0 0 1200 1200">
<defs>${GRAD}
<radialGradient id="r1" cx="18%" cy="8%" r="62%"><stop offset="0" stop-color="#B4306A" stop-opacity=".85"/><stop offset="1" stop-color="#B4306A" stop-opacity="0"/></radialGradient>
<radialGradient id="r2" cx="88%" cy="26%" r="58%"><stop offset="0" stop-color="#8C6A1E" stop-opacity=".8"/><stop offset="1" stop-color="#8C6A1E" stop-opacity="0"/></radialGradient>
<radialGradient id="r3" cx="58%" cy="112%" r="66%"><stop offset="0" stop-color="#5B3FA8" stop-opacity=".85"/><stop offset="1" stop-color="#5B3FA8" stop-opacity="0"/></radialGradient>
</defs>
<rect width="1200" height="1200" fill="#0B0810"/>
<g transform="translate(0 285)">
  <rect width="1200" height="630" fill="#0B0810"/>
  <rect width="1200" height="630" fill="url(#r1)"/><rect width="1200" height="630" fill="url(#r2)"/><rect width="1200" height="630" fill="url(#r3)"/>
  <rect x="72" y="62" width="58" height="58" rx="17" fill="url(#g)"/>
  <g transform="translate(83 73) scale(1.5)">${giftPath}</g>
  <text x="146" y="102" font-family="Helvetica,Arial,sans-serif" font-size="29" font-weight="bold" fill="#F7F3F9">SovgaTG</text>
  <text x="72" y="248" font-family="Helvetica,Arial,sans-serif" font-size="64" font-weight="bold" fill="#F7F3F9">Telegram sovg&#8217;alari</text>
  <text x="72" y="330" font-family="Helvetica,Arial,sans-serif" font-size="64" font-weight="bold" fill="url(#g)">bir joyda</text>
  <text x="72" y="408" font-family="Helvetica,Arial,sans-serif" font-size="28" fill="#B5ADC2">Gift &#183; NFT sovg&#8217;a &#183; ijara &#183; rejalashtirilgan yetkazish</text>
  <g font-family="Helvetica,Arial,sans-serif" font-size="22" fill="#A79FB4">
    <rect x="72" y="452" width="204" height="50" rx="25" fill="none" stroke="#FFFFFF" stroke-opacity=".2"/><text x="100" y="483">So&#8217;mda to&#8217;lov</text>
    <rect x="292" y="452" width="196" height="50" rx="25" fill="none" stroke="#FFFFFF" stroke-opacity=".2"/><text x="320" y="483">Uzcard &#183; Humo</text>
    <rect x="504" y="452" width="196" height="50" rx="25" fill="none" stroke="#FFFFFF" stroke-opacity=".2"/><text x="532" y="483">24/7 avtomatik</text>
  </g>
  <text x="72" y="566" font-family="Helvetica,Arial,sans-serif" font-size="26" font-weight="bold" fill="#FFC163">sovgatg.uz</text>
</g>
</svg>`;

/** SVG → PNG (macOS qlmanage). Bo'lmasa — ogohlantiradi, build to'xtamaydi. */
async function svgToPng(svgPath, pngPath, size) {
  const tmp = path.join(dist, "_tmp");
  await mkdir(tmp, { recursive: true });
  try {
    await run("qlmanage", ["-t", "-s", String(size), "-o", tmp, svgPath]);
    const made = (await readdir(tmp)).find((f) => f.endsWith(".png"));
    if (!made) throw new Error("PNG yaratilmadi");
    await copyFile(path.join(tmp, made), pngPath);
    await rm(path.join(tmp, made), { force: true });
    return true;
  } catch (e) {
    console.warn(`  ! ${path.basename(pngPath)} yaratilmadi (${e.message}) — SVG qoladi`);
    return false;
  } finally {
    await rm(tmp, { recursive: true, force: true });
  }
}

/**
 * OG rasm: kvadrat PNG (qlmanage faqat kvadrat beradi) → markazdan 1200x630
 * kesish → JPEG. JPEG tanlangani hajm uchun: PNG ~1 MB, JPEG ~100 KB.
 */
async function buildOgImage(svgPath, jpgPath) {
  const tmpPng = path.join(dist, "assets", "_og_square.png");
  const ok = await svgToPng(svgPath, tmpPng, 1200);
  if (!ok) return false;
  try {
    await run("sips", ["-c", "630", "1200", tmpPng, "--out", tmpPng]);
    await run("sips", ["-s", "format", "jpeg", "-s", "formatOptions", "82", tmpPng, "--out", jpgPath]);
    return true;
  } catch (e) {
    console.warn("  ! og.jpg yaratilmadi:", e.message);
    return false;
  } finally {
    await rm(tmpPng, { force: true });
  }
}

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

  // 3. Assetlar
  await mkdir(path.join(dist, "assets"), { recursive: true });
  for (const f of ["style.css", "app.js"]) {
    await copyFile(path.join(root, "assets", f), path.join(dist, "assets", f));
  }
  await out("assets/favicon.svg", faviconSvg);
  await out("assets/logo.svg", logoSvg);
  const iconPath = await out("assets/icon.svg", iconSvg);
  const ogPath = await out("assets/og.svg", ogSvg);

  await buildOgImage(ogPath, path.join(dist, "assets", "og.jpg"));
  await svgToPng(iconPath, path.join(dist, "assets", "icon-180.png"), 180);
  await svgToPng(iconPath, path.join(dist, "assets", "icon-512.png"), 512);
  await svgToPng(iconPath, path.join(dist, "assets", "icon-192.png"), 192);
  // qlmanage/sips faqat macOS'da bor: Vercel (Linux) build'ida rasm yasalmaydi —
  // shunda oldindan yasalgan nusxa (assets/prebuilt/) qo'yiladi, aks holda og:image 404 beradi.
  for (const f of ["og.jpg", "icon-180.png", "icon-192.png", "icon-512.png"]) {
    const target = path.join(dist, "assets", f);
    const prebuilt = path.join(root, "assets", "prebuilt", f);
    if (!existsSync(target) && existsSync(prebuilt)) await copyFile(prebuilt, target);
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
          { src: "/assets/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" },
          { src: "/assets/icon.svg", sizes: "any", type: "image/svg+xml" },
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
