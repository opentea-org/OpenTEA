import { cookies } from "next/headers";
import { getApps } from "@/src/lib/getApps";
import { AppsBrowser } from "@/components/AppsBrowser";
import { Breadcrumbs } from "@/components/Breadcrumbs";

// Page level translations
const pageTranslations = {
  en: {
    breadcrumb: "Apps",
    title: "Search apps",
  },
  es: {
    breadcrumb: "Apps",
    title: "Buscar aplicaciones",
  },
};

type Lang = "en" | "es";

export default async function AppsPage() {
  const cookieStore = await cookies();
  const cookieVal = cookieStore.get("lang")?.value;
  const lang: Lang = (cookieVal === "en" || cookieVal === "es") ? cookieVal : "es";

  const apps = await getApps(lang);
  const t = pageTranslations[lang];

  return (
    <main className="bg-gradient-to-r from-[#F7FAFF] via-[#FDFCFB] to-[#F3FBF6]">
      {/* Same width as the browser below, so the title lines up with the filters */}
      <div className="max-w-6xl mx-auto px-4 pt-8">
        <Breadcrumbs items={[{ label: t.breadcrumb }]} lang={lang} />
        <h1 className="text-3xl md:text-4xl font-bold text-brandGrayDark">{t.title}</h1>
      </div>

      <AppsBrowser apps={apps} lang={lang} />
    </main>
  );
}
