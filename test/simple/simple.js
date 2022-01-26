// This test sample ensures that external resources can be reached
try {
	const path = require('path');
	const {readFileSync} = require('fs');
	const label = readFileSync(path.join(__dirname, 'resources/label.txt'));
	console.log(process.versions.node, label.toString());
} catch (error) {
  console.error(error);
  process.exitCode = 1;
}
