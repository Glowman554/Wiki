import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { EditField } from "../../../islands/Edit.tsx";
import { getPage, Page } from "../../../server/page.ts";

export const handler: Handlers<Page | null> = {
    async GET(_req, ctx) {
        const id = Number(ctx.params.id);
        return ctx.render(await getPage(id));
    },
};

export default function Edit(props: PageProps<Page | null>) {
    return (
        <div class="glow-text">
            {props.data
                ? (
                    <>
                        <Head>
                            <title>Wiki - {props.data.title} (editor)</title>
                        </Head>
                        <EditField page={props.data} />
                    </>
                )
                : <p>Page not found</p>}
        </div>
    );
}
