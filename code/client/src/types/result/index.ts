import { AppErrorCode } from '@/enums/errors';

export declare type SuccessResult = {
	success: true;
};
export declare type SuccessResultWithMessage = SuccessResult & {
	message: string;
};
export declare type ResultData<T> = {
	data?: T;
};
export declare type SuccessResultWithData<T> =
	| (SuccessResult & ResultData<T>)
	| (SuccessResultWithMessage & ResultData<T>);
export declare type ErrorResult = {
	success: false;
	message: string;
	code: AppErrorCode;
};

export declare type Result<T> = SuccessResult | SuccessResultWithMessage | ErrorResult | SuccessResultWithData<T>;
