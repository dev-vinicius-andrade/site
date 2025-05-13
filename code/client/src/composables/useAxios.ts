import { useAuthStore } from '@/stores/auth';
// import { useConfigurationsStore } from '@/stores/configuration';

import axios, { AxiosInstance } from 'axios';

export default axios.create({});

export function createAxios(baseUrl?: string, addAuthenticationInterceptor: boolean = true): AxiosInstance {
	const instance = axios.create({
		baseURL: baseUrl,
	});
	instance.interceptors.request.use(async config => {
		if (!addAuthenticationInterceptor) return config;
		const authStore = useAuthStore();
		const token = await authStore.getToken();
		config.headers.Authorization = `Bearer ${token}`;
		return config;
	});
	return instance;
}
export function useApiBuilder(addAuthenticationInterceptor: boolean = true) {
	// const configurationsStore = useConfigurationsStore();
	// const configurations = configurationsStore.configurations;
	return {
		createApi: (url: string) => createAxios(url, addAuthenticationInterceptor),
	};
}
