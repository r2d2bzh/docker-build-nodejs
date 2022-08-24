FROM gcr.io/distroless/cc-debian11@sha256:91b75baf2642f145c38d8c83153a46e5eca32be4777c51593bb533d9c1302c54

ONBUILD COPY --from=builder /tmp/service /

ONBUILD ENTRYPOINT ["/service"]
