const readPackage = require('read-package-json-fast');
const { externalNativeModulesPlugin } = require('./native_modules/plugin');

const [target, main, outfile] = process.argv.slice(2);

const bundle = async () => {
	try {
		const package = await readPackage('package.json');
		const externalizedModules = new Set();

		await require('esbuild').build({
			entryPoints: [main],
			bundle: true,
			sourcemap: 'inline',
			platform: 'node',
			target,
			plugins: [externalNativeModulesPlugin(externalizedModules)],
			outfile,
			...(package.esbuildOptions ? package.esbuildOptions : {}),
		})

		for (const module of externalizedModules) {
			console.warn(`module ${module} is external`);
		}
	} catch (e) {
		console.error(`esbuild failed to build ${outfile} from ${main}: ${e.message ? e.message : e}`);
		process.exit(1);
	}
};

bundle();
