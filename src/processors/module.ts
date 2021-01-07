import { NamespaceDeclaration } from 'ts-morph';
import { processNode } from './init';

/**
 * Converts a `NamespaceDeclaration` to a documentation-ready representation.
 *
 * @param node - the namespace or module declaration
 * @returns documentation-ready representation of the namespace or module
 * @example
 * ```ts
 * processModule(node);
 * ```
 */
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
	// TODO: Module type
	return { type: 'module' };
}
