import MarkdownIt from 'markdown-it';
import * as fs from 'fs/promises';
import * as path from 'path';
import { renderFile } from 'eta';
import { DEFAULT_CONFIG, FliegdocConfig, Tree } from '../model';

const origMd = new MarkdownIt({ linkify: true });
const viewFolder = path.resolve(__dirname, '..', '..', 'views');

/**
 * Custom Markdown-It implementation to replace links
 */
const md = {
	render: (md: string) => {
		return origMd.render(md.replaceAll(/{@link (.*?)}/g, '[`$1`](#$1)'));
	}
};

/**
 * Render a view to a target file (the `outPath`)
 *
 * @param view - the view that should get rendered, without `.ejs` and relative to the `views` folder
 * @param data - the data passed to the view
 * @param outPath - the path to the file where the view gets rendered to
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
	outPath: string
): Promise<void> {
	await fs.mkdir(path.dirname(outPath), { recursive: true });
	await fs.writeFile(
		outPath,
		await (renderFile(path.resolve(viewFolder, view + '.eta'), data, {
			root: viewFolder,
			views: viewFolder
		}) || Promise.reject('Error rendering view ' + view))
	);
}

/**
 * Builds the static documentation from `tree` to the config's `outDir`.
 *
 * @param tree - the documentation tree
 * @param configOverrides - the overrides that get applied to the {@link DEFAULT_CONFIG}
 * @example
 * ```ts
 * import { buildTreeForConfig, buildStatic } from 'fliegdoc';
 *
 * const tree = buildTreeForConfig(config);
 * await buildStatic(tree, config);
 * ```
 */
export async function buildStatic(
	tree: Tree,
	configOverrides?: Partial<FliegdocConfig>
): Promise<void> {
	const finalConfig: FliegdocConfig = {
		...DEFAULT_CONFIG,
		...(configOverrides ?? {})
	};
	const readmeContent = origMd.render(
		(await fs.readFile(finalConfig.readme)).toString()
	);

	await render(
		'plain',
		{
			content: readmeContent,
			modules: Object.keys(tree),
			config: finalConfig
		},
		path.join(finalConfig.outDir, 'index.html')
	);

	await Promise.all(
		Object.keys(tree).map(packageName =>
			render(
				'module',
				{
					moduleName: packageName,
					members: tree[packageName],
					md: md,
					config: finalConfig,
					modules: Object.keys(tree)
				},
				path.join(finalConfig.outDir, packageName, 'index.html')
			)
		)
	);
}
