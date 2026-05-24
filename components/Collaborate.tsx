"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faHandHoldingHeart } from "@fortawesome/free-solid-svg-icons";
import { FaGithub } from "react-icons/fa";

import { CONTACT_LINK } from "@/data/contact-info";

const text = {
  en: {
    title: "Collaborate with us",
    description: "OpenTEA is an open-source, community-driven project. There are many ways you can help us improve and reach more people.",
    code: "Contribute to the code",
    codeDesc: "Help us fix bugs, add features, or improve the documentation on our GitHub repository.",
    suggest: "Send your suggestions",
    suggestDesc: "Have an idea or found an error? Send us an email and tell us how we can do better.",
    donate: "Send a donation",
    donateDesc: "Support our hosting and development costs by buying us a coffee on Ko-fi."
  },
  es: {
    title: "Colabora con nosotros",
    description: "OpenTEA es un proyecto de código abierto impulsado por la comunidad. Hay muchas formas de ayudarnos a mejorar y llegar a más personas.",
    code: "Contribuye en el código",
    codeDesc: "Ayúdanos a corregir errores, añadir funciones o mejorar la documentación en nuestro repositorio de GitHub.",
    suggest: "Mándanos tus sugerencias",
    suggestDesc: "¿Tienes una idea o encontraste un error? Envíanos un correo y cuéntanos cómo mejorar.",
    donate: "Envíanos una donación",
    donateDesc: "Apoya nuestros costes de hosting y desarrollo invitándonos a un café en Ko-fi."
  }
};

export default function Collaborate({ lang = "es" }: { lang?: "en" | "es" }) {
  const content = text[lang];

  return (
    <section className="py-20 bg-gray-50 border-t border-brandGrayLight/40">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Cabecera de la sección */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-brandGrayDark mb-4">
            {content.title}
          </h2>
          <p className="text-base text-brandGrayDark/80 leading-relaxed">
            {content.description}
          </p>
        </div>

        {/* Tarjetas de acción */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          
          {/* Botón Código (GitHub) */}
          <Link
            href={`${CONTACT_LINK.GITHUB}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-center gap-3 p-8 bg-white rounded-3xl border border-gray-200 hover:border-gray-800 hover:shadow-md transition-all group"
          >
            <div className="p-4 bg-gray-50 rounded-2xl group-hover:bg-gray-100 transition-colors mb-2">
              <FaGithub className="text-4xl text-gray-400 group-hover:text-gray-800 transition-colors" />
            </div>
            <span className="font-bold text-brandGrayDark text-lg">
              {content.code}
            </span>
            <p className="text-sm text-brandGrayDark/70 leading-relaxed">
              {content.codeDesc}
            </p>
          </Link>

          {/* Botón Sugerencias (Correo) */}
          <Link
            href={`mailto:${CONTACT_LINK.EMAIL}`}
            className="flex flex-col items-center text-center gap-3 p-8 bg-white rounded-3xl border border-gray-200 hover:border-brandBlue hover:shadow-md transition-all group"
          >
            <div className="p-4 bg-gray-50 rounded-2xl group-hover:bg-brandBlue/5 transition-colors mb-2">
              <FontAwesomeIcon 
                icon={faEnvelope} 
                className="text-4xl text-gray-400 group-hover:text-brandBlue transition-colors" 
              />
            </div>
            <span className="font-bold text-brandGrayDark text-lg">
              {content.suggest}
            </span>
            <p className="text-sm text-brandGrayDark/70 leading-relaxed">
              {content.suggestDesc}
            </p>
          </Link>

          {/* Botón Donación (Ko-fi) */}
          <Link
            href={`${CONTACT_LINK.KOFI}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-center gap-3 p-8 bg-white rounded-3xl border border-gray-200 hover:border-rose-400 hover:shadow-md transition-all group"
          >
            <div className="p-4 bg-gray-50 rounded-2xl group-hover:bg-rose-50 transition-colors mb-2">
              <FontAwesomeIcon 
                icon={faHandHoldingHeart} 
                className="text-4xl text-gray-400 group-hover:text-rose-400 transition-colors" 
              />
            </div>
            <span className="font-bold text-brandGrayDark text-lg">
              {content.donate}
            </span>
            <p className="text-sm text-brandGrayDark/70 leading-relaxed">
              {content.donateDesc}
            </p>
          </Link>

        </div>
      </div>
    </section>
  );
}