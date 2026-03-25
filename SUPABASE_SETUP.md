# Supabase Setup for Community Reviews

## 1. Create project
- Create a new project on Supabase.
- Open SQL Editor.

## 2. Run schema
- Copy and run the SQL from `supabase/schema.sql`.
- This creates:
  - `community_reviews` table
  - moderation status (`pending` / `approved` / `rejected`)
  - public read + insert + status update policies
  - `review-images` storage bucket
  - image upload + read policies

## 3. Add env keys
- Copy `.env.example` to `.env`.
- Fill:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`

## 4. Restart app
- Restart dev server after editing `.env`.

## 5. Verify flow
- Open `/add-review`
- Submit with category and optional image
- Approve in `/moderation`
- Confirm approved review appears in:
  - Home community cards
  - Category pages (`/food`, `/events`, `/shopping`, `/tourism`)

## Notes
- If Supabase env values are missing, app falls back to local storage
  so development still works.
- Current moderation panel is frontend-driven and intended for MVP use.
- For production-hard moderation, restrict update policy
  to authenticated admin roles.

## Optional free live events
- Create a free Ticketmaster API key.
- Add in `.env`:
  - `VITE_TICKETMASTER_API_KEY`
  - `VITE_EVENTS_CITY` (defaults to `Raipur`)
- Events page will automatically switch to live feed when key is present.
