import {
	ClassDeclaration,
	FunctionDeclaration,
	Identifier,
	InterfaceDeclaration,
	NamespaceDeclaration,
	Node,
	SyntaxKind,
	TypeAliasDeclaration,
	VariableDeclaration
} from 'ts-morph';
import { processFunctionDeclaration } from './function';
import { processClassDeclaration } from './class';
import { processType } from './type';
import { processVariableDeclaration } from './variable';
import { processIdentifier } from './identifier';
import { processModule } from './module';

/**
 * Processes a node for documentation-relevant values
 * @param node the node that gets parsed for documentation data
 * @return documentation tree for the node and its children, if applicable
 */
export function processNode(node: Node) {
	switch (node.getKind()) {
		case SyntaxKind.FunctionDeclaration:
			return processFunctionDeclaration(node as FunctionDeclaration);
		case SyntaxKind.ClassDeclaration:
			return processClassDeclaration(node as ClassDeclaration);
		case SyntaxKind.InterfaceDeclaration:
			return processClassDeclaration(node as InterfaceDeclaration);
		case SyntaxKind.TypeAliasDeclaration:
			return processType(node as TypeAliasDeclaration);
		case SyntaxKind.VariableDeclaration:
			return processVariableDeclaration(node as VariableDeclaration);
		case SyntaxKind.Identifier:
			return processIdentifier(node as Identifier);
		case SyntaxKind.ModuleDeclaration:
			return processModule(node as NamespaceDeclaration);
	}
}
