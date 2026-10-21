import { useEffect, useState } from "react";
import { tide } from "@/lib/content";
import { hhmm, shoreToday, type Shore } from "@/lib/shore";
import { useLang } from "@/lib/lang";
import { T } from "./T";
import { Icon } from "./Icon";

/** "Today on the shore": sunrise/sunset for Mukalla plus rough tide, moon and sea estimates. Client-only values. */
export function ShoreStrip() {
  const { lang } = useLang();
  const [s, setS] = useState<Shore | null>(null);
  useEffect(() => setS(shoreToday()), []);
  const num = (v: number) => (lang === "ar" ? String(v).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[+d]!) : String(v));
  const items = [
    { icon: "sunrise", l: tide.sunrise, v: s ? hhmm(s.sunrise, lang) : "–:––", tone: "text-coral-deep bg-blush" },
    { icon: "sunset", l: tide.sunset, v: s ? hhmm(s.sunset, lang) : "–:––", tone: "text-coral-deep bg-blush" },
    { icon: "up", l: tide.high, v: s ? `≈ ${hhmm(s.high, lang)}` : "–:––", tone: "text-sea-deep bg-lagoon" },
    { icon: "down", l: tide.low, v: s ? `≈ ${hhmm(s.low, lang)}` : "–:––", tone: "text-sea-deep bg-lagoon" },
    { icon: "thermo", l: tide.water, v: s ? `≈ ${num(s.sea)}°` : "–°", tone: "text-ocean bg-ocean/7" },
    { icon: "moon", l: tide.moon, v: s ? tide.moons[s.moon]![lang] : "–", tone: "text-ocean bg-ocean/7" },
  ];
  return (
    <section aria-labelledby="shore-title" className="relative bg-shell py-7 lg:py-10">
      <div className="mx-auto max-w-7xl lg:px-10">
        <div className="flex items-end justify-between px-5 lg:px-0">
          <h2 id="shore-title" className="text-sm font-bold tracking-wide text-ocean"><T v={tide.title} /></h2>
        </div>
        <ul className="rail mt-3 gap-2.5 scroll-px-5 px-5 pb-1 lg:grid lg:grid-cols-6 lg:px-0" data-shore>
          {items.map((it) => (
            <li key={it.icon} className="flex min-w-[8.5rem] items-center gap-3 rounded-2xl border border-ocean/8 bg-white p-3 lg:min-w-0">
              <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${it.tone}`}><Icon name={it.icon} /></span>
              <span className="min-w-0">
                <span className="block text-xs text-mist"><T v={it.l} /></span>
                <span className="tnum block text-[1.05rem] font-bold whitespace-nowrap text-ocean" data-shore-value>{it.v}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 px-5 text-xs leading-relaxed text-mist lg:px-0"><T v={tide.note} /></p>
      </div>
    </section>
  );
}
