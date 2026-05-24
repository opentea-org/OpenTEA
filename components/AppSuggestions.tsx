"use client";

import { FaGithub, FaEnvelope } from "react-icons/fa";

import { CONTACT_LINK } from "@/data/contact-info";

const text = {
  en: {
    title: "Do you have any suggestions about this application?",
    description: "If you disagree with the given evaluation, the description, or any other aspect described about the application, please send us your suggestion.",
    githubIssue: "Add an issue on GitHub",
    emailSuggestion: "Email us your suggestion"
  },
  es: {
    title: "¿Tienes alguna sugerencia sobre esta aplicación?",
    description: "Si no estás de acuerdo con la evaluación dada, la descripción u otro aspecto descrito de la aplicación, por favor, envíanos tu sugerencia.",
    githubIssue: "Añadir un issue en GitHub",
    emailSuggestion: "Enviar tu sugerencia por email"
  }
};

export default function AppSuggestions({ lang = "es" }: { lang?: "en" | "es" }) {
  const content = text[lang];

  return (
    <section className="bg-white rounded-3xl border border-brandGray p-6 md:p-8 shadow-sm">
      <h3 className="text-xl font-bold text-brandGrayDark mb-3 text-center sm:text-left">
        {content.title}
      </h3>

      <p className="text-base text-brandGrayDark/80 mb-6 leading-relaxed text-center sm:text-left">
        {content.description}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        {/* GitHub CTA */}
        <a
          href={`${CONTACT_LINK.GITHUB}/issues/new`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center gap-4 p-4 rounded-2xl border border-gray-200 bg-gray-50/30 text-brandGrayDark font-medium hover:bg-brandGreen/5 hover:border-brandGreen/30 hover:shadow-sm transition-all group"
        >
          <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 group-hover:border-brandGreen/20 transition-colors">
            <FaGithub className="text-xl text-gray-400 group-hover:text-brandGreen transition-colors" />
          </div>
          <span className="group-hover:text-brandGreen transition-colors">
            {content.githubIssue}
          </span>
        </a>

        {/* Email CTA */}
        <a
          href={`mailto:${CONTACT_LINK.EMAIL}`}
          className="flex-1 flex items-center gap-4 p-4 rounded-2xl border border-gray-200 bg-gray-50/30 text-brandGrayDark font-medium hover:bg-brandBlue/5 hover:border-brandBlue/30 hover:shadow-sm transition-all group"
        >
          <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 group-hover:border-brandBlue/20 transition-colors">
            <FaEnvelope className="text-xl text-gray-400 group-hover:text-brandBlue transition-colors" />
          </div>
          <span className="group-hover:text-brandBlue transition-colors">
            {content.emailSuggestion}
          </span>
        </a>
      </div>
    </section>
  );
}