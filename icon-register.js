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
		},

		inline: Boolean
	},
	inject: {
		svgLayer: {
			from: svgLayer,
			default: () => {
				throw new Error('IconLayer not found. Make sure the App is wrapped with the IconLayer');
			}
		}
	},
	render(h, ctx) {
		const {svgLayer} = ctx.injections;
		const [child] = ctx.children;
		const {props} = ctx;

		if (props.inline) {
			return child;
		}

		const id = svgLayer.register(props.id, child);

		ctx.parent.$once('hook:destroyed', () => svgLayer.unregister(id));

		return h(props.el, ctx.data, [
			h('use', {
				attrs: {href: `#${id}`}
			})
		]);
	}
};

export default IconRegister;
