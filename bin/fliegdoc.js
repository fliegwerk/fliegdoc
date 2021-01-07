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
	.usage('Usage: $0 [command] [options] [dir]')
	.command(
		['$0 [options]', 'build [options]'],
		'Build the documentation',
		y => {
			return y
				.option('serve', {
					alias: 's',
					type: 'boolean',
					describe: 'Serve the static files after build',
					default: false
				})
				.option('port', {
					implies: ['serve'],
					alias: 'p',
					type: 'number',
					describe: 'The port on which the documentation gets hosted',
					default: 3000
				});
		},
		async args => {
			const tree = buildTreeForConfig(overrides);
			await buildStatic(tree, overrides);

			if (args['serve']) {
				serveStatic(args['port'], overrides);
			}
		}
	)
	.command(
		'serve [options]',
		'Preview the documentation in the browser',
		y => {
			return y.option('port', {
				alias: 'p',
				type: 'number',
				describe: 'The port on which the documentation gets hosted',
				default: 3000
			});
		},
		args => {
			const tree = buildTreeForConfig(overrides);
			serveDynamic(tree, args['port'], overrides);
		}
	)
	.help()
	.demandCommand()
	.parse();
