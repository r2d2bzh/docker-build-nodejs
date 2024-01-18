import { Readable } from 'node:stream';
import hasha from 'hasha';
import { createRequire } from 'node:module';

try {
  const customRequire = createRequire(__filename);

  const sharp = customRequire('./node_modules/sharp/lib/index.js');

  const roundedCorners = Buffer.from(
    '<svg><rect x="0" y="0" width="200" height="200" rx="50" ry="50"/></svg>'
  );

  Readable.from(roundedCorners)
    .pipe(sharp().resize(200, 200).png())
    .pipe(hasha.stream())
    .on('finish', () => console.log('sharp test ended'))
    .on('error', (error) => {
      console.error(error);
      process.exitCode = 1;
    });
} catch (error) {
  console.error(error);
  process.exitCode = 1;
}
