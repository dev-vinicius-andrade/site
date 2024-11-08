import { StringCase } from '@enums';
export interface LocaleTextOptions {
	single?: boolean;
	multiple?: boolean;
	count?: number;
	params?: any;
	stringCases?: StringCase[];
	removeDoubleSpaces?: boolean;
}
