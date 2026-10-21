import type { L } from "@/lib/content";
import { T } from "./T";

export function SectionHead({ eyebrow, title, id, children, center }: { eyebrow: L; title: L; id: string; children?: React.ReactNode; center?: boolean }) {
  return (
    <div className={`px-5 lg:px-0 ${center ? "text-center" : ""}`}>
      <p className={`flex items-center gap-2 text-sm font-bold text-coral-deep ${center ? "justify-center" : ""}`}>
        <span className="inline-block size-1.5 rounded-full bg-coral" />
        <T v={eyebrow} />
      </p>
      <h2 id={id} className="font-display mt-2 text-[1.95rem] text-ocean lg:text-5xl"><T v={title} /></h2>
      {children}
    </div>
  );
}
