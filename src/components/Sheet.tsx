import { useEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "./Icon";
import { ui } from "@/lib/content";
import { useLang } from "@/lib/lang";

type Props = { open: boolean; onClose: () => void; label: string; children: ReactNode; testId?: string };

/** Bottom sheet on phones (drag the handle down to close), centred dialog on desktop. */
export function Sheet({ open, onClose, label, children, testId }: Props) {
  const { lang } = useLang();
  const panel = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(open);
  const [shown, setShown] = useState(false);
  const drag = useRef<{ y: number; dy: number } | null>(null);

  useEffect(() => {
    if (open) {
      setMounted(true);
      const id = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
      return () => cancelAnimationFrame(id);
    }
    setShown(false);
    const t = setTimeout(() => setMounted(false), 380);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    document.body.dataset["locked"] = "";
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panel.current) {
        const f = panel.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input,textarea,select,[tabindex="0"]');
        if (!f.length) return;
        const first = f[0]!, last = f[f.length - 1]!;
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    setTimeout(() => panel.current?.focus(), 60);
    return () => {
      document.removeEventListener("keydown", onKey);
      delete document.body.dataset["locked"];
      document.body.style.overflow = "";
      prev?.focus?.();
    };
  }, [open, onClose]);

  if (!mounted) return null;

  const onPointerDown = (e: React.PointerEvent) => {
    drag.current = { y: e.clientY, dy: 0 };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current || !panel.current) return;
    drag.current.dy = Math.max(0, e.clientY - drag.current.y);
    panel.current.style.transition = "none";
    panel.current.style.transform = `translateY(${drag.current.dy}px)`;
  };
  const onPointerUp = () => {
    if (!drag.current || !panel.current) return;
    const { dy } = drag.current;
    drag.current = null;
    panel.current.style.transition = "";
    panel.current.style.transform = "";
    if (dy > 90) onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center lg:items-center" data-testid={testId}>
      <div
        className={`sheet-backdrop absolute inset-0 bg-abyss/40 backdrop-blur-[2px] ${shown ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
        aria-hidden
      />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        className={`sheet-panel relative flex max-h-[92svh] w-full flex-col overflow-hidden rounded-t-[1.75rem] bg-shell shadow-2xl outline-none lg:max-h-[88vh] lg:max-w-xl lg:rounded-[1.75rem] ${
          shown ? "translate-y-0 lg:scale-100 lg:opacity-100" : "translate-y-full lg:translate-y-4 lg:scale-[0.98] lg:opacity-0"
        }`}
      >
        <div
          className="flex shrink-0 touch-none items-center justify-center pt-2.5 pb-1 lg:hidden"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          data-sheet-handle
        >
          <span className="h-1.5 w-11 rounded-full bg-ocean/20" />
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={ui.close[lang]}
          className="press absolute top-3 z-10 grid size-11 place-items-center rounded-full bg-white/85 text-ocean shadow-sm ltr:right-3 rtl:left-3"
          data-sheet-close
        >
          <Icon name="close" />
        </button>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pb-[max(1.25rem,env(safe-area-inset-bottom))]">{children}</div>
      </div>
    </div>
  );
}
