/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import '@/styles/settings.scss';
// Composables
import { createVuetify } from 'vuetify';

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
	theme: {
		defaultTheme: 'dark',
		themes: {
			dark: {
				colors: {
					background: '#121212',
					surface: '#222',
					secondary: 'var(--app-secondary)',
					primary: 'var(--app-primary)',
				},
			},
			light: {
				colors: {
					secondary: 'var(--app-secondary)',
					primary: 'var(--app-primary)',
				},
			},
		},
	},
	defaults: {
		VAutocomplete: {
			variant: 'outlined',
			color: 'purple',
		},
		VTextField: {
			variant: 'outlined',
			color: 'purple',
		},
		VBtn: {
			variant: 'outlined',
		},
	},
});
