FROM node:20.15.1-alpine

WORKDIR /workspaces

RUN chown -R node:node /workspaces

COPY ./package.json ./pnpm-lock.yaml ./

RUN corepack enable pnpm

USER node

RUN pnpm install --ignore-scripts

COPY . .

RUN pnpm prisma generate

EXPOSE 3000

CMD ["pnpm", "dev"]
