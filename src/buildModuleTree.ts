import { Module, ModuleTree } from './model';
import { Project } from 'ts-morph';
import fs from 'fs';
import { processNode } from './processors/init';

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

	const indexFile = project.getSourceFileOrThrow(module.mainFile);

	const exportedDeclarations = indexFile.getExportedDeclarations();

	for (const [name, declarations] of exportedDeclarations) {
		moduleTree.push({
			name: `${name}`,
			declarations: declarations.map(processNode)
		});
	}
	return [moduleName, moduleTree];
}
