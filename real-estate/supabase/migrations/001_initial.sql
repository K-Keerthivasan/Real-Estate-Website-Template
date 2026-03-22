-- ============================================================
-- K2 Estate — Initial Supabase Schema
-- Run: supabase db push  (or paste into Supabase SQL editor)
-- ============================================================

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- ──────────────────────────────────────────────
-- AGENTS
-- ──────────────────────────────────────────────
create table agents (
  id          uuid primary key default uuid_generate_v4(),
  slug        text unique not null,
  name        text not null,
  title       text not null,
  phone       text,
  email       text,
  bio         text,
  intro       text,
  specialties text[],
  created_at  timestamptz default now()
);

-- ──────────────────────────────────────────────
-- PROPERTIES
-- ──────────────────────────────────────────────
create table properties (
  id           uuid primary key default uuid_generate_v4(),
  slug         text unique not null,
  title        text not null,
  address      text not null,
  city         text not null,
  state        text not null,
  zip          text not null,
  neighborhood text,
  type         text check (type in ('Penthouse','Townhome','Condo','Villa','Estate')),
  price        bigint not null,
  beds         numeric(3,1) not null,
  baths        numeric(3,1) not null,
  sqft         int not null,
  lot_size     text,
  year_built   int,
  status       text default 'Active' check (status in ('Active','Pending','Sold')),
  description  text,
  features     text[],
  hero_label   text,
  lat          double precision,
  lng          double precision,
  agent_id     uuid references agents(id) on delete set null,
  algolia_object_id text,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

create index idx_properties_status   on properties(status);
create index idx_properties_type     on properties(type);
create index idx_properties_price    on properties(price);
create index idx_properties_beds     on properties(beds);
create index idx_properties_agent    on properties(agent_id);

-- ──────────────────────────────────────────────
-- PROPERTY IMAGES
-- ──────────────────────────────────────────────
create table property_images (
  id          uuid primary key default uuid_generate_v4(),
  property_id uuid references properties(id) on delete cascade,
  url         text not null,
  alt         text,
  position    int default 0,
  created_at  timestamptz default now()
);

create index idx_property_images_property on property_images(property_id);

-- ──────────────────────────────────────────────
-- USERS (mirrors auth.users — profile extension)
-- ──────────────────────────────────────────────
create table users (
  id         uuid primary key references auth.users(id) on delete cascade,
  full_name  text,
  avatar_url text,
  created_at timestamptz default now()
);

-- Auto-create user profile on sign-up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.users(id, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ──────────────────────────────────────────────
-- FAVORITES
-- ──────────────────────────────────────────────
create table favorites (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid references users(id) on delete cascade,
  property_id uuid references properties(id) on delete cascade,
  created_at  timestamptz default now(),
  unique(user_id, property_id)
);

create index idx_favorites_user     on favorites(user_id);
create index idx_favorites_property on favorites(property_id);

-- RLS: users can only see/modify their own favorites
alter table favorites enable row level security;

create policy "Users can view own favorites"
  on favorites for select
  using (auth.uid() = user_id);

create policy "Users can insert own favorites"
  on favorites for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own favorites"
  on favorites for delete
  using (auth.uid() = user_id);

-- ──────────────────────────────────────────────
-- ENQUIRIES (contact form submissions)
-- ──────────────────────────────────────────────
create table enquiries (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  email       text not null,
  phone       text,
  message     text,
  property_id uuid references properties(id) on delete set null,
  agent_id    uuid references agents(id) on delete set null,
  status      text default 'New' check (status in ('New','Contacted','Tour Booked','Closed')),
  source      text,
  notes       text,
  created_at  timestamptz default now()
);

create index idx_enquiries_property on enquiries(property_id);
create index idx_enquiries_agent    on enquiries(agent_id);
create index idx_enquiries_status   on enquiries(status);

-- RLS: only authenticated agents / admins can read enquiries
alter table enquiries enable row level security;

create policy "Anon users can insert enquiries"
  on enquiries for insert
  with check (true);

create policy "Authenticated users can view enquiries"
  on enquiries for select
  using (auth.role() = 'authenticated');

-- ──────────────────────────────────────────────
-- UPDATED_AT trigger for properties
-- ──────────────────────────────────────────────
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger properties_updated_at
  before update on properties
  for each row execute procedure update_updated_at();
