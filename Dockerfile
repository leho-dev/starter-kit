FROM node:20.15.1-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat python3 make g++ gcc
WORKDIR /app

COPY prisma/ /app/prisma/
COPY package.json pnpm-lock.yaml* ./
RUN \
  corepack enable pnpm && pnpm i

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN \
  corepack enable pnpm && pnpm add sharp && pnpm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NODE_OPTIONS="--network-family-autoselection-attempt-timeout=500"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000 HOSTNAME=0.0.0.0

CMD ["node", "server.js"]