import svgLayer from './key';

export default {
	functional: true,
	props: {
		id: {
			type: String,
			required: true,
		},

		// To support custom SVG components
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
		var id = ctx.injections.svgLayer.register(ctx.props.id, ctx.children[0]);
		return h(ctx.props.el, ctx.data, [
			h('use', {
				attrs: { href: `#${id}` },
			})
		]);
	},
};
