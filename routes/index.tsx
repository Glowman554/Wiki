import { SearchablePages } from "../islands/SearchablePages.tsx";
import { getPages } from "../server/page.ts";

export default async function Home() {
    const pages = await getPages();

    return (
        <div class="glow-text">
            <head>
                <title>Wiki</title>
            </head>
            <SearchablePages pages={pages} />
        </div>
    );
}
