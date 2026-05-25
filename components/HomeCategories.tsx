"use client";

import { useMemo } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppCard } from "./AppCard";
import { 
  getCategoryName, 
  getCategoryDescription, 
  getCategoryIcon, 
  SupportedLang 
} from "@/src/lib/categoryTranslations";

type CategoryKey = "symbol-boards" | "visual-schedules" | "social-stories";

interface CategoryRowProps {
  apps: any[];
  lang: SupportedLang;
  category: CategoryKey;
}

const VISUAL_CONFIG: Record<CategoryKey, { bgClass: string; iconClass: string }> = {
  "symbol-boards": { bgClass: "bg-brandBlue/5", iconClass: "text-brandBlue" },
  "visual-schedules": { bgClass: "bg-teal-50/50", iconClass: "text-teal-600" },
  "social-stories": { bgClass: "bg-purple-50/50", iconClass: "text-purple-600" },
};

const buttonTranslations = {
  en: "See all apps",
  es: "Ver todas las apps"
};

function selectTopAppsByCategory(apps: any[], categoryId: string): any[] {
  const filtered = apps.filter((app) => {
    const categories: string[] = app.categories ?? [];
    return categories.includes(categoryId); 
  });

  filtered.sort((a, b) => {
    const easeDiff = (b.ease_of_use || 0) - (a.ease_of_use || 0);
    if (easeDiff !== 0) return easeDiff;

    const isFreeA = a.price_type_id === 'free' || a.price_type_id === 'freemium';
    const isFreeB = b.price_type_id === 'free' || b.price_type_id === 'freemium';

    if (isFreeA && !isFreeB) return -1;
    if (!isFreeA && isFreeB) return 1;

    const dateA = new Date(a.updated_at || 0).getTime();
    const dateB = new Date(b.updated_at || 0).getTime();

    return dateB - dateA;
  });

  return filtered.slice(0, 3);
}

function CategoryRow({ apps, lang, category }: CategoryRowProps) {
  // Extraer datos dinámicamente de categoryTranslations
  const title = getCategoryName(category, lang);
  const description = getCategoryDescription(category, lang);
  const Icon = getCategoryIcon(category);
  
  const visual = VISUAL_CONFIG[category];
  const buttonLabel = buttonTranslations[lang] || buttonTranslations.es;

  const topApps = useMemo(
    () => selectTopAppsByCategory(apps, category),
    [apps, category]
  );

  if (!topApps.length) return null;

  return (
    <section className={`${visual.bgClass} border-b border-brandGrayLight/60 py-12 lg:py-16`}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">

        <div className="lg:w-1/3 space-y-5 flex flex-col justify-center shrink-0">
          <div className="flex items-center gap-4">
            {Icon && (
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm shrink-0">
                <FontAwesomeIcon icon={Icon} className={`${visual.iconClass} text-xl`} />
              </span>
            )}
            <h2 className="text-2xl font-bold text-brandGrayDark">
              {title}
            </h2>
          </div>

          <p className="text-base text-gray-600 leading-relaxed">
            {description}
          </p>

          <div className="pt-2">
            <Link
              href={`/apps?category=${category}`}
              className="inline-flex items-center justify-center rounded-full bg-brandBlue px-6 py-2.5 text-sm font-semibold text-white hover:bg-brandBlue/90 transition-all shadow-sm"
            >
              {buttonLabel}
            </Link>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {topApps.map((app) => (
            <AppCard key={app.id} app={app} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function SymbolBoardsRow(props: { apps: any[]; lang: SupportedLang }) {
  return <CategoryRow {...props} category="symbol-boards" />;
}

export function VisualSchedulesRow(props: { apps: any[]; lang: SupportedLang }) {
  return <CategoryRow {...props} category="visual-schedules" />;
}

export function SocialStoriesRow(props: { apps: any[]; lang: SupportedLang }) {
  return <CategoryRow {...props} category="social-stories" />;
}