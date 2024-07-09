import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../../server/trpc/server.ts";
import superjson from "superjson";

const trpcUrl = Deno.env.get("TRPC");
if (!trpcUrl) {
    throw new Error("Missing TRPC");
}

export const trpc = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: trpcUrl,
        }),
    ],
    transformer: superjson,
});
