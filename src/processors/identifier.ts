import { Identifier } from 'ts-morph';
import { processNode } from './init';
import { ModuleTreeNode } from '../model';

/**
 * Converts an `Identifier` to a documentation-ready representation.
 *
 * @param node - the identifier declaration
 * @returns documentation-ready representation of the identifier
 * @example
 * ```ts
 * processIdentifier(node);
 * ```
 */
export function processIdentifier(
	node: Identifier
): ModuleTreeNode<ModuleTreeNode<unknown>> {
	return {
		type: 'identifier',
		name: node.getText(),
		declarations: node.getDefinitionNodes().map(processNode)
	};
}
