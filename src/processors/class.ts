import { ClassDeclaration } from 'ts-morph';
import { processJsDocs } from './helpers/processJsDocs';
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
export function processClassDeclaration(
	node: ClassDeclaration
): Record<string, unknown> {
	const structure = node.getStructure();
	extractPropertiesAndMethods(structure, node);

	if (structure.ctors) {
		for (let i = 0; i < structure.ctors.length; i++) {
			structure.ctors[i].docs = processJsDocs(
				node.getConstructors()[i].getJsDocs()
			);
		}
	}

	return {
		type: 'class',
		name: node.getName(),
		declarations: [structure]
	};
}
