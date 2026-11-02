// brand/og.mjs — OG rasmini (assets/og.jpg, 1200×630) brand/og.html shablonidan yasaydi.
//   node brand/og.mjs
// Kerak: Node 22+ (ichki WebSocket) va Google Chrome. Chrome boshqa joyda bo'lsa:
//   CHROME=/path/to/chrome node brand/og.mjs
// Natijani commit qiling — build.js uni faqat nusxalaydi.

import { spawn } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(here, "..", "assets", "og.jpg");
const bin = process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const port = 9300 + Math.floor(Math.random() * 500);
const profile = mkdtempSync(path.join(tmpdir(), "sovgatg-og-"));
const chrome = spawn(bin, [
  "--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`,
  "--no-first-run", "--no-default-browser-check", "--hide-scrollbars", "about:blank",
], { stdio: "ignore" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

try {
  let target;
  for (let i = 0; i < 75 && !target; i++) {
    await sleep(200);
    try {
      const list = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
      target = list.find((t) => t.type === "page");
    } catch {}
  }
  if (!target) throw new Error(`Chrome ishga tushmadi (${bin})`);

  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
  let id = 0;
  const waiting = new Map();
  ws.onmessage = ({ data }) => {
    const m = JSON.parse(data);
    if (m.id && waiting.has(m.id)) { waiting.get(m.id)(m); waiting.delete(m.id); }
  };
  const send = (method, params = {}) =>
    new Promise((r) => { const i = ++id; waiting.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });

  await send("Emulation.setDeviceMetricsOverride", { width: 1200, height: 630, deviceScaleFactor: 1, mobile: false });
  await send("Page.enable");
  await send("Page.navigate", { url: pathToFileURL(path.join(here, "og.html")).href });
  await sleep(1200);
  // Shriftlar va logo to'liq yuklanmaguncha rasmga olinmaydi
  await send("Runtime.evaluate", {
    expression: "document.fonts.ready.then(() => Promise.all([...document.images].map((i) => i.decode())))",
    awaitPromise: true,
  });
  await sleep(300);
  const shot = await send("Page.captureScreenshot", { format: "jpeg", quality: 86 });
  writeFileSync(out, Buffer.from(shot.result.data, "base64"));
  console.log(`  ✓ assets/og.jpg  (${(Buffer.byteLength(shot.result.data, "base64") / 1024).toFixed(0)} KB)`);
  ws.close();
} finally {
  chrome.kill();
  await sleep(300);
  rmSync(profile, { recursive: true, force: true });
}
