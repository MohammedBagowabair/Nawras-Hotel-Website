const BASE = import.meta.env.BASE_URL;
export const img = (name: string, w: number) => `${BASE}img/${name}-${w}.webp`;
export function pic(name: string, sizes: string) {
  return { src: img(name, 800), srcSet: [480, 800, 1200].map((w) => `${img(name, w)} ${w}w`).join(", "), sizes };
}
export const heroP = (ext: "avif" | "webp") => [480, 720, 1080].map((w) => `${BASE}img/hero-p-${w}.${ext} ${w}w`).join(", ");
export const heroW = (ext: "avif" | "webp") => [1280, 1920].map((w) => `${BASE}img/hero-w-${w}.${ext} ${w}w`).join(", ");
