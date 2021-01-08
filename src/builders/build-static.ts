import * as fs from 'fs/promises';
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
		if (!(await fs.lstat(path.dirname(name))).isDirectory()) {
			await fs.mkdir(path.dirname(name), { recursive: true });
		}
		await fs.writeFile(name, Buffer.from(new Uint8Array(await content)));
	});
}
