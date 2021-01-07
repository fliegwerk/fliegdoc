import { VariableDeclaration } from 'ts-morph';
import { processJsDocs } from './processJsDocs';

/**
 * Converts a `VariableDeclaration` to a documentation-ready representation.
 *
 * @param node - the variable declaration
 * @returns documentation-ready representation of the variable
 * @example
 * ```ts
 * processVariableDeclaration(node);
 * ```
 */
export function processVariableDeclaration(
	node: VariableDeclaration
): Record<string, unknown> {
	return {
		type: 'variable',
		name: node.getName(),
		declarations: [
			{
				...node.getVariableStatement()?.getStructure(),
				docs: processJsDocs(node.getVariableStatement()?.getJsDocs() ?? [])
			}
		]
	};
}
