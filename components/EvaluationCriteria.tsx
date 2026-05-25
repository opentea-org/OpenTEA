import React from "react";
import { FaRegSmile, FaBrain, FaRegEye } from "react-icons/fa";

import { ratingTranslations } from "@/src/lib/ratingTranslations";

interface EvaluationCriteriaProps {
  lang: "en" | "es";
}

export function EvaluationCriteria({ lang }: EvaluationCriteriaProps) {
  const t = ratingTranslations[lang] || ratingTranslations.es;

  return (
    <section id="criterios-evaluacion" className="py-16 md:py-24 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-3xl font-bold text-brandGrayDark mb-4">
            {t.title}
          </h2>
          <p className="text-lg text-gray-600">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-brandBlue/10 flex items-center justify-center mb-6">
              <FaRegSmile className="w-8 h-8 text-brandBlue" />
            </div>
            <h3 className="text-xl font-bold text-brandGrayDark mb-3">
              {t.easeTitle}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {t.easeDesc}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center mb-6">
              <FaBrain className="w-8 h-8 text-purple-500" />
            </div>
            <h3 className="text-xl font-bold text-brandGrayDark mb-3">
              {t.cogTitle}
            </h3>
            <p className="text-gray-600 mb-6">
              {t.cogDesc}
            </p>
            <div className="flex flex-row justify-center gap-2 w-full mt-auto">
              <span className="flex-1 bg-purple-50 text-purple-700 px-2 py-2.5 rounded-xl text-[13px] font-medium border border-purple-100 flex items-center justify-center text-center leading-tight">
                {t.cogLow}
              </span>
              <span className="flex-1 bg-purple-50 text-purple-700 px-2 py-2.5 rounded-xl text-[13px] font-medium border border-purple-100 flex items-center justify-center text-center leading-tight">
                {t.cogHigh}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center mb-6">
              <FaRegEye className="w-8 h-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-bold text-brandGrayDark mb-3">
              {t.sensoryTitle}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {t.sensoryDesc}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}