import Express from 'express';
import { getConfig } from '../model/config';

/**
 * Starts an HTTP server on `port` and statically serves the documentation in the config's `outDir`.
 *
 * @param port - the port on which the documentation gets served
 *
 * @throws Error - if the theme isn't browser-viewable, i.e., if {@link Theme.isBrowserViewable} is `false`
 *
 * @example
 * ```ts
 * import { buildTreeForConfig, serveDynamic, buildStatic } from 'fliegdoc';
 *
 * const tree = buildTreeForConfig();
 * await buildStatic(tree);
 * serveStatic(port);
 * ```
 */
export function serveStatic(port: number = 3000): void {
	if (!getConfig().theme.isBrowserViewable)
		throw new Error('The selected theme is not browser-viewable.');

	const app = Express();
	app.use(getConfig().baseUrl, Express.static(getConfig().outDir));

	app.listen(port, () => {
		console.log(`Listening on http://localhost:${port}${getConfig().baseUrl}`);
	});
}
