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

export default {
	name: 'icons-layer',

	inheritAttrs: false,

	components: {
		RenderVnode: {
			render() {
				return this.$attrs.vnode;
			},
		},
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
		const vm = this;
		return {
			[svgLayer]: {
				register(id, vnode) {
					const registeredId = vm.namespace + id;
					vm.$set(
						vm.icons,
						registeredId,
						vnode,
					);
					return registeredId;
				},
			},
		};
	},

	data() {
		return {
			icons: {},
		};
	},
};
</script>