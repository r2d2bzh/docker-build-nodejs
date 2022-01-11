// This test sample ensures the support for the npm module named "config" (see the "pkg/assets" section in package.json)
const config = require('config');

setInterval(() => console.log(process.versions.node, config.get('message')), config.get('delay'));
