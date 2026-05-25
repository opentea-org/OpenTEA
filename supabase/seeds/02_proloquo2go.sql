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
          "short_description": "An advanced communication app with an organized vocabulary that grows with the user.",
          "long_description": "Proloquo2Go is a robust tool featuring a pre-arranged vocabulary designed to help users learn to build complete sentences over time. It is highly flexible, allowing families to change the number of buttons on the screen to match a person''s visual, physical, or reading skills without breaking their familiar layout. It reads words out loud using high-quality, natural-sounding voices and operates fully offline."
        },
          "es": {
          "name": "Proloquo2Go",
          "short_description": "Una aplicación avanzada de comunicación con un vocabulario organizado que crece con el usuario.",
          "long_description": "Proloquo2Go es una herramienta robusta que incluye un vocabulario preorganizado, diseñado para ayudar a los usuarios a aprender a construir oraciones completas con el tiempo. Es muy flexible, permitiendo cambiar la cantidad de botones en pantalla para adaptarse a las capacidades visuales, físicas o de lectura de la persona sin alterar el orden al que ya se acostumbró. Lee las palabras en voz alta con voces muy naturales y funciona completamente sin internet."
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
SELECT id, unnest(ARRAY['text-to-speech', 'symbol-boards']) 
FROM new_app;