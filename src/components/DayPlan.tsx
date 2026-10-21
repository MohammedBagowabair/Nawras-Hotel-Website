import { useRef, useState } from "react";
import { day } from "@/lib/content";
import { pic } from "@/lib/img";
import { useLang } from "@/lib/lang";
import { waDay, waLink } from "@/lib/wa";
import { LazyImg } from "./LazyImg";
import { SectionHead } from "./Section";
import { T } from "./T";
import { Icon } from "./Icon";

/** A day-itinerary timeline with a sticky tab switcher; swipe sideways between the two plans. */
export function DayPlan() {
  const { lang } = useLang();
  const [tab, setTab] = useState(0);
  const rail = useRef<HTMLDivElement>(null);
  const pick = (k: number) => {
    setTab(k);
    const el = rail.current?.children[k] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest", inline: "start", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };
  return (
    <section id="day" aria-labelledby="day-title" className="bg-shell py-16 lg:py-28">
      <div className="mx-auto max-w-7xl lg:px-10">
        <SectionHead eyebrow={day.eyebrow} title={day.title} id="day-title" />
        <div className="sticky top-[calc(4rem+env(safe-area-inset-top))] z-20 mt-6 bg-shell/90 px-5 py-2 backdrop-blur lg:px-0">
          <div role="tablist" aria-label={day.eyebrow[lang]} className="relative grid grid-cols-2 rounded-full bg-sand p-1 lg:max-w-sm">
            <span aria-hidden className="absolute inset-y-1 w-[calc(50%-0.25rem)] rounded-full bg-white shadow-sm transition-[inset-inline-start] duration-300" style={{ insetInlineStart: tab === 0 ? "0.25rem" : "50%" }} />
            {day.tabs.map((t, k) => (
              <button key={t.en} type="button" role="tab" aria-selected={tab === k} aria-controls={`plan-${k}`} id={`tab-${k}`} onClick={() => pick(k)} className={`relative min-h-11 rounded-full text-[0.95rem] font-bold transition-colors ${tab === k ? "text-ocean" : "text-mist"}`} data-day-tab={k}>
                <T v={t} />
              </button>
            ))}
          </div>
        </div>
        <div
          ref={rail}
          className="rail mt-4 items-start"
          onScroll={(e) => {
            const el = e.currentTarget;
            const k = Math.round(Math.abs(el.scrollLeft) / el.clientWidth);
            if (k !== tab) setTab(k);
          }}
          data-day-rail
        >
          {day.plans.map((plan, k) => (
            <div key={k} id={`plan-${k}`} role="tabpanel" aria-labelledby={`tab-${k}`} className="w-full px-5 lg:px-0" inert={tab !== k ? true : undefined}>
              <ol className="relative grid gap-1 lg:grid-cols-3 lg:gap-6">
                <span aria-hidden className="absolute inset-y-4 start-[1.6rem] w-px bg-gradient-to-b from-coral via-sea to-ocean/30 lg:hidden" />
                {plan.map((s) => (
                  <li key={s.title.en} className="relative flex gap-4 py-3 lg:flex-col lg:rounded-3xl lg:bg-white lg:p-4 lg:ring-1 lg:ring-ocean/6">
                    <span className="tnum relative z-10 grid h-8 min-w-[3.25rem] shrink-0 place-items-center self-start rounded-full bg-ocean px-2 text-xs font-bold text-white lg:absolute lg:top-6 lg:start-6">
                      <T v={s.time} />
                    </span>
                    <div className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl bg-white p-2.5 ring-1 ring-ocean/6 lg:flex-col lg:items-stretch lg:bg-transparent lg:p-0 lg:ring-0">
                      <LazyImg {...pic(s.photo, "(min-width: 1024px) 24rem, 5rem")} alt="" width={480} height={320} className="size-20 shrink-0 rounded-xl object-cover lg:aspect-[3/2] lg:h-auto lg:w-full" />
                      <div className="min-w-0">
                        <h3 className="font-bold text-ocean"><T v={s.title} /></h3>
                        <p className="text-sm leading-snug text-mist"><T v={s.text} /></p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
        <div className="mt-6 px-5 lg:px-0">
          <a href={waLink(waDay(day.tabs[tab]![lang], lang))} target="_blank" rel="noopener" className="press inline-flex min-h-12 items-center gap-2 rounded-full border border-ocean/15 bg-white px-5 font-bold text-ocean" data-day-ask>
            <Icon name="wa" className="size-5 text-wa" />
            <T v={day.ask} />
          </a>
        </div>
      </div>
    </section>
  );
}
