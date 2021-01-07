import * as path from 'path';

/**
 * A module/npm package
 *
 * Must include a package.json file with a unique `name`
 */
export interface Module {
	/**
	 * Absolute path to the module's package.json
	 */
	package: string;
	/**
	 * Absolute path to the tsconfig.json
	 */
	tsconfig: string;
	/**
	 * Relative path from the tsconfig `includes` to the module's main file, exporting all members
	 *
	 * @example `main.ts`
	 */
	mainFile: string;
}

/**
 * The configuration for running fliegdoc
 */
export interface FliegdocConfig {
	/**
	 * Project modules
	 */
	modules: Module[];
	/**
	 * Path to the root project's README.md
	 */
	readme: string;
	/**
	 * Path to the folder in which the documentation gets generated
	 */
	outDir: string;
	/**
	 * Base url of the domain to which the docs get deployed, including a trailing `/`
	 *
	 * **Default value:** `'/'`
	 */
	baseUrl: string;
	/**
	 * Title of the project, that gets printed in the header
	 */
	title: string;
	/**
	 * External navigation links for the header in a key-value-manner, where the key is the label and the value the link.
	 */
	externalLinks: Record<string, string>;
}

/**
 * The default config parameters.
 *
 * Uses a `README.md`, `package.json`, and `tsconfig.json` file in the cwd and `main.ts` in the sources configured
 * in the `tsconfig.json`
 */
export const DEFAULT_CONFIG: FliegdocConfig = {
	readme: path.join(process.cwd(), 'README.md'),
	modules: [
		{
			mainFile: 'main.ts',
			package: path.join(process.cwd(), 'package.json'),
			tsconfig: path.join(process.cwd(), 'tsconfig.json')
		}
	],
	outDir: path.resolve(process.cwd(), 'docs'),
	baseUrl: '/',
	title: 'Documentation',
	externalLinks: {}
};
