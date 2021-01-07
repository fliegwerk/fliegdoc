#!/usr/bin/env node

'use strict';

const {
	buildStatic,
	buildTreeForConfig,
	setConfig,
	serveDynamic,
	serveStatic
} = require('../build');

const cl = require('colorette');

const yargs = require('yargs');
const path = require('path');
const { cosmiconfigSync } = require('cosmiconfig');

const { config, filepath } = cosmiconfigSync('fliegdoc').search();

setConfig(config, path.dirname(filepath));

process.on('unhandledRejection', err => {
	console.error(err);
	process.exit(1);
});

yargs
	.scriptName('fliegdoc')
	.epilog('Get help for individual commands by running $0 <command> --help')
	.alias('v', 'version')
	.usage('Usage: $0 [command] [options]')
	.command(
		['$0 [options]', 'build [options]', 'b [options]'],
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
					describe: 'The port on which the documentation gets hosted'
				});
		},
		async args => {
			console.info('Parsing source files');
			const tree = buildTreeForConfig();
			console.info(
				`${cl.green('Success!')} Source files have been parsed successfully.`
			);
			console.info('Converting trees to doc pages');
			await buildStatic(tree);
			console.info(
				`${cl.green('Success!')} Docs pages were created successfully.`
			);

			if (args['serve']) {
				console.info('Serving the built documentation');
				serveStatic(args['port']);
			}
		}
	)
	.command(
		['serve [options]', 's [options]'],
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
			console.info('Parsing source files');
			const tree = buildTreeForConfig();
			console.info(
				`${cl.green('Success!')} Source files have been parsed successfully.`
			);
			console.info('Serving the built documentation');
			serveDynamic(tree, args['port']);
		}
	)
	.help()
	.demandCommand()
	.completion()
	.parse();
