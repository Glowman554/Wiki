FROM denoland/deno:1.44.4

WORKDIR /srv
COPY . .

RUN deno task build
ENTRYPOINT [ "deno", "run", "-A", "main.ts" ]