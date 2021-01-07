import { TypeAliasDeclaration } from 'ts-morph';
import { processJsDocs } from './helpers/processJsDocs';

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
		declarations: [
			{ ...node.getStructure(), docs: processJsDocs(node.getJsDocs()) }
		]
	};
}
