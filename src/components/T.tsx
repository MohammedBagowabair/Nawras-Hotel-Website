import type { L } from "@/lib/content";

/** Bilingual text: both spans are rendered, CSS shows the one for <html lang>. */
export function T({ v }: { v: L }) {
  return (
    <>
      <span lang="ar" className="t-ar">{v.ar}</span>
      <span lang="en" className="t-en">{v.en}</span>
    </>
  );
}
