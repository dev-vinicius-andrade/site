import { RouteRecordRaw } from 'vue-router';
export function useImportRoutes(globRoutes?: Record<string, { default?: any }>): RouteRecordRaw[] {
	const routes: RouteRecordRaw[] = [];
	if (!globRoutes) return routes;
	Object.entries(globRoutes).forEach(([key, route]) => {
		if (!route?.default) return;
		routes.push(...route.default);
	});
	return routes;
}
export default useImportRoutes;
