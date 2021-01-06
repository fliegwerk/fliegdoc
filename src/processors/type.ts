import { TypeAliasDeclaration } from 'ts-morph';

export function processType(node: TypeAliasDeclaration) {
	return {
		type: 'type',
		name: node.getName(),
		declarations: [node.getStructure()]
	};
}
