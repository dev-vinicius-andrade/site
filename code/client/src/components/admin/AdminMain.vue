<template>
	<Tabs v-model="tabs" vertical>
		<template #tab-0> <AdminSupportedLanguage /> </template>
	</Tabs>
</template>
<script setup lang="ts">
import AdminSupportedLanguage from '@/components/admin/AdminSupportedLanguage.vue';
import Tabs from '@/components/tabs/Tabs.vue';
import { Tab } from '@/types/component/tab';

const tabNameClass = computed<string>(() => {
	return '!tw-rounded-lg tw-border tw-p-5 tw-m-1 tw-flex tw-justify-center tw-items-center';
});
const tabs = computed<Tab[]>(() => {
	return [
		{
			id: 0,
			title: { key: 'variations.supportedLanguage.textPascalCased' },
			nameClass: tabNameClass.value,
		},
	];
});
</script>
