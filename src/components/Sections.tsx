import { faq, footer, gallery, house, intro, location, postcards, ui } from "@/lib/content";
import { pic } from "@/lib/img";
import { useLang } from "@/lib/lang";
import { MAP_URL } from "@/lib/wa";
import { LazyImg } from "./LazyImg";
import { Reveal } from "./Reveal";
import { SectionHead } from "./Section";
import { Mark } from "./Header";
import { T } from "./T";
import { Icon } from "./Icon";

export function Intro() {
  return (
    <section aria-labelledby="intro-title" className="bg-foam py-16 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-20 lg:px-10">
        <Reveal>
          <p className="text-sm font-bold text-coral-deep"><T v={intro.eyebrow} /></p>
          <h2 id="intro-title" className="font-display mt-3 text-[2.1rem] text-ocean lg:text-6xl"><T v={intro.title} /></h2>
          <p className="mt-5 max-w-xl text-[1.05rem] text-mist lg:text-lg"><T v={intro.text} /></p>
        </Reveal>
        <Reveal delay={120}>
          <dl className="grid grid-cols-3 divide-x divide-ocean/10 rounded-3xl bg-white py-6 ring-1 ring-ocean/6 rtl:divide-x-reverse">
            {intro.facts.map((f) => (
              <div key={f.l.en} className="px-3 text-center">
                <dt className="sr-only"><T v={f.l} /></dt>
                <dd>
                  <span className="font-display block text-3xl text-sea-deep lg:text-4xl"><T v={f.n} /></span>
                  <span className="mt-1 block text-xs text-mist lg:text-sm"><T v={f.l} /></span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

export function House() {
  return (
    <section aria-labelledby="house-title" className="bg-lagoon/60 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl lg:px-10">
        <SectionHead eyebrow={house.eyebrow} title={house.title} id="house-title" />
        <ul className="mt-8 grid grid-cols-3 gap-2.5 px-5 lg:grid-cols-6 lg:gap-4 lg:px-0">
          {house.items.map((h) => (
            <li key={h.icon} className="flex flex-col items-center gap-2 rounded-3xl bg-white px-2 py-5 text-center ring-1 ring-ocean/5">
              <span className="grid size-12 place-items-center rounded-full bg-foam text-sea-deep"><Icon name={h.icon} className="size-6" /></span>
              <span className="text-[0.82rem] leading-tight font-medium text-ocean lg:text-sm"><T v={h.t} /></span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const tilt = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];
const stamps = ["bg-coral", "bg-sea", "bg-ocean", "bg-coral-deep"];
export function Postcards() {
  return (
    <section aria-labelledby="cards-title" className="bg-foam py-16 lg:py-28">
      <div className="mx-auto max-w-7xl lg:px-10">
        <SectionHead eyebrow={postcards.eyebrow} title={postcards.title} id="cards-title" />
        <ul className="rail mt-8 gap-4 scroll-px-5 px-5 py-4 lg:grid lg:grid-cols-4 lg:px-0" data-postcards>
          {postcards.items.map((p, k) => (
            <li key={p.who.en} className={`w-[78%] max-w-[19rem] lg:w-auto lg:max-w-none ${tilt[k]}`}>
              <figure className="relative h-full rounded-xl bg-shell p-5 pt-6 shadow-[0_18px_40px_-24px_rgba(6,36,51,0.45)] ring-1 ring-ocean/8">
                <span aria-hidden className={`absolute top-4 end-4 grid size-11 place-items-center rounded-sm border-2 border-dashed border-white/70 ${stamps[k]} text-white`}>
                  <Mark className="size-7" />
                </span>
                <blockquote className="pe-12 text-[1.02rem] leading-relaxed text-ocean">“<T v={p.q} />”</blockquote>
                <figcaption className="mt-4 border-t border-dashed border-ocean/15 pt-3 text-sm">
                  <span className="font-bold text-ocean"><T v={p.who} /></span>
                  <span className="text-mist"> · <T v={p.from} /></span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <p className="mt-2 px-5 text-xs text-mist lg:px-0"><T v={postcards.note} /></p>
      </div>
    </section>
  );
}

const spans = ["row-span-2", "", "", "lg:col-span-2", "row-span-2", "", "lg:col-span-2", ""];
export function Gallery({ onOpen }: { onOpen: (i: number) => void }) {
  const { lang } = useLang();
  return (
    <section id="moods" aria-labelledby="moods-title" className="bg-shell py-16 lg:py-28">
      <div className="mx-auto max-w-7xl lg:px-10">
        <SectionHead eyebrow={gallery.eyebrow} title={gallery.title} id="moods-title" />
        <ul className="mt-8 grid grid-flow-dense auto-rows-[8.5rem] grid-cols-2 gap-2.5 px-5 lg:auto-rows-[12rem] lg:grid-cols-4 lg:gap-4 lg:px-0">
          {gallery.shots.map((s, k) => (
            <li key={s} className={spans[k]}>
              <button type="button" onClick={() => onOpen(k)} aria-label={`${ui.openPhoto[lang]}: ${gallery.captions[k]![lang]}`} className="press group relative block size-full overflow-hidden rounded-2xl bg-lagoon" data-gallery={k}>
                <LazyImg {...pic(s, "(min-width: 1024px) 25vw, 50vw")} alt="" width={800} height={533} className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute inset-x-2 bottom-2 rounded-full bg-shell/85 px-3 py-1 text-[0.72rem] font-medium text-ocean opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 lg:opacity-100">
                  {gallery.captions[k]![lang]}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Location() {
  return (
    <section id="find" aria-labelledby="find-title" className="bg-foam py-16 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-10">
        <div>
          <SectionHead eyebrow={location.eyebrow} title={location.title} id="find-title">
            <p className="mt-3 text-mist"><T v={location.text} /></p>
          </SectionHead>
          <ul className="mt-6 grid gap-2 px-5 lg:px-0">
            {location.near.map((x) => (
              <li key={x.t.en} className="flex min-h-14 items-center justify-between gap-3 rounded-2xl bg-white px-4 ring-1 ring-ocean/6">
                <span className="flex items-center gap-3 text-ocean"><Icon name="pin" className="size-5 text-coral-deep" /><T v={x.t} /></span>
                <span className="tnum text-sm font-bold whitespace-nowrap text-sea-deep"><T v={x.d} /></span>
              </li>
            ))}
          </ul>
          <div className="mt-5 px-5 lg:px-0">
            <a href={MAP_URL} target="_blank" rel="noopener" className="press inline-flex min-h-12 items-center gap-2 rounded-full bg-ocean px-6 font-bold text-white" data-map-link>
              <Icon name="pin" />
              <T v={location.open} />
            </a>
          </div>
        </div>
        <div className="px-5 lg:px-0">
          <CoastMap />
        </div>
      </div>
    </section>
  );
}

/** Stylised coast: sea, the Khor inlet, the city and the house (not to scale). */
function CoastMap() {
  const { lang } = useLang();
  const L = (en: string, ar: string) => (lang === "ar" ? ar : en);
  return (
    <svg viewBox="0 0 400 300" role="img" aria-label={L("Stylised map of the Mukalla coast", "خريطة مبسّطة لساحل المكلا")} className="w-full rounded-[2rem] bg-sand ring-1 ring-ocean/6" style={{ direction: "ltr" }}>
      <path d="M0 0h400v150c-40 10-60 30-95 28-30-2-45-22-80-18-30 4-40 30-75 30-35 0-50-20-80-16C40 178 20 190 0 196Z" fill="#e3d5bf" />
      <path d="M0 196c20-6 40-18 70-22 30-4 45 16 80 16 35 0 45-26 75-30 35-4 50 16 80 18 35 2 55-18 95-28v150H0Z" fill="#bfe6e1" />
      <path d="M0 230c40-8 80-6 120-14s90-4 140-14 100-10 140-16v114H0Z" fill="#8fd3cb" opacity=".55" />
      <path d="M150 190c4-30 0-60-8-90" stroke="#8fd3cb" strokeWidth="9" strokeLinecap="round" fill="none" />
      <path d="M40 60l30-30 30 22 30-34 40 30 30-18 30 26" stroke="#c9b597" strokeWidth="2" fill="none" />
      <g fill="#0c3b57">
        <circle cx="150" cy="150" r="5" />
        <circle cx="315" cy="176" r="8" fill="#f07a63" />
        <circle cx="315" cy="176" r="15" fill="#f07a63" opacity=".2" />
      </g>
      <g fontFamily="inherit" fontSize="14" fill="#0c3b57" fontWeight="700">
        <text x="160" y="140">{L("Khor Mukalla", "خور المكلا")}</text>
        <text x="286" y="160">{L("Nawras", "نَورَس")}</text>
        <text x="170" y="270" fill="#0b746d" fontWeight="500">{L("Arabian Sea", "بحر العرب")}</text>
      </g>
      <text x="20" y="288" fontSize="10" fill="#4f6676">{L("Not to scale", "ليست بمقياس رسم")}</text>
    </svg>
  );
}

export function Faq() {
  return (
    <section aria-labelledby="faq-title" className="bg-shell py-16 lg:py-24">
      <div className="mx-auto max-w-3xl lg:px-10">
        <SectionHead eyebrow={faq.eyebrow} title={faq.title} id="faq-title" />
        <div className="mt-6 grid gap-2 px-5 lg:px-0">
          {faq.items.map((f) => (
            <details key={f.q.en} className="group rounded-2xl bg-white ring-1 ring-ocean/6" data-faq>
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 font-bold text-ocean">
                <T v={f.q} />
                <span className="faq-icon grid size-8 shrink-0 place-items-center rounded-full bg-lagoon text-sea-deep transition-transform"><Icon name="plus" className="size-4" /></span>
              </summary>
              <p className="px-5 pb-5 text-mist"><T v={f.a} /></p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer({ onCredits }: { onCredits: () => void }) {
  return (
    <footer className="wave-edge bg-ocean pt-14 pb-[calc(6.5rem+env(safe-area-inset-bottom))] text-white lg:pb-14">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="flex items-center gap-3">
          <Mark className="size-11" />
          <div>
            <p className="font-display text-2xl"><T v={{ en: "Nawras", ar: "نَورَس" }} /></p>
            <p className="text-sm text-white/75"><T v={footer.line} /></p>
          </div>
        </div>
        <p className="mt-6 max-w-2xl rounded-2xl bg-white/8 p-4 text-sm leading-relaxed text-white/85" data-demo-note><T v={ui.demo} /></p>
        <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/75">
          <button type="button" onClick={onCredits} className="inline-flex min-h-11 min-w-11 items-center underline decoration-white/30 underline-offset-4 hover:text-white" data-credits>
            <T v={ui.credits} />
          </button>
          <span aria-hidden>·</span>
          <span><T v={footer.rights} /> © 2026</span>
        </div>
      </div>
    </footer>
  );
}
