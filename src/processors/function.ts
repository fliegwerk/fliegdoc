import { FunctionDeclaration } from 'ts-morph';
import { processJsDocs } from './processJsDocs';

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
): Record<string, unknown> {
	// return signature.getDocumentationComments()
	return {
		type: 'function',
		name: node.getName(),
		declarations: [
			{
				...node.getStructure(),
				docs: processJsDocs(node.getJsDocs())
			}
		]
	};
}
