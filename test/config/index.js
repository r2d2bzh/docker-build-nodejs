// This test sample ensures the support for the npm module named "config" (see the "pkg/assets" section in package.json)
try {
  const config = require('config');
  console.log(process.versions.node, config.get('message'));
} catch (error) {
  console.error(error);
  process.exitCode = 1;
}
