-- ============================================================
-- 10. APP DATA SEED: MITA Math & Logic
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
    'mita-math',
    
    -- Consolidated translations inside the JSONB column
    '{
      "en": {
        "name": "MITA: Math & Logic",
        "short_description": "Adaptive games for arithmetic, geometry, and logical reasoning.",
        "long_description": "MITA: Math & Logic is an educational application designed to teach early math concepts and reasoning skills. It covers arithmetic, geometry, and logic through gamified exercises. Like its language counterpart, it uses an adaptive algorithm that adjusts the difficulty of the puzzles based on the user''s accuracy and progress."
      },
      "es": {
        "name": "MITA: Matemáticas y Lógica",
        "short_description": "Juegos adaptativos de aritmética, geometría y razonamiento lógico.",
        "long_description": "MITA: Matemáticas y Lógica es una aplicación educativa diseñada para enseñar conceptos matemáticos tempranos y habilidades de razonamiento. Cubre aritmética, geometría y lógica a través de ejercicios gamificados. Al igual que su versión de lenguaje, utiliza un algoritmo adaptativo que ajusta la dificultad de los puzles basándose en la precisión y el progreso del usuario."
      }
    }'::jsonb,
    
    'freemium', -- Reference to public.price_types
    null,       -- Price amount in EUR
    
    'https://imagiration.com/math-logic/',
    'https://play.google.com/store/apps/details?id=com.imagiration.math',
    'https://apps.apple.com/es/app/matem%C3%A1tica-y-l%C3%B3gica-para-ni%C3%B1os/id1439945439?platform=ipad',
    
    4, -- ease_of_use
    5, -- cognitive_load
    2, -- sensory_load
    
    '{"https://wayztkamzskqudkehdcy.supabase.co/storage/v1/object/public/images/apps/mita/mita_mates.webp"}',
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