import { Nullable } from '@/types/nullable';
import { Locales } from '@/enums';
import { LocaleText } from '@/types/locale/text';
export declare type Locale = {
	locale: Locales;
	text: LocaleText;
};
export declare type VariationTypes = Nullable<string>;
export declare type Variation = {
	text: string;
	Text: VariationTypes;
	textCammelCased: VariationTypes;
	textPascalCased: VariationTypes;
	count: VariationTypes;
	Count: VariationTypes;
	countCammelCased: VariationTypes;
	countPascalCased: VariationTypes;
};
