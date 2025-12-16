FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS dependencies
WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS build
WORKDIR /usr/src/app
COPY . .
COPY --from=dependencies /usr/src/app/node_modules ./node_modules

FROM base AS deploy
WORKDIR /usr/src/app
ENV NODE_ENV=production
COPY --from=build /usr/src/app ./

EXPOSE 3340
CMD ["pnpm", "start"]
