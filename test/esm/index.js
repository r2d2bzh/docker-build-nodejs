import getStream from 'get-stream';
import intoStream from 'into-stream';

const test = async () => console.log(await getStream(intoStream(process.version)));

setInterval(test, 1e3);
