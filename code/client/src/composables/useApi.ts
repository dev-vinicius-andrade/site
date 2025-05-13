import { SitePresentationApiApi } from '@/services/api';
import { useApiBuilderOf, useUrlBuilder, useAxiosBearerTokenInterceptorAsync } from '@/services/api/composables';
import { useAuthStore } from '@/stores/auth';
import { useConfigurationsStore } from '@/stores/configuration';

export async function useApi() {
	const configurationsStore = useConfigurationsStore();
	const configurations = configurationsStore.configurations;
	const axiosAuthenticationBearerInterceptor = () => {
		const authStore = useAuthStore();
		return useAxiosBearerTokenInterceptorAsync(async () => {
			const token = await authStore.getToken();
			const isAuthenticated = authStore.isLogged();
			if (!isAuthenticated || isNullOrEmpty(token))
				return {
					isAuthenticated: false,
				};
			return {
				isAuthenticated: true,
				token: token as string,
			};
		});
	};
	const api = useApiBuilderOf(
		SitePresentationApiApi,
		useUrlBuilder(configurations?.integrations?.api.site?.baseUrl ?? 'https://localhost:7178'),
		await axiosAuthenticationBearerInterceptor(),
	);
	return { api };
}
