ARG NODE_JS_VERSION
ARG PKG_NODE=node${NODE_JS_VERSION}
ARG PKG_OS=linux
ARG PKG_ARCH=x64


FROM node:${NODE_JS_VERSION}-bullseye-slim as pkg

ARG NPM_VERSION
ARG PKG_NODE
ARG PKG_OS
ARG PKG_ARCH

RUN npm install -g npm@${NPM_VERSION} && npm version
RUN npm install --unsafe-perm=true -g pkg@5.6.0

RUN adduser --disabled-password --gecos user user
USER user

# The following tests the pkg process and ensures that the user pkg cache is pre-loaded
RUN \
    touch /tmp/index.js && \
    pkg -d -t "${PKG_NODE}-${PKG_OS}-${PKG_ARCH}" -o /tmp/dumb /tmp/index.js && \
    rm /tmp/index.js /tmp/dumb


FROM pkg as check

ARG NODE_JS_VERSION
ARG PKG_NODE
ARG PKG_OS
ARG PKG_ARCH

COPY check-nodejs-version.js /tmp
RUN pkg -d -t "${PKG_NODE}-${PKG_OS}-${PKG_ARCH}" -o /tmp/check-nodejs-version /tmp/check-nodejs-version.js

ENV NODE_JS_VERSION=${NODE_JS_VERSION}
RUN /tmp/check-nodejs-version


FROM pkg

ARG PKG_NODE
ARG PKG_OS
ARG PKG_ARCH
ENV PKG_NODE=${PKG_NODE}
ENV PKG_OS=${PKG_OS}
ENV PKG_ARCH=${PKG_ARCH}

COPY --chown=user ./bundle/ /bundle/
WORKDIR /bundle
RUN \
    npm init -y && \
    npm install esbuild@0.14.32 read-package-json-fast@2.0.3

ONBUILD ARG main=index.js
ONBUILD ARG PKG_TARGET="${PKG_NODE}-${PKG_OS}-${PKG_ARCH}"
ONBUILD ARG PKG_OPTIONS="-o /tmp/service"
ONBUILD ENV main=${main}
ONBUILD ENV PKG_TARGET=${PKG_TARGET}
ONBUILD ENV PKG_OPTIONS=${PKG_OPTIONS}

ONBUILD COPY --chown=user --from=share ["/", "/project/"]
ONBUILD COPY --chown=user . /project
ONBUILD WORKDIR /project
ONBUILD RUN \
    npm ci --production && \
    BUNDLE="$(mktemp -p /project bundle-XXXXXXXXXXXX.js)" && \
    node /bundle "${PKG_NODE}" "${main}" "${BUNDLE}" && \
    echo "pkg options: -t ${PKG_TARGET} ${PKG_OPTIONS}" && \
    pkg -t ${PKG_TARGET} ${PKG_OPTIONS} "${BUNDLE}"
