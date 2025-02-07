import {
    create,
    ErrorMode,
    set_logger,
} from "https://deno.land/x/simple_router@0.8/mod.ts";
import { serve } from "https://deno.land/std@0.152.0/http/mod.ts";
import { init_routes } from "./routes.ts";

function main() {
    set_logger({
        logger: console.log,
    });

    const { router, reqHandler } = create(ErrorMode.ERROR_JSON);
    init_routes(router);

    serve(reqHandler, {
        port: 8080,
        onListen: (params) => {
            console.log("Listening on " + params.hostname + ":" + params.port);
        },
    });
}

main();
