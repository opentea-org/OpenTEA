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
    "short_description": "Interactive stories with pictures that teach daily routines and emotions.",
    "long_description": "José Aprende is a collection of interactive stories for children who learn best with pictures. It covers everyday topics like personal care, daily habits, and feelings. The app uses simple drawings, animations, and reads the text out loud to help children learn new words and do things by themselves. Its design is very easy to navigate, making it ideal for children with autism and those who do not know how to read yet."
  },
  "es": {
    "name": "José Aprende",
    "short_description": "Cuentos interactivos con imágenes que enseñan rutinas diarias y emociones.",
    "long_description": "José Aprende es una colección de cuentos interactivos para niños que aprenden mejor con imágenes. Abarca temas del día a día como el aseo personal, los hábitos y los sentimientos. La aplicación usa dibujos sencillos, animaciones y lee el texto en voz alta para ayudar a los niños a aprender nuevas palabras y hacer cosas por sí mismos. Su diseño es muy fácil de usar, ideal para niños con autismo y aquellos que todavía no saben leer."
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