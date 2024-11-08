import { defineStore } from 'pinia';

import { Nullable } from '@/types/nullable';
import { RouteLocation, RouteLocationRaw, RouteLocationNormalized } from 'vue-router';
import { Auth0Client, Auth0ClientOptions, createAuth0Client } from '@auth0/auth0-spa-js';
import { useTypedStorage } from '@composables/useTypedStorage';
import { User } from '@/types/auth0/user';
import { useConfigurationsStore } from '@/stores/configuration';
import { usePermissionsStore } from '@/stores/permissions';
import { useLocaleStore } from '@/stores/locale';
import { useUserStore } from '@/stores/user';
import { useRouterStore } from '@/stores/router';
import { ConfigurationType } from '@/types/configurations';
export interface IAuthStoreState {
	accessToken: Nullable<string>;
	isAuthenticated: boolean;
}
const defaultData: IAuthStoreState = {
	accessToken: null,
	isAuthenticated: false,
};

export const useAuthStore = defineStore('AuthStore', {
	state: () => {
		return {
			data: useTypedStorage<IAuthStoreState>('authData', defaultData),
			authService: null as Nullable<Auth0Client>,
		};
	},
	actions: {
		async isLogged(): Promise<boolean> {
			try {
				const isAuthenticated = await this.authService?.isAuthenticated();
				if (isAuthenticated) return true;
				const token = await this.getToken();
				return !!token;
			} catch (error) {
				return false;
			}
		},
		async renewToken(): Promise<string | undefined> {
			try {
				const configurationsStore = useConfigurationsStore();

				const token = await this.authService?.getTokenSilently({
					timeoutInSeconds: configurationsStore?.configurations?.authentication?.timeoutInSeconds ?? 1,
					cacheMode: 'off',
				});
				if (!token) return undefined;
				this.data.accessToken = token;
				const permissionsStore = usePermissionsStore();
				permissionsStore.setPermissions(token);

				return token;
			} catch (error) {
				return undefined;
			}
		},
		isAccessTokenExpired(token?: Nullable<string>): boolean {
			if (!token) return true;
			const jwt = JSON.parse(atob(token.split('.')[1]));
			const exp = jwt.exp;
			const now = Date.now() / 1000;
			return now > exp;
		},
		async getToken(): Promise<string | undefined> {
			try {
				if (!this.isAccessTokenExpired(this.data?.accessToken)) return this.data.accessToken as string;

				const configurationsStore = useConfigurationsStore();

				const token = await this.authService?.getTokenSilently({
					timeoutInSeconds: configurationsStore?.configurations?.authentication?.timeoutInSeconds ?? 1,
				});
				if (!token) return undefined;
				this.data.accessToken = token;
				const permissionsStore = usePermissionsStore();
				permissionsStore.setPermissions(token);

				return token;
			} catch (error) {
				return undefined;
			}
		},
		getUserData(): Nullable<User> {
			const token = this.data.accessToken;
			if (!token) return null;
			const userData = JSON.parse(atob(token.split('.')[1])) as User;
			return userData;
		},
		async login(): Promise<boolean> {
			try {
				const localeStore = useLocaleStore();
				if (!this.authService) return false;
				await this.authService?.loginWithRedirect({
					authorizationParams: {
						ui_locales: localeStore.currentLocale.locale,
						redirect_uri: `${window.location.origin}/login/callback`,
					},
				});
				return true;
			} catch (error) {
				console.error(error);
				return false;
			}
		},
		async logout(): Promise<boolean> {
			try {
				const router = useRouter();
				if (!this.authService) return false;
				this.clearData();
				const permissionsStore = usePermissionsStore();
				const userStore = useUserStore();
				permissionsStore.clearData();
				userStore.clearData();
				this.data.isAuthenticated = false;
				await this.authService?.logout({
					logoutParams: {
						returnTo: `${window.location.origin}/login`,
						federated: false,
					},
				});
				await router.push({ name: '/login' });
				return true;
			} catch (error) {
				console.error(error);
				return false;
			}
		},
		clearData() {
			if (!this.data) this.data = defaultData;
			this.data.accessToken = null;
			const userStore = useUserStore();
			userStore.clearData();
		},
		getUserHomeRoute(): RouteLocation | RouteLocationRaw | RouteLocationNormalized | string {
			if (!this.authService?.isAuthenticated) return { name: '/login' };
			const routeStore = useRouterStore();
			if (routeStore.lastRoute) return routeStore.lastRoute;
			return { name: '/apis' };
		},
		async bootstrapAuthService(configurations: ConfigurationType) {
			const authOptions = {
				domain: configurations?.authentication?.domain ?? import.meta.env.VITE_APP_AUTH_URL,
				clientId: configurations?.authentication?.clientId ?? import.meta.env.VITE_APP_AUTH_CLIENT_ID,
				authorizationParams: {
					scope: (configurations?.authentication?.scope ?? import.meta.env.VITE_APP_AUTH_SCOPE) || '',
					redirect_uri: `${window.location.origin}/login/callback`,
					cacheLocation: 'localstorage',
					audience:
						(configurations?.authentication?.audience ?? import.meta.env.VITE_APP_AUTH_AUDIENCE) || '',
				},
			} as Auth0ClientOptions;
			this.authService = await createAuth0Client(authOptions);
		},
	},
});
