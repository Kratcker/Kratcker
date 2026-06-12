-- Chivera — esquema inicial (Fase 2)
-- Ejecutar en el SQL Editor de Supabase (o con supabase db push).

create table public.parts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text not null,
  condition text not null check (condition in ('A', 'B', 'C')),
  price_usd numeric not null check (price_usd >= 0),
  description text not null default '',
  photos text[] not null default '{}',
  available boolean not null default true,
  inspected boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.part_fitments (
  id uuid primary key default gen_random_uuid(),
  part_id uuid not null references public.parts (id) on delete cascade,
  make text not null,
  model text not null,
  year_from int not null,
  year_to int not null
);

-- Solicitudes de repuestos (del formulario de encargo y del chat)
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  name text,
  city text,
  phone text,
  vehicle text,
  part_requested text,
  details text,
  source text not null default 'web',
  status text not null default 'nuevo',
  created_at timestamptz not null default now()
);

-- Contactos captados con el descuento de primera compra
create table public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text,
  phone text,
  source text not null default 'descuento-10',
  discount_code text not null default 'CHIVERA10',
  created_at timestamptz not null default now(),
  constraint subscribers_contact_required check (email is not null or phone is not null)
);

-- Seguridad: el público solo ve repuestos disponibles y solo puede
-- crear leads/suscripciones; todo lo demás requiere sesión (panel admin).
alter table public.parts enable row level security;
alter table public.part_fitments enable row level security;
alter table public.leads enable row level security;
alter table public.subscribers enable row level security;

create policy "public read available parts" on public.parts
  for select using (available = true);
create policy "admin full access parts" on public.parts
  for all to authenticated using (true) with check (true);

create policy "public read fitments" on public.part_fitments
  for select using (true);
create policy "admin full access fitments" on public.part_fitments
  for all to authenticated using (true) with check (true);

create policy "public insert leads" on public.leads
  for insert to anon with check (true);
create policy "admin full access leads" on public.leads
  for all to authenticated using (true) with check (true);

create policy "public insert subscribers" on public.subscribers
  for insert to anon with check (true);
create policy "admin full access subscribers" on public.subscribers
  for all to authenticated using (true) with check (true);

-- Bucket público para las fotos de los repuestos
insert into storage.buckets (id, name, public)
values ('part-photos', 'part-photos', true)
on conflict (id) do nothing;

create policy "public read part photos" on storage.objects
  for select using (bucket_id = 'part-photos');
create policy "admin upload part photos" on storage.objects
  for insert to authenticated with check (bucket_id = 'part-photos');
create policy "admin delete part photos" on storage.objects
  for delete to authenticated using (bucket_id = 'part-photos');
