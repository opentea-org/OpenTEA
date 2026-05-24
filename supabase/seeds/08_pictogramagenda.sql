-- ============================================================
-- 08. APP DATA SEED: PictogramAgenda
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
    'pictogramagenda',
    
    -- Consolidated translations inside the JSONB column
    '{
      "en": {
        "name": "PictogramAgenda",
        "short_description": "Visual schedule tool to organize sequences of daily activities.",
        "long_description": "PictogramAgenda allows the configuration and display of visual sequences using pictograms to structure daily routines. The interface presents a vertical timeline where users can cross out completed tasks, helping to understand the passage of time and the order of activities without complex navigation."
      },
      "es": {
        "name": "PictogramAgenda",
        "short_description": "Herramienta de agenda visual para organizar secuencias de actividades diarias.",
        "long_description": "PictogramAgenda permite configurar y mostrar secuencias visuales mediante pictogramas para estructurar las rutinas diarias. La interfaz presenta una línea temporal vertical donde los usuarios pueden tachar las tareas completadas, ayudando a comprender el paso del tiempo y el orden de las actividades sin una navegación compleja."
      }
    }'::jsonb,
    
    'free',   -- Reference to public.price_types
    null,     -- Price amount in EUR
    
    'https://pictogramagenda.es/',
    'https://play.google.com/store/apps/details?id=com.lorenzomoreno.pictogramagenda',
    'https://apps.apple.com/es/app/pictogramagenda/id1546628308?platform=ipad',
    
    5, -- ease_of_use
    2, -- cognitive_load
    1, -- sensory_load
    
    '{"https://wayztkamzskqudkehdcy.supabase.co/storage/v1/object/public/images/apps/pictogramagenda/pictogramagenda.webp"}',
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
  SELECT id, unnest(ARRAY['web', 'android', 'ios']) 
  FROM new_app
)

-- 3. Categories
INSERT INTO public.app_categories (app_id, category_id)
SELECT id, unnest(ARRAY['visual-schedules']) 
FROM new_app;