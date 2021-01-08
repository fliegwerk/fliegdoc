import { Theme } from '../../model';
import MarkdownIt from 'markdown-it';
import * as fs from 'fs/promises';
import * as path from 'path';
import { renderFile } from 'eta';
import { getConfig } from '../../model/config';

const origMd = new MarkdownIt({ linkify: true });
const viewFolder = path.resolve(__dirname, '..', '..', '..', 'views');

/**
 * Custom Markdown-It implementation to replace links
 */
const md = {
	render: (md?: string) => {
		return origMd.render(
			(md ?? '').replaceAll(/{@link (.*?)}/g, '[`$1`](#$1)')
		);
	}
};

export const DefaultHTMLTheme: Theme = {
	isBrowserViewable: true,
	async onBuild(tree, config, createFile) {
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
		const readmeContent = origMd.render(
			(await fs.readFile(getConfig().readme)).toString()
		);

		await render(
			'plain',
			{
				content: readmeContent,
				modules: Object.keys(tree),
				config: getConfig()
			},
			path.join(getConfig().outDir, 'index.html')
		);

		await createFile(
			path.join(config.outDir, 'test.txt'),
			Buffer.from('Hello World'),
			'text/plain'
		);

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
					path.join(getConfig().outDir, packageName, 'index.html')
				)
			)
		);
	}
};
