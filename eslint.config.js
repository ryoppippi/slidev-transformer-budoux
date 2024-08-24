import { ryoppippi } from '@ryoppippi/eslint-config';

export default ryoppippi({
	type: 'lib',
	tailwind: false,
	svelte: false,
	typescript: {
		tsconfigPath: './tsconfig.json',
	},
});
