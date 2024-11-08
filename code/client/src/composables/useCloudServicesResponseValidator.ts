import { AxiosResponse } from 'axios';

export function useCloudServicesResponseValidator(
	response?: AxiosResponse<any, any>,
	throwErrorOnNotOkStatusCode: boolean = true,
) {
	return {
		isValid: () => {
			if (!response) throw new Error('Response is null');
			if (response?.status === undefined || response?.status === null)
				throw new Error('Response Status Code  is null');
			if (response.status !== 200 && throwErrorOnNotOkStatusCode)
				throw new Error(`StatusCode: ${response.status}`);
			if (!response.data) throw new Error('Data is null');
			if (response.data.hasError) throw new Error(`Data hasError, message: ${response.data.message}`);
			return true;
		},
	};
}
