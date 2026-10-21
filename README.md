# Nawras Mukalla — Sea House & Suites (demo hotel website)

A mobile-first, bilingual (Arabic default, English via the toggle or `?lang=en`) website for **Nawras**, a *fictional*
seaside boutique hotel on the Khalf shore of Mukalla, Hadramout, Yemen. Rooms, guests and reviews are invented;
booking, call and map actions go to a demo WhatsApp number. There are no prices.

- Vite + React + TypeScript + Tailwind CSS v4, prerendered to static HTML (`scripts/prerender.mjs`)
- `BASE_PATH=/Nawras-Hotel-Website/ npm run build`, then deploy `dist/` to the `gh-pages` branch
- Images: `python3 scripts/optimize-images.py` (WebP/AVIF from `assets-src/`); heading font subsets: `python3 scripts/hero-fonts.py`

## Photo credits
All photos are from Wikimedia Commons; see `scripts/credits.json` (also shown in the site footer under "Photo credits").
Unsplash-sourced images are CC0; Mukalla photos by Mohammed Omar Al-Aidaroos and Abo Yemen are CC BY-SA 4.0;
"YEMEN MUKALLA" by Sallam is CC BY 2.0; the dhow photo is a U.S. Navy public-domain image.
The photos illustrate the mood and are not photos of a real hotel.

Fonts: Reem Kufi and Tajawal (SIL Open Font License), self-hosted.
