import { getPage } from "../../../server/page.ts";
import { CSS, render } from "@deno/gfm";
import { EditButton } from "../../../islands/EditButton.tsx";
import { PageProps } from "fresh";

export default async function View(props: PageProps) {
    const id = Number(props.params.id);
    const page = await getPage(id);

    return (
        <div class="glow-text">
            {page
                ? (
                    <>
                        <head>
                            <style dangerouslySetInnerHTML={{ __html: CSS }} />
                            <title>Wiki - {page.title}</title>
                        </head>
                        <div>
                            <h1 class="glow-section">
                                {page.title}
                                <EditButton id={page.id} />
                            </h1>

                            <h3 class="glow-section">
                                <span>by {page.by}</span>
                                <span>
                                    {page.updateDate.toLocaleDateString()}
                                </span>
                            </h3>
                        </div>
                        <hr />
                        <div
                            dangerouslySetInnerHTML={{
                                __html: render(page.content, {
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
