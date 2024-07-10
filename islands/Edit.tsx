import { useState } from "preact/hooks";
import { useIsEditor, useToken } from "../client/token.ts";
import { useInput, withQuery } from "../client/helper.ts";
import { trpc } from "../server/trpc/client.ts";
import { Page } from "../server/page.ts";
import { Query } from "./Query.tsx";

function Common(props: {
    initialTitle: string;
    initialContent: string;
    submitText: string;
    callback: (title: string, content: string, token: string) => void;
}) {
    const { result: token, setIsLoading, setError, error, isLoading } =
        useToken();
    const [title, setTitle] = useInput(props.initialTitle);
    const [content, setContent] = useInput(props.initialContent);
    const isEditor = useIsEditor(token, setIsLoading, setError);

    return (
        <Query error={error} isLoading={isLoading}>
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

export function CreateField() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);

    const callback = (title: string, content: string, token: string) => {
        withQuery(
            () => trpc.pages.create.mutate({ token, title, content }),
            setIsLoading,
            setError,
            (id) => {
                location.href = `/page/view/${id}`;
            },
        );
    };
    return (
        <Query error={error} isLoading={isLoading}>
            <Common
                initialTitle="Default title"
                initialContent=""
                submitText="Create page"
                callback={callback}
            />
        </Query>
    );
}

export function EditField(props: { page: Page }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);

    const callback = (title: string, content: string, token: string) => {
        withQuery(
            () =>
                trpc.pages.update.mutate({
                    token,
                    title,
                    content,
                    id: props.page.id,
                }),
            setIsLoading,
            setError,
            () => {
                location.href = `/page/view/${props.page.id}`;
            },
        );
    };

    return (
        <Query error={error} isLoading={isLoading}>
            <Common
                initialTitle={props.page.title}
                initialContent={props.page.content}
                submitText="Update page"
                callback={callback}
            />
        </Query>
    );
}
