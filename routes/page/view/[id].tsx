import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { getPage, Page } from "../../../server/page.ts";
import { CSS, render } from "$gfm";
import { EditButton } from "../../../islands/EditButton.tsx";

export const handler: Handlers<Page | null> = {
    async GET(_req, ctx) {
        const id = Number(ctx.params.id);
        return ctx.render(await getPage(id));
    },
};

export default function View(props: PageProps<Page | null>) {
    return (
        <div class="glow-text">
            {props.data
                ? (
                    <>
                        <Head>
                            <style dangerouslySetInnerHTML={{ __html: CSS }} />
                        </Head>
                        <div>
                            <h1 class="glow-section">
                                {props.data.title}
                                <EditButton id={props.data.id} />
                            </h1>

                            <h3 class="glow-section">
                                <span>by {props.data.by}</span>
                                <span>
                                    {props.data.updateDate.toLocaleDateString()}
                                </span>
                            </h3>
                        </div>
                        <hr />
                        <div
                            dangerouslySetInnerHTML={{
                                __html: render(props.data.content, {
                                    disableHtmlSanitization: true,
                                }),
                            }}
                        >
                        </div>
                    </>
                )
                : <p>Page not found</p>}
        </div>
    );
}
