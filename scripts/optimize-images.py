"""Responsive WebP/AVIF images in public/img from assets-src (Pillow). Credits: scripts/credits.json."""
import glob, os
from PIL import Image
SRC, OUT = "assets-src", "public/img"
os.makedirs(OUT, exist_ok=True)
def fit(im, w):
    W, H = im.size
    return im.resize((w, round(H * w / W)), Image.LANCZOS)
for f in sorted(glob.glob(f"{SRC}/*.jpg")):
    name = os.path.basename(f)[:-4]
    im = Image.open(f).convert("RGB")
    for w in [480, 800, 1200]:
        fit(im, min(w, im.size[0])).save(f"{OUT}/{name}-{w}.webp", "WEBP", quality=68, method=6)
# Full-bleed story hero: portrait 9:16 crop for phones, 16:9 crop for desktop.
hero = Image.open(f"{SRC}/sea.jpg").convert("RGB"); W, H = hero.size
ph = hero.crop(((W - round(H * 9 / 16)) // 2, 0, (W + round(H * 9 / 16)) // 2, H)) if W / H > 9 / 16 else hero
ch = round(W * 9 / 16); wd = hero.crop((0, round(H * 0.1), W, round(H * 0.1) + ch))
for w in [480, 720, 1080]:
    fit(ph, w).save(f"{OUT}/hero-p-{w}.avif", "AVIF", quality=42, speed=4)
    fit(ph, w).save(f"{OUT}/hero-p-{w}.webp", "WEBP", quality=66, method=6)
for w in [1280, 1920]:
    fit(wd, min(w, W)).save(f"{OUT}/hero-w-{w}.avif", "AVIF", quality=42, speed=4)
    fit(wd, min(w, W)).save(f"{OUT}/hero-w-{w}.webp", "WEBP", quality=66, method=6)
