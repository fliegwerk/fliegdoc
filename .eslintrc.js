module.exports = {
	env: {
		es2021: true,
		node: true
	},
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module'
	},
	plugins: ['@typescript-eslint', 'eslint-plugin-tsdoc'],
	rules: {
		'tsdoc/syntax': 'warn'
	},
	ignorePatterns: ['node_modules', 'docs', 'build']
};
