import { useEffect, useState } from "react";
import { contact, ui } from "@/lib/content";
import { credits } from "@/lib/credits";
import { useLang } from "@/lib/lang";
import { MAP_URL, PHONE_TEL, waGeneral, waLink } from "@/lib/wa";
import { Sheet } from "./Sheet";
import { T } from "./T";
import { Icon } from "./Icon";

const tabs = [
  { id: "top", icon: "home", l: ui.tabs.home },
  { id: "rooms", icon: "bed", l: ui.tabs.rooms },
  { id: "book" },
  { id: "day", icon: "clock", l: ui.tabs.day },
  { id: "contact", icon: "chat", l: ui.tabs.contact },
] as const;

/** One-handed bottom tab bar (phones/tablets) with a raised WhatsApp booking button in the middle. */
export function TabBar({ onBook, onContact }: { onBook: () => void; onContact: () => void }) {
  const { lang } = useLang();
  const [active, setActive] = useState("top");
  useEffect(() => {
    const ids = ["top", "rooms", "day"];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const on = () => {
      let cur = "top";
      for (const el of els) if (el.getBoundingClientRect().top < innerHeight * 0.45) cur = el.id;
      const day = document.getElementById("day");
      if (day && day.getBoundingClientRect().bottom < innerHeight * 0.45) cur = "";
      setActive(cur);
    };
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  return (
    <nav aria-label={lang === "ar" ? "التنقّل السريع" : "Quick navigation"} className="tabbar fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.6rem,env(safe-area-inset-bottom))] lg:hidden">
      <ul className="mx-auto grid max-w-md grid-cols-5 items-end rounded-[1.6rem] bg-shell/90 px-1 shadow-[0_10px_40px_-12px_rgba(6,36,51,0.35)] ring-1 ring-ocean/8 backdrop-blur-xl">
        {tabs.map((t) =>
          t.id === "book" ? (
            <li key="book" className="flex justify-center">
              <button type="button" onClick={onBook} className="press -mt-5 mb-1.5 flex flex-col items-center gap-0.5" data-tab="book">
                <span className="grid size-14 place-items-center rounded-full bg-wa text-white shadow-lg shadow-wa/30 ring-4 ring-shell"><Icon name="wa" className="size-6" /></span>
                <span className="text-[0.7rem] font-bold text-wa"><T v={ui.bookShort} /></span>
              </button>
            </li>
          ) : (
            <li key={t.id}>
              {t.id === "contact" ? (
                <button type="button" onClick={onContact} className="press flex min-h-[3.75rem] w-full flex-col items-center justify-center gap-0.5 text-mist" data-tab="contact">
                  <Icon name={t.icon} className="size-5" />
                  <span className="text-[0.7rem] font-medium"><T v={t.l} /></span>
                </button>
              ) : (
                <a href={`#${t.id}`} aria-current={active === t.id ? "true" : undefined} className={`press flex min-h-[3.75rem] flex-col items-center justify-center gap-0.5 ${active === t.id ? "text-ocean" : "text-mist"}`} data-tab={t.id}>
                  <span className={`grid h-7 w-12 place-items-center rounded-full transition-colors ${active === t.id ? "bg-lagoon text-sea-deep" : ""}`}><Icon name={t.icon} className="size-5" /></span>
                  <span className={`text-[0.7rem] ${active === t.id ? "font-bold" : "font-medium"}`}><T v={t.l} /></span>
                </a>
              )}
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}

export function ContactSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lang } = useLang();
  const rows = [
    { href: waLink(waGeneral[lang]), icon: "wa", t: contact.wa, s: contact.waSub, tone: "bg-wa text-white", ext: true, id: "wa" },
    { href: `tel:${PHONE_TEL}`, icon: "phone", t: contact.call, s: contact.callSub, tone: "bg-lagoon text-sea-deep", ext: false, id: "call" },
    { href: MAP_URL, icon: "pin", t: contact.map, s: contact.mapSub, tone: "bg-blush text-coral-deep", ext: true, id: "map" },
  ];
  return (
    <Sheet open={open} onClose={onClose} label={contact.title[lang]} testId="contact">
      <div className="px-5 pt-3">
        <h2 className="font-display pe-12 text-2xl text-ocean"><T v={contact.title} /></h2>
        <ul className="mt-4 grid gap-2.5">
          {rows.map((r) => (
            <li key={r.id}>
              <a href={r.href} {...(r.ext ? { target: "_blank", rel: "noopener" } : {})} className="press flex min-h-16 items-center gap-4 rounded-2xl bg-white p-3 ring-1 ring-ocean/6" data-contact={r.id}>
                <span className={`grid size-12 place-items-center rounded-xl ${r.tone}`}><Icon name={r.icon} /></span>
                <span className="flex-1">
                  <span className="block font-bold text-ocean"><T v={r.t} /></span>
                  <span className="block text-sm text-mist"><T v={r.s} /></span>
                </span>
                <Icon name="chevron" className="size-4 text-mist rtl:rotate-180" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Sheet>
  );
}

export function CreditsSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lang } = useLang();
  return (
    <Sheet open={open} onClose={onClose} label={ui.credits[lang]} testId="credits">
      <div className="px-5 pt-3">
        <h2 className="font-display pe-12 text-2xl text-ocean"><T v={ui.credits} /></h2>
        <p className="mt-2 text-sm text-mist">
          <T v={{ en: "All photos come from Wikimedia Commons (many originally from Unsplash). They illustrate the mood and are not photos of a real Nawras hotel.", ar: "جميع الصور من ويكيميديا كومنز (وكثير منها من Unsplash في الأصل). هي للإيحاء بالأجواء وليست صورًا لفندق حقيقي اسمه «نَورَس»." }} />
        </p>
        <ul className="mt-4 grid gap-1.5 text-sm" dir="ltr">
          {Object.values(credits).map((c) => (
            <li key={c.url} className="rounded-xl bg-white px-3 py-2 ring-1 ring-ocean/5">
              <a href={c.url} target="_blank" rel="noopener" className="font-medium text-sea-deep underline-offset-2 hover:underline">{c.file.replace(/^File:/, "")}</a>
              <span className="text-mist"> — {c.author || "Unknown"} · {c.license}</span>
            </li>
          ))}
        </ul>
      </div>
    </Sheet>
  );
}
