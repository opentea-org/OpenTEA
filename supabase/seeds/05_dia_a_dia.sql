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
        "short_description": "Visual diary and schedule organizer using pictograms and photos.",
        "long_description": "Día a Día is a visual diary designed for people with autism and communication difficulties to structure their daily routine. It allows users to record and review daily activities using customized photos, pictograms, and text. The app functions as both an anticipation tool for upcoming events and a communication aid to recount past activities."
      },
      "es": {
        "name": "Día a Día",
        "short_description": "Diario visual y organizador de agenda mediante pictogramas y fotos.",
        "long_description": "Día a Día es un diario visual diseñado para personas con autismo y dificultades de comunicación para estructurar su rutina diaria. Permite registrar y revisar actividades diarias utilizando fotos personalizadas, pictogramas y texto. La aplicación funciona tanto como herramienta de anticipación para eventos futuros como ayuda comunicativa para relatar actividades pasadas."
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