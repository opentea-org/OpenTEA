// En src/lib/getApps.ts
import { supabase } from "./supabaseClient";

export async function getApps(lang: "en" | "es" = "en") {
  const { data: apps, error } = await supabase
    .from("apps")
    .select(`
      *,
      categories:app_categories(category_id),
      languages:app_languages(language_id),
      platforms:app_platforms(platform_id)
    `)
    .eq("is_active", true);

  if (error || !apps) {
    console.error("Error fetching apps:", error);
    return [];
  }

  return apps.map((app) => {
    const localized = app.content[lang] || app.content["en"] || {};
    
    return {
      ...app,
      name: localized.name || "Untitled",
      short_description: localized.short_description || "",
      long_description: localized.long_description || "",

      categories: app.categories?.map((c: any) => c.category_id) || [],
      languages: app.languages?.map((l: any) => l.language_id) || [],
      platforms: app.platforms?.map((p: any) => p.platform_id) || [],
    };
  });
}