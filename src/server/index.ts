import Express from 'express';
import MarkdownIt from 'markdown-it';
import * as fs from 'fs';
import { CONFIG } from '../config';
import path from 'path';
const origMd = new MarkdownIt({ linkify: true });

const readmeContent = origMd.render(fs.readFileSync(CONFIG.readme).toString());

const md = {
	render: (md: string) => {
		return origMd.render(md.replaceAll(/{@link (.*?)}/g, '[`$1`](#$1)'));
	}
};

/**
 * Starts an http server on `port` and serves the generated documentation
 * @param tree the documentation tree
 * @param port the port on which the documentation gets served
 */
export function serveDynamic(tree: any, port = 3000) {
	const app = Express();

	app.set('view engine', 'ejs');

	app.get('/', (req, res) => {
		res.render('plain', {
			content: readmeContent,
			modules: Object.keys(tree)
		});
	});

	for (const packageName in tree) {
		if (tree.hasOwnProperty(packageName)) {
			app.get('/' + packageName, (req, res) => {
				res.render('module', {
					moduleName: packageName,
					members: tree[packageName],
					md: md,
					modules: Object.keys(tree)
				});
			});
		}
	}

	app.listen(port, () => {
		console.log(`Listening on http://localhost:${port}`);
	});
}

export function serveStatic(
	docDir: string = path.join(process.cwd(), 'docs'),
	port: number = 3000
) {
	const app = Express();
	app.use(Express.static(docDir));

	app.listen(port, () => {
		console.log(`Listening on http://localhost:${port}`);
	});
}
