import { AppErrorCode } from '@/enums/errors';
import { Result } from '@/types/result';
import { defineStore } from 'pinia';
export declare type CrudStoreOptions<TRequest, TReponse, TAdditionalState> = {
	state?: CrudStoreState<TRequest, TReponse, TAdditionalState>;
	actions?: CrudStoreActions<TRequest, TReponse, TAdditionalState>;
};
export declare type CrudRequest<TRequest> = {};
export declare type CrudStoreActions<TRequest, TReponse, TAdditionalState> = {
	addAsync: (request: TRequest) => Promise<Result<TReponse>>;
	updateAsync: (request: TRequest) => Promise<Result<TReponse>>;
	deleteAsync: (request: TRequest) => Promise<Result<TReponse>>;
	getAsync: (id: string) => Promise<Result<TReponse>>;
	getManyAsync: (request: TRequest) => Promise<Result<TReponse>>;
	clearState?: () => void;
};
export declare type CrudStoreState<TRequest, TReponse, TAdditionalState> = {
	lastRequest?: CrudRequest<TRequest>;
	lastResponse?: any;
	additionalState: TAdditionalState;
};
export function useCrudStore<TRequest, TReponse, TAdditionalState>(
	storeName: string,
	crudStoreOptions: CrudStoreOptions<TRequest, TReponse, TAdditionalState>,
) {
	return defineStore(storeName, {
		state: () => {
			return {
				lastRequest: undefined,
				...(crudStoreOptions.state?.additionalState ?? {}),
			} as CrudStoreState<TRequest, TReponse, TAdditionalState>;
		},
		actions: {
			async addAsync(request: TRequest): Promise<Result<TReponse>> {
				try {
					const result = await crudStoreOptions.actions?.addAsync(request);
					if (!result)
						return { success: false, message: 'No result returned', code: AppErrorCode.NULL_RESULT };
					return result;
				} catch (error: any) {
					return { success: false, message: error.message, code: AppErrorCode.UNEXPECTED };
				}
			},
			async updateAsync(request: TRequest): Promise<Result<TReponse>> {
				try {
					const result = await crudStoreOptions.actions?.updateAsync(request);
					if (!result)
						return { success: false, message: 'No result returned', code: AppErrorCode.NULL_RESULT };
					return result;
				} catch (error: any) {
					return { success: false, message: error.message, code: AppErrorCode.UNEXPECTED };
				}
			},
		},
	});
}

defineStore('ChannelTypeStore', {});
