import { getApps } from "@/src/lib/getApps";
import Hero from "@/components/Hero";
import BrandSlogan from "@/components/BrandSlogan";
import Principles from "@/components/Principles";
import { cookies } from "next/headers";
import {
  AacCategoryRow,
  RoutinesCategoryRow,
  SocialSkillsCategoryRow,
} from "@/components/HomeCategories";

import AppCategorization from "@/components/AppCategorization";
import Collaborate from "@/components/Collaborate";

type Lang = "en" | "es";

export default async function HomePage() {
  const cookieStore = await cookies();
  const cookieVal = cookieStore.get("lang")?.value;

  const lang: Lang = (cookieVal === "en" || cookieVal === "es") ? cookieVal : "es";
  const apps = await getApps(lang);

  return (
    <main>
      <Hero lang={lang} />
      <BrandSlogan lang={lang} />
      <Principles lang={lang} />
      
      <AppCategorization lang={lang} />
      
      <section>
        <AacCategoryRow apps={apps} lang={lang} />
        <RoutinesCategoryRow apps={apps} lang={lang} />
        <SocialSkillsCategoryRow apps={apps} lang={lang} />
      </section>

      <Collaborate lang={lang} />
    </main>
  );
}