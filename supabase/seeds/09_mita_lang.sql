-- ============================================================
-- 09. APP DATA SEED: MITA Language Therapy
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
    'mita-lang',
    
    -- Consolidated translations inside the JSONB column
'{
      "en": {
        "name": "MITA: Language Therapy",
        "short_description": "An interactive app that helps children learn language and think in images.",
        "long_description": "MITA is an app designed to help children with autism learn language and communication skills through fun puzzles. It helps children practice visualizing objects and concepts, which is a key part of learning to talk. The app automatically changes the difficulty level based on how the child is playing, so it is always a good challenge that matches their own pace."
      },
      "es": {
        "name": "MITA: Terapia del Lenguaje y Cognitiva",
        "short_description": "Una aplicación interactiva que ayuda a los niños a aprender el lenguaje y a pensar con imágenes.",
        "long_description": "MITA es una aplicación diseñada para ayudar a niños con autismo a aprender habilidades lingüísticas y de comunicación a través de divertidos puzles. Ayuda a los niños a practicar cómo imaginar objetos y conceptos, algo fundamental para aprender a hablar. La aplicación cambia automáticamente el nivel de dificultad según cómo juegue el niño, para que el reto sea siempre el adecuado y vaya a su propio ritmo."
      }
    }'::jsonb,
    
    'freemium', -- Reference to public.price_types
    null,       -- Price amount in EUR
    
    'https://imagiration.com/autism/',
    'https://play.google.com/store/apps/details?id=com.imagiration.mita',
    'https://apps.apple.com/es/app/terapia-lenguaje-y-cognitiva/id1020290425?platform=ipad',
    
    5, -- ease_of_use
    5, -- cognitive_load
    2, -- sensory_load
    
    '{"https://wayztkamzskqudkehdcy.supabase.co/storage/v1/object/public/images/apps/mita/mita_lenguaje.png"}',
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
  SELECT id, unnest(ARRAY['ios', 'android']) 
  FROM new_app
)

-- 3. Categories 
INSERT INTO public.app_categories (app_id, category_id)
SELECT id, unnest(ARRAY['learning-games']) 
FROM new_app;