import { Handlers } from "$fresh/server.ts";
import { getPages } from "../../../server/page.ts";

export const handler: Handlers<unknown> = {
    async GET(_req, _ctx) {
        return new Response(JSON.stringify(await getPages()));
    },
};
