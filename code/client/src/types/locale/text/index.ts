import { LocaleTextOptions } from '@/types/locale/text/options';
import { Nullable } from '@/types/nullable';
export declare type LocaleTextType = {
	text?: string;
	key?: string;
};
export declare type LocaleTextTypeWithOptions = LocaleTextType & LocaleTextOptions;
export declare type LocaleText = Nullable<LocaleTextType | LocaleTextTypeWithOptions | string>;
