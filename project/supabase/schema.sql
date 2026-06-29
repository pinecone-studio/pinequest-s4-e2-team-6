-- =====================================================================
-- AI Nomad — AI camera schema
-- Run this once in the Supabase SQL editor (Dashboard → SQL → New query).
-- =====================================================================

-- 1. Scans table -------------------------------------------------------
create table if not exists public.scans (
  id          uuid primary key default gen_random_uuid(),
  device_id   text not null,
  image_url   text not null,
  name        text not null,
  location    text,
  category    text,
  description text,
  confidence  real,
  tags        text[] default '{}',
  lat         double precision,
  lng         double precision,
  created_at  timestamptz not null default now()
);

-- Fast "my latest scans" lookups by device.
create index if not exists scans_device_created_idx
  on public.scans (device_id, created_at desc);

-- 2. Row Level Security ------------------------------------------------
-- The app is anonymous (no login), so access is scoped by a device id the
-- client generates. We allow public read/insert but NOT update/delete.
-- Hardening note: for stricter isolation add Supabase Auth and replace the
-- `true` checks with `auth.uid()`-based policies, or do writes from a server
-- route using the service_role key.
alter table public.scans enable row level security;

drop policy if exists "scans read" on public.scans;
create policy "scans read" on public.scans
  for select using (true);

drop policy if exists "scans insert" on public.scans;
create policy "scans insert" on public.scans
  for insert with check (true);

-- 3. Storage bucket ----------------------------------------------------
-- Holds the captured JPEGs. Public read so <img> tags work directly.
insert into storage.buckets (id, name, public)
values ('scans', 'scans', true)
on conflict (id) do nothing;

drop policy if exists "scan images public read" on storage.objects;
create policy "scan images public read" on storage.objects
  for select using (bucket_id = 'scans');

drop policy if exists "scan images insert" on storage.objects;
create policy "scan images insert" on storage.objects
  for insert with check (bucket_id = 'scans');
