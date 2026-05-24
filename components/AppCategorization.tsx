"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faEye, 
  faUniversalAccess, 
  faShieldHalved,
  faMobileScreen,
  faLaptopCode
} from "@fortawesome/free-solid-svg-icons";

const text = {
  en: {
    title: "How we organize apps",
    generalTitle: "General Categories",
    generalDesc: "We group applications based on the specific support they provide, focusing on accessibility, visual aids, and safe environments.",
    deviceTitle: "Device Filtering",
    deviceDesc: "Find the right tools for your specific platform, whether you need them on the go or at a desk."
  },
  es: {
    title: "Cómo organizamos las apps",
    generalTitle: "Categorías Generales",
    generalDesc: "Agrupamos las aplicaciones según el apoyo específico que brindan, enfocándonos en accesibilidad, ayudas visuales y entornos seguros.",
    deviceTitle: "Filtrado por Dispositivos",
    deviceDesc: "Encuentra las herramientas adecuadas para tu plataforma, ya sea para usar en movimiento o en el ordenador."
  }
};

export default function AppCategorization({ lang = "es" }: { lang?: "en" | "es" }) {
  const content = text[lang];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-brandGrayDark mb-12">
          {content.title}
        </h2>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Tarjeta de Categorías Generales */}
          <div className="bg-brandBlue/5 rounded-2xl p-8 border border-brandBlue/10">
            <h3 className="text-xl font-bold text-brandBlue mb-4">
              {content.generalTitle}
            </h3>
            <p className="text-brandGrayDark/80 mb-6 leading-relaxed">
              {content.generalDesc}
            </p>
            <div className="flex gap-4">
              <div className="flex flex-col items-center gap-2">
                <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center text-brandBlue shadow-sm">
                  <FontAwesomeIcon icon={faEye} className="text-xl" />
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center text-brandBlue shadow-sm">
                  <FontAwesomeIcon icon={faUniversalAccess} className="text-xl" />
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center text-brandBlue shadow-sm">
                  <FontAwesomeIcon icon={faShieldHalved} className="text-xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Tarjeta de Dispositivos */}
          <div className="bg-brandGreen/5 rounded-2xl p-8 border border-brandGreen/10">
            <h3 className="text-xl font-bold text-brandGreen mb-4">
              {content.deviceTitle}
            </h3>
            <p className="text-brandGrayDark/80 mb-6 leading-relaxed">
              {content.deviceDesc}
            </p>
            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center text-brandGreen shadow-sm">
                <FontAwesomeIcon icon={faMobileScreen} className="text-xl" />
              </div>
              <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center text-brandGreen shadow-sm">
                <FontAwesomeIcon icon={faLaptopCode} className="text-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}