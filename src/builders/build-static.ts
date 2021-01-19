import * as fs from 'fs';
import * as fsp from 'fs-extra';
import * as path from 'path';
import { Tree } from '../model';
import { getConfig } from '../model/config';

/**
 * Builds the static documentation from `tree` to the config's `outDir`.
 *
 * @param tree - the documentation tree
 * @example
 * ```ts
 * import { buildTreeForConfig, buildStatic } from 'fliegdoc';
 *
 * const tree = buildTreeForConfig();
 * await buildStatic(tree);
 * ```
 */
export async function buildStatic(tree: Tree): Promise<void> {
	const config = getConfig();

	await config.theme.onBuild(tree, config, async (name, content) => {
		if (!fs.existsSync(path.dirname(name))) {
			await fsp.mkdir(path.dirname(name), { recursive: true });
		}
		await fsp.writeFile(name, Buffer.from(new Uint8Array(await content)));
	});
}
