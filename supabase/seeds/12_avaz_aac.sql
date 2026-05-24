-- ============================================================
-- 12. APP DATA SEED: Avaz AAC
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
    'avaz-aac',
    
    -- Consolidated translations inside the JSONB column
    '{
      "en": {
        "name": "Avaz AAC",
        "short_description": "Picture and text-based AAC app with predictive capabilities.",
        "long_description": "Avaz AAC is an augmentative and alternative communication app designed for autism and speech difficulties. It offers three levels of vocabulary (picture-based) and a keyboard mode with prediction for literate users. The app includes a dashboard to track the communicator''s progress and vocabulary usage."
      },
      "es": {
        "name": "Avaz AAC",
        "short_description": "App de CAA basada en imágenes y texto con capacidades predictivas (Solo en inglés).",
        "long_description": "Avaz AAC es una aplicación de comunicación aumentativa y alternativa diseñada para el autismo y dificultades del habla. Ofrece tres niveles de vocabulario (basado en imágenes) y un modo teclado con predicción para usuarios alfabetizados. La aplicación incluye un panel de control para rastrear el progreso del comunicador y el uso del vocabulario."
      }
    }'::jsonb,
    
    'freemium', -- Reference to public.price_types
    null,       -- Price amount in EUR
    
    'https://www.avazapp.com/',
    'https://play.google.com/store/apps/details?id=com.avazapp.international.lite',
    'https://apps.apple.com/es/app/avaz-aac/id909574843?platform=ipad',
    
    4, -- ease_of_use
    3, -- cognitive_load
    1, -- sensory_load
    
    '{"https://wayztkamzskqudkehdcy.supabase.co/storage/v1/object/public/images/apps/avaz_aac/avaz.webp"}',
    true
  )
  RETURNING id -- Captures the generated UUID
),

-- ============================================================
-- JUNCTION TABLES INSERTION
-- ============================================================

-- 1. Supported UI languages (English only)
insert_languages AS (
  INSERT INTO public.app_languages (app_id, language_id)
  SELECT id, unnest(ARRAY['en']) 
  FROM new_app
),

-- 2. Supported platforms
insert_platforms AS (
  INSERT INTO public.app_platforms (app_id, platform_id)
  SELECT id, unnest(ARRAY['ios', 'android']) 
  FROM new_app
)

-- 3. Categories 
INSERT INTO public.app_categories (app_id, category_id)
SELECT id, unnest(ARRAY['mixed-communication']) 
FROM new_app;