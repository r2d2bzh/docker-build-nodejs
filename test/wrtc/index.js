// This test sample ensures the support for native modules (see the additional "COPY" in Dockerfile)
const Peer = require('simple-peer');
const wrtc = require('wrtc');

const peer1 = new Peer({initiator: true, wrtc});
const peer2 = new Peer({wrtc});

peer1.on('signal', data => peer2.signal(data));
peer2.on('signal', data => peer1.signal(data));
peer1.on('connect', () => peer1.send('hey peer2, how is it going?'));
peer2.on('data', data => console.log('got a message from peer1: ' + data));

setInterval(() => console.log(process.versions.node), 2000);
