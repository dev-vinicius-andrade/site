import { getText } from '@/helpers';
import { LocaleText } from '@/types/locale/text';

export function useFieldIsRequired(fieldName: string) {
	return (v?: string) => {
		if (v !== undefined && v !== null && v !== '') return true;
		return getText({
			key: 'form.rules.templates.fieldRequired',
			params: { field: fieldName },
		});
	};
}
export function useIsValidUrl(fieldName: string) {
	return (v?: string) => {
		const isValid = isValidUrl(v);
		if (isValid) return true;
		return getText({
			key: 'form.rules.templates.invalidUrl',
			params: { field: fieldName },
		});
	};
}
export function useArrayIsEmpty(fieldName: string) {
	return (v?: any[]) => {
		if (v !== undefined && v !== null && v.length > 0) return true;
		return getText({
			key: 'form.rules.templates.fieldRequired',
			params: { field: fieldName },
		});
	};
}
export declare interface IRuleBuilder {
	fieldIsRequired: () => IRuleBuilder;
	arrayIsEmpty: () => IRuleBuilder;
	isValidUrl: () => IRuleBuilder;
	build: () => any[];
}
export const useRules = (fieldName: string, rules: any[] = []): IRuleBuilder => {
	return {
		fieldIsRequired: () => {
			rules.push(useFieldIsRequired(fieldName));
			return useRules(fieldName, rules);
		},
		arrayIsEmpty: () => {
			rules.push(useArrayIsEmpty(fieldName));
			return useRules(fieldName, rules);
		},
		isValidUrl: () => {
			rules.push(useIsValidUrl(fieldName));
			return useRules(fieldName, rules);
		},
		build: () => rules,
	};
};

export function useFieldIsRequiredLabel(labelLocale: LocaleText, required = true): string {
	let label = getText(labelLocale);
	if (required) {
		label += '*';
	}
	return label;
}

export default useRules;
