module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react-hooks/recommended",
	],
	ignorePatterns: ["dist", ".eslintrc.cjs"],
	parser: "@typescript-eslint/parser",
	plugins: ["react-refresh"],
	rules: {
		"indent": [4, "tab"],
		// "no-tabs": 0,
		"react-refresh/only-export-components": [
			"warn",
			{ allowConstantExport: true },
		],
		"quotes": [2, "single", { "avoidEscape": true, "allowTemplateLiterals": true }],
		"@typescript-eslint/no-unused-vars": "off",
		"sort-imports": [
			"error",
			{
				"ignoreCase": true,
				"ignoreDeclarationSort": true,
				"ignoreMemberSort": true,
				"memberSyntaxSortOrder": [
					"none",
					"all",
					"single",
					"multiple"
				]
			}
		]
	},
};
