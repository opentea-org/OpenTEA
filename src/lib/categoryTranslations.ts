// src/lib/categoryTranslations.ts
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { 
  faVolumeUp, 
  faThLarge, 
  faComments, 
  faBaby, 
  faHandshake, 
  faClock, 
  faGamepad 
} from "@fortawesome/free-solid-svg-icons";

const categoryIconDictionary: Record<string, IconDefinition> = {
  "text-to-speech": faVolumeUp,      
  "symbol-boards": faThLarge,        
  "social-stories": faHandshake,     
  "visual-schedules": faClock,       
  "learning-games": faGamepad,   
};

const categoryDescriptionDictionary = {
  en: {
    "text-to-speech": "Apps that convert typed text into spoken words.",
    "symbol-boards": "Flexible grids for building sentences and expressing needs.",
    "social-stories": "Apps that model social interactions and behaviors through narrative.",
    "visual-schedules": "Tools to help manage daily routines, reducing anxiety through predictability.",
    "learning-games": "Engaging activities designed to reinforce cognitive and language skills.",
  },
  es: {
    "text-to-speech": "Apps que convierten texto escrito en palabras habladas.",
    "symbol-boards": "Cuadrículas flexibles para formar frases y expresar necesidades.",
    "social-stories": "Apps que modelan interacciones y comportamientos sociales a través de narrativas.",
    "visual-schedules": "Herramientas para gestionar rutinas, reduciendo la ansiedad mediante previsibilidad.",
    "learning-games": "Actividades interactivas para reforzar habilidades cognitivas y de lenguaje.",
  },
} as const;

export const categoryNameDictionary = {
  en: {
    "text-to-speech": "Text to Speech",
    "symbol-boards": "Symbol Boards",
    "social-stories": "Social Stories",
    "visual-schedules": "Visual Schedules",
    "learning-games": "Learning Games",
  },
  es: {
    "text-to-speech": "Texto a voz",
    "symbol-boards": "Tableros de pictogramas",
    "social-stories": "Historias sociales",
    "visual-schedules": "Agendas visuales",
    "learning-games": "Juegos de aprendizaje",
  }
} as const;

export type SupportedLang = "en" | "es";

export function getCategoryName(categoryId: string, lang: SupportedLang): string {
  const dictionary = categoryNameDictionary[lang] || categoryNameDictionary.en;
  
  const translation = dictionary[categoryId as keyof typeof dictionary];
  
  if (!translation) {
    return categoryId.charAt(0).toUpperCase() + categoryId.slice(1).replace(/-/g, ' ');
  }
  
  return translation;
}

export function getCategoryIcon(categoryId: string): IconDefinition | null {
  return categoryIconDictionary[categoryId] || null;
}

export function getCategoryDescription(categoryId: string, lang: SupportedLang): string {
  const dictionary = categoryDescriptionDictionary[lang] || categoryDescriptionDictionary.en;
  
  const translation = dictionary[categoryId as keyof typeof dictionary];
  
  if (!translation) {
    return "";
  }
  
  return translation;
}