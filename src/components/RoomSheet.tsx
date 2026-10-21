import { useState } from "react";
import { rooms, ui } from "@/lib/content";
import { pic } from "@/lib/img";
import { useLang } from "@/lib/lang";
import { waLink, waRoom } from "@/lib/wa";
import { Sheet } from "./Sheet";
import { T } from "./T";
import { Icon } from "./Icon";

export function RoomSheet({ index, onClose, onBook }: { index: number | null; onClose: () => void; onBook: (room: number) => void }) {
  const { lang } = useLang();
  const [last, setLast] = useState(0);
  const [cur, setCur] = useState(0);
  if (index !== null && index !== last) { setLast(index); setCur(0); }
  const r = rooms.items[index ?? last]!;
  return (
    <Sheet open={index !== null} onClose={onClose} label={r.name[lang]} testId="room-sheet">
      <div className="relative">
        <div className="rail [touch-action:pan-x_pan-y]" onScroll={(e) => setCur(Math.round(Math.abs(e.currentTarget.scrollLeft) / e.currentTarget.clientWidth))} data-room-gallery>
          {r.photos.map((p) => (
            <img key={p} {...pic(p, "(min-width: 1024px) 36rem, 100vw")} alt="" width={800} height={533} decoding="async" className="aspect-[4/3] w-full object-cover" draggable={false} />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
          {r.photos.map((_, k) => (
            <span key={k} className={`h-1.5 rounded-full bg-white transition-all ${k === cur ? "w-5" : "w-1.5 opacity-60"}`} />
          ))}
        </div>
      </div>
      <div className="px-6 pt-5">
        <h2 className="font-display text-3xl text-ocean"><T v={r.name} /></h2>
        <p className="mt-2 text-mist"><T v={r.text} /></p>
        <dl className="mt-5 grid grid-cols-2 gap-2.5 text-sm">
          {[
            { k: { en: "Size", ar: "المساحة" }, v: r.size },
            { k: { en: "Guests", ar: "الضيوف" }, v: r.guests },
            { k: { en: "Beds", ar: "الأسرّة" }, v: r.bed },
            { k: { en: "View", ar: "الإطلالة" }, v: r.view },
          ].map((x) => (
            <div key={x.k.en} className="rounded-2xl bg-white p-3 ring-1 ring-ocean/6">
              <dt className="text-xs text-mist"><T v={x.k} /></dt>
              <dd className="mt-0.5 font-bold text-ocean"><T v={x.v} /></dd>
            </div>
          ))}
        </dl>
        <ul className="mt-5 grid gap-2">
          {r.features.map((f) => (
            <li key={f.en} className="flex items-center gap-3 text-ocean">
              <span className="grid size-7 place-items-center rounded-full bg-lagoon text-sea-deep"><Icon name="check" className="size-4" /></span>
              <T v={f} />
            </li>
          ))}
        </ul>
        <div className="sticky bottom-0 -mx-6 mt-6 grid grid-cols-[1.4fr_1fr] gap-2.5 bg-shell px-6 pt-3">
          <a href={waLink(waRoom(r.name[lang], lang))} target="_blank" rel="noopener" className="press flex min-h-13 items-center justify-center gap-2 rounded-full bg-wa px-4 font-bold text-white" data-room-request>
            <Icon name="wa" />
            <T v={ui.requestRoom} />
          </a>
          <button type="button" onClick={() => onBook(index ?? last)} className="press flex min-h-13 items-center justify-center gap-2 rounded-full bg-ocean/7 px-4 font-bold text-ocean" data-room-plan>
            <Icon name="calendar" />
            <T v={{ en: "Pick dates", ar: "اختر التواريخ" }} />
          </button>
        </div>
      </div>
    </Sheet>
  );
}
