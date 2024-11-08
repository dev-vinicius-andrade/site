import { Nullable } from '@/types/nullable';
import { FilterRequest } from '@/types/requests/common/filter';
import { LocaleText, LocaleTextTypeWithOptions } from '@/types/locale/text';
import { Locales, StringCase } from '@enums';
import { Buffer } from 'buffer';
import { v4 as uuidv4 } from 'uuid';
import i18n from '@plugins/i18n';
import _forEach from 'lodash/forEach';
import _replace from 'lodash/replace';
import _cloneDeep from 'lodash/cloneDeep';
import _some from 'lodash/some';
import _get from 'lodash/get';
import _ from 'lodash';

import dayjs from 'dayjs';
import { useLocaleStore } from '@/stores/locale';
import { LocaleTextOptions } from '@/types/locale/text/options';
import ThemeEnum from '@/enums/theme';

export function isNullOrUndefined(value?: any) {
	return value === null || value === undefined;
}
export function generateId(): string {
	return uuidv4();
}
export function isLocaleText(text: LocaleText | string): text is LocaleText {
	return typeof text !== 'string';
}
export function createObjectFromPropertyNames(propertyNames?: string[]): any {
	if (!propertyNames || propertyNames.length === 0) return {};
	return Object.fromEntries(propertyNames.map(propertyName => [propertyName, undefined]));
}
export function getFileName(path: string, removeExtension = true) {
	const regex = /^.*[\\ /]/;
	const directoryPath = path.match(regex);
	if (!directoryPath || directoryPath.length === 0) return path;
	const fileNameWithExtension = path.replace(directoryPath[0], '');
	if (!removeExtension) return fileNameWithExtension;
	const fileNameWithoutExtension = fileNameWithExtension.replace(/(.*)\.(.*?)$/, '$1');
	return fileNameWithoutExtension;
}
export function getDateFormat(formatKey: string, date?: Date | string): string {
	const { d } = i18n.global;
	if (!date) return d(new Date(), formatKey);
	if (typeof date === 'string') return d(new Date(date), formatKey);
	return d(date, formatKey);
}
export function getDate(date?: Date | string): string {
	if (!date) return '';
	const { d } = i18n.global;
	return d(date);
}
export function getTextFromKey(key: string, options?: LocaleTextOptions): string {
	return getText({ key, ...options });
}
export function getAvailableThemes(): string[] {
	return Object.keys(ThemeEnum).map(c => c);
}
export function getText(text?: LocaleText | string): string {
	if (typeof text === 'string') return text;
	const { t } = i18n.global;
	if (!text) return '';
	if (text.text) return text.text;
	if (!text.key) return '';
	const textWithOptions = text as LocaleTextTypeWithOptions;
	if (textWithOptions?.single && !textWithOptions?.multiple)
		return toStringCases(t(text.key, 1), textWithOptions?.stringCases).trim();
	if (textWithOptions?.multiple && !textWithOptions?.single)
		return toStringCases(t(text.key, 2), textWithOptions?.stringCases).trim();
	if (
		textWithOptions?.count !== undefined &&
		textWithOptions?.count !== null &&
		!textWithOptions?.single &&
		!textWithOptions?.multiple
	)
		return toStringCases(t(text.key, textWithOptions?.count), textWithOptions?.stringCases).trim();
	return toStringCases(t(text.key, textWithOptions.params), textWithOptions?.stringCases).trim();
}
export function removeDoubleSpaces(text?: string): string | null | undefined {
	if (!text) return text;
	return _replace(text, /\s\s+/g, ' ');
}
export const stringCaseHandlers = {
	[StringCase.none]: (text: string) => text,
	[StringCase.upper]: (text: string) => text.toUpperCase(),
	[StringCase.lower]: (text: string) => text.toLowerCase(),
	[StringCase.camel]: (text: string) => toCammelCase(text),
	[StringCase.pascal]: (text: string) => toPascalCase(text),
};
export function toStringCases(text: string, stringCases: StringCase[] = [StringCase.none]): string {
	let result = text;
	stringCases.forEach(stringCase => {
		result = stringCaseHandlers[stringCase](result);
	});
	return result;
}

export function toCammelCase(str: string) {
	return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (chr: string) => chr.toUpperCase());
}
export function toPascalCase(str: string) {
	return str.charAt(0).toUpperCase() + toCammelCase(str).slice(1);
}

export function convertRequestUrlWithTokenParams(url: string, params: { [key: string]: string } = {}) {
	_forEach(params, function (value: string, key: string) {
		url = _replace(url, key, value);
	});
	return url;
}

export function encodeBase64(text?: string) {
	if (!text) return '';
	return Buffer.from(text).toString('base64');
}
export function decodeBase64(text?: string) {
	if (!text) return '';
	return Buffer.from(text, 'base64').toString('utf-8');
}

export function toQueryParams(obj: any, prefix: string = ''): string {
	let str = [],
		p;
	for (p in obj) {
		if (obj.hasOwnProperty(p)) {
			let k = prefix ? prefix + '[' + p + ']' : p,
				v = obj[p];
			if (!v) continue;

			str.push(
				v !== null && typeof v === 'object'
					? toQueryParams(v, k)
					: encodeURIComponent(k) + '=' + encodeURIComponent(v),
			);
		}
	}
	return str !== null && str.length > 0 ? `?${str.join('&')}` : '';
}
export function getBase64EncodedRequestFilterSufix(filter?: FilterRequest) {
	if (!filter) return '';
	const base64EncodedFilter = encodeBase64(JSON.stringify(filter));
	return base64EncodedFilter;
}
export function convertToInt(value: string | number | null | undefined, defaultResult: number = 0): number {
	try {
		if (!value) return defaultResult;
		return parseInt(value.toString());
	} catch (e) {
		return defaultResult;
	}
}
export function nameof<T>(name: Extract<keyof T, string>): string {
	return name;
}

export function isNull<T>(value?: T): boolean {
	return value === undefined || value === null || value === 'undefined' || value === 'null';
}

export function isNullOrEmpty<T>(value?: T): boolean {
	return isNull(value) || value === '';
}

export function isString<T>(value: T): boolean {
	return typeof value === 'string' || value instanceof String;
}

export function cloneAsNullable<T>(obj?: T): Nullable<T> {
	if (!obj) return undefined;
	return _cloneDeep(obj);
}
export function removeCommentsFromJson(json: string): string {
	const commentRegex = /\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm;
	return json.replace(commentRegex, '$1');
}

export function mapObjectPaths(obj?: any, path: string[] = []) {
	if (!obj) return [];
	const results: string[] = [];
	for (const key in Object.keys(obj)) {
		if (obj.hasOwnProperty(key)) {
			const value = obj[key];
			if (typeof value === 'object') {
				results.push(...mapObjectPaths(value, [...path, key]));
			} else {
				results.push([...path, key].join('.'));
			}
		}
	}
	return results;
}
export function arrayContains(array: any[], compareFunction: (item: any) => boolean): boolean {
	return array.indexOf(compareFunction) > -1;
}
export function isTrue(value?: boolean): boolean {
	return value === true;
}

export function findRecursive(items: any[], params: any, childrenKey = 'children'): any {
	if (!items) {
		return;
	}

	for (const item of items) {
		if (_some([item], params)) {
			return item;
		}

		let children = _get(item, childrenKey);
		if (children) {
			const child: unknown[] | undefined = findRecursive(children, params, childrenKey);
			if (child) {
				return child;
			}
		}
	}
}

export function pickAndRemoveUndefined(obj: any, keys: string[]) {
	return _.chain(obj)
		.pick(keys)
		.pickBy((o: any) => {
			return !_.isUndefined(o);
		})
		.value();
}

export function pickAndRemoveEmpty(obj: any, keys: string[]) {
	return _.chain(obj)
		.pick(keys)
		.pickBy((o: any) => {
			return !_.isEmpty(o);
		})
		.value();
}

export function formatDate(dateString: string, format = 'DD/MM/YYYY HH:mm:ss') {
	if (!dateString) return '';

	const date = dayjs(dateString);
	return date.format(format);
}

export function getDateFormatSelector() {
	const localeStore = useLocaleStore();
	switch (localeStore.currentLocale.locale) {
		case Locales.en:
			return 'm-d-Y';
		case Locales.pt:
		default:
			return 'd-m-Y';
	}
}

export function formatDatetimeToLocale(datetime?: string) {
	if (!datetime) return '';

	const localeStore = useLocaleStore();
	let locale;

	switch (localeStore.currentLocale.locale) {
		case Locales.en:
			locale = 'en';
			break;
		case Locales.pt:
		default:
			locale = 'pt';
			break;
	}

	const formatedDate = new Date(datetime);
	return `${formatedDate.toLocaleDateString(locale)} ${formatedDate.toLocaleTimeString(locale)}`;
}
export function isValidUrl(url?: Nullable<string>): boolean {
	try {
		if (!url) return false;
		if (url.length === 0) return false;

		const urlRegex = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;
		return urlRegex.test(url);
	} catch (error) {
		return false;
	}
}
export function isObjectEmpty(obj: any) {
	return Object.keys(obj).length === 0;
}
