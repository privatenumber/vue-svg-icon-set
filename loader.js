const loaderUtils = require('loader-utils');
const path = require('path');
const kebabCase = require('lodash/kebabCase');
const cheerio = require('cheerio');
const IconRegister = require.resolve('./icon-register');

function getDimensions($svg) {
	const width = parseInt($svg.attr('width'), 10);
	const height = parseInt($svg.attr('height'), 10);

	if (Number.isNaN(width) || Number.isNaN(height)) {
		return null;
	}
	return { width, height };
}

function getViewbox($svg) {
	const viewBox = $svg.attr('viewBox');
	if (!viewBox) { return {}; }
	const [width, height] = viewBox.split(' ').slice(2);
	return { width, height };
}

const utils = {
	kebabBaseName(resourcePath) {
		const [resourceBaseName] = path.basename(resourcePath).split('.');
		return kebabCase(resourceBaseName);
	},
};

module.exports = function (svgStr) {
	const options = loaderUtils.getOptions(this) || {};
	const id = (options.generateId || utils.kebabBaseName).call(utils, this.resourcePath);
	const { svgComponentPath } = options;

	const components = { IconRegister };
	if (svgComponentPath) {
		components.SvgComp = svgComponentPath;
	}

	const imprtStmts = Object.entries(components)
		.map(([name, path]) => `import ${name} from '${path}';`)
		.join('');


	// TODO maybe it can just inherit the viewbox, width, height attrs?
	const $ = cheerio.load(svgStr, { xmlMode: true });
	const $svg = $('svg');

	const { width = '', height = '' } = getDimensions($svg) || getViewbox($svg);

	return `
<template>
	<icon-register
		id="${id}"
		:el="$options.components.SvgComp"
		${width ? `width="${width}"` : ''}
		${height ? `height="${height}"` : ''}
	>${svgStr}</icon-register>
</template>

<script>
${imprtStmts}
export default { components: { ${Object.keys(components)} } };
</script>
`;
};
