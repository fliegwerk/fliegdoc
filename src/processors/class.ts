import { ClassDeclaration, ClassDeclarationStructure } from 'ts-morph';
import { extractPropertiesAndMethods } from './helpers/extractPropertiesAndMethods';
import { getConfig } from '../model/config';
import { ModuleTreeNode } from '../model';
import { updateJSDocsForStructure } from './helpers/updateJSDocsForStructure';

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
	node: ClassDeclaration
): ModuleTreeNode<ClassDeclarationStructure> {
	const structure = node.getStructure();
	extractPropertiesAndMethods(structure, node);

	if (getConfig().hidePrivateMembers) {
		if (structure.properties)
			structure.properties = structure.properties.filter(
				property => property.scope !== 'private'
			);
		if (structure.methods)
			structure.methods = structure.methods.filter(
				method => method.scope !== 'private'
			);
	}

	updateJSDocsForStructure(structure, node, 'ctors', 'getConstructors');

	return {
		type: 'class',
		name: node.getName() ?? '[[UnnamedClass]]',
		declarations: [structure]
	};
}
