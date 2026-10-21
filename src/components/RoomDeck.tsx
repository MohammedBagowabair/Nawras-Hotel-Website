import { useRef, useState } from "react";
import { rooms, ui } from "@/lib/content";
import { pic } from "@/lib/img";
import { useLang } from "@/lib/lang";
import { LazyImg } from "./LazyImg";
import { SectionHead } from "./Section";
import { T } from "./T";
import { Icon } from "./Icon";

const n = rooms.items.length;

/** Rooms as a stacked card deck: drag the top card sideways to send it to the back; tap to open. */
export function RoomDeck({ onOpen }: { onOpen: (i: number) => void }) {
  const { lang } = useLang();
  const [top, setTop] = useState(0);
  const [fling, setFling] = useState<{ k: number; dir: number } | null>(null);
  const drag = useRef<{ x: number; y: number; dx: number; id: number; axis?: "x" | "y" } | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const advance = (dir = 1) => {
    if (fling) return;
    const k = top;
    setFling({ k, dir });
    setTimeout(() => { setTop((t) => (t + 1) % n); setFling(null); }, 260);
  };
  const back = () => setTop((t) => (t - 1 + n) % n);

  const down = (e: React.PointerEvent, k: number) => {
    if (k !== top || fling) return;
    drag.current = { x: e.clientX, y: e.clientY, dx: 0, id: e.pointerId };
  };
  const move = (e: React.PointerEvent, k: number) => {
    const d = drag.current;
    const el = cardRefs.current[k];
    if (!d || !el || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x, dy = e.clientY - d.y;
    if (!d.axis && Math.hypot(dx, dy) > 8) {
      d.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      if (d.axis === "x") el.setPointerCapture(e.pointerId);
    }
    if (d.axis !== "x") return;
    d.dx = dx;
    el.dataset["drag"] = "";
    el.style.transform = `translateX(${dx}px) rotate(${dx / 22}deg)`;
  };
  const up = (k: number) => {
    const d = drag.current;
    const el = cardRefs.current[k];
    drag.current = null;
    if (!d || !el) return;
    delete el.dataset["drag"];
    el.style.transform = "";
    if (d.axis === "x" && Math.abs(d.dx) > 70) advance(Math.sign(d.dx));
    else if (!d.axis) onOpen(k);
  };

  return (
    <section id="rooms" aria-labelledby="rooms-title" className="overflow-hidden bg-foam pt-4 pb-16 lg:pt-8 lg:pb-28">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_28rem] lg:gap-20 lg:px-10">
        <div>
          <SectionHead eyebrow={rooms.eyebrow} title={rooms.title} id="rooms-title">
            <p className="mt-3 max-w-md text-mist"><T v={rooms.hint} /></p>
          </SectionHead>
          <ol className="mt-8 hidden gap-2 lg:grid">
            {rooms.items.map((r, k) => (
              <li key={r.id}>
                <button type="button" onClick={() => setTop(k)} className={`press flex min-h-14 w-full items-center justify-between gap-4 rounded-2xl px-5 text-start transition-colors ${k === top ? "bg-white shadow-sm ring-1 ring-ocean/10" : "hover:bg-white/60"}`} aria-pressed={k === top}>
                  <span>
                    <span className="font-display block text-xl text-ocean"><T v={r.name} /></span>
                    <span className="block text-sm text-mist"><T v={r.tag} /></span>
                  </span>
                  <span className="tnum text-sm text-mist"><T v={r.size} /></span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className="px-5 lg:px-0">
          <div className="relative mx-auto h-[29rem] w-full max-w-[22rem] lg:h-[32rem] lg:max-w-none" data-deck>
            {rooms.items.map((r, k) => {
              const p = (k - top + n) % n;
              const flung = fling?.k === k;
              const style = flung
                ? { transform: `translateX(${fling!.dir * 130}%) rotate(${fling!.dir * 14}deg)`, opacity: 0 }
                : { transform: `translateY(${p * 16}px) scale(${1 - p * 0.055})`, opacity: p > 2 ? 0 : 1 };
              return (
                <div
                  key={r.id}
                  ref={(el) => { cardRefs.current[k] = el; }}
                  className={`deck-card absolute inset-x-0 top-0 h-[26.5rem] select-none overflow-hidden rounded-[1.75rem] bg-white shadow-[0_24px_50px_-28px_rgba(6,36,51,0.5)] ring-1 ring-ocean/8 lg:h-[29.5rem] ${p === 0 ? "cursor-grab touch-pan-y" : "pointer-events-none"}`}
                  style={{ ...style, zIndex: n - p }}
                  aria-hidden={p !== 0}
                  onPointerDown={(e) => down(e, k)}
                  onPointerMove={(e) => move(e, k)}
                  onPointerUp={() => up(k)}
                  onPointerCancel={() => up(k)}
                  data-deck-card={k}
                  data-pos={p}
                >
                  <div className="relative h-[60%]" style={{ background: r.tone }}>
                    <LazyImg {...pic(r.photos[0]!, "(min-width: 1024px) 28rem, 22rem")} alt="" width={800} height={533} draggable={false} className="size-full object-cover" />
                    <span className="absolute top-3 start-3 rounded-full bg-shell/90 px-3 py-1 text-xs font-bold text-ocean backdrop-blur"><T v={r.view} /></span>
                  </div>
                  <div className="flex h-[40%] flex-col p-5">
                    <h3 className="font-display text-2xl text-ocean"><T v={r.name} /></h3>
                    <p className="mt-1 text-[0.95rem] text-mist"><T v={r.tag} /></p>
                    <div className="mt-auto flex items-center justify-between gap-2">
                      <span className="flex gap-1.5 text-xs font-medium text-ocean">
                        <span className="rounded-full bg-lagoon px-2.5 py-1"><T v={r.size} /></span>
                        <span className="rounded-full bg-sand px-2.5 py-1"><T v={r.guests} /></span>
                      </span>
                      <button type="button" tabIndex={p === 0 ? 0 : -1} onClick={(e) => { e.stopPropagation(); onOpen(k); }} onPointerDown={(e) => e.stopPropagation()} className={`press inline-flex min-h-11 items-center gap-1 rounded-full px-2 text-sm font-bold text-sea-deep ${p === 0 ? "" : "invisible"}`} data-room-details={k}>
                        <T v={ui.details} />
                        <Icon name="chevron" className="size-4 rtl:rotate-180" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mx-auto flex max-w-[22rem] items-center justify-between lg:max-w-none">
            <button type="button" onClick={back} aria-label={ui.prev[lang]} className="press grid size-12 place-items-center rounded-full bg-white text-ocean shadow-sm ring-1 ring-ocean/10" data-deck-prev>
              <Icon name="chevron" className="size-5 rotate-180 rtl:rotate-0" />
            </button>
            <p className="tnum text-sm text-mist" aria-live="polite" data-deck-count>
              <span className="font-bold text-ocean">{rooms.items[top]!.name[lang]}</span> · {lang === "ar" ? `${(top + 1).toLocaleString("ar-EG")} من ${n.toLocaleString("ar-EG")}` : `${top + 1} of ${n}`}
            </p>
            <button type="button" onClick={() => advance(1)} aria-label={ui.next[lang]} className="press grid size-12 place-items-center rounded-full bg-ocean text-white shadow-sm" data-deck-next>
              <Icon name="chevron" className="size-5 rtl:rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
