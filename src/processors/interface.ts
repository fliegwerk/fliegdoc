import { InterfaceDeclaration } from 'ts-morph';
import { extractPropertiesAndMethods } from './helpers/extractPropertiesAndMethods';

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
export function processInterfaceDeclaration(
	node: InterfaceDeclaration
): Record<string, unknown> {
	const structure = node.getStructure();
	extractPropertiesAndMethods(structure, node);
	return {
		type: 'interface',
		name: node.getName(),
		declarations: [structure]
	};
}
