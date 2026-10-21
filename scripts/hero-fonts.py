"""Tiny Reem Kufi subsets for the hero/story headings, logo and 404 (inlined by scripts/prerender.mjs)."""
import re, subprocess
c = open("src/lib/content.ts", encoding="utf8").read()
pairs = re.findall(r'\{ en: "([^"]+)", ar: "([^"]+)" \}', c[c.index("export const heroStories"):c.index("export const tide")])
pairs += re.findall(r'title: \{ en: "([^"]+)", ar: "([^"]+)" \}', c[c.index("export const notFound"):])
pairs += [("Nawras", "نَورَس"), ("404", "404")]
en = "".join(p[0] for p in pairs) + "0123456789"
ar = "".join(p[1] for p in pairs) + "٠١٢٣٤٥٦٧٨٩"
for src, text, out in [("public/fonts/ReemKufi-500-arabic.woff2", ar + " ،", "public/fonts/hero-ar.woff2"),
                       ("public/fonts/ReemKufi-500-latin.woff2", en + " ,'", "public/fonts/hero-en.woff2")]:
    subprocess.run(["pyftsubset", src, f"--text={text}", "--layout-features=*", "--flavor=woff2", f"--output-file={out}"], check=True)
    print(out, len(open(out, "rb").read()))
