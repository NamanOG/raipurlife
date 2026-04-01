create extension if not exists pgcrypto;

create table if not exists public.community_reviews (
  id uuid primary key default gen_random_uuid(),
  place text not null,
  category text not null check (category in ('food', 'events', 'shopping', 'tourism')),
  message text not null,
  rating numeric(2,1) not null default 5.0 check (rating >= 1 and rating <= 5),
  author_name text not null,
  is_anonymous boolean not null default false,
  image_url text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

alter table public.community_reviews
  add column if not exists rating numeric(2,1) not null default 5.0 check (rating >= 1 and rating <= 5);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  status text not null default 'new' check (status in ('new', 'in_progress', 'resolved', 'closed')),
  created_at timestamptz not null default now()
);

create table if not exists public.moderation_settings (
  id boolean primary key default true,
  moderator_code text not null,
  is_active boolean not null default true,
  updated_at timestamptz not null default now()
);

alter table public.community_reviews enable row level security;
alter table public.contact_messages enable row level security;

drop policy if exists "Public can read reviews" on public.community_reviews;
drop policy if exists "Public can insert reviews" on public.community_reviews;
drop policy if exists "Public can update review status" on public.community_reviews;

create policy "Public can read approved reviews"
on public.community_reviews
for select
to anon, authenticated
using (status = 'approved');

create policy "Public can insert pending reviews"
on public.community_reviews
for insert
to anon, authenticated
with check (status = 'pending');

drop policy if exists "Public can insert contact messages" on public.contact_messages;
create policy "Public can insert contact messages"
on public.contact_messages
for insert
to anon, authenticated
with check (true);

drop policy if exists "Public can read contact messages" on public.contact_messages;
drop policy if exists "Public can update contact messages" on public.contact_messages;
drop policy if exists "Public can delete contact messages" on public.contact_messages;

create or replace function public.get_pending_reviews(moderator_code text)
returns setof public.community_reviews
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (
    select 1
    from public.moderation_settings
    where is_active = true
      and moderation_settings.moderator_code = get_pending_reviews.moderator_code
  ) then
    raise exception 'invalid_moderator_code';
  end if;

  return query
  select *
  from public.community_reviews
  where status = 'pending'
  order by created_at desc;
end;
$$;

create or replace function public.moderate_review(
  review_id uuid,
  new_status text,
  moderator_code text
)
returns public.community_reviews
language plpgsql
security definer
set search_path = public
as $$
declare
  updated_review public.community_reviews;
begin
  if new_status not in ('approved', 'rejected') then
    raise exception 'invalid_status';
  end if;

  if not exists (
    select 1
    from public.moderation_settings
    where is_active = true
      and moderation_settings.moderator_code = moderate_review.moderator_code
  ) then
    raise exception 'invalid_moderator_code';
  end if;

  update public.community_reviews
  set status = new_status
  where id = review_id
  returning * into updated_review;

  if updated_review.id is null then
    raise exception 'review_not_found';
  end if;

  return updated_review;
end;
$$;

create or replace function public.get_reviews_for_moderation(
  moderator_code text,
  review_status text default null
)
returns setof public.community_reviews
language plpgsql
security definer
set search_path = public
as $$
begin
  if review_status is not null and review_status not in ('pending', 'approved', 'rejected') then
    raise exception 'invalid_status';
  end if;

  if not exists (
    select 1
    from public.moderation_settings
    where is_active = true
      and moderation_settings.moderator_code = get_reviews_for_moderation.moderator_code
  ) then
    raise exception 'invalid_moderator_code';
  end if;

  return query
  select *
  from public.community_reviews
  where review_status is null or status = review_status
  order by created_at desc;
end;
$$;

create or replace function public.delete_review(
  review_id uuid,
  moderator_code text
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  deleted_id uuid;
begin
  if not exists (
    select 1
    from public.moderation_settings
    where is_active = true
      and moderation_settings.moderator_code = delete_review.moderator_code
  ) then
    raise exception 'invalid_moderator_code';
  end if;

  delete from public.community_reviews
  where id = review_id
  returning id into deleted_id;

  if deleted_id is null then
    raise exception 'review_not_found';
  end if;

  return deleted_id;
end;
$$;

create or replace function public.get_contact_messages(moderator_code text)
returns setof public.contact_messages
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (
    select 1
    from public.moderation_settings
    where is_active = true
      and moderation_settings.moderator_code = get_contact_messages.moderator_code
  ) then
    raise exception 'invalid_moderator_code';
  end if;

  return query
  select *
  from public.contact_messages
  order by created_at desc;
end;
$$;

create or replace function public.update_contact_message_status(
  message_id uuid,
  new_status text,
  moderator_code text
)
returns public.contact_messages
language plpgsql
security definer
set search_path = public
as $$
declare
  updated_message public.contact_messages;
begin
  if new_status not in ('new', 'in_progress', 'resolved', 'closed') then
    raise exception 'invalid_status';
  end if;

  if not exists (
    select 1
    from public.moderation_settings
    where is_active = true
      and moderation_settings.moderator_code = update_contact_message_status.moderator_code
  ) then
    raise exception 'invalid_moderator_code';
  end if;

  update public.contact_messages
  set status = new_status
  where id = message_id
  returning * into updated_message;

  if updated_message.id is null then
    raise exception 'message_not_found';
  end if;

  return updated_message;
end;
$$;

grant execute on function public.get_pending_reviews(text) to anon, authenticated;
grant execute on function public.moderate_review(uuid, text, text) to anon, authenticated;
grant execute on function public.get_reviews_for_moderation(text, text) to anon, authenticated;
grant execute on function public.delete_review(uuid, text) to anon, authenticated;
grant execute on function public.get_contact_messages(text) to anon, authenticated;
grant execute on function public.update_contact_message_status(uuid, text, text) to anon, authenticated;

insert into public.community_reviews (place, category, message, author_name, is_anonymous, image_url, status)
values
  ('Nukkad Chai', 'food', 'Amazing chai and snacks. Perfect for evening hangouts with friends. Must-try their special Irani chai.', 'Naman', false, '/places/nukkad.jpg', 'approved'),
  ('Jungle Safari, Barnawapara', 'tourism', 'Great wildlife experience. Saw deer, peacocks, and many birds. Best to visit early morning.', 'Naini', false, '/places/barnawapara.jpg', 'approved'),
  ('Ambuja City Mall', 'shopping', 'Wide range of local and international brands, clean spaces, and enough food options for full family outings.', 'Manoj', false, '/places/urban.png', 'approved'),
  ('Raipur Carnival', 'events', 'The city vibe was electric, performances were great, and food stalls had lots of options.', 'Anant', false, '/hero-bg.png', 'approved')
on conflict do nothing;

insert into public.moderation_settings (id, moderator_code, is_active)
values (true, 'change-this-moderator-code', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('review-images', 'review-images', true)
on conflict (id) do nothing;

drop policy if exists "Public can upload review images" on storage.objects;
create policy "Public can upload review images"
on storage.objects
for insert
to anon, authenticated
with check (bucket_id = 'review-images' and name like 'community/%');

drop policy if exists "Public can view review images" on storage.objects;
create policy "Public can view review images"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'review-images');
