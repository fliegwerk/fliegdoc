import { FliegdocConfig } from '../../model';
import path from 'path';
import * as fsp from 'fs-extra';

/**
 * Copy static files to the output
 *
 * @param staticFiles - map of static files, where `staticFiles[original path] = target path`
 * @param createFile - the {@link CreateFileFunction}
 * @param config - the {@link FliegdocConfig}
 * @example
 * ```ts
 * const {staticFiles, readmeImageReplacer} = getStaticFileHandler(config);
 *
 * write('readme', readmeContent.replace(/!\[(.*?)]\((.*?)\)/g, readmeImageReplacer));
 * await writeStaticFiles(staticFiles, createFile, Config);
 * ```
 */
export async function writeStaticFiles(
	staticFiles: Record<string, string>,
	createFile: (
		path: string,
		content: Buffer,
		mimetype: string
	) => Promise<void>,
	config: FliegdocConfig
): Promise<void> {
	for (const origPath in staticFiles) {
		if (Object.prototype.hasOwnProperty.call(staticFiles, origPath)) {
			await createFile(
				path.join(config.outDir, staticFiles[origPath]),
				await fsp.readFile(origPath),
				path.extname(origPath)
			);
		}
	}
}
