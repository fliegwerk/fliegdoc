/**
 * A documentation-ready tree for a single module
 */
export type ModuleTree = (Record<string, unknown> & { name: string })[];

/**
 * A documentation-ready tree for multiple modules
 */
export type Tree = {
	[moduleName: string]: ModuleTree;
};
