import { Nullable } from '@/types/nullable';

export function useFakePromise() {
	function fetchMockData<T>({ response, timeout }: { response?: T; timeout?: number }): Promise<Nullable<T>> {
		return new Promise<Nullable<T>>(resolve => {
			setTimeout(() => {
				resolve(response);
			}, timeout ?? 2000);
		});
	}
	return {
		fetchMockData,
	};
}
