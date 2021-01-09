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
import { processInterfaceDeclaration } from './interface';
import { ModuleTreeNode } from '../model';

/**
 * Processes a node for documentation-relevant values
 *
 * @param node - the node that gets parsed for documentation data
 * @returns documentation tree for the node and its children, if applicable
 * @example
 * ```ts
 * processNode(node);
 * ```
 */
export function processNode(node: Node): ModuleTreeNode<unknown> {
	switch (node.getKind()) {
		case SyntaxKind.FunctionDeclaration:
			return processFunctionDeclaration(node as FunctionDeclaration);
		case SyntaxKind.ClassDeclaration:
			return processClassDeclaration(node as ClassDeclaration);
		case SyntaxKind.InterfaceDeclaration:
			return processInterfaceDeclaration(node as InterfaceDeclaration);
		case SyntaxKind.TypeAliasDeclaration:
			return processType(node as TypeAliasDeclaration);
		case SyntaxKind.VariableDeclaration:
			return processVariableDeclaration(node as VariableDeclaration);
		case SyntaxKind.Identifier:
			return processIdentifier(node as Identifier);
		case SyntaxKind.ModuleDeclaration:
			return processModule(node as NamespaceDeclaration);
		default:
			return {
				type: 'unknown::' + node.getKindName(),
				declarations: [],
				name: node.getSymbol()?.getName() ?? 'unknown'
			};
	}
}
