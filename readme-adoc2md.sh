#!/usr/bin/env bash
REPODIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
docker run -it -u "$(id -u):$(id -g)" -v "$REPODIR:/documents/" asciidoctor/docker-asciidoctor asciidoctor -b docbook readme-source.adoc -o - | docker run -i -u "$(id -u):$(id -g)" -v "$REPODIR:/data/" pandoc/core -f docbook -t gfm -s --wrap=none -o README.md
