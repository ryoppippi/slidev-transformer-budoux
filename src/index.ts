import type { MarkdownTransformContext } from '@slidev/types';
import type { MagicString } from 'vue/compiler-sfc';

import { type Language, getParser, languages } from './get-budoux.js';

function replaceTagContent(
	ms: MagicString,
	tagName: string,
	processFunc: (content: string) => string,
): MagicString {
	const regex = new RegExp(`<${tagName}>(.*?)<\/${tagName}>`, 'g');
	ms.replaceAll(regex, (_, content: string) => processFunc(content));
	return ms;
}

/**
 * Budoux codeblock transformer
 *
 * add a `budoux` tag to your markdown to enable Budoux translation
 *
 * # Setup
 *
 * @see https://sli.dev/custom/config-transformers
 * ```ts
 * import { budouxCodeblock } from '@ryoppippi/slidev-transformer-budoux'
 * import { defineTransformersSetup } from '@slidev/types'
 *
 * export default defineTransformersSetup(() => {
 * export default defineTransformersSetup(() => {
 *  return {
 *    pre: [],
 *    preCodeblock: [budouxCodeblock("ja")], // set the default language (optional)
 *    postCodeblock: [],
 *    post: [],
 *  }
 * })
 * ```
 *
 * # Usage
 *
 * ```markdown
 * <budoux> こんにちは、世界！ </budoux>
 * <budoux-ja> こんにちは、世界！ </budoux-ja>
 * <budoux-cs> 你好世界！ </budoux-cs>
 * <budoux-ct> 你好世界！ </budoux-ct>
 * <budoux-th> สวัสดีโลก！ </budoux-th>
 * ```
 *
 * @param defaultLanguage Default language
 */
export function budouxCodeblock(
	defaultLanguage: Language = 'ja',
): (ctx: MarkdownTransformContext) => void {
	return (ctx: MarkdownTransformContext) => {
		if (!ctx.s.toString().includes('budoux')) {
			return;
		}

		/* Replace the content of the budoux tags */
		languages.forEach((lang) => {
			const parser = getParser(lang);
			replaceTagContent(
				ctx.s,
				`budoux-${lang}`,
				(content) => {
					return parser.translateHTMLString(content);
				},
			);
		});

		/* Replace the content of the default budoux tags */
		replaceTagContent(
			ctx.s,
			'budoux',
			(content) => {
				return getParser(defaultLanguage).translateHTMLString(content);
			},
		);
	};
}
