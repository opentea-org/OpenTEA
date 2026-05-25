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
        "short_description": "A website that helps prepare for medical visits using videos and cartoons.",
        "long_description": "Doctor TEA is a website designed to make medical appointments less stressful for people with autism. It uses short videos and cartoons to show what happens during common health check-ups, like going to the dentist or getting a blood test. By showing these scenes beforehand, it helps reduce anxiety and fear so that users know exactly what to expect."
      },
      "es": {
        "name": "Doctor TEA",
        "short_description": "Una web que ayuda a preparar las visitas médicas usando vídeos y dibujos.",
        "long_description": "Doctor TEA es una página web diseñada para hacer que las visitas médicas sean menos estresantes para las personas con autismo. Utiliza vídeos cortos y dibujos para mostrar qué ocurre durante las pruebas de salud más comunes, como ir al dentista o hacerse un análisis de sangre. Al enseñar estas situaciones de antemano, ayuda a reducir la ansiedad y el miedo para que los usuarios sepan exactamente qué va a pasar."
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
SELECT id, unnest(ARRAY['social-stories']) 
FROM new_app;