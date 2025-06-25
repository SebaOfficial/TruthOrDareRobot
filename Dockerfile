FROM node:24-slim AS base
WORKDIR /bot
COPY package.json .
COPY pnpm-lock.yaml .
COPY prisma ./prisma
ENV NODE_ENV="production" \
	PORT=3000 \
	DB_URL="file:./db/prod.db"
RUN corepack enable && corepack prepare pnpm@10.12.1 --activate
RUN apt-get update -y && apt-get install -y openssl

FROM base AS build
COPY . .
ENV NODE_ENV="building"
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm build

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base
EXPOSE 3000
COPY data /bot/data
COPY --from=prod-deps /bot/node_modules /bot/node_modules
COPY --from=build /bot/build /bot/build
CMD ["pnpm", "start"]
