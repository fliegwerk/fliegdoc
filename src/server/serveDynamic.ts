import { Tree } from '../model';
import Express, { RequestHandler } from 'express';
import path from 'path';
import { getConfig } from '../model/config';

/**
 * Starts an http server on `port` and serves the generated documentation
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
			const url =
				config.baseUrl +
				path.relative(config.outDir, absolutePath).replace(/\\/g, '/');

			const handler: RequestHandler = (req, res) => {
				res.type(mimetype);
				res.send(content);
			};
			app.get(url, handler);
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
