import { Handlers } from "$fresh/server.ts";
import { CSS, render } from "$gfm";
import { renderToString } from "$fresh/src/server/deps.ts";
import { getPage } from "../../../../server/page.ts";

export const handler: Handlers<unknown> = {
    async GET(_req, ctx) {
        const id = Number(ctx.params.id);
        const page = await getPage(id);
        if (page == null) {
            throw new Error("Page not found!");
        }
        return new Response(
            renderToString(
                <html>
                    <head>
                        <title>{page.title}</title>
                        <style dangerouslySetInnerHTML={{ __html: CSS }} />
                    </head>
                    <body>
                        <h1>{page.title} by {page.by}</h1>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: render(page.content, {
                                    disableHtmlSanitization: true,
                                }),
                            }}
                        >
                        </div>
                    </body>
                </html>,
            ),
        );
    },
};
