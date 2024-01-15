FROM ghcr.io/r2d2bzh/docker-build-nodejs-builder:dev as builder
COPY --chown=user . /project
RUN /build.sh
FROM ghcr.io/r2d2bzh/docker-build-nodejs-runtime:dev
COPY --chown=user --from=builder /tmp/service /service
COPY --chown=user --from=builder /project/node_modules/wrtc ./node_modules/wrtc
ENTRYPOINT [ "/service" ]