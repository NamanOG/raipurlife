create extension if not exists pgcrypto;

create table if not exists public.community_reviews (
  id uuid primary key default gen_random_uuid(),
  place text not null,
  category text not null check (category in ('food', 'events', 'shopping', 'tourism')),
  message text not null,
  author_name text not null,
  is_anonymous boolean not null default false,
  image_url text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

alter table public.community_reviews enable row level security;

create policy if not exists "Public can read reviews"
on public.community_reviews
for select
to anon, authenticated
using (true);

create policy if not exists "Public can insert reviews"
on public.community_reviews
for insert
to anon, authenticated
with check (true);

create policy if not exists "Public can update review status"
on public.community_reviews
for update
to anon, authenticated
using (true)
with check (true);

insert into public.community_reviews (place, category, message, author_name, is_anonymous, image_url, status)
values
  ('Nukkad Chai', 'food', 'Amazing chai and snacks. Perfect for evening hangouts with friends. Must-try their special Irani chai.', 'Naman', false, 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'approved'),
  ('Jungle Safari, Barnawapara', 'tourism', 'Great wildlife experience. Saw deer, peacocks, and many birds. Best to visit early morning.', 'Naini', false, 'https://images.unsplash.com/photo-1549366021-9f761d040a94?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'approved'),
  ('Ambuja City Mall', 'shopping', 'Wide range of local and international brands, clean spaces, and enough food options for full family outings.', 'Manoj', false, 'https://images.unsplash.com/photo-1555529902-5261145633bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'approved'),
  ('Raipur Carnival', 'events', 'The city vibe was electric, performances were great, and food stalls had lots of options.', 'Anant', false, 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'approved')
on conflict do nothing;

insert into storage.buckets (id, name, public)
values ('review-images', 'review-images', true)
on conflict (id) do nothing;

create policy if not exists "Public can upload review images"
on storage.objects
for insert
to anon, authenticated
with check (bucket_id = 'review-images');

create policy if not exists "Public can view review images"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'review-images');
