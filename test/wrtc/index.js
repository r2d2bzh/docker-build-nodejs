// This test sample ensures the support for native modules
try {
  const Peer = require('simple-peer');
  const wrtc = require('wrtc');

  const peer1 = new Peer({initiator: true, wrtc});
  const peer2 = new Peer({wrtc});
  const message = 'hey peer2, how is it going?';

  process.on('exit', (code) => {
    // this is a workaround for an odd exit code behavior
    process.exit(code);
  });

  process.exitCode = 1;
  peer1.on('signal', data => peer2.signal(data));
  peer2.on('signal', data => peer1.signal(data));
  peer1.on('connect', () => peer1.send(message));
  peer2.on('data', data => {
    console.log('peer2 got a message from peer1: ' + data);
    if (data.toString() === message) {
      process.exitCode = 0;
    } else {
      console.log('message mismatch');
    }
    peer1.destroy();
    peer2.destroy();
  });
  peer1.on('close', () => console.log('peer1 closed'));
  peer2.on('close', () => console.log('peer2 closed'));
} catch (error) {
  console.error(error);
  process.exitCode = 1;
}
