import svgLayer from './key';

const IconRegister = {
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

		inline: Boolean,
	},
	inject: {
		svgLayer: {
			from: svgLayer,
			default: undefined,
		},
	},
	render(h, ctx) {
		const {svgLayer} = ctx.injections;
		const [child] = ctx.children;
		const {props, data} = ctx;

		if (props.inline) {
			if (data) {
				for (const key in data) { // eslint-disable-line guard-for-in
					const value = data[key];
					if (value && typeof value === 'object') {
						child.data[key] = Object.assign(child.data[key] || {}, value);
					} else {
						child.data[key] = value;
					}
				}
			}

			return child;
		}

		if (!svgLayer) {
			throw new Error('IconLayer not found. Make sure the App is wrapped with the IconLayer');
		}

		const id = svgLayer.register(props.id, child);

		ctx.parent.$once('hook:destroyed', () => svgLayer.unregister(id));

		return h(props.el, data, [
			h('use', {
				attrs: {href: `#${id}`},
			}),
		]);
	},
};

export default IconRegister;
