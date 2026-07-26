// Applies supabase/schema.sql to the database.
// Uses DIRECT_URL (session pooler) when set, else DATABASE_URL.
//   node scripts/migrate.mjs
import postgres from "postgres";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

// Load .env.local (simple parser, no dependency).
try {
  const env = await readFile(join(ROOT, ".env.local"), "utf8");
  for (const line of env.split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
} catch {}

const url = process.env.DIRECT_URL || process.env.DATABASE_URL;
if (!url) {
  console.error("Set DIRECT_URL or DATABASE_URL in .env.local first.");
  process.exit(1);
}

const schema = await readFile(join(ROOT, "supabase", "schema.sql"), "utf8");
const sql = postgres(url, { ssl: "require", onnotice: () => {} });
try {
  await sql.unsafe(schema);
  const [{ count }] = await sql`select count(*)::int as count from menu_items`;
  console.log(`✓ Schema applied. menu_items rows: ${count}`);
} catch (err) {
  console.error("Migration failed:", err.message);
  process.exitCode = 1;
} finally {
  await sql.end();
}
