import { CompanyEndpoint } from '@/types/company/endpoint';

export declare type Environment = {
	id: string;
	name: string;
	createdDate: Date;
	updateDate: Date;
	deletedDate?: Date;
	isEnabled: boolean;
	isLogicalDeleted: boolean;
	companyEndpoint?: CompanyEndpoint;
};
export declare type Environments = {
	environments: Environment[];
};
