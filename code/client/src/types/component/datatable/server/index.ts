import { DatatableServerSortByOrder } from '@/enums';
import { TextFieldSearchFieldValue } from '@/types/component/text-field/search';
import { LocaleText } from '@/types/locale/text';
import { Nullable } from '@/types/nullable';
import { DataTableHeader } from '@/types/vuetify';

export declare type DatatableServerComponentProperties = {
	title?: string;
	headers?: DataTableHeader[];
	itemsPerPage: number;
	itemsPerPageOptions: { title: string; value: number }[];
	showSelectedItems?: boolean;
	showDateSelector: boolean;
	showConfigButton: boolean;
	hasActions: boolean;
	enableAdd?: boolean;
	addIcon?: string;
	addText?: LocaleText;
	fetch: DataTableServerFetchFunction;
	hasDivider?: boolean;
	dataTableClass?: string;
	customFilter?: { [key: string]: any };
	defaultDate?: string | Date;
	defaultDateRangeStart?: string;
	defaultDateRangeEnd?: string;
	showSearch?: boolean;
	defaultSeachKey?: string;
};

export declare type DatatableServerComponentData = {
	search: TextFieldSearchFieldValue;
	loading: boolean;
	items: any[];
	totalItems: Nullable<number>;
	itemsPerPage: number;
	timeout?: ReturnType<typeof setTimeout>;
	page: number;
	selectedItems?: any[];
	dateRange?: any;
	defaultDate?: string | Date;
	startDate?: string;
	endDate?: string;
};

export declare type DatatableEvents = {
	(e: Events.onAddClicked): void;
	(e: Events.onConfigClicked): void;
	(e: 'selectedItems', selectedItems: any[]): void;
	(e: Events.onModelValueUpdate, value: boolean): void;
};
export declare type DatatableServerFetchResult = { items: any[]; totalItems?: Nullable<number> };
export declare type DataTableServerFetchFunction = (
	obj?: DatatableServerFetchObject,
) => Promise<DatatableServerFetchResult>;
export declare type DatatableServerFetchObject = {
	page: number;
	itemsPerPage: number;
	sortBy?: { key: string; order: string }[];
	search?: Nullable<TextFieldSearchFieldValue>;
	customFilter?: { [key: string]: any };
	startDate?: string;
	endDate?: string;
};

export declare type DatatableServerWithFormFetchObject = {
	page: number;
	itemsPerPage: number;
	sortBy?: DatatableServerSortBy[];
	form?: { [key: string]: any };
};

export declare type DatatableServerSortBy = {
	key: string;
	order: DatatableServerSortByOrder;
};
