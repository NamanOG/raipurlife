# Supabase Setup for Reviews and Contact Flow

## 1. Create Supabase project
- Create a project on Supabase.
- Open SQL Editor.

## 2. Apply schema
- Run `supabase/schema.sql` in SQL Editor.
- This sets up:
  - `community_reviews` table with strict RLS
  - `contact_messages` table for contact form submissions
  - `moderation_settings` table for moderator code check
  - RPC functions: `get_pending_reviews` and `moderate_review`
  - `review-images` bucket + scoped storage policies

## 3. Set moderator code in database
- After running the schema, update the default placeholder code:

```sql
update public.moderation_settings
set moderator_code = 'your-strong-moderator-code',
    updated_at = now()
where id = true;
```

## 4. Configure frontend env
- Copy `.env.example` to `.env`.
- Set:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
- Optional UI route toggle for moderation page:
  - `VITE_MODERATOR_CODE` (only used to show/hide route, not for security)

## 5. Verify end-to-end behavior
- Submit a review from `/add-review` and verify it lands as `pending`.
- Verify pending reviews do not show in public lists.
- Open `/moderation`, unlock with moderator code, approve/reject.
- Verify approved reviews become public.
- Submit contact form and verify row appears in `contact_messages`.

## Notes
- Local storage fallback is only available in development when Supabase env values are missing.
- In production builds without Supabase configured, review submission, moderation, and contact writes are intentionally unavailable.
- Security boundary is database-side policy + RPC code validation, not frontend route hiding.
