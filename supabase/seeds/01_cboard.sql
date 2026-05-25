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
        "short_description": "A completely free, multi-language communication board that works without internet.",
        "long_description": "Cboard is a free tool designed to help children and adults with speech difficulties communicate instantly. It uses pictures and symbols to help users express themselves easily and supports more than 33 languages. It allows families to create custom picture boards from scratch and works completely without an internet connection."
      },
      "es": {
        "name": "Cboard",
        "short_description": "Un tablero de comunicación totalmente gratuito, multiidioma y que funciona sin internet.",
        "long_description": "Cboard es una herramienta gratuita diseñada para ayudar a comunicarse de forma inmediata a niños y adultos con dificultades para hablar. Utiliza imágenes y símbolos para que los usuarios se expresen con facilidad y cuenta con soporte para más de 33 idiomas. Permite a las familias crear tableros de imágenes personalizados desde cero y funciona completamente sin conexión a internet."
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
  SELECT id, unnest(ARRAY['en', 'es', 'fr', 'de']) 
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
SELECT id, unnest(ARRAY['text-to-speech', 'symbol-boards']) 
FROM new_app;