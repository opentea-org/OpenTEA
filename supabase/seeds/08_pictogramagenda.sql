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
        "short_description": "A visual agenda to organize daily activities with pictograms.",
        "long_description": "PictogramAgenda helps organize daily routines by showing a sequence of pictograms. It displays tasks in a simple list that is easy to follow. Users can cross out each task as they finish it, which helps them understand the order of events and track how the day is moving forward without any complicated menus."
      },
      "es": {
        "name": "PictogramAgenda",
        "short_description": "Una agenda visual para organizar las actividades del día con pictogramas.",
        "long_description": "PictogramAgenda ayuda a organizar las rutinas diarias mostrando una secuencia de pictogramas. Muestra las tareas en una lista sencilla fácil de seguir. Los usuarios pueden tachar cada tarea a medida que la terminan, lo que ayuda a comprender el orden de las cosas y a ver cómo avanza el día sin menús complicados."
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