import { ConditionOperator, Events } from '@/enums';
import { LocaleText } from '@/types/locale/text';
import { Nullable } from '@/types/nullable';
export declare type TextFieldSearchField = {
	text: string;
	key: string;
};
export declare type TextFieldSearchFieldValue = {
	key: string;
	value: string;
	operator?: ConditionOperator;
};
export declare type TextFieldComponentEvents = {
	(e: Events.onModelValueUpdate, value?: TextFieldComponentModelValue): void;
};
export declare type TextFieldComponentModelValue = Nullable<TextFieldSearchFieldValue> | Nullable<string>;
export declare type TextFieldComponentProperties = {
	searchFields: TextFieldSearchField[];
	label?: LocaleText;

	modelValue: TextFieldComponentModelValue;
	defaultKey: string;
};
