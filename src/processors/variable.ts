import { VariableDeclaration } from 'ts-morph';

export function processVariableDeclaration(node: VariableDeclaration) {
	// console.log(node.getChildrenOfKind(SyntaxKind.ArrowFunction));
	return {
		type: 'variable',
		name: node.getName(),
		declarations: [node.getVariableStatement()?.getStructure()]
	};
}
