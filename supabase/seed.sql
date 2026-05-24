-- ============================================================
-- 00. LOOKUP TABLES SEED DATA
-- ============================================================

insert into public.categories (id) values
  ('text-to-speech'),
  ('symbol-boards'),
  ('mixed-communication'),
  ('first-communicators'),
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
        "short_description": "Open-source AAC communication board with offline support.",
        "long_description": "Cboard is a free, open-source augmentative and alternative communication (AAC) web application for children and adults with speech and language impairments, aiding communication with symbols and text-to-speech. It supports 33+ languages, works offline, allows custom board creation, and is compatible with modern browsers on desktops, tablets, and mobile phones."
      },
      "es": {
        "name": "Cboard",
        "short_description": "Tablero de comunicación CAA de código abierto y con soporte offline.",
        "long_description": "Cboard es una aplicación web gratuita y de código abierto de comunicación aumentativa y alternativa (CAA) para niños y adultos con dificultades del habla. Ayuda a la comunicación mediante símbolos y texto a voz. Soporta más de 33 idiomas, funciona sin conexión, permite crear tableros personalizados y es compatible con navegadores modernos en ordenadores, tabletas y móviles."
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
  SELECT id, unnest(ARRAY['en', 'es']) 
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
SELECT id, unnest(ARRAY['symbol-boards']) 
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
        "short_description": "Symbol-based AAC application available for iOS devices.",
        "long_description": "Proloquo2Go is a symbol-supported communication app developed for iPad and iPhone. It utilizes the Crescendo vocabulary system, offering customizable grid sizes to accommodate different literacy levels. The application supports text-to-speech with natural-sounding voices, allows for button and folder customization, and operates fully offline without an internet connection."
      },
      "es": {
        "name": "Proloquo2Go",
        "short_description": "Aplicación de CAA basada en símbolos disponible para dispositivos iOS.",
        "long_description": "Proloquo2Go es una aplicación de comunicación basada en símbolos desarrollada para iPad y iPhone. Utiliza el sistema de vocabulario Crescendo, ofreciendo tamaños de cuadrícula personalizables para adaptarse a diferentes niveles de lectoescritura. La aplicación soporta texto a voz, permite la personalización de botones y carpetas, y funciona completamente sin conexión a internet."
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
SELECT id, unnest(ARRAY['symbol-boards', 'mixed-communication']) 
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
        "short_description": "Tool to develop visual attention and the acquisition of meaning.",
        "long_description": "Sígueme is designed to enhance visual attention and the association between objects and their representations (photos, pictograms, drawings) in people with ASD. It presents six progressive phases ranging from capturing attention with visual and auditory stimuli to generalizing concepts using real-life objects, videos, and games."
      },
      "es": {
        "name": "Sígueme",
        "short_description": "Herramienta para desarrollar la atención visual y la adquisición de significado.",
        "long_description": "Sígueme está diseñada para potenciar la atención visual y la asociación entre objetos y sus representaciones (fotos, pictogramas, dibujos) en personas con TEA. Presenta seis fases progresivas que van desde la captación de la atención con estímulos visuales y auditivos hasta la generalización de conceptos usando objetos reales, vídeos y juegos."
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
        "short_description": "Real-time voice-to-pictogram translator to anticipate activities.",
        "long_description": "Dictapicto allows the conversion of oral language into visual information in real time. Designed to improve access to information for people with ASD, the app translates spoken words into a sequence of pictograms. It is particularly useful for anticipating activities, sequencing tasks, and clarifying instructions in a visual format."
      },
      "es": {
        "name": "Dictapicto",
        "short_description": "Traductor de voz a pictogramas en tiempo real para anticipar actividades.",
        "long_description": "Dictapicto permite convertir el lenguaje oral en información visual en tiempo real. Diseñada para mejorar el acceso a la información de personas con TEA, la aplicación traduce las palabras habladas a una secuencia de pictogramas. Es especialmente útil para anticipar actividades, secuenciar tareas y aclarar instrucciones en un formato visual."
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
SELECT id, unnest(ARRAY['visual-schedules', 'symbol-boards']) 
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
        "short_description": "Adaptive early intervention application for language and cognitive development.",
        "long_description": "MITA (Mental Imagery Therapy for Autism) is a clinically validated early-intervention application for children with ASD. It utilizes interactive puzzles designed to develop mental imagery and language skills. The app features an adaptive algorithm that adjusts the difficulty level in real-time based on the child''s performance, providing a personalized learning path."
      },
      "es": {
        "name": "MITA: Terapia del Lenguaje y Cognitiva",
        "short_description": "Aplicación de atención temprana adaptativa para el desarrollo del lenguaje y cognitivo.",
        "long_description": "MITA (Terapia de Imagen Mental para el Autismo) es una aplicación de atención temprana validada clínicamente para niños con TEA. Utiliza puzles interactivos diseñados para desarrollar la imaginación mental y las habilidades lingüísticas. La app cuenta con un algoritmo adaptativo que ajusta el nivel de dificultad en tiempo real según el rendimiento del niño, ofreciendo una ruta de aprendizaje personalizada."
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
        "short_description": "Adaptive games for arithmetic, geometry, and logical reasoning.",
        "long_description": "MITA: Math & Logic is an educational application designed to teach early math concepts and reasoning skills. It covers arithmetic, geometry, and logic through gamified exercises. Like its language counterpart, it uses an adaptive algorithm that adjusts the difficulty of the puzzles based on the user''s accuracy and progress."
      },
      "es": {
        "name": "MITA: Matemáticas y Lógica",
        "short_description": "Juegos adaptativos de aritmética, geometría y razonamiento lógico.",
        "long_description": "MITA: Matemáticas y Lógica es una aplicación educativa diseñada para enseñar conceptos matemáticos tempranos y habilidades de razonamiento. Cubre aritmética, geometría y lógica a través de ejercicios gamificados. Al igual que su versión de lenguaje, utiliza un algoritmo adaptativo que ajusta la dificultad de los puzles basándose en la precisión y el progreso del usuario."
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
        "short_description": "AAC app designed for literacy and ease of use.",
        "long_description": "Proloquo is a subscription-based AAC application for iOS designed to build language skills alongside literacy. It utilizes the \"Crescendo Evolution\" vocabulary system, which reduces the need for customization by offering a logically organized layout. It features cloud synchronization across devices and allows free access for families and educators to support the user."
      },
      "es": {
        "name": "Proloquo",
        "short_description": "App de CAA diseñada para la alfabetización y facilidad de uso.",
        "long_description": "Proloquo es una aplicación de CAA por suscripción para iOS diseñada para desarrollar habilidades lingüísticas junto con la lectoescritura. Utiliza el sistema de vocabulario \"Crescendo Evolution\", que reduce la necesidad de personalización ofreciendo una distribución organizada lógicamente. Cuenta con sincronización en la nube entre dispositivos y permite acceso gratuito a familias y educadores para apoyar al usuario."
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
SELECT id, unnest(ARRAY['mixed-communication']) 
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
        "short_description": "Picture and text-based AAC app with predictive capabilities.",
        "long_description": "Avaz AAC is an augmentative and alternative communication app designed for autism and speech difficulties. It offers three levels of vocabulary (picture-based) and a keyboard mode with prediction for literate users. The app includes a dashboard to track the communicator''s progress and vocabulary usage."
      },
      "es": {
        "name": "Avaz AAC",
        "short_description": "App de CAA basada en imágenes y texto con capacidades predictivas (Solo en inglés).",
        "long_description": "Avaz AAC es una aplicación de comunicación aumentativa y alternativa diseñada para el autismo y dificultades del habla. Ofrece tres niveles de vocabulario (basado en imágenes) y un modo teclado con predicción para usuarios alfabetizados. La aplicación incluye un panel de control para rastrear el progreso del comunicador y el uso del vocabulario."
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
SELECT id, unnest(ARRAY['mixed-communication']) 
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
        "short_description": "Web platform to familiarize people with autism with medical procedures using cartoons and videos.",
        "long_description": "Doctor TEA is a web platform designed to facilitate medical visits for people with autism. It uses vignettes, videos and animations to explain common medical tests and environments (like the dentist, blood tests, or x-rays) to reduce anxiety and fear through anticipation and desensitization."
      },
      "es": {
        "name": "Doctor TEA",
        "short_description": "Web para familiarizar a personas con autismo con procedimientos médicos mediante vídeos y viñetas.",
        "long_description": "Doctor TEA es una plataforma web diseñada para facilitar las visitas médicas de las personas con autismo. Utiliza viñetas, vídeos y animaciones para explicar las pruebas médicas más frecuentes y los entornos (como el dentista, análisis de sangre o radiografías) para reducir la ansiedad y el miedo a través de la anticipación y la desensibilización."
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
SELECT id, unnest(ARRAY['social-stories', 'visual-schedules']) 
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
        "short_description": "Free and open-source web-based AAC communicator using ARASAAC pictograms.",
        "long_description": "AsTeRICS Grid is a cross-platform web application for augmentative communication. It allows the creation of fully customizable communication boards using ARASAAC symbols and supports text-to-speech. While powerful and compatible with various input methods (including eye-tracking), the initial configuration and editing interface have a steep learning curve."
      },
      "es": {
        "name": "AsTeRICS Grid",
        "short_description": "Comunicador web de CAA gratuito y de código abierto que utiliza pictogramas de ARASAAC.",
        "long_description": "AsTeRICS Grid es una aplicación web multiplataforma para la comunicación aumentativa. Permite crear tableros de comunicación totalmente personalizables utilizando símbolos ARASAAC y soporta texto a voz. Aunque es potente y compatible con varios métodos de entrada (incluido el seguimiento ocular), la configuración inicial y la interfaz de edición tienen una curva de aprendizaje alta."
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