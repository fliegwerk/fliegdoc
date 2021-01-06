import MarkdownIt from 'markdown-it';
import * as fs from 'fs/promises';
import * as path from 'path';
import ejs from 'ejs';
import { DEFAULT_CONFIG, FliegdocConfig, Tree } from '../model';

const origMd = new MarkdownIt({ linkify: true });
const viewFolder = path.resolve(__dirname, '..', '..', 'views');

/**
 * Custom Mardown-It implementation to replace {@\link something}
 */
const md = {
	render: (md: string) => {
		return origMd.render(md.replaceAll(/{@link (.*?)}/g, '[`$1`](#$1)'));
	}
};

/**
 * Render a view to a target file (the `outPath`)
 * @param view the view that should get rendered, without `.ejs` and relative to the `views` folder
 * @param data the data passed to the view
 * @param outPath the path to the file where the view gets rendered to
 */
async function render(view: string, data: any, outPath: string): Promise<void> {
	await fs.mkdir(path.dirname(outPath), { recursive: true });
	await fs.writeFile(
		outPath,
		// @ts-ignore
		await ejs.renderFile(path.resolve(viewFolder, view + '.ejs'), data, {
			root: viewFolder,
			views: viewFolder
		})
	);
}

/**
 * Starts an http server on `port` and serves the generated documentation
 * @param tree the documentation tree
 * @param configOverrides
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
			modules: Object.keys(tree)
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
					modules: Object.keys(tree)
				},
				path.join(finalConfig.outDir, packageName, 'index.html')
			)
		)
	);
}
