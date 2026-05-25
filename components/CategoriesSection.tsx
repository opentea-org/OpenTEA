// components/CategoriesSection.tsx
"use client";

import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import {
    getCategoryName,
    getCategoryIcon,
    getCategoryDescription,
    SupportedLang
} from "@/src/lib/categoryTranslations";

const text = {
    en: {
        title: "General categories",
        desc: "We group applications based on the specific support they provide, focusing on accessibility, visual aids, and safe environments.",
        inspiration: "Our classification is inspired by the",
        callScotland: "CALLScotland poster",
    },
    es: {
        title: "Categorías generales",
        desc: "Agrupamos las aplicaciones según el apoyo específico que brindan, enfocándonos en accesibilidad, ayudas visuales y entornos seguros.",
        inspiration: "Nuestra clasificación está inspirada en el",
        callScotland: "póster de CALLScotland",
    }
};

const CATEGORIES_LIST = [
    "text-to-speech",
    "symbol-boards",
    "social-stories",
    "visual-schedules",
    "learning-games"
] as const;

export default function CategoriesSection({ lang = "es" }: { lang?: SupportedLang }) {
    const content = text[lang] || text.es;

    return (
        <section className="py-20 bg-gray-50 border-t border-brandGrayLight/40">
            <div className="max-w-6xl mx-auto px-6">

                <div className="text-center max-w-2xl mx-auto mb-14">
                    <h2 className="text-3xl font-bold text-brandGrayDark mb-4">
                        {content.title}
                    </h2>
                    <p className="text-base text-brandGrayDark/80 leading-relaxed">
                        {content.desc}
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                    {CATEGORIES_LIST.map((catId) => {
                        const icon = getCategoryIcon(catId);
                        return (
                            <Link
                                key={catId}
                                href={`/apps?category=${catId}`}
                                className="flex-1 basis-[280px] max-w-[500px] flex flex-col items-center text-center gap-3 p-8 bg-white rounded-3xl border border-gray-200 hover:border-brandBlue hover:shadow-md transition-all group"
                            >
                                {icon && (
                                    <div className="p-4 bg-gray-50 rounded-2xl group-hover:bg-brandBlue/5 transition-colors mb-2">
                                        <FontAwesomeIcon
                                            icon={icon}
                                            className="text-4xl text-gray-400 group-hover:text-brandBlue transition-colors"
                                        />
                                    </div>
                                )}
                                <span className="font-bold text-brandGrayDark text-lg">
                                    {getCategoryName(catId, lang)}
                                </span>
                                <p className="text-sm text-brandGrayDark/70 leading-relaxed">
                                    {getCategoryDescription(catId, lang)}
                                </p>
                            </Link>
                        );
                    })}
                </div>

                <div className="mt-14 text-center max-w-2xl mx-auto text-sm text-gray-500 leading-relaxed">
                    {content.inspiration}{" "}
                    <a
                        href="https://www.callscotland.org.uk/downloads/posters-and-leaflets/ipad-apps-for-complex-communication-support-needs/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-medium text-gray-500 hover:text-brandBlue transition-colors underline underline-offset-2"
                    >
                        {content.callScotland}
                        <FontAwesomeIcon icon={faExternalLinkAlt} className="w-3 h-3" />
                    </a>.
                </div>

            </div>
        </section>
    );
}