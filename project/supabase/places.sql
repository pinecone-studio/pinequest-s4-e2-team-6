-- =====================================================================
-- AI Nomad — AR nearby places (PostGIS). Run in Supabase SQL editor.
-- The app also ships a bundled curated list, so this is optional but adds
-- DB-managed places and fast server-side 10km filtering at scale.
-- =====================================================================

create extension if not exists postgis;

create table if not exists public.places (
  id          uuid primary key default gen_random_uuid(),
  name_mn     text not null,
  name_en     text not null,
  category    text not null check (category in
                ('RESTAURANT','GROCERY','CAMP','PALACE',
                 'AIMAG_CENTER','SUM_CENTER','NATURE','HIDDEN_GEM')),
  lat         double precision not null,
  lng         double precision not null,
  geom        geography(point, 4326)
                generated always as (st_setsrid(st_makepoint(lng, lat), 4326)::geography) stored,
  desc_mn     text,
  desc_en     text,
  source      text not null default 'CURATED'
);

create index if not exists places_geom_idx on public.places using gist (geom);

-- 10 km radius lookup, already distance-sorted.
create or replace function public.nearby_places(user_lat float, user_lng float, radius_m float)
returns setof public.places
language sql stable as $$
  select * from public.places
  where st_dwithin(
    geom,
    st_setsrid(st_makepoint(user_lng, user_lat), 4326)::geography,
    radius_m
  )
  order by geom <-> st_setsrid(st_makepoint(user_lng, user_lat), 4326)::geography;
$$;

-- Read-only for anonymous visitors; no writes.
alter table public.places enable row level security;

drop policy if exists "places read" on public.places;
create policy "places read" on public.places for select using (true);
