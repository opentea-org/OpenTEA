-- ============================================================
-- 07. APP DATA SEED: Dictapicto
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
    'dictapicto',
    
    -- Consolidated translations inside the JSONB column
    '{
      "en": {
        "name": "Dictapicto",
        "short_description": "A tool that shows pictograms while you talk, perfect for clear communication.",
        "long_description": "Dictapicto makes spoken communication easier to understand by showing pictograms in real time. It is a great way to help people with autism grasp information quickly and reduce confusion. Families and professionals can use it to talk about plans for the day, explain new activities, or give instructions in a clear, visual way that is easy to remember."
      },
      "es": {
        "name": "Dictapicto",
        "short_description": "Una herramienta que muestra pictogramas mientras hablas, ideal para comunicarse con claridad.",
        "long_description": "Dictapicto hace que el habla sea más fácil de entender al mostrar pictogramas al instante. Es una forma excelente de ayudar a las personas con autismo a captar información rápidamente y evitar confusiones. Las familias y profesionales pueden usarla para hablar sobre los planes del día, explicar actividades nuevas o dar instrucciones de una forma visual, clara y fácil de recordar."
      }
    }'::jsonb,
    
    'free',   -- Reference to public.price_types
    null,     -- Price amount in EUR
    
    'https://fundacionorange.es/aplicaciones/dictapicto-tea/',
    'https://play.google.com/store/apps/details?id=com.orange.dictapicto&hl=es',
    'https://apps.apple.com/es/app/dictapicto/id1449019695?platform=ipad',
    
    5, -- ease_of_use
    3, -- cognitive_load
    1, -- sensory_load
    
    '{"https://wayztkamzskqudkehdcy.supabase.co/storage/v1/object/public/images/apps/dictapicto/dictapicto.webp"}',
    false
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
  SELECT id, unnest(ARRAY['ios', 'android']) 
  FROM new_app
)

-- 3. Categories 
INSERT INTO public.app_categories (app_id, category_id)
SELECT id, unnest(ARRAY['text-to-speech']) 
FROM new_app;