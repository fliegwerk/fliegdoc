import { VariableDeclaration } from 'ts-morph';

export function processVariableDeclaration(
	node: VariableDeclaration
): Record<string, unknown> {
	return {
		type: 'variable',
		name: node.getName(),
		declarations: [node.getVariableStatement()?.getStructure()]
	};
}
