#! /bin/sh

npm ci --omit=dev

main=`node -e 'console.log(require("./package.json").main)'`

node /bundle ${NODE} $main "bundle.js"
node --experimental-sea-config /bundle/sea-config.json
cp $(command -v node) /tmp/service
npx postject@1.0.0-alpha.6 /tmp/service NODE_SEA_BLOB service.blob \
    --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2