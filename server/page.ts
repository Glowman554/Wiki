import { eq, sql } from "drizzle-orm";
import { db } from "./database/drizzle.ts";
import { pages } from "./database/schema.ts";

export interface PartialPage {
    id: number;
    title: string;
    creationDate: Date;
    updateDate: Date;
}

export interface Page extends PartialPage {
    content: string;
    by: string;
}

export async function createPage(
    username: string,
    title: string,
    content: string,
) {
    const result = await db.insert(pages).values({
        by: username,
        content,
        title,
    }).returning().get();
    return result.id;
}

export async function updatePage(title: string, content: string, id: number) {
    await db.update(pages).set({
        title,
        content,
        updateDate: sql`(strftime('%s', 'now'))`,
    }).where(eq(pages.id, id));
}

export async function getPage(id: number): Promise<Page | null> {
    const maybe = await db.select().from(pages).where(eq(pages.id, id));
    if (maybe.length == 0) {
        return null;
    }
    return maybe[0];
}

export async function getPages(): Promise<PartialPage[]> {
    return await db.select({
        id: pages.id,
        title: pages.title,
        creationDate: pages.creationDate,
        updateDate: pages.updateDate,
    }).from(pages);
}

export async function getPageTitle(id: number) {
    const maybe = await db.select({ title: pages.title }).from(pages).where(
        eq(pages.id, id),
    );
    if (maybe.length == 0) {
        return null;
    }
    return maybe[0].title;
}

export async function deletePage(id: number) {
    await db.delete(pages).where(eq(pages.id, id));
}
