import { LangProvider } from "@/lib/lang";
import { notFound } from "@/lib/content";
import { T } from "./components/T";
import { Logo } from "./components/Header";

export function NotFoundApp() {
  return (
    <LangProvider>
      <main className="relative grid min-h-[100svh] place-items-center overflow-hidden bg-foam px-6 text-center">
        <svg aria-hidden viewBox="0 0 400 120" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-40 w-full">
          <path d="M0 60c50-20 100-20 150 0s100 20 150 0 75-20 100-10v70H0Z" fill="#d8efec" />
          <path d="M0 85c50-15 100-15 150 0s100 15 150 0 75-15 100-8v43H0Z" fill="#8fd3cb" opacity=".6" />
        </svg>
        <div className="relative max-w-sm">
          <div className="flex justify-center"><Logo /></div>
          <p data-hf className="font-display mt-10 text-8xl text-sea-deep">404</p>
          <h1 data-hf className="font-display mt-3 text-3xl text-ocean"><T v={notFound.title} /></h1>
          <p className="mt-3 text-mist"><T v={notFound.text} /></p>
          <a href={import.meta.env.BASE_URL} className="press mt-8 inline-flex min-h-12 items-center rounded-full bg-ocean px-7 font-bold text-white"><T v={notFound.home} /></a>
        </div>
      </main>
    </LangProvider>
  );
}
