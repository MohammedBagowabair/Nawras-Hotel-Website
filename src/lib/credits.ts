import data from "../../scripts/credits.json";
export type Credit = { file: string; author: string; license: string; url: string };
export const credits = data as Record<string, Credit>;
