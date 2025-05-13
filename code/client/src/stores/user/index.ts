import { defineStore } from 'pinia';

import { useTypedStorage } from '@composables/useTypedStorage';
import { Nullable } from '@/types/nullable';
import { User } from '@/types/user';

export interface UserStoreData {
	user?: Nullable<User>;
}
const defaultData: UserStoreData = {
	user: null,
};

export const useUserStore = defineStore('UserStore', {
	state: () => ({
		data: useTypedStorage<UserStoreData>('user', defaultData),
	}),
	actions: {
		set(user?: any) {
			this.data.user = user;
		},
		clearData() {
			this.data.user = null;
		},
		// async getUsersAsync(skip: number = 0, take: number = 100): Promise<Result<PaginatedResponse<User>>> {
		// 	try {
		// 		const api = useApiBuilder().createDevelopersPortalApi();
		// 		const response = await api.get(`/user?skip=${skip}&take=${take}`);
		// 		if (response.status === 204) {
		// 			return {
		// 				message: 'No users found',
		// 				success: true,
		// 			};
		// 		}
		// 		if (response.status !== 200) {
		// 			return {
		// 				code: AppErrorCode.HTTP_ERROR,
		// 				message: `Failed to get users. Status code: ${response.status}`,
		// 				success: false,
		// 			};
		// 		}
		// 		const isValid = useCloudServicesResponseValidator(response).isValid();
		// 		if (!isValid) {
		// 			return {
		// 				code: AppErrorCode.UNEXPECTED,
		// 				message: 'Failed to validate response',
		// 				success: false,
		// 			};
		// 		}
		// 		const users = response.data as RequestResponse<PaginatedResponse<User>>;
		// 		if (!users.data) {
		// 			return {
		// 				message: 'No users found',
		// 				success: true,
		// 			};
		// 		}
		// 		return {
		// 			data: users.data,
		// 			success: true,
		// 		};
		// 	} catch (error: any) {
		// 		if ('response' in error) {
		// 			const axiosError = error as AxiosError;
		// 			if (axiosError.response && axiosError.response.status === 409) {
		// 				return {
		// 					success: false,
		// 					code: AppErrorCode.HTTP_ERROR,
		// 					message: getTextFromKey('environment.templates.error', {}),
		// 				};
		// 			}
		// 		}
		// 		return {
		// 			success: false,
		// 			code: AppErrorCode.UNEXPECTED,
		// 			message: error.message ?? 'An unexpected error occurred',
		// 		};
		// 	}
		// },
		// async addPermissionAsync(userId: string): Promise<Result<RequestResponse<string>>> {
		// 	try {
		// 		const api = useApiBuilder().createDevelopersPortalApi();
		// 		const response = await api.put(`/user/${userId}/role`);
		// 		if (response.status === 200) {
		// 			return {
		// 				data: { hasError: false, message: 'Permission added' },
		// 				success: true,
		// 			};
		// 		}
		// 		return {
		// 			success: false,
		// 			code: AppErrorCode.HTTP_ERROR,
		// 			message: 'Failed to add permission',
		// 		};
		// 	} catch (error: any) {
		// 		if ('response' in error) {
		// 			const axiosError = error as AxiosError;
		// 			if (axiosError.response && axiosError.response.status === 409) {
		// 				return {
		// 					success: false,
		// 					code: AppErrorCode.HTTP_ERROR,
		// 					message: getTextFromKey('environment.templates.error', {}),
		// 				};
		// 			}
		// 		}
		// 		return {
		// 			success: false,
		// 			code: AppErrorCode.UNEXPECTED,
		// 			message: error.message ?? 'An unexpected error occurred',
		// 		};
		// 	}
		// },
		// async revokePermissionAsync(userId: string) {
		// 	try {
		// 		const api = useApiBuilder().createDevelopersPortalApi();
		// 		const response = await api.delete(`/user/${userId}/role`);
		// 		if (response.status === 200) {
		// 			return {
		// 				data: { hasError: false, message: 'Permission revoked' },
		// 				success: true,
		// 			};
		// 		}
		// 		return {
		// 			success: false,
		// 			code: AppErrorCode.HTTP_ERROR,
		// 			message: 'Failed to revoke permission',
		// 		};
		// 	} catch (error: any) {
		// 		if ('response' in error) {
		// 			const axiosError = error as AxiosError;
		// 			if (axiosError.response && axiosError.response.status === 409) {
		// 				return {
		// 					success: false,
		// 					code: AppErrorCode.HTTP_ERROR,
		// 					message: getTextFromKey('environment.templates.error', {}),
		// 				};
		// 			}
		// 		}
		// 		return {
		// 			success: false,
		// 			code: AppErrorCode.UNEXPECTED,
		// 			message: error.message ?? 'An unexpected error occurred',
		// 		};
		// 	}
		// },
	},
});
