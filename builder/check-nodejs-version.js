console.log(`Targetted NodeJS version: ${process.env.NODE_JS_VERSION}`);
console.log(`NodeJS version used by pkg: ${process.versions.node}`);
process.exit(process.env.NODE_JS_VERSION == process.versions.node ? 0 : 1);
