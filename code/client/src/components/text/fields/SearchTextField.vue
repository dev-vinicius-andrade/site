<template>
	<div @keydown="handleArrowKey">
		<VTextField
			v-model="search"
			append-icon="mdi-magnify"
			:label="label"
			single-line
			hide-details
			clearable
			@update:modelValue="onSearch"
		>
			<template #prepend-inner>
				<VChip v-if="searchField && operator" closable @click:close="removeField" color="primary">
					<span>{{ searchFieldText }}</span>
				</VChip>
			</template>
		</VTextField>
		<VMenu
			:model-value="showFieldSelector"
			:open-on-click="false"
			:open-on-focus="false"
			:open-on-hover="false"
			activator="parent"
		>
			<VList max-width="30%">
				<VListItem
					v-for="field in componentProperties.searchFields"
					:key="field.key"
					@click="() => selectField(field)"
				>
					{{ field.key }}
				</VListItem>
			</VList>
		</VMenu>
		<VMenu :model-value="showOperatorSelector" :open-on-click="false" :open-on-focus="false" activator="parent">
			<VList max-width="30%">
				<VListItem v-for="operator in operators" :key="operator" @click="() => setOperator(operator.value)">
					{{ operator.key }}
				</VListItem>
			</VList>
		</VMenu>
	</div>
</template>
<script setup lang="ts">
import { ConditionOperator, Events } from '@/enums';
import { Nullable } from '@/types/nullable';
import { VTextField } from 'vuetify/lib/components/index.mjs';
import {
	TextFieldComponentProperties,
	TextFieldComponentEvents,
	TextFieldSearchField,
} from '@/types/component/text-field/search';

const componentProperties = withDefaults(defineProps<TextFieldComponentProperties>(), {
	searchFields: () => [],
	label: () => ({ key: 'texts.search' }),
});
const emits = defineEmits<TextFieldComponentEvents>();
const label = computed(() => getText(componentProperties.label));
const showFieldSelector = ref(false);
const showOperatorSelector = ref(false);
const search = ref<Nullable<string>>();
const searchField = ref<Nullable<string>>();
const operator = ref<Nullable<ConditionOperator>>();
const searchFieldText = computed<Nullable<string>>(() => {
	if (!searchField.value) return null;
	let result = `@${searchField.value}`;
	if (!operator.value) return result;
	if (operator.value === ConditionOperator.Contains) return `${result}(${getText({ key: 'texts.contains' })}):`;
	if (operator.value === ConditionOperator.Equals) return `${result}(${getText({ key: 'texts.equals' })}):`;
	if (operator.value === ConditionOperator.NotEquals) return `${result}(${getText({ key: 'texts.notEquals' })}):`;
	if (operator.value === ConditionOperator.GreaterThan) return `${result}.greaterThan:`;
	if (operator.value === ConditionOperator.LessThan) return `${result}.lessThan:`;

	return null;
});
const operators = computed(() => {
	return [
		{ key: getText({ key: 'texts.contains' }), value: ConditionOperator.Contains },
		{ key: getText({ key: 'texts.equals' }), value: ConditionOperator.Equals },
		{ key: getText({ key: 'texts.notEquals' }), value: ConditionOperator.NotEquals },
		{ key: getText({ key: 'texts.greaterThan' }), value: ConditionOperator.GreaterThan },
		{ key: getText({ key: 'texts.lessThan' }), value: ConditionOperator.LessThan },
	];
});
function onSearch(value: string) {
	const startsWithAt = value.startsWith('@');
	if (startsWithAt) {
		showFieldSelector.value = true;
		return;
	}
	if (searchField.value) {
		showFieldSelector.value = false;
	}
	emitSearchUpdate();
}
function emitSearchUpdate() {
	if (!searchField.value && !search.value) return;
	let key = searchField.value;
	if (search.value)
		emits(Events.onModelValueUpdate, {
			key: key ?? componentProperties.defaultKey,
			value: search.value,
			operator: operator.value ?? ConditionOperator.Contains,
		});
}
watch(
	() => searchField.value,
	value => {
		emitSearchUpdate();
		showOperatorSelector.value = isNullOrUndefined(searchField.value) ? false : true;
	},
);
function selectField(field: TextFieldSearchField) {
	searchField.value = field.key;
	if (search.value?.startsWith('@')) {
		search.value = search.value.slice(1);
	}
	showFieldSelector.value = false;
}
function removeField() {
	searchField.value = null;
	operator.value = null;
	showFieldSelector.value = false;
	showOperatorSelector.value = false;
	search.value = null;
}
function setOperator(op: ConditionOperator) {
	operator.value = op;
	showOperatorSelector.value = false;
}

function handleArrowKey(event: KeyboardEvent) {
	if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;
	showOperatorSelector.value = false;
	showFieldSelector.value = false;
	event.preventDefault();
	event.stopImmediatePropagation();
}
</script>
