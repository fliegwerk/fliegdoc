import MarkdownIt from 'markdown-it';
import * as fs from 'fs';
import { CONFIG } from '../config';
import * as path from 'path';

const origMd = new MarkdownIt({ linkify: true });
import ejs from 'ejs';

const readmeContent = origMd.render(fs.readFileSync(CONFIG.readme).toString());

const md = {
	render: (md: string) => {
		return origMd.render(md.replaceAll(/{@link (.*?)}/g, '[`$1`](#$1)'));
	}
};

const viewFolder = path.resolve(__dirname, '..', '..', 'views');

async function render(view: string, data: any, outPath: string) {
	fs.mkdirSync(path.dirname(outPath), { recursive: true });
	await fs.writeFileSync(
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
 * @param outDir
 */
export async function buildStatic(
	tree: any,
	outDir = path.resolve(process.cwd(), 'docs')
) {
	await render(
		'plain',
		{
			content: readmeContent,
			modules: Object.keys(tree)
		},
		path.join(outDir, 'index.html')
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
				path.join(outDir, packageName, 'index.html')
			)
		)
	);
}
