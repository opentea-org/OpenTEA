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
        "short_description": "Free and open-source web-based AAC communicator using ARASAAC pictograms.",
        "long_description": "AsTeRICS Grid is a cross-platform web application for augmentative communication. It allows the creation of fully customizable communication boards using ARASAAC symbols and supports text-to-speech. While powerful and compatible with various input methods (including eye-tracking), the initial configuration and editing interface have a steep learning curve."
      },
      "es": {
        "name": "AsTeRICS Grid",
        "short_description": "Comunicador web de CAA gratuito y de código abierto que utiliza pictogramas de ARASAAC.",
        "long_description": "AsTeRICS Grid es una aplicación web multiplataforma para la comunicación aumentativa. Permite crear tableros de comunicación totalmente personalizables utilizando símbolos ARASAAC y soporta texto a voz. Aunque es potente y compatible con varios métodos de entrada (incluido el seguimiento ocular), la configuración inicial y la interfaz de edición tienen una curva de aprendizaje alta."
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