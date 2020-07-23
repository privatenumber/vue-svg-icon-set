<template>
	<component
		:is="el"
		v-bind="$attrs"
		v-on="$listeners"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			v-show="false"
		>
			<render-vnode
				v-for="(vnode, id) in icons"
				:key="id"
				:vnode="vnode"
				:id="id"
			/>
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
	name: 'icons-layer',

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
			},
		};
	},

	data() {
		return {
			icons: {},
		};
	},

	methods: {
		register(id, vnode) {
			var registeredId = this.namespace + id;
			this.$set(
				this.icons,
				registeredId,
				vnode,
			);
			return registeredId;
		},
	},
};
</script>