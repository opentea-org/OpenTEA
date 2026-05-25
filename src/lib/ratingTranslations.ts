// src/lib/ratingTranslations.ts

export const ratingTranslations = {
  en: {
    ariaLabel: "How to read ratings",
    title: "How we evaluate apps",
    subtitle: "We use three simple criteria to help you find the perfect fit for your needs.",
    easeTitle: "Ease of Use",
    easeDesc: "A higher score indicates an intuitive interface that requires less motor skill and is easy to navigate.",
    cogTitle: "Cognitive Load",
    cogDesc: "The ideal score depends on what you want to achieve:",
    cogLow: "Low (1-2): Relaxation",
    cogHigh: "High (3-5): Learning",
    sensoryTitle: "Sensory Load",
    sensoryDesc: "A lower score is better for users with sensory sensitivities, avoiding intense lights or loud sounds.",
    closeBtn: "Got it"
  },
  es: {
    ariaLabel: "Cómo leer las puntuaciones",
    title: "Cómo evaluamos las aplicaciones",
    subtitle: "Utilizamos tres criterios sencillos para ayudarte a encontrar la app ideal según tus necesidades.",
    easeTitle: "Facilidad de uso",
    easeDesc: "Una mayor puntuación indica una interfaz intuitiva que requiere menor habilidad motriz para navegar.",
    cogTitle: "Carga cognitiva",
    cogDesc: "La puntuación ideal depende de tu objetivo principal:",
    cogLow: "Baja (1-2): Relax",
    cogHigh: "Alta (3-5): Aprendizaje",
    sensoryTitle: "Carga sensorial",
    sensoryDesc: "Una puntuación baja es ideal para personas con sensibilidad sensorial, evitando estímulos intensos.",
    closeBtn: "Entendido"
  }
} as const;

export type SupportedLang = "en" | "es";