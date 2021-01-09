import { TypeAliasDeclaration } from 'ts-morph';
import { processJsDocs } from './helpers/processJsDocs';
import { ModuleTreeNode } from '../model';

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
export function processType(node: TypeAliasDeclaration): ModuleTreeNode {
	return {
		type: 'type',
		name: node.getName(),
		declarations: [
			{ ...node.getStructure(), docs: processJsDocs(node.getJsDocs()) }
		]
	};
}
