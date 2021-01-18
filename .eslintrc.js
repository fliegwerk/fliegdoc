module.exports = {
	env: {
		es2021: true,
		node: true
	},
	extends: [
		'prettier',
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:jsdoc/recommended'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module'
	},
	plugins: ['prettier', '@typescript-eslint', 'eslint-plugin-tsdoc', 'jsdoc'],
	rules: {
		'tsdoc/syntax': 'error',
		'prettier/prettier': 'warn',
		'@typescript-eslint/no-inferrable-types': 0,
		'jsdoc/check-tag-names': 0, // done by tsdoc checker
		'jsdoc/require-jsdoc': [
			'error',
			{
				contexts: [
					'TSInterfaceDeclaration',
					'TSTypeAliasDeclaration',
					'TSEnumDeclaration'
				]
			}
		],
		'jsdoc/require-description': 1,
		'jsdoc/require-param-description': 'error',
		'jsdoc/require-hyphen-before-param-description': 'error',
		'jsdoc/no-types': 'error',
		'jsdoc/require-throws': 'error',
		'jsdoc/require-param-type': 0,
		'jsdoc/require-property-type': 0,
		'jsdoc/require-returns-type': 0,
		'jsdoc/require-example': 2,
		'@typescript-eslint/no-explicit-any': 0
	},
	ignorePatterns: ['node_modules', 'docs', 'build']
};
