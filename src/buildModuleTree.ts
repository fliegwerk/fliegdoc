import { Module, ModuleTree } from './model';
import { Project } from 'ts-morph';
import fs from 'fs';
import { processNode } from './processors/init';

/**
 * Generates a {@link ModuleTree} for the passed
 *
 * @param module - the module configuration for which the tree should get generated
 * @returns module name and {@link ModuleTree}
 * @example
 * ```ts
 * import { buildModuleTree } from 'fliegdoc';
 *
 * buildModuleTree({
 * 	tsconfig,
 * 	package,
 * 	mainFile
 * });
 * ```
 */
export function buildModuleTree(
	module: Module
): [moduleName: string, moduleTree: ModuleTree] {
	const moduleTree: ModuleTree = [];

	const project = new Project({
		tsConfigFilePath: module.tsconfig
	});

	const { name: moduleName } = JSON.parse(
		fs.readFileSync(module.package).toString()
	);

	/* Getting the source file for the main file. */
	const indexFile = project.getSourceFileOrThrow(module.mainFile);

	/* Getting all the exported declarations from the index file. */
	const exportedDeclarations = indexFile.getExportedDeclarations();

	/* Iterating over the exported declarations and extracting the name and the declarations. */
	for (const [name, declarations] of exportedDeclarations) {
		moduleTree.push({
			name: `${name}`,
			declarations: declarations.map(processNode)
		});
	}
	return [moduleName, moduleTree];
}
