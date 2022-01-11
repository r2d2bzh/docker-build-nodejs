// This test sample ensures that external resources can be reached
const path = require('path');
const {readFileSync} = require('fs');

const label = readFileSync(path.join(__dirname, 'resources/label.txt'));

setInterval(() => console.log(process.versions.node, label.toString()), 2000);
