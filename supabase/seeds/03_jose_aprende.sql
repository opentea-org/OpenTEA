-- ============================================================
-- 03. APP DATA SEED: José Aprende
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
    'jose-aprende',
    
    -- Consolidated translations inside the JSONB column
    '{
      "en": {
        "name": "José Aprende",
        "short_description": "Interactive visual stories adapted with pictograms for routines and emotions.",
        "long_description": "José Aprende is a collection of interactive stories designed for visual learners, covering themes of self-care, routines, and emotions. The application uses pictograms, interactive illustrations, and a read-aloud feature to support language acquisition and autonomy. It features a simplified interface suitable for children with autism and pre-readers."
      },
      "es": {
        "name": "José Aprende",
        "short_description": "Cuentos visuales interactivos con pictogramas para rutinas y emociones.",
        "long_description": "José Aprende es una colección de cuentos interactivos diseñados para aprendices visuales, abarcando temas de autocuidado, rutinas y emociones. La aplicación utiliza pictogramas, ilustraciones interactivas y función de lectura automática para apoyar la adquisición del lenguaje y la autonomía. Cuenta con una interfaz simplificada apta para niños con autismo y pre-lectores."
      }
    }'::jsonb,
    
    'free',   -- Reference to public.price_types
    null,     -- Price amount in EUR
    
    'https://fundacionorange.es/aplicaciones/cuentos-visuales-jose-aprende/',
    'https://play.google.com/store/apps/details?id=com.orange.joseaprende&hl=es',
    'https://apps.apple.com/es/app/jos%C3%A9-aprende/id815105400',
    
    5, -- ease_of_use
    4, -- cognitive_load
    2, -- sensory_load
    
    '{"https://wayztkamzskqudkehdcy.supabase.co/storage/v1/object/public/images/apps/jose_aprende/jose_aprende.png"}',
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
  SELECT id, unnest(ARRAY['ios', 'android']) 
  FROM new_app
)

-- 3. Categories  
INSERT INTO public.app_categories (app_id, category_id)
SELECT id, unnest(ARRAY['social-stories']) 
FROM new_app;