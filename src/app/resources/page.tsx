// app/resources/page.tsx
import { cookies } from "next/headers";
import { FaGraduationCap, FaPodcast, FaExternalLinkAlt } from "react-icons/fa";
import type { IconType } from "react-icons";
import { highlightEmphasis } from "@/src/utils/formatEmphasis";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { NewTabHint } from "@/src/lib/newTab";

// --- Types ---
type LocalizedText = { en: string; es: string };

type Resource = {
  id: string;
  title: LocalizedText;
  provider: LocalizedText;
  type: LocalizedText;
  description: LocalizedText;
  link: string;
  icon: IconType;
  iconColor: string;
  iconBg: string;
};

// --- Translations ---
const uiTranslations = {
  en: {
    breadcrumb: "Resources",
    title: "Resources to learn about autism",
    subtitle: "*Free resources* that helped us learn more about autism.",
    view: "Go to the resource",
    by: "Made by",
  },
  es: {
    breadcrumb: "Recursos",
    title: "Recursos para aprender sobre autismo",
    subtitle: "*Recursos gratis* que nos han ayudado a aprender más sobre el autismo.",
    view: "Ir al recurso",
    by: "Hecho por",
  },
};

const resources: Resource[] = [
  {
    id: "orange-uam-course",
    // Official course title, kept as it is
    title: {
      en: "Mobile apps and other technologies for people with ASD",
      es: "Aplicaciones móviles y otras tecnologías para personas con TEA",
    },
    provider: {
      en: "Orange Foundation and Autonomous University of Madrid",
      es: "Fundación Orange y Universidad Autónoma de Madrid",
    },
    type: { en: "Online course", es: "Curso online" },
    description: {
      en: "A free online course. It teaches how to use phones and tablets to help autistic people.",
      es: "Un curso online y gratis. Enseña a usar móviles y tabletas para ayudar a personas autistas.",
    },
    link: "https://online.orangedigitalcenter.es/courses/332",
    icon: FaGraduationCap,
    iconColor: "text-orange-600",
    iconBg: "bg-orange-50",
  },
  {
    id: "gatea-podcast",
    title: {
      en: "Gatea Podcast: The Autism Podcast",
      es: "Gatea Podcast: El Podcast del Autismo",
    },
    provider: {
      en: "Gatea Atención Global",
      es: "Gatea Atención Global",
    },
    type: { en: "Podcast (audio and video)", es: "Podcast (audio y vídeo)" },
    description: {
      en: "Talks with professionals. They talk about therapies, daily life, diagnosis and support for families.",
      es: "Charlas con profesionales. Hablan de terapias, del día a día, del diagnóstico y del apoyo a las familias.",
    },
    link: "https://www.youtube.com/@gateaatencionglobal9101/videos",
    icon: FaPodcast,
    iconColor: "text-purple-700",
    iconBg: "bg-purple-50",
  },
];

// --- Main Page (Server Component) ---
export default async function ResourcesPage() {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("lang")?.value === "en" ? "en" : "es") as "en" | "es";
  const ui = uiTranslations[lang];

  return (
    <main className="min-h-screen bg-gradient-to-r from-[#F7FAFF] via-[#FDFCFB] to-[#F3FBF6]">
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <Breadcrumbs items={[{ label: ui.breadcrumb }]} lang={lang} />

        <div className="mb-10 max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold text-brandGrayDark mb-4">{ui.title}</h1>
          <p
            className="text-lg text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: highlightEmphasis(ui.subtitle, true) }}
          />
        </div>

        <div className="flex flex-wrap gap-6 md:gap-8 justify-center mb-20">
          {resources.map((res) => (
            // The whole card is one link, like the app cards
            <a
              key={res.id}
              href={res.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between bg-white rounded-3xl border-2 border-brandGray p-6 transition-colors hover:border-brandBlue w-full md:flex-1 md:min-w-[45%] lg:min-w-[30%] lg:max-w-[32.5%]"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className={`h-12 w-12 shrink-0 rounded-2xl flex items-center justify-center ${res.iconBg} ${res.iconColor}`}>
                    <res.icon className="text-xl" aria-hidden="true" />
                  </div>
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                    {res.type[lang]}
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  <h2 className="text-xl font-bold text-brandGrayDark leading-tight group-hover:text-brandBlue transition-colors">
                    {res.title[lang]}
                  </h2>
                  <p className="text-base font-medium text-gray-700">
                    {ui.by} {res.provider[lang]}
                  </p>
                  <p className="text-base text-gray-700 leading-relaxed">{res.description[lang]}</p>
                </div>
              </div>
              <div className="pt-4 border-t-2 border-brandGrayLight">
                <span className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-base font-bold text-white transition-colors group-hover:bg-brandBlue">
                  {ui.view}
                  <FaExternalLinkAlt className="w-3 h-3" aria-hidden="true" />
                </span>
                <NewTabHint lang={lang} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
