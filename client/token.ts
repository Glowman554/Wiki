import { useEffect, useState } from "preact/hooks";
import { trpc } from "../server/trpc/client.ts";
import { useQuery, withQuery } from "./helper.ts";

export function useToken() {
    const query = useQuery(async () => {
        const token = localStorage.getItem("token");
        if (token) {
            const ok = await trpc.users.test.query(token);
            if (ok) {
                return token;
            }
        }
        return undefined;
    });

    return query;
}

export function useIsEditor(
    token: string | undefined,
    setIsLoading: (l: boolean) => void,
    setError: (err: string) => void,
) {
    const [isEditor, setIsEditor] = useState(false);

    useEffect(() => {
        if (token) {
            withQuery(
                () => trpc.users.isEditor.query(token),
                setIsLoading,
                setError,
                setIsEditor,
            );
        }
    }, [token]);

    return isEditor;
}
