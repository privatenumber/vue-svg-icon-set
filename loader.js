const loaderUtils = require('loader-utils');
const path = require('path');
const kebabCase = require('lodash/kebabCase');
const IconRegister = require.resolve('./icon-register');

function generateId(resourcePath) {
	const [resourceName] = path.basename(resourcePath).split('.');
	return kebabCase(resourceName);
}

module.exports = function (svgStr) {
	const options = loaderUtils.getOptions(this) || {};
	const { resourcePath } = this;
	const id = (options.generateId || generateId)(resourcePath);
	const { svgComponentPath } = options;

	// TODO: transpile svg to symbol
	// TODO: replace color with currentColor
	// TODO: assert that svgStr is a symbol tag

	const components = { IconRegister };
	if (svgComponentPath) {
		components.SvgComp = svgComponentPath;
	}

	const imprtStmts = Object.entries(components)
		.map(([name, path]) => `import ${name} from '${path}';`)
		.join('');

	return `
<template><icon-register id="${id}" :el="$options.components.SvgComp">${svgStr}</icon-register></template>
<script>
${imprtStmts}
export default { components: { ${Object.keys(components)} } };
</script>
`;
};
