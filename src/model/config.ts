import * as path from 'path';
import { DEFAULT_CONFIG, FliegdocConfig } from './index';

let CONFIG: FliegdocConfig;

setConfig(DEFAULT_CONFIG);

/**
 * Returns the current config
 *
 * @returns current config
 *
 * @see {@link setConfig}
 *
 * @example
 * ```ts
 * import { getConfig } from 'fliegdoc';
 *
 * console.log('current config:', getConfig());
 * ```
 */
export function getConfig(): FliegdocConfig {
	return CONFIG;
}

/**
 * Overrides the current config using the `config` on top of the {@link DEFAULT_CONFIG}
 *
 * @param config - overrides of the {@link DEFAULT_CONFIG}
 * @param basePath - the base path of the config file, from which relative paths get resolved
 * @example
 * ```ts
 * import { setConfig } from 'fliegdoc';
 *
 * const config = JSON.parse(
 * 	fs.readFileSync(filepath).toString()
 * )
 *
 * setConfig(config, path.dirname(filepath));
 * ```
 */
export function setConfig(
	config: Partial<FliegdocConfig>,
	basePath: string = process.cwd()
): void {
	CONFIG = { ...DEFAULT_CONFIG, ...config };

	CONFIG.outDir = path.resolve(basePath, CONFIG.outDir);
	CONFIG.readme = path.resolve(basePath, CONFIG.readme);

	if (CONFIG.modules)
		CONFIG.modules = CONFIG.modules.map(raw => ({
			...raw,
			tsconfig: path.resolve(basePath, raw.tsconfig),
			package: path.resolve(basePath, raw.package)
		}));
}
