/**
 * @type {Partial<FliegdocConfig>}
 */
module.exports = {
	outDir: './docs',
	modules: [
		{
			package: './package.json',
			tsconfig: './tsconfig.json',
			mainFile: 'index.ts'
		}
	],
	baseUrl: '/fliegdoc/'
};
