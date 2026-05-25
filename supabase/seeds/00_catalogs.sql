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
  ('de');