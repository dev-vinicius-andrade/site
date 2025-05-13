<template>
	<VCard v-if="direction === 'horizontal'" :elevation="elevation">
		<VCardTitle>{{ title }} </VCardTitle>
		<VCardText>
			<VRow>
				<slot name="tabs">
					<VTabs v-model="componentData.currentTab" :direction="direction">
						<slot name="tabs">
							<VTab v-for="tab in computedTabs" :class="tab.nameClass">
								<VIcon v-if="tab.prependIcon">{{ tab.prependIcon }}</VIcon>
								{{ getText(tab.title) }}
								<VIcon v-if="tab.appendIcon">{{ tab.appendIcon }}</VIcon>
							</VTab>
						</slot>
					</VTabs>
				</slot>
			</VRow>
			<VRow>
				<VWindow v-model="componentData.currentTab" :direction="direction" :style="style">
					<slot name="tabs-content" :currentTab="currentTab">
						<VWindowItem v-for="tab in computedTabs" :key="tab.id" :class="tab.contentClass">
							<slot :name="`tab-${tab.id}`" :tab="tab"> </slot>
						</VWindowItem>
					</slot>
				</VWindow>
			</VRow>
		</VCardText>
	</VCard>
	<VCard v-else :elevation="elevation">
		<VCardTitle>{{ title }} </VCardTitle>
		<VCardText>
			<VRow>
				<VCol :cols="verticalTabNamesColumns">
					<slot name="tabs">
						<VTabs v-model="componentData.currentTab" :direction="direction">
							<slot name="tabs">
								<VTab v-for="tab in tabs" :class="tab.nameClass">
									<VIcon v-if="tab.prependIcon">{{ tab.prependIcon }}</VIcon>
									{{ getText(tab.title) }}
									<VIcon v-if="tab.appendIcon">{{ tab.appendIcon }}</VIcon>
								</VTab>
							</slot>
						</VTabs>
					</slot>
				</VCol>
				<VCol :cols="verticalTabContentColumns">
					<VWindow v-model="componentData.currentTab" :direction="direction" :style="style">
						<slot name="tabs-content" :currentTab="currentTab">
							<VWindowItem v-for="tab in computedTabs" :key="tab.id" :class="tab.contentClass">
								<slot :name="`tab-${tab.id}`" :tab="tab"> </slot>
							</VWindowItem>
						</slot>
					</VWindow>
				</VCol>
			</VRow>
		</VCardText>
	</VCard>
</template>

<script setup lang="ts">
import { Tab, TabDirection, TabLayoutProperties } from '@/types/component/tab';
import { Nullable } from '@/types/nullable';

import { VCardTitle } from 'vuetify/components';

export interface TabsComponentData {
	currentTab: number | undefined | null;
}

const elevation = defineModel<Nullable<number | string>>('elevation');
const tabs = defineModel<Tab[]>({
	type: Array,
	default: () => [
		{
			title: { key: 'variations.tab.Text' },
		},
	],
});
const direction = computed<TabDirection>(() => (componentProperties.vertical ? 'vertical' : 'horizontal'));
const title = computed<Nullable<string>>(() => getText(componentProperties.title));
const componentProperties = withDefaults(defineProps<TabLayoutProperties>(), {
	id: undefined,
	tabs: () => [{ key: 'texts.tab', value: 0 }],
	tabMinHeight: '50vh',
	tabHeight: '100%',
	removeTabFlexGrow: false,
	tabsNameDisplayMaxLength: 20,
});

const computedTabs = computed<Tab[]>(() => {
	const result: Tab[] = [];
	if (!tabs.value) return result;
	for (let i = 0; i < tabs.value.length; i++) {
		const tab = tabs.value[i];
		let name = getText(tab.title);
		if (name && name.length > componentProperties.tabsNameDisplayMaxLength)
			name = name.substring(0, componentProperties.tabsNameDisplayMaxLength) + '...';

		result.push({ id: i, title: name, contentClass: tab.contentClass, nameClass: tab.nameClass });
	}
	return result;
});
const verticalTabNamesColumns = useResponsibleColumns(componentProperties.verticalTabNamesColumns);

const componentData = reactive<TabsComponentData>({
	currentTab: undefined,
});
</script>
