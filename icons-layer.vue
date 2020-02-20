<template>
	<div>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			v-show="false"
		>
			<template v-for="(icon, id) in icons">
				<component
					:id="id"
					:is="icon"
				/>
			</template>
		</svg>
		<slot />
	</div>
</template>

<script>
import svgLayer from './key';

export default {
	name: 'icons-layer',

	props: {
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
						{ render: () => vnode },
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