# The House of Chili N' Curry — Menu + Admin Dashboard

A live menu site with a password-protected dashboard to **add, edit, and delete**
menu items. Changes are saved to a hosted database (Upstash Redis / Vercel KV) and
appear on the public menu immediately.

## Structure

```
index.html        Public menu — fetches items from /api/menu
admin.html        Dashboard (login → add / edit / delete)  →  /admin
assets/           Logo and images
api/
  menu.js         GET (public) + POST/PUT/DELETE (admin) item CRUD
  login.js        POST password → signed session cookie
  logout.js       Clears the session
  session.js      Reports whether the current visitor is logged in
  _lib/
    seed.js       Default menu + category list (seeds the DB on first run)
    store.js      Postgres read/write + validation
    auth.js       Password check + HMAC-signed session cookie
supabase/
  schema.sql      menu_items table definition
scripts/
  migrate.mjs     Applies schema.sql to the database
```

## Database (Supabase Postgres)

The menu lives in a single `menu_items` table. At runtime the API talks to
Supabase over the **REST API** (`SUPABASE_URL` + `SUPABASE_SECRET_KEY`), which
works reliably from serverless. The direct Postgres connection is only used once
to create the table.

1. In Supabase → **Project Settings → API**: copy `SUPABASE_URL` and the
   **secret** key (`sb_secret_...`).
2. Create the table once — either `node scripts/migrate.mjs` (needs `DATABASE_URL`
   in `.env.local`), or paste `supabase/schema.sql` into the Supabase SQL Editor.
3. The first `GET /api/menu` seeds the table with the current menu.

## One-time setup on Vercel

1. **Import the repo** into Vercel (or run `vercel` from the CLI).
2. **Add environment variables** (Project → Settings → Environment Variables):
   - `SUPABASE_URL` and `SUPABASE_SECRET_KEY`
   - `ADMIN_PASSWORD` — the password you'll use to log in.
   - `SESSION_SECRET` — any long random string (e.g. `openssl rand -base64 32`).
3. **Redeploy.** Visit `/` for the menu and `/admin` for the dashboard.

## Local development

```bash
npm install
# put SUPABASE_URL, SUPABASE_SECRET_KEY, ADMIN_PASSWORD, SESSION_SECRET
# (and DATABASE_URL for the migration) in .env.local
node scripts/migrate.mjs      # create the menu_items table (one time)
node dev-server.mjs           # serves the site + API at http://localhost:3000
```

Without Supabase env vars, local dev falls back to an in-memory store so the app
still runs (data is not persisted).

## Notes

- The session cookie is `HttpOnly`, `Secure`, `SameSite=Strict`, and expires after 12 hours.
- Categories (Starters, Mains, …) are fixed in `api/_lib/seed.js`. Add a new one there
  and it appears in both the dashboard and the public menu automatically.
