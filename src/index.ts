import type { MarkdownTransformContext } from '@slidev/types';
import type { MagicString } from 'vue/compiler-sfc';

import { type Language, getParser } from './get-budoux.js';

/**
 * Budoux codeblock transformer
 *
 * Add a `budoux` tag to your markdown to enable Budoux translation
 *
 * # Setup
 *
 * @see https://sli.dev/custom/config-transformers
 * ```ts
 * import { budouxCodeblock } from '@ryoppippi/slidev-transformer-budoux'
 * import { defineTransformersSetup } from '@slidev/types'
 *
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

		/* Regex to match <budoux> or <budoux-lang> */
		const tagNameRegex = /<budoux(?:-([a-z]{2}))?>(.*?)<\/budoux(?:-[a-z]{2})?>/g;

		/* Replace the content of the budoux tags */
		ctx.s.replaceAll(tagNameRegex, (_, lang: Language | undefined, content: string) => {
			const language = lang ?? defaultLanguage;
			const parser = getParser(language);
			return parser.translateHTMLString(content);
		});
	};
}
