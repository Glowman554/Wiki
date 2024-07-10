import { Head } from "$fresh/runtime.ts";
import { getChangelog } from "../server/changelog.ts";

export default async function Changelog() {
    const changelog = await getChangelog(10);

    return (
        <div class="glow-text">
            <Head>
                <title>Wiki - Changelog</title>
            </Head>
            <table class="glow-table">
                {changelog.map((change) => (
                    <tr class="glow-tr">
                        <td class="glow-td">{change.text}</td>
                        <td class="glow-td">{change.by}</td>
                        <td class="glow-td">
                            {change.creationDate.toLocaleDateString()}
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    );
}
