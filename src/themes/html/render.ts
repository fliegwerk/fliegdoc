import { CreateFileFunction, Tree } from '../../model';
import { renderFile } from 'eta';
import path from 'path';
import MarkdownIt from 'markdown-it';
import * as fsp from 'fs-extra';
import { getConfig } from '../../model/config';
import { createSearchIndexJSON } from './createSearchIndexJSON';

const origMd = new MarkdownIt({ linkify: true });
const viewFolder = path.resolve(__dirname, '..', '..', '..', 'views');
/**
 * Custom Markdown-It implementation to replace links
 */
const md = {
	render: (md?: string) => {
		return origMd.render((md ?? '').replace(/{@link (.*?)}/g, '[`$1`](#$1)'));
	}
};

/**
 * Writes the index file from the root README.md
 *
 * @param readmeImageReplacer - the README static content replacer from {@link getStaticFileHandler}
 * @param tree - the file tree, used to create the necessary links
 * @param createFile - the create file function, cf. {@link CreateFileFunction}
 * @example
 * ```ts
 * const {staticFiles, readmeImageReplacer} = getStaticFileHandler(config);
 *
 * await writeIndexFileFromREADME(readmeImageReplacer, tree, createFile);
 * ```
 */
export async function writeIndexFileFromREADME(
	readmeImageReplacer: (orig: string, altText: string, link: string) => string,
	tree: Tree,
	createFile: (path: string, content: Buffer, mimetype: string) => Promise<void>
): Promise<void> {
	/**
	 * Readme content as HTML
	 */
	const readmeContent = origMd.render(
		(await fsp.readFile(getConfig().readme))
			.toString()
			// Handle local image files
			.replace(/!\[(.*?)]\((.*?)\)/g, readmeImageReplacer)
	);
	await createSearchIndexJSON(tree, createFile);

	// render readme content to index.html
	await render(
		'plain',
		{
			content: readmeContent,
			modules: Object.keys(tree),
			config: getConfig()
		},
		path.join(getConfig().outDir, 'index.html'),
		createFile
	);
}

/**
 * Writes the module API reference files
 *
 * @param tree - the tree for which the references get generated
 * @param createFile - the {@link CreateFileFunction}
 * @example
 * ```ts
 * await writeModuleFiles(tree, createFile);
 * ```
 */
export async function writeModuleFiles(
	tree: Tree,
	createFile: (path: string, content: Buffer, mimetype: string) => Promise<void>
): Promise<void> {
	// Create module doc files
	await Promise.all(
		Object.keys(tree).map(packageName =>
			render(
				'module',
				{
					moduleName: packageName,
					members: tree[packageName],
					md: md,
					config: getConfig(),
					modules: Object.keys(tree)
				},
				path.join(getConfig().outDir, packageName, 'index.html'),
				createFile
			)
		)
	);
}

/**
 * Render a view to a target file (the `outPath`)
 *
 * @param view - the view that should get rendered, without `.ejs` and relative to the `views` folder
 * @param data - the data passed to the view
 * @param outPath - the path to the file where the view gets rendered to
 * @param createFile - function to create a file
 * @example
 * ```ts
 * render('plain', {
 *  	content: '<h1>Test</h1>'
 *		modules: modules,
 *		config
 * }, path.join(outDir, 'test.html'))
 * ```
 */
async function render(
	view: string,
	data: Record<string, unknown>,
	outPath: string,
	createFile: CreateFileFunction
): Promise<void> {
	await createFile(
		outPath,
		Buffer.from(
			(
				await (renderFile(path.resolve(viewFolder, view + '.eta'), data, {
					views: viewFolder
				}) || Promise.reject('Error rendering view ' + view))
			).toString(),
			'utf-8'
		),
		'text/html'
	);
}
