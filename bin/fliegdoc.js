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
const util = require('util');
const path = require('path');
const fs = require('fs');
const { cosmiconfigSync } = require('cosmiconfig');
const qu = require('enquirer');

const { config, filepath } = cosmiconfigSync('fliegdoc').search() || {
	config: undefined,
	filepath: undefined
};

if (config) setConfig(config, path.dirname(filepath));

process.on('unhandledRejection', err => {
	console.error(err);
	process.exit(1);
});

const newConfigFilePath = path.join(process.cwd(), 'fliegdoc.config.js');

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
	.command(
		['init', 'i'],
		'Initialize a fliegdoc configuration',
		yargs =>
			yargs.check(() => {
				if (fs.existsSync(newConfigFilePath))
					throw new Error(
						'The config file already exists: ' + newConfigFilePath
					);
				return true;
			}),
		async () => {
			const answers = await qu.prompt([
				{
					name: 'title',
					type: 'text',
					required: true,
					message: 'Project title'
				},
				{
					name: 'readme',
					type: 'text',
					required: true,
					message: "Path to the project's README.md file",
					initial: './README.md'
				},
				{
					name: 'outDir',
					type: 'text',
					required: true,
					message: 'Path to which the documentation gets generated',
					initial: './docs'
				},
				{
					name: 'baseUrl',
					type: 'text',
					required: true,
					message: 'Base URL of the documentation, when hosted on a server',
					initial: '/'
				},
				{
					name: 'hidePrivateMembers',
					type: 'confirm',
					initial: true,
					message: 'Hide private class members in the documentation?'
				}
			]);

			answers['externalLinks'] = {};

			while (
				await new qu.Confirm({
					name: 'addExternalLink',
					type: 'confirm',
					initial: 'false',
					message:
						'Do you want to add another external link to the documentation?'
				}).run()
			) {
				const newExternalLink = await new qu.Form({
					name: 'newExternalLink',
					message: 'Please specify the details of the external link',
					choices: [
						{
							name: 'key',
							message: 'Link Label'
						},
						{
							name: 'value',
							message: 'Link'
						}
					]
				}).run();

				answers.externalLinks[newExternalLink['key']] =
					newExternalLink['value'];

				console.log('Link added successfully');
			}

			answers['modules'] = [];

			do {
				const newModule = await new qu.Form({
					name: 'newModule',
					message: 'Please specify the details of the module',
					choices: [
						{
							name: 'tsconfig',
							initial: './tsconfig.json',
							message:
								'tsconfig.json location, relative to the current working directory'
						},
						{
							name: 'package',
							initial: './package.json',
							message:
								'package.json location, relative to the current working directory'
						},
						{
							name: 'mainFile',
							initial: 'main.ts',
							message:
								"the package's main file, relative to the sources configured in the tsconfig.json"
						}
					]
				}).run();

				answers.modules.push(newModule);

				console.log('Module added successfully');
			} while (
				await new qu.Confirm({
					name: 'addModule',
					type: 'confirm',
					initial: 'false',
					message:
						'Do you want to add another module? You can add an arbitrary amount of modules!'
				}).run()
			);

			answers['baseUrl'] = answers['baseUrl'].endsWith('/')
				? answers['baseUrl']
				: answers['baseUrl'] + '/';

			let configString = util.inspect(answers, false, 5, false);
			console.info(configString);
			configString =
				'// Generated using fliegdoc init\nmodule.exports = ' + configString;
			fs.writeFileSync(newConfigFilePath, configString);
		}
	)
	.help()
	.demandCommand()
	.completion()
	.parse();
