import type { RouteRecordRaw } from 'vue-router';

import { useNavigationGuard } from '@/composables/useNavigationGuard';
import { Roles } from '@/enums/auth/roles';
export default [
	{
		path: '/account',
		component: () => import('@layouts/Blank.vue'),
		beforeEnter: useNavigationGuard({
			authorizedRoles: [Roles.USER],
			requiresAuth: true,
		}),
		children: [],
	},
] as RouteRecordRaw[];
