import * as path from 'path';
import { FliegdocConfig } from './model';

/**
 * Resolves relative paths for config overrides
 *
 * @param overrides - configuration overrides
 * @param basePath - the base path of the config file, from which relative paths get resolved
 * @returns `overrides` with converted relative paths
 * @example
 * ```ts
 * import { parseOverrides } from 'fliegdoc';
 *
 * const config = JSON.parse(
 * 	fs.readFileSync(filepath).toString()
 * )
 *
 * const configOverrides = parseOverrides(config, path.dirname(filepath));
 * ```
 */
export function parseOverrides(
	overrides: Partial<FliegdocConfig> = {},
	basePath: string = process.cwd()
): Partial<FliegdocConfig> {
	const result: Partial<FliegdocConfig> = {};

	if (overrides.outDir)
		result.outDir = path.resolve(basePath, overrides.outDir);
	if (overrides.readme)
		result.readme = path.resolve(basePath, overrides.readme);
	if (overrides.baseUrl) result.baseUrl = overrides.baseUrl;

	if (overrides.modules)
		result.modules = overrides.modules.map(raw => ({
			...raw,
			tsconfig: path.resolve(basePath, raw.tsconfig),
			package: path.resolve(basePath, raw.package)
		}));

	return result;
}
