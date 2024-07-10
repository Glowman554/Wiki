import { Head } from "$fresh/runtime.ts";
import { CreateField } from "../../islands/Account.tsx";

export default function Create() {
    return (
        <div class="glow-text glow-center">
            <Head>
                <title>Wiki - Account creation</title>
            </Head>
            <CreateField />
        </div>
    );
}
