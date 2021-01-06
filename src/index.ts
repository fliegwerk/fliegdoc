import { Project } from 'ts-morph';
import { CONFIG } from './config';
import { processNode } from './processors/init';
import * as fs from 'fs';
import { serveStatic } from './server';
import { buildStatic } from './builders/build-static';

const tree: any = {};

for (let module of CONFIG.modules) {
	const project = new Project({
		tsConfigFilePath: module.tsconfig
	});

	const { name: moduleName } = JSON.parse(
		fs.readFileSync(module.package).toString()
	);
	console.info(
		'Processing module',
		moduleName,
		'(',
		CONFIG.modules.indexOf(module) + 1,
		'/',
		CONFIG.modules.length,
		')'
	);

	tree[moduleName] = [];

	const indexFile = project.getSourceFileOrThrow(module.mainFile);

	const exportedDeclarations = indexFile.getExportedDeclarations();

	for (const [name, declarations] of exportedDeclarations) {
		tree[moduleName].push({
			name: `${name}`,
			declarations: declarations.map(processNode)
		});
	}
}

console.info('Done. Results:');

console.log(tree);

buildStatic(tree).then(() => {
	serveStatic();
});
