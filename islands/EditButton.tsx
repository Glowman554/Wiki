import { useIsEditor, useToken } from "../client/token.ts";
import { trpc } from "../server/trpc/client.ts";
import { useQueryState, withQuery } from "../client/helper.ts";

export function EditButton(props: { id: number }) {
    const q = useQueryState(true);
    const token = useToken(q);
    const isEditor = useIsEditor(token, q);

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
                            <a onClick={deleteCallback}>
                                <img
                                    src="/delete.svg"
                                    style={{ width: "2rem" }}
                                />
                            </a>
                        </>
                    )
                    : <></>)}
        </span>
    );
}
