import { FliegdocConfig, Tree } from '.';

/**
 * A theme configuration usable with fliegdoc.
 *
 * An object implementing this interface gets passed to {@link setConfig} in the `theme` of the {@link FliegdocConfig}.
 */
export interface Theme {
	/**
	 * Whether this theme is viewable in the browser.
	 *
	 * E.g., an HTML-theme would be browser-viewable, while a LaTeX theme wouldn't.
	 */
	isBrowserViewable: boolean;

	/**
	 * Builds the theme, by generating its output files.
	 *
	 * This must only use the `createFile` function to interact with the file system for {@link serveDynamic} to work.
	 *
	 * @param tree - the documentation-ready AST
	 * @param config - the config used for the build
	 * @param createFile - a function to create a file in the output folder
	 */
	onBuild(
		tree: Tree,
		config: FliegdocConfig,
		createFile: CreateFileFunction
	): Promise<void>;
}

/**
 * Write to a file inside the `config.outDir`, creating any parent directories, if necessary.
 *
 * @param path - the absolute path to the output file, must be inside the `config.outDir`.
 * @param content - the file's content
 * @param mimetype - the file's mime type
 *
 * @example
 * ```ts
 * createFile('index.html', 'content', 'text/html')
 * ```
 */
export type CreateFileFunction = (
	path: string,
	content: Buffer,
	mimetype: string
) => Promise<void>;
