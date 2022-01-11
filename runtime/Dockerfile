FROM gcr.io/distroless/cc-debian11@sha256:2510b5f6a5ca842b863b298ef6b1e423b7b0f1a5343db5e94ffc1943d0e70098

ONBUILD COPY --from=builder /tmp/service /

ONBUILD ENTRYPOINT ["/service"]
