import Express from 'express';
import MarkdownIt from 'markdown-it';
import * as fs from 'fs';
import { Tree } from '../model';
import * as path from 'path';
import { renderFile } from 'eta';
import { getConfig } from '../model/config';
const origMd = new MarkdownIt({ linkify: true });

const md = {
	render: (md?: string) => {
		return origMd.render(
			(md ?? '').replaceAll(/{@link (.*?)}/g, '[`$1`](#$1)')
		);
	}
};

/**
 * Starts an http server on `port` and serves the generated documentation
 *
 * @param tree - the documentation tree
 * @param port - the port on which the documentation gets served
 * @example
 * ```ts
 * import { buildTreeForConfig, serveDynamic } from 'fliegdoc';
 *
 * const tree = buildTreeForConfig();
 * serveDynamic(tree, port);
 * ```
 */
export function serveDynamic(tree: Tree, port: number = 3000): void {
	const app = Express();

	app.engine('eta', renderFile);
	app.set('view engine', 'eta');
	app.set('views', path.join(__dirname, '..', '..', 'views'));

	app.get(`${getConfig().baseUrl}`, (req, res) => {
		res.render('plain', {
			content: md.render(fs.readFileSync(getConfig().readme).toString()),
			config: getConfig(),
			modules: Object.keys(tree)
		});
	});

	for (const packageName in tree) {
		if (Object.prototype.hasOwnProperty.call(tree, packageName)) {
			app.get(getConfig().baseUrl + packageName, (req, res) => {
				res.render('module', {
					moduleName: packageName,
					members: tree[packageName],
					md: md,
					config: getConfig(),
					modules: Object.keys(tree)
				});
			});
		}
	}

	app.listen(port, () => {
		console.log(`Listening on http://localhost:${port}${getConfig().baseUrl}`);
	});
}

/**
 * Starts an HTTP server on `port` and serves the documentation in the config's `outDir`.
 *
 * @param port - the port on which the documentation gets served
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
	const app = Express();
	app.use(getConfig().baseUrl, Express.static(getConfig().outDir));

	app.listen(port, () => {
		console.log(`Listening on http://localhost:${port}${getConfig().baseUrl}`);
	});
}
