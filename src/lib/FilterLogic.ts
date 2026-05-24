// components/FilterLogic.ts

export const isFree = (app: any) => app.price_type_id === "free" || app.price_type_id === "freemium";
export const isPaid = (app: any) => app.price_type_id === "paid" || app.price_type_id === "subscription";

export const getPrice = (app: any) => {
  const v = Number(app.price_amount_eur);
  return Number.isNaN(v) ? 0 : v;
};

export const checkCriteria = (app: any, filters: any) => {
  if (filters.search) {
    const haystack = `${app.name ?? ""} ${app.short_description ?? ""}`.toLowerCase();
    if (!haystack.includes(filters.search)) return false;
  }
  if (filters.category && !app.categories?.some((c: string) => c.toLowerCase() === filters.category.toLowerCase())) return false;
  if (filters.pFilter === "free" && !isFree(app)) return false;
  if (filters.pFilter === "paid" && !isPaid(app)) return false;
  
  const p = getPrice(app);
  if (filters.pFilter !== "free" && (p < filters.pMin || p > filters.pMax)) return false;
  
  if (filters.platforms?.length > 0 && !filters.platforms.some((pl: string) => app.platforms?.includes(pl))) return false;
  if (filters.language && !app.languages?.includes(filters.language)) return false;
  
  if (filters.ease && (app.ease_of_use ?? 0) < Number(filters.ease)) return false;
  if (filters.cog && (app.cognitive_load ?? 10) > Number(filters.cog)) return false;
  if (filters.sens && (app.sensory_load ?? 10) > Number(filters.sens)) return false;
  
  return true;
};