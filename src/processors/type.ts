import { TypeAliasDeclaration } from 'ts-morph';

export function processType(
	node: TypeAliasDeclaration
): Record<string, unknown> {
	return {
		type: 'type',
		name: node.getName(),
		declarations: [node.getStructure()]
	};
}
