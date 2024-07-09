import { initTRPC } from "@trpc/server";
import { z } from "zod";
import {
    createToken,
    createUser,
    getUserByToken,
    passwordOk,
} from "../users.ts";
import {
    createPage,
    deletePage,
    getPage,
    getPages,
    getPageTitle,
    updatePage,
} from "../page.ts";
import { getChangelog, insertChange } from "../changelog.ts";
import superjson from "superjson";

const t = initTRPC.create({ transformer: superjson });

const usernameAndPassword = z.object({
    username: z.string(),
    password: z.string(),
});

async function editorOnly(token: string) {
    const user = await getUserByToken(token);
    if (!user || !user.editor) {
        throw new Error("Not allowed");
    }
    return user;
}

const users = t.router({
    test: t.procedure.input(z.string()).query(
        async ({ input }) => {
            const user = await getUserByToken(input);
            return user != null;
        },
    ),
    create: t.procedure.input(usernameAndPassword).mutation(
        async ({ input }) => {
            await createUser(input.username, input.password);
            return createToken(input.username);
        },
    ),
    login: t.procedure.input(usernameAndPassword).mutation(
        async ({ input }) => {
            const ok = await passwordOk(input.username, input.password);
            if (!ok) {
                throw new Error("Invalid password");
            }
            return createToken(input.username);
        },
    ),
    isEditor: t.procedure.input(z.string()).query(async ({ input }) => {
        const user = await getUserByToken(input);
        if (!user) {
            throw new Error("Invalid token");
        }
        return user.editor;
    }),
});

const pages = t.router({
    create: t.procedure.input(
        z.object({
            token: z.string(),
            title: z.string(),
            content: z.string(),
        }),
    ).mutation(async ({ input }) => {
        const user = await editorOnly(input.token);
        await insertChange(`'${input.title}' was created`, user.username);
        return createPage(user.username, input.title, input.content);
    }),
    update: t.procedure.input(
        z.object({
            token: z.string(),
            id: z.number().int(),
            title: z.string(),
            content: z.string(),
        }),
    ).mutation(async ({ input }) => {
        const user = await editorOnly(input.token);
        await insertChange(`'${input.title}' was updated`, user.username);
        await updatePage(input.title, input.content, input.id);
    }),
    delete: t.procedure.input(
        z.object({
            token: z.string(),
            id: z.number().int(),
        }),
    ).mutation(async ({ input }) => {
        const user = await editorOnly(input.token);
        await insertChange(
            `'${await getPageTitle(input.id)}' was deleted`,
            user.username,
        );
        await deletePage(input.id);
    }),
    list: t.procedure.query(() => {
        return getPages();
    }),
    load: t.procedure.input(z.number().int()).query(({ input }) => {
        return getPage(input);
    }),
});

const changelog = t.router({
    load: t.procedure.input(z.number().int().max(25)).query(
        ({ input }) => {
            return getChangelog(input);
        },
    ),
});

export const appRouter = t.router({
    hello: t.procedure.input(z.string().nullish()).query(({ input }) => {
        return `hello ${input ?? "world"}`;
    }),
    users,
    pages,
    changelog,
});

export type AppRouter = typeof appRouter;
