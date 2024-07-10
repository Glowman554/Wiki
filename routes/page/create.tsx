import { Head } from "$fresh/runtime.ts";
import { CreateField } from "../../islands/Edit.tsx";

export default function Create() {
    return (
        <div class="glow-text">
            <Head>
                <title>Wiki - Create</title>
            </Head>
            <CreateField />
        </div>
    );
}
