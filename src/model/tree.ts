/**
 * A documentation-ready tree for a single module
 */
export type ModuleTree = (Record<string, unknown> & {
	name: string;
	declarations: ModuleTreeNode[];
})[];

/**
 * A node in a {@link ModuleTree}
 */
export type ModuleTreeNode<T = unknown> = {
	type: string;
	name: string;
	declarations: Array<T>;
	[key: string]: unknown;
};

/**
 * A documentation-ready tree for multiple modules
 */
export type Tree = {
	[moduleName: string]: ModuleTree;
};
