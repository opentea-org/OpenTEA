"use client";

import { FaGithub, FaEnvelope } from "react-icons/fa";
import { CONTACT_LINK } from "@/data/contact-info";
import { NewTabHint } from "@/src/lib/newTab";

// Plain language: short sentences, no jargon ("issue").
const text = {
  en: {
    title: "Is something not right?",
    description: "Do you disagree with the rating? Is there a mistake in the information about this app? Tell us.",
    email: "Send us an email",
    github: "Write on GitHub",
    githubNote: "You need a GitHub account.",
  },
  es: {
    title: "¿Ves algo que no es correcto?",
    description: "¿No estás de acuerdo con la valoración? ¿Hay un error en la información de esta app? Cuéntanoslo.",
    email: "Enviar un correo",
    github: "Escribir en GitHub",
    githubNote: "Necesitas una cuenta de GitHub.",
  },
};

const optionClass =
  "flex-1 flex items-center gap-4 p-4 rounded-2xl border-2 border-gray-300 bg-white text-brandGrayDark hover:border-brandBlue transition-colors group";
const iconBoxClass =
  "p-3 bg-brandGrayLight rounded-xl text-gray-700 group-hover:text-brandBlue transition-colors";

export default function AppSuggestions({ lang = "es" }: { lang?: "en" | "es" }) {
  const content = text[lang] || text.es;

  return (
    <section className="bg-white rounded-3xl border-2 border-brandGray p-6 md:p-8">
      <h2 className="text-xl font-bold text-brandGrayDark mb-3">{content.title}</h2>

      <p className="text-base text-gray-700 mb-6 leading-relaxed">{content.description}</p>

      <div className="flex flex-col sm:flex-row gap-4">
        {/* Email first: it does not need an account */}
        <a href={`mailto:${CONTACT_LINK.EMAIL}`} className={optionClass}>
          <span className={iconBoxClass}>
            <FaEnvelope className="text-xl" aria-hidden="true" />
          </span>
          <span className="text-base font-bold group-hover:text-brandBlue transition-colors">{content.email}</span>
        </a>

        <a
          href={`${CONTACT_LINK.GITHUB}/issues/new`}
          target="_blank"
          rel="noopener noreferrer"
          className={optionClass}
        >
          <span className={iconBoxClass}>
            <FaGithub className="text-xl" aria-hidden="true" />
          </span>
          <span className="flex flex-col">
            <span className="text-base font-bold group-hover:text-brandBlue transition-colors">{content.github}</span>
            <span className="text-sm text-gray-700">{content.githubNote}</span>
          </span>
          <NewTabHint lang={lang} />
        </a>
      </div>
    </section>
  );
}
