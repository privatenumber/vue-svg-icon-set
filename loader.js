const assert = require('assert');
const loaderUtils = require('loader-utils');
const path = require('path');
const kebabCase = require('lodash/kebabCase');
const cheerio = require('cheerio');
const IconRegister = require.resolve('./icon-register');

function getDimensions($svg) {
	const width = Number.parseInt($svg.attr('width'), 10);
	const height = Number.parseInt($svg.attr('height'), 10);

	if (Number.isNaN(width) || Number.isNaN(height)) {
		return null;
	}

	return {width, height};
}

function getViewbox($svg) {
	const viewBox = $svg.attr('viewBox');
	if (!viewBox) {
		return {};
	}

	const [width, height] = viewBox.split(' ').slice(2);
	return {width, height};
}

const utils = {
	kebabBaseName(resourcePath) {
		const [resourceBaseName] = path.basename(resourcePath).split('.');
		return kebabCase(resourceBaseName);
	}
};

const idTracker = {};

module.exports = function (svgString) {
	const options = loaderUtils.getOptions(this) || {};
	const id = (options.generateId || utils.kebabBaseName).call(utils, this.resourcePath);

	assert(typeof id === 'string' && id, `There was no string ID generated for file "${this.resourcePath}"`);

	if (idTracker[id]) {
		assert(idTracker[id] === this.resourcePath, `ID collision detected between "${this.resourcePath}" and "${idTracker[id]}"`);
	} else {
		idTracker[id] = this.resourcePath;
	}

	const {svgComponentPath} = options;

	const components = {IconRegister};
	if (svgComponentPath) {
		components.SvgComp = svgComponentPath;
	}

	const imprtStmts = Object.entries(components)
		.map(([name, path]) => `import ${name} from '${path}';`)
		.join('');

	const $ = cheerio.load(svgString, {xmlMode: true});
	const $svg = $('svg');

	const {width = '', height = ''} = getDimensions($svg) || getViewbox($svg);

	return `
<template>
	<icon-register
		id="${id}"
		:el="$options.components.SvgComp"
		${width ? `width="${width}"` : ''}
		${height ? `height="${height}"` : ''}
		v-on="$listeners"
	>${svgString}</icon-register>
</template>

<script>
${imprtStmts}
export default { components: { ${Object.keys(components)} } };
</script>
`;
};
