// src/lib/price.ts
// Formats a price in euros the way people read it in each language: "4,99 €" / "€4.99".
// Whole amounts have no decimals: "300 €", not "300,00 €".
export function formatEuros(amount: number | string, lang: "en" | "es"): string {
  const value = Number(amount);
  if (Number.isNaN(value)) return `${amount} €`;
  const decimals = Number.isInteger(value) ? 0 : 2;
  return value.toLocaleString(lang === "es" ? "es-ES" : "en-GB", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
