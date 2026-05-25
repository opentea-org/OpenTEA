-- ============================================================
-- 05. APP DATA SEED: Día a Día
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
    'dia-a-dia',
    
    -- Consolidated translations inside the JSONB column
    '{
      "en": {
        "name": "Día a Día",
        "short_description": "A visual diary and daily planner that uses photos and pictograms.",
        "long_description": "Día a Día is a digital diary that helps people with autism or communication challenges organize their day. It lets users save and review their activities using their own photos, pictograms, and text. The app helps users prepare for what is going to happen next and gives them an easy way to show and talk about what they did earlier."
      },
      "es": {
        "name": "Día a Día",
        "short_description": "Un diario visual y planificador diario que utiliza fotos y pictogramas.",
        "long_description": "Día a Día es un diario digital que ayuda a personas con autismo o dificultades para comunicarse a organizar su día. Permite guardar y repasar las actividades usando fotos propias, pictogramas y texto. La aplicación sirve para que los usuarios sepan qué va a pasar después y les ofrece una forma muy fácil de mostrar y contar lo que ya han hecho."
      }
    }'::jsonb,
    
    'free',   -- Reference to public.price_types
    null,     -- Price amount in EUR
    
    'https://fundacionorange.es/aplicaciones/dia-a-dia/',
    null,     -- No Android version
    'https://apps.apple.com/es/app/d%C3%ADa-a-d%C3%ADa/id723667300',
    
    4, -- ease_of_use
    2, -- cognitive_load
    2, -- sensory_load
    
    '{"https://wayztkamzskqudkehdcy.supabase.co/storage/v1/object/public/images/apps/dia_a_dia/dia_a_dia.webp"}',
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
  SELECT id, unnest(ARRAY['ios']) 
  FROM new_app
)

-- 3. Categories  
INSERT INTO public.app_categories (app_id, category_id)
SELECT id, unnest(ARRAY['visual-schedules']) 
FROM new_app;