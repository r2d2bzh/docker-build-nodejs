# Node.js >= 26 official binaries depend on libatomic.so.1 which is not part of distroless cc.
# The library is extracted from the matching Debian release, along with its dpkg status
# so that image scanners keep tracking it, the same way distroless does for its own packages.
FROM debian:trixie-slim@sha256:a29215f6a35e51e22adffa17f89e9d2ef06214e64a2bad10d765c46aea49f11f AS libs

RUN apt-get update && \
    cd /tmp && apt-get download libatomic1 && \
    mkdir -p /out/var/lib/dpkg/status.d && \
    dpkg-deb --extract libatomic1_*.deb /out && \
    dpkg-deb --field libatomic1_*.deb > /out/var/lib/dpkg/status.d/libatomic1 && \
    rm -rf /out/usr/share /var/lib/apt/lists/*

FROM gcr.io/distroless/cc-debian13:nonroot@sha256:e792ab3d241a468a4fd7519ddbbebe66b49b5f365771716ea688ad40b6c6f1c2

COPY --from=libs /out/ /

# Keep the previous working directory so that relative COPY instructions of existing services still work
WORKDIR /
USER nonroot
