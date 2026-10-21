import { useEffect, useState } from "react";
import { brand, ui } from "@/lib/content";
import { useLang } from "@/lib/lang";
import { T } from "./T";
import { Icon } from "./Icon";

/** Gull over a low sun — the Nawras mark. */
export function Mark({ className = "size-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <circle cx="20" cy="20" r="19" fill="#fdfbf7" stroke="#0c3b57" strokeOpacity=".15" />
      <circle cx="20" cy="25" r="7.5" fill="#f07a63" />
      <path d="M6 27h28" stroke="#2bb3a8" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M10 31h20" stroke="#2bb3a8" strokeWidth="2.2" strokeLinecap="round" strokeOpacity=".6" />
      <path d="M8.5 16.5c3.5-3.4 7.5-3.6 11.5.4 4-4 8-3.8 11.5-.4" fill="none" stroke="#0c3b57" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo() {
  return (
    <a href="#top" className="flex min-h-11 items-center gap-2.5" aria-label={`${brand.name.en} · ${brand.name.ar}`}>
      <Mark />
      <span className="leading-none">
        <span data-hf className="font-display block text-xl text-ocean"><T v={brand.name} /></span>
        <span className="mt-0.5 block text-[0.7rem] font-medium tracking-wide text-mist"><T v={brand.place} /></span>
      </span>
    </a>
  );
}

const nav = [
  { href: "#rooms", l: ui.tabs.rooms },
  { href: "#day", l: ui.tabs.day },
  { href: "#moods", l: { en: "Moods", ar: "لحظات" } },
  { href: "#find", l: { en: "Find us", ar: "الموقع" } },
];

export function LangButton({ className = "" }: { className?: string }) {
  const { lang, toggle } = useLang();
  return (
    <button type="button" onClick={toggle} aria-label={ui.langLabel[lang]} className={`press inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-full px-3.5 text-sm font-medium ${className}`} data-lang-toggle>
      <Icon name="globe" className="size-4" />
      <span lang={lang === "ar" ? "en" : "ar"}>{ui.langSwitch[lang]}</span>
    </button>
  );
}

export function Header({ onBook }: { onBook: () => void }) {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const on = () => setSolid(scrollY > 40);
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-[background-color,box-shadow] duration-300 ${solid ? "bg-shell/85 shadow-[0_1px_0_rgba(12,59,87,0.08)] backdrop-blur-xl" : "bg-transparent"}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 lg:px-10">
        <Logo />
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="inline-flex min-h-11 items-center rounded-full px-4 text-[0.95rem] text-ocean/80 transition-colors hover:bg-ocean/5 hover:text-ocean">
              <T v={n.l} />
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LangButton className={solid ? "bg-ocean/5 text-ocean" : "bg-shell/80 text-ocean shadow-sm backdrop-blur"} />
          <button type="button" onClick={onBook} className="press hidden min-h-11 items-center gap-2 rounded-full bg-ocean px-5 text-sm font-medium text-white hover:bg-abyss lg:inline-flex">
            <Icon name="wa" className="size-4" />
            <T v={ui.book} />
          </button>
        </div>
      </div>
    </header>
  );
}
