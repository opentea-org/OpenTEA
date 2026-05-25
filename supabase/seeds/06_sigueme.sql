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
        "short_description": "A tool to help develop focus and understand the meaning of everyday objects.",
        "long_description": "Sígueme is designed to help people with autism improve their visual focus and learn to connect real objects with their photos or pictograms. It features six step-by-step levels that start by capturing attention using engaging sounds and images. It then advances to teaching how to recognize everyday items in real life using videos and games."
      },
      "es": {
        "name": "Sígueme",
        "short_description": "Una herramienta para desarrollar la atención y entender el significado de las cosas.",
        "long_description": "Sígueme está diseñada para ayudar a las personas con autismo a mejorar su atención visual y aprender a conectar objetos reales con sus fotos o pictogramas. Cuenta con seis niveles paso a paso que comienzan llamando la atención mediante sonidos e imágenes atractivas. Luego avanza hasta enseñar a reconocer las cosas del día a día en la vida real utilizando vídeos y juegos."
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