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
        "short_description": "Interactive visual stories adapted with pictograms, featuring a female protagonist.",
        "long_description": "Eva Aprende is a version of the \"José Aprende\" story collection featuring a female main character. It provides interactive visual stories specifically adapted for girls with autism and other learning difficulties. The app focuses on teaching autonomy, self-care, and emotions through pictograms, easy-to-read text, and audio support, functioning fully offline."
      },
      "es": {
        "name": "Eva Aprende",
        "short_description": "Cuentos visuales interactivos con pictogramas y protagonista femenina.",
        "long_description": "Eva Aprende es una versión de la colección de cuentos \"José Aprende\" protagonizada por un personaje femenino. Ofrece historias visuales interactivas adaptadas específicamente para niñas con autismo y otras dificultades de aprendizaje. La aplicación se centra en la enseñanza de la autonomía, el autocuidado y las emociones mediante pictogramas, texto de lectura fácil y soporte de audio, funcionando completamente sin conexión."
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