// src/ribbon.js — logodagi "S" lentasi uslubidagi 3D lenta va bantik (inline SVG).
// build.js ularni dist/assets/*.svg fayllariga yozadi — sahifalar <img> bilan ulaydi (keshlanadi).
//
// Lenta: markaziy to'lqin chiziq bo'ylab tasma. Kengligi cos() bilan o'zgaradi —
// manfiy bo'lganda tasmaning orqa (to'qroq) tomoni ko'rinadi, shu bilan buralish chiqadi.

const FRONT = ["#12E7FF", "#3F6BFF", "#8F3BFF", "#E32BEA"];
const BACK = ["#0A6E9A", "#2238A0", "#4E1D98", "#86188E"];

let uid = 0;
const f1 = (n) => n.toFixed(1);
const stops = (arr) => arr.map((c, i) => `<stop offset="${i / (arr.length - 1)}" stop-color="${c}"/>`).join("");

/**
 * To'lqinli buralgan lenta.
 * w/h — viewBox; amp — to'lqin balandligi; waves — to'lqinlar soni;
 * band — tasma eni; twists — buralishlar soni; phase — siljish (har lenta har xil bo'lsin).
 */
export function ribbon({ w = 1440, h = 220, amp = 50, waves = 1.1, band = 44, twists = 2.4, phase = 0 } = {}) {
  const id = `rb${++uid}`;
  const N = 160;
  const P = [];
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    P.push({ t, x: t * w, y: h / 2 + amp * Math.sin(2 * Math.PI * waves * t + phase) });
  }
  // Har nuqtada: "yuqori" tomonga qaragan normal (yorug'lik yuqoridan tushadi) va
  // ishorali yarim en (ishora — tasmaning qaysi tomoni ko'rinayotgani)
  const pts = P.map((p, i) => {
    const a = P[Math.max(0, i - 1)];
    const b = P[Math.min(N, i + 1)];
    const L = Math.hypot(b.x - a.x, b.y - a.y) || 1;
    let ux = -(b.y - a.y) / L, uy = (b.x - a.x) / L;
    if (uy > 0) { ux = -ux; uy = -uy; }
    return { x: p.x, y: p.y, ux, uy, half: (band / 2) * Math.cos(Math.PI * twists * p.t + phase * 0.6) };
  });

  // Ishora o'zgargan joyda (buralish nuqtasi) tasmani bo'laklarga ajratamiz
  const segs = [];
  let cur = [pts[0]];
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i];
    const q = cur[cur.length - 1];
    if (q.half !== 0 && Math.sign(p.half) !== Math.sign(q.half)) {
      const k = q.half / (q.half - p.half);
      const z = { x: q.x + (p.x - q.x) * k, y: q.y + (p.y - q.y) * k, ux: p.ux, uy: p.uy, half: 0 };
      cur.push(z);
      segs.push(cur);
      cur = [z, p];
    } else cur.push(p);
  }
  segs.push(cur);

  // a, b — yarim en ulushlari (+1 yuqori chet, -1 pastki chet)
  const edge = (s, a, b) => {
    const top = s.map((p) => `${f1(p.x + p.ux * Math.abs(p.half) * a)},${f1(p.y + p.uy * Math.abs(p.half) * a)}`);
    const bot = s.map((p) => `${f1(p.x + p.ux * Math.abs(p.half) * b)},${f1(p.y + p.uy * Math.abs(p.half) * b)}`).reverse();
    return `M${top.join("L")}L${bot.join("L")}Z`;
  };

  // Buralish nuqtalarida tasma qirrasi bilan turadi — u yerni qoraytiramiz
  const shade = [];
  for (let k = -1; k <= twists + 1; k++) {
    const t = ((k + 0.5) * Math.PI - phase * 0.6) / (Math.PI * twists);
    if (t > -0.1 && t < 1.1) shade.push(t);
  }
  const shadeStops = shade
    .flatMap((t) => [[t - 0.07, 0], [t, 0.5], [t + 0.07, 0]])
    .filter(([o]) => o >= 0 && o <= 1)
    .sort((x, y) => x[0] - y[0])
    .map(([o, a]) => `<stop offset="${o.toFixed(3)}" stop-color="#06041F" stop-opacity="${a}"/>`)
    .join("");

  const body = segs
    .map((s) => {
      const front = s.reduce((m, p) => m + p.half, 0) > 0;
      const whole = edge(s, 1, -1);
      return (
        `<path d="${whole}" fill="url(#${id}${front ? "f" : "b"})"/>` +
        `<path d="${edge(s, 0.96, 0.42)}" fill="#fff" opacity="${front ? 0.24 : 0.08}"/>` +
        `<path d="${edge(s, -0.3, -1)}" fill="#06041F" opacity="${front ? 0.2 : 0.28}"/>` +
        `<path d="${whole}" fill="url(#${id}s)"/>`
      );
    })
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="${id}f" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${w}" y2="0">${stops(FRONT)}</linearGradient><linearGradient id="${id}b" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${w}" y2="0">${stops(BACK)}</linearGradient><linearGradient id="${id}s" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${w}" y2="0">${shadeStops}</linearGradient></defs>${body}</svg>`;
}

/** Bantik — logodagi kabi: chap halqa moviy→ko'k, o'ng halqa binafsha→pushti; halqalar ichi ochiq. */
export function bow() {
  const id = `bw${++uid}`;
  const mirror = (d) => d.replace(/(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/g, (_, x, y) => `${200 - Number(x)},${y}`);
  // tashqi chiziq + teshik (evenodd) = lentadan yasalgan halqa
  const loop = "M94,57 C80,30 48,2 23,10 C1,17 0,53 19,68 C40,84 76,76 94,66 Z M84,57 C70,39 47,21 32,24 C19,27 18,47 29,55 C44,65 69,63 84,59 Z";
  // halqa ichida ko'rinadigan lentaning orqa tomoni
  const inside = "M29,55 C44,65 69,63 84,59 C68,56 47,55 35,48 C30,45 27,47 29,55 Z";
  const tail = "M95,68 C88,88 76,108 58,127 L69,126 L75,137 C90,117 99,95 101,74 Z";
  const shine = "M24,20 C42,12 66,26 82,44";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 140"><defs>
<linearGradient id="${id}l" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#12E7FF"/><stop offset=".6" stop-color="#2F86FF"/><stop offset="1" stop-color="#3F5BFF"/></linearGradient>
<linearGradient id="${id}r" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F03AF0"/><stop offset=".6" stop-color="#B437FA"/><stop offset="1" stop-color="#8F3BFF"/></linearGradient>
<linearGradient id="${id}k" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F05BFF"/><stop offset="1" stop-color="#A21FD8"/></linearGradient>
<linearGradient id="${id}t" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3F6BFF"/><stop offset="1" stop-color="#5E3BFF"/></linearGradient>
<linearGradient id="${id}u" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#B42BEA"/><stop offset="1" stop-color="#E32BEA"/></linearGradient>
</defs>
<path d="${tail}" fill="url(#${id}t)"/><path d="${mirror(tail)}" fill="url(#${id}u)"/>
<path d="${inside}" fill="#1B2A9E"/><path d="${mirror(inside)}" fill="#5A168F"/>
<path d="${loop}" fill="url(#${id}l)" fill-rule="evenodd"/><path d="${mirror(loop)}" fill="url(#${id}r)" fill-rule="evenodd"/>
<path d="${shine}" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".6"/>
<path d="${mirror(shine)}" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".45"/>
<rect x="86" y="43" width="28" height="31" rx="10" fill="url(#${id}k)"/>
<path d="M92,49 C96,46 104,46 108,49" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".6"/>
</svg>`;
}
