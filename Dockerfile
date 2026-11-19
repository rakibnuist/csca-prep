# CSCA Master — production image for the Hostinger VPS (Docker + Traefik).
# Built on the server by `deploy/deploy.sh`; context is the repo root.

FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat openssl fontconfig font-noto-cjk
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS builder
# native-module toolchain for bcryptjs/sharp fallbacks
RUN apk add --no-cache python3 make g++
# prisma is copied before install: `postinstall` runs `prisma generate`,
# which needs prisma/schema.prisma to exist.
COPY package.json package-lock.json ./
COPY prisma ./prisma
COPY prisma.config.ts ./
# placeholder — `prisma generate` never connects, but the config requires a url
ENV DATABASE_URL="postgresql://csca:placeholder@127.0.0.1:5432/cscamaster?schema=public"
RUN npm ci --include=dev --no-audit --no-fund

COPY . .

# NEXT_PUBLIC_* is inlined at build time — they must be build args, not runtime env.
ARG NEXT_PUBLIC_APP_URL="https://www.cscamaster.com"
# Search-engine ownership proofs. Next renders metadata at build time for the
# static marketing routes, so these must exist as build args — an env var on the
# running container would arrive too late.
ARG NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=""
ARG NEXT_PUBLIC_BING_SITE_VERIFICATION=""
ARG NEXT_PUBLIC_YANDEX_VERIFICATION=""
ARG NEXT_PUBLIC_SITE_NAME="CSCA Master"
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL \
    NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=$NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION \
    NEXT_PUBLIC_BING_SITE_VERIFICATION=$NEXT_PUBLIC_BING_SITE_VERIFICATION \
    NEXT_PUBLIC_YANDEX_VERIFICATION=$NEXT_PUBLIC_YANDEX_VERIFICATION \
    NEXT_PUBLIC_SITE_NAME=$NEXT_PUBLIC_SITE_NAME

# `next build` must not need a live database: pages degrade at build time.
RUN npx prisma generate && npm run build

FROM base AS runner
ENV NODE_ENV=production \
    PORT=3000

# Full dependency tree on purpose: prisma CLI + tsx are needed at runtime for
# `prisma db push` and `npm run db:seed` run through `docker compose exec`.
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
# prisma/seed.ts imports ../src/lib/site — needed for `npm run db:seed` via exec
COPY --from=builder /app/src ./src
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/tsconfig.json ./tsconfig.json

# Run Node as an unprivileged user while keeping /app and HOME writable for
# Next.js runtime caches and `docker compose exec` prisma/seed commands.
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs \
  && chown -R nextjs:nodejs /app

USER nextjs
ENV HOME=/tmp
EXPOSE 3000
CMD ["node", "node_modules/next/dist/bin/next", "start", "-p", "3000"]
