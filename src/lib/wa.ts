import type { Lang } from "./content";

// Nawras is fictional, so booking, calls and the map all go to the site owner's demo WhatsApp number.
export const WHATSAPP = "601151198497";
export const PHONE_TEL = "+601151198497";
export const MAP_URL = "https://www.google.com/maps/search/?api=1&query=Khalf%2C+Mukalla%2C+Yemen";
export const waLink = (text: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

export const waGeneral: Record<Lang, string> = {
  ar: "مرحبًا نَورَس، أودّ الاستفسار عن التوفّر.",
  en: "Hello Nawras, I'd like to ask about availability.",
};
export const waRoom = (room: string, lang: Lang) =>
  lang === "ar" ? `مرحبًا نَورَس، أودّ طلب «${room}». هل هي متوفّرة؟` : `Hello Nawras, I'd like to ask for the ${room}. Is it available?`;
export const waDay = (plan: string, lang: Lang) =>
  lang === "ar" ? `مرحبًا نَورَس، هل يمكنكم ترتيب «${plan}» لنا خلال إقامتنا؟` : `Hello Nawras, could you arrange the "${plan}" for us during our stay?`;
