<template>
	<DatatableServer :headers="headers" :fetch="fetch" />
</template>
<script setup lang="ts">
import { DatatableServerFetchObject, DatatableServerFetchResult } from '@/types/component/datatable/server';
import { DataTableHeader } from '@/types/vuetify';

const headers = computed<DataTableHeader[]>(() => {
	return [
		{
			title: getTextFromKey('variations.name.textPascalCased'),
			key: 'name',
		},
	];
});
async function fetch(filters?: DatatableServerFetchObject): Promise<DatatableServerFetchResult> {
	return {
		items: [],
		totalItems: 0,
	};
}
</script>
