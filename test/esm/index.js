import getStream from 'get-stream';
import intoStream from 'into-stream';

try {
  process.exitCode = 1;
  getStream(intoStream(process.version))
    .then((version) => {
      console.log(version);
      if (version === process.version) {
        process.exitCode = 0;
      }
    });
} catch (error) {
  console.error(error);
  process.exitCode = 1;
}
