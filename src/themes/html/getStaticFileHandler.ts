import { FliegdocConfig } from '../../model';
import path from 'path';
import fs from 'fs';

/**
 * Gets a static file record as well as a utility function for replacing images, i.e., static files
 *
 * @param config - the config
 * @returns a record of the static files as well as a replacer function for images in the README
 *
 * @see {@link writeStaticFiles}
 *
 * @example
 * ```ts
 * const {staticFiles, readmeImageReplacer} = getStaticFileHandler(config);
 *
 * write('readme', readmeContent.replace(/!\[(.*?)]\((.*?)\)/g, readmeImageReplacer));
 *
 * writeStaticFiles(staticFiles);
 * ```
 */
export function getStaticFileHandler(
	config: FliegdocConfig
): {
	staticFiles: Record<string, string>;
	readmeImageReplacer: (...args: string[]) => string;
} {
	/**
	 * Static files that need to get copied to the `outDir`, e.g., for local images
	 */
	const staticFiles: Record<string, string> = {};

	const readmeImageReplacer = (orig: string, altText: string, link: string) => {
		// handle images
		if (link.startsWith('http://') || link.startsWith('https://')) {
			// global link => can stay as it is
			return orig;
		} else {
			// image exists and should get copied to the output
			const origPath = path.resolve(path.dirname(config.readme), link);
			if (fs.existsSync(origPath)) {
				staticFiles[origPath] = `./assets/${Date.now()}.${path.extname(
					origPath
				)}`;
				return `![${altText}](${staticFiles[origPath]})`;
			} else {
				// Image file was not found in the file system => remove in output
				console.warn(
					'Static file ' +
						link +
						' from README does not exist, removing image in output.'
				);
				return '';
			}
		}
	};
	return { staticFiles, readmeImageReplacer };
}
