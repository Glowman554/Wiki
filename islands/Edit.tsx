import { useIsEditor, useToken } from "../client/token.ts";
import { useInput, useQueryState, withQuery } from "../client/helper.ts";
import { trpc } from "../server/trpc/client.ts";
import { Page } from "../server/page.ts";
import { Query } from "../components/Query.tsx";

function Common(props: {
    initialTitle: string;
    initialContent: string;
    submitText: string;
    callback: (title: string, content: string, token: string) => void;
}) {
    const q = useQueryState(true);
    const token = useToken(q);
    const [title, setTitle] = useInput(props.initialTitle);
    const [content, setContent] = useInput(props.initialContent);
    const isEditor = useIsEditor(token, q);

    return (
        <Query q={q}>
            {token
                ? (isEditor
                    ? (
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
                    )
                    : <p>You need to be an editor to use this page</p>)
                : <p>You need to be logged in to use this page</p>}
        </Query>
    );
}

export function CreatePageField() {
    const q = useQueryState(false);

    const callback = (title: string, content: string, token: string) => {
        withQuery(
            () => trpc.pages.create.mutate({ token, title, content }),
            q,
            (id) => {
                location.href = `/page/view/${id}`;
            },
        );
    };
    return (
        <Query q={q}>
            <Common
                initialTitle="Default title"
                initialContent=""
                submitText="Create page"
                callback={callback}
            />
        </Query>
    );
}

export function EditPageField(props: { page: Page }) {
    const q = useQueryState(false);

    const callback = (title: string, content: string, token: string) => {
        withQuery(
            () =>
                trpc.pages.update.mutate({
                    token,
                    title,
                    content,
                    id: props.page.id,
                }),
            q,
            () => {
                location.href = `/page/view/${props.page.id}`;
            },
        );
    };

    return (
        <Query q={q}>
            <Common
                initialTitle={props.page.title}
                initialContent={props.page.content}
                submitText="Update page"
                callback={callback}
            />
        </Query>
    );
}
