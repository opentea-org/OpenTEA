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
      <div className="max-w-6xl mx-auto px-6 space-y-8">

        {/* Category header on top, full width, so the cards below get the whole row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-4">
              {Icon && (
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm shrink-0">
                  <FontAwesomeIcon icon={Icon} className={`${visual.iconClass} text-xl`} aria-hidden="true" />
                </span>
              )}
              <h2 className="text-2xl font-bold text-brandGrayDark">
                {title}
              </h2>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed">
              {description}
            </p>
          </div>

          <Link
            href={`/apps?category=${category}`}
            className="inline-flex shrink-0 items-center justify-center self-start md:self-auto rounded-full bg-brandBlue px-6 py-3 text-base font-bold text-white hover:bg-brandBlue/90 transition-colors"
          >
            {buttonLabel}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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