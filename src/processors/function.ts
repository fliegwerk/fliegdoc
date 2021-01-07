import { FunctionDeclaration } from 'ts-morph';

export function processFunctionDeclaration(
	node: FunctionDeclaration
): Record<string, unknown> {
	// return signature.getDocumentationComments()
	return {
		type: 'function',
		name: node.getName(),
		declarations: [node.getStructure()]
	};
}
