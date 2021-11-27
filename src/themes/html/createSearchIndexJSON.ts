import { Tree } from '../../model';
import { getSearchIndex } from './searchIndex';
import { getConfig } from '../../model/config';
import path from 'path';

/**
 * Creates a `search-index.json` for the given `tree`
 *
 * @param tree - the tree for which the index gets created.
 * @param createFile - the {@link CreateFileFunction}
 * @see {@link getSearchIndex}
 * @example
 * ```ts
 * await createSearchIndexJSON(tree, createFile);
 * ```
 */
export async function createSearchIndexJSON(
	tree: Tree,
	createFile: (path: string, content: Buffer, mimetype: string) => Promise<void>
): Promise<void> {
	const searchIndex = getSearchIndex(tree, getConfig());
	await createFile(
		path.join(getConfig().outDir, 'search-index.json'),
		Buffer.from(JSON.stringify(searchIndex)),
		'.json'
	);
}
