// components/DevicesSection.tsx
"use client";

import React from "react";
import Link from "next/link";
import { FaApple, FaAndroid, FaGlobe } from "react-icons/fa";
import { SupportedLang } from "@/src/lib/categoryTranslations";

const text = {
  en: {
    title: "Device Filtering",
    desc: "Find the right tools for your specific platform, whether you need them on the go or at a desk.",
    appleDevice: "iPhone or iPad",
    androidDevice: "Samsung, Xiaomi, or other Android",
    webDevice: "Google Chrome, Edge, or Firefox",
    webLabel: "Web Browser"
  },
  es: {
    title: "Filtrado por Dispositivos",
    desc: "Encuentra las herramientas adecuadas para tu plataforma, ya sea para usar en movimiento o en el ordenador.",
    appleDevice: "iPhone o iPad",
    androidDevice: "Samsung, Xiaomi, u otro Android",
    webDevice: "Google Chrome, Edge, o Firefox",
    webLabel: "Navegador web"
  }
};

export default function DevicesSection({ lang = "es" }: { lang?: SupportedLang }) {
  const content = text[lang] || text.es;

  return (
    <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] flex flex-col h-full items-center text-center">
      
      <div className="flex gap-4 mb-6">
         <div className="h-12 w-12 rounded-2xl bg-brandGreen/5 flex items-center justify-center text-brandGreen">
          <FaGlobe className="text-xl" />
        </div>
      </div>

      <h3 className="text-2xl font-bold text-brandGrayDark mb-3">
        {content.title}
      </h3>
      <p className="text-gray-500 mb-8 leading-relaxed max-w-md">
        {content.desc}
      </p>
      
      <div className="w-full space-y-3 mt-auto flex flex-col items-center">
        
        {/* iOS */}
        <Link 
          href="/apps?platforms=ios" 
          className="flex items-center gap-4 w-full max-w-sm bg-white p-3.5 rounded-2xl border border-gray-200 hover:border-brandGreen hover:shadow-md transition-all group text-left"
        >
          <div className="h-10 w-10 shrink-0 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 group-hover:bg-brandGreen/10 group-hover:text-brandGreen transition-colors">
            <FaApple className="text-xl" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-brandGrayDark text-sm group-hover:text-brandGreen transition-colors">iOS</span>
            <span className="text-xs text-gray-500">{content.appleDevice}</span>
          </div>
        </Link>

        {/* Android */}
        <Link 
          href="/apps?platforms=android" 
          className="flex items-center gap-4 w-full max-w-sm bg-white p-3.5 rounded-2xl border border-gray-200 hover:border-brandGreen hover:shadow-md transition-all group text-left"
        >
          <div className="h-10 w-10 shrink-0 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 group-hover:bg-brandGreen/10 group-hover:text-brandGreen transition-colors">
            <FaAndroid className="text-xl" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-brandGrayDark text-sm group-hover:text-brandGreen transition-colors">Android</span>
            <span className="text-xs text-gray-500">{content.androidDevice}</span>
          </div>
        </Link>

        {/* Web */}
        <Link 
          href="/apps?platforms=web" 
          className="flex items-center gap-4 w-full max-w-sm bg-white p-3.5 rounded-2xl border border-gray-200 hover:border-brandGreen hover:shadow-md transition-all group text-left"
        >
          <div className="h-10 w-10 shrink-0 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 group-hover:bg-brandGreen/10 group-hover:text-brandGreen transition-colors">
            <FaGlobe className="text-xl" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-brandGrayDark text-sm group-hover:text-brandGreen transition-colors">{content.webLabel}</span>
            <span className="text-xs text-gray-500">{content.webDevice}</span>
          </div>
        </Link>

      </div>
    </div>
  );
}