-- ============================================================
-- 00. LOOKUP TABLES SEED DATA
-- ============================================================

insert into public.categories (id) values
  ('text-to-speech'),
  ('symbol-boards'),
  ('social-stories'),
  ('visual-schedules'),
  ('learning-games');

insert into public.platforms (id) values
  ('ios'),
  ('android'),
  ('web'),
  ('windows');

insert into public.price_types (id) values
  ('free'),
  ('freemium'),
  ('paid'),
  ('subscription');

insert into public.languages (id) values
  ('en'),
  ('es'),
  ('fr'),
  ('de');-- ============================================================
-- INSERT APP: Cboard (Unified with CTEs)
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
    'cboard',
    
    -- Unification of translations within the JSONB column
    '{
      "en": {
        "name": "Cboard",
        "short_description": "A completely free, multi-language communication board that works without internet.",
        "long_description": "Cboard is a free tool designed to help children and adults with speech difficulties communicate instantly. It uses pictures and symbols to help users express themselves easily and supports more than 33 languages. It allows families to create custom picture boards from scratch and works completely without an internet connection."
      },
      "es": {
        "name": "Cboard",
        "short_description": "Un tablero de comunicación totalmente gratuito, multiidioma y que funciona sin internet.",
        "long_description": "Cboard es una herramienta gratuita diseñada para ayudar a comunicarse de forma inmediata a niños y adultos con dificultades para hablar. Utiliza imágenes y símbolos para que los usuarios se expresen con facilidad y cuenta con soporte para más de 33 idiomas. Permite a las familias crear tableros de imágenes personalizados desde cero y funciona completamente sin conexión a internet."
      }
      }'::jsonb,
    
    'freemium', -- Reference to public.price_types
    null,       -- price_amount_eur
    
    'https://www.cboard.io',
    'https://play.google.com/store/apps/details?id=com.unicef.cboard&hl=es',
    'https://apps.apple.com/es/app/aac-cboard-app/id6453683048',
    
    5, -- ease_of_use
    3, -- cognitive_load
    1, -- sensory_load
    
    '{"https://wayztkamzskqudkehdcy.supabase.co/storage/v1/object/public/images/apps/cboard/cboard.webp"}',
    true
  )
  RETURNING id -- Captures the generated UUID
),

-- ============================================================
-- INSERTION INTO JUNCTION TABLES USING THE CAPTURED UUID
-- ============================================================

-- 1. App languages (App UI)
insert_languages AS (
  INSERT INTO public.app_languages (app_id, language_id)
  SELECT id, unnest(ARRAY['en', 'es', 'fr', 'de']) 
  FROM new_app
),

-- 2. Platforms
insert_platforms AS (
  INSERT INTO public.app_platforms (app_id, platform_id)
  SELECT id, unnest(ARRAY['web', 'android', 'ios', 'windows']) 
  FROM new_app
)

-- 3. Categories
INSERT INTO public.app_categories (app_id, category_id)
SELECT id, unnest(ARRAY['text-to-speech', 'symbol-boards']) 
FROM new_app;-- ============================================================
-- 02. APP DATA SEED: Proloquo2Go
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
    'proloquo2go',
    
    -- Consolidated translations inside the JSONB column
    '{
          "en": {
          "name": "Proloquo2Go",
          "short_description": "An advanced communication app with an organized vocabulary that grows with the user.",
          "long_description": "Proloquo2Go is a robust tool featuring a pre-arranged vocabulary designed to help users learn to build complete sentences over time. It is highly flexible, allowing families to change the number of buttons on the screen to match a person''s visual, physical, or reading skills without breaking their familiar layout. It reads words out loud using high-quality, natural-sounding voices and operates fully offline."
        },
          "es": {
          "name": "Proloquo2Go",
          "short_description": "Una aplicación avanzada de comunicación con un vocabulario organizado que crece con el usuario.",
          "long_description": "Proloquo2Go es una herramienta robusta que incluye un vocabulario preorganizado, diseñado para ayudar a los usuarios a aprender a construir oraciones completas con el tiempo. Es muy flexible, permitiendo cambiar la cantidad de botones en pantalla para adaptarse a las capacidades visuales, físicas o de lectura de la persona sin alterar el orden al que ya se acostumbró. Lee las palabras en voz alta con voces muy naturales y funciona completamente sin internet."
        }
      }'::jsonb,
    
    'paid',   -- Reference to public.price_types
    300.00,   -- Price amount in EUR
    
    'https://www.assistiveware.com/products/proloquo2go',
    null,     -- No Android version
    'https://apps.apple.com/es/app/proloquo2go/id308368164',
    
    5, -- ease_of_use
    3, -- cognitive_load
    1, -- sensory_load
    
    '{"https://wayztkamzskqudkehdcy.supabase.co/storage/v1/object/public/images/apps/proloquo2go/proloquo2go.webp"}',
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
  SELECT id, unnest(ARRAY['en', 'es', 'fr']) 
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
SELECT id, unnest(ARRAY['text-to-speech', 'symbol-boards']) 
FROM new_app;-- ============================================================
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
FROM new_app;-- ============================================================
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
FROM new_app;-- ============================================================
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
FROM new_app;-- ============================================================
-- 06. APP DATA SEED: Sígueme
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
    'sigueme',
    
    -- Consolidated translations inside the JSONB column
'{
      "en": {
        "name": "Sígueme",
        "short_description": "A tool to help develop focus and understand the meaning of everyday objects.",
        "long_description": "Sígueme is designed to help people with autism improve their visual focus and learn to connect real objects with their photos or pictograms. It features six step-by-step levels that start by capturing attention using engaging sounds and images. It then advances to teaching how to recognize everyday items in real life using videos and games."
      },
      "es": {
        "name": "Sígueme",
        "short_description": "Una herramienta para desarrollar la atención y entender el significado de las cosas.",
        "long_description": "Sígueme está diseñada para ayudar a las personas con autismo a mejorar su atención visual y aprender a conectar objetos reales con sus fotos o pictogramas. Cuenta con seis niveles paso a paso que comienzan llamando la atención mediante sonidos e imágenes atractivas. Luego avanza hasta enseñar a reconocer las cosas del día a día en la vida real utilizando vídeos y juegos."
      }
    }'::jsonb,
    
    'free',   -- Reference to public.price_types
    null,     -- Price amount in EUR
    
    'https://fundacionorange.es/aplicaciones/sigueme/',
    'https://play.google.com/store/apps/details?id=com.orange.sigueme',
    'https://apps.apple.com/es/app/s%C3%ADgueme/id691960078',
    
    4, -- ease_of_use
    3, -- cognitive_load
    2, -- sensory_load
    
    '{"https://wayztkamzskqudkehdcy.supabase.co/storage/v1/object/public/images/apps/sigueme/sigueme.png"}',
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
  SELECT id, unnest(ARRAY['ios', 'android', 'windows']) 
  FROM new_app
)

-- 3. Categories 
INSERT INTO public.app_categories (app_id, category_id)
SELECT id, unnest(ARRAY['learning-games']) 
FROM new_app;-- ============================================================
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
FROM new_app;-- ============================================================
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
FROM new_app;-- ============================================================
-- 09. APP DATA SEED: MITA Language Therapy
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
    'mita-lang',
    
    -- Consolidated translations inside the JSONB column
'{
      "en": {
        "name": "MITA: Language Therapy",
        "short_description": "An interactive app that helps children learn language and think in images.",
        "long_description": "MITA is an app designed to help children with autism learn language and communication skills through fun puzzles. It helps children practice visualizing objects and concepts, which is a key part of learning to talk. The app automatically changes the difficulty level based on how the child is playing, so it is always a good challenge that matches their own pace."
      },
      "es": {
        "name": "MITA: Terapia del Lenguaje y Cognitiva",
        "short_description": "Una aplicación interactiva que ayuda a los niños a aprender el lenguaje y a pensar con imágenes.",
        "long_description": "MITA es una aplicación diseñada para ayudar a niños con autismo a aprender habilidades lingüísticas y de comunicación a través de divertidos puzles. Ayuda a los niños a practicar cómo imaginar objetos y conceptos, algo fundamental para aprender a hablar. La aplicación cambia automáticamente el nivel de dificultad según cómo juegue el niño, para que el reto sea siempre el adecuado y vaya a su propio ritmo."
      }
    }'::jsonb,
    
    'freemium', -- Reference to public.price_types
    null,       -- Price amount in EUR
    
    'https://imagiration.com/autism/',
    'https://play.google.com/store/apps/details?id=com.imagiration.mita',
    'https://apps.apple.com/es/app/terapia-lenguaje-y-cognitiva/id1020290425?platform=ipad',
    
    5, -- ease_of_use
    5, -- cognitive_load
    2, -- sensory_load
    
    '{"https://wayztkamzskqudkehdcy.supabase.co/storage/v1/object/public/images/apps/mita/mita_lenguaje.png"}',
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
  SELECT id, unnest(ARRAY['ios', 'android']) 
  FROM new_app
)

-- 3. Categories 
INSERT INTO public.app_categories (app_id, category_id)
SELECT id, unnest(ARRAY['learning-games']) 
FROM new_app;-- ============================================================
-- 10. APP DATA SEED: MITA Math & Logic
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
    'mita-math',
    
    -- Consolidated translations inside the JSONB column
'{
      "en": {
        "name": "MITA: Math & Logic",
        "short_description": "Interactive games to learn basic math and problem-solving skills.",
        "long_description": "MITA: Math & Logic is an educational app that helps children learn early math concepts and logical thinking through fun activities. It covers topics like numbers, shapes, and sorting through simple puzzles. Just like the language version of the app, it automatically adjusts the difficulty based on how the child is doing, so it always provides a challenge that is just right for them."
      },
      "es": {
        "name": "MITA: Matemáticas y Lógica",
        "short_description": "Juegos interactivos para aprender matemáticas básicas y a resolver problemas.",
        "long_description": "MITA: Matemáticas y Lógica es una aplicación educativa que ayuda a los niños a aprender los primeros conceptos matemáticos y a pensar de forma lógica mediante actividades divertidas. Enseña números, formas y a clasificar objetos a través de puzles sencillos. Al igual que la otra versión de la aplicación, cambia automáticamente la dificultad según cómo lo haga el niño, por lo que siempre ofrece un reto que se ajusta perfectamente a su ritmo."
      }
    }'::jsonb,
    
    'freemium', -- Reference to public.price_types
    null,       -- Price amount in EUR
    
    'https://imagiration.com/math-logic/',
    'https://play.google.com/store/apps/details?id=com.imagiration.math',
    'https://apps.apple.com/es/app/matem%C3%A1tica-y-l%C3%B3gica-para-ni%C3%B1os/id1439945439?platform=ipad',
    
    4, -- ease_of_use
    5, -- cognitive_load
    2, -- sensory_load
    
    '{"https://wayztkamzskqudkehdcy.supabase.co/storage/v1/object/public/images/apps/mita/mita_mates.webp"}',
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
  SELECT id, unnest(ARRAY['ios', 'android']) 
  FROM new_app
)

-- 3. Categories 
INSERT INTO public.app_categories (app_id, category_id)
SELECT id, unnest(ARRAY['learning-games']) 
FROM new_app;-- ============================================================
-- 11. APP DATA SEED: Proloquo
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
    'proloquo',
    
    -- Consolidated translations inside the JSONB column
    '{
      "en": {
        "name": "Proloquo",
        "short_description": "An app that helps users develop language and reading skills in an easy way.",
        "long_description": "Proloquo is a tool designed to help people build their language and reading skills. It comes with a pre-organized vocabulary, which means families do not have to spend a lot of time setting up everything from scratch. It stays updated across different devices and allows families and teachers to easily join in and support the user in their daily communication."
      },
      "es": {
        "name": "Proloquo",
        "short_description": "Una aplicación que ayuda a desarrollar el lenguaje y la lectura de forma sencilla.",
        "long_description": "Proloquo es una herramienta diseñada para ayudar a las personas a desarrollar sus habilidades lingüísticas y de lectura. Incluye un vocabulario organizado previamente, lo que significa que las familias no necesitan dedicar mucho tiempo a configurar todo desde cero. Se mantiene actualizada en diferentes dispositivos y permite que tanto familias como educadores se sumen fácilmente para apoyar al usuario en su comunicación diaria."
      }
    }'::jsonb,
    
    'subscription', -- Reference to public.price_types
    10.00,          -- Price amount in EUR
    
    'https://www.assistiveware.com/products/proloquo',
    null,           -- No Android version
    'https://apps.apple.com/es/app/proloquo/id1521978238?platform=ipad',
    
    5, -- ease_of_use
    3, -- cognitive_load
    1, -- sensory_load
    
    '{"https://wayztkamzskqudkehdcy.supabase.co/storage/v1/object/public/images/apps/proloquo/proloquo.webp"}',
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
  SELECT id, unnest(ARRAY['ios']) 
  FROM new_app
)

-- 3. Categories 
INSERT INTO public.app_categories (app_id, category_id)
SELECT id, unnest(ARRAY['text-to-speech', 'symbol-boards']) 
FROM new_app;-- ============================================================
-- 12. APP DATA SEED: Avaz AAC
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
    'avaz-aac',
    
    -- Consolidated translations inside the JSONB column
'{
      "en": {
        "name": "Avaz AAC",
        "short_description": "A communication app that uses pictures and text, with smart tools to help users speak.",
        "long_description": "Avaz AAC is a tool designed to help children and adults with autism or speech difficulties find their voice. It offers three different levels of vocabulary using pictures, and includes a keyboard with helpful word suggestions for those who can read and write. It also features a special area for families and professionals to see how the user is progressing and which words they use most often."
      },
      "es": {
        "name": "Avaz AAC",
        "short_description": "Una aplicación de comunicación que usa imágenes y texto, con herramientas inteligentes para ayudar a hablar.",
        "long_description": "Avaz AAC es una herramienta diseñada para ayudar a niños y adultos con autismo o dificultades para hablar a encontrar su propia voz. Ofrece tres niveles de vocabulario basados en imágenes e incluye un teclado con sugerencias de palabras para quienes ya saben leer y escribir. También cuenta con un espacio especial para que las familias y los profesionales puedan ver cómo progresa el usuario y qué palabras utiliza con más frecuencia."
      }
    }'::jsonb,
    
    'freemium', -- Reference to public.price_types
    null,       -- Price amount in EUR
    
    'https://www.avazapp.com/',
    'https://play.google.com/store/apps/details?id=com.avazapp.international.lite',
    'https://apps.apple.com/es/app/avaz-aac/id909574843?platform=ipad',
    
    4, -- ease_of_use
    3, -- cognitive_load
    1, -- sensory_load
    
    '{"https://wayztkamzskqudkehdcy.supabase.co/storage/v1/object/public/images/apps/avaz_aac/avaz.webp"}',
    true
  )
  RETURNING id -- Captures the generated UUID
),

-- ============================================================
-- JUNCTION TABLES INSERTION
-- ============================================================

-- 1. Supported UI languages (English only)
insert_languages AS (
  INSERT INTO public.app_languages (app_id, language_id)
  SELECT id, unnest(ARRAY['en']) 
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
SELECT id, unnest(ARRAY['text-to-speech', 'symbol-boards']) 
FROM new_app;-- ============================================================
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
FROM new_app;-- ============================================================
-- 14. APP DATA SEED: AsTeRICS Grid
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
    'asterics-grid',
    
    -- Consolidated translations inside the JSONB column
'{
      "en": {
        "name": "AsTeRICS Grid",
        "short_description": "A free, customizable communication tool using pictograms to help people speak.",
        "long_description": "AsTeRICS Grid is a free web tool that helps people communicate by creating personalized boards with pictures. It uses standard ARASAAC symbols and can read text out loud. It is a very powerful and flexible tool that works on many different devices and supports different ways of controlling the screen. Please note that because it is so advanced, it may take a little time to learn how to set it up and customize it exactly as you need."
      },
      "es": {
        "name": "AsTeRICS Grid",
        "short_description": "Una herramienta de comunicación gratuita y personalizable que usa pictogramas para ayudar a hablar.",
        "long_description": "AsTeRICS Grid es una herramienta web gratuita que ayuda a las personas a comunicarse creando tableros personalizados con imágenes. Utiliza los símbolos ARASAAC y puede leer el texto en voz alta. Es una herramienta muy potente y flexible que funciona en diferentes dispositivos y permite diversas formas de controlar la pantalla. Ten en cuenta que, al ser tan completa, puede llevar un poco de tiempo aprender a configurarla y personalizarla exactamente como la necesites."
      }
    }'::jsonb,
    
    'free',   -- Reference to public.price_types
    null,     -- Price amount in EUR
    
    'https://grid.asterics.eu/',
    null,     -- No Play Store (Web only)
    null,     -- No App Store (Web only)
    
    2, -- ease_of_use
    4, -- cognitive_load
    1, -- sensory_load
    
    '{"https://wayztkamzskqudkehdcy.supabase.co/storage/v1/object/public/images/apps/asterics/asterics.jpg"}',
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
  SELECT id, unnest(ARRAY['web']) 
  FROM new_app
)

-- 3. Categories
INSERT INTO public.app_categories (app_id, category_id)
SELECT id, unnest(ARRAY['symbol-boards']) 
FROM new_app;