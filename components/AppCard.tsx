"use client";

import Link from "next/link";
import {
  FaAndroid,
  FaApple,
  FaGlobe,
  FaWindows,
  FaLinux,
  FaMobileAlt,
  FaCircle,
  FaRegCircle,
  FaRegSmile,
} from "react-icons/fa";

const cardTranslations = {
  en: {
    free: "FREE",
    freeIap: "FREE (IAP)",
    subscription: "SUBSCRIPTION",
    paid: "PAID",
    month: "MONTH",
    easeOfUse: "Ease of Use",
    viewApp: "View App",
  },
  es: {
    free: "GRATIS",
    freeIap: "GRATIS (IAP)",
    subscription: "SUSCRIPCIÓN",
    paid: "DE PAGO",
    month: "MES",
    easeOfUse: "Facilidad de uso",
    viewApp: "Ver App",
  },
};

interface AppCardProps {
  app: any;
  lang?: "en" | "es";
}

type PriceVariant = "green" | "yellow" | "default";

// --- Lógica de precio corregida ---
function getPriceDisplay(
  app: any,
  t: typeof cardTranslations.en
): { label: string; variant: PriceVariant } {
  const type = (app.price_type_id || "").toLowerCase();
  const amount = app.price_amount_eur;

  if (type === "free") return { label: t.free, variant: "green" };
  if (type === "freemium") return { label: t.freeIap, variant: "green" };
  
  // Si tiene monto, mostramos: "X EUR" o "X EUR/MES"
  if (amount) {
    const priceStr = `${amount} EUR`;
    return { 
      label: type === "subscription" ? `${priceStr}/${t.month}` : priceStr, 
      variant: "yellow" 
    };
  }

  // Fallback si es de pago pero no tiene monto definido
  return { label: type === "subscription" ? t.subscription : t.paid, variant: "yellow" };
}

function platformIcon(platform: string) {
  const p = (platform || "").toLowerCase();
  if (p.includes("android")) return <FaAndroid />;
  if (p.includes("ios") || p.includes("iphone") || p.includes("ipad")) return <FaApple />;
  if (p.includes("windows")) return <FaWindows />;
  if (p.includes("linux")) return <FaLinux />;
  if (p.includes("web") || p.includes("browser")) return <FaGlobe />;
  return <FaMobileAlt />;
}

export function AppCard({ app, lang = "en" }: AppCardProps) {
  const t = cardTranslations[lang] || cardTranslations.en;
  const { label: priceValue, variant: priceVariant } = getPriceDisplay(app, t);

  const priceBadgeBase = "inline-flex items-center rounded-md px-2 py-1 text-[10px] sm:text-xs font-bold border ring-1 ring-inset uppercase tracking-wide ";
  const priceBadgeVariant = priceVariant === "green" 
    ? "bg-green-50 text-green-700 border-green-200 ring-green-600/10" 
    : "bg-amber-50 text-amber-800 border-amber-200 ring-amber-600/10";

  const renderRating = (score: number | null) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((index) => (
        <span key={index}>
          {score && index <= score ? <FaCircle className="text-brandBlue w-3 h-3" /> : <FaRegCircle className="text-gray-300 w-3 h-3" />}
        </span>
      ))}
    </div>
  );

  return (
    <div className="group relative flex flex-col justify-between h-full rounded-2xl border border-brandGray bg-white p-5 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
      <div className="flex-1">
        <div className="flex flex-wrap items-start justify-between mb-4 gap-1">
          {app.platforms?.length > 0 ? (
            <div className="inline-flex items-center gap-1.5 bg-brandGrayLight rounded-xl px-2 h-7">
              {app.platforms.map((p: string, i: number) => (
                <span key={p + i} className="text-brandGrayDark/50 text-sm">{platformIcon(p)}</span>
              ))}
            </div>
          ) : <div className="h-7"></div>}

          <span className={priceBadgeBase + priceBadgeVariant}>{priceValue}</span>
        </div>

        <div className="flex gap-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-gray-900 group-hover:text-brandBlue transition-colors truncate">{app.name}</h2>
            {app.short_description && (
              <p className="text-sm text-gray-500 mt-1 line-clamp-4 leading-relaxed">{app.short_description}</p>
            )}
          </div>
          {app.image_urls?.[0] && (
            <div className="shrink-0">
              <img src={app.image_urls[0]} alt={app.name} className="w-16 h-16 rounded-xl object-cover border border-gray-100 shadow-sm" />
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-brandGray flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            <FaRegSmile className="text-brandGrayDark" /> <span>{t.easeOfUse}</span>
          </div>
          <div className="flex items-center gap-2">
            {renderRating(app.ease_of_use)}
            <span className="text-xs font-medium text-brandGrayDark">{app.ease_of_use || 0}/5</span>
          </div>
        </div>

        <Link href={`/apps/${app.id}`} className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-brandBlue whitespace-nowrap">
          {t.viewApp}
        </Link>
      </div>
    </div>
  );
}