// Wipes the menu tables and reloads them from api/_lib/seed.js.
// Use after changing the seed (e.g. a new printed menu) — production only
// seeds automatically when the tables are empty, so an existing DB needs this.
//
//   node scripts/reseed.mjs            # clears + reseeds
//   node scripts/reseed.mjs --yes      # skip the confirmation prompt
//
// Connects with DIRECT_URL (session pooler) when set, else DATABASE_URL.
import postgres from "postgres";
import { readFile } from "node:fs/promises";
import { createInterface } from "node:readline";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { SEED_MENU, SECTIONS } from "../api/_lib/seed.js";

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

// Shape seed data to match the DB columns (price is stored as text).
const DEFAULT_MENU = "north-indian";
const catRows = SECTIONS.map((s, i) => ({
  key: s.key,
  label: s.label,
  ico: s.ico || "",
  menu: s.menu || DEFAULT_MENU,
  position: i + 1,
}));
const itemRows = SEED_MENU.map((m) => ({
  cat: String(m.cat || "").trim(),
  diet: m.diet === "nv" ? "nv" : "v",
  name: String(m.name || "").trim(),
  price: String(m.price == null ? "" : m.price).trim(),
  descr: String(m.desc || "").trim(),
  chef: !!m.chef,
}));

async function confirm() {
  if (process.argv.includes("--yes") || process.argv.includes("-y")) return true;
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const answer = await new Promise((res) =>
    rl.question(
      `This DELETES all rows in menu_items + categories and reloads ${itemRows.length} items / ${catRows.length} sub-menus. Continue? (y/N) `,
      res
    )
  );
  rl.close();
  return /^y(es)?$/i.test(answer.trim());
}

if (!(await confirm())) {
  console.log("Aborted — nothing changed.");
  process.exit(0);
}

const schema = await readFile(join(ROOT, "supabase", "schema.sql"), "utf8");
const sql = postgres(url, { ssl: "require", onnotice: () => {} });
try {
  // Make sure the tables (and the newer `menu` column) exist before loading.
  await sql.unsafe(schema);

  await sql.begin(async (tx) => {
    await tx`delete from menu_items`;
    await tx`delete from categories`;
    await tx`insert into categories ${tx(catRows, "key", "label", "ico", "menu", "position")}`;
    await tx`insert into menu_items ${tx(itemRows, "cat", "diet", "name", "price", "descr", "chef")}`;
  });

  const [{ items }] = await sql`select count(*)::int as items from menu_items`;
  const [{ cats }] = await sql`select count(*)::int as cats from categories`;
  console.log(`✓ Reseeded. categories: ${cats}, menu_items: ${items}`);
} catch (err) {
  console.error("Reseed failed:", err.message);
  process.exitCode = 1;
} finally {
  await sql.end();
}
