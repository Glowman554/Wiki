import { Head } from "$fresh/runtime.ts";
import { LoginField } from "../../islands/Account.tsx";

export default function Create() {
    return (
        <div class="glow-text">
            <Head>
                <title>Wiki - Account login</title>
            </Head>
            <LoginField />
        </div>
    );
}
