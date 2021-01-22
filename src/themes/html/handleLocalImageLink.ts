import { FliegdocConfig } from '../../model';
import path from 'path';
import fs from 'fs';

/**
 * Converts a local Markdown image link and adds the necessary files to the `staticFiles` list
 *
 * Images get put into the `./assets` folder of the output.
 *
 * @param altText - the image's alt text
 * @param link - the original link to the image
 * @param staticFiles - the static files list. Assets get added here to later get written using {@link writeStaticFiles}
 * @param config - the {@link FliegdocConfig}
 * @returns the new, replaced, markdown section creating the image.
 *
 * @example
 * ```ts
 * const readmeImageReplacer = (orig: string, altText: string, link: string) => {
 *   // handle images
 *   if (link.startsWith('http://') || link.startsWith('https://')) {
 *     // global link => can stay as it is
 *     return orig;
 *   } else {
 *     // image exists and should get copied to the output
 *     return handleLocalImageLink(config, link, staticFiles, altText);
 *   }
 * };
 * ```
 */
export function handleLocalImageLink(
	altText: string,
	link: string,
	staticFiles: Record<string, string>,
	config: FliegdocConfig
): string {
	const origPath = path.resolve(path.dirname(config.readme), link);
	if (fs.existsSync(origPath)) {
		staticFiles[origPath] = `./assets/${Date.now()}.${path.extname(origPath)}`;
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
