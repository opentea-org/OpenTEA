-- ============================================================
-- 1. COMPLETE CLEANUP (Reset)
-- ============================================================
drop table if exists public.app_categories cascade;
drop table if exists public.app_platforms cascade;
drop table if exists public.app_languages cascade;
drop table if exists public.categories cascade;
drop table if exists public.platforms cascade;
drop table if exists public.price_types cascade;
drop table if exists public.languages cascade;
drop table if exists public.apps cascade;

-- ============================================================
-- 2. LOOKUP TABLES (Catalogs)
-- ============================================================
create table public.categories (
  id varchar(50) primary key
);

create table public.platforms (
  id varchar(20) primary key
);

create table public.price_types (
  id varchar(20) primary key
);

create table public.languages (
  id varchar(5) primary key
);

-- ============================================================
-- 3. MAIN APPS TABLE
-- ============================================================
create table public.apps (
  id uuid primary key default gen_random_uuid(),
  slug varchar(255) unique not null,
  content jsonb default '{}'::jsonb,
  price_type_id varchar(20) references public.price_types(id),
  price_amount_eur numeric(10,2),
  website text,
  play_store_link text,
  app_store_link text,
  ease_of_use smallint check (ease_of_use between 1 and 5),
  cognitive_load smallint check (cognitive_load between 1 and 5),
  sensory_load smallint check (sensory_load between 1 and 5),
  
  image_urls text[] default '{}',
  
  is_active boolean default true,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

create or replace function public.update_timestamp()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_timestamp
before update on public.apps
for each row execute procedure public.update_timestamp();

-- ============================================================
-- 4. JUNCTION TABLES (Many-to-Many Relationships)
-- ============================================================
create table public.app_categories (
  app_id uuid references public.apps(id) on delete cascade,
  category_id varchar(50) references public.categories(id) on delete cascade,
  primary key (app_id, category_id)
);

create table public.app_platforms (
  app_id uuid references public.apps(id) on delete cascade,
  platform_id varchar(20) references public.platforms(id) on delete cascade,
  primary key (app_id, platform_id)
);

create table public.app_languages (
  app_id uuid references public.apps(id) on delete cascade,
  language_id varchar(5) references public.languages(id) on delete cascade,
  primary key (app_id, language_id)
);

-- ============================================================
-- 5. SECURITY (Row Level Security)
-- ============================================================
alter table public.categories enable row level security;
alter table public.platforms enable row level security;
alter table public.price_types enable row level security;
alter table public.languages enable row level security;
alter table public.apps enable row level security;
alter table public.app_categories enable row level security;
alter table public.app_platforms enable row level security;
alter table public.app_languages enable row level security;

create policy "Public read categories" on public.categories for select using (true);
create policy "Public read platforms" on public.platforms for select using (true);
create policy "Public read price_types" on public.price_types for select using (true);
create policy "Public read languages" on public.languages for select using (true);
create policy "Public read apps" on public.apps for select using (true);
create policy "Public read app_categories" on public.app_categories for select using (true);
create policy "Public read app_platforms" on public.app_platforms for select using (true);
create policy "Public read app_languages" on public.app_languages for select using (true);