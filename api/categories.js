import { getSections, addCategory, deleteCategory } from "./_lib/store.js";
import { isAuthed } from "./_lib/auth.js";

export default async function handler(req, res) {
  try {
    const method = req.method;

    // Public read — the menu and dashboard both render whatever this returns.
    if (method === "GET") {
      const sections = await getSections();
      res.setHeader("Cache-Control", "public, s-maxage=30, stale-while-revalidate=300");
      return res.status(200).json({ sections });
    }

    // Everything below mutates — require an admin session.
    if (!isAuthed(req)) {
      return res.status(401).json({ error: "Not authenticated." });
    }

    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};

    if (method === "POST") {
      const section = await addCategory(body);
      return res.status(201).json({ section });
    }
    if (method === "DELETE") {
      const key = req.query.key;
      if (!key) return res.status(400).json({ error: "Missing key." });
      const result = await deleteCategory(key);
      return res.status(200).json(result);
    }

    res.setHeader("Allow", "GET, POST, DELETE");
    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    const code = err.statusCode || 500;
    return res.status(code).json({ error: err.message || "Server error." });
  }
}
