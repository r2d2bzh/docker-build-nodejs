FROM gcr.io/distroless/cc-debian11@sha256:aa86ff4d07167d636f2dad015468d64a37bdcb4b7874a9582d3700fac9d9f542

ONBUILD COPY --from=builder /tmp/service /

ONBUILD ENTRYPOINT ["/service"]
