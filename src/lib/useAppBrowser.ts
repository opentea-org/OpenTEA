import { useMemo, useState, useCallback, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { categoryNameDictionary } from "@/src/lib/categoryTranslations";

// --- TRANSLATIONS ---
export const tBrowser = {
  en: {
    filters: "Filters",
    active: "Active",
    removeAll: "Remove all",
    priceRange: "PRICE RANGE",
    clear: "Clear",
    allPrices: "All prices",
    free: "FREE",
    paid: "PAID / SUBSCRIPTION",
    category: "CATEGORY",
    all: "All",
    platform: "PLATFORM",
    language: "LANGUAGE",
    accessibility: "ACCESSIBILITY",
    minEase: "Min. Ease of Use",
    maxCog: "Max. Cognitive Load",
    maxSens: "Max. Sensory Load",
    showResults: "Show Results",
    searchPlaceholder: "Search apps by name…",
    appsCount: "apps",
    appCount: "app",
    sortName: "Name (A-Z)",
    sortEase: "Ease of Use (High-Low)",
    sortCog: "Cognitive Load (High-Low)",
    sortSens: "Sensory Load (High-Low)",
    prev: "Previous",
    next: "Next",
    page: "Page",
    of: "of",
  },
  es: {
    filters: "Filtros",
    active: "Activos",
    removeAll: "Borrar todo",
    priceRange: "RANGO DE PRECIO",
    clear: "Limpiar",
    allPrices: "Todos los precios",
    free: "GRATIS",
    paid: "DE PAGO / SUSCRIPCIÓN",
    category: "CATEGORÍA",
    all: "Todas",
    platform: "PLATAFORMA",
    language: "IDIOMA",
    accessibility: "ACCESIBILIDAD",
    minEase: "Mín. Facilidad de uso",
    maxCog: "Máx. Carga cognitiva",
    maxSens: "Máx. Carga sensorial",
    showResults: "Mostrar resultados",
    searchPlaceholder: "Buscar apps por nombre…",
    appsCount: "apps",
    appCount: "app",
    sortName: "Nombre (A-Z)",
    sortEase: "Facilidad (Alta-Baja)",
    sortCog: "Carga Cognitiva (Alta-Baja)",
    sortSens: "Carga Sensorial (Alta-Baja)",
    prev: "Anterior",
    next: "Siguiente",
    page: "Página",
    of: "de",
  }
};

export type PriceFilter = "all" | "free" | "paid";
export type SortOption = "name" | "ease" | "cognitive" | "sensory";

const ITEMS_PER_PAGE = 12;

export function isFree(app: any) {
  const t = app.price_type_id;
  return t === "free" || t === "freemium";
}

export function isPaid(app: any) {
  const t = app.price_type_id;
  return t === "paid" || t === "subscription";
}

export function getPrice(app: any) {
  if (app.price_amount_eur != null) {
    const v = Number(app.price_amount_eur);
    return Number.isNaN(v) ? 0 : v;
  }
  return isFree(app) ? 0 : 0;
}

export function getLanguageName(code: string, locale: string): string {
  try {
    const displayNames = new Intl.DisplayNames([locale], { type: 'language' });
    return displayNames.of(code) || code.toUpperCase();
  } catch (e) {
    return code.toUpperCase();
  }
}

export function useAppsBrowser(apps: any[], lang: "en" | "es") {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const t = tBrowser[lang] || tBrowser.en;

  const { globalMin, globalMax } = useMemo(() => {
    let min = 0;
    let max = 50;
    const prices = apps
      .map((a) => getPrice(a))
      .filter((p) => p !== null && p !== undefined);

    if (prices.length > 0) {
      min = Math.min(...prices);
      max = Math.max(...prices);
    }
    return { globalMin: min, globalMax: max };
  }, [apps]);

  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("ease");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("all");

  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    return searchParams.get("category") || "";
  });

  const [selectedLanguage, setSelectedLanguage] = useState<string>(() => {
    return searchParams.get("language") || "";
  });

  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const [minEase, setMinEase] = useState<string>("");
  const [maxCognitive, setMaxCognitive] = useState<string>("");
  const [maxSensory, setMaxSensory] = useState<string>("");

  const [priceMin, setPriceMin] = useState<number>(globalMin);
  const [priceMax, setPriceMax] = useState<number>(globalMax);

  useEffect(() => {
    const cat = searchParams.get("category") || "";
    const urlLang = searchParams.get("language") || "";
    setSelectedCategory(cat);
    setSelectedLanguage(urlLang);
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    let hasChanges = false;

    if (selectedCategory) {
      if (params.get("category") !== selectedCategory) {
        params.set("category", selectedCategory);
        hasChanges = true;
      }
    } else {
      if (params.has("category")) {
        params.delete("category");
        hasChanges = true;
      }
    }

    if (selectedLanguage) {
      if (params.get("language") !== selectedLanguage) {
        params.set("language", selectedLanguage);
        hasChanges = true;
      }
    } else {
      if (params.has("language")) {
        params.delete("language");
        hasChanges = true;
      }
    }

    if (hasChanges) {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [selectedCategory, selectedLanguage, pathname, router, searchParams]);

  const checkCriteria = useCallback(
    (
      app: any,
      filters: {
        search?: string;
        category?: string;
        platforms?: string[];
        language?: string;
        pFilter?: PriceFilter;
        pMin?: number;
        pMax?: number;
        ease?: string;
        cog?: string;
        sens?: string;
      }
    ) => {
      if (filters.search) {
        const haystack = `${app.name ?? ""} ${app.short_description ?? ""}`.toLowerCase();
        if (!haystack.includes(filters.search)) return false;
      }

      if (filters.category) {
        const categories: string[] = app.categories ?? [];
        const filterLower = filters.category.toLowerCase();
        const hasMatch = categories.some((catId: string) => catId.toLowerCase() === filterLower);
        if (!hasMatch) return false;
      }

      const currentPFilter = filters.pFilter ?? "all";
      if (currentPFilter === "free" && !isFree(app)) return false;
      if (currentPFilter === "paid" && !isPaid(app)) return false;

      const p = getPrice(app);
      const min = filters.pMin ?? globalMin;
      const max = filters.pMax ?? globalMax;
      if (currentPFilter !== "free") {
        if (p < min || p > max) return false;
      }

      if (filters.platforms && filters.platforms.length > 0) {
        const appPlats: string[] = app.platforms ?? [];
        const hasAny = filters.platforms.some((pl) => appPlats.includes(pl));
        if (!hasAny) return false;
      }

      if (filters.language) {
        const langs: string[] = app.languages ?? [];
        const hasLang = langs.some((l) => l.toLowerCase() === filters.language!.toLowerCase());
        if (!hasLang) return false;
      }

      const minEaseNum = filters.ease ? Number(filters.ease) : null;
      if (minEaseNum !== null && (app.ease_of_use ?? 0) < minEaseNum) return false;

      const maxCogNum = filters.cog ? Number(filters.cog) : null;
      if (maxCogNum !== null && (app.cognitive_load ?? 10) > maxCogNum) return false;

      const maxSensNum = filters.sens ? Number(filters.sens) : null;
      if (maxSensNum !== null && (app.sensory_load ?? 10) > maxSensNum) return false;

      return true;
    },
    [globalMin, globalMax]
  );

  const filteredApps = useMemo(() => {
    const q = search.trim().toLowerCase();

    const result = apps.filter((app) =>
      checkCriteria(app, {
        search: q,
        category: selectedCategory || undefined,
        platforms: selectedPlatforms,
        language: selectedLanguage || undefined,
        pFilter: priceFilter,
        pMin: priceMin,
        pMax: priceMax,
        ease: minEase,
        cog: maxCognitive,
        sens: maxSensory,
      })
    );

    return result.sort((a, b) => {
      switch (sortOption) {
        case "ease":
          return (b.ease_of_use ?? 0) - (a.ease_of_use ?? 0);
        case "cognitive":
          return (b.cognitive_load ?? 0) - (a.cognitive_load ?? 0);
        case "sensory":
          return (b.sensory_load ?? 0) - (a.sensory_load ?? 0);
        case "name":
        default:
          return (a.name ?? "").localeCompare(b.name ?? "");
      }
    });

  }, [
    apps, checkCriteria, search, sortOption, selectedCategory,
    selectedPlatforms, selectedLanguage, priceFilter, priceMin,
    priceMax, minEase, maxCognitive, maxSensory,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    search, selectedCategory, selectedPlatforms, selectedLanguage,
    priceFilter, priceMin, priceMax, minEase, maxCognitive,
    maxSensory, sortOption
  ]);

  const totalPages = Math.ceil(filteredApps.length / ITEMS_PER_PAGE);
  const paginatedApps = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredApps.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredApps, currentPage]);

  const handleNextPage = () => { if (currentPage < totalPages) setCurrentPage(prev => prev + 1); };
  const handlePrevPage = () => { if (currentPage > 1) setCurrentPage(prev => prev - 1); };

  const { categoryCounts, platformCounts, languageCounts, priceTypeCounts } = useMemo<{
    categoryCounts: Map<string, number>;
    platformCounts: Map<string, number>;
    languageCounts: Map<string, number>;
    priceTypeCounts: { all: number; free: number; paid: number };
  }>(() => {
    const q = search.trim().toLowerCase();
    const baseFilters = {
      search: q, category: selectedCategory || undefined, platforms: selectedPlatforms,
      language: selectedLanguage || undefined, pFilter: priceFilter, pMin: priceMin,
      pMax: priceMax, ease: minEase, cog: maxCognitive, sens: maxSensory
    };

    const validCategoryKeys = Object.keys(categoryNameDictionary.en);
    const catMap = new Map<string, number>();
    validCategoryKeys.forEach(key => catMap.set(key, 0));

    const appsForCats = apps.filter(a => checkCriteria(a, { ...baseFilters, category: undefined }));
    appsForCats.forEach(app => {
      app.categories?.forEach((c: string) => {
        if (catMap.has(c)) {
          catMap.set(c, (catMap.get(c) ?? 0) + 1);
        }
      });
    });

    const appsForPlats = apps.filter(a => checkCriteria(a, { ...baseFilters, platforms: [] }));
    const platMap = new Map<string, number>();
    appsForPlats.forEach(app => app.platforms?.forEach((p: string) => platMap.set(p, (platMap.get(p) ?? 0) + 1)));

    const appsForLangs = apps.filter(a => checkCriteria(a, { ...baseFilters, language: undefined }));
    const langMap = new Map<string, number>();
    appsForLangs.forEach(app => app.languages?.forEach((l: string) => langMap.set(l, (langMap.get(l) ?? 0) + 1)));

    const appsForPrice = apps.filter(a => checkCriteria(a, { ...baseFilters, pFilter: undefined, pMin: globalMin, pMax: globalMax }));
    let free = 0, paid = 0, all = appsForPrice.length;
    appsForPrice.forEach(a => { if (isFree(a)) free++; if (isPaid(a)) paid++; });

    return { categoryCounts: catMap, platformCounts: platMap, languageCounts: langMap, priceTypeCounts: { all, free, paid } };
  }, [apps, checkCriteria, search, selectedCategory, selectedPlatforms, selectedLanguage, priceFilter, priceMin, priceMax, minEase, maxCognitive, maxSensory, globalMin, globalMax]);

  const handlePriceMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    const val = Math.min(v, priceMax - 1);
    setPriceMin(val);
  };

  const handlePriceMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    const val = Math.max(v, priceMin + 1);
    setPriceMax(val);
  };

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms((prev) => prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]);
  };

  const resetAllFilters = () => {
    setSearch("");
    setSortOption("ease");
    setPriceFilter("all");
    setSelectedCategory("");
    setSelectedPlatforms([]);
    setSelectedLanguage("");
    setMinEase("");
    setMaxCognitive("");
    setMaxSensory("");
    setPriceMin(globalMin);
    setPriceMax(globalMax);

    router.replace(pathname, { scroll: false });
  };

  const getPercent = (value: number) => Math.round(((value - globalMin) / (globalMax - globalMin)) * 100);
  const isPriceDisabled = priceFilter === "free";
  const hasActiveFilters = search !== "" || priceFilter !== "all" || selectedCategory !== "" || selectedPlatforms.length > 0 || selectedLanguage !== "" || minEase !== "" || maxCognitive !== "" || maxSensory !== "" || priceMin !== globalMin || priceMax !== globalMax;

  return {
    state: { search, sortOption, currentPage, showFilters, priceFilter, selectedCategory, selectedPlatforms, selectedLanguage, minEase, maxCognitive, maxSensory, priceMin, priceMax },
    actions: { setSearch, setSortOption, setCurrentPage, setShowFilters, setPriceFilter, setSelectedCategory, setSelectedPlatforms, setSelectedLanguage, setMinEase, setMaxCognitive, setMaxSensory, setPriceMin, setPriceMax, handlePriceMinChange, handlePriceMaxChange, togglePlatform, resetAllFilters, handleNextPage, handlePrevPage },
    data: { globalMin, globalMax, filteredApps, paginatedApps, totalPages, categoryCounts, platformCounts, languageCounts, priceTypeCounts, getPercent, isPriceDisabled, hasActiveFilters },
    t
  };
}

export type UseAppsBrowserReturn = ReturnType<typeof useAppsBrowser>;