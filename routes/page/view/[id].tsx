import { getPage } from "../../../server/page.ts";
import { render } from "@deno/gfm";
import { EditButton } from "../../../islands/EditButton.tsx";
import { PageProps } from "fresh";

import "prismjs/components/prism-json.js";
import "prismjs/components/prism-java.js";
import "prismjs/components/prism-typescript.js";
import "prismjs/components/prism-c.js";
import "prismjs/components/prism-cobol.js";

export default async function View(props: PageProps) {
    const id = Number(props.params.id);
    const page = await getPage(id);

    return (
        <div class="glow-text">
            {page
                ? (
                    <>
                        <head>
                            <link href="/prism.css" rel="stylesheet" />
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
                        <main
                            class="markdown-body"
                            dangerouslySetInnerHTML={{
                                __html: render(page.content, {
                                    disableHtmlSanitization: true,
                                }),
                            }}
                        >
                        </main>
                    </>
                )
                : <p>Page not found</p>}
        </div>
    );
}
