// app/about/page.tsx

import { cookies } from "next/headers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faLightbulb,
  faEnvelope,
  faCode,
  faUniversalAccess,
} from "@fortawesome/free-solid-svg-icons";
import { CONTACT_LINK } from "@/data/contact-info";
import { highlightEmphasis } from "@/src/utils/formatEmphasis";
import { Breadcrumbs } from "@/components/Breadcrumbs";

// --- Translations ---
// Written following Lectura Fácil: short sentences, one idea per sentence,
// literal language. Syntax: **bold**, __blue__, *green*
const translations = {
  en: {
    title: "About us",
    subtitle: "OpenTEA helps families find useful apps for autism.",

    // 1. Inspiration
    inspirationTitle: "Why I started OpenTEA",
    inspirationText:
      "I have an autistic family member. I know how hard it is to find apps that help. We spent many hours trying apps that did not work for us. Finding useful apps should not be so hard or so expensive.",

    // 2. What is OpenTEA
    meaningTitle: "What does OpenTEA mean?",
    meaningText:
      "__TEA__ is the Spanish short name for __Autism Spectrum Disorder__. __Open__ means that the information is open to everyone. We want information about apps to be easy to find and easy to understand.",

    // 3. Mission
    missionTitle: "How we help you",
    missionText: "We want to **save you time and worry**. To do this:",
    missionList: [
      "We collect useful apps in one place.",
      "We rate how each app affects the senses and learning.",
      "We share free resources to learn about autism.",
    ],

    // 4. Open Source
    openSourceTitle: "A community project",
    openSourceText:
      "The code of this website is **open** (in English, *open source*). Anyone can see it and help improve it. This keeps the website free and up to date.",

    contactTitle: "Do you have a question or an idea?",
    contactButton: "Send us an email",
  },
  es: {
    title: "Quiénes somos",
    subtitle: "OpenTEA ayuda a las familias a encontrar apps útiles para el autismo.",

    // 1. Inspiration
    inspirationTitle: "Por qué empecé OpenTEA",
    inspirationText:
      "Tengo un familiar con autismo. Sé lo difícil que es encontrar apps que le ayuden. Pasamos muchas horas probando apps que no nos servían. Encontrar apps útiles no debería ser tan difícil ni tan caro.",

    // 2. What is OpenTEA
    meaningTitle: "¿Qué significa OpenTEA?",
    meaningText:
      "__TEA__ son las siglas de __Trastorno del Espectro Autista__. __Open__ significa abierto en inglés. Queremos que la información sobre apps esté abierta a todo el mundo. Queremos que sea fácil de encontrar y de entender.",

    // 3. Mission
    missionTitle: "Cómo te ayudamos",
    missionText: "Queremos **ahorrarte tiempo y preocupaciones**. Para eso:",
    missionList: [
      "Reunimos apps útiles en un solo lugar.",
      "Valoramos cómo afecta cada app a los sentidos y al aprendizaje.",
      "Compartimos recursos gratis para aprender sobre el autismo.",
    ],

    // 4. Open Source
    openSourceTitle: "Un proyecto de la comunidad",
    openSourceText:
      "El código de esta web es **abierto** (en inglés, *open source*). Cualquier persona puede verlo y ayudar a mejorarlo. Así la web sigue siendo gratis y está al día.",

    contactTitle: "¿Tienes una pregunta o una idea?",
    contactButton: "Envíanos un correo",
  },
};

const sectionTitle = "text-2xl font-bold text-brandGrayDark";
const bodyText = "text-gray-700 leading-relaxed text-lg";

export default async function AboutPage() {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("lang")?.value === "en" ? "en" : "es") as "en" | "es";
  const content = translations[lang];

  return (
    <main className="min-h-screen bg-gradient-to-r from-[#F7FAFF] via-[#FDFCFB] to-[#F3FBF6]">
      <div className="max-w-3xl mx-auto px-6 py-8 md:py-12">
        <Breadcrumbs items={[{ label: content.title }]} lang={lang} />

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-brandGrayDark mb-4">{content.title}</h1>
          <p className="text-lg text-gray-700 max-w-xl mx-auto leading-relaxed">{content.subtitle}</p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl border-2 border-brandGray p-8 md:p-12 space-y-10">
          {/* Section 1: The Inspiration */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-red-50 text-red-600 rounded-xl">
                <FontAwesomeIcon icon={faHeart} className="text-xl" aria-hidden="true" />
              </div>
              <h2 className={sectionTitle}>{content.inspirationTitle}</h2>
            </div>
            <p className={bodyText} dangerouslySetInnerHTML={{ __html: highlightEmphasis(content.inspirationText, true) }} />
          </section>

          <hr className="border-brandGray" />

          {/* Section 2: Name Meaning */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-brandBlue/10 text-brandBlue rounded-xl">
                <FontAwesomeIcon icon={faUniversalAccess} className="text-xl" aria-hidden="true" />
              </div>
              <h2 className={sectionTitle}>{content.meaningTitle}</h2>
            </div>
            <p className={bodyText} dangerouslySetInnerHTML={{ __html: highlightEmphasis(content.meaningText, true) }} />
          </section>

          <hr className="border-brandGray" />

          {/* Section 3: The Mission */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
                <FontAwesomeIcon icon={faLightbulb} className="text-xl" aria-hidden="true" />
              </div>
              <h2 className={sectionTitle}>{content.missionTitle}</h2>
            </div>
            <p className={bodyText} dangerouslySetInnerHTML={{ __html: highlightEmphasis(content.missionText, true) }} />
            <ul className="space-y-4 mt-4">
              {content.missionList.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-700">
                  <span className="mt-2.5 w-2 h-2 bg-amber-600 rounded-full shrink-0" aria-hidden="true" />
                  <span className="text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <hr className="border-brandGray" />

          {/* Section 4: Open Source */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-brandGreen/10 text-green-700 rounded-xl">
                <FontAwesomeIcon icon={faCode} className="text-xl" aria-hidden="true" />
              </div>
              <h2 className={sectionTitle}>{content.openSourceTitle}</h2>
            </div>
            <p className={bodyText} dangerouslySetInnerHTML={{ __html: highlightEmphasis(content.openSourceText, true) }} />
          </section>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center space-y-6">
          <h2 className="text-xl font-bold text-brandGrayDark">{content.contactTitle}</h2>
          <a
            href={`mailto:${CONTACT_LINK.EMAIL}`}
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-brandBlue text-white text-base font-bold transition-colors hover:bg-brandBlue/90"
          >
            <FontAwesomeIcon icon={faEnvelope} aria-hidden="true" />
            {content.contactButton}
          </a>
        </div>
      </div>
    </main>
  );
}
