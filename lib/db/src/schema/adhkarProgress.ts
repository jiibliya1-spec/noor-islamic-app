import { pgTable, text, serial, integer, boolean, date, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const adhkarProgressTable = pgTable("adhkar_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  dhikrId: text("dhikr_id").notNull(),
  count: integer("count").notNull().default(0),
  completed: boolean("completed").notNull().default(false),
  date: date("date").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAdhkarProgressSchema = createInsertSchema(adhkarProgressTable).omit({ id: true, createdAt: true });
export type InsertAdhkarProgress = z.infer<typeof insertAdhkarProgressSchema>;
export type AdhkarProgress = typeof adhkarProgressTable.$inferSelect;
