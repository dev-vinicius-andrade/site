import { Nullable } from '@/types/nullable';

import { defineStore } from 'pinia';
import { RouteLocationNormalizedGeneric } from 'vue-router';

export const useRouterStore = defineStore('RouterStore', {
	state: () => ({
		lastRoute: useTypedStorage<Nullable<RouteLocationNormalizedGeneric>>('lastRoute', null),
	}),
	actions: {
		set(lastRoute: Nullable<RouteLocationNormalizedGeneric>) {
			this.lastRoute = lastRoute;
		},
	},
});
