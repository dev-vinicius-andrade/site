import { AxiosRequestHeaders } from 'axios';

export declare type DefaultRequestHeaders = AxiosRequestHeaders & {
	'x-apikey': string;
};
export declare type DefaultRequestHeadersWithCompanyType = {
	companyId: string;
};
export declare type DefaultRequestHeadersWithCompany =
	| DefaultRequestHeadersWithCompanyType
	| (DefaultRequestHeadersWithCompanyType & DefaultRequestHeaders);
