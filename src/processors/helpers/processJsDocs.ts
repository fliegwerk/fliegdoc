import {
	JSDoc,
	JSDocStructure,
	JSDocTagStructure,
	OptionalKind
} from 'ts-morph';

/**
 * Extracts tags from JSDocs array
 *
 * @param docs - the JSDoc array
 * @returns the doc tags and description
 * @example
 * ```ts
 * processJsDocs(node.getJsDocs())
 * ```
 */
export function processJsDocs(
	docs: JSDoc[]
): (OptionalKind<JSDocStructure> | string)[] {
	return docs.map(d => {
		const lines = d.getInnerText().split('\n');
		let inCode = false;

		const tags = [];

		let currentTag: { tagName: string; text: string } | undefined = undefined;

		for (let line of lines) {
			if (!inCode && line.startsWith('@')) {
				tags.push(currentTag);
				currentTag = {
					text: '',
					tagName: line.split(' ')[0]
				};
				line = line.split(' ').slice(1, line.split(' ').length).join(' ');
			}

			if (line.startsWith('```')) {
				inCode = !inCode;
			}

			if (currentTag) currentTag.text += line + '\n';
		}

		tags.push(currentTag);

		return {
			description: d.getDescription(),
			tags: tags.filter(t => t) as JSDocTagStructure[]
		};
	});
}
