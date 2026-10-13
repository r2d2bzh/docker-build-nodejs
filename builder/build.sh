#! /bin/sh

set -eu

npm ci --omit=dev

main=$(node -p 'require("./package.json").main ?? ""')
if [ -z "$main" ]; then
    echo 'build.sh: the "main" field of package.json is required to locate the application entry point' >&2
    exit 1
fi

node /bundle "${NODE}" "$main" bundle.js
node --build-sea /bundle/sea-config.json
