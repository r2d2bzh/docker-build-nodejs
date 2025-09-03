FROM ghcr.io/r2d2bzh/docker-build-nodejs-builder:dev AS builder
COPY --chown=user . /project
RUN /build.sh
FROM ghcr.io/r2d2bzh/docker-build-nodejs-runtime:dev
COPY --chown=user --from=builder /tmp/service /service
ENTRYPOINT [ "/service" ]
