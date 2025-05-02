module.exports = {
	tabWidth: 2, // indent_size = 2
	useTabs: true, // indent_style = tab
	endOfLine: "lf", // end_of_line = lf
	semi: true, // default: true
	singleQuote: false, // default: false
	printWidth: 100, // default: 80
	trailingComma: "all", // FIXME es5
	bracketSpacing: true,
	overrides: [
		{
			files: "*.js",
			options: {
				parser: "flow",
			},
		},
	],
};
