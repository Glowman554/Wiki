import { getPages } from "../server/page.ts";

export default async function Home() {
    const pages = await getPages();

    return (
        <div class="glow-text">
            <ul>
                {pages.map((page) => (
                    <li key={page.id}>
                        <a href={"/page/view/" + page.id}>
                            {page.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
