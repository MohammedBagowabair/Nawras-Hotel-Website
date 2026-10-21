// Prerender the Arabic home page and the 404 page into static HTML for GitHub Pages,
// with the critical CSS and hero fonts inlined and the app bundle started after first paint.
import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist");
const base = process.env.BASE_PATH ?? "/";
const site = process.env.SITE_URL ?? `https://mohammedbagowabair.github.io${base}`;
const { render } = await import(pathToFileURL(path.join(root, "dist-ssr/entry-server.js")).href);
const content = readFileSync(path.join(root, "src/lib/content.ts"), "utf8");
const pick = (block, key) => {
  const b = content.slice(content.indexOf(`export const ${block}`));
  const m = b.match(new RegExp(`${key}: \\{\\s*en: "([^"]+)",\\s*ar: "([^"]+)"`));
  return { en: m[1], ar: m[2] };
};
const title = pick("meta", "title");
const desc = pick("meta", "description");
const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const template = readFileSync(path.join(dist, "index.html"), "utf8");
const cssHref = template.match(/<link rel="stylesheet"[^>]*href="([^"]+)"/)[1];
const jsSrc = template.match(/<script type="module"[^>]*src="([^"]+)"/)[1];
const css = readFileSync(path.join(dist, cssHref.slice(base.length)), "utf8");

const heroFaces =
  `@font-face{font-family:"KufiHero";font-style:normal;font-weight:400 700;font-display:block;src:url(${base}fonts/hero-ar.woff2) format("woff2");unicode-range:U+0600-06FF,U+0750-077F,U+FB50-FDFF,U+FE70-FEFF,U+060C}` +
  `@font-face{font-family:"KufiHero";font-style:normal;font-weight:400 700;font-display:block;src:url(${base}fonts/hero-en.woff2) format("woff2");unicode-range:U+0000-00FF,U+2018-2019}`;

// Boot (runs before first layout): language from ?lang / saved choice, hero-font preload,
// cheap system face for non-hero text until the site fonts are loaded, and helpers that
// start the app bundle and site fonts only after first paint + load.
const boot = `(function(){var d=document.documentElement,en=false;try{var q=new URLSearchParams(location.search).get("lang");en=(q==="en"||q==="ar"?q:localStorage.getItem("nawras-lang"))==="en"}catch(e){}if(en){d.lang="en";d.dir="ltr";document.addEventListener("DOMContentLoaded",function(){var c=document.querySelector("link[rel=canonical]");if(c)c.href=c.href.split("?")[0]+"?lang=en"})}d.classList.add("fp");var l=document.createElement("link");l.rel="preload";l.as="font";l.type="font/woff2";l.crossOrigin="anonymous";l.href=${JSON.stringify(base + "fonts/")}+(en?"hero-en.woff2":"hero-ar.woff2");document.head.appendChild(l);window.afterPaint=function(cb){var n=2;function k(){if(--n===0)requestAnimationFrame(function(){setTimeout(cb,0)})}if(document.readyState==="complete")k();else addEventListener("load",k);try{if(performance.getEntriesByName("first-contentful-paint").length)k();else new PerformanceObserver(function(x,o){o.disconnect();k()}).observe({type:"paint",buffered:true})}catch(e){k()}};window.fontsReady=function(s){if(!s.r){s.r=1;afterPaint(function(){fontsReady(s)});return}s.media="all";var f=document.fonts,q=[];if(!f||!f.load){d.classList.remove("fp");return}["400","500","700"].forEach(function(w){q.push(f.load(w+" 1em Tajawal","a\\u0639"))});q.push(f.load("500 1em 'Reem Kufi'","a\\u0639"));Promise.all(q).then(function(){},function(){}).then(function(){d.classList.remove("fp")})}})()`;
const loader = `<script>afterPaint(function(){var s=document.createElement("script");s.type="module";s.src=${JSON.stringify(jsSrc)};document.head.appendChild(s)})</script>`;

function page({ body, page404 }) {
  const url = site;
  const og = `${site}og-image.jpg`;
  const head = [
    `<title>${esc(page404 ? "404 · " + title.ar : title.ar)}</title>`,
    `<meta name="description" content="${esc(desc.ar)}">`,
    page404 ? `<meta name="robots" content="noindex">` : `<link rel="canonical" href="${url}"><link rel="alternate" hreflang="ar" href="${url}"><link rel="alternate" hreflang="en" href="${url}?lang=en">`,
    `<meta name="theme-color" content="#f5f9f8">`,
    `<meta property="og:type" content="website"><meta property="og:site_name" content="${esc(title.ar)}">`,
    `<meta property="og:title" content="${esc(title.ar)}"><meta property="og:description" content="${esc(desc.ar)}">`,
    `<meta property="og:url" content="${url}"><meta property="og:image" content="${og}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt" content="نَورَس المكلا — هنا يبدأ اليوم من البحر"><meta property="og:locale" content="ar_YE"><meta property="og:locale:alternate" content="en_US">`,
    `<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title.en)}"><meta name="twitter:description" content="${esc(desc.en)}"><meta name="twitter:image" content="${og}">`,
    `<link rel="icon" href="${base}favicon.ico" sizes="48x48"><link rel="icon" href="${base}favicon.svg" type="image/svg+xml"><link rel="apple-touch-icon" href="${base}apple-touch-icon.png"><link rel="manifest" href="${base}site.webmanifest">`,
    page404 ? "" : `<link rel="preload" as="image" type="image/avif" media="(max-width: 1023px)" imagesrcset="${base}img/hero-p-480.avif 480w, ${base}img/hero-p-720.avif 720w, ${base}img/hero-p-1080.avif 1080w" imagesizes="100vw" fetchpriority="high"><link rel="preload" as="image" type="image/avif" media="(min-width: 1024px)" imagesrcset="${base}img/hero-w-1280.avif 1280w, ${base}img/hero-w-1920.avif 1920w" imagesizes="100vw" fetchpriority="high">`,
    `<script>${boot}</script>`,
    `<style>${heroFaces}html.fp body *:not([data-hf]):not([data-hf] *){font-family:system-ui,sans-serif!important}</style>`,
    `<style>${css}</style>`,
    `<link rel="stylesheet" href="${base}fonts/fonts.css" media="print" onload="fontsReady(this)">`,
    `<noscript><link rel="stylesheet" href="${base}fonts/fonts.css"><style>.reveal{opacity:1;transform:none}</style></noscript>`,
  ].join("\n");
  return template
    .replace(/<link rel="stylesheet"[^>]*>/, "")
    .replace(/<script type="module"[^>]*><\/script>/, "")
    .replace("<!--head-->", head)
    .replace('<html lang="ar" dir="rtl">', `<html lang="ar" dir="rtl"${page404 ? ' data-page="404"' : ""}>`)
    .replace("<!--app-->", body)
    .replace("</body>", `${loader}</body>`);
}

writeFileSync(path.join(dist, "index.html"), page({ body: render("home") }));
writeFileSync(path.join(dist, "404.html"), page({ body: render("404"), page404: true }));
rmSync(path.join(root, "dist-ssr"), { recursive: true, force: true });
console.log("prerendered index.html and 404.html");
