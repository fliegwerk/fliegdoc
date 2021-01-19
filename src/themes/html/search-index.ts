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
			text: moduleName + '#' + moduleMember.name,
			url: `${config.baseUrl}${moduleName}#${moduleMember.name}`
		});
		res.push(
			...getSearchIndexForModuleMemberChildren(
				moduleMember.declarations,
				moduleName + '#' + moduleMember.name,
				config
			)
		);
	});

	return res;
}

/**
 * Creates a search index for all children of a module member's declarations.
 *
 * @param declarations - the declarations of the module member
 * @param prefix - the prefix of the module, e.g., `[module-name].[member-name]`
 * @param config - the current config with which the search index gets created
 * @returns the search index for all children of the `declarations`
 *
 * @example
 * ```ts
 * index.push(
 * 	..getSearchIndexForModuleMemberChildren(
 * 	moduleMember.declarations,
 * 	moduleName + '.' + moduleMember.name,
 * 	config
 * );
 * ```
 */
function getSearchIndexForModuleMemberChildren(
	declarations: ModuleTreeNode[],
	prefix: string,
	config: FliegdocConfig
) {
	const res: SearchResult[] = [];

	for (const node of declarations) {
		if (
			isType<ClassDeclarationStructure>(node, 'class') ||
			isType<InterfaceDeclarationStructure>(node, 'interface')
		) {
			res.push(
				...getSearchResultsForInterfaceAndClassMembers(node, prefix, config)
			);
		}
	}

	return res;
}

/**
 * Creates a search index for all members of the passed interface or class declaration node
 *
 * @param node - the interface declaration node
 * @param prefix - the module for the absolute name
 * @param config - the current config with which the search index gets created
 * @returns the search index of the interface members
 *
 * @example
 * ```ts
 * const searchIndex = []
 * if (isInterfaceDeclaration(interfaceNode) || isClassDeclaration(InterfaceNode))
 * 	searchIndex.push(...getSearchResultsForInterfaceAndClassMembers(
 * 		interfaceNode,
 * 		`${moduleName}.${$moduleMember.name}`,
 * 		config
 * 	));
 * ```
 */
function getSearchResultsForInterfaceAndClassMembers(
	node: ModuleTreeNode<
		InterfaceDeclarationStructure | ClassDeclarationStructure
	>,
	prefix: string,
	config: FliegdocConfig
): SearchResult[] {
	const res: SearchResult[] = [];

	const interfaceDeclaration = node.declarations[0];
	const memberToSearchResult = (property: any) => {
		res.push({
			name: property.name,
			text: `${prefix}.${property.name}`,
			url: `${config.baseUrl}${prefix}.${property.name}`
		});
	};
	interfaceDeclaration.properties?.forEach(memberToSearchResult);
	interfaceDeclaration.methods?.forEach(memberToSearchResult);

	return res;
}

/**
 * Checks if the given node is a {@link ModuleTreeNode} contains a class declaration
 *
 * @param node - the node
 * @param typeName - the `node.type` for the type T
 * @typeparam T - the type of `node.declarations[0]`, if `node.type === typeName`
 * @returns does `node.declarations` contain a class declaration?
 *
 * @example
 * ```ts
 * if (isType<ClassDeclarationStructure>(node, 'class')) {
 *     // node.declarations[0] is a ClassDeclarationStructure
 * } else if (isType<InterfaceDeclarationStructure>(node, 'Interface')) {
 *     // node.declarations[0] is a InterfaceDeclarationStructure
 * }
 * ```
 */
function isType<T>(
	node: ModuleTreeNode,
	typeName: string
): node is ModuleTreeNode<T> {
	return node.type === typeName;
}

/**
 * A search result.
 */
export interface SearchResult {
	name: string;
	url: string;
	text: string;
}
