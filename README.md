# slidev-transformer-budoux

[![JSR](https://jsr.io/badges/@ryoppippi/slidev-transformer-budoux)](https://jsr.io/@ryoppippi/slidev-transformer-budoux)
[![JSR](https://jsr.io/badges/@ryoppippi/slidev-transformer-budoux/score)](https://jsr.io/@ryoppippi/slidev-transformer-budoux)

A Slidev transformer that integrates BudouX for improved text wrapping in Japanese, Simplified Chinese, Traditional Chinese, and Thai languages.

## Features

- Supports automatic line breaking for:
  - Japanese (ja)
  - Simplified Chinese (cs)
  - Traditional Chinese (ct)
  - Thai (th)
- Easy integration with Slidev
- Customizable default language

## Installation

```bash
npx jsr add @ryoppippi/slidev-transformer-budoux
```

## Setup

Add the transformer to your Slidev setup file:

```ts
// setup/transformers.ts
import { budouxCodeblock } from '@ryoppippi/slidev-transformer-budoux';
import { defineTransformersSetup } from '@slidev/types';

export default defineTransformersSetup(() => {
	return {
		pre: [],
		preCodeblock: [budouxCodeblock('ja')], // Set the default language (optional)
		postCodeblock: [],
		post: [],
	};
});
```

## Usage

In your Slidev markdown files, use the `<budoux>` tag or language-specific tags:

```markdown
<budoux>こんにちは、世界！</budoux>
<budoux-ja>こんにちは、世界！</budoux-ja>
<budoux-cs>你好世界！</budoux-cs>
<budoux-ct>你好世界！</budoux-ct>
<budoux-th>สวัสดีโลก！</budoux-th>
```

## API

### `budouxCodeblock(defaultLanguage?: Language)`

Creates a transformer function for Slidev.

- `defaultLanguage`: Optional. Sets the default language for `<budoux>` tags. Defaults to 'ja'.

## Supported Languages

- Japanese (ja)
- Simplified Chinese (cs)
- Traditional Chinese (ct)
- Thai (th)

## License

[ MIT ](./LICENSE)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgements

This project uses [BudouX](https://github.com/google/budoux) for text segmentation.
