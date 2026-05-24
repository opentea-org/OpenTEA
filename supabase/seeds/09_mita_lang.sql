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
        "short_description": "Adaptive early intervention application for language and cognitive development.",
        "long_description": "MITA (Mental Imagery Therapy for Autism) is a clinically validated early-intervention application for children with ASD. It utilizes interactive puzzles designed to develop mental imagery and language skills. The app features an adaptive algorithm that adjusts the difficulty level in real-time based on the child''s performance, providing a personalized learning path."
      },
      "es": {
        "name": "MITA: Terapia del Lenguaje y Cognitiva",
        "short_description": "Aplicación de atención temprana adaptativa para el desarrollo del lenguaje y cognitivo.",
        "long_description": "MITA (Terapia de Imagen Mental para el Autismo) es una aplicación de atención temprana validada clínicamente para niños con TEA. Utiliza puzles interactivos diseñados para desarrollar la imaginación mental y las habilidades lingüísticas. La app cuenta con un algoritmo adaptativo que ajusta el nivel de dificultad en tiempo real según el rendimiento del niño, ofreciendo una ruta de aprendizaje personalizada."
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