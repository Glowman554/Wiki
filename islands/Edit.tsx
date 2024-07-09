import { useContext } from "preact/hooks";
import { useIsEditor, useToken } from "../client/token.ts";
import { erroring, useInput } from "../client/helper.ts";
import { trpc } from "../server/trpc/client.ts";
import { ErrorContext } from "./Error.tsx";
import { Page } from "../server/page.ts";

function Common(props: {
    initialTitle: string;
    initialContent: string;
    submitText: string;
    callback: (title: string, content: string, token: string) => void;
}) {
    const token = useToken();
    const [title, setTitle] = useInput(props.initialTitle);
    const [content, setContent] = useInput(props.initialContent);
    const isEditor = useIsEditor(token);

    return (
        token
            ? (
                isEditor
                    ? (
                        <>
                            <link rel="stylesheet" href="/editor.css" />
                            <div class="editor-container">
                                <input
                                    class="editor-title-input"
                                    onChange={setTitle}
                                    type="text"
                                    value={title}
                                />
                                <textarea
                                    class="editor-content-textfield"
                                    onChange={setContent}
                                    value={content}
                                >
                                </textarea>
                                <div class="editor-center">
                                    <button
                                        class="editor-fancy-button"
                                        onClick={() =>
                                            props.callback(
                                                title,
                                                content,
                                                token,
                                            )}
                                    >
                                        {props.submitText}
                                    </button>
                                </div>
                            </div>
                        </>
                    )
                    : <p>You need to be an editor to use this page</p>
            )
            : <p>You need to be logged in to use this page</p>
    );
}

export function CreateField() {
    const setError = useContext(ErrorContext);
    const callback = (title: string, content: string, token: string) => {
        erroring(
            trpc.pages.create.mutate({ token, title, content }).then((id) =>
                location.href = `/page/view/${id}`
            ),
            setError,
        );
    };
    return (
        <Common
            initialTitle="Default title"
            initialContent=""
            submitText="Create page"
            callback={callback}
        />
    );
}

export function EditField(props: { page: Page }) {
    const setError = useContext(ErrorContext);

    const callback = (title: string, content: string, token: string) => {
        erroring(
            trpc.pages.update.mutate({
                token,
                title,
                content,
                id: props.page.id,
            }).then(() => location.href = `/page/view/${props.page.id}`),
            setError,
        );
    };

    return (
        <Common
            initialTitle={props.page.title}
            initialContent={props.page.content}
            submitText="Update page"
            callback={callback}
        />
    );
}
