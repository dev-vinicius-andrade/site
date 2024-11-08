export declare type PaginationFilterRequest = {
	skip?: number;
	take?: number;
};
export declare type ConditionFilterRequestIgnoreCaseType = {
	ignoreCase?: boolean;
};
export declare type ConditionFilterRequestType = {
	propertyName?: string;
	value?: string;
	operator?: string;
	and?: ConditionFilterRequest[];
	or?: ConditionFilterRequest[];
};
export declare type ConditionFilterRequest =
	| ConditionFilterRequestIgnoreCaseType
	| (ConditionFilterRequestType & ConditionFilterRequestIgnoreCaseType);
export declare type FilterRequest = {
	pagination?: PaginationFilterRequest;
	condition?: ConditionFilterRequestIgnoreCaseType;
};
export default FilterRequest;
