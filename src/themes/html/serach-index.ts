import { Tree, ModuleTreeNode, FliegdocConfig } from '../../model';
import {
	ClassDeclarationStructure,
	InterfaceDeclarationStructure
} from 'ts-morph';

/**
 * Creates a search index for the passed {@link Tree}
 *
 * @param tree - the tree for which the index gets generated
 * @param config - the config that gets used
 * @returns the search index, containing all linked members of the docs
 *
 * @example
 * ```ts
 * console.log(getSearchIndex(tree))
 * ```
 */
export function getSearchIndex(
	tree: Tree,
	config: FliegdocConfig
): SearchResult[] {
	const res: SearchResult[] = [];

	Object.keys(tree).forEach(moduleName => {
		res.push({
			name: moduleName,
			text: moduleName,
			url: `${config.baseUrl}${moduleName}`
		});
		const moduleTree = tree[moduleName];
		// noinspection DuplicatedCode
		moduleTree.forEach(moduleMember => {
			res.push({
				name: moduleMember.name,
				text: moduleName + '.' + moduleMember.name,
				url: `${config.baseUrl}${moduleName}#${moduleMember.name}`
			});

			for (const node of moduleMember.declarations) {
				if (isClass(node)) {
					const classDeclaration = node.declarations[0];
					classDeclaration.properties?.forEach(property => {
						res.push({
							name: property.name,
							text: `${moduleName}.${moduleMember.name}.${property.name}`,
							url: `${config.baseUrl}${moduleName}#${moduleMember.name}.${property.name}`
						});
					});
					classDeclaration.methods?.forEach(method => {
						res.push({
							name: method.name,
							text: `${moduleName}.${moduleMember.name}.${method.name}`,
							url: `${config.baseUrl}${moduleName}#${moduleMember.name}.${method.name}`
						});
					});
				} else if (isInterface(node)) {
					const interfaceDeclaration = node.declarations[0];
					interfaceDeclaration.properties?.forEach(property => {
						res.push({
							name: property.name,
							text: `${moduleName}.${moduleMember.name}.${property.name}`,
							url: `${config.baseUrl}${moduleName}#${moduleMember.name}.${property.name}`
						});
					});
					interfaceDeclaration.methods?.forEach(method => {
						res.push({
							name: method.name,
							text: `${moduleName}.${moduleMember.name}.${method.name}`,
							url: `${config.baseUrl}${moduleName}#${moduleMember.name}.${method.name}`
						});
					});
				}
			}
		});
	});

	return res;
}

/**
 * Checks if the given node is a {@link ModuleTreeNode} contains a class declaration
 *
 * @param node - the node
 * @returns does `node.declarations` contain a class declaration?
 *
 * @example
 * ```ts
 * if (isClass(node)) {
 *     // node.declarations[0] is a ClassDeclarationStructure
 * }
 * ```
 */
function isClass(
	node: ModuleTreeNode
): node is ModuleTreeNode<ClassDeclarationStructure> {
	return node.type === 'class';
}

/**
 * Checks if the given node is a {@link ModuleTreeNode} contains an interface declaration
 *
 * @param node - the node
 * @returns does `node.declarations` contain an interface declaration?
 *
 * @example
 * ```ts
 * if (isInterface(node)) {
 *     // node.declarations[0] is an InterfaceDeclarationStructure
 * }
 * ```
 */
function isInterface(
	node: ModuleTreeNode
): node is ModuleTreeNode<InterfaceDeclarationStructure> {
	return node.type === 'interface';
}

/**
 * A search result.
 */
export interface SearchResult {
	name: string;
	url: string;
	text: string;
}
