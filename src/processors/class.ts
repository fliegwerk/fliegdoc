import { ClassDeclaration, InterfaceDeclaration } from 'ts-morph';

/**
 * Converts a `ClassDeclaration` or `InterfaceDeclaration` to a documentation-ready representation.
 *
 * @param node - the class or interface declaration
 * @returns documentation-ready representation of the class/interface
 * @example
 * ```ts
 * processClassDeclaration(node);
 * ```
 */
export function processClassDeclaration(
	node: ClassDeclaration | InterfaceDeclaration
): Record<string, unknown> {
	return {
		type: 'class-interface',
		name: node.getName(),
		declarations: [node.getStructure()]
	};
}
