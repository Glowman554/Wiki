import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const users = sqliteTable("users", {
    username: text("username").primaryKey(),
    editor: integer("editor", { mode: "boolean" }).notNull(),
    passwordHash: text("password_hash").notNull(),
});

export const sessions = sqliteTable("sessions", {
    token: text("token").primaryKey(),
    username: text("username").references(() => users.username, {
        onDelete: "cascade",
        onUpdate: "cascade",
    }).notNull(),
    creationDate: integer("creation_date", { mode: "timestamp" }).default(
        sql`(strftime('%s', 'now'))`,
    ).notNull(),
});

export const pages = sqliteTable("pages", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    title: text("title").notNull(),
    content: text("content").notNull(),
    creationDate: integer("creation_date", { mode: "timestamp" }).default(
        sql`(strftime('%s', 'now'))`,
    ).notNull(),
    updateDate: integer("update_date", { mode: "timestamp" }).default(
        sql`(strftime('%s', 'now'))`,
    ).notNull(),
    by: text("by").references(() => users.username, {
        onDelete: "cascade",
        onUpdate: "cascade",
    }).notNull(),
});

export const changelog = sqliteTable("changelog", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    text: text("text").notNull(),
    creationDate: integer("creation_date", { mode: "timestamp" }).default(
        sql`(strftime('%s', 'now'))`,
    ).notNull(),
    by: text("by").references(() => users.username, {
        onDelete: "cascade",
        onUpdate: "cascade",
    }).notNull(),
});
