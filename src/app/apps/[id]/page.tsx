// app/apps/[id]/page.tsx
import Link from "next/link";
import { cookies } from "next/headers";
import {
  FaGlobe,
  FaRegSmile,
  FaBrain,
  FaRegEye,
  FaCircle,
  FaRegCircle,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { getAppById } from "@/src/lib/getAppById";
import { RatingInfo } from "@/components/RatingInfo";
import NotFoundPage from "../../not-found";
import AppSuggestions from "@/components/AppSuggestions";
import { getCategoryName } from "@/src/lib/categoryTranslations";
import { ratingTranslations, formatRating } from "@/src/lib/ratingTranslations";
import { PlatformIcon, getPlatformName } from "@/src/lib/platforms";
import { NewTabHint } from "@/src/lib/newTab";
import { formatEuros } from "@/src/lib/price";
import { Breadcrumbs } from "@/components/Breadcrumbs";

type PageProps = {
  params: Promise<{ id: string }>;
};

const tDetail = {
  en: {
    apps: "Apps",
    updated: "Information updated on",
    visitWeb: "Visit the website",
    getPlay: "Get it on Google Play",
    getAppStore: "Download on the App Store",
    about: "About this app",
    accessibility: "Accessibility ratings",
    categories: "Categories",
    languages: "Languages",
    free: "Free",
    freemium: "Free with in-app purchases",
    subscription: "Subscription",
    paid: "Paid",
    perMonth: "per month",
  },
  es: {
    apps: "Apps",
    updated: "Información actualizada el",
    visitWeb: "Visitar la web",
    getPlay: "Descargar en Google Play",
    getAppStore: "Descargar en App Store",
    about: "Sobre esta app",
    accessibility: "Valoración de accesibilidad",
    categories: "Categorías",
    languages: "Idiomas",
    free: "Gratis",
    freemium: "Gratis con compras en la app",
    subscription: "Suscripción",
    paid: "De pago",
    perMonth: "al mes",
  },
};

type Lang = "en" | "es";

function getLanguageName(code: string, locale: string): string {
  try {
    const displayNames = new Intl.DisplayNames([locale], { type: "language" });
    const name = displayNames.of(code) || code.toUpperCase();
    // Capital first letter, like the category tags ("Inglés", not "inglés")
    return name.charAt(0).toLocaleUpperCase(locale) + name.slice(1);
  } catch {
    return code.toUpperCase();
  }
}

function RatingRow({
  icon: Icon,
  label,
  hint,
  score,
  colorClass,
  lang,
}: {
  icon: React.ElementType;
  label: string;
  hint: string;
  score: number | null;
  colorClass: string;
  lang: Lang;
}) {
  return (
    <div className="p-4 bg-white rounded-xl border-2 border-brandGray space-y-2">
      <div className="flex items-center gap-3">
        <Icon className={`w-5 h-5 shrink-0 ${colorClass}`} aria-hidden="true" />
        <h3 className="font-bold text-brandGrayDark text-base">{label}</h3>
      </div>
      <p className="text-sm text-gray-700">{hint}</p>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <div className="flex gap-1.5" aria-hidden="true">
          {[1, 2, 3, 4, 5].map((i) =>
            score && i <= score ? (
              <FaCircle key={i} className={`w-4 h-4 ${colorClass}`} />
            ) : (
              <FaRegCircle key={i} className="w-4 h-4 text-gray-500" />
            )
          )}
        </div>
        <span className="text-base font-bold text-brandGrayDark whitespace-nowrap">{formatRating(score, lang)}</span>
      </div>
    </div>
  );
}

function formatPrice(app: any, t: typeof tDetail.en, lang: Lang): string {
  const type = app.price_type_id?.toLowerCase();
  if (type === "free") return t.free;
  if (type === "freemium") return t.freemium;
  if ((type === "subscription" || type === "paid") && app.price_amount_eur) {
    const price = formatEuros(app.price_amount_eur, lang);
    return type === "subscription" ? `${price} ${t.perMonth}` : price;
  }
  return type === "subscription" ? t.subscription : t.paid;
}

// Full date with the name of the day, e.g. "lunes, 3 de marzo de 2025"
function formatDate(dateString: string | null, lang: Lang) {
  if (!dateString) return null;
  return new Date(dateString).toLocaleDateString(lang === "es" ? "es-ES" : "en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function AppDetailPage({ params }: PageProps) {
  const { id } = await params;
  const cookieStore = await cookies();
  const cookieLang = cookieStore.get("lang")?.value;
  const lang: Lang = cookieLang === "en" || cookieLang === "es" ? cookieLang : "es";

  const t = tDetail[lang];
  const rt = ratingTranslations[lang];
  const app = await getAppById(id, lang);

  if (!app) return <NotFoundPage />;

  const priceType = app.price_type_id?.toLowerCase();
  const priceBadgeStyles =
    priceType === "free" || priceType === "freemium"
      ? "bg-green-50 text-green-800 border-green-300"
      : "bg-amber-50 text-amber-900 border-amber-300";

  const tagClass =
    "px-3 py-1.5 rounded-full bg-brandGrayLight text-sm font-medium text-brandGrayDark border-2 border-brandGray hover:border-brandBlue hover:text-brandBlue transition-colors";

  return (
    <main className="min-h-screen bg-gradient-to-r from-[#F7FAFF] via-[#FDFCFB] to-[#F3FBF6]">
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <Breadcrumbs items={[{ label: t.apps, href: "/apps" }, { label: app.name }]} lang={lang} />

        {/* Grid order: info, then ratings, then suggestions. On mobile this puts the ratings
            before the suggestions box; on desktop the ratings column spans both rows. */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:items-start">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white rounded-3xl border-2 border-brandGray p-6 md:p-8">
              <div className="flex flex-col sm:flex-row gap-6">
                {app.image_urls?.[0] && (
                  <img src={app.image_urls[0]} alt="" className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl object-cover border border-brandGrayLight" />
                )}
                <div className="flex-1 space-y-3">
                  <h1 className="text-3xl font-bold text-brandGrayDark">{app.name}</h1>
                  {app.platforms?.length > 0 && (
                    <ul className="flex flex-wrap gap-x-4 gap-y-1 text-base text-gray-700">
                      {app.platforms.map((p: string) => (
                        <li key={p} className="inline-flex items-center gap-1.5">
                          <PlatformIcon platform={p} />
                          {getPlatformName(p, lang)}
                        </li>
                      ))}
                    </ul>
                  )}
                  <span className={`inline-block px-2.5 py-1 rounded-md text-sm font-bold border ${priceBadgeStyles}`}>{formatPrice(app, t, lang)}</span>
                  {app.updated_at && (
                    <p className="text-sm text-gray-700">{t.updated} {formatDate(app.updated_at, lang)}</p>
                  )}
                  <p className="text-lg text-brandGrayDark leading-relaxed">{app.short_description}</p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t-2 border-gray-100 flex flex-wrap items-center gap-3 sm:gap-4">
                {app.play_store_link && (
                  <a href={app.play_store_link} target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80">
                    <img src="/download_buttons/play-store.png" alt={t.getPlay} className="h-11 w-auto" />
                    <NewTabHint lang={lang} />
                  </a>
                )}
                {app.app_store_link && (
                  <a href={app.app_store_link} target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80">
                    <img src="/download_buttons/app-store.png" alt={t.getAppStore} className="h-11 w-auto" />
                    <NewTabHint lang={lang} />
                  </a>
                )}
                {app.website && (
                  <a
                    href={app.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center justify-center gap-2 px-6 rounded-lg bg-gray-900 text-white font-bold text-base transition-colors hover:bg-brandBlue"
                  >
                    <FaGlobe className="text-lg" aria-hidden="true" />
                    <span>{t.visitWeb}</span>
                    <FaExternalLinkAlt className="w-3 h-3" aria-hidden="true" />
                    <NewTabHint lang={lang} />
                  </a>
                )}
              </div>
            </section>

            {app.long_description && (
              <section className="bg-white rounded-3xl border-2 border-brandGray p-6 md:p-8">
                <h2 className="text-xl font-bold text-brandGrayDark mb-4">{t.about}</h2>
                <div className="max-w-prose text-lg text-brandGrayDark whitespace-pre-line leading-relaxed">{app.long_description}</div>
              </section>
            )}

          </div>

          <div className="space-y-6 lg:row-span-2">
            <section className="bg-white rounded-3xl border-2 border-brandGray p-6">
              <h2 className="text-xl font-bold text-brandGrayDark mb-6 flex items-center">
                {t.accessibility} <RatingInfo />
              </h2>
              <div className="space-y-3">
                <RatingRow icon={FaRegSmile} label={rt.easeTitle} hint={rt.easeHint} score={app.ease_of_use} colorClass="text-brandBlue" lang={lang} />
                <RatingRow icon={FaBrain} label={rt.cogTitle} hint={rt.cogHint} score={app.cognitive_load} colorClass="text-purple-700" lang={lang} />
                <RatingRow icon={FaRegEye} label={rt.sensoryTitle} hint={rt.sensoryHint} score={app.sensory_load} colorClass="text-teal-700" lang={lang} />
              </div>
            </section>

            <section className="bg-white rounded-3xl border-2 border-brandGray p-6 space-y-6">
              {app.categories?.length > 0 && (
                <div>
                  <h2 className="text-base font-bold text-brandGrayDark mb-3">{t.categories}</h2>
                  <div className="flex flex-wrap gap-2">
                    {app.categories.map((c: string) => (
                      <Link href={`/apps?category=${c}`} key={c} className={tagClass}>
                        {getCategoryName(c, lang)}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              {app.languages?.length > 0 && (
                <div>
                  <h2 className="text-base font-bold text-brandGrayDark mb-3">{t.languages}</h2>
                  <div className="flex flex-wrap gap-2">
                    {app.languages.map((code: string) => (
                      <Link href={`/apps?language=${code}`} key={code} className={tagClass}>
                        {getLanguageName(code, lang)}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </section>
          </div>

          <div className="lg:col-span-2">
            <AppSuggestions lang={lang} />
          </div>
        </div>
      </div>
    </main>
  );
}
