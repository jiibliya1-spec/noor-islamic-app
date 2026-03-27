import { Router } from "express";
import { db } from "@workspace/db";
import { userPreferencesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { authenticate } from "../middlewares/authenticate.js";
import type { AuthenticatedRequest } from "../middlewares/authenticate.js";

const router = Router();

// GET /api/user/preferences
router.get("/preferences", authenticate, async (req: AuthenticatedRequest, res) => {
  try {
    const [prefs] = await db.select().from(userPreferencesTable).where(eq(userPreferencesTable.userId, req.userId!)).limit(1);
    if (!prefs) {
      res.json({ language: "en", calculationMethod: "2", theme: "dark" });
      return;
    }
    res.json({ language: prefs.language, calculationMethod: prefs.calculationMethod, theme: prefs.theme });
  } catch (err) {
    req.log.error({ err }, "GetPreferences error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT /api/user/preferences
router.put("/preferences", authenticate, async (req: AuthenticatedRequest, res) => {
  try {
    const { language, calculationMethod, theme } = req.body;

    const existing = await db.select().from(userPreferencesTable).where(eq(userPreferencesTable.userId, req.userId!)).limit(1);

    if (existing.length === 0) {
      const [prefs] = await db.insert(userPreferencesTable).values({
        userId: req.userId!,
        language: language ?? "en",
        calculationMethod: calculationMethod ?? "2",
        theme: theme ?? "dark",
      }).returning();
      res.json({ language: prefs.language, calculationMethod: prefs.calculationMethod, theme: prefs.theme });
    } else {
      const [prefs] = await db.update(userPreferencesTable)
        .set({ language, calculationMethod, theme, updatedAt: new Date() })
        .where(eq(userPreferencesTable.userId, req.userId!))
        .returning();
      res.json({ language: prefs.language, calculationMethod: prefs.calculationMethod, theme: prefs.theme });
    }
  } catch (err) {
    req.log.error({ err }, "UpdatePreferences error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
