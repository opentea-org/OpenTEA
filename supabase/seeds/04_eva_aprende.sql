-- ============================================================
-- 04. APP DATA SEED: Eva Aprende
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
    'eva-aprende',
    
    -- Consolidated translations inside the JSONB column
    '{
      "en": {
        "name": "Eva Aprende",
        "short_description": "Interactive stories with pictures featuring a girl as the main character.",
        "long_description": "Eva Aprende is a version of the \"José Aprende\" stories starring a girl. It offers digital books with pictures designed specially to help girls with autism or learning challenges. The app uses simple drawings, easy text, and a voice that reads out loud to teach daily habits, personal care, and feelings. It works completely without an internet connection."
      },
      "es": {
        "name": "Eva Aprende",
        "short_description": "Cuentos interactivos con imágenes que tienen a una niña como protagonista.",
        "long_description": "Eva Aprende es una versión de los cuentos de \"José Aprende\" protagonizada por una niña. Ofrece libros digitales con imágenes pensados especialmente para ayudar a niñas con autismo o dificultades de aprendizaje. La aplicación usa dibujos sencillos, textos fáciles y una voz que lee en voz alta para enseñar hábitos diarios, aseo personal y sentimientos. Funciona completamente sin conexión a internet."
      }
    }'::jsonb,
    
    'free',
    null,
    
    'https://fundacionorange.es/aplicaciones/cuentos-visuales-eva-aprende/',
    'https://play.google.com/store/apps/details?id=com.orange.evaaprende&hl=es',
    'https://apps.apple.com/es/app/eva-aprende/id1672144420',
    
    5,
    4,
    2,
    
    '{"https://wayztkamzskqudkehdcy.supabase.co/storage/v1/object/public/images/apps/eva_aprende/eva_aprende.png"}',
    true
  )
  RETURNING id
),

insert_languages AS (
  INSERT INTO public.app_languages (app_id, language_id)
  SELECT id, unnest(ARRAY['es']) 
  FROM new_app
),

insert_platforms AS (
  INSERT INTO public.app_platforms (app_id, platform_id)
  SELECT id, unnest(ARRAY['ios', 'android']) 
  FROM new_app
)

INSERT INTO public.app_categories (app_id, category_id)
SELECT id, unnest(ARRAY['social-stories']) 
FROM new_app;