import { pgTable, uuid, varchar, timestamp, text, pgEnum, numeric, jsonb } from 'drizzle-orm/pg-core';

export const priorityEnum = pgEnum('priority', ['LOW', 'MEDIUM', 'HIGH']);
export const statusEnum = pgEnum('status', ['TODO', 'IN_PROGRESS', 'DONE']);

export const tasks = pgTable('tasks', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  priority: priorityEnum('priority').notNull(),
  status: statusEnum('status').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  dueDate: timestamp('due_date', { withTimezone: true }),
  assignedTo: varchar('assigned_to', { length: 255 }),
  tags: jsonb('tags').$type<string[]>(),
  estimatedHours: numeric('estimated_hours', { precision: 5, scale: 2 }),
});
