import { connectDatabase } from "./server/database/drizzle.ts";

/*
 * Pexodos der cutie :3
 */

export async function common() {
    if (Deno.args.includes("build")) {
        console.log("Skipping common() because 'build' argument was found");
        return;
    }
    await connectDatabase();
}
