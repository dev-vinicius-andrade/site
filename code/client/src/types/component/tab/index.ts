import Roles from '@/enums/auth/roles';
import { ResponsibleColumnsBreakpointsOptions } from '@/types';
import { LocaleText } from '@/types/locale/text';
import { Nullable } from '@/types/nullable';
import { StyleValue } from 'vue';

export interface ITab {
	id: TabId;
	title: LocaleText;
	prependIcon?: string;
	appendIcon?: string;
	authorizedRoles?: Roles[];
	contentClass?: Nullable<string>;
	nameClass?: Nullable<string>;
}
export declare type TabLayoutProperties = {
	currentTab?: number | undefined | null;
	vertical?: boolean;
	tabMinHeight?: string;
	tabHeight?: string;
	tabWindowItemStyle?: StyleValue;
	tabWindowStyle?: StyleValue;
	removeTabFlexGrow?: boolean;
	style?: StyleValue;
	class?: string;
	tabsOnRight?: boolean;
	tabsNameDisplayMaxLength?: number;
	title?: Nullable<LocaleText>;
	elevation?: Nullable<number | string>;
	verticalTabNamesColumns?: Nullable<ResponsibleColumnsBreakpointsOptions>;
	verticalTabContentColumns?: Nullable<ResponsibleColumnsBreakpointsOptions>;
};
export declare type TabId = string | number;
export declare type TabHorizontal = 'horizontal';
export declare type TabVertical = 'vertical';
export declare type TabDirection = TabHorizontal | TabVertical;
export declare type Tab = ITab;
