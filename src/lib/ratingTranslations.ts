// src/lib/ratingTranslations.ts
// Plain-language texts for the three accessibility ratings.
// Written following Lectura Fácil guidelines: short sentences, common words,
// no abbreviations and no unusual symbols.

export const ratingTranslations = {
  en: {
    ariaLabel: "How to read the ratings",
    title: "How we rate apps",
    subtitle: "We rate every app with 3 criteria. This helps you find the app you need.",
    easeTitle: "Ease of use",
    easeDesc: "The higher the score, the easier the app is to use.",
    easeHint: "How easy the app is to use. Higher is better.",
    cogTitle: "Cognitive load",
    cogDesc: "How much you need to think and remember to use the app. The best score depends on your goal:",
    cogHint: "How much you need to think to use the app. Low to relax, high to learn.",
    cogLow: "Low (1 or 2): to relax",
    cogHigh: "High (3 to 5): to learn",
    sensoryTitle: "Sensory load",
    sensoryDesc: "How many sounds, lights and movements the app has. A low score is better for people who are sensitive to them.",
    sensoryHint: "How many sounds, lights and movements the app has. Lower is better.",
    levelLow: "Low",
    levelMid: "Medium",
    levelHigh: "High",
    outOf: "out of",
    notRated: "Not rated",
    closeBtn: "Close",
  },
  es: {
    ariaLabel: "Cómo leer las valoraciones",
    title: "Cómo valoramos las apps",
    subtitle: "Valoramos cada app con 3 criterios. Así puedes encontrar la app que necesitas.",
    easeTitle: "Facilidad de uso",
    easeDesc: "Cuanto más alta es la puntuación, más fácil es usar la app.",
    easeHint: "Lo fácil que es usar la app. Mejor si es alta.",
    cogTitle: "Carga cognitiva",
    cogDesc: "Cuánto hay que pensar y recordar para usar la app. La mejor puntuación depende de lo que quieres hacer:",
    cogHint: "Cuánto hay que pensar para usar la app. Baja para relajarse. Alta para aprender.",
    cogLow: "Baja (1 o 2): para relajarse",
    cogHigh: "Alta (3 a 5): para aprender",
    sensoryTitle: "Carga sensorial",
    sensoryDesc: "Cuántos sonidos, luces y movimientos tiene la app. Una puntuación baja es mejor para personas sensibles a estos estímulos.",
    sensoryHint: "Cuántos sonidos, luces y movimientos tiene la app. Mejor si es baja.",
    levelLow: "Baja",
    levelMid: "Media",
    levelHigh: "Alta",
    outOf: "de",
    notRated: "Sin valorar",
    closeBtn: "Cerrar",
  },
} as const;

export type SupportedLang = "en" | "es";

/** Turns a 1-5 score into a word: low (1-2), medium (3) or high (4-5). */
export function getRatingLevel(score: number | null | undefined, lang: SupportedLang): string {
  const t = ratingTranslations[lang] || ratingTranslations.es;
  if (score == null || score === 0) return t.notRated;
  if (score <= 2) return t.levelLow;
  if (score === 3) return t.levelMid;
  return t.levelHigh;
}

/** Full text for a score, for example "Alta (4 de 5)". */
export function formatRating(score: number | null | undefined, lang: SupportedLang): string {
  const t = ratingTranslations[lang] || ratingTranslations.es;
  if (score == null || score === 0) return t.notRated;
  return `${getRatingLevel(score, lang)} (${score} ${t.outOf} 5)`;
}
