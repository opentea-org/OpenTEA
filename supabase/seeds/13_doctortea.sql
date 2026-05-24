-- ============================================================
-- 13. APP DATA SEED: Doctor TEA
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
    'doctor-tea',
    
    -- Consolidated translations inside the JSONB column
    '{
      "en": {
        "name": "Doctor TEA",
        "short_description": "Web platform to familiarize people with autism with medical procedures using cartoons and videos.",
        "long_description": "Doctor TEA is a web platform designed to facilitate medical visits for people with autism. It uses vignettes, videos and animations to explain common medical tests and environments (like the dentist, blood tests, or x-rays) to reduce anxiety and fear through anticipation and desensitization."
      },
      "es": {
        "name": "Doctor TEA",
        "short_description": "Web para familiarizar a personas con autismo con procedimientos médicos mediante vídeos y viñetas.",
        "long_description": "Doctor TEA es una plataforma web diseñada para facilitar las visitas médicas de las personas con autismo. Utiliza viñetas, vídeos y animaciones para explicar las pruebas médicas más frecuentes y los entornos (como el dentista, análisis de sangre o radiografías) para reducir la ansiedad y el miedo a través de la anticipación y la desensibilización."
      }
    }'::jsonb,
    
    'free',   -- Reference to public.price_types
    null,     -- Price amount in EUR
    
    'https://fundacionorange.es/aplicaciones/doctor-tea/',
    null,     -- No Play Store (Web only)
    null,     -- No App Store (Web only)
    
    4, -- ease_of_use
    2, -- cognitive_load
    1, -- sensory_load
    
    '{"https://wayztkamzskqudkehdcy.supabase.co/storage/v1/object/public/images/apps/doctortea/doctortea.png"}',
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
  SELECT id, unnest(ARRAY['es']) 
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
SELECT id, unnest(ARRAY['social-stories', 'visual-schedules']) 
FROM new_app;