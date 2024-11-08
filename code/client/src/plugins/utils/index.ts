import { App, DirectiveBinding } from 'vue';
export default {
	install: (app: App) => {
		app.config.globalProperties.$utils = {
			// Create utils here case needed
		};
		app.directive('background-color', (el, binding: DirectiveBinding) => {
			el.style.backgroundColor = binding.value;
		});
		app.directive('fill-height', (el, binding: DirectiveBinding) => {
			el.style.height = '100vh !important';
		});
		app.directive('fill-parent', (el, binding: DirectiveBinding) => {
			el.className += ' fill-height ma-0';
		});
		app.directive('color', (el, binding: DirectiveBinding) => {
			el.style.color = binding.value;
		});
		app.directive('width', (el, binding: DirectiveBinding) => {
			el.style.width = binding.value;
		});
		app.directive('height', (el, binding: DirectiveBinding) => {
			el.style.height = binding.value;
		});
		app.directive('cursor', (el, binding: DirectiveBinding) => {
			el.style.cursor = binding.value;
		});
	},
};
