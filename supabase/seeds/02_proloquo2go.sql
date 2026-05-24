-- ============================================================
-- 02. APP DATA SEED: Proloquo2Go
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
    'proloquo2go',
    
    -- Consolidated translations inside the JSONB column
    '{
      "en": {
        "name": "Proloquo2Go",
        "short_description": "Symbol-based AAC application available for iOS devices.",
        "long_description": "Proloquo2Go is a symbol-supported communication app developed for iPad and iPhone. It utilizes the Crescendo vocabulary system, offering customizable grid sizes to accommodate different literacy levels. The application supports text-to-speech with natural-sounding voices, allows for button and folder customization, and operates fully offline without an internet connection."
      },
      "es": {
        "name": "Proloquo2Go",
        "short_description": "Aplicación de CAA basada en símbolos disponible para dispositivos iOS.",
        "long_description": "Proloquo2Go es una aplicación de comunicación basada en símbolos desarrollada para iPad y iPhone. Utiliza el sistema de vocabulario Crescendo, ofreciendo tamaños de cuadrícula personalizables para adaptarse a diferentes niveles de lectoescritura. La aplicación soporta texto a voz, permite la personalización de botones y carpetas, y funciona completamente sin conexión a internet."
      }
    }'::jsonb,
    
    'paid',   -- Reference to public.price_types
    300.00,   -- Price amount in EUR
    
    'https://www.assistiveware.com/products/proloquo2go',
    null,     -- No Android version
    'https://apps.apple.com/es/app/proloquo2go/id308368164',
    
    5, -- ease_of_use
    3, -- cognitive_load
    1, -- sensory_load
    
    '{"https://wayztkamzskqudkehdcy.supabase.co/storage/v1/object/public/images/apps/proloquo2go/proloquo2go.webp"}',
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
  SELECT id, unnest(ARRAY['en', 'es', 'fr']) 
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
SELECT id, unnest(ARRAY['symbol-boards', 'mixed-communication']) 
FROM new_app;