create extension if not exists pgcrypto;

create table if not exists public.community_reviews (
  id uuid primary key default gen_random_uuid(),
  place text not null,
  address text,
  category text not null check (category in ('food', 'events', 'shopping', 'tourism')),
  message text not null,
  visit_date date,
  visit_type text check (visit_type in ('solo', 'friends', 'family', 'couple', 'work')),
  budget_range text,
  best_time_to_visit text,
  quick_tip text,
  would_recommend boolean not null default true,
  rating numeric(2,1) not null default 5.0 check (rating >= 1 and rating <= 5),
  author_name text not null,
  is_anonymous boolean not null default false,
  image_url text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

alter table public.community_reviews
  add column if not exists rating numeric(2,1) not null default 5.0 check (rating >= 1 and rating <= 5);

alter table public.community_reviews
  add column if not exists address text,
  add column if not exists visit_date date,
  add column if not exists visit_type text check (visit_type in ('solo', 'friends', 'family', 'couple', 'work')),
  add column if not exists budget_range text,
  add column if not exists best_time_to_visit text,
  add column if not exists quick_tip text,
  add column if not exists would_recommend boolean not null default true;

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
drop policy if exists "Public can read approved reviews" on public.community_reviews;
drop policy if exists "Public can insert pending reviews" on public.community_reviews;

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

delete from public.community_reviews a
using public.community_reviews b
where a.id < b.id
  and a.place = b.place
  and a.category = b.category
  and a.message = b.message
  and a.author_name = b.author_name;

insert into public.community_reviews (place, address, category, message, visit_date, visit_type, budget_range, best_time_to_visit, quick_tip, would_recommend, rating, author_name, is_anonymous, image_url, status)
select *
from (
  values
    ('Nukkad Chai', 'Station Road, Raipur', 'food', 'Amazing chai and snacks. Perfect for evening hangouts with friends. Must-try their special Irani chai.', date '2026-03-28', 'friends', 'Under Rs 200', 'Evening', 'Ask for fresh ginger chai.', true, 4.6, 'Naman', false, '/places/nukkad.jpg', 'approved'),
    ('Jungle Safari, Barnawapara', 'Barnawapara Wildlife Sanctuary Road', 'tourism', 'Great wildlife experience. Saw deer, peacocks, and many birds. Best to visit early morning.', date '2026-03-23', 'family', 'Rs 500-Rs 1200', 'Early Morning', 'Carry water and light snacks.', true, 4.7, 'Naini', false, '/places/barnawapara.jpg', 'approved'),
    ('Ambuja City Mall', 'GE Road, Raipur', 'shopping', 'Wide range of local and international brands, clean spaces, and enough food options for full family outings.', date '2026-03-26', 'family', 'Rs 1200-Rs 3000', 'Late Afternoon', 'Parking gets crowded after 7 PM.', true, 4.4, 'Manoj', false, '/places/urban.png', 'approved'),
    ('Raipur Carnival', 'Central Parade Ground, Raipur', 'events', 'The city vibe was electric, performances were great, and food stalls had lots of options.', date '2026-03-24', 'friends', 'Rs 300-Rs 900', 'Evening', 'Reach 30 minutes before headline shows.', true, 4.8, 'Anant', false, '/hero-bg.png', 'approved')
) as seed(place, address, category, message, visit_date, visit_type, budget_range, best_time_to_visit, quick_tip, would_recommend, rating, author_name, is_anonymous, image_url, status)
where not exists (
  select 1
  from public.community_reviews r
  where r.place = seed.place
    and r.category = seed.category
    and r.message = seed.message
    and r.author_name = seed.author_name
);

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
