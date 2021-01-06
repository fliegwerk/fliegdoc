export type ModuleTree = { name: string; [key: string]: any }[];

export interface Tree {
	[moduleName: string]: ModuleTree;
}
