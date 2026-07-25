import { Redis } from "@upstash/redis";
import { randomUUID } from "node:crypto";
import { SEED_MENU, SECTIONS } from "./seed.js";

const MENU_KEY = "chilicurry:menu";

// Dev-only fallback: an in-memory store that mimics the two Redis methods we use.
// Only used when running locally (not on Vercel) and no Redis is configured, so
// you can try the app with zero setup. Data resets when the process restarts.
function makeMemoryClient() {
  console.warn(
    "[store] No Redis configured — using in-memory store (dev only, data is not persisted)."
  );
  const mem = new Map();
  const clone = (v) => (v == null ? v : JSON.parse(JSON.stringify(v)));
  return {
    async get(key) {
      return mem.has(key) ? clone(mem.get(key)) : null;
    },
    async set(key, value) {
      mem.set(key, clone(value));
      return "OK";
    },
  };
}

// Accepts both Vercel KV and raw Upstash env var names.
function makeClient() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    // In production on Vercel we require a real store; locally we fall back.
    if (process.env.VERCEL === "1") {
      throw new Error(
        "Redis is not configured. Connect an Upstash Redis (KV) store so KV_REST_API_URL and KV_REST_API_TOKEN are set."
      );
    }
    return makeMemoryClient();
  }
  return new Redis({ url, token });
}

let _redis;
function redis() {
  if (!_redis) _redis = makeClient();
  return _redis;
}

function withIds(items) {
  return items.map((it) => ({ id: randomUUID(), ...it }));
}

// Read the menu, seeding storage on first run.
export async function getMenu() {
  const stored = await redis().get(MENU_KEY);
  if (Array.isArray(stored) && stored.length) return stored;
  const seeded = withIds(SEED_MENU);
  await redis().set(MENU_KEY, seeded);
  return seeded;
}

async function saveMenu(items) {
  await redis().set(MENU_KEY, items);
  return items;
}

// Normalize an incoming item; keep price as number when it is purely numeric.
function cleanItem(input) {
  const name = String(input.name || "").trim();
  const cat = String(input.cat || "").trim();
  const diet = input.diet === "nv" ? "nv" : "v";
  let desc = String(input.desc || "").trim();
  let price = input.price;
  if (typeof price === "string") {
    const t = price.trim();
    price = /^\d+$/.test(t) ? Number(t) : t;
  }
  const item = { name, cat, diet, price, desc };
  if (input.chef) item.chef = true;
  return item;
}

function validCategory(cat) {
  return SECTIONS.some((s) => s.key === cat);
}

export async function addItem(input) {
  const clean = cleanItem(input);
  if (!clean.name) throw badRequest("Name is required.");
  if (!validCategory(clean.cat)) throw badRequest("Invalid category.");
  if (clean.price === "" || clean.price === undefined || clean.price === null)
    throw badRequest("Price is required.");
  const items = await getMenu();
  const item = { id: randomUUID(), ...clean };
  items.push(item);
  await saveMenu(items);
  return item;
}

export async function updateItem(id, input) {
  const items = await getMenu();
  const idx = items.findIndex((it) => it.id === id);
  if (idx === -1) throw notFound("Item not found.");
  const clean = cleanItem(input);
  if (!clean.name) throw badRequest("Name is required.");
  if (!validCategory(clean.cat)) throw badRequest("Invalid category.");
  const updated = { id, ...clean };
  items[idx] = updated;
  await saveMenu(items);
  return updated;
}

export async function deleteItem(id) {
  const items = await getMenu();
  const next = items.filter((it) => it.id !== id);
  if (next.length === items.length) throw notFound("Item not found.");
  await saveMenu(next);
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
