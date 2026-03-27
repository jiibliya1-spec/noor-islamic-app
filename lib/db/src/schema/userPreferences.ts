import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const userPreferencesTable = pgTable("user_preferences", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().unique(),
  language: text("language").notNull().default("en"),
  calculationMethod: text("calculation_method").default("2"),
  theme: text("theme").default("dark"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertPreferencesSchema = createInsertSchema(userPreferencesTable).omit({ id: true, updatedAt: true });
export type InsertPreferences = z.infer<typeof insertPreferencesSchema>;
export type UserPreferences = typeof userPreferencesTable.$inferSelect;
