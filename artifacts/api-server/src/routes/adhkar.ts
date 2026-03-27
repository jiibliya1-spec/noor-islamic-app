import { Router } from "express";
import { db } from "@workspace/db";
import { adhkarProgressTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import { authenticate } from "../middlewares/authenticate.js";
import type { AuthenticatedRequest } from "../middlewares/authenticate.js";

const router = Router();

function todayDate(): string {
  return new Date().toISOString().split("T")[0];
}

// GET /api/adhkar/progress
router.get("/progress", authenticate, async (req: AuthenticatedRequest, res) => {
  try {
    const today = todayDate();
    const progress = await db.select().from(adhkarProgressTable)
      .where(and(eq(adhkarProgressTable.userId, req.userId!), eq(adhkarProgressTable.date, today)));
    res.json(progress.map(p => ({
      id: p.id, userId: p.userId, dhikrId: p.dhikrId, count: p.count, completed: p.completed, date: p.date,
    })));
  } catch (err) {
    req.log.error({ err }, "GetAdhkarProgress error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT /api/adhkar/progress/:dhikrId
router.put("/progress/:dhikrId", authenticate, async (req: AuthenticatedRequest, res) => {
  try {
    const { dhikrId } = req.params;
    const { count, completed } = req.body;
    const today = todayDate();

    const existing = await db.select().from(adhkarProgressTable)
      .where(and(
        eq(adhkarProgressTable.userId, req.userId!),
        eq(adhkarProgressTable.dhikrId, dhikrId),
        eq(adhkarProgressTable.date, today)
      )).limit(1);

    let result;
    if (existing.length === 0) {
      [result] = await db.insert(adhkarProgressTable).values({
        userId: req.userId!,
        dhikrId,
        count: count ?? 0,
        completed: completed ?? false,
        date: today,
      }).returning();
    } else {
      [result] = await db.update(adhkarProgressTable)
        .set({ count, completed })
        .where(and(
          eq(adhkarProgressTable.userId, req.userId!),
          eq(adhkarProgressTable.dhikrId, dhikrId),
          eq(adhkarProgressTable.date, today)
        ))
        .returning();
    }

    res.json({ id: result.id, userId: result.userId, dhikrId: result.dhikrId, count: result.count, completed: result.completed, date: result.date });
  } catch (err) {
    req.log.error({ err }, "UpdateAdhkarProgress error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
