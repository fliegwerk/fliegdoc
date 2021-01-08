import { Tree } from '../model';
import Express, { RequestHandler } from 'express';
import path from 'path';
import { getConfig } from '../model/config';

/**
 * Starts an http server on `port` and serves the documentation.
 *
 * Instead of writing the docs to the actual file system, this just generates them into a "virtual" file system.
 *
 * **NOTE:** This is great for quickly reviewing the docs, but please keep in mind that all files get saved in-memory.
 * If a theme outputs a lot of images or other bigger files, this might pose a problem.
 *
 * @param tree - the documentation tree
 * @param port - the port on which the documentation gets served
 *
 * @throws Error - if the theme isn't browser-viewable, i.e., if {@link Theme.isBrowserViewable} is `false`
 *
 * @example
 * ```ts
 * import { buildTreeForConfig, serveDynamic } from 'fliegdoc';
 *
 * const tree = buildTreeForConfig();
 * serveDynamic(tree, port);
 * ```
 */
export async function serveDynamic(
	tree: Tree,
	port: number = 3000
): Promise<void> {
	const config = getConfig();

	if (!config.theme.isBrowserViewable)
		throw new Error('The selected theme is not browser-viewable.');

	const app = Express();

	await config.theme.onBuild(
		tree,
		config,
		async (absolutePath, content, mimetype) => {
			// url, extracted from the absolute path of the "virtual" file
			const url =
				config.baseUrl +
				path.relative(config.outDir, absolutePath).replace(/\\/g, '/');

			// a handler for serving the file
			const handler: RequestHandler = (req, res) => {
				res.type(mimetype);
				res.send(content);
			};

			// register the handler for the full path
			app.get(url, handler);

			// register a handler for the directory if it is an index.html or index.htm
			const match = url.match(/^(.*)\/index.html?$/i);
			if (match) {
				app.get(match[1], handler);
			}
		}
	);

	app.listen(port, () => {
		console.log(`Listening on http://localhost:${port}${getConfig().baseUrl}`);
	});
}
