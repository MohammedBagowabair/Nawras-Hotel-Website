import { useEffect, useRef, useState } from "react";
import { booking, rooms, type Lang, type L } from "@/lib/content";
import { useLang } from "@/lib/lang";
import { waLink } from "@/lib/wa";
import { Sheet } from "./Sheet";
import { T } from "./T";
import { Icon } from "./Icon";

const iso = (d: Date) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
const addDays = (s: string, n: number) => { const d = new Date(s + "T12:00:00"); d.setDate(d.getDate() + n); return iso(d); };
const nightsBetween = (a: string, b: string) => Math.round((new Date(b + "T12:00:00").getTime() - new Date(a + "T12:00:00").getTime()) / 86400000);
const fmt = (s: string, lang: Lang, long = true) =>
  new Date(s + "T12:00:00").toLocaleDateString(lang === "ar" ? "ar-EG" : "en-GB", long ? { weekday: "short", day: "numeric", month: "long", year: "numeric" } : { day: "numeric", month: "short" });
const num = (n: number, lang: Lang) => (lang === "ar" ? n.toLocaleString("ar-EG") : String(n));
const nightsLabel = (n: number, lang: Lang) =>
  lang === "ar" ? (n === 1 ? "ليلة واحدة" : n === 2 ? "ليلتان" : `${num(n, lang)} ${n <= 10 ? "ليالٍ" : "ليلة"}`) : `${n} ${n === 1 ? "night" : "nights"}`;
const guestsLabel = (a: number, c: number, lang: Lang) =>
  lang === "ar"
    ? `البالغون: ${num(a, lang)}${c ? ` · الأطفال: ${num(c, lang)}` : ""}`
    : `${a} ${a === 1 ? "adult" : "adults"}${c ? `, ${c} ${c === 1 ? "child" : "children"}` : ""}`;

export type Answers = { checkIn: string; checkOut: string; adults: number; children: number; room: number; name: string };

export function buildMessage(lang: Lang, v: Answers) {
  const room = v.room < 0 ? booking.anyRoom[lang] : rooms.items[v.room]!.name[lang];
  const n = nightsBetween(v.checkIn, v.checkOut);
  return lang === "ar"
    ? [
        "مرحبًا نَورَس، أودّ طلب حجز:",
        `• الوصول: ${fmt(v.checkIn, lang)}`,
        `• المغادرة: ${fmt(v.checkOut, lang)} (${nightsLabel(n, lang)})`,
        `• ${guestsLabel(v.adults, v.children, lang)}`,
        `• الغرفة: ${room}`,
        `• الاسم: ${v.name.trim()}`,
        "هل يوجد توفّر؟ شكرًا.",
      ].join("\n")
    : [
        "Hello Nawras, I'd like to request a booking:",
        `• Arrive: ${fmt(v.checkIn, lang)}`,
        `• Leave: ${fmt(v.checkOut, lang)} (${nightsLabel(n, lang)})`,
        `• Guests: ${guestsLabel(v.adults, v.children, lang)}`,
        `• Room: ${room}`,
        `• Name: ${v.name.trim()}`,
        "Is it available? Thank you.",
      ].join("\n");
}

function Bot({ v }: { v: L }) {
  return (
    <div className="bubble flex items-end gap-2">
      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-lagoon text-sea-deep"><Icon name="wave" className="size-4" /></span>
      <p className="max-w-[80%] rounded-2xl rounded-es-md bg-white px-4 py-2.5 text-ocean shadow-sm ring-1 ring-ocean/5"><T v={v} /></p>
    </div>
  );
}
function Me({ text, onEdit, editLabel, id }: { text: string; onEdit: () => void; editLabel: string; id: string }) {
  return (
    <div className="bubble flex flex-col items-end gap-1">
      <p className="max-w-[85%] rounded-2xl rounded-ee-md bg-ocean px-4 py-2.5 text-white" data-answer={id}>{text}</p>
      <button type="button" onClick={onEdit} className="min-h-11 px-2 text-xs font-bold text-sea-deep underline underline-offset-2">{editLabel}</button>
    </div>
  );
}

function Counter({ label, value, min, max, onChange, id }: { label: L; value: number; min: number; max: number; onChange: (n: number) => void; id: string }) {
  const { lang } = useLang();
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white p-3 ps-4 ring-1 ring-ocean/6">
      <span className="font-bold text-ocean" id={`${id}-l`}><T v={label} /></span>
      <div className="flex items-center gap-2" role="group" aria-labelledby={`${id}-l`}>
        <button type="button" aria-label={`− ${label[lang]}`} disabled={value <= min} onClick={() => onChange(value - 1)} className="press grid size-11 place-items-center rounded-full bg-foam text-ocean disabled:opacity-35" data-dec={id}><Icon name="minus" /></button>
        <span className="tnum w-7 text-center text-lg font-bold text-ocean" aria-live="polite" data-count={id}>{num(value, lang)}</span>
        <button type="button" aria-label={`+ ${label[lang]}`} disabled={value >= max} onClick={() => onChange(value + 1)} className="press grid size-11 place-items-center rounded-full bg-foam text-ocean disabled:opacity-35" data-inc={id}><Icon name="plus" /></button>
      </div>
    </div>
  );
}

/** Booking as a short chat: four questions, answered with taps; the WhatsApp message builds itself. */
export function BookingChat({ open, room: preset, onClose }: { open: boolean; room: number; onClose: () => void }) {
  const { lang } = useLang();
  const [step, setStep] = useState(0);
  const [today, setToday] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [room, setRoom] = useState(-1);
  const [name, setName] = useState("");
  const [touched, setTouched] = useState(false);
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const t = iso(new Date());
    setToday(t);
    setCheckIn((c) => c || addDays(t, 14));
    setCheckOut((c) => c || addDays(t, 17));
    if (preset >= 0) setRoom(preset);
  }, [open, preset]);
  useEffect(() => {
    if (step > 0) end.current?.scrollIntoView({ block: "end", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }, [step]);
  const nameReady = name.trim().length >= 2;
  useEffect(() => {
    if (nameReady) end.current?.scrollIntoView({ block: "end", behavior: "auto" });
  }, [nameReady]);

  const datesOk = !!checkIn && !!checkOut && nightsBetween(checkIn, checkOut) >= 1;
  const nameOk = name.trim().length >= 2;
  const v = { checkIn, checkOut, adults, children, room, name };
  const message = datesOk && nameOk ? buildMessage(lang, v) : "";
  const edit = booking.edit[lang];
  const roomName = room < 0 ? booking.anyRoom[lang] : rooms.items[room]!.name[lang];

  return (
    <Sheet open={open} onClose={onClose} label={booking.title[lang]} testId="booking">
      <div className="bg-[radial-gradient(circle_at_20%_0%,#d8efec_0,transparent_55%)] px-5 pt-3">
        <h2 className="font-display pe-12 text-2xl text-ocean"><T v={booking.title} /></h2>
        <div className="mt-4 grid gap-3" data-chat>
          <Bot v={booking.hello} />
          <Bot v={booking.qDates} />
          {step === 0 ? (
            <div className="bubble grid gap-2.5" data-ask="dates">
              <div className="grid grid-cols-2 gap-2.5">
                <label className="rounded-2xl bg-white p-3 ring-1 ring-ocean/6">
                  <span className="text-xs font-bold text-mist"><T v={booking.checkIn} /></span>
                  <input type="date" min={today} value={checkIn} onChange={(e) => { setCheckIn(e.target.value); if (checkOut <= e.target.value) setCheckOut(addDays(e.target.value, 1)); }} className="mt-1 block min-h-11 w-full bg-transparent text-ocean outline-none" data-check-in />
                </label>
                <label className="rounded-2xl bg-white p-3 ring-1 ring-ocean/6">
                  <span className="text-xs font-bold text-mist"><T v={booking.checkOut} /></span>
                  <input type="date" min={checkIn ? addDays(checkIn, 1) : today} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="mt-1 block min-h-11 w-full bg-transparent text-ocean outline-none" data-check-out />
                </label>
              </div>
              <div className="flex items-center justify-between gap-3">
                <p className={`text-sm ${datesOk ? "text-mist" : "text-coral-deep"}`} role="status">{datesOk ? nightsLabel(nightsBetween(checkIn, checkOut), lang) : booking.invalid[lang]}</p>
                <button type="button" disabled={!datesOk} onClick={() => setStep(1)} className="press min-h-11 rounded-full bg-ocean px-5 font-bold text-white disabled:opacity-40" data-ok="dates"><T v={booking.confirm} /></button>
              </div>
            </div>
          ) : (
            <Me id="dates" text={`${fmt(checkIn, lang, false)} ← ${fmt(checkOut, lang, false)} · ${nightsLabel(nightsBetween(checkIn, checkOut), lang)}`.replace("←", lang === "ar" ? "←" : "→")} onEdit={() => setStep(0)} editLabel={edit} />
          )}

          {step >= 1 && <Bot v={booking.qGuests} />}
          {step === 1 && (
            <div className="bubble grid gap-2.5" data-ask="guests">
              <Counter id="adults" label={booking.adults} value={adults} min={1} max={8} onChange={setAdults} />
              <Counter id="children" label={booking.children} value={children} min={0} max={6} onChange={setChildren} />
              <button type="button" onClick={() => setStep(2)} className="press min-h-11 justify-self-end rounded-full bg-ocean px-5 font-bold text-white" data-ok="guests"><T v={booking.confirm} /></button>
            </div>
          )}
          {step > 1 && <Me id="guests" text={guestsLabel(adults, children, lang)} onEdit={() => setStep(1)} editLabel={edit} />}

          {step >= 2 && <Bot v={booking.qRoom} />}
          {step === 2 && (
            <div className="bubble flex flex-wrap gap-2" data-ask="room">
              {[-1, 0, 1, 2].map((r) => (
                <button key={r} type="button" onClick={() => { setRoom(r); setStep(3); }} aria-pressed={room === r} className={`press min-h-11 rounded-full px-4 font-bold ring-1 ${room === r ? "bg-lagoon text-sea-deep ring-sea" : "bg-white text-ocean ring-ocean/12"}`} data-room-chip={r}>
                  {r < 0 ? <T v={booking.anyRoom} /> : <T v={rooms.items[r]!.name} />}
                </button>
              ))}
            </div>
          )}
          {step > 2 && <Me id="room" text={roomName} onEdit={() => setStep(2)} editLabel={edit} />}

          {step >= 3 && <Bot v={booking.qName} />}
          {step >= 3 && (
            <div className="bubble grid gap-2" data-ask="name">
              <label className="rounded-2xl bg-white p-3 ring-1 ring-ocean/6">
                <span className="text-xs font-bold text-mist"><T v={booking.name} /></span>
                <input type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} onBlur={() => setTouched(true)} placeholder={booking.namePh[lang]} className="mt-1 block min-h-11 w-full bg-transparent text-lg text-ocean outline-none placeholder:text-mist/70" data-name />
              </label>
              {touched && !nameOk && <p className="text-sm text-coral-deep" role="alert">{booking.needName[lang]}</p>}
            </div>
          )}
          {step >= 3 && nameOk && (
            <div className="bubble rounded-2xl bg-[#e7f6ec] p-4 ring-1 ring-wa/15">
              <p className="text-xs font-bold text-wa"><T v={booking.preview} /></p>
              <p className="mt-1.5 text-sm leading-relaxed whitespace-pre-line text-ocean" data-preview>{message}</p>
            </div>
          )}
          <div ref={end} className="scroll-mb-40" />
        </div>
      </div>
      {step >= 3 && (
        <div className="sticky bottom-0 mt-3 bg-shell px-5 pt-3">
          {nameOk ? (
            <a href={waLink(message)} target="_blank" rel="noopener" className="press flex min-h-13 items-center justify-center gap-2 rounded-full bg-wa px-6 font-bold text-white" data-send>
              <Icon name="wa" />
              <T v={booking.send} />
            </a>
          ) : (
            <button type="button" onClick={() => setTouched(true)} aria-disabled="true" className="flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-wa/45 px-6 font-bold text-white" data-send-disabled>
              <Icon name="wa" />
              <T v={booking.send} />
            </button>
          )}
          <p className="mt-2 text-center text-xs text-mist"><T v={booking.noPrice} /></p>
        </div>
      )}
    </Sheet>
  );
}
