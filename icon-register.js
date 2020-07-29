import svgLayer from './key';

const IconRegister = {
	functional: true,
	props: {
		id: {
			type: String,
			required: true
		},

		// To support custom SVG components
		el: {
			type: null,
			default: 'svg'
		}
	},
	inject: {
		svgLayer
	},
	render(h, ctx) {
		const id = ctx.injections.svgLayer.register(ctx.props.id, ctx.children[0]);
		return h(ctx.props.el, ctx.data, [
			h('use', {
				attrs: {href: `#${id}`}
			})
		]);
	}
};

export default IconRegister;
