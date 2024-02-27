import { date, pgEnum, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("status", ["pending", "complete"]);

export const projectsTable = pgTable("projectsTable", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  deadline: date("deadline").notNull(),
});

export type Project = typeof projectsTable.$inferSelect;

export const tasksTable = pgTable("tasksTable", {
  id: serial("id").primaryKey(),
  description: varchar("description", { length: 200 }).notNull(),
  status: statusEnum("status").notNull().default("pending"),
  projectId: serial("projectId").references(() => projectsTable.id),
});

export type Task = typeof tasksTable.$inferInsert;
