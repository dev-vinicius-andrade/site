import { Nullable } from '@/types/nullable';

export declare type TimeSpan = {
	days?: Nullable<number>;
	hours?: Nullable<number>;
	minutes?: Nullable<number>;
	seconds?: Nullable<number>;
	milliseconds?: Nullable<number>;
};
export declare type ResponsibleColumnsBreakpointsOptions = {
	sm?: ResponsibleColumns;
	md?: ResponsibleColumns;
	lg?: ResponsibleColumns;
	smAndDown?: ResponsibleColumns;
	mdAndDown?: ResponsibleColumns;
	lgAndDown?: ResponsibleColumns;
	smAndUp?: ResponsibleColumns;
	mdAndUp?: ResponsibleColumns;
	lgAndUp?: ResponsibleColumns;
	mobile?: ResponsibleColumns;
};
export declare type ResponsibleColumns = number | string;
