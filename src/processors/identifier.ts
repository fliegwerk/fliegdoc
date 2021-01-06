import { Identifier } from 'ts-morph';
import { processNode } from './init';

export function processIdentifier(node: Identifier): any {
	return {
		type: 'identifier',
		name: node.getText(),
		implementations: node.getDefinitionNodes().map(processNode)
	};
}
