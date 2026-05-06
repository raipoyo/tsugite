create or replace function public.is_interview_path_owner(object_name text)
returns boolean
language sql
security definer
set search_path = public, storage
stable
as $$
  select exists (
    select 1
    from public.shops
    where id::text = (storage.foldername(object_name))[1]
      and owner_profile_id = auth.uid()
  );
$$;

drop policy if exists "Shop owners can upload videos" on storage.objects;
create policy "Shop owners can upload videos"
on storage.objects for insert
with check (
  bucket_id = 'interview-videos'
  and public.is_interview_path_owner(name)
);

drop policy if exists "Shop owners can read their videos" on storage.objects;
create policy "Shop owners can read their videos"
on storage.objects for select
using (
  bucket_id = 'interview-videos'
  and public.is_interview_path_owner(name)
);

drop policy if exists "Shop owners can delete their videos" on storage.objects;
create policy "Shop owners can delete their videos"
on storage.objects for delete
using (
  bucket_id = 'interview-videos'
  and public.is_interview_path_owner(name)
);