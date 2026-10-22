import { getMenu, addItem, updateItem, deleteItem, getSections, getMenus } from "./_lib/store.js";
import { isAuthed } from "./_lib/auth.js";

export default async function handler(req, res) {
  try {
    const method = req.method;

    // Public read.
    if (method === "GET") {
      const [items, sections] = await Promise.all([getMenu(), getSections()]);
      // Menu changes rarely; let the CDN cache but revalidate quickly.
      res.setHeader("Cache-Control", "public, s-maxage=30, stale-while-revalidate=300");
      return res.status(200).json({ items, sections, menus: getMenus() });
    }

    // Everything below mutates — require an admin session.
    if (!isAuthed(req)) {
      return res.status(401).json({ error: "Not authenticated." });
    }

    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    const id = req.query.id;

    if (method === "POST") {
      const item = await addItem(body);
      return res.status(201).json({ item });
    }
    if (method === "PUT") {
      if (!id) return res.status(400).json({ error: "Missing id." });
      const item = await updateItem(id, body);
      return res.status(200).json({ item });
    }
    if (method === "DELETE") {
      if (!id) return res.status(400).json({ error: "Missing id." });
      const result = await deleteItem(id);
      return res.status(200).json(result);
    }

    res.setHeader("Allow", "GET, POST, PUT, DELETE");
    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    const code = err.statusCode || 500;
    return res.status(code).json({ error: err.message || "Server error." });
  }
}
