import { buildModuleTree } from './buildModuleTree';
import { Tree } from './model';
import { getConfig } from './model/config';

/**
 * Builds a {@link Tree} for {@link getConfig}.
 *
 * You can set the config beforehand using {@link setConfig}.
 *
 * @returns the generated documentation-ready {@link Tree}
 * @example
 * ```ts
 * import { buildTreeForConfig, setConfig } from 'fliegdoc';
 *
 * setConfig(config);
 * const tree = buildTreeForConfig();
 * ```
 */
export function buildTreeForConfig(): Tree {
	let tree: Tree = {};

	for (const module of getConfig().modules) {
		const [moduleName, moduleTree] = buildModuleTree(module);
		tree = { ...tree };
		tree[moduleName] = moduleTree;
	}

	return tree;
}

export * from './model/config';
export * from './buildModuleTree';
export * from './model';
export * from './server';
export * from './builders';
