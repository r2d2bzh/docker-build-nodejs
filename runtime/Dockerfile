FROM gcr.io/distroless/cc-debian11@sha256:0090fc97e9cbc060fb5eb1bcee153997942096f51006bef2200233d762b2bb0e

ONBUILD COPY --from=builder /tmp/service /

ONBUILD ENTRYPOINT ["/service"]
