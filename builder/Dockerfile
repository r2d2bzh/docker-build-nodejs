ARG NODE_JS_VERSION

FROM node:${NODE_JS_VERSION}-bookworm-slim as pkg

ARG NODE_JS_VERSION
ARG NODE=node${NODE_JS_VERSION}

RUN adduser --disabled-password --gecos user user
USER user

ENV NODE=$NODE

COPY --chown=user ./bundle/ /bundle/
COPY --chown=user --chmod=755 ./build.sh /
WORKDIR /bundle

RUN npm ci --omit=dev

WORKDIR /project
