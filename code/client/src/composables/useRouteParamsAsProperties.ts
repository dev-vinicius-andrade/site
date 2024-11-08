import { RouteLocationNormalized } from 'vue-router';

export function useRouteParamsAsProperties(route: RouteLocationNormalized) {
	const { params } = route;
	return {
		...params,
	};
}
export default useRouteParamsAsProperties;
