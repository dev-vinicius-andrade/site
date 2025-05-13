import type { RouteRecordRaw } from 'vue-router';
import { useRouteParamsAsProperties } from '@/composables/useRouteParamsAsProperties';

export default [
	{
		path: '',
		component: () => import('@layouts/Main.vue'),
		children: [
			{
				path: '',
				name: '/',
				props: useRouteParamsAsProperties,
				component: () => import('@pages/home/index.vue'),
			},
		],
	},
	{
		path: '/login',
		component: () => import('@layouts/Default.vue'),
		children: [
			{
				path: '',
				name: '/login',
				props: useRouteParamsAsProperties,
				component: () => import('@pages/login/index.vue'),
			},
			{
				path: 'callback',
				name: '/login/callback',
				component: () => import('@pages/login/callback/index.vue'),
			},
		],
	},
	{
		path: '/forbidden',
		component: () => import('@layouts/BlankFullscreen.vue'),
		children: [
			{
				path: '',

				children: [
					{
						path: ':to?',
						name: '/forbidden',
						props: useRouteParamsAsProperties,
						component: () => import('@pages/forbidden/index.vue'),
					},
				],
			},
		],
	},
] as RouteRecordRaw[];
