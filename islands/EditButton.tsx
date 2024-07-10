import { useIsEditor, useToken } from "../client/token.ts";
import { trpc } from "../server/trpc/client.ts";
import { withQuery } from "../client/helper.ts";

export function EditButton(props: { id: number }) {
    const { result: token, setError, setIsLoading, isLoading } = useToken();
    const isEditor = useIsEditor(token, setIsLoading, setError);

    const deleteCallback = () => {
        if (!token) {
            return;
        }

        withQuery(
            () => trpc.pages.delete.mutate({ token, id: props.id }),
            setIsLoading,
            setError,
            () => {
                location.href = "/";
            },
        );
    };

    return (
        isEditor
            ? (
                <span>
                    {isLoading
                        ? (
                            <img
                                class="glow-spinner"
                                src="/loading.svg"
                                style={{
                                    width: "2rem",
                                }}
                            />
                        )
                        : (
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
                        )}
                </span>
            )
            : <></>
    );
}
