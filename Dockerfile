# BUILDER
FROM 967561843261.dkr.ecr.ap-southeast-1.amazonaws.com/node:16-alpine AS base

FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update

# Set working directory
WORKDIR /app
ARG BUILD_WORKSPACE
ARG BUILD_PACKAGE

RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=$BUILD_PACKAGE --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app
ARG BUILD_WORKSPACE
ARG BUILD_PACKAGE

# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install

# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN yarn turbo run build --filter=$BUILD_PACKAGE

FROM 967561843261.dkr.ecr.ap-southeast-1.amazonaws.com/node:16-alpine AS runner

WORKDIR /app
ARG BUILD_WORKSPACE
ARG BUILD_PACKAGE

COPY --from=installer /app/$BUILD_WORKSPACE/$BUILD_PACKAGE/next.config.mjs .
COPY --from=installer /app/$BUILD_WORKSPACE/$BUILD_PACKAGE/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer /app/$BUILD_WORKSPACE/$BUILD_PACKAGE/.next/standalone ./
COPY --from=installer /app/$BUILD_WORKSPACE/$BUILD_PACKAGE/.next/static ./$BUILD_WORKSPACE/$BUILD_PACKAGE/.next/static
COPY --from=installer /app/$BUILD_WORKSPACE/$BUILD_PACKAGE/public ./$BUILD_WORKSPACE/$BUILD_PACKAGE/public
COPY --from=installer /app/$BUILD_WORKSPACE/$BUILD_PACKAGE/start.sh ./start.sh

ENV PORT 80

EXPOSE 80

CMD ["/bin/sh","/app/start.sh"]
