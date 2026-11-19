# Wedding RSVP setup

1. Open the Supabase project connected to this app and go to **SQL Editor**.
2. Run the SQL in `migrations/20261120000000_create_wedding_rsvps.sql`.
3. Open **Table Editor → wedding_rsvps** to see guest names, attendance, and submission time.

The table allows public submissions only. Row Level Security is enabled, and public visitors cannot read the RSVP list through the app.

The app uses `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. These are already present in the local `.env.local`; add the same values to the Vercel project's environment variables before deploying this change.
