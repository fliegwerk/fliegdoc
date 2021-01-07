module.exports = {
	env: {
		commonjs: true,
		es2021: true,
		node: true
	},
	root: true,
	extends: ['prettier', 'eslint:recommended'],
	plugins: ['prettier'],
	parserOptions: {
		ecmaVersion: 12
	},
	rules: {
		'prettier/prettier': 'warn'
	}
};
