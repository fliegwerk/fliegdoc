import { FunctionDeclaration } from 'ts-morph';
import { processJsDocs } from './helpers/processJsDocs';
import { ModuleTreeNode } from '../model';

/**
 * Converts a `FunctionDeclaration` to a documentation-ready representation.
 *
 * @param node - the function declaration
 * @returns documentation-ready representation of the function
 * @example
 * ```ts
 * processFunctionDeclaration(node);
 * ```
 */
export function processFunctionDeclaration(
	node: FunctionDeclaration
): ModuleTreeNode {
	// return signature.getDocumentationComments()
	return {
		type: 'function',
		name: node.getName() || '[[unnamedFunction]]',
		declarations: [
			{
				...node.getStructure(),
				docs: processJsDocs(node.getJsDocs())
			}
		]
	};
}
