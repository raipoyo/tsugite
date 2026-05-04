-- Role and onboarding profile payloads on public.profiles (Supabase Auth user id).

alter table public.profiles
  add column if not exists role text;

alter table public.profiles
  add column if not exists shop_profile jsonb;

alter table public.profiles
  add column if not exists successor_profile jsonb;

alter table public.profiles drop constraint if exists profiles_role_allowed;

alter table public.profiles
  add constraint profiles_role_allowed
  check (role is null or role in ('shop', 'successor'));

comment on column public.profiles.role is 'Onboarding role: shop or successor; null until chosen.';

comment on column public.profiles.shop_profile is 'Structured shop onboarding fields (MVP json blob).';

comment on column public.profiles.successor_profile is 'Structured successor onboarding fields (MVP json blob).';
