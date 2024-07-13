import { useInput } from "../client/helper.ts";
import { PartialPage } from "../server/page.ts";

export function SearchablePages(props: { pages: PartialPage[] }) {
    const [search, searchChange] = useInput("");
    return (
        <>
            <div class="glow-center">
                <input
                    class="editor-title-input"
                    style={{ width: "60%" }}
                    type="text"
                    placeholder="search"
                    value={search}
                    onInput={searchChange}
                />
            </div>
            <ul>
                {props.pages.filter((page) =>
                    page.title.toLocaleLowerCase().includes(
                        search.toLocaleLowerCase(),
                    )
                ).map((page) => (
                    <li key={page.id}>
                        <a href={"/page/view/" + page.id}>
                            {page.title}
                        </a>
                    </li>
                ))}
            </ul>
        </>
    );
}
