export declare type Api = {
	id: string;
	environmentId: string;
	healthCheckEndpoint?: string;
	name: string;
	url: string;
	createdDate: Date;
	updatedDate: Date;
	isEnabled: boolean;
	isLogicalDeleted: boolean;
	deletedDate?: Date;
};
export declare type Apis = {
	apis: Api[];
};
