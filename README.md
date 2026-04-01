# Raipur.life

![Website Screenshot](public/hero-bg.png)

Raipur.life is a city-focused web experience built around Raipur, Chhattisgarh. The project brings together local places, food culture, events, stories, and community voices in one cohesive product.

This version is a full redesign and content revamp, with stronger visual identity, cleaner information flow, and a more modern browsing experience across mobile and desktop.

## Project Direction

- Present Raipur with a distinct, premium feel instead of a generic city-directory layout.
- Blend editorial storytelling with practical discovery so users can explore and plan in the same experience.
- Keep the interface visually rich while maintaining readability and fast interaction.

## What The Product Includes

- Dedicated sections for tourism, food, events, shopping, history, gallery, trip planning, and contact.
- Community review system with moderation support.
- Resilient media handling so broken or missing images do not degrade the experience.
- Responsive layouts and consistent UI behavior across major screen sizes.

## Current Build Notes

- Frontend is production-ready.
- Supabase integration is staged and can be fully enabled separately.

## Free Admin Notifications (Email + Optional Telegram)

This project now supports free instant admin alerts for:

- New community review submissions
- New contact form messages

Implementation details:

- Frontend invokes Supabase Edge Function `admin-alerts` after successful insert.
- Edge Function can send alerts to email (Resend) and/or Telegram.

Files involved:

- `src/lib/adminAlerts.ts`
- `src/hooks/useCommunityReviews.ts`
- `src/pages/Contact.tsx`
- `supabase/functions/admin-alerts/index.ts`

### Setup (Email Recommended)

1. Create a free Resend account and copy your API key.
2. Decide the inbox that should receive alerts (your admin email).
3. Deploy the edge function:

```bash
supabase functions deploy admin-alerts
```

4. Set function secrets for email:

```bash
supabase secrets set RESEND_API_KEY=your_resend_api_key
supabase secrets set ALERT_EMAIL_TO=you@example.com
supabase secrets set ALERT_EMAIL_FROM="Raipur.life Alerts <onboarding@resend.dev>"
```

5. Ensure your frontend `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are correctly set.

### Optional Telegram Backup

You can enable Telegram as a second delivery channel:

```bash
supabase secrets set TELEGRAM_BOT_TOKEN=your_bot_token
supabase secrets set TELEGRAM_CHAT_ID=your_chat_id
```

### Notes

- Alerts are non-blocking in the frontend: user submissions still succeed even if notifications fail.
- Use email as the primary channel for reliability and searchable history.
- You can keep both email and Telegram enabled for redundancy.

## Credits

Crafted for Raipur and the people who live it every day.
