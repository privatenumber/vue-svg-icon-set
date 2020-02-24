import svgLayer from './key';

export default {
	name: 'icon-register',
	functional: true,
	props: {
		id: {
			type: String,
			required: true,
		},
		el: {
			type: null,
			default: 'svg',
		},
	},
	inject: {
		svgLayer,
	},
	render(h, ctx) {
		// TODO: Does registering this here have negative SSR implications?
		const id = ctx.injections.svgLayer.register(ctx.props.id, ctx.children[0]);
		return h(ctx.props.el, [h('use', { attrs: { 'xlink:href': `#${id}` }})]);
	},
};
