// Composables
import { useAuthStore } from '@/stores/auth';
import { useRouterStore } from '@/stores/router';

import { createRouter, createWebHistory } from 'vue-router';
const routes = {
	authorized: useImportRoutes(import.meta.glob('@router/routes/authorized/**/*.*s', { eager: true })),
	unauthorized: useImportRoutes(import.meta.glob('@router/routes/unauthorized/**/*.*s', { eager: true })),
};
const router = createRouter({
	history: createWebHistory('/'),
	routes: [
		{
			path: '/',
			component: () => import('@layouts/Default.vue'),
			children: [...routes.authorized, ...routes.unauthorized],
		},
	],
});
router.afterEach(async (to, from) => {
	const routeStore = useRouterStore();
	const authStore = useAuthStore();
	if (!authStore.data.isAuthenticated) return;
	if (to.path === '/') to;
	routeStore.set(to);

	routeStore.lastRoute;
});
export default router;
