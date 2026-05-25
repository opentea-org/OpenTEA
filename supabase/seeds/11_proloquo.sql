-- ============================================================
-- 11. APP DATA SEED: Proloquo
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
    'proloquo',
    
    -- Consolidated translations inside the JSONB column
    '{
      "en": {
        "name": "Proloquo",
        "short_description": "An app that helps users develop language and reading skills in an easy way.",
        "long_description": "Proloquo is a tool designed to help people build their language and reading skills. It comes with a pre-organized vocabulary, which means families do not have to spend a lot of time setting up everything from scratch. It stays updated across different devices and allows families and teachers to easily join in and support the user in their daily communication."
      },
      "es": {
        "name": "Proloquo",
        "short_description": "Una aplicación que ayuda a desarrollar el lenguaje y la lectura de forma sencilla.",
        "long_description": "Proloquo es una herramienta diseñada para ayudar a las personas a desarrollar sus habilidades lingüísticas y de lectura. Incluye un vocabulario organizado previamente, lo que significa que las familias no necesitan dedicar mucho tiempo a configurar todo desde cero. Se mantiene actualizada en diferentes dispositivos y permite que tanto familias como educadores se sumen fácilmente para apoyar al usuario en su comunicación diaria."
      }
    }'::jsonb,
    
    'subscription', -- Reference to public.price_types
    10.00,          -- Price amount in EUR
    
    'https://www.assistiveware.com/products/proloquo',
    null,           -- No Android version
    'https://apps.apple.com/es/app/proloquo/id1521978238?platform=ipad',
    
    5, -- ease_of_use
    3, -- cognitive_load
    1, -- sensory_load
    
    '{"https://wayztkamzskqudkehdcy.supabase.co/storage/v1/object/public/images/apps/proloquo/proloquo.webp"}',
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
  SELECT id, unnest(ARRAY['en', 'es']) 
  FROM new_app
),

-- 2. Supported platforms
insert_platforms AS (
  INSERT INTO public.app_platforms (app_id, platform_id)
  SELECT id, unnest(ARRAY['ios']) 
  FROM new_app
)

-- 3. Categories 
INSERT INTO public.app_categories (app_id, category_id)
SELECT id, unnest(ARRAY['text-to-speech', 'symbol-boards']) 
FROM new_app;