import {
	ClassDeclaration,
	ClassDeclarationStructure,
	InterfaceDeclaration,
	InterfaceDeclarationStructure
} from 'ts-morph';
import { processJsDocs } from './processJsDocs';
import { updateJSDocsForStructure } from './updateJSDocsForStructure';

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
	updateJSDocsForStructure(structure, node, 'properties', 'getProperties');
	updateJSDocsForStructure(structure, node, 'methods', 'getMethods');
}
