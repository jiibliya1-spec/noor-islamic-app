import { Router } from "express";
import { db } from "@workspace/db";
import { calendarEventsTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import { authenticate } from "../middlewares/authenticate.js";
import type { AuthenticatedRequest } from "../middlewares/authenticate.js";

const router = Router();

// GET /api/events
router.get("/", authenticate, async (req: AuthenticatedRequest, res) => {
  try {
    const events = await db.select().from(calendarEventsTable).where(eq(calendarEventsTable.userId, req.userId!));
    res.json(events.map(e => ({
      id: e.id, userId: e.userId, title: e.title, description: e.description, date: e.date, hijriDate: e.hijriDate, type: e.type, createdAt: e.createdAt,
    })));
  } catch (err) {
    req.log.error({ err }, "GetEvents error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST /api/events
router.post("/", authenticate, async (req: AuthenticatedRequest, res) => {
  try {
    const { title, description, date, hijriDate, type } = req.body;

    if (!title || !date || !type) {
      res.status(400).json({ error: "Bad Request", message: "title, date, type required" });
      return;
    }

    const [event] = await db.insert(calendarEventsTable).values({
      userId: req.userId!,
      title,
      description,
      date,
      hijriDate,
      type,
    }).returning();

    res.status(201).json({ id: event.id, userId: event.userId, title: event.title, description: event.description, date: event.date, hijriDate: event.hijriDate, type: event.type, createdAt: event.createdAt });
  } catch (err) {
    req.log.error({ err }, "CreateEvent error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT /api/events/:id
router.put("/:id", authenticate, async (req: AuthenticatedRequest, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, description, date, hijriDate, type } = req.body;

    const [event] = await db.update(calendarEventsTable)
      .set({ title, description, date, hijriDate, type })
      .where(and(eq(calendarEventsTable.id, id), eq(calendarEventsTable.userId, req.userId!)))
      .returning();

    res.json({ id: event.id, userId: event.userId, title: event.title, description: event.description, date: event.date, hijriDate: event.hijriDate, type: event.type, createdAt: event.createdAt });
  } catch (err) {
    req.log.error({ err }, "UpdateEvent error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE /api/events/:id
router.delete("/:id", authenticate, async (req: AuthenticatedRequest, res) => {
  try {
    const id = parseInt(req.params.id);
    await db.delete(calendarEventsTable).where(and(eq(calendarEventsTable.id, id), eq(calendarEventsTable.userId, req.userId!)));
    res.json({ success: true, message: "Event deleted" });
  } catch (err) {
    req.log.error({ err }, "DeleteEvent error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
