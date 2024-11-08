import { Nullable } from '@/types/nullable';
import { LocaleText } from '@/types/locale/text';
export declare type ListItem<T> = {
	id: string;
	title?: LocaleText | string;
	value?: T | Nullable<T>;
};
