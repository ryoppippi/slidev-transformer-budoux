import * as budoux from 'budoux';

/** Supported languages */
export const languages = ['ja', 'cs', 'ct', 'th'] as const;

/** Supported languages */
export type Language = typeof languages[number];

/** Parser type */
type HTMLProcessingParser = budoux.HTMLProcessingParser;

/**
  Cache for the parser
  @internal
 */
const parserCache: Record<string, HTMLProcessingParser> = {};

export function getParser(
	language: Language,
): HTMLProcessingParser {
	switch (language) {
		case 'ja':
			return parserCache.ja ??= budoux.loadDefaultJapaneseParser();
		case 'cs':
			return parserCache.cs ??= budoux
				.loadDefaultSimplifiedChineseParser();
		case 'ct':
			return parserCache.ct ??= budoux
				.loadDefaultTraditionalChineseParser();
		case 'th':
			return parserCache.th ??= budoux.loadDefaultThaiParser();
		default:
      language satisfies never;
			// eslint-disable-next-line ts/restrict-template-expressions
			throw new Error(`Language ${language} is not supported`);
	}
}
