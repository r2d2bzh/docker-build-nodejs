// This test sample ensures that the service is not started as root
const uid = process.getuid();
console.log(process.versions.node, `uid=${uid}`);
if (uid === 0) {
  console.error('the service must not run as root');
  process.exitCode = 1;
}
