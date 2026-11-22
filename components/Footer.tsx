"use client";
import { NewTabHint } from "@/src/lib/newTab";
import { BrandName } from "./BrandName";

import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaEnvelope, FaLinkedinIn } from "react-icons/fa";
import { SiKofi } from "react-icons/si"; // Icono específico de Ko-fi

import { CONTACT_LINK } from "@/data/contact-info";
import { COLLABORATORS } from "@/data/collaborators";

// 1. Traducciones ampliadas
const translations = {
  en: {
    apps: "Apps",
    resources: "Resources",
    about: "About us",
    menu: "Menu",
    contact: "Contact",
    source: "Source",
    builtWith: "Built for the neurodivergent community",
    emailText: "Email",
    collaborators: "Collaborators"
  },
  es: {
    apps: "Apps",
    resources: "Recursos",
    about: "Quiénes somos",
    menu: "Menú",
    contact: "Contacto",
    source: "Código",
    builtWith: "Creado para la comunidad neurodivergente",
    emailText: "Correo electrónico",
    collaborators: "Colaboradores"
  }
};

export function Footer({ lang = "es" }: { lang?: "en" | "es" }) {
  const content = translations[lang] || translations.es;

  const navLinks = [
    { href: "/apps", label: content.apps },
    { href: "/resources", label: content.resources },
    { href: "/about", label: content.about },
  ];

  const collaboratorLogos = [
    { src: "/logos/colab1.png", alt: "Collaborator 1" },
    { src: "/logos/colab2.png", alt: "Collaborator 2" },
    { src: "/logos/colab3.png", alt: "Collaborator 3" },
  ];

  return (
    <footer className="bg-white border-t border-brandGrayLight pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        {/* --- Main Footer Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 text-left">

          {/* Column 1: Brand & Mascot */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left max-w-sm mx-auto md:mx-0 space-y-8">

            {/* Identidad: Mascota + Eslogan */}
            <div className="flex flex-col items-center md:items-start space-y-4">
              <div className="relative group">
                <div className="absolute -inset-2 bg-brandBlue/5 rounded-full blur-lg group-hover:bg-brandBlue/10 transition-all opacity-0 group-hover:opacity-100 duration-500" />
                <Image
                  src="/ardilla2.png"
                  alt=""
                  width={80}
                  height={80}
                  className="relative opacity-90 group-hover:opacity-100 transition-all"
                />
              </div>
              <div className="text-sm leading-relaxed text-gray-700">
                <p className="font-bold text-brandGrayDark"><BrandName /></p>
                <p>{content.builtWith}</p>
              </div>
            </div>

            {/* Acciones Sociales */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
              <Link
                href={`${CONTACT_LINK.GITHUB}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white border border-gray-200 rounded-full text-gray-600 hover:text-brandBlue hover:border-brandBlue/60 hover:shadow-sm transition-all"
              >
                <FaGithub size={20} aria-hidden="true" />
                <span className="sr-only">GitHub</span>
                <NewTabHint lang={lang} />
              </Link>

              <Link
                href={`${CONTACT_LINK.LINKEDIN}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white border border-gray-200 rounded-full text-gray-600 hover:text-brandBlue hover:border-brandBlue/60 hover:shadow-sm transition-all"
              >
                <FaLinkedinIn size={20} aria-hidden="true" />
                <span className="sr-only">LinkedIn</span>
                <NewTabHint lang={lang} />
              </Link>

              <Link
                href={`${CONTACT_LINK.KOFI}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white border border-gray-200 rounded-full text-gray-600 hover:text-rose-400 hover:border-rose-200 hover:shadow-sm transition-all"
              >
                <SiKofi size={20} aria-hidden="true" />
                <span className="sr-only">Ko-fi</span>
                <NewTabHint lang={lang} />
              </Link>
            </div>
          </div>

          {/* Column 2: Menu (centred on mobile, like the brand column) */}
          <div className="text-center md:text-left">
            <h4 className="text-brandGrayDark font-bold mb-4 text-base">
              {content.menu}
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-brandGrayDark underline underline-offset-2 hover:text-brandBlue transition-colors text-base font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact (centred on mobile, like the brand column) */}
          <div className="text-center md:text-left">
            <h4 className="text-brandGrayDark font-bold mb-4 text-base">
              {content.contact}
            </h4>
            <div
              className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-gray-700 text-sm font-medium"
            >
              <FaEnvelope className="text-brandBlue/60" />
              {content.emailText}:
              <a
                href={`mailto:${CONTACT_LINK.EMAIL}`}
                className="hover:text-brandBlue transition-colors"
              >
                {CONTACT_LINK.EMAIL}
              </a>
            </div>
          </div>


        </div>

        {/* --- Collaborators Row --- */}
        {/* <div className="border-t border-gray-100 py-10">
          <p className="text-center text-sm tracking-[0.2em] text-gray-700 mb-6 font-semibold">
            {content.collaborators}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
            {COLLABORATORS.map((colab) => (
              <Link
                key={colab.id}
                href={colab.url}
                target="_blank"
                rel="noopener noreferrer"
                title={colab.name}
              >
                <Image
                  src={colab.logo}
                  alt={colab.name}
                  width={120}
                  height={60}
                  className="h-10 w-30 object-contain hover:scale-105 transition-transform grayscale hover:grayscale-0 duration-500"
                />
              </Link>
            ))}
          </div>
        </div> */}

        {/* --- Bottom Bar --- */}
        <div className="pt-8 border-t border-gray-50 text-center">
          <p className="text-sm font-medium text-gray-700 tracking-widest">
            © {new Date().getFullYear()} OpenTEA
          </p>
        </div>
      </div>
    </footer>
  );
}