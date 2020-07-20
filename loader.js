const loaderUtils = require('loader-utils');
const path = require('path');
const kebabCase = require('lodash/kebabCase');
const IconRegister = require.resolve('./icon-register');

const utils = {
	kebabBaseName(resourcePath) {
		const [resourceBaseName] = path.basename(resourcePath).split('.');
		return kebabCase(resourceBaseName);
	},
};

module.exports = function (svgStr) {
	const options = loaderUtils.getOptions(this) || {};
	const id = (options.generateId || utils.kebabBaseName).call(utils, this.resourcePath);

	// TODO: transpile svg to symbol
	// TODO: replace color with currentColor
	// TODO: assert that svgStr is a symbol tag
	const { svgComponentPath } = options;

	const components = { IconRegister };
	if (svgComponentPath) {
		components.SvgComp = svgComponentPath;
	}

	const imprtStmts = Object.entries(components)
		.map(([name, path]) => `import ${name} from '${path}';`)
		.join('');

// Can this be a functional component?

	return `
<template><icon-register id="${id}" :el="$options.components.SvgComp">${svgStr}</icon-register></template>
<script>
${imprtStmts}
export default { components: { ${Object.keys(components)} } };
</script>
`;
};
