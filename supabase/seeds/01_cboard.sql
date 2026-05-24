-- ============================================================
-- INSERT APP: Cboard (Unified with CTEs)
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
    'cboard',
    
    -- Unification of translations within the JSONB column
    '{
      "en": {
        "name": "Cboard",
        "short_description": "Open-source AAC communication board with offline support.",
        "long_description": "Cboard is a free, open-source augmentative and alternative communication (AAC) web application for children and adults with speech and language impairments, aiding communication with symbols and text-to-speech. It supports 33+ languages, works offline, allows custom board creation, and is compatible with modern browsers on desktops, tablets, and mobile phones."
      },
      "es": {
        "name": "Cboard",
        "short_description": "Tablero de comunicación CAA de código abierto y con soporte offline.",
        "long_description": "Cboard es una aplicación web gratuita y de código abierto de comunicación aumentativa y alternativa (CAA) para niños y adultos con dificultades del habla. Ayuda a la comunicación mediante símbolos y texto a voz. Soporta más de 33 idiomas, funciona sin conexión, permite crear tableros personalizados y es compatible con navegadores modernos en ordenadores, tabletas y móviles."
      }
    }'::jsonb,
    
    'freemium', -- Reference to public.price_types
    null,       -- price_amount_eur
    
    'https://www.cboard.io',
    'https://play.google.com/store/apps/details?id=com.unicef.cboard&hl=es',
    'https://apps.apple.com/es/app/aac-cboard-app/id6453683048',
    
    5, -- ease_of_use
    3, -- cognitive_load
    1, -- sensory_load
    
    '{"https://wayztkamzskqudkehdcy.supabase.co/storage/v1/object/public/images/apps/cboard/cboard.webp"}',
    true
  )
  RETURNING id -- Captures the generated UUID
),

-- ============================================================
-- INSERTION INTO JUNCTION TABLES USING THE CAPTURED UUID
-- ============================================================

-- 1. App languages (App UI)
insert_languages AS (
  INSERT INTO public.app_languages (app_id, language_id)
  SELECT id, unnest(ARRAY['en', 'es']) 
  FROM new_app
),

-- 2. Platforms
insert_platforms AS (
  INSERT INTO public.app_platforms (app_id, platform_id)
  SELECT id, unnest(ARRAY['web', 'android', 'ios', 'windows']) 
  FROM new_app
)

-- 3. Categories
INSERT INTO public.app_categories (app_id, category_id)
SELECT id, unnest(ARRAY['symbol-boards']) 
FROM new_app;