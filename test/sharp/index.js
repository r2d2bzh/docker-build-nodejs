const { Readable } = require('stream');
const { Transform } = require('stream');
const sharp = require('sharp');
const hasha = require('hasha');

const roundedCorners = Buffer.from(
  '<svg><rect x="0" y="0" width="200" height="200" rx="50" ry="50"/></svg>'
);

const testSharp = () =>
  Readable.from(roundedCorners)
    .pipe(sharp().resize(200, 200).png())
    .pipe(hasha.stream())
    .pipe(new Transform({
      transform(chunk, encoding, callback) {
        callback(undefined, chunk + '\n');
      }
    }))
    .pipe(process.stdout);

setInterval(testSharp, 1e3);
