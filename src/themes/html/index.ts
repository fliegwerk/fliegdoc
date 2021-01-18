import { Theme } from '../../model';
import MarkdownIt from 'markdown-it';
import * as fsp from 'fs/promises';
import * as fs from 'fs';
import * as path from 'path';
import { renderFile } from 'eta';
import { getConfig } from '../../model/config';
import { getSearchIndex } from './search-index';

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

/**
 * The default HTML theme.
 *
 * Generates individual pages, per module, and uses all configuration parameters like `config.title`.
 *
 * Rendering gets done using templates written in ETA.
 */
export const HTMLTheme: Theme = {
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
			await fsp.mkdir(path.dirname(outPath), { recursive: true });
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

		/**
		 * Static files that need to get copied to the `outDir`, e.g., for local images
		 */
		const staticFiles: Record<string, string> = {};

		/**
		 * Detects image tags in Markdown
		 */
		const regex = /!\[(.*?)]\((.*?)\)/g;

		/**
		 * Readme content as HTML
		 */
		const readmeContent = origMd.render(
			(await fsp.readFile(getConfig().readme))
				.toString()
				// Handle local image files
				.replace(regex, (orig, altText, link) => {
					// handle images
					if (link.startsWith('http://') || link.startsWith('https://')) {
						// global link => can stay as it is
						return orig;
					} else {
						// image exists and should get copied to the output
						const origPath = path.resolve(path.dirname(config.readme), link);
						if (fs.existsSync(origPath)) {
							staticFiles[origPath] = `./assets/${Date.now()}.${path.extname(
								origPath
							)}`;
							return `![${altText}](${staticFiles[origPath]})`;
						} else {
							// Image file was not found in the file system => remove in output
							console.warn(
								'Static file ' +
									link +
									' from README does not exist, removing image in output.'
							);
							return '';
						}
					}
				})
		);

		const searchIndex = getSearchIndex(tree, getConfig());
		await createFile(
			path.join(getConfig().outDir, 'search-index.json'),
			Buffer.from(JSON.stringify(searchIndex)),
			'.json'
		);

		// render readme content to index.html
		await render(
			'plain',
			{
				content: readmeContent,
				modules: Object.keys(tree),
				config: getConfig()
			},
			path.join(getConfig().outDir, 'index.html')
		);

		// Copy static files to the output
		for (const origPath in staticFiles) {
			if (Object.prototype.hasOwnProperty.call(staticFiles, origPath)) {
				await createFile(
					path.join(config.outDir, staticFiles[origPath]),
					await fsp.readFile(origPath),
					path.extname(origPath)
				);
			}
		}

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
					path.join(getConfig().outDir, packageName, 'index.html')
				)
			)
		);
	}
};
