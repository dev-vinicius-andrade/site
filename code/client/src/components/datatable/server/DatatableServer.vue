<template>
	<VCard>
		<VCardTitle>
			<slot name="title">
				<VRow class="align-center">
					<slot name="datatable-server-title">
						<VCol v-if="componentProperties?.title">{{ componentProperties.title }}</VCol>
					</slot>
					<slot name="datatable-server-search" :search="componentData.search">
						<VCol v-if="componentProperties.showSearch">
							<SearchTextField
								:searchFields="searchableFields"
								v-model="componentData.search"
								:default-key="componentProperties.defaultSeachKey"
							/>
						</VCol>
					</slot>
					<slot name="datatable-server-datetime-picker">
						<VCol v-if="componentProperties.showDateSelector">
							<VueDatePicker clearable />
							<!-- <AppDateTimePicker
								:config="{}"
								v-model="componentData.dateRange"
								clearable
								prepend-inner-icon="mdi-calendar"
								hide-details
								@update:model-value="onDateUpdate"
							/> -->
						</VCol>
					</slot>
					<slot name="datatable-server-default-buttons">
						<VCol cols="1" v-if="componentProperties.showConfigButton">
							<VBtn icon="mdi-cog" @click.stop="configButtonClicked" class="rounded" size="small"></VBtn>
						</VCol>
						<VCol cols="auto" v-if="componentProperties.enableAdd">
							<VBtn
								:prepend-icon="componentProperties.addIcon"
								color="var(--app-secondary)"
								@click.stop="addClicked()"
							>
								{{ getText(componentProperties.addText) }}
							</VBtn>
						</VCol>
						<slot name="datatable-server-additional-buttons"></slot>
					</slot>
				</VRow>
			</slot>
		</VCardTitle>

		<VDivider v-if="componentProperties.hasDivider" />

		<VDataTableServer
			:class="componentProperties.dataTableClass"
			v-model:items-per-page="componentData.itemsPerPage"
			:headers="headers"
			:items="componentData.items"
			:items-length="componentData.totalItems"
			:items-per-page-options="componentProperties.itemsPerPageOptions"
			@update:options="loadItems"
			:search="componentData.search.value"
			:loading="componentData.loading"
			v-model:page="componentData.page"
			:items-per-page-text="`${getText({ key: 'texts.itemsPerPage' })}`"
			:show-select="componentProperties.showSelectedItems"
			return-object
			v-model="componentData.selectedItems"
		>
			<template v-for="(_, name, index) in (getSlotDatatable($slots) as {})" v-slot:[name]="scope" :key="name">
				<slot :name="name" v-bind="{ isLoading: componentData.loading, ...scope }"></slot>
			</template>

			<template v-slot:item.actions="{ item }">
				<VMenu close-on-content-click>
					<template v-slot:activator="{ props }">
						<VBtn icon="mdi-dots-vertical" size="small" color="transparent" elevation="0" v-bind="props" />
					</template>
					<VList density="compact" :item="item">
						<slot name="datatable-actions-items" :item="item">
							<VListItem @click="edit(item)">
								<VIcon>mdi-pencil</VIcon> {{ getText({ key: 'buttons.edit' }) }}
							</VListItem>
							<VListItem @click="remove(item)">
								<VIcon>mdi-delete</VIcon> {{ getText({ key: 'buttons.delete' }) }}
							</VListItem>
						</slot>
					</VList>
				</VMenu>
			</template>
		</VDataTableServer>
	</VCard>
</template>

<script setup lang="ts">
import { ConditionOperator, Events } from '@enums';
import VueDatePicker from '@vuepic/vue-datepicker';
import SearchTextField from '@/components/text/fields/SearchTextField.vue';
import _cloneDeep from 'lodash/cloneDeep';
import _isUndefined from 'lodash/isUndefined';
import _toString from 'lodash/toString';
import _remove from 'lodash/remove';
import _filter from 'lodash/filter';
import _startsWith from 'lodash/startsWith';
import _pickBy from 'lodash/pickBy';
import _keys from 'lodash/keys';
import _includes from 'lodash/includes';
import {
	DatatableEvents,
	DatatableServerComponentData,
	DatatableServerComponentProperties,
} from '@/types/component/datatable/server';
import { DataTableHeader } from '@/types/vuetify';
import { TextFieldSearchField } from '@/types/component/text-field/search';
import { Nullable } from '@/types/nullable';

const componentProperties = withDefaults(defineProps<DatatableServerComponentProperties>(), {
	itemsPerPage: 10,
	itemsPerPageOptions: () => [
		{ title: '10', value: 10 },
		{ title: '50', value: 50 },
		{ title: '100', value: 100 },
	],
	showDateSelector: false,
	showConfigButton: false,
	hasActions: true,
	enableAdd: true,
	addIcon: 'mdi-plus',
	addText: () => ({ key: 'buttons.add', single: true }),
	hasDivider: false,
	dataTableClass: '',
	showSearch: true,
	defaultSeachKey: 'Name',
});
const refetch = defineModel<Nullable<boolean>>('refetch', { type: Boolean, default: false });
const componentData = reactive<DatatableServerComponentData>({
	search: {
		key: componentProperties.defaultSeachKey ?? 'Name',
		value: '',
		operator: ConditionOperator.Contains,
	},
	loading: false,
	items: [],
	totalItems: 0,
	itemsPerPage: componentProperties.itemsPerPage,
	page: 1,
	selectedItems: componentProperties.showSelectedItems ? [] : undefined,
	defaultDate: componentProperties.defaultDate ?? '',
	startDate: componentProperties.defaultDateRangeStart ?? '',
	endDate: componentProperties.defaultDateRangeEnd ?? '',
});

const emits = defineEmits<DatatableEvents>();

const startLoading = () => {
	componentData.loading = true;
};
const stopLoading = () => {
	componentData.loading = false;
};

const headers = computed(() => {
	if (componentData.items.length && componentProperties.hasActions && componentProperties.headers) {
		const actionsHeader = {
			key: 'actions',
			title: getText({ key: 'variations.action.textCammelCased', single: false }),
		} as DataTableHeader;
		return componentProperties.headers.concat(actionsHeader);
	} else return componentProperties.headers;
});
const searchableFields = computed(() => {
	const fields: TextFieldSearchField[] = [];
	headers.value?.forEach(header => {
		fields.push({ text: getText(header.title), key: header.key });
	});
	return fields;
});

async function loadItems(objs: any, delay = 500) {
	clearTimeout(componentData.timeout);
	const search =
		componentData.search.value == ''
			? null
			: {
					key: componentData.search.key ?? componentProperties.defaultSeachKey,

					value: componentData.search.value || '',
					operator: componentData.search.operator || ConditionOperator.Contains,
			  };
	componentData.timeout = setTimeout(async () => {
		startLoading();
		const result = await componentProperties.fetch({
			page: objs.page,
			itemsPerPage: objs.itemsPerPage,
			sortBy: objs.sortBy,
			search,
			customFilter: componentProperties?.customFilter,
			startDate: objs.startDate || componentData.startDate,
			endDate: objs.endDate || componentData.endDate,
		});
		componentData.items = result.items;
		componentData.totalItems = result.totalItems;

		stopLoading();
	}, delay);
}

const getSlotDatatable = (_slots: any) => {
	let listEnableSlot = ['top'];

	let _filterSlots = _pickBy(_cloneDeep(_slots), function (slot, key) {
		return _startsWith(key, 'item.') || _includes(listEnableSlot, key);
	});

	return _filterSlots;
};

function configButtonClicked() {
	emits(Events.onConfigClicked);
}

function addClicked() {
	emits(Events.onAddClicked);
}

function edit(item: any) {
	// TODO
	return;
}

function remove(item: any) {
	// TODO
	return;
}

async function onDateUpdate() {
	const dateSplit = componentData.dateRange.split(' - ');

	if (dateSplit.length == 2) {
		componentData.startDate = dateSplit[0];
		componentData.endDate = dateSplit[1];
	} else {
		componentData.startDate = componentData.endDate = '';
	}
}

watch(
	() => componentProperties.customFilter,
	() => {
		// Technical debts : Waiting for development
		// Caminho alternativo para força um refetch.
		componentData.page = 0;
		nextTick(() => {
			componentData.page = 1;
		});
	},
	{ deep: true },
);

watch(
	() => componentData.selectedItems,
	() => {
		if (componentData.selectedItems) emits('selectedItems', componentData.selectedItems);
	},
	{ deep: true },
);

watch(
	() => refetch.value,
	async refetch => {
		if (!refetch) return;
		await loadItems(
			{
				page: componentData.page,
				itemsPerPage: componentData.itemsPerPage,
				startDate: componentData.startDate,
				endDate: componentData.endDate,
			},
			0,
		);
		emits(Events.onModelValueUpdate, false);
	},
);
</script>
