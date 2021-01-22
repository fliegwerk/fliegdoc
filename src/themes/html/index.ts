import { Theme } from '../../model';
import { getStaticFileHandler } from './getStaticFileHandler';
import { writeStaticFiles } from './writeStaticFiles';
import { writeIndexFileFromREADME, writeModuleFiles } from './render';

/**
 * The default HTML theme.
 *
 * Generates individual pages, per module, and uses all configuration parameters like `config.title`.
 *
 * Rendering gets done using templates written in ETA.
 */
export const HTMLTheme: Theme = {
	isBrowserViewable: true,
	async onBuild(tree, config, createFile) {
		const { staticFiles, readmeImageReplacer } = getStaticFileHandler(config);
		await writeIndexFileFromREADME(readmeImageReplacer, tree, createFile);
		await writeStaticFiles(staticFiles, createFile, config);
		await writeModuleFiles(tree, createFile);
	}
};
