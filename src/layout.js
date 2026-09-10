// src/layout.js — HTML skeleti, SEO meta'lari, JSON-LD va qayta ishlatiladigan bloklar.
// Bu yerda hech qanday sahifa matni yo'q: faqat shakl.

import { site, nav, footerCols } from "./site.js";

// ── Yordamchilar ───────────────────────────────────────────────────────
export const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** JSON-LD ni xavfsiz joylash: </script> matn ichida chiqib ketmasin */
const ld = (obj) =>
  `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, "\\u003c")}</script>`;

export const url = (slug) => (slug ? `${site.origin}/${slug}/` : `${site.origin}/`);

// ── Ikonkalar (inline SVG — tashqi so'rov yo'q, tez yuklanadi) ─────────
const P = (d, extra = "") => `<path d="${d}"${extra}/>`;
export const icons = {
  gift: P("M20 12v9H4v-9M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"),
  gem: P("M6 3h12l4 6-10 12L2 9zM2 9h20M12 21 8 9l4-6 4 6-4 12"),
  clock: `<circle cx="12" cy="12" r="9"/>${P("M12 7v5l3.5 2")}`,
  calendar: P("M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"),
  user: `${P("M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2")}<circle cx="12" cy="7" r="4"/>`,
  star: P("m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5-4.8-4.6 6.6-.9z"),
  crown: P("m3 7 4.5 4L12 4l4.5 7L21 7l-2 12H5z"),
  shield: P("M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"),
  card: P("M3 6h18v12H3zM3 10h18"),
  bolt: P("M13 2 4 14h7l-1 8 9-12h-7z"),
  check: P("m4 12 5 5L20 6"),
  arrow: P("M5 12h14M13 6l6 6-6 6"),
  send: P("M22 2 11 13M22 2l-7 20-4-9-9-4z"),
  lock: `<rect x="4" y="11" width="16" height="10" rx="2"/>${P("M8 11V7a4 4 0 0 1 8 0v4")}`,
  refresh: P("M21 12a9 9 0 1 1-3-6.7M21 4v5h-5"),
  wallet: P("M3 7h15a3 3 0 0 1 3 3v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM3 7V6a2 2 0 0 1 2-2h11M17 13h.01"),
  heart: P("M12 20s-7-4.4-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 4.6-7 9-7 9z"),
  globe: `<circle cx="12" cy="12" r="9"/>${P("M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18")}`,
  chat: P("M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-6.4A8 8 0 1 1 21 12z"),
};

export const ic = (name, cls = "") =>
  `<svg class="ic ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.gift}</svg>`;

// ── Qayta ishlatiladigan bloklar ───────────────────────────────────────

/** Bo'lim sarlavhasi: kichik yorliq + H2 + kirish matni */
export const head2 = ({ kicker, title, lead, tag = "h2" }) => `
  <header class="sec-head">
    ${kicker ? `<span class="kicker">${kicker}</span>` : ""}
    <${tag} class="sec-title">${title}</${tag}>
    ${lead ? `<p class="sec-lead">${lead}</p>` : ""}
  </header>`;

/** Xizmat kartochkalari to'ri */
export const cards = (items) => `
  <div class="grid cards">
    ${items
      .map(
        (c) => `
      <${c.href ? "a" : "div"} class="card"${c.href ? ` href="${c.href}"` : ""}>
        <span class="card-ic">${ic(c.icon)}</span>
        <h3 class="card-t">${c.title}</h3>
        <p class="card-d">${c.text}</p>
        ${c.meta ? `<span class="card-meta">${c.meta}</span>` : ""}
        ${c.href ? `<span class="card-go">Batafsil ${ic("arrow")}</span>` : ""}
      </${c.href ? "a" : "div"}>`
      )
      .join("")}
  </div>`;

/** Raqamlangan qadamlar */
export const steps = (items) => `
  <ol class="steps">
    ${items
      .map(
        (s, i) => `
      <li class="step">
        <span class="step-n">${String(i + 1).padStart(2, "0")}</span>
        <div><h3 class="step-t">${s.title}</h3><p class="step-d">${s.text}</p></div>
      </li>`
      )
      .join("")}
  </ol>`;

/** Savol-javob — JSON-LD FAQPage bilan juftlashadi */
export const faqList = (items) => `
  <div class="faq">
    ${items
      .map(
        (f) => `
      <details class="qa">
        <summary><span>${f.q}</span><i aria-hidden="true"></i></summary>
        <div class="qa-a">${f.a}</div>
      </details>`
      )
      .join("")}
  </div>`;

/** Ishonch raqamlari lentasi */
export const statBar = () => `
  <div class="stats">
    ${site.stats
      .map(
        (s) => `<div class="stat"><b>${s.value}</b><span>${s.label}</span><em>${s.hint}</em></div>`
      )
      .join("")}
  </div>`;

/** Chaqiruv bloki */
export const ctaBlock = ({ title, text, btn = "Botni ochish", note } = {}) => `
  <section class="cta">
    <div class="cta-in">
      <h2 class="cta-t">${title}</h2>
      <p class="cta-d">${text}</p>
      <div class="btns">
        <a class="btn btn-primary" href="${site.bot}" target="_blank" rel="noopener">${ic("send")} ${btn}</a>
        <a class="btn btn-ghost" href="${site.support}" target="_blank" rel="noopener">${ic("chat")} Savol berish</a>
      </div>
      ${note ? `<p class="cta-note">${note}</p>` : ""}
    </div>
  </section>`;

/** Belgilar ro'yxati (checklist) */
export const checks = (items) => `
  <ul class="checks">${items.map((t) => `<li>${ic("check")}<span>${t}</span></li>`).join("")}</ul>`;

/** Ma'lumot jadvali */
export const table = (headRow, rows) => `
  <div class="tw"><table class="tbl">
    <thead><tr>${headRow.map((h) => `<th>${h}</th>`).join("")}</tr></thead>
    <tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody>
  </table></div>`;

// ── Navigatsiya va footer ──────────────────────────────────────────────
const header = () => `
<a class="skip" href="#main">Asosiy qismga o'tish</a>
<header class="nav" id="nav">
  <div class="wrap nav-in">
    <a class="logo" href="/" aria-label="${site.brand} bosh sahifa">
      <span class="logo-mark">${ic("gift")}</span>
      <span class="logo-tx">Sovga<b>TG</b></span>
    </a>
    <nav class="nav-links" aria-label="Asosiy menyu">
      ${nav.map((n) => `<a href="${n.href}">${n.text}</a>`).join("")}
    </nav>
    <a class="btn btn-primary btn-sm nav-cta" href="${site.bot}" target="_blank" rel="noopener">${ic("send")} Botga o'tish</a>
    <button class="burger" id="burger" aria-label="Menyu" aria-expanded="false" aria-controls="mmenu"><span></span><span></span></button>
  </div>
  <div class="mmenu" id="mmenu" hidden>
    ${nav.map((n) => `<a href="${n.href}">${n.text}</a>`).join("")}
    <a class="btn btn-primary" href="${site.bot}" target="_blank" rel="noopener">${ic("send")} Botga o'tish</a>
  </div>
</header>`;

const footer = () => `
<footer class="foot">
  <div class="wrap">
    <div class="foot-top">
      <div class="foot-brand">
        <a class="logo" href="/"><span class="logo-mark">${ic("gift")}</span><span class="logo-tx">Sovga<b>TG</b></span></a>
        <p>Telegram sovg'alari, NFT giftlar, sovg'a ijarasi va rejalashtirilgan sovg'a — O'zbek so'mida, mahalliy kartalar bilan.</p>
        <div class="pays">${site.pay.map((p) => `<span class="pay">${p}</span>`).join("")}</div>
      </div>
      ${footerCols
        .map(
          (col) => `
        <nav class="foot-col" aria-label="${col.title}">
          <h3>${col.title}</h3>
          ${col.links
            .map(
              (l) =>
                `<a href="${l.href}"${l.ext ? ' target="_blank" rel="noopener"' : ""}>${l.text}</a>`
            )
            .join("")}
        </nav>`
        )
        .join("")}
    </div>
    <div class="foot-bot">
      <p>&copy; ${new Date().getFullYear()} ${site.brand} · ${site.domain}</p>
      <p class="foot-dis">Sayt tanishtiruv maqsadida. Barcha buyurtmalar <a href="${site.bot}" target="_blank" rel="noopener">${site.botHandle}</a> orqali rasmiylashtiriladi. Telegram — Telegram FZ-LLC mulki; sayt Telegram bilan rasmiy aloqada emas.</p>
    </div>
  </div>
</footer>`;

// ── To'liq sahifa ──────────────────────────────────────────────────────
export function layout(page) {
  const canonical = url(page.slug);
  const ogImg = `${site.origin}/assets/og.jpg`;
  const title = page.title;
  const desc = page.description;

  // Har sahifada: WebSite + Organization (bir marta, bosh sahifada to'liq)
  const graph = [];

  graph.push({
    "@type": "Organization",
    "@id": `${site.origin}/#org`,
    name: site.brand,
    alternateName: "Sovga TG",
    url: site.origin,
    logo: `${site.origin}/assets/logo.svg`,
    description:
      "Telegram sovg'alari, NFT giftlar, NFT sovg'a ijarasi va rejalashtirilgan sovg'a xizmati. O'zbekiston uchun so'mda to'lov.",
    areaServed: { "@type": "Country", name: "Uzbekistan" },
    sameAs: [site.bot, site.channel, site.support],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: site.support,
      availableLanguage: ["uz", "ru"],
    },
  });

  graph.push({
    "@type": "WebSite",
    "@id": `${site.origin}/#site`,
    url: site.origin,
    name: site.brandFull,
    inLanguage: "uz-UZ",
    publisher: { "@id": `${site.origin}/#org` },
  });

  graph.push({
    "@type": "WebPage",
    "@id": `${canonical}#page`,
    url: canonical,
    name: title,
    description: desc,
    isPartOf: { "@id": `${site.origin}/#site` },
    inLanguage: "uz-UZ",
    ...(page.updated ? { dateModified: page.updated } : {}),
  });

  if (page.breadcrumb?.length) {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: page.breadcrumb.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: b.name,
        item: b.slug === undefined ? undefined : url(b.slug),
      })),
    });
  }

  if (page.faq?.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${canonical}#faq`,
      mainEntity: page.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a.replace(/<[^>]+>/g, "") },
      })),
    });
  }

  if (page.service) {
    graph.push({
      "@type": "Service",
      name: page.service.name,
      serviceType: page.service.type,
      description: page.service.description,
      provider: { "@id": `${site.origin}/#org` },
      areaServed: { "@type": "Country", name: "Uzbekistan" },
      audience: { "@type": "Audience", geographicArea: { "@type": "Country", name: "Uzbekistan" } },
      ...(page.service.offers
        ? {
            offers: {
              "@type": "Offer",
              priceCurrency: "UZS",
              ...page.service.offers,
              availability: "https://schema.org/InStock",
              url: site.bot,
            },
          }
        : {}),
    });
  }

  if (page.howto) {
    graph.push({
      "@type": "HowTo",
      name: page.howto.name,
      description: page.howto.description,
      totalTime: page.howto.time || "PT3M",
      step: page.howto.steps.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.title,
        text: s.text.replace(/<[^>]+>/g, ""),
      })),
    });
  }

  if (page.extraLd) graph.push(...page.extraLd);

  return `<!DOCTYPE html>
<html lang="uz">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="${page.noindex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1"}">
<meta name="theme-color" content="${site.themeColor}">
<meta name="author" content="${site.brand}">
<meta name="geo.region" content="UZ">
<meta name="geo.placename" content="Uzbekistan">
<meta property="og:type" content="${page.ogType || "website"}">
<meta property="og:site_name" content="${site.brand}">
<meta property="og:locale" content="${site.locale}">
<meta property="og:url" content="${canonical}">
<meta property="og:title" content="${esc(page.ogTitle || title)}">
<meta property="og:description" content="${esc(page.ogDescription || desc)}">
<meta property="og:image" content="${ogImg}">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(site.brandFull)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(page.ogTitle || title)}">
<meta name="twitter:description" content="${esc(page.ogDescription || desc)}">
<meta name="twitter:image" content="${ogImg}">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/icon-180.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="sitemap" type="application/xml" href="/sitemap.xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Unbounded:wght@700&display=swap">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Unbounded:wght@700&display=swap" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Unbounded:wght@700&display=swap"></noscript>
<script>document.documentElement.classList.add("js")</script>
<link rel="stylesheet" href="/assets/style.css">
${ld({ "@context": "https://schema.org", "@graph": graph })}
</head>
<body>
<div class="bg" aria-hidden="true"><i class="glow g1"></i><i class="glow g2"></i><i class="glow g3"></i></div>
${header()}
<main id="main">
${page.body}
</main>
${footer()}
<script src="/assets/app.js" defer></script>
</body>
</html>`;
}

/** Ichki sahifa boshi: non ushoqlari + H1 + kirish + tugmalar + teglar */
export const phead = ({ crumbs = [], h1, lead, tags = [], btn = "Botni ochish" }) => `
<section class="phead wrap">
  <nav class="crumbs" aria-label="Non ushoqlari">
    <a href="/">Bosh sahifa</a>
    ${crumbs.map((c) => `<span aria-hidden="true">/</span>${c.href ? `<a href="${c.href}">${c.text}</a>` : `<span aria-current="page">${c.text}</span>`}`).join("")}
  </nav>
  <h1>${h1}</h1>
  <p class="lead">${lead}</p>
  <div class="btns">
    <a class="btn btn-primary" href="${site.bot}" target="_blank" rel="noopener">${ic("send")} ${btn}</a>
    <a class="btn btn-ghost" href="#savollar">${ic("chat")} Savollarga o'tish</a>
  </div>
  ${tags.length ? `<div class="tags">${tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>` : ""}
</section>`;
