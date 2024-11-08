import { defineStore } from 'pinia';
import { Result } from '@/types/result';
import { Environment, Environments } from '@/types/environment';
import { AppErrorCode } from '@/enums/errors';
import { Response } from '@/types/response';
import { AxiosError } from 'axios';
import { Nullable } from '@/types/nullable';
const defaultEnvironmentCache: Nullable<Result<Environments>> = null;
export const useEnvironmentStore = defineStore('EnvironmentStore', {
	state: () => ({
		environmentResultCache: useTypedStorage<Nullable<Result<Environments>>>(
			'environmentsCache',
			defaultEnvironmentCache,
		),
		selected: useTypedStorage<Nullable<Environment>>('selectedEnvironment', null),
	}),
	getters: {},
	actions: {
		async getAsync(refetch: boolean = false): Promise<Result<Environments>> {
			try {
				if (!refetch && this.environmentResultCache) return this.environmentResultCache;
				const api = useApiBuilder().createDevelopersPortalApi();
				const response = await api.get('/environment/active');
				if (response.status === 204)
					return {
						message: 'No environments found',
						success: true,
					};
				if (response.status !== 200)
					return {
						code: AppErrorCode.HTTP_ERROR,
						message: `Failed to get environments. Status code: ${response.status}`,
						success: false,
					};
				const isValid = useCloudServicesResponseValidator(response).isValid();
				if (!isValid)
					return {
						code: AppErrorCode.UNEXPECTED,
						message: 'Failed to validate response',
						success: false,
					};
				const environments = response.data as Response<Environments>;
				if (!environments.data)
					return {
						message: 'No environments found',
						success: true,
					};
				this.environmentResultCache = {
					data: environments.data,
					success: true,
				};
				return this.environmentResultCache;
			} catch (error: any) {
				return {
					success: false,
					code: AppErrorCode.UNEXPECTED,
					message: error.message ?? 'An unexpected error occurred',
				};
			}
		},
		async addAsync(environmentName: string, companyEndpoint?: Nullable<string>): Promise<Result<Environment>> {
			try {
				const api = useApiBuilder().createDevelopersPortalApi();
				const response = await api.post('/environment', { name: environmentName, companyEndpoint });
				if (response.status === 204) {
					return {
						code: AppErrorCode.HTTP_ERROR,
						message: getTextFromKey('templates.failedToActionWithStatus', {
							params: {
								action: getTextFromKey('environment.actions.add'),
								status: response.status,
							},
						}),
						success: false,
					};
				}
				if (response.status !== 200)
					return {
						code: AppErrorCode.HTTP_ERROR,
						message: `Failed to add environment. Status code: ${response.status}`,
						success: false,
					};

				const isValid = useCloudServicesResponseValidator(response).isValid();
				if (!isValid)
					return {
						code: AppErrorCode.UNEXPECTED,
						message: 'Failed to validate response',
						success: false,
					};
				const environment = response.data as Response<Environment>;
				if (!environment.data)
					return {
						code: AppErrorCode.NULL_RESULT,
						message: 'Unable to parse environment',
						success: false,
					};
				return {
					data: environment.data,
					success: true,
				};
			} catch (error: any) {
				if ('response' in error) {
					const axiosError = error as AxiosError;
					if (axiosError.response && axiosError.response.status === 409) {
						return {
							success: false,
							code: AppErrorCode.HTTP_ERROR,
							message: getTextFromKey('environment.templates.error', {
								params: {
									action: getTextFromKey('environment.actions.add'),
									aditionalInfo: getTextFromKey('environment.templates.conflict', {
										params: {
											name: environmentName,
										},
									}),
								},
							}),
						};
					}
					return {
						success: false,
						code: AppErrorCode.HTTP_ERROR,
						message: getTextFromKey('environment.templates.error', {
							params: {
								action: getTextFromKey('environment.actions.add'),
								aditionalInfo: getTextFromKey('environment.templates.conflict', {
									params: {
										name: environmentName,
									},
								}),
							},
						}),
					};
				}
				return {
					success: false,
					code: AppErrorCode.UNEXPECTED,
					message: error.message ?? 'An unexpected error occurred',
				};
			}
		},
		async updateAsync(
			id: string,
			environmentName: string,
			companyEndpoint?: Nullable<string>,
		): Promise<Result<Environment>> {
			try {
				const api = useApiBuilder().createDevelopersPortalApi();
				const response = await api.put(`/environment/${id}`, { name: environmentName, companyEndpoint });
				if (response.status !== 200)
					return {
						code: AppErrorCode.HTTP_ERROR,
						message: `Failed to update environment. Status code: ${response.status}`,
						success: false,
					};
				const isValid = useCloudServicesResponseValidator(response).isValid();
				if (!isValid)
					return {
						code: AppErrorCode.UNEXPECTED,
						message: 'Failed to validate response',
						success: false,
					};
				const environment = response.data as Response<Environment>;
				if (!environment.data)
					return {
						code: AppErrorCode.NULL_RESULT,
						message: 'Unable to parse environment',
						success: false,
					};
				return {
					data: environment.data,
					success: true,
				};
			} catch (error: any) {
				if ('response' in error) {
					const axiosError = error as AxiosError;
					if (axiosError.response && axiosError.response.status === 409) {
						return {
							success: false,
							code: AppErrorCode.HTTP_ERROR,
							message: getTextFromKey('environment.templates.error', {
								params: {
									action: getTextFromKey('environment.actions.update'),
									aditionalInfo: getTextFromKey('environment.templates.conflict', {
										params: {
											name: environmentName,
										},
									}),
								},
							}),
						};
					}
				}
				return {
					success: false,
					code: AppErrorCode.UNEXPECTED,
					message: error.message ?? 'An unexpected error occurred',
				};
			}
		},
		async deleteAsync(id: string): Promise<Result<boolean>> {
			try {
				const api = useApiBuilder().createDevelopersPortalApi();
				const response = await api.delete(`/environment/${id}`);
				if (response.status !== 200)
					return {
						code: AppErrorCode.HTTP_ERROR,
						message: `Failed to add environment. Status code: ${response.status}`,
						success: false,
					};
				return {
					success: true,
				};
			} catch (error: any) {
				return {
					success: false,
					code: AppErrorCode.UNEXPECTED,
					message: error.message ?? 'An unexpected error occurred',
				};
			}
		},
		setSelectedEnvironment(environment: Nullable<Environment>) {
			this.selected = environment;
		},
	},
});
