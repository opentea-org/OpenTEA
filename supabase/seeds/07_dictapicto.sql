-- ============================================================
-- 07. APP DATA SEED: Dictapicto
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
    'dictapicto',
    
    -- Consolidated translations inside the JSONB column
    '{
      "en": {
        "name": "Dictapicto",
        "short_description": "Real-time voice-to-pictogram translator to anticipate activities.",
        "long_description": "Dictapicto allows the conversion of oral language into visual information in real time. Designed to improve access to information for people with ASD, the app translates spoken words into a sequence of pictograms. It is particularly useful for anticipating activities, sequencing tasks, and clarifying instructions in a visual format."
      },
      "es": {
        "name": "Dictapicto",
        "short_description": "Traductor de voz a pictogramas en tiempo real para anticipar actividades.",
        "long_description": "Dictapicto permite convertir el lenguaje oral en información visual en tiempo real. Diseñada para mejorar el acceso a la información de personas con TEA, la aplicación traduce las palabras habladas a una secuencia de pictogramas. Es especialmente útil para anticipar actividades, secuenciar tareas y aclarar instrucciones en un formato visual."
      }
    }'::jsonb,
    
    'free',   -- Reference to public.price_types
    null,     -- Price amount in EUR
    
    'https://fundacionorange.es/aplicaciones/dictapicto-tea/',
    'https://play.google.com/store/apps/details?id=com.orange.dictapicto&hl=es',
    'https://apps.apple.com/es/app/dictapicto/id1449019695?platform=ipad',
    
    5, -- ease_of_use
    3, -- cognitive_load
    1, -- sensory_load
    
    '{"https://wayztkamzskqudkehdcy.supabase.co/storage/v1/object/public/images/apps/dictapicto/dictapicto.webp"}',
    false
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
  SELECT id, unnest(ARRAY['ios', 'android']) 
  FROM new_app
)

-- 3. Categories 
INSERT INTO public.app_categories (app_id, category_id)
SELECT id, unnest(ARRAY['visual-schedules', 'symbol-boards']) 
FROM new_app;