// src/blog/index.js — blog: maqolalarni o'qish, /blog/ va /blog/<slug>/ sahifalari, llms.txt.
//
// Har maqola — src/blog/posts/<slug>.json (bitta fayl). Maqolani avtoblogyoz
// yozadi va repo'ga shu faylni qo'shadi; ro'yxat, sitemap va llms.txt build
// vaqtida o'zi yangilanadi — boshqa faylni tahrirlash shart emas.
//
// Fayl tuzilishi:
//   { slug, date, reviewed, category, title, excerpt,
//     content (markdown), faq: [{ q, a }], keywords, related, sources: [{ title, url }] }

import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { site } from "../site.js";
import { esc, ic, head2, faqList, ctaBlock, url } from "../layout.js";
import { renderMarkdown, inline, plain, wordCount } from "./markdown.js";

/** Kategoriyalar — avtoblogyoz adapteridagi ro'yxat bilan bir xil. */
export const CATEGORIES = {
  yangiliklar: "Yangiliklar",
  sovgalar: "Sovg'alar",
  nft: "NFT sovg'alar",
  "premium-stars": "Premium va Stars",
  munosabatlar: "Munosabatlar",
  xavfsizlik: "Xavfsizlik",
  qollanma: "Qo'llanmalar",
};

const MONTHS = ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avgust", "sentyabr", "oktyabr", "noyabr", "dekabr"];

/** "2026-11-02" → "2-noyabr, 2026" */
export function fmtDate(iso) {
  const [y, m, d] = String(iso).split("-").map(Number);
  return y && m && d ? `${d}-${MONTHS[m - 1]}, ${y}` : String(iso);
}

const catLabel = (c) => CATEGORIES[c] || "Maqola";

/** Barcha maqolalar, yangisi birinchi. Buzuq fayl build'ni to'xtatadi — jim o'tib ketmaydi. */
export async function loadPosts(root) {
  const dir = path.join(root, "src", "blog", "posts");
  if (!existsSync(dir)) return [];
  const files = (await readdir(dir)).filter((f) => f.endsWith(".json") && !f.startsWith("_")).sort();
  const posts = [];
  for (const f of files) {
    const p = JSON.parse(await readFile(path.join(dir, f), "utf8"));
    for (const k of ["slug", "date", "title", "excerpt", "content"]) {
      if (!p[k]) throw new Error(`blog/${f}: "${k}" maydoni yo'q`);
    }
    if (`${p.slug}.json` !== f) throw new Error(`blog/${f}: slug fayl nomi bilan bir xil emas (${p.slug})`);
    posts.push({
      faq: [],
      keywords: [],
      related: [],
      sources: [],
      category: "qollanma",
      reviewed: p.date,
      ...p,
    });
  }
  return posts.sort((a, b) => (a.reviewed < b.reviewed ? 1 : a.reviewed > b.reviewed ? -1 : a.slug < b.slug ? -1 : 1));
}

const minutes = (p) => Math.max(1, Math.round(wordCount(p.content, ...p.faq.flatMap((f) => [f.q, f.a])) / 180));

/** Maqola kartochkasi — bosh blog sahifasi va «O'xshash maqolalar» uchun. */
const postCard = (p) => `
      <a class="card" href="/blog/${p.slug}/">
        <span class="card-meta">${esc(catLabel(p.category))} · ${fmtDate(p.reviewed)}</span>
        <h3 class="card-t">${esc(p.title)}</h3>
        <p class="card-d">${inline(p.excerpt)}</p>
        <span class="card-go">O'qish ${ic("arrow")}</span>
      </a>`;

const crumbs = (items) => `
  <nav class="crumbs" aria-label="Non ushoqlari">
    <a href="/">Bosh sahifa</a>
    ${items.map((c) => `<span aria-hidden="true">/</span>${c.href ? `<a href="${c.href}">${esc(c.text)}</a>` : `<span aria-current="page">${esc(c.text)}</span>`}`).join("")}
  </nav>`;

// ── /blog/ ─────────────────────────────────────────────────────────────
export function blogIndexPage(posts) {
  const latest = posts[0]?.reviewed;
  return {
    slug: "blog",
    // Maqola yo'q paytda sahifa indekslanmaydi va sitemapga kirmaydi
    noindex: posts.length === 0,
    title: "Blog: Telegram sovg'alari, NFT va Stars qo'llanmalari | SovgaTG",
    description:
      "Telegram sovg'alari, kolleksion NFT giftlar, Premium va Stars haqida qo'llanmalar va yangiliklar: qanday yuborish, sotib olish, ijaraga olish va firibgarlikdan saqlanish.",
    ogTitle: "SovgaTG blogi — Telegram sovg'alari haqida",
    ...(latest ? { updated: latest } : {}),
    breadcrumb: [
      { name: "Bosh sahifa", slug: "" },
      { name: "Blog", slug: "blog" },
    ],
    extraLd: [
      {
        "@type": "Blog",
        "@id": `${site.origin}/blog/#blog`,
        url: url("blog"),
        name: "SovgaTG blogi",
        inLanguage: "uz-UZ",
        publisher: { "@id": `${site.origin}/#org` },
        blogPost: posts.slice(0, 30).map((p) => ({
          "@type": "BlogPosting",
          headline: p.title,
          url: url(`blog/${p.slug}`),
          datePublished: p.date,
          dateModified: p.reviewed,
        })),
      },
    ],
    body: `
<section class="phead wrap">
  ${crumbs([{ text: "Blog" }])}
  <h1>SovgaTG <span class="gt">blogi</span></h1>
  <p class="lead">Telegram sovg'alari, kolleksion NFT giftlar, Premium va Stars haqida aniq qo'llanmalar va yangiliklar — faktlari rasmiy manbalardan tekshirilgan.</p>
  ${posts.length ? `<div class="tags">${[...new Set(posts.map((p) => p.category))].map((c) => `<span class="tag">${esc(catLabel(c))}</span>`).join("")}</div>` : ""}
</section>

<section class="sec wrap rv">
  ${
    posts.length
      ? `<div class="grid cards">${posts.map(postCard).join("")}</div>`
      : `<div class="panel blog-empty">
    <h2 class="card-t">Birinchi maqolalar tez orada</h2>
    <p class="card-d">Hozircha xizmat sahifalaridan boshlang:</p>
    <div class="btns">
      <a class="btn btn-ghost btn-sm" href="/telegram-sovga-yuborish/">Telegram sovg'a yuborish</a>
      <a class="btn btn-ghost btn-sm" href="/nft-gift-sotib-olish/">NFT gift sotib olish</a>
      <a class="btn btn-ghost btn-sm" href="/nft-sovga-ijara/">NFT sovg'a ijarasi</a>
    </div>
  </div>`
  }
</section>

${ctaBlock({
  title: "Sovg'a tanlab bo'ldingizmi?",
  text: "Buyurtma Telegram botida: so'mda to'lov, Uzcard, Humo, Click, Payme. To'lov tasdiqlangach sovg'a odatda 10 soniyada yetadi.",
})}`,
  };
}

// ── /blog/<slug>/ ──────────────────────────────────────────────────────
export function postPage(p, all) {
  const { html, toc } = renderMarkdown(p.content);
  const canonical = url(`blog/${p.slug}`);
  const related = p.related
    .map((s) => all.find((x) => x.slug === s))
    .filter(Boolean)
    .concat(all.filter((x) => x.slug !== p.slug && x.category === p.category && !p.related.includes(x.slug)))
    .filter((x, i, arr) => x.slug !== p.slug && arr.findIndex((y) => y.slug === x.slug) === i)
    .slice(0, 3);
  const faq = p.faq.map((f) => ({ q: esc(plain(f.q)), a: inline(f.a) }));
  const title = p.title.length <= 52 ? `${p.title} | SovgaTG` : p.title;

  return {
    slug: `blog/${p.slug}`,
    title,
    description: plain(p.excerpt),
    ogTitle: p.title,
    ogType: "article",
    updated: p.reviewed,
    breadcrumb: [
      { name: "Bosh sahifa", slug: "" },
      { name: "Blog", slug: "blog" },
      { name: p.title, slug: `blog/${p.slug}` },
    ],
    faq,
    extraLd: [
      {
        "@type": "BlogPosting",
        "@id": `${canonical}#article`,
        mainEntityOfPage: { "@id": `${canonical}#page` },
        headline: p.title.slice(0, 110),
        description: plain(p.excerpt),
        datePublished: p.date,
        dateModified: p.reviewed,
        inLanguage: "uz-UZ",
        articleSection: catLabel(p.category),
        keywords: p.keywords.join(", "),
        wordCount: wordCount(p.content),
        image: `${site.origin}/assets/og.jpg`,
        author: { "@id": `${site.origin}/#org` },
        publisher: { "@id": `${site.origin}/#org` },
        isPartOf: { "@id": `${site.origin}/blog/#blog` },
        ...(p.sources.length ? { citation: p.sources.map((s) => ({ "@type": "CreativeWork", name: s.title, url: s.url })) } : {}),
      },
    ],
    body: `
<article class="post">
  <header class="phead wrap post-head">
    ${crumbs([{ text: "Blog", href: "/blog/" }, { text: catLabel(p.category) }])}
    <p class="post-meta">
      <span class="tag">${esc(catLabel(p.category))}</span>
      <time datetime="${esc(p.reviewed)}">Yangilangan: ${fmtDate(p.reviewed)}</time>
      <span aria-hidden="true">·</span>
      <span>${minutes(p)} daqiqa o'qish</span>
    </p>
    <h1>${esc(p.title)}</h1>
    <div class="answer">
      <span class="kicker">Qisqa javob</span>
      <p>${inline(p.excerpt)}</p>
    </div>
  </header>

  <div class="sec wrap post-body">
    <div class="post-grid${toc.length >= 3 ? " has-toc" : ""}">
      ${
        toc.length >= 3
          ? `<nav class="toc" aria-label="Mundarija">
        <b>Mundarija</b>
        <ol>${toc.map((t) => `<li><a href="#${t.id}">${esc(t.text)}</a></li>`).join("")}</ol>
      </nav>`
          : ""
      }
      <div class="prose">
${html}
      </div>
    </div>
  </div>

  ${
    faq.length
      ? `<section class="sec sec-alt" id="savollar">
    <div class="wrap">
      ${head2({ kicker: "Savol-javob", title: "Ko'p so'raladigan savollar" })}
      ${faqList(faq)}
    </div>
  </section>`
      : ""
  }

  ${
    p.sources.length
      ? `<section class="wrap post-src">
    <h2 class="post-src-t">Manbalar</h2>
    <ul>${p.sources.map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.title || s.url)}</a></li>`).join("")}</ul>
    <p class="post-src-note">Faktlar shu rasmiy sahifalardan tekshirilgan. Narx va shartlar o'zgarishi mumkin — yakuniy summa botda to'lovdan oldin ko'rsatiladi.</p>
  </section>`
      : ""
  }
</article>

${
  related.length
    ? `<section class="sec wrap rv">
  ${head2({ kicker: "Davomi", title: "O'xshash maqolalar" })}
  <div class="grid cards">${related.map(postCard).join("")}</div>
</section>`
    : ""
}

${ctaBlock({
  title: "Sovg'ani hoziroq yuboring",
  text: "Telegram botida tanlang va so'mda to'lang: Uzcard, Humo, Click, Payme, Paynet. To'lov tasdiqlangach sovg'a odatda 10 soniyada yetadi.",
})}`,
  };
}

// ── llms.txt ───────────────────────────────────────────────────────────
/**
 * Javob mashinalari uchun sayt xaritasi (llmstxt.org). «Blog maqolalari»
 * bo'limi avtoblogyoz uchun katalog ham: takror mavzu tekshiruvi va ichki
 * havolalar shu qatorlardan olinadi — format `- [sarlavha](url): qisqa javob`.
 */
export function llmsTxt(pages, posts) {
  const L = [];
  L.push(`# ${site.brand}`, "");
  L.push(
    "> Telegram sovg'alari xizmati: oddiy gift, kolleksion NFT sovg'a, NFT sovg'a ijarasi, rejalashtirilgan (taymerli) sovg'a, " +
      "Telegram Premium va Stars sovg'a qilish — O'zbek so'mida. Barcha buyurtmalar Telegram bot orqali rasmiylashtiriladi.",
    ""
  );
  L.push("## Muhim faktlar", "");
  L.push(`- Buyurtma boti: ${site.botHandle} (${site.bot})`);
  L.push(`- Qo'llab-quvvatlash: ${site.supportHandle} (${site.support})`);
  L.push(`- Telegram kanal: ${site.channelHandle} (${site.channel})`);
  L.push(`- To'lov: ${site.pay.join(", ")} — so'mda, xalqaro karta kerak emas.`);
  L.push("- Sovg'a qabul qiluvchining @username'i bo'yicha yuboriladi; parol yoki SMS kod so'ralmaydi.");
  L.push("- Sayt tanishtiruv maqsadida; Telegram bilan rasmiy aloqada emas.", "");
  L.push("## Sahifalar", "");
  for (const p of pages) L.push(`- [${plain(p.ogTitle || p.title)}](${url(p.slug)}): ${p.description}`);
  L.push("");
  L.push("## Blog maqolalari", "");
  if (!posts.length) L.push("- (hozircha maqola yo'q)");
  for (const p of posts) L.push(`- [${plain(p.title)}](${url(`blog/${p.slug}`)}): ${plain(p.excerpt).replace(/\s+/g, " ").slice(0, 200)}`);
  L.push("");
  return L.join("\n");
}
