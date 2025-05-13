// Plugins
import vuetify from '@plugins/vuetify';
import { createPinia } from 'pinia';
import { loadFonts } from '@plugins/webfontloader';
import router from '@router';
import utils from '@plugins/utils';
import i18n from '@plugins/i18n';
// Types
import type { App } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useConfigurationsStore } from '@/stores/configuration';
export async function registerPlugins(app: App) {
	app.use(loadFonts);
	app.use(utils);
	app.use(i18n);
	const pinia = createPinia();

	pinia.use(async ({ store }) => {
		store.router = markRaw(router);
	});
	app.use(pinia);
	app.use(vuetify);
	app.use(router);
	const configurationsStore = useConfigurationsStore();
	await configurationsStore.loadConfiguration();
	const authStore = useAuthStore();
	await authStore.bootstrapAuthService(configurationsStore.configurations);
}
