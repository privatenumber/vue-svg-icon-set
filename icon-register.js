import svgLayer from './key';

export default {
	name: 'icon-register',
	functional: true,
	props: {
		id: {
			type: String,
			required: true,
		},
	},
	inject: {
		svgLayer,
	},
	render(h, ctx) {
		const id = ctx.injections.svgLayer.register(ctx.props.id, ctx.children[0]);
		return h('svg', [h('use', { attrs: { 'xlink:href': `#${id}` }})]);
	},
};
