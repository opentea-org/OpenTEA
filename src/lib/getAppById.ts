// En src/lib/getAppById.ts
import { supabase } from "./supabaseClient";

export async function getAppById(id: string, lang: "en" | "es" = "en") {
  const { data: app, error } = await supabase
    .from("apps")
    .select(`
      *,
      categories:app_categories(category_id),
      languages:app_languages(language_id),
      platforms:app_platforms(platform_id)
    `)
    .eq("id", id)
    .maybeSingle();

  if (error || !app) return null;

  const content = app.content[lang] || app.content["en"] || {};

  return {
    ...app,
    ...content,

    play_store_link: app.play_store_link,
    app_store_link: app.app_store_link,
    website: app.website,

    categories: app.categories?.map((c: any) => c.category_id) || [],
    languages: app.languages?.map((l: any) => l.language_id) || [],
    platforms: app.platforms?.map((p: any) => p.platform_id) || [],
    price_type_id: app.price_type_id,
    price_amount_eur: app.price_amount_eur
  };
}