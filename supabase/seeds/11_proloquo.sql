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
        "short_description": "AAC app designed for literacy and ease of use.",
        "long_description": "Proloquo is a subscription-based AAC application for iOS designed to build language skills alongside literacy. It utilizes the \"Crescendo Evolution\" vocabulary system, which reduces the need for customization by offering a logically organized layout. It features cloud synchronization across devices and allows free access for families and educators to support the user."
      },
      "es": {
        "name": "Proloquo",
        "short_description": "App de CAA diseñada para la alfabetización y facilidad de uso.",
        "long_description": "Proloquo es una aplicación de CAA por suscripción para iOS diseñada para desarrollar habilidades lingüísticas junto con la lectoescritura. Utiliza el sistema de vocabulario \"Crescendo Evolution\", que reduce la necesidad de personalización ofreciendo una distribución organizada lógicamente. Cuenta con sincronización en la nube entre dispositivos y permite acceso gratuito a familias y educadores para apoyar al usuario."
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
SELECT id, unnest(ARRAY['mixed-communication']) 
FROM new_app;