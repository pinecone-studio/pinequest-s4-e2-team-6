-- =====================================================================
-- AI Nomad — hidden gems (optional). The app ships a bundled curated list,
-- so this is only needed to manage gems from the database.
-- =====================================================================

create table if not exists public.gems (
  id          uuid primary key default gen_random_uuid(),
  name_mn     text not null,
  name_en     text not null,
  aimag       text not null,
  category    text not null check (category in
                ('NATURE','MOUNTAIN','LAKE','DESERT','HISTORY','MONASTERY','WILDLIFE','HOTSPRING')),
  lat         double precision not null,
  lng         double precision not null,
  reach       text not null default 'car' check (reach in ('car','horse','hike','flight')),
  season      text not null default 'summer',
  difficulty  text not null default 'moderate' check (difficulty in ('easy','moderate','hard')),
  desc_mn     text,
  desc_en     text,
  image_url   text,
  status      text not null default 'OK'  -- OK | NOT_FOUND | OUT_OF_BBOX (from geocode.ts)
);

create index if not exists gems_aimag_idx on public.gems (aimag);

-- Read-only for anonymous visitors.
alter table public.gems enable row level security;
drop policy if exists "gems read" on public.gems;
create policy "gems read" on public.gems for select using (true);
