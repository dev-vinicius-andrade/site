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
	{
		path: '/admin',
		component: () => import('@layouts/Main.vue'),
		beforeEnter: useNavigationGuard({
			authorizedRoles: [Roles.ADMIN],
			requiresAuth: true,
		}),
		children: [
			{
				path: '',
				name: '/admin',
				component: () => import('@pages/admin/index.vue'),
			},
		],
	},
] as RouteRecordRaw[];
