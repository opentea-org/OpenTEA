-- ============================================================
-- 14. APP DATA SEED: AsTeRICS Grid
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
    'asterics-grid',
    
    -- Consolidated translations inside the JSONB column
'{
      "en": {
        "name": "AsTeRICS Grid",
        "short_description": "A free, customizable communication tool using pictograms to help people speak.",
        "long_description": "AsTeRICS Grid is a free web tool that helps people communicate by creating personalized boards with pictures. It uses standard ARASAAC symbols and can read text out loud. It is a very powerful and flexible tool that works on many different devices and supports different ways of controlling the screen. Please note that because it is so advanced, it may take a little time to learn how to set it up and customize it exactly as you need."
      },
      "es": {
        "name": "AsTeRICS Grid",
        "short_description": "Una herramienta de comunicación gratuita y personalizable que usa pictogramas para ayudar a hablar.",
        "long_description": "AsTeRICS Grid es una herramienta web gratuita que ayuda a las personas a comunicarse creando tableros personalizados con imágenes. Utiliza los símbolos ARASAAC y puede leer el texto en voz alta. Es una herramienta muy potente y flexible que funciona en diferentes dispositivos y permite diversas formas de controlar la pantalla. Ten en cuenta que, al ser tan completa, puede llevar un poco de tiempo aprender a configurarla y personalizarla exactamente como la necesites."
      }
    }'::jsonb,
    
    'free',   -- Reference to public.price_types
    null,     -- Price amount in EUR
    
    'https://grid.asterics.eu/',
    null,     -- No Play Store (Web only)
    null,     -- No App Store (Web only)
    
    2, -- ease_of_use
    4, -- cognitive_load
    1, -- sensory_load
    
    '{"https://wayztkamzskqudkehdcy.supabase.co/storage/v1/object/public/images/apps/asterics/asterics.jpg"}',
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
  SELECT id, unnest(ARRAY['web']) 
  FROM new_app
)

-- 3. Categories
INSERT INTO public.app_categories (app_id, category_id)
SELECT id, unnest(ARRAY['symbol-boards']) 
FROM new_app;