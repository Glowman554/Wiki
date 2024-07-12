import { connectDatabase } from "./server/database/drizzle.ts";

import "@std/dotenv/load";

/*
 * Pexodos der cutie :3
 */

export async function common() {
    await connectDatabase();
}
