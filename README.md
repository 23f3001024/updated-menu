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
    store.js      Redis read/write + validation
    auth.js       Password check + HMAC-signed session cookie
```

## One-time setup on Vercel

1. **Import the repo** into Vercel (or run `vercel` from the CLI).
2. **Add storage:** Vercel dashboard → *Storage* → create an **Upstash Redis** (KV)
   database and connect it to the project. This auto-adds `KV_REST_API_URL` and
   `KV_REST_API_TOKEN`.
3. **Add two environment variables** (Project → Settings → Environment Variables):
   - `ADMIN_PASSWORD` — the password you'll use to log in.
   - `SESSION_SECRET` — any long random string (e.g. `openssl rand -base64 32`).
4. **Redeploy.** Visit `/` for the menu and `/admin` for the dashboard.

The first request seeds the database with the current menu, so nothing is lost.

## Local development

```bash
npm install
vercel env pull .env.local   # pulls KV_* from Vercel
# add ADMIN_PASSWORD and SESSION_SECRET to .env.local
vercel dev                   # serves the site + API at http://localhost:3000
```

## Notes

- The session cookie is `HttpOnly`, `Secure`, `SameSite=Strict`, and expires after 12 hours.
- Categories (Starters, Mains, …) are fixed in `api/_lib/seed.js`. Add a new one there
  and it appears in both the dashboard and the public menu automatically.
