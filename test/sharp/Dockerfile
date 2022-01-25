FROM ghcr.io/r2d2bzh/docker-build-nodejs-builder:dev as builder
FROM ghcr.io/r2d2bzh/docker-build-nodejs-runtime:dev
COPY --from=builder /project/node_modules/sharp/ ./node_modules/sharp/
