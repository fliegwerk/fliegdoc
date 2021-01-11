import { VariableDeclaration } from 'ts-morph';
import { processJsDocs } from './helpers/processJsDocs';
import { ModuleTreeNode } from '../model';

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
): ModuleTreeNode {
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
