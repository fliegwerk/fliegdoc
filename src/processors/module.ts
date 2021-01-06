import { NamespaceDeclaration } from 'ts-morph';
import { processNode } from './init';

export function processModule(node: NamespaceDeclaration) {
	// node.print()
	if (node.hasNamespaceKeyword()) {
		const res: any = {
			name: node.getName(),
			type: 'namespace',
			exportedMembers: []
		};
		for (let [name, declarations] of node.getExportedDeclarations()) {
			res.exportedMembers.push({
				name,
				declarations: declarations.map(processNode)
			});
		}
		return res;
	}
}
