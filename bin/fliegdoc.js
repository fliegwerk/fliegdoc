#!/usr/bin/env node

'use strict';

const {
	buildStatic,
	buildTreeForConfig,
	serveDynamic,
	parseOverrides,
	serveStatic
} = require('../build');

const yargs = require('yargs');
const path = require('path');
const { cosmiconfigSync } = require('cosmiconfig');

const { config, filepath } = cosmiconfigSync('fliegdoc').search();

const overrides = parseOverrides(config, path.dirname(filepath));

process.on('unhandledRejection', err => {
	console.error(err);
	throw err;
});

yargs
	.scriptName('fliegdoc')
	.usage('Usage: $0 <command> [options]')
	.command(
		['$0', 'build'],
		'Build the documentation',
		() => {},
		async args => {
			const tree = buildTreeForConfig(overrides);
			await buildStatic(tree, overrides);

			if (args['serve']) {
				serveStatic(3000, overrides);
			}
		}
	)
	.command(
		'serve [options]',
		'Preview the documentation in the browser',
		y => {
			return y.alias('a', 'abort');
		},
		args => {
			const tree = buildTreeForConfig(overrides);
			serveDynamic(tree, 3000, overrides);
		}
	)
	.help()
	.demandCommand()
	.parse();
