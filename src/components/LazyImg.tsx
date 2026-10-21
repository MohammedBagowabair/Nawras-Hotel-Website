import { useEffect, useRef, useState, type ImgHTMLAttributes } from "react";

/** Attaches the image source only when it comes within ~300px of the viewport. */
export function LazyImg({ src, srcSet, sizes, eager, ...rest }: ImgHTMLAttributes<HTMLImageElement> & { eager?: boolean }) {
  const ref = useRef<HTMLImageElement>(null);
  const [near, setNear] = useState(!!eager);
  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    if (!("IntersectionObserver" in window)) return setNear(true);
    const io = new IntersectionObserver((e) => {
      if (e.some((x) => x.isIntersecting)) { setNear(true); io.disconnect(); }
    }, { rootMargin: "300px 300px" });
    io.observe(el);
    return () => io.disconnect();
  }, [near]);
  return <img ref={ref} {...rest} {...(near ? { src, srcSet, sizes } : {})} loading="lazy" decoding="async" />;
}
