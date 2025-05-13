import RolesEnum from '@/enums/auth/roles';
import { useAuthStore } from '@/stores/auth';
import { useConfigurationsStore } from '@/stores/configuration';
import { usePermissionsStore } from '@/stores/permissions';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

export declare type NavigationGuardOption = {
	requiresAuth?: boolean;
	authorizedRoles?: RolesEnum[];
};
async function canNavigateTo(
	to: RouteLocationNormalized,
	from: RouteLocationNormalized,
	options: NavigationGuardOption,
): Promise<boolean> {
	const authStore = useAuthStore();
	if (!authStore.authService) {
		const configurationsStore = useConfigurationsStore();
		const configurations = configurationsStore.configurations;
		await authStore.bootstrapAuthService(configurations);
		return await canNavigateTo(to, from, options);
	}
	const permissionsStore = usePermissionsStore();
	const userPermissions = permissionsStore.get();
	if (!options.requiresAuth) return true;
	const isAuthenticated = authStore.isLogged();
	if (!isAuthenticated) return false;
	const authorizedRoles: RolesEnum[] = options.authorizedRoles ?? [];
	if (!authorizedRoles || authorizedRoles.length === 0) return true;
	if (!userPermissions) return false;

	return userPermissions.some(permission => authorizedRoles.includes(permission));
}
export function useNavigationGuard(options?: NavigationGuardOption) {
	return async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
		let persistedOptions = options ?? {
			requiresAuth: true,
			authorizedRoles: [],
		};
		const authStore = useAuthStore();
		const canNavigate = await canNavigateTo(to, from, persistedOptions);
		if (!canNavigate && authStore.data.isAuthenticated)
			return next({ name: '/forbidden', params: { to: to.fullPath } });
		if (!canNavigate && !authStore.data.isAuthenticated) return next({ name: '/login' });

		return next();
	};
}
