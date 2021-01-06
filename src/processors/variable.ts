import { VariableDeclaration } from 'ts-morph';

export function processVariableDeclaration(node: VariableDeclaration) {
	return {
		type: 'variable',
		name: node.getName(),
		declarations: [node.getVariableStatement()?.getStructure()]
	};
}
