"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faUniversalAccess, faShieldHalved } from "@fortawesome/free-solid-svg-icons";

// Translations
const translations = {
  en: {
    clarity: {
      title: "Easy to understand",
      text: "We rate how easy each app is to use. This helps you find simple apps.",
    },
    accessibility: {
      title: "Made for neurodivergent people",
      text: "We rate the cognitive load and the sensory load. This helps you know if an app is right for you.",
    },
    trust: {
      title: "Complete and honest",
      text: "We include free apps and paid apps. We always explain how we rate them.",
    },
  },
  es: {
    clarity: {
      title: "Fácil de entender",
      text: "Valoramos lo fácil que es usar cada app. Así encuentras apps sencillas.",
    },
    accessibility: {
      title: "Pensado para personas neurodivergentes",
      text: "Valoramos la carga cognitiva y la carga sensorial. Así sabes si una app es adecuada para ti.",
    },
    trust: {
      title: "Completo y honesto",
      text: "Incluimos apps gratis y apps de pago. Siempre explicamos cómo las valoramos.",
    },
  },
};

export default function Principles({ lang = "es" }: { lang?: string }) {
  const content = translations[lang as keyof typeof translations] || translations.es;

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 space-y-15 md:space-y-0 md:grid-cols-3 gap-10 text-center">
      {/* PRINCIPLE 1 */}
      <div className="space-y-4 px-4">
        <FontAwesomeIcon icon={faEye} className="text-brandBlue text-4xl" />
        <h3 className="text-2xl font-semibold text-brandGrayDark">
          {content.clarity.title}
        </h3>
        <p className="text-base text-gray-700 leading-relaxed">
          {content.clarity.text}
        </p>
      </div>

      {/* PRINCIPLE 2 */}
      <div className="space-y-4 px-4">
        <FontAwesomeIcon icon={faUniversalAccess} className="text-brandGreen text-4xl" />
        <h3 className="text-2xl font-semibold text-brandGrayDark">
          {content.accessibility.title}
        </h3>
        <p className="text-base text-gray-700 leading-relaxed">
          {content.accessibility.text}
        </p>
      </div>

      {/* PRINCIPLE 3 */}
      <div className="space-y-4 px-4">
        <FontAwesomeIcon icon={faShieldHalved} className="text-brandBrown text-4xl" />
        <h3 className="text-2xl font-semibold text-brandGrayDark">
          {content.trust.title}
        </h3>
        <p className="text-base text-gray-700 leading-relaxed">
          {content.trust.text}
        </p>
      </div>
    </section>
  );
}