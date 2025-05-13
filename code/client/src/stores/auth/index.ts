import { defineStore } from 'pinia';

import { Nullable } from '@/types/nullable';
import { RouteLocation, RouteLocationRaw, RouteLocationNormalized } from 'vue-router';
import { createOidc } from 'oidc-spa';
import { useTypedStorage } from '@composables/useTypedStorage';
import { User } from '@/types/auth0/user';

import { usePermissionsStore } from '@/stores/permissions';
import { useLocaleStore } from '@/stores/locale';
import { useUserStore } from '@/stores/user';
import { useRouterStore } from '@/stores/router';
import { ConfigurationType } from '@/types/configurations';
import { Oidc, ParamsOfCreateOidc } from 'oidc-spa/oidc';
export interface IAuthStoreState {
	accessToken: Nullable<string>;
	isAuthenticated: boolean;
}
const defaultData: IAuthStoreState = {
	accessToken: null,
	isAuthenticated: false,
};
export declare type OidcData = {} & Record<string, unknown>;

export const useAuthStore = defineStore('AuthStore', {
	state: () => {
		return {
			data: useTypedStorage<IAuthStoreState>('authData', defaultData),
			authService: null as Nullable<Oidc<OidcData>>,
		};
	},
	actions: {
		isLogged(): boolean {
			const isAuthenticated = this.authService?.isUserLoggedIn;

			return isAuthenticated === true;
		},
		async renewToken(): Promise<string | undefined> {
			try {
				// const configurationsStore = useConfigurationsStore();
				if (!this.authService?.isUserLoggedIn) return undefined;
				await this.authService.renewTokens();
				const token = this.authService.getTokens();
				if (!token) return undefined;
				this.data.accessToken = token.accessToken;
				const permissionsStore = usePermissionsStore();
				permissionsStore.setPermissions(token.accessToken);

				return token.accessToken;
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

				// const configurationsStore = useConfigurationsStore();
				if (!this.authService?.isUserLoggedIn) return undefined;
				const token = await this.authService?.getTokens();

				if (!token) return undefined;
				this.data.accessToken = token.accessToken;
				const permissionsStore = usePermissionsStore();
				permissionsStore.setPermissions(token.accessToken);

				return token.accessToken;
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
				if (this.authService?.isUserLoggedIn) return true;
				await this.authService.login({
					doesCurrentHrefRequiresAuth: true,
					redirectUrl: `${window.location.origin}/login/callback`,
					extraQueryParams: {
						kc_locale: localeStore.currentLocale.locale,
					},
				});
				// await this.authService.loginWithRedirect({
				// 	authorizationParams: {
				// 		ui_locales: localeStore.currentLocale.locale,
				// 		redirect_uri: `${window.location.origin}/login/callback`,
				// 	},
				// });
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
				if (!this.authService?.isUserLoggedIn) return false;
				this.clearData();
				const permissionsStore = usePermissionsStore();
				const userStore = useUserStore();
				permissionsStore.clearData();
				userStore.clearData();
				this.data.isAuthenticated = false;
				await this.authService?.logout({
					redirectTo: 'specific url',
					url: `${window.location.origin}/login`,
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
			const routeStore = useRouterStore();
			const ignoredRoutesNames = ['/login', '/login/callback', '/forbidden'];
			if (routeStore.lastRoute && !ignoredRoutesNames.includes(routeStore.lastRoute.name as string))
				return routeStore.lastRoute;
			return { name: '/' };
		},
		async bootstrapAuthService(configurations: ConfigurationType) {
			const authOptions = {
				issuerUri: configurations?.authentication?.issuerUri ?? import.meta.env.VITE_APP_AUTH_ISSUER_URI,
				publicUrl: '/',
				clientId: configurations?.authentication?.clientId ?? import.meta.env.VITE_APP_AUTH_CLIENT_ID,
				authorizationParams: {
					scope: (configurations?.authentication?.scope ?? import.meta.env.VITE_APP_AUTH_SCOPE) || '',
					redirect_uri: `${window.location.origin}/login/callback`,
					cacheLocation: 'localstorage',
					// audience:
					// 	(configurations?.authentication?.audience ?? import.meta.env.VITE_APP_AUTH_AUDIENCE) || '',
				},
			} as ParamsOfCreateOidc;
			this.authService = await createOidc<OidcData>(authOptions);
			console.log('this.authService', this.authService);
		},
	},
});
