import { useCallback, useEffect, useRef, useState } from "react";
import { heroStories, ui } from "@/lib/content";
import { heroP, heroW, pic } from "@/lib/img";
import { useLang } from "@/lib/lang";
import { T } from "./T";
import { Icon } from "./Icon";

const BASE = import.meta.env.BASE_URL;
const extra = ["pool", "night"];

/** Full-bleed vertical "story": tap the edges to move, bars show progress, auto-advance can be paused. */
export function StoryHero({ onBook }: { onBook: () => void }) {
  const { lang } = useLang();
  const [i, setI] = useState(0);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const n = heroStories.length;

  useEffect(() => {
    setReduced(matchMedia("(prefers-reduced-motion: reduce)").matches);
    const t = setTimeout(() => setReady(true), 1200);
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return () => clearTimeout(t);
    const io = new IntersectionObserver(([e]) => setVisible(!!e?.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => { clearTimeout(t); io.disconnect(); };
  }, []);

  // The progress bar's CSS animation is the timer: when it ends we advance, and pausing it pauses the story.
  const running = ready && !paused && visible && !reduced;

  const go = useCallback((d: number) => { setReady(true); setI((x) => (x + d + n) % n); }, [n]);

  return (
    <section ref={ref} id="top" aria-roledescription="carousel" aria-label={heroStories[0]!.kicker[lang]} className="relative isolate h-[100svh] min-h-[36rem] overflow-hidden bg-lagoon lg:min-h-[44rem]">
      {/* Slides */}
      <div className="absolute inset-0 -z-10">
        <picture>
          <source media="(min-width: 1024px)" type="image/avif" srcSet={heroW("avif")} sizes="100vw" />
          <source media="(min-width: 1024px)" type="image/webp" srcSet={heroW("webp")} sizes="100vw" />
          <source type="image/avif" srcSet={heroP("avif")} sizes="100vw" />
          <img
            src={`${BASE}img/hero-p-720.webp`}
            srcSet={heroP("webp")}
            sizes="100vw"
            alt=""
            width={720}
            height={1280}
            fetchPriority="high"
            decoding="async"
            className={`story-slide absolute inset-0 size-full object-cover ${i === 0 ? "scale-[1.06] opacity-100" : "scale-100 opacity-0"}`}
            data-slide="0"
          />
        </picture>
        {ready &&
          extra.map((name, k) => (
            <img
              key={name}
              {...pic(name, "100vw")}
              alt=""
              width={1200}
              height={800}
              decoding="async"
              className={`story-slide absolute inset-0 size-full object-cover ${i === k + 1 ? "scale-[1.06] opacity-100" : "scale-100 opacity-0"}`}
              data-slide={k + 1}
            />
          ))}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-shell/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-abyss/45 via-abyss/10 to-transparent" />
      </div>

      {/* Progress bars + pause */}
      <div className="absolute inset-x-0 top-[calc(4.25rem+env(safe-area-inset-top))] z-10 mx-auto flex max-w-7xl items-center gap-1.5 px-4 lg:px-10">
        {heroStories.map((_, k) => (
          <span key={k} className="story-bar h-[3px] flex-1 overflow-hidden rounded-full bg-ocean/15" data-state={k < i ? "done" : k === i ? (reduced ? "done" : "run") : "todo"} {...(k === i && !running ? { "data-paused": "" } : {})}>
            <i key={`${k}-${i}`} className="block h-full rounded-full bg-ocean/70" onAnimationEnd={() => setI((x) => (x + 1) % n)} />
          </span>
        ))}
        <button type="button" onClick={() => { setReady(true); setPaused((p) => !p); }} aria-label={paused ? ui.play[lang] : ui.pause[lang]} aria-pressed={paused} className="press -my-3 grid size-11 shrink-0 place-items-center rounded-full text-ocean" data-story-pause>
          <Icon name={paused ? "play" : "pause"} className="size-4" />
        </button>
      </div>

      {/* Tap zones */}
      <button type="button" onClick={() => go(-1)} aria-label={ui.prev[lang]} className="absolute inset-y-24 start-0 z-[5] w-1/3 cursor-w-resize focus-visible:outline-none" data-story-prev />
      <button type="button" onClick={() => go(1)} aria-label={ui.next[lang]} className="absolute inset-y-24 end-0 z-[5] w-2/3 cursor-e-resize focus-visible:outline-none" data-story-next />

      {/* Copy card */}
      <div className="absolute inset-x-0 bottom-0 z-10 mx-auto max-w-7xl px-4 pb-[calc(5.75rem+env(safe-area-inset-bottom))] lg:px-10 lg:pb-14">
        <div className="max-w-xl rounded-[2rem] bg-shell/92 p-6 shadow-[0_30px_60px_-30px_rgba(6,36,51,0.45)] backdrop-blur-md lg:p-9" aria-live="polite">
          <div className="grid">
            {heroStories.map((s, k) => (
              <div key={k} className={`[grid-area:1/1] transition-opacity duration-500 ${k === i ? "opacity-100" : "invisible opacity-0"}`} aria-hidden={k !== i} data-story-copy={k}>
                <p className="flex items-center gap-2 text-sm font-medium text-sea-deep">
                  <span className="h-px w-6 bg-coral" />
                  <T v={s.kicker} />
                </p>
                {k === 0 ? (
                  <h1 data-hf className="font-display mt-3 text-[2.35rem] text-ocean sm:text-5xl lg:text-6xl"><T v={s.title} /></h1>
                ) : (
                  <p data-hf className="font-display mt-3 text-[2.35rem] text-ocean sm:text-5xl lg:text-6xl"><T v={s.title} /></p>
                )}
                <p className="mt-3 text-[1.02rem] text-mist lg:text-lg"><T v={s.text} /></p>
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-center gap-3">
            <button type="button" onClick={onBook} className="press inline-flex min-h-13 flex-1 items-center justify-center gap-2 rounded-full bg-ocean px-6 text-[1.02rem] font-medium text-white shadow-lg shadow-ocean/20 hover:bg-abyss sm:flex-none" data-hero-cta>
              <Icon name="wa" />
              <T v={ui.book} />
            </button>
            <a href="#rooms" className="press inline-flex min-h-13 items-center gap-1 rounded-full px-4 font-medium text-ocean hover:bg-ocean/5">
              <T v={ui.tabs.rooms} />
              <Icon name="chevron" className="size-4 rtl:rotate-180" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
