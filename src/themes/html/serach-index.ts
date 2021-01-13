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
		res.push(...getSearchIndexForModuleMembers(moduleTree, moduleName, config));
	});

	return res;
}

/**
 * Creates a search index for all members of the passed module node
 *
 * @param moduleTree - the module tree node
 * @param moduleName - the module's name
 * @param config - the current config with which the search index gets created
 * @returns the search index of the class members
 *
 * @example
 * ```ts
 * const searchIndex = []
 * searchIndex.push(...getSearchIndexForModuleMembers(
 * 	moduleTree,
 * 	`${moduleName}`
 * 	config
 * ));
 * ```
 */
function getSearchIndexForModuleMembers(
	moduleTree: (Record<string, unknown> & {
		name: string;
		declarations: ModuleTreeNode[];
	})[],
	moduleName: string,
	config: FliegdocConfig
): SearchResult[] {
	const res: SearchResult[] = [];

	moduleTree.forEach(moduleMember => {
		res.push({
			name: moduleMember.name,
			text: moduleName + '.' + moduleMember.name,
			url: `${config.baseUrl}${moduleName}#${moduleMember.name}`
		});

		for (const node of moduleMember.declarations) {
			if (isClassDeclaration(node)) {
				res.push(
					...getSearchResultsForClassMembers(
						node,
						moduleName + '.' + moduleMember.name,
						config
					)
				);
			} else if (isInterfaceDeclaration(node)) {
				res.push(
					...getSearchResultsForInterfaceMembers(
						node,
						moduleName + '.' + moduleMember.name,
						config
					)
				);
			}
		}
	});

	return res;
}

/**
 * Creates a search index for all members of the passed class declaration node
 *
 * @param node - the class declaration node
 * @param prefix - the module for the absolute name
 * @param config - the current config with which the search index gets created
 * @returns the search index of the class members
 *
 * @example
 * ```ts
 * const searchIndex = []
 * if (isClass(classNode))
 * 	searchIndex.push(...getSearchResultsForClassMembers(
 * 		classNode,
 * 		`${moduleName}.${$moduleMember.name}`,
 * 		config
 * 	));
 * ```
 */
function getSearchResultsForClassMembers(
	node: ModuleTreeNode<ClassDeclarationStructure>,
	prefix: string,
	config: FliegdocConfig
): SearchResult[] {
	const res: SearchResult[] = [];

	const classDeclaration = node.declarations[0];
	classDeclaration.properties?.forEach(property => {
		res.push({
			name: property.name,
			text: `${prefix}.${property.name}`,
			url: `${config.baseUrl}${prefix}.${property.name}`
		});
	});
	classDeclaration.methods?.forEach(method => {
		res.push({
			name: method.name,
			text: `${prefix}.${method.name}`,
			url: `${config.baseUrl}${prefix}.${method.name}`
		});
	});

	return res;
}

/**
 * Creates a search index for all members of the passed interface declaration node
 *
 * @param node - the interface declaration node
 * @param prefix - the module for the absolute name
 * @param config - the current config with which the search index gets created
 * @returns the search index of the interface members
 *
 * @example
 * ```ts
 * const searchIndex = []
 * if (isInterface(interfaceNode))
 * 	searchIndex.push(...getSearchResultsForInterfaceMembers(
 * 		interfaceNode,
 * 		`${moduleName}.${$moduleMember.name}`,
 * 		config
 * 	));
 * ```
 */
function getSearchResultsForInterfaceMembers(
	node: ModuleTreeNode<InterfaceDeclarationStructure>,
	prefix: string,
	config: FliegdocConfig
) {
	const res: SearchResult[] = [];

	const interfaceDeclaration = node.declarations[0];
	interfaceDeclaration.properties?.forEach(property => {
		res.push({
			name: property.name,
			text: `${prefix}.${property.name}`,
			url: `${config.baseUrl}${prefix}.${property.name}`
		});
	});
	interfaceDeclaration.methods?.forEach(method => {
		res.push({
			name: method.name,
			text: `${prefix}.${method.name}`,
			url: `${config.baseUrl}${prefix}.${method.name}`
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
 * if (isClassDeclaration(node)) {
 *     // node.declarations[0] is a ClassDeclarationStructure
 * }
 * ```
 */
function isClassDeclaration(
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
 * if (isInterfaceDeclaration(node)) {
 *     // node.declarations[0] is an InterfaceDeclarationStructure
 * }
 * ```
 */
function isInterfaceDeclaration(
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
