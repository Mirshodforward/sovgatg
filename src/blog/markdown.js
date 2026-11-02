// src/blog/markdown.js — maqola matni (soddalashtirilgan markdown) → HTML.
//
// Sintaksis avtoblogyoz bilan bir xil (maqolani o'sha tizim yozadi):
//   ## H2 · ### H3 · paragraf · - ro'yxat · 1. raqamli ro'yxat
//   | jadval | · > eslatma · **qalin** · [havola](url) · `kod`
// Boshqa narsa (HTML, rasm, kod bloki) matnga kirmaydi — hammasi escape qilinadi.

import { site } from "../site.js";

const escapeHtml = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Qator ichidagi belgilash. Havola faqat http(s), "/" yoki "#" bilan boshlansa. */
export function inline(raw) {
  let s = escapeHtml(raw);
  s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
  s = s.replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, text, href) => {
    if (!/^(https?:\/\/|\/(?!\/)|#)/i.test(href)) return text;
    const safe = href.replace(/"/g, "&quot;");
    const external = /^https?:\/\//i.test(href) && !href.startsWith(site.origin);
    return `<a href="${safe}"${external ? ' target="_blank" rel="noopener"' : ""}>${text}</a>`;
  });
  return s;
}

/** Belgilashsiz sof matn — sarlavha, mundarija va JSON-LD uchun. */
export function plain(raw) {
  return String(raw)
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .trim();
}

/** Sarlavhadan langar: lotin, kichik harf, defis bilan; takrorlansa -2, -3. */
function anchor(text, used) {
  const base =
    plain(text)
      .toLowerCase()
      .replace(/[‘’ʻʼ'`]/g, "")
      .normalize("NFKD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .split("-")
      .slice(0, 6)
      .join("-") || `bolim-${used.size + 1}`;
  let id = base;
  for (let n = 2; used.has(id); n++) id = `${base}-${n}`;
  used.add(id);
  return id;
}

const isTableLine = (l) => /^\s*\|.*\|\s*$/.test(l);
const isTableDivider = (l) => /^\s*\|[\s:|-]+\|\s*$/.test(l);
const cells = (line) =>
  line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((c) => c.trim());

/**
 * Markdown → { html, toc }. `toc` — H2 sarlavhalar (mundarija uchun),
 * har biriga `id` beriladi, ya'ni mundarija havolasi hech qachon uzilmaydi.
 */
export function renderMarkdown(md) {
  const lines = String(md).replace(/\r\n/g, "\n").split("\n");
  const out = [];
  const toc = [];
  const used = new Set();
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
      continue;
    }
    const h3 = line.match(/^###\s+(.*)$/);
    if (h3) {
      out.push(`<h3>${inline(h3[1].trim())}</h3>`);
      i++;
      continue;
    }
    const h2 = line.match(/^##\s+(.*)$/);
    if (h2) {
      const text = h2[1].trim();
      const id = anchor(text, used);
      toc.push({ id, text: plain(text) });
      out.push(`<h2 id="${id}">${inline(text)}</h2>`);
      i++;
      continue;
    }
    if (isTableLine(line) && i + 1 < lines.length && isTableDivider(lines[i + 1])) {
      const head = cells(line);
      i += 2;
      const rows = [];
      while (i < lines.length && isTableLine(lines[i])) rows.push(cells(lines[i++]));
      out.push(
        `<div class="tw"><table class="tbl"><thead><tr>${head.map((c) => `<th>${inline(c)}</th>`).join("")}</tr></thead>` +
          `<tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`
      );
      continue;
    }
    if (/^>\s?/.test(line)) {
      const buf = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) buf.push(lines[i++].replace(/^>\s?/, ""));
      out.push(`<p class="note">${inline(buf.join(" "))}</p>`);
      continue;
    }
    if (/^\d+\.\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) items.push(`<li>${inline(lines[i++].replace(/^\d+\.\s+/, ""))}</li>`);
      out.push(`<ol>${items.join("")}</ol>`);
      continue;
    }
    if (/^[-*]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) items.push(`<li>${inline(lines[i++].replace(/^[-*]\s+/, ""))}</li>`);
      out.push(`<ul>${items.join("")}</ul>`);
      continue;
    }
    const para = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^#{2,3}\s/.test(lines[i]) &&
      !/^>\s?/.test(lines[i]) &&
      !/^[-*]\s+/.test(lines[i]) &&
      !/^\d+\.\s+/.test(lines[i]) &&
      !isTableLine(lines[i])
    ) {
      para.push(lines[i++].trim());
    }
    if (para.length) out.push(`<p>${inline(para.join(" "))}</p>`);
    else out.push(`<p>${inline(lines[i++])}</p>`);
  }
  return { html: out.join("\n"), toc };
}

/** So'z soni — o'qish vaqti va JSON-LD `wordCount` uchun. */
export function wordCount(...texts) {
  return texts
    .map((t) => plain(t).replace(/[#>|*-]/g, " "))
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
}
