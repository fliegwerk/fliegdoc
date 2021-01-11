import { NamespaceDeclaration } from 'ts-morph';
import { processNode } from './init';
import { processJsDocs } from './helpers/processJsDocs';
import { ModuleTreeNode } from '../model';

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
): ModuleTreeNode<ModuleTreeNode> {
	if (node.hasNamespaceKeyword()) {
		const res: ModuleTreeNode<ModuleTreeNode<unknown>> = {
			name: node.getName(),
			docs: processJsDocs(node.getJsDocs()),
			type: 'namespace',
			declarations: []
		};
		for (const [, declarations] of node.getExportedDeclarations()) {
			res.declarations.push(...declarations.map(processNode));
		}
		return res;
	}
	// TODO: Module type
	return { type: 'module', name: node.getName(), declarations: [] };
}
