import {
	ClassDeclaration,
	ClassDeclarationStructure,
	InterfaceDeclaration,
	InterfaceDeclarationStructure
} from 'ts-morph';
import { processJsDocs } from './processJsDocs';

/**
 * Extracts docs for the node (and its structure), its root docs, as well as the structure of its properties and methods
 *
 * Applies the custom TSDoc parser.
 *
 * @param structure - the node's structure
 * @param node - the interface or class declaration node
 * @example
 * ```ts
 * const structure = node.getStructure();
 * extractPropertiesAndMethods(structure, node);
 * return {
 * 	type: 'interface',
 * 	name: node.getName(),
 * 	declarations: [structure]
 * };
 * ```
 */
export function extractPropertiesAndMethods(
	structure: ClassDeclarationStructure | InterfaceDeclarationStructure,
	node: ClassDeclaration | InterfaceDeclaration
): void {
	structure.docs = processJsDocs(node.getJsDocs());
	if (structure.properties) {
		for (let i = 0; i < structure.properties.length; i++) {
			structure.properties[i].docs = processJsDocs(
				node.getProperties()[i].getJsDocs()
			);
		}
	}
	if (structure.methods) {
		for (let i = 0; i < structure.methods.length; i++) {
			structure.methods[i].docs = processJsDocs(
				node.getMethods()[i].getJsDocs()
			);
		}
	}
}
