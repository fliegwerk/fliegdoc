import { NamespaceDeclaration } from 'ts-morph';
import { processNode } from './init';

export function processModule(
	node: NamespaceDeclaration
): Record<string, unknown> {
	if (node.hasNamespaceKeyword()) {
		const res: Record<string, unknown> & { exportedMembers: unknown[] } = {
			name: node.getName(),
			type: 'namespace',
			exportedMembers: []
		};
		for (const [name, declarations] of node.getExportedDeclarations()) {
			res.exportedMembers.push({
				name,
				declarations: declarations.map(processNode)
			});
		}
		return res;
	}
	return { type: 'module' };
}
