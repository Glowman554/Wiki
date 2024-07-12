import { PageProps } from "fresh";
import { EditPageField } from "../../../islands/Edit.tsx";
import { getPage } from "../../../server/page.ts";

export default async function Edit(props: PageProps) {
    const id = Number(props.params.id);
    const page = await getPage(id);

    return (
        <div class="glow-text">
            {page
                ? (
                    <>
                        <head>
                            <title>Wiki - {page.title} (editor)</title>
                        </head>
                        <EditPageField page={page} />
                    </>
                )
                : <p>Page not found</p>}
        </div>
    );
}
