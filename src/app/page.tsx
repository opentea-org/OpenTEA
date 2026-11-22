import { cookies } from "next/headers";
import { getApps } from "@/src/lib/getApps";

import Hero from "@/components/Hero";
import BrandSlogan from "@/components/BrandSlogan";
import Principles from "@/components/Principles";
import Collaborate from "@/components/Collaborate";
import { EvaluationCriteria } from "@/components/EvaluationCriteria";
import {
  SymbolBoardsRow,
  VisualSchedulesRow,
  SocialStoriesRow,
} from "@/components/HomeCategories"; 
import CategoriesSection from "@/components/CategoriesSection";

type Lang = "en" | "es";

const sectionText = {
  en: {
    title: "Featured apps",
    subtitle: "Some apps from our directory, grouped by what they do."
  },
  es: {
    title: "Apps destacadas",
    subtitle: "Algunas apps de nuestro directorio, agrupadas según lo que hacen."
  }
};

export default async function HomePage() {
  const cookieStore = await cookies();
  const cookieVal = cookieStore.get("lang")?.value;

  const lang: Lang = (cookieVal === "en" || cookieVal === "es") ? cookieVal : "es";
  const apps = await getApps(lang);
  const content = sectionText[lang];

  return (
    <main>
      <Hero lang={lang} />
      <BrandSlogan lang={lang} />
      <Principles lang={lang} />

      <EvaluationCriteria lang={lang} />
      <CategoriesSection lang={lang} />
      
      <section className="bg-white pt-24 pb-24 border-t border-brandGrayLight/40">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-brandGrayDark mb-4">
            {content.title}
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            {content.subtitle}
          </p>
        </div>
      </section>

      <div>
        <SymbolBoardsRow apps={apps} lang={lang} />
        <VisualSchedulesRow apps={apps} lang={lang} />
        <SocialStoriesRow apps={apps} lang={lang} />
      </div>

      <Collaborate lang={lang} />
    </main>
  );
}