import {
	ClassDeclaration,
	ClassDeclarationStructure,
	InterfaceDeclaration,
	InterfaceDeclarationStructure
} from 'ts-morph';
import { processJsDocs } from './processJsDocs';

/**
 * Updates the `structure`'s JSDoc with the node's pre-processed JSDoc
 *
 * Preprocesses the documentation comment using {@link processJsDocs}
 *
 * @param structure - the structure whose docs should get updated
 * @param node - the node from which the docs get extracted
 * @param key - the key to extract the relevant declarations in the `structure`, e.g., `'properties'`
 * @param methodKey - the function name to extract the declarations from the `node`, e.g., `'getProperties'`
 *
 * @example
 * ```ts
 * // structure is an interface declaration structure
 * structure.docs = processJsDocs(node.getJsDocs());
 * updateJSDocsForStructure(structure, node, 'properties', 'getProperties');
 * updateJSDocsForStructure(structure, node, 'methods', 'getMethods');
 * ```
 */
export function updateJSDocsForStructure(
	structure: ClassDeclarationStructure | InterfaceDeclarationStructure,
	node: ClassDeclaration | InterfaceDeclaration,
	key: string,
	methodKey: string
): void {
	const structureElement = (structure as any)[key];
	if (structureElement) {
		for (let i = 0; i < structureElement.length; i++) {
			const jsDocs = (node as any)[methodKey]()[i].getJsDocs();
			structureElement[i].docs = processJsDocs(jsDocs);
		}
	}
}
