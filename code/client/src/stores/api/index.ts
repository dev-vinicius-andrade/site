import { defineStore } from 'pinia';
import { Result } from '@/types/result';
import { Environment } from '@/types/environment';
import { AppErrorCode } from '@/enums/errors';
import { Response } from '@/types/response';
import { AxiosError } from 'axios';
import { Api, Apis } from '@/types/api';
export const useApiStore = defineStore('ApiStore', {
	state: () => ({}),
	getters: {},
	actions: {
		async getAsync(environmentId: string): Promise<Result<Apis>> {
			try {
				const api = useApiBuilder().createDevelopersPortalApi();
				const endpoint = `/api/environment/${environmentId}/active`;
				const response = await api.get(endpoint);
				if (response.status === 204)
					return {
						message: 'No apis found',
						success: true,
					};
				if (response.status !== 200)
					return {
						code: AppErrorCode.HTTP_ERROR,
						message: `Failed to get apis. Status code: ${response.status}`,
						success: false,
					};
				const isValid = useCloudServicesResponseValidator(response).isValid();
				if (!isValid)
					return {
						code: AppErrorCode.UNEXPECTED,
						message: 'Failed to validate response',
						success: false,
					};
				const environments = response.data as Response<Apis>;
				if (!environments.data)
					return {
						message: 'No apis found',
						success: true,
					};
				return {
					data: environments.data,
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
		async addAsync(request: Api): Promise<Result<Api>> {
			try {
				const api = useApiBuilder().createDevelopersPortalApi();
				const response = await api.post('/api', request);
				if (response.status === 204) {
					return {
						code: AppErrorCode.HTTP_ERROR,
						message: getTextFromKey('templates.failedToActionWithStatus', {
							params: {
								action: getTextFromKey('api.actions.add'),
								status: response.status,
							},
						}),
						success: false,
					};
				}
				if (response.status !== 200)
					return {
						code: AppErrorCode.HTTP_ERROR,
						message: `Failed to add api. Status code: ${response.status}`,
						success: false,
					};

				const isValid = useCloudServicesResponseValidator(response).isValid();
				if (!isValid)
					return {
						code: AppErrorCode.UNEXPECTED,
						message: 'Failed to validate response',
						success: false,
					};
				const responseData = response.data as Response<Api>;
				if (!responseData.data)
					return {
						code: AppErrorCode.NULL_RESULT,
						message: 'Unable to parse api',
						success: false,
					};
				return {
					data: responseData.data,
					success: true,
				};
			} catch (error: any) {
				if ('response' in error) {
					const axiosError = error as AxiosError;
					if (axiosError.response && axiosError.response.status === 409) {
						return {
							success: false,
							code: AppErrorCode.HTTP_ERROR,
							message: getTextFromKey('api.templates.error', {
								params: {
									action: getTextFromKey('api.actions.add'),
									aditionalInfo: getTextFromKey('api.templates.conflict', {
										params: {
											name: request.name,
										},
									}),
								},
							}),
						};
					}
					return {
						success: false,
						code: AppErrorCode.HTTP_ERROR,
						message: getTextFromKey('api.templates.error', {
							params: {
								action: getTextFromKey('api.actions.add'),
								aditionalInfo: getTextFromKey('api.templates.conflict', {
									params: {
										name: request.name,
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
		async updateAsync(id: string, request: Api): Promise<Result<Environment>> {
			try {
				const api = useApiBuilder().createDevelopersPortalApi();
				const response = await api.put(`/api/${id}`, request);
				if (response.status !== 200)
					return {
						code: AppErrorCode.HTTP_ERROR,
						message: `Failed to add api. Status code: ${response.status}`,
						success: false,
					};
				const isValid = useCloudServicesResponseValidator(response).isValid();
				if (!isValid)
					return {
						code: AppErrorCode.UNEXPECTED,
						message: 'Failed to validate response',
						success: false,
					};
				const responseData = response.data as Response<Api>;
				if (!responseData.data)
					return {
						code: AppErrorCode.NULL_RESULT,
						message: 'Unable to parse api',
						success: false,
					};
				return {
					data: responseData.data,
					success: true,
				};
			} catch (error: any) {
				if ('response' in error) {
					const axiosError = error as AxiosError;
					if (axiosError.response && axiosError.response.status === 409) {
						return {
							success: false,
							code: AppErrorCode.HTTP_ERROR,
							message: getTextFromKey('api.templates.error', {
								params: {
									action: getTextFromKey('api.actions.update'),
									aditionalInfo: getTextFromKey('api.templates.conflict', {
										params: {
											name: request.name,
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
				const response = await api.delete(`/api/${id}`);
				if (response.status !== 200)
					return {
						code: AppErrorCode.HTTP_ERROR,
						message: `Failed to delete api. Status code: ${response.status}`,
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
	},
});
