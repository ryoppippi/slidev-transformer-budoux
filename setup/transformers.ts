import { defineTransformersSetup } from '@slidev/types';
import { budouxCodeblock } from '../src/index.js';

export default defineTransformersSetup(() => {
	return {
		pre: [],
		preCodeblock: [budouxCodeblock('ja')], // set the default language (optional
		postCodeblock: [],
		post: [],
	};
});
