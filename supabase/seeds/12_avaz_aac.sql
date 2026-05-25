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
        "short_description": "A communication app that uses pictures and text, with smart tools to help users speak.",
        "long_description": "Avaz AAC is a tool designed to help children and adults with autism or speech difficulties find their voice. It offers three different levels of vocabulary using pictures, and includes a keyboard with helpful word suggestions for those who can read and write. It also features a special area for families and professionals to see how the user is progressing and which words they use most often."
      },
      "es": {
        "name": "Avaz AAC",
        "short_description": "Una aplicación de comunicación que usa imágenes y texto, con herramientas inteligentes para ayudar a hablar.",
        "long_description": "Avaz AAC es una herramienta diseñada para ayudar a niños y adultos con autismo o dificultades para hablar a encontrar su propia voz. Ofrece tres niveles de vocabulario basados en imágenes e incluye un teclado con sugerencias de palabras para quienes ya saben leer y escribir. También cuenta con un espacio especial para que las familias y los profesionales puedan ver cómo progresa el usuario y qué palabras utiliza con más frecuencia."
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
SELECT id, unnest(ARRAY['text-to-speech', 'symbol-boards']) 
FROM new_app;