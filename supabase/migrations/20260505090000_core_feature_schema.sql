-- Core feature schema: Archive is the source of truth for Guide and Agent.

create extension if not exists vector;

create table if not exists public.shops (
  id uuid primary key default gen_random_uuid(),
  owner_profile_id uuid not null references public.profiles(id) on delete cascade,
  name text not null default '',
  profile jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint shops_owner_profile_id_key unique (owner_profile_id)
);

create index if not exists shops_owner_profile_id_idx on public.shops(owner_profile_id);

alter table public.shops enable row level security;

drop policy if exists "shops_select_own" on public.shops;
create policy "shops_select_own"
  on public.shops
  for select
  to authenticated
  using ((select auth.uid()) = owner_profile_id);

drop policy if exists "shops_insert_own" on public.shops;
create policy "shops_insert_own"
  on public.shops
  for insert
  to authenticated
  with check ((select auth.uid()) = owner_profile_id);

drop policy if exists "shops_update_own" on public.shops;
create policy "shops_update_own"
  on public.shops
  for update
  to authenticated
  using ((select auth.uid()) = owner_profile_id)
  with check ((select auth.uid()) = owner_profile_id);

create table if not exists public.interviews (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references public.shops(id) on delete cascade,
  storage_path text not null,
  transcript text,
  duration_sec int,
  created_at timestamptz not null default now()
);

create index if not exists interviews_shop_id_idx on public.interviews(shop_id);

alter table public.interviews enable row level security;

drop policy if exists "interviews_own_shop" on public.interviews;
create policy "interviews_own_shop"
  on public.interviews
  for all
  to authenticated
  using (exists (
    select 1 from public.shops s
    where s.id = interviews.shop_id and s.owner_profile_id = (select auth.uid())
  ))
  with check (exists (
    select 1 from public.shops s
    where s.id = interviews.shop_id and s.owner_profile_id = (select auth.uid())
  ));

create table if not exists public.tacit_tags (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references public.shops(id) on delete cascade,
  interview_id uuid references public.interviews(id) on delete set null,
  situation text not null,
  judgment text not null,
  reason text not null,
  is_inferred boolean not null default false,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists tacit_tags_shop_id_idx on public.tacit_tags(shop_id);
create index if not exists tacit_tags_interview_id_idx on public.tacit_tags(interview_id);

alter table public.tacit_tags enable row level security;

drop policy if exists "tacit_tags_own_shop" on public.tacit_tags;
create policy "tacit_tags_own_shop"
  on public.tacit_tags
  for all
  to authenticated
  using (exists (
    select 1 from public.shops s
    where s.id = tacit_tags.shop_id and s.owner_profile_id = (select auth.uid())
  ))
  with check (exists (
    select 1 from public.shops s
    where s.id = tacit_tags.shop_id and s.owner_profile_id = (select auth.uid())
  ));

create table if not exists public.tag_embeddings (
  tag_id uuid primary key references public.tacit_tags(id) on delete cascade,
  embedding vector(1536) not null
);

alter table public.tag_embeddings enable row level security;

drop policy if exists "tag_embeddings_own_shop" on public.tag_embeddings;
create policy "tag_embeddings_own_shop"
  on public.tag_embeddings
  for all
  to authenticated
  using (exists (
    select 1
    from public.tacit_tags t
    join public.shops s on s.id = t.shop_id
    where t.id = tag_embeddings.tag_id and s.owner_profile_id = (select auth.uid())
  ))
  with check (exists (
    select 1
    from public.tacit_tags t
    join public.shops s on s.id = t.shop_id
    where t.id = tag_embeddings.tag_id and s.owner_profile_id = (select auth.uid())
  ));

create table if not exists public.reference_scenes (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references public.shops(id) on delete cascade,
  source_tag_id uuid references public.tacit_tags(id) on delete set null,
  scene_name text not null,
  correct_state jsonb not null,
  season text,
  created_at timestamptz not null default now()
);

create index if not exists reference_scenes_shop_id_idx on public.reference_scenes(shop_id);
create index if not exists reference_scenes_source_tag_id_idx on public.reference_scenes(source_tag_id);

alter table public.reference_scenes enable row level security;

drop policy if exists "reference_scenes_own_shop" on public.reference_scenes;
create policy "reference_scenes_own_shop"
  on public.reference_scenes
  for all
  to authenticated
  using (exists (
    select 1 from public.shops s
    where s.id = reference_scenes.shop_id and s.owner_profile_id = (select auth.uid())
  ))
  with check (exists (
    select 1 from public.shops s
    where s.id = reference_scenes.shop_id and s.owner_profile_id = (select auth.uid())
  ));

create table if not exists public.observation_logs (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references public.shops(id) on delete cascade,
  scene_id uuid references public.reference_scenes(id) on delete set null,
  observed_at timestamptz not null default now(),
  vision_result jsonb not null default '{}'::jsonb,
  llm_feedback text
);

create index if not exists observation_logs_shop_id_idx on public.observation_logs(shop_id);
create index if not exists observation_logs_scene_id_idx on public.observation_logs(scene_id);

alter table public.observation_logs enable row level security;

drop policy if exists "observation_logs_own_shop" on public.observation_logs;
create policy "observation_logs_own_shop"
  on public.observation_logs
  for all
  to authenticated
  using (exists (
    select 1 from public.shops s
    where s.id = observation_logs.shop_id and s.owner_profile_id = (select auth.uid())
  ))
  with check (exists (
    select 1 from public.shops s
    where s.id = observation_logs.shop_id and s.owner_profile_id = (select auth.uid())
  ));
