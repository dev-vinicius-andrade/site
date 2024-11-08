export declare type Company = {
	id: string;
	name: string;
	isMaster: boolean;
	isEnabled: boolean;
	createdDate?: Date;
	updateDate?: Date;
	isLogicalDeleted?: boolean;
	companyParent?: Company;
};
