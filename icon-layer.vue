<template>
	<component
		:is="el"
		v-bind="$attrs"
		v-on="$listeners"
	>
		<svg v-show="false">
			<defs>
				<render-vnode
					v-for="(vnode, id) in icons"
					:key="id"
					:vnode="vnode"
					:id="id"
				/>
			</defs>
		</svg>
		<slot />
	</component>
</template>

<script>
import svgLayer from './key';

const RenderVnode = {
	// inherits id attribute
	props: ['vnode'],
	render() {
		return this.vnode;
	},
};

export default {
	name: 'icon-layer',

	inheritAttrs: false,

	components: {
		RenderVnode,
	},

	props: {
		el: {
			type: null,
			default: 'div',
		},
		namespace: {
			type: String,
			default: 'icon-',
		},
	},

	provide() {
		return {
			[svgLayer]: {
				register: this.register,
				unregister: this.unregister,
			},
		};
	},

	data() {
		return {
			icons: {},
            pendingRemovals: {},
		};
	},

	methods: {
		register(id, vnode) {
			var registeredId = this.namespace + id;

			if (this.pendingRemovals[registeredId]) {
				clearTimeout(this.pendingRemovals[registeredId]);
				this.pendingRemovals[registeredId] = null;
			}

			this.$set(
				this.icons,
				registeredId,
				vnode,
			);
			return registeredId;
		},

		unregister(id) {
			const timeoutId = setTimeout(() => {
				this.icons[id] = null;
				this.pendingRemovals[id] = null;
			}, 1000);

			if (this.pendingRemovals[id]) {
				clearTimeout(this.pendingRemovals[id]);
			}

			this.$set(this.pendingRemovals, id, timeoutId);
		},
	},
};
</script>