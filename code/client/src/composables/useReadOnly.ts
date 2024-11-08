import { Ref, ComputedRef } from 'vue';
export interface IReadonlyComponentProperties {
	readonly?: boolean;
}
export function useReadonly(defaultValue: boolean = false) {
	return {
		readonly: inject('readonly', defaultValue),
	};
}
export function useIsReadonly(componentProperties: IReadonlyComponentProperties) {
	return {
		isReadonly: computed(() => {
			const { readonly } = useReadonly();
			return readonly || componentProperties.readonly;
		}),
	};
}
export function useProvideReadonly(value: boolean | Ref<boolean> | ComputedRef<boolean>) {
	provide('readonly', value);
}
