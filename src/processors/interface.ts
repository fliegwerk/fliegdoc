import { InterfaceDeclaration, InterfaceDeclarationStructure } from 'ts-morph';
import { extractPropertiesAndMethods } from './helpers/extractPropertiesAndMethods';
import { ModuleTreeNode } from '../model';

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
): ModuleTreeNode<InterfaceDeclarationStructure> {
	const structure = node.getStructure();
	extractPropertiesAndMethods(structure, node);
	return {
		type: 'interface',
		name: node.getName(),
		declarations: [structure]
	};
}
