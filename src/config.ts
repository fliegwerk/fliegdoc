import * as path from 'path';
import { FliegdocConfig } from './model/fliegdoc-config';

export const CONFIG: FliegdocConfig = {
	modules: [
		{
			package: path.resolve(
				'C:\\Users\\pablo\\GitHub\\telestion-client\\packages\\telestion-client-core',
				'package.json'
			),
			tsconfig: path.resolve(
				'C:\\Users\\pablo\\GitHub\\telestion-client\\packages\\telestion-client-core',
				'tsconfig.json'
			),
			mainFile: 'index.ts'
		},
		{
			package: path.resolve(
				'C:\\Users\\pablo\\GitHub\\telestion-client\\packages\\vertx-event-bus',
				'package.json'
			),
			tsconfig: path.resolve(
				'C:\\Users\\pablo\\GitHub\\telestion-client\\packages\\vertx-event-bus',
				'tsconfig.json'
			),
			mainFile: 'index.ts'
		},
		{
			package: path.resolve(
				'C:\\Users\\pablo\\GitHub\\telestion-client\\packages\\telestion-client-types',
				'package.json'
			),
			tsconfig: path.resolve(
				'C:\\Users\\pablo\\GitHub\\telestion-client\\packages\\telestion-client-types',
				'tsconfig.json'
			),
			mainFile: 'index.ts'
		}
	],
	readme: path.resolve(
		'C:\\Users\\pablo\\GitHub\\telestion-client',
		'README.md'
	)
};
