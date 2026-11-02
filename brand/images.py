#!/usr/bin/env python3
"""brand/images.py — logodan saytning barcha rastr rasmlarini yasaydi.

    python3 brand/images.py      (Pillow kerak: pip3 install pillow)

Manba: brand/logo.png — kvadrat logo, bir xil to'q fonda (>= 1024 px).
Natija (hammasi commit qilinadi — build.js ularni faqat nusxalaydi,
Vercel'da Python/Pillow yo'q):

    brand/logo-mark.png       fonsiz "S" — qolgan hamma narsaning manbasi
    assets/favicon.ico        brauzer tab'i (16/32/48), fonsiz
    assets/logo-512.png       fonsiz, kvadrat — rel=icon va JSON-LD logo
    assets/icon-180.png       iPhone ekrani (apple-touch-icon), fonli
    assets/icon-192.png       manifest, fonli
    assets/icon-512.png       manifest, fonli
    assets/icon-maskable.png  manifest (Android maskasi uchun chetdan joy bor)
    assets/logo-s.png         header/footer belgisi, fonsiz
    assets/logo-hero.webp     bosh sahifa hero rasmi, fonsiz

OG rasm alohida yasaladi: node brand/og.mjs
"""
from pathlib import Path

from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
BRAND = ROOT / "brand"
ASSETS = ROOT / "assets"
LANCZOS = Image.Resampling.LANCZOS


def cutout(im):
    """Bir xil fonni olib tashlaydi.

    alpha = piksel rangining fondan uzoqligi / atrofdagi eng to'yingan lenta
    rangining uzoqligi. Shunda lentaning qorong'i soyalari ham to'liq ko'rinadi,
    chetlar yumshoq qoladi; yarim shaffof chetlardan fon rangi ajratib olinadi
    (qora halo qolmasin).
    """
    W, H = im.size
    px = im.load()
    border = [px[x, y] for x in range(0, W, 7) for y in (0, 1, H - 2, H - 1)]
    border += [px[x, y] for y in range(0, H, 7) for x in (0, 1, W - 2, W - 1)]
    bg = tuple(sum(c[i] for c in border) / len(border) for i in range(3))

    dist = [0.0] * (W * H)
    dl = Image.new("L", (W, H))
    dpx = dl.load()
    for y in range(H):
        for x in range(W):
            r, g, b = px[x, y]
            d = ((r - bg[0]) ** 2 + (g - bg[1]) ** 2 + (b - bg[2]) ** 2) ** 0.5
            dist[y * W + x] = d
            dpx[x, y] = min(255, int(d * 0.6))
    dmax = dl.filter(ImageFilter.MaxFilter(9)).load()

    def smooth(e0, e1, v):
        t = max(0.0, min(1.0, (v - e0) / (e1 - e0)))
        return t * t * (3 - 2 * t)

    out = Image.new("RGBA", (W, H))
    opx = out.load()
    for y in range(H):
        for x in range(W):
            d = dist[y * W + x]
            m = dmax[x, y] / 0.6
            if d < 7 or m < 24:
                continue
            a = smooth(0.06, 0.82, d / m)
            if a <= 0.004:
                continue
            f = [int(max(0, min(255, bg[i] + (c - bg[i]) / a))) for i, c in enumerate(px[x, y])]
            opx[x, y] = (f[0], f[1], f[2], round(a * 255))

    x0, y0, x1, y1 = out.getbbox()
    pad = 16
    return out.crop((max(0, x0 - pad), max(0, y0 - pad), min(W, x1 + pad), min(H, y1 + pad))), bg


def on_square(mark, side, fill=(0, 0, 0, 0), scale=0.96):
    """Belgini kvadrat kanvas markaziga joylaydi; scale — balandlik ulushi."""
    canvas = Image.new("RGBA", (side, side), fill)
    h = round(side * scale)
    w = round(mark.width * h / mark.height)
    m = mark.resize((w, h), LANCZOS)
    canvas.alpha_composite(m, ((side - w) // 2, (side - h) // 2))
    return canvas


def by_height(mark, h):
    return mark.resize((round(mark.width * h / mark.height), h), LANCZOS)


def main():
    src = Image.open(BRAND / "logo.png").convert("RGB")
    mark, bg = cutout(src)
    mark.save(BRAND / "logo-mark.png", optimize=True)
    bg_rgba = tuple(round(c) for c in bg) + (255,)

    # Brauzer tab'i va qidiruv natijalari — fonsiz
    big = on_square(mark, 1024, scale=0.98)
    big.save(ASSETS / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    big.resize((512, 512), LANCZOS).save(ASSETS / "logo-512.png", optimize=True)

    # Telefon ekrani va manifest — fonli (iOS shaffoflikni qora qiladi)
    for s in (180, 192, 512):
        src.resize((s, s), LANCZOS).save(ASSETS / f"icon-{s}.png", optimize=True)
    on_square(mark, 512, fill=bg_rgba, scale=0.62).convert("RGB").save(
        ASSETS / "icon-maskable.png", optimize=True
    )

    # Sayt ichida: header belgisi (40 px x3) va hero (380 px x2)
    by_height(mark, 120).save(ASSETS / "logo-s.png", optimize=True)
    by_height(mark, 760).save(ASSETS / "logo-hero.webp", quality=88, method=6)

    for f in sorted(ASSETS.iterdir()):
        if f.suffix in (".png", ".ico", ".webp"):
            print(f"  ✓ assets/{f.name}  ({f.stat().st_size / 1024:.0f} KB)")


if __name__ == "__main__":
    main()
