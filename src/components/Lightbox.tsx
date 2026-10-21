import { useEffect, useRef, useState } from "react";
import { gallery, ui } from "@/lib/content";
const galleryShots = gallery.shots;
import { pic } from "@/lib/img";
import { useLang } from "@/lib/lang";
import { Icon } from "./Icon";

/** Full-screen photo viewer: swipe between photos, pinch to zoom (native), Esc/arrows on desktop. */
export function Lightbox({ index, onClose }: { index: number | null; onClose: () => void }) {
  const { lang } = useLang();
  const rail = useRef<HTMLDivElement>(null);
  const [cur, setCur] = useState(0);
  const open = index !== null;

  useEffect(() => {
    if (!open) return;
    setCur(index!);
    const el = rail.current;
    if (el) {
      const slide = el.children[index!] as HTMLElement | undefined;
      slide?.scrollIntoView({ block: "nearest", inline: "start", behavior: "instant" as ScrollBehavior });
    }
    document.body.style.overflow = "hidden";
    document.body.dataset["locked"] = "";
    const prev = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        const rtl = document.documentElement.dir === "rtl";
        const dir = (e.key === "ArrowRight") !== rtl ? 1 : -1;
        go(dir);
      }
    };
    addEventListener("keydown", onKey);
    setTimeout(() => (rail.current?.parentElement as HTMLElement | null)?.focus(), 30);
    return () => {
      removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      delete document.body.dataset["locked"];
      prev?.focus?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, index]);

  const go = (d: number) => {
    const el = rail.current;
    if (!el) return;
    const n = Math.max(0, Math.min(galleryShots.length - 1, curRef.current + d));
    (el.children[n] as HTMLElement).scrollIntoView({ block: "nearest", inline: "start", behavior: "smooth" });
  };
  const curRef = useRef(0);
  curRef.current = cur;

  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label={gallery.title[lang]} tabIndex={-1} className="fixed inset-0 z-[80] flex flex-col bg-abyss text-white outline-none" data-testid="lightbox">
      <div className="flex items-center justify-between px-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <p className="px-2 text-sm tabular-nums text-white/80" aria-live="polite" data-lightbox-count>
          {cur + 1} / {galleryShots.length}
        </p>
        <button type="button" onClick={onClose} aria-label={ui.close[lang]} className="press grid size-11 place-items-center rounded-full bg-white/10" data-lightbox-close>
          <Icon name="close" />
        </button>
      </div>
      <div
        ref={rail}
        className="rail min-h-0 flex-1 [touch-action:pan-x_pinch-zoom]"
        onScroll={(e) => {
          const el = e.currentTarget;
          setCur(Math.round(Math.abs(el.scrollLeft) / el.clientWidth));
        }}
        data-lightbox-rail
      >
        {galleryShots.map((s, i) => (
          <figure key={s} className="flex w-full flex-col items-center justify-center px-2">
            <img {...pic(s, "100vw")} alt={gallery.captions[i]![lang]} width={1200} height={800} decoding="async" className="max-h-[75svh] w-full rounded-lg object-contain" draggable={false} />
            <figcaption className="mt-3 text-center text-sm text-white/75">{gallery.captions[i]![lang]}</figcaption>
          </figure>
        ))}
      </div>
      <div className="hidden justify-center gap-3 pb-6 lg:flex">
        <button type="button" onClick={() => go(-1)} aria-label={ui.prev[lang]} className="press grid size-12 place-items-center rounded-full bg-white/10"><Icon name="chevron" className="size-5 rotate-180 rtl:rotate-0" /></button>
        <button type="button" onClick={() => go(1)} aria-label={ui.next[lang]} className="press grid size-12 place-items-center rounded-full bg-white/10"><Icon name="chevron" className="size-5 rtl:rotate-180" /></button>
      </div>
      <div className="pb-[max(1rem,env(safe-area-inset-bottom))] lg:hidden" />
    </div>
  );
}
