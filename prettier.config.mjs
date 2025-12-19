/** @type {import("prettier").Config} */
export default {
	printWidth: 100,
	semi: true,
	singleQuote: true,
	tabWidth: 2,
	trailingComma: 'all',
	useTabs: true,
	plugins: [
		'prettier-plugin-tailwindcss',
		'prettier-plugin-organize-imports',
	],

	tailwindStylesheet: './src/app/globals.css',
	tailwindFunctions: ['clsx', 'tv', 'cn'],

	overrides: [
		{
			files: ['.*', '*.md', '*.toml', '*.yml'],
			options: {
				useTabs: false,
			},
		},

	],
};
