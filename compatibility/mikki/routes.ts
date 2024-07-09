import { Router } from "https://deno.land/x/simple_router@0.8/mod.ts";
import { trpc } from "./trpc.ts";

/**
 * Please note:
 * I am sorry for this encoding...
 * There probably was a reason why we encoded the data like that before moving to javascript on the backend i cant remember it anymore though.
 * This encoding was a mistake but cant be fixed now. It is here to stay to maintain compatibility with the already existing (and old / outdated) Mikki deployments / executables
 */

const ri: ResponseInit = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
    },
};

async function pageList(_req: Request): Promise<Response> {
    const pages = await trpc.pages.list.query();
    return new Response(
        encodeURIComponent(JSON.stringify(pages.map((page) => ({
            page_id: page.id,
            page_title: page.title,
            page_created: page.creationDate.getMilliseconds(),
            page_edited: page.updateDate.getMilliseconds(),
        })))),
        ri,
    );
}

async function pageGet(req: Request): Promise<Response> {
    const url = new URL(req.url);

    const entry = await trpc.pages.load.query(
        Number(url.searchParams.get("page_id")),
    );
    if (!entry) {
        throw new Error("Not found!");
    }

    if (url.searchParams.has("download")) {
        throw new Error("Not implemented!");
    }
    console.log(entry);
    return new Response(
        encodeURIComponent(JSON.stringify({
            page_id: entry.id,
            page_text: entry.content,
            page_created: entry.creationDate.getTime(),
            page_edited: entry.updateDate.getTime(),
            page_title: entry.title,
        })),
        ri,
    );
}

async function pageChangelog(_req: Request): Promise<Response> {
    const changes = await trpc.changelog.load.query(10);
    return new Response(
        encodeURIComponent(JSON.stringify(changes.map((change) => ({
            when: new Date(change.creationDate).getTime(),
            what: `${change.text} by ${change.by}`,
        })))),
        ri,
    );
}

// deno-lint-ignore require-await
async function useNew(_req: Request): Promise<Response> {
    throw new Error("Please use the new website!");
}

export function init_routes(router: Router) {
    router.add("/api/v2/wiki/page/create", useNew, "POST");
    router.add("/api/v2/wiki/page/edit", useNew, "POST");
    router.add("/api/v2/wiki/page/delete", useNew, "GET");

    router.add("/api/v2/wiki/page/get", pageGet, "GET");
    router.add("/api/v2/wiki/page/list", pageList, "GET");
    router.add("/api/v2/wiki/page/changelog", pageChangelog, "GET");

    router.add("/api/v2/acc/create", useNew, "POST");
    router.add("/api/v2/acc/login", useNew, "POST");
    router.add("/api/v2/acc/check", useNew, "POST");
    router.add("/api/v2/acc/info", useNew, "POST");
    router.add("/api/v2/acc/delete", useNew, "POST");
    router.add("/api/v2/acc/chpasswd", useNew, "POST");
}
