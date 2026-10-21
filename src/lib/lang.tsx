import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { meta, type Lang } from "./content";

export const STORAGE_KEY = "nawras-lang";
type Ctx = { lang: Lang; toggle: () => void };
const LangCtx = createContext<Ctx>({ lang: "ar", toggle: () => {} });

// Text is rendered in both languages (see T) and CSS shows the one matching
// <html lang>, so the prerendered Arabic page is instantly correct in English
// too. This state only drives attributes, messages and the toggle.
export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");
  useEffect(() => {
    const q = new URLSearchParams(location.search).get("lang");
    let initial: string | null = q;
    if (q !== "en" && q !== "ar") {
      try { initial = localStorage.getItem(STORAGE_KEY); } catch { initial = null; }
    }
    if (initial === "en" || initial === "ar") setLang(initial);
  }, []);
  // The boot script already set <html lang/dir>; skip the first pass so the
  // server default ("ar") never flips an English page to RTL for a frame.
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const d = document.documentElement;
    d.lang = lang;
    d.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = meta.title[lang];
    const can = document.querySelector('link[rel="canonical"]');
    if (can) { const c = new URL(can.getAttribute("href")!); if (lang === "en") c.searchParams.set("lang", "en"); else c.searchParams.delete("lang"); can.setAttribute("href", c.toString()); }
    document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description[lang]);
    try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* private mode */ }
    const url = new URL(location.href);
    if (url.searchParams.has("lang") && url.searchParams.get("lang") !== lang) {
      url.searchParams.set("lang", lang);
      history.replaceState(null, "", url.toString());
    }
  }, [lang]);
  const toggle = useCallback(() => setLang((l) => (l === "ar" ? "en" : "ar")), []);
  return <LangCtx.Provider value={{ lang, toggle }}>{children}</LangCtx.Provider>;
}

export const useLang = () => useContext(LangCtx);
