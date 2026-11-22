"use client";

import Image from "next/image";
import Link from "next/link";
import { highlightEmphasis } from "@/src/utils/formatEmphasis";

// Translations
const text = {
  en: {
    heroBadge: "Autism-friendly app guide",
    title: "Find *useful apps* for __autism__",
    subtitle: "We test apps and explain what each one is like. This helps you choose the right app.",
    ctaPrimary: "Browse apps",
    ctaSecondary: "How we rate apps",
  },
  es: {
    heroBadge: "Guía de apps para autismo",
    title: "Encuentra *apps útiles* para el __autismo__",
    subtitle: "Probamos apps y te explicamos cómo es cada una. Así puedes elegir la app que necesitas.",
    ctaPrimary: "Explorar apps",
    ctaSecondary: "Cómo valoramos las apps",
  },
};

export default function Hero({ lang = "es" }: { lang?: string }) {
  const content = text[lang as keyof typeof text] || text.es;
  const title = highlightEmphasis(content.title);

  return (
    <section className="bg-gradient-to-r from-[#F7FAFF] via-[#FDFCFB] to-[#F3FBF6]">
      <div className="max-w-6xl mx-auto px-6 py-10 md:py-20 grid gap-12 lg:grid-cols-2 items-center">
        {/* TEXT COLUMN */}
        <div className="space-y-6">
          <div className="flex justify-start mb-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-base font-medium text-brandGrayDark shadow-sm">
              <span className="h-2 w-2 rounded-full bg-brandGreen" />
              <span>{content.heroBadge}</span>
            </div>
          </div>

          <div className="space-y-6 text-left">
            <h1
              className="text-4xl md:text-5xl font-bold text-brandGrayDark leading-tight max-w-xl"
              dangerouslySetInnerHTML={{ __html: title }}
            />

            <p className="text-lg md:text-xl text-brandGrayDark max-w-md">
              {content.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-3 pt-2">
              <Link
                href="/apps"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-brandBlue px-6 py-3 text-base font-bold text-white hover:bg-brandBlue/90 transition shadow-sm"
              >
                {content.ctaPrimary}
              </Link>

              <Link
                href="#criterios-evaluacion"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-full border-2 border-gray-400 bg-white px-6 py-3 text-base font-bold text-brandGrayDark hover:border-brandBlue hover:text-brandBlue transition"
              >
                {content.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>

        {/* IMAGE COLUMN */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-[#C7A27A]/5 blur-2xl" aria-hidden="true" />
            <div className="relative p-4">
              <Image
                src="/ardilla2.png"
                alt=""
                width={500}
                height={500}
                priority
                className="w-80 lg:w-[25rem] drop-shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}