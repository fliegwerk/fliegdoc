import { Identifier } from 'ts-morph';
import { processNode } from './init';

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
export function processIdentifier(node: Identifier): Record<string, unknown> {
	return {
		type: 'identifier',
		name: node.getText(),
		implementations: node.getDefinitionNodes().map(processNode)
	};
}
