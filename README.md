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

## Reseeding after a menu change

The DB only seeds itself when the tables are **empty**, so editing `api/_lib/seed.js`
does not update a database that already has data. To wipe and reload it from the seed:

```bash
node scripts/reseed.mjs          # asks to confirm, then clears + reloads
node scripts/reseed.mjs --yes    # skip the prompt (for CI)
```

It runs `supabase/schema.sql` first (adding any new columns), then replaces every row
in `categories` and `menu_items` with the current seed. Needs `DIRECT_URL` or
`DATABASE_URL` in `.env.local`.

## Notes

- Menu structure is three tiers: **main menu** (North Indian / Asian / General) →
  **sub-menu** (category) → **item**. Main menus are fixed in `api/_lib/seed.js`
  (`MENUS`); each sub-menu (`SECTIONS`) has a `menu` key tying it to one main menu.
- The session cookie is `HttpOnly`, `Secure`, `SameSite=Strict`, and expires after 12 hours.
- Sub-menus are managed from the dashboard (or seeded from `api/_lib/seed.js`); adding one
  there lets you pick its main menu, and it appears on both the dashboard and public menu.
