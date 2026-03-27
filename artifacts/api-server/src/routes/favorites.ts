import { Router } from "express";
import { db } from "@workspace/db";
import { favoritesTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import { authenticate } from "../middlewares/authenticate.js";
import type { AuthenticatedRequest } from "../middlewares/authenticate.js";

const router = Router();

// GET /api/favorites
router.get("/", authenticate, async (req: AuthenticatedRequest, res) => {
  try {
    const favorites = await db.select().from(favoritesTable).where(eq(favoritesTable.userId, req.userId!));
    res.json(favorites.map(f => ({
      id: f.id, userId: f.userId, type: f.type, referenceId: f.referenceId, title: f.title, createdAt: f.createdAt,
    })));
  } catch (err) {
    req.log.error({ err }, "GetFavorites error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST /api/favorites
router.post("/", authenticate, async (req: AuthenticatedRequest, res) => {
  try {
    const { type, referenceId, title } = req.body;

    if (!type || !referenceId || !title) {
      res.status(400).json({ error: "Bad Request", message: "type, referenceId, title required" });
      return;
    }

    const [favorite] = await db.insert(favoritesTable).values({
      userId: req.userId!,
      type,
      referenceId,
      title,
    }).returning();

    res.status(201).json({ id: favorite.id, userId: favorite.userId, type: favorite.type, referenceId: favorite.referenceId, title: favorite.title, createdAt: favorite.createdAt });
  } catch (err) {
    req.log.error({ err }, "AddFavorite error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE /api/favorites/:id
router.delete("/:id", authenticate, async (req: AuthenticatedRequest, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Bad Request", message: "Invalid id" });
      return;
    }

    await db.delete(favoritesTable).where(and(eq(favoritesTable.id, id), eq(favoritesTable.userId, req.userId!)));
    res.json({ success: true, message: "Favorite removed" });
  } catch (err) {
    req.log.error({ err }, "RemoveFavorite error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
