-- ============================================================
-- 06. APP DATA SEED: Sígueme
-- ============================================================

WITH new_app AS (
  INSERT INTO public.apps (
    slug,
    content,
    price_type_id,
    price_amount_eur,
    website,
    play_store_link,
    app_store_link,
    ease_of_use,
    cognitive_load,
    sensory_load,
    image_urls,
    is_active
  ) 
  VALUES (
    'sigueme',
    
    -- Consolidated translations inside the JSONB column
    '{
      "en": {
        "name": "Sígueme",
        "short_description": "Tool to develop visual attention and the acquisition of meaning.",
        "long_description": "Sígueme is designed to enhance visual attention and the association between objects and their representations (photos, pictograms, drawings) in people with ASD. It presents six progressive phases ranging from capturing attention with visual and auditory stimuli to generalizing concepts using real-life objects, videos, and games."
      },
      "es": {
        "name": "Sígueme",
        "short_description": "Herramienta para desarrollar la atención visual y la adquisición de significado.",
        "long_description": "Sígueme está diseñada para potenciar la atención visual y la asociación entre objetos y sus representaciones (fotos, pictogramas, dibujos) en personas con TEA. Presenta seis fases progresivas que van desde la captación de la atención con estímulos visuales y auditivos hasta la generalización de conceptos usando objetos reales, vídeos y juegos."
      }
    }'::jsonb,
    
    'free',   -- Reference to public.price_types
    null,     -- Price amount in EUR
    
    'https://fundacionorange.es/aplicaciones/sigueme/',
    'https://play.google.com/store/apps/details?id=com.orange.sigueme',
    'https://apps.apple.com/es/app/s%C3%ADgueme/id691960078',
    
    4, -- ease_of_use
    3, -- cognitive_load
    2, -- sensory_load
    
    '{"https://wayztkamzskqudkehdcy.supabase.co/storage/v1/object/public/images/apps/sigueme/sigueme.png"}',
    true
  )
  RETURNING id -- Captures the generated UUID
),

-- ============================================================
-- JUNCTION TABLES INSERTION
-- ============================================================

-- 1. Supported UI languages
insert_languages AS (
  INSERT INTO public.app_languages (app_id, language_id)
  SELECT id, unnest(ARRAY['es']) 
  FROM new_app
),

-- 2. Supported platforms
insert_platforms AS (
  INSERT INTO public.app_platforms (app_id, platform_id)
  SELECT id, unnest(ARRAY['ios', 'android', 'windows']) 
  FROM new_app
)

-- 3. Categories 
INSERT INTO public.app_categories (app_id, category_id)
SELECT id, unnest(ARRAY['learning-games']) 
FROM new_app;