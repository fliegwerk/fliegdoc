module.exports = {
	outDir: './docs',
	modules: [
		{
			package: './package.json',
			tsconfig: './tsconfig.json',
			mainFile: 'index.ts'
		}
	],
	baseUrl: '/fliegdoc/',
	title: 'fliegdoc Documentation',
	externalLinks: {
		GitHub: 'https://github.com/fliegwerk/fliegdoc',
		npm: 'https://www.npmjs.com/package/fliegdoc'
	}
};
