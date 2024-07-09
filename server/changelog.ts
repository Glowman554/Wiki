import { desc } from "drizzle-orm";
import { db } from "./database/drizzle.ts";
import { changelog } from "./database/schema.ts";

export interface Change {
    id: number;
    text: string;
    creationDate: Date;
    by: string;
}

export async function insertChange(text: string, by: string) {
    await db.insert(changelog).values({ by, text });
}

export async function getChangelog(limit: number): Promise<Change[]> {
    return await db.select().from(changelog).orderBy(
        desc(changelog.creationDate),
    ).limit(limit);
}
