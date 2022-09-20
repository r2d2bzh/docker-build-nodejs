FROM gcr.io/distroless/cc-debian11@sha256:15bc3c6acbe16bf3dc37db543dfa632dabf3869ccd123257e9bee965989c976e

ONBUILD COPY --from=builder /tmp/service /

ONBUILD ENTRYPOINT ["/service"]
