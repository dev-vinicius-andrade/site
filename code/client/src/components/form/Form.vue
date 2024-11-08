<template>
	<VForm v-model="isFormValid.value" :ref="setFormReference">
		<slot :isFormValid="isFormValid" :formReference="formName" :validateForm="validateForm">
			<VTextField label="Name" :rules="defaultSlotNameRules"></VTextField>
		</slot>
		<slot name="actions" :isFormValid="isFormValid" :formReference="formName" :validateForm="validateForm" />
	</VForm>
</template>
<script setup lang="ts">
import { useLocaleStore } from '@/stores/locale';
import { IFormComponentProperties } from '@/types/component/form';
const componentProperties = withDefaults(defineProps<IFormComponentProperties>(), {});
const isMounted = ref(false);
const formName = componentProperties.name ?? `form-${generateId()}`;
onMounted(async () => {
	isMounted.value = true;
});
const { isFormValid, validateForm, formReference } = useFormValidator(formName, { isMounted });
const { readonly } = useReadonly();
const localeStore = useLocaleStore();
const reactiveModel = defineModel<boolean>({ default: false });
const defaultSlotNameRules = computed(() => {
	return readonly ? [] : [useFieldIsRequired(getText({ key: 'variations.name.textPascalCased' }))];
});
watch(
	() => isFormValid.value,
	async newValue => {
		reactiveModel.value = newValue.value;
		await validateForm();
	},
	{ immediate: true },
);
watch(
	() => localeStore.currentLocale.locale,
	async () => {
		await validateForm();
	},
);

function setFormReference(el: Element | globalThis.ComponentPublicInstance | null): void {
	formReference.value = el;
}
</script>
