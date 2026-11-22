// src/lib/newTab.tsx
// Hidden text for screen readers on links that open a new tab,
// so the change of context is never unexpected.

type Lang = "en" | "es";

export const newTabText = {
  en: "(opens in a new tab)",
  es: "(se abre en una pestaña nueva)",
};

export function NewTabHint({ lang = "es" }: { lang?: Lang | string }) {
  const text = lang === "en" ? newTabText.en : newTabText.es;
  return <span className="sr-only"> {text}</span>;
}
