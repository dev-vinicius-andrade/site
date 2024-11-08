export declare type DataRequestResponse<T> = {
	data?: T;
};
export declare type ErrorRequestResponse = {
	error?: any;
};

export declare type MessageRequestResponse = {
	message: string;
};
export declare type RequestResponse<T> = MessageRequestResponse &
	DataRequestResponse<T> &
	ErrorRequestResponse & {
		hasError: boolean;
		statusCode?: number | string;
		status?: string;
	};
export declare type PaginatedResponse<T> = {
	start: number;
	limit: number;
	length: number;
	total: number;
	data: T[];
};
export declare type RequestArrayResponse = RequestResponse<Array<any>>;
export declare type RequestObjectResponse = RequestResponse<any>;
export declare type RequestWithErrorResponse = RequestResponse<any>;
export declare type Response<T> =
	| RequestResponse<T>
	| RequestArrayResponse
	| RequestObjectResponse
	| RequestWithErrorResponse;
