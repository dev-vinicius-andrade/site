import { AppErrorCode } from '@/enums/errors';
import { Company } from '@/types/company';
import { Result } from '@/types/result';

import { defineStore } from 'pinia';

export const useCompanyStore = defineStore('CompanyStore', {
	state: () => ({}),
	actions: {
		async getAsync(url: string): Promise<Result<Company[]>> {
			try {
				const api = useApiBuilder().createApi(url);
				const endpoint = `companies/all`;
				const response = await api.get(`${endpoint}`);
				const isValid = useCloudServicesResponseValidator(response).isValid();
				if (!isValid)
					return {
						code: AppErrorCode.UNEXPECTED,
						message: 'Failed to validate response',
						success: false,
					};
				if (!response.data)
					return {
						code: AppErrorCode.UNEXPECTED,
						message: 'Failed to get data from response',
						success: false,
					};
				if ('data' in response.data && !response.data.data)
					return {
						code: AppErrorCode.UNEXPECTED,
						message: 'Failed to get data from response',
						success: false,
					};
				return {
					success: true,
					data: response.data.data as Company[],
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
