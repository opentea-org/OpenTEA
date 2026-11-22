"use client";

import Link from "next/link";
import { FaCircle, FaRegCircle, FaRegSmile, FaChevronRight } from "react-icons/fa";
import { PlatformIcon, getPlatformName } from "@/src/lib/platforms";
import { formatRating } from "@/src/lib/ratingTranslations";
import { formatEuros } from "@/src/lib/price";

const cardTranslations = {
  en: {
    free: "Free",
    freeIap: "Free with in-app purchases",
    subscription: "Subscription",
    paid: "Paid",
    perMonth: "per month",
    easeOfUse: "Ease of use",
    viewApp: "View app",
  },
  es: {
    free: "Gratis",
    freeIap: "Gratis con compras en la app",
    subscription: "Suscripción",
    paid: "De pago",
    perMonth: "al mes",
    easeOfUse: "Facilidad de uso",
    viewApp: "Ver app",
  },
};

interface AppCardProps {
  app: any;
  lang?: "en" | "es";
}

type PriceVariant = "green" | "yellow";

function getPriceDisplay(
  app: any,
  t: typeof cardTranslations.en,
  lang: "en" | "es"
): { label: string; variant: PriceVariant } {
  const type = (app.price_type_id || "").toLowerCase();
  const amount = app.price_amount_eur;

  if (type === "free") return { label: t.free, variant: "green" };
  if (type === "freemium") return { label: t.freeIap, variant: "green" };

  // With an amount: "4,99 €" or "4,99 € al mes"
  if (amount) {
    const price = formatEuros(amount, lang);
    return {
      label: type === "subscription" ? `${price} ${t.perMonth}` : price,
      variant: "yellow",
    };
  }

  // Paid but without a defined amount
  return { label: type === "subscription" ? t.subscription : t.paid, variant: "yellow" };
}

export function AppCard({ app, lang = "en" }: AppCardProps) {
  const t = cardTranslations[lang] || cardTranslations.en;
  const { label: priceValue, variant: priceVariant } = getPriceDisplay(app, t, lang);
  const ease = app.ease_of_use || 0;

  const priceBadgeClass =
    "inline-flex items-center rounded-md px-2 py-1 text-sm font-bold border " +
    (priceVariant === "green"
      ? "bg-green-50 text-green-800 border-green-300"
      : "bg-amber-50 text-amber-900 border-amber-300");

  return (
    // The whole card is one link: a bigger, clearer target than a small button.
    <Link
      href={`/apps/${app.id}`}
      className="group relative flex flex-col justify-between h-full rounded-2xl border-2 border-brandGray bg-white p-5 shadow-sm transition-colors hover:border-brandBlue"
    >
      <div className="flex-1">
        <div className="mb-4 space-y-2">
          {app.platforms?.length > 0 && (
            <ul className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-gray-700">
              {app.platforms.map((p: string, i: number) => (
                <li key={p + i} className="inline-flex items-center gap-1.5">
                  <PlatformIcon platform={p} />
                  {getPlatformName(p, lang)}
                </li>
              ))}
            </ul>
          )}

          <span className={priceBadgeClass}>{priceValue}</span>
        </div>

        <div className="flex gap-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-gray-900 group-hover:text-brandBlue transition-colors">{app.name}</h2>
            {app.short_description && (
              <p className="text-base text-gray-700 mt-2 line-clamp-4 leading-relaxed">{app.short_description}</p>
            )}
          </div>
          {app.image_urls?.[0] && (
            <div className="shrink-0">
              {/* Decorative: the app name is already in the heading */}
              <img src={app.image_urls[0]} alt="" className="w-16 h-16 rounded-xl object-cover border border-gray-100 shadow-sm" />
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-brandGray flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
            <FaRegSmile className="text-brandBlue" aria-hidden="true" /> <span>{t.easeOfUse}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1" aria-hidden="true">
              {[1, 2, 3, 4, 5].map((index) =>
                index <= ease ? (
                  <FaCircle key={index} className="text-brandBlue w-3 h-3" />
                ) : (
                  <FaRegCircle key={index} className="text-gray-500 w-3 h-3" />
                )
              )}
            </div>
            <span className="text-sm font-medium text-brandGrayDark">{formatRating(ease, lang)}</span>
          </div>
        </div>

        <span className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-bold text-white transition-colors group-hover:bg-brandBlue whitespace-nowrap">
          {t.viewApp}
          <FaChevronRight className="w-3 h-3" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
