import readPackage from 'read-package-json-fast';
import esbuild from 'esbuild';

import { externalNativeModulesPlugin } from './native_modules/plugin.js';


const [target, main, outfile] = process.argv.slice(2);

const bundle = async () => {
	try {
		const packageJson = await readPackage('package.json');
		const externalizedModules = {};

		await esbuild.build({
			entryPoints: [main],
			bundle: true,
			sourcemap: 'inline',
			platform: 'node',
			target,
			plugins: [externalNativeModulesPlugin(externalizedModules)],
			outfile,
			...(packageJson.esbuildOptions ? packageJson.esbuildOptions : {}),
		})

		const externalizedList = Object.entries(externalizedModules);
		if (externalizedList.length > 0) {
			console.warn('______________________________________________________________________________________________');
			// tag::external-warning[]
			console.warn('/!\\ Some node modules were automatically externalized');
			console.warn('If one of these modules can still NOT be loaded:');
			console.warn(' - add the module name in your package.json file under { esbuildOptions: { external: [...] } }');
			console.warn(' - add the module COPY line provided in the following list at the end of your Dockerfile');
			// end::external-warning[]
			console.warn('______________________________________________________________________________________________');
			Object.entries(externalizedModules).forEach(([name, locations]) => {
				console.warn(`${name}:`)
				Object.entries(locations).forEach(
					([location, version]) => console.warn(
						` - ${version}: COPY --from=builder ${location}/ ./${location.split('/').slice(1).join('/')}/`
					)
				);
			});
			console.warn('______________________________________________________________________________________________');
		}
	} catch (e) {
		console.error(`esbuild failed to build ${outfile} from ${main}: ${e.message ? e.message : e}`);
		process.exit(1);
	}
};

bundle();
