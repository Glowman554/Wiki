import { useEffect, useState } from "preact/hooks";
import { trpc } from "../server/trpc/client.ts";
import { QueryState, useQuery, withQuery } from "./helper.ts";

export function useToken(q: QueryState) {
    const query = useQuery(async () => {
        const token = localStorage.getItem("token");
        if (token) {
            const ok = await trpc.users.test.query(token);
            if (ok) {
                return token;
            }
        }
        return undefined;
    }, q);

    return query;
}
export function useIsEditor(
    token: string | undefined,
    q: QueryState,
) {
    const [isEditor, setIsEditor] = useState(false);

    useEffect(() => {
        if (token) {
            withQuery(
                () => trpc.users.isEditor.query(token),
                q,
                setIsEditor,
            );
        }
    }, [token]);

    return isEditor;
}
