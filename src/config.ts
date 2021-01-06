import * as path from 'path';
import { FliegdocConfig } from './model';

/**
 * Resolves relative paths for config overrides
 * @param overrides
 * @param basePath
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

	if (overrides.modules)
		result.modules = overrides.modules.map(raw => ({
			...raw,
			tsconfig: path.resolve(basePath, raw.tsconfig),
			package: path.resolve(basePath, raw.package)
		}));

	return result;
}
