const iconRegisterPath = require.resolve('./icon-register');

module.exports = (svgStr) => {
	const id = 'hello-world';

	// TODO: generate ID from file name, overrideable via WP options
	// TODO: transpile svg to symbol
	// TODO: replace color with currentColor

	return `
<template><icon-register id="${id}">${svgStr}</icon-register></template>
<script>
import IconRegister from '${iconRegisterPath}';
export default { components: { IconRegister } };
</script>
`;
};
