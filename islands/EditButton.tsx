import { useIsEditor, useToken } from "../client/token.ts";
import { trpc } from "../server/trpc/client.ts";
import { useQueryState, withQuery } from "../client/helper.ts";
import { useState } from "preact/hooks";
import { ContinueBox } from "./ContinueBox.tsx";

export function EditButton(props: { id: number }) {
    const q = useQueryState(true);
    const token = useToken(q);
    const isEditor = useIsEditor(token, q);
    const [showConfirmBox, setShowConfirmBox] = useState(false);

    const deleteCallback = () => {
        if (!token) {
            return;
        }

        withQuery(
            () => trpc.pages.delete.mutate({ token, id: props.id }),
            q,
            () => {
                location.href = "/";
            },
        );
    };

    return (
        <span>
            {q.isLoading
                ? (
                    <img
                        class="glow-spinner"
                        src="/loading.svg"
                        style={{
                            width: "2rem",
                        }}
                    />
                )
                : (isEditor
                    ? (
                        <>
                            <a href={"/page/edit/" + props.id}>
                                <img
                                    src="/edit.svg"
                                    style={{ width: "2rem" }}
                                />
                            </a>
                            <a onClick={() => setShowConfirmBox(true)}>
                                <img
                                    src="/delete.svg"
                                    style={{ width: "2rem" }}
                                />
                            </a>
                            {showConfirmBox
                                ? (
                                    <ContinueBox
                                        cancelCallback={() => {}}
                                        continueCallback={deleteCallback}
                                        resetCallback={() =>
                                            setShowConfirmBox(false)}
                                        message="You are about to delete this page!"
                                    />
                                )
                                : <></>}
                        </>
                    )
                    : <></>)}
        </span>
    );
}
