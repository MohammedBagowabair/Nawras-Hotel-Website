// "Today on the shore" for Mukalla (14.54°N, 49.13°E, UTC+3). Sunrise/sunset use the NOAA
// approximation; the moon age is from a known new moon; tides and sea temperature are rough
// planning estimates (labelled as such in the UI).
const LAT = 14.54, LON = 49.13, TZ = 3;
const rad = Math.PI / 180;

export type Shore = { sunrise: number; sunset: number; high: number; low: number; moon: number; sea: number };

function sun(date: Date) {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  const n = Math.floor((date.getTime() - start) / 86400000);
  const g = (2 * Math.PI / 365) * (n - 1);
  const eq = 229.18 * (0.000075 + 0.001868 * Math.cos(g) - 0.032077 * Math.sin(g) - 0.014615 * Math.cos(2 * g) - 0.040849 * Math.sin(2 * g));
  const decl = 0.006918 - 0.399912 * Math.cos(g) + 0.070257 * Math.sin(g) - 0.006758 * Math.cos(2 * g) + 0.000907 * Math.sin(2 * g) - 0.002697 * Math.cos(3 * g) + 0.00148 * Math.sin(3 * g);
  const ha = Math.acos(Math.cos(90.833 * rad) / (Math.cos(LAT * rad) * Math.cos(decl)) - Math.tan(LAT * rad) * Math.tan(decl)) / rad;
  const noon = 720 - 4 * LON - eq + TZ * 60;
  return { rise: noon - 4 * ha, set: noon + 4 * ha };
}

const SEA = [26, 26, 27, 29, 30, 29, 26, 25, 27, 28, 28, 27];

export function shoreToday(now = new Date()): Shore {
  const local = new Date(now.getTime() + TZ * 3600000);
  const { rise, set } = sun(now);
  const age = (((now.getTime() - Date.UTC(2000, 0, 6, 18, 14)) / 86400000) % 29.530588 + 29.530588) % 29.530588;
  // Semi-diurnal tide: high water drifts ~50 min later each day of the lunar cycle.
  let high = (age * 50.47 + 150) % 745;
  if (high < 360) high += 745; // first high water after 06:00
  const low = high - 372 >= 360 ? high - 372 : high + 372;
  return { sunrise: rise, sunset: set, high, low, moon: Math.round(age / 3.69) % 8, sea: SEA[local.getUTCMonth()]! };
}

export const hhmm = (mins: number, lang: "ar" | "en") => {
  const m = ((Math.round(mins) % 1440) + 1440) % 1440;
  const s = `${Math.floor(m / 60)}:${String(m % 60).padStart(2, "0")}`;
  return lang === "ar" ? s.replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[+d]!) : s;
};
