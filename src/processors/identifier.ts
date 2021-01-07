import { Identifier } from 'ts-morph';
import { processNode } from './init';

export function processIdentifier(node: Identifier): Record<string, unknown> {
	return {
		type: 'identifier',
		name: node.getText(),
		implementations: node.getDefinitionNodes().map(processNode)
	};
}
