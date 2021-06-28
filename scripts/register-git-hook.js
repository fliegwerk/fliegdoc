/* eslint-disable @typescript-eslint/no-var-requires */
const util = require('util');
const child_process = require('child_process');
const fs = require('fs');
const path = require('path');

const exec = util.promisify(child_process.exec);

/**
 * Run the code
 *
 * @example
 * ```ts
 * run();
 * ```
 */
async function run() {
	try {
		const gitRoot = (await exec('git rev-parse --show-toplevel')).stdout.trim();
		let hooksFolder = path.join(gitRoot, '.git', 'hooks');

		if (!fs.existsSync(hooksFolder)) {
			fs.mkdirSync(hooksFolder);
		}

		const relativePath = path
			.relative(gitRoot, path.join(__dirname, '..'))
			.split('\\')
			.join('/');

		const preCommitPath = path.join(hooksFolder, 'pre-commit');
		if (!fs.existsSync(preCommitPath)) {
			fs.writeFileSync(
				preCommitPath,
				`#!/bin/sh\nnpx pretty-quick --staged --pattern "${
					relativePath ? relativePath + '/' : ''
				}**/*"`
			);
		}
	} catch (e) {
		// fail silently
		console.log('fail silently :P');
	}
}

run();
