import { buildModuleTree } from './buildModuleTree';
import { DEFAULT_CONFIG, FliegdocConfig, Tree } from './model';

export function buildTreeForConfig(
	configOverrides?: Partial<FliegdocConfig>
): Tree {
	const finalConfig: FliegdocConfig = {
		...DEFAULT_CONFIG,
		...(configOverrides ?? {})
	};
	let tree: Tree = {};

	for (let module of finalConfig.modules) {
		const [moduleName, moduleTree] = buildModuleTree(module);
		tree = { ...tree };
		tree[moduleName] = moduleTree;
	}

	return tree;
}

export * from './config';
export * from './buildModuleTree';
export * from './model';
export * from './server';
export * from './builders';
