// app/apps/[id]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { cookies } from "next/headers";
import {
  FaAndroid,
  FaApple,
  FaGlobe,
  FaWindows,
  FaLinux,
  FaMobileAlt,
  FaRegSmile,
  FaBrain,
  FaRegEye,
  FaCircle,
  FaRegCircle,
  FaChevronLeft,
} from "react-icons/fa";
import { getAppById } from "@/src/lib/getAppById";
import { RatingInfo } from "@/components/RatingInfo";
import NotFoundPage from "../../not-found";
import AppSuggestions from "@/components/AppSuggestions";
import { getCategoryName } from "@/src/lib/categoryTranslations"; // 1. Importar traductor de categorías

type PageProps = {
  params: Promise<{ id: string }>;
};

const tDetail = {
  en: {
    back: "Back to apps",
    updated: "Information updated:",
    visitWeb: "Visit Website",
    about: "About this app",
    accessibility: "Accessibility Ratings",
    categories: "Categories",
    languages: "Languages",
    ease: "Ease of Use",
    cognitive: "Cognitive Load",
    sensory: "Sensory Load",
    free: "FREE",
    freemium: "FREE WITH IN-APP PURCHASES",
    subscription: "SUBSCRIPTION",
    paid: "PAID",
    month: "MONTH"
  },
  es: {
    back: "Volver a apps",
    updated: "Información actualizada:",
    visitWeb: "Visitar Web",
    about: "Sobre esta app",
    accessibility: "Valoración de Accesibilidad",
    categories: "Categorías",
    languages: "Idiomas",
    ease: "Facilidad de Uso",
    cognitive: "Carga Cognitiva",
    sensory: "Carga Sensorial",
    free: "GRATIS",
    freemium: "GRATIS (COMPRAS APP)",
    subscription: "SUSCRIPCIÓN",
    paid: "DE PAGO",
    month: "MES"
  }
};

function getLanguageName(code: string, locale: string): string {
  try {
    const displayNames = new Intl.DisplayNames([locale], { type: 'language' });
    return displayNames.of(code) || code.toUpperCase();
  } catch (e) { return code.toUpperCase(); }
}

function PlatformIcon({ platform }: { platform: string }) {
  const p = (platform || "").toLowerCase();
  if (p.includes("android")) return <FaAndroid />;
  if (p.includes("ios") || p.includes("iphone") || p.includes("ipad")) return <FaApple />;
  if (p.includes("windows")) return <FaWindows />;
  if (p.includes("linux")) return <FaLinux />;
  if (p.includes("web") || p.includes("browser")) return <FaGlobe />;
  return <FaMobileAlt />;
}

function RatingRow({ icon: Icon, label, score, colorClass }: any) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-brandGray gap-4">
      <div className="flex items-center gap-3">
        <div className={`p-2 bg-white rounded-full shadow-sm ${colorClass} shrink-0`}><Icon className="w-5 h-5" /></div>
        <span className="font-medium text-brandGrayDark text-sm md:text-base leading-tight">{label}</span>
      </div>
      <div className="flex flex-col items-center gap-1 shrink-0">
        <div className="flex gap-1.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <span key={i}>{score && i <= score ? <FaCircle className={`w-3.5 h-3.5 ${colorClass}`} /> : <FaRegCircle className="w-3.5 h-3.5 text-brandGray" />}</span>
          ))}
        </div>
        <span className="text-xs font-semibold text-brandGrayDark/70">{score != null ? `${score}/5` : "—"}</span>
      </div>
    </div>
  );
}

function formatPrice(app: any, t: typeof tDetail.en): string {
  const type = app.price_type_id?.toLowerCase();
  if (type === "free") return t.free;
  if (type === "freemium") return t.freemium;
  if (type === "subscription" || type === "paid") {
    if (app.price_amount_eur) {
      const label = `${app.price_amount_eur} EUR`;
      return type === "subscription" ? `${label}/${t.month}` : label;
    }
  }
  return type === "subscription" ? t.subscription : t.paid;
}

function formatDate(dateString: string | null, locale: string) {
  if (!dateString) return null;
  return new Date(dateString).toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" });
}

export default async function AppDetailPage({ params }: PageProps) {
  const { id } = await params;
  const cookieStore = await cookies();
  const lang = (cookieStore.get("lang")?.value === "en" || cookieStore.get("lang")?.value === "es") 
    ? cookieStore.get("lang")!.value as "en" | "es" 
    : "es";
  
  const t = tDetail[lang];
  const app = await getAppById(id, lang);

  if (!app) return <NotFoundPage />;

  const priceType = app.price_type_id?.toLowerCase();
  const priceBadgeStyles = (priceType === "free" || priceType === "freemium") 
    ? "bg-green-50 text-green-700 border-green-200 ring-green-600/10" 
    : "bg-amber-50 text-amber-800 border-amber-200 ring-amber-600/10";

  return (
    <main className="min-h-screen bg-gradient-to-r from-[#F7FAFF] via-[#FDFCFB] to-[#F3FBF6]">
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <Link href="/apps" className="group inline-flex items-center text-sm font-medium text-brandGrayDark hover:text-brandBlue mb-8 transition-colors">
          <FaChevronLeft className="mr-2 w-3 h-3" /> {t.back}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white rounded-3xl border border-brandGray p-6 md:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row gap-6">
                {app.image_urls?.[0] && (
                  <img src={app.image_urls[0]} alt={app.name} className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl object-cover border border-brandGrayLight shadow-sm" />
                )}
                <div className="flex-1 space-y-3">
                  <h1 className="text-3xl font-bold text-brandGrayDark tracking-tight">{app.name}</h1>
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    {app.platforms?.map((p: string) => <PlatformIcon key={p} platform={p} />)}
                    <span className={`px-2.5 py-1 rounded-md font-bold border uppercase ${priceBadgeStyles}`}>{formatPrice(app, t)}</span>
                  </div>
                  {app.updated_at && <span className="text-xs text-gray-400 font-medium">{t.updated} {formatDate(app.updated_at, lang)}</span>}
                  <p className="text-lg text-brandGrayDark leading-relaxed">{app.short_description}</p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center gap-3 sm:gap-4">
                {app.play_store_link && (
                  <a href={app.play_store_link} target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80">
                    <img src="/download_buttons/play-store.png" alt="Get it on Google Play" className="h-10 sm:h-11 w-auto" />
                  </a>
                )}
                {app.app_store_link && (
                  <a href={app.app_store_link} target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80">
                    <img src="/download_buttons/app-store.png" alt="Download on the App Store" className="h-10 sm:h-11 w-auto" />
                  </a>
                )}
                {app.website && (
                  <a href={app.website} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 sm:h-11 items-center justify-center gap-2 px-6 rounded-lg bg-gray-900 text-white font-medium text-sm transition-all hover:bg-brandBlue hover:shadow-md">
                    <FaGlobe className="text-lg" />
                    <span>{t.visitWeb}</span>
                  </a>
                )}
              </div>
            </section>

            {app.long_description && (
              <section className="bg-white rounded-3xl border border-brandGray p-6 md:p-8 shadow-sm">
                <h3 className="text-lg font-bold text-brandGrayDark mb-4">{t.about}</h3>
                <div className="prose max-w-none text-brandGrayDark whitespace-pre-line leading-relaxed">{app.long_description}</div>
              </section>
            )}

            <AppSuggestions lang={lang} />
          </div>

          <div className="space-y-6">
            <section className="bg-white rounded-3xl border border-brandGray p-6 shadow-sm">
              <h3 className="text-lg font-bold text-brandGrayDark mb-6 flex items-center gap-2">{t.accessibility} <RatingInfo /></h3>
              <div className="space-y-3">
                <RatingRow icon={FaRegSmile} label={t.ease} score={app.ease_of_use} colorClass="text-brandBlue" />
                <RatingRow icon={FaBrain} label={t.cognitive} score={app.cognitive_load} colorClass="text-purple-400" />
                <RatingRow icon={FaRegEye} label={t.sensory} score={app.sensory_load} colorClass="text-teal-600" />
              </div>
            </section>

            <section className="bg-white rounded-3xl border border-brandGray p-6 shadow-sm space-y-6">
              {app.categories?.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-brandGrayDark uppercase tracking-wider mb-3">{t.categories}</h4>
                  <div className="flex flex-wrap gap-2">
                    {/* 2. Envolver categoría en Link y usar getCategoryName */}
                    {app.categories.map((c: string) => (
                      <Link 
                        href={`/apps?category=${c}`} 
                        key={c} 
                        className="px-3 py-1 rounded-full bg-brandGrayLight text-xs font-medium border border-brandGray hover:border-brandBlue hover:text-brandBlue transition-colors cursor-pointer"
                      >
                        {getCategoryName(c, lang)}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              {app.languages?.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-brandGrayDark uppercase tracking-wider mb-2">{t.languages}</h4>
                  <div className="flex flex-wrap gap-2">
                    {/* 3. Envolver lenguaje en Link */}
                    {app.languages.map((code: string) => (
                      <Link 
                        href={`/apps?language=${code}`}
                        key={code} 
                        className="px-3 py-1 rounded-full bg-brandGrayLight text-xs font-medium border border-brandGray hover:border-brandBlue hover:text-brandBlue transition-colors cursor-pointer"
                      >
                        {getLanguageName(code, lang)}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}