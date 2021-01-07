export type ModuleTree = (Record<string, unknown> & { name: string })[];

export interface Tree {
	[moduleName: string]: ModuleTree;
}
