// Local dev server — emulates Vercel's static + /api routing so you can run the
// app without the Vercel CLI. Not used in production (Vercel handles this).
//
//   node dev-server.mjs         → http://localhost:3000
//
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const ROOT = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

// Minimal .env.local loader (no dependency).
try {
  const env = await readFile(join(ROOT, ".env.local"), "utf8");
  for (const line of env.split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
} catch {
  /* no .env.local — fine */
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".json": "application/json; charset=utf-8",
};

// Wrap Node's res with the Vercel-style helpers the handlers expect.
function enhance(res) {
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  res.json = (obj) => {
    if (!res.getHeader("Content-Type")) res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify(obj));
    return res;
  };
  return res;
}

async function readBody(req) {
  const chunks = [];
  for await (const c of req) chunks.push(c);
  const raw = Buffer.concat(chunks).toString("utf8");
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}

async function serveStatic(req, res, pathname) {
  let rel = decodeURIComponent(pathname);
  if (rel === "/") rel = "/index.html";
  // clean URLs: /admin → /admin.html
  if (!extname(rel)) rel += ".html";
  const filePath = normalize(join(ROOT, rel));
  if (!filePath.startsWith(ROOT)) {
    res.statusCode = 403;
    return res.end("Forbidden");
  }
  try {
    const info = await stat(filePath);
    if (info.isDirectory()) throw new Error("dir");
    const data = await readFile(filePath);
    res.setHeader("Content-Type", MIME[extname(filePath)] || "application/octet-stream");
    res.end(data);
  } catch {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end("<h1>404 — Not found</h1>");
  }
}

const server = createServer(async (req, res) => {
  enhance(res);
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  if (pathname.startsWith("/api/")) {
    const name = pathname.slice("/api/".length).replace(/\/$/, "");
    try {
      const mod = await import(join(ROOT, "api", `${name}.js`));
      req.query = Object.fromEntries(url.searchParams.entries());
      if (req.method !== "GET" && req.method !== "HEAD") req.body = await readBody(req);
      await mod.default(req, res);
    } catch (err) {
      if (err.code === "ERR_MODULE_NOT_FOUND") {
        res.status(404).json({ error: "No such API route: /api/" + name });
      } else {
        console.error(err);
        res.status(500).json({ error: err.message || "Server error" });
      }
    }
    return;
  }

  await serveStatic(req, res, pathname);
});

server.listen(PORT, () => {
  console.log(`\n  Chili N' Curry running:`);
  console.log(`  → Menu:      http://localhost:${PORT}/`);
  console.log(`  → Dashboard: http://localhost:${PORT}/admin\n`);
});
