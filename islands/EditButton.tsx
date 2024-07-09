import { useContext } from "preact/hooks";
import { useIsEditor, useToken } from "../client/token.ts";
import { ErrorContext } from "./Error.tsx";
import { erroring } from "../client/helper.ts";
import { trpc } from "../server/trpc/client.ts";

export function EditButton(props: { id: number }) {
    const token = useToken();
    const isEditor = useIsEditor(token);
    const setError = useContext(ErrorContext);

    const deleteCallback = () => {
        if (!token) {
            return;
        }

        erroring(
            trpc.pages.delete.mutate({ token, id: props.id }).then(() =>
                location.href = "/"
            ),
            setError,
        );
    };

    return (
        isEditor
            ? (
                <span>
                    <a href={"/page/edit/" + props.id}>
                        <img src="/edit.svg" style={{ width: "2rem" }} />
                    </a>
                    <a onClick={deleteCallback}>
                        <img src="/delete.svg" style={{ width: "2rem" }} />
                    </a>
                </span>
            )
            : <></>
    );
}
