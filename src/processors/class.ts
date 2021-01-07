import { ClassDeclaration, InterfaceDeclaration } from 'ts-morph';

export function processClassDeclaration(
	node: ClassDeclaration | InterfaceDeclaration
): Record<string, unknown> {
	return {
		type: 'class-interface',
		name: node.getName(),
		declarations: [node.getStructure()]
	};
}
