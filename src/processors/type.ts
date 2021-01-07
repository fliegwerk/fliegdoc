import { TypeAliasDeclaration } from 'ts-morph';

/**
 * Converts a `TypeAleasDeclaration` to a documentation-ready representation.
 *
 * @param node - the type alias declaration
 * @returns documentation-ready representation of the type
 * @example
 * ```ts
 * processType(node);
 * ```
 */
export function processType(
	node: TypeAliasDeclaration
): Record<string, unknown> {
	return {
		type: 'type',
		name: node.getName(),
		declarations: [node.getStructure()]
	};
}
