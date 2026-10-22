import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { SEED_MENU, SECTIONS } from "./seed.js";

const TABLE = "menu_items";
const CAT_TABLE = "categories";

// ---------------------------------------------------------------------------
// Row <-> item mapping.
//   DB row:  { id, position, cat, diet, name, price(text), descr, chef }
//   API item:{ id, cat, diet, name, price(number|string), desc, chef }
// "desc" is a SQL reserved word, so the column is named "descr".
// ---------------------------------------------------------------------------
function coercePrice(p) {
  const t = String(p == null ? "" : p).trim();
  return /^\d+$/.test(t) ? Number(t) : t;
}

function toItem(row) {
  return {
    id: row.id,
    cat: row.cat,
    diet: row.diet === "nv" ? "nv" : "v",
    name: row.name,
    price: coercePrice(row.price),
    desc: row.descr || "",
    chef: !!row.chef,
  };
}

// Normalize incoming API input into a DB row (minus id/position).
function toRow(input) {
  return {
    name: String(input.name || "").trim(),
    cat: String(input.cat || "").trim(),
    diet: input.diet === "nv" ? "nv" : "v",
    descr: String(input.desc || "").trim(),
    price: String(input.price == null ? "" : input.price).trim(),
    chef: !!input.chef,
  };
}

function validateRow(row) {
  if (!row.name) throw badRequest("Name is required.");
  if (!row.price) throw badRequest("Price is required.");
}

async function assertCategoryExists(cat) {
  const sections = await getSections();
  if (!sections.some((s) => s.key === cat)) throw badRequest("Invalid category.");
}

function seedRows() {
  return SEED_MENU.map((m) => toRow({ ...m, desc: m.desc }));
}

// ---------------------------------------------------------------------------
// Category (section) mapping + helpers.
//   DB row:  { key, label, ico, position }
//   API:     { key, label, ico }
// ---------------------------------------------------------------------------
function toSection(row) {
  return { key: row.key, label: row.label, ico: row.ico || "" };
}

function slugify(s) {
  return String(s || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

function seedCatRows() {
  return SECTIONS.map((s, i) => ({ key: s.key, label: s.label, ico: s.ico || "", position: i + 1 }));
}

// ---------------------------------------------------------------------------
// Backend: Supabase REST (PostgREST) with the secret/service key, plus a
// dev-only in-memory fallback so the app runs before Supabase is configured.
// ---------------------------------------------------------------------------
function makeMemoryBackend() {
  console.warn(
    "[store] SUPABASE_URL / SUPABASE_SECRET_KEY not set — using in-memory store (dev only, not persisted)."
  );
  let rows = [];
  let seq = 1;
  let catRows = seedCatRows();
  let catSeq = catRows.length + 1;
  const clone = (v) => JSON.parse(JSON.stringify(v));
  return {
    async list() {
      return clone(rows);
    },
    async listCats() {
      return clone([...catRows].sort((a, b) => a.position - b.position));
    },
    async insertCat(row) {
      const created = { position: catSeq++, ...row };
      catRows.push(created);
      return clone(created);
    },
    async removeCat(key) {
      const before = catRows.length;
      catRows = catRows.filter((r) => r.key !== key);
      return catRows.length < before;
    },
    async seed(newRows) {
      rows = newRows.map((r) => ({ id: randomUUID(), position: seq++, ...r }));
      return clone(rows);
    },
    async insert(row) {
      const created = { id: randomUUID(), position: seq++, ...row };
      rows.push(created);
      return clone(created);
    },
    async update(id, row) {
      const idx = rows.findIndex((r) => r.id === id);
      if (idx === -1) return null;
      rows[idx] = { ...rows[idx], ...row };
      return clone(rows[idx]);
    },
    async remove(id) {
      const before = rows.length;
      rows = rows.filter((r) => r.id !== id);
      return rows.length < before;
    },
  };
}

function makeSupabaseBackend(url, key) {
  const db = createClient(url, key, { auth: { persistSession: false } });
  const cols = "id, position, cat, diet, name, price, descr, chef";
  const guard = (error) => {
    if (error) {
      const e = new Error("Database error: " + error.message);
      e.statusCode = 500;
      throw e;
    }
  };
  const catCols = "key, label, ico, position";
  return {
    async list() {
      const { data, error } = await db.from(TABLE).select(cols).order("position", { ascending: true });
      guard(error);
      return data || [];
    },
    async listCats() {
      const { data, error } = await db.from(CAT_TABLE).select(catCols).order("position", { ascending: true });
      guard(error);
      return data || [];
    },
    async seedCats(newRows) {
      const { data, error } = await db.from(CAT_TABLE).insert(newRows).select(catCols);
      guard(error);
      return data || [];
    },
    async insertCat(row) {
      const { data, error } = await db.from(CAT_TABLE).insert(row).select(catCols).single();
      guard(error);
      return data;
    },
    async removeCat(key) {
      const { data, error } = await db.from(CAT_TABLE).delete().eq("key", key).select("key");
      guard(error);
      return (data || []).length > 0;
    },
    async seed(newRows) {
      const { data, error } = await db.from(TABLE).insert(newRows).select(cols);
      guard(error);
      return data || [];
    },
    async insert(row) {
      const { data, error } = await db.from(TABLE).insert(row).select(cols).single();
      guard(error);
      return data;
    },
    async update(id, row) {
      const { data, error } = await db.from(TABLE).update(row).eq("id", id).select(cols).maybeSingle();
      guard(error);
      return data;
    },
    async remove(id) {
      const { data, error } = await db.from(TABLE).delete().eq("id", id).select("id");
      guard(error);
      return (data || []).length > 0;
    },
  };
}

let _backend;
function backend() {
  if (_backend) return _backend;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (url && key) {
    _backend = makeSupabaseBackend(url, key);
  } else if (process.env.VERCEL === "1") {
    throw new Error("Supabase is not configured. Set SUPABASE_URL and SUPABASE_SECRET_KEY.");
  } else {
    _backend = makeMemoryBackend();
  }
  return _backend;
}

// ---------------------------------------------------------------------------
// Public API (unchanged contract).
// ---------------------------------------------------------------------------
export async function getMenu() {
  const be = backend();
  let rows = await be.list();
  if (!rows.length) rows = await be.seed(seedRows());
  return rows.map(toItem);
}

export async function addItem(input) {
  const row = toRow(input);
  validateRow(row);
  await assertCategoryExists(row.cat);
  await getMenu(); // ensure the table is seeded before the first manual add
  const created = await backend().insert(row);
  return toItem(created);
}

export async function updateItem(id, input) {
  const row = toRow(input);
  validateRow(row);
  await assertCategoryExists(row.cat);
  const updated = await backend().update(id, row);
  if (!updated) throw notFound("Item not found.");
  return toItem(updated);
}

// ---------------------------------------------------------------------------
// Categories (sections) — persisted and managed from the dashboard.
// ---------------------------------------------------------------------------
export async function getSections() {
  const be = backend();
  let rows = await be.listCats();
  if (!rows.length && be.seedCats) rows = await be.seedCats(seedCatRows());
  return rows.map(toSection);
}

export async function addCategory(input) {
  const label = String(input && input.label != null ? input.label : "").trim();
  if (!label) throw badRequest("Category name is required.");
  const key = String(input && input.key ? input.key : slugify(label)) || slugify(label);
  if (!key) throw badRequest("Category name must contain letters or numbers.");
  const ico = String(input && input.ico != null ? input.ico : "").trim().slice(0, 8);

  const existing = await getSections();
  if (existing.some((s) => s.key === key)) throw badRequest("A category with this name already exists.");

  const created = await backend().insertCat({ key, label, ico });
  return toSection(created);
}

export async function deleteCategory(key) {
  if (!key) throw badRequest("Category key is required.");
  const items = await getMenu();
  if (items.some((it) => it.cat === key)) {
    throw badRequest("This category still has menu items. Move or delete them first.");
  }
  const ok = await backend().removeCat(key);
  if (!ok) throw notFound("Category not found.");
  return { key };
}

export async function deleteItem(id) {
  const ok = await backend().remove(id);
  if (!ok) throw notFound("Item not found.");
  return { id };
}

function badRequest(message) {
  const e = new Error(message);
  e.statusCode = 400;
  return e;
}
function notFound(message) {
  const e = new Error(message);
  e.statusCode = 404;
  return e;
}
