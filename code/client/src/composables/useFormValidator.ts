import { Nullable } from '@/types/nullable';
import { Ref, ComputedRef, VNodeRef } from 'vue';
export interface IFormValidatorOptions {
	isMounted: Ref<boolean> | ComputedRef<boolean>;
}
export const defaulFormValidatorOptions: IFormValidatorOptions = {
	isMounted: ref(false),
};
export function useFormValidator(
	formName: string,
	options: Nullable<IFormValidatorOptions> = defaulFormValidatorOptions,
) {
	const persistedFormValidatorOptions = {
		...defaulFormValidatorOptions,
		...options,
	};
	const { readonly } = useReadonly();
	const isFormValidState = ref(false);
	const isFormValid = computed(() => isFormValidState);
	const formReference = {
		[formName]: ref<HTMLFormElement | VNodeRef | undefined | null>(null),
	};
	async function validateForm() {
		if (readonly) return;
		if (!persistedFormValidatorOptions?.isMounted) return;
		await nextTick(() => {
			console.log(`isValid: ${isFormValidState.value}`);
			formReference[formName].value?.validate();
			console.log(`isValid: ${isFormValidState.value}`);
		});
	}
	onMounted(async () => {
		await validateForm();
	});
	return {
		isFormValid,
		formReference: formReference[formName],
		validateForm,
	};
}
