<template>
	<ButtonDropdown>
		<template #activator="{ props }">
			<slot name="activator">
				<VBtn v-bind="props" variant="text">
					<VIcon>mdi-translate</VIcon>
				</VBtn>
			</slot>
		</template>
		<template #default="{ close }">
			<VList>
				<VListItem
					v-for="(locale, index) in availableLocales"
					:key="index"
					@click.stop="setLocale(locale.value, close)"
					close
				>
					<VListItemTitle>
						{{ locale.title }}
					</VListItemTitle>
				</VListItem>
			</VList>
		</template>
	</ButtonDropdown>
</template>
<script setup lang="ts">
import { useLocaleStore } from '@/stores/locale';
import { ListItem } from '@/types/component/list/item';
import { Locale } from '@/types/locale';
import { Nullable } from '@/types/nullable';

const localeStore = useLocaleStore();
const availableLocales = computed(
	() =>
		localeStore.availableLocales?.map(locale => {
			return {
				title: getText(locale.text) ?? undefined,
				value: locale,
			} as ListItem<Locale>;
		}) ?? [],
);
function setLocale(locale: Nullable<Locale>, close: () => void) {
	localeStore.set(locale);
	close();
}
</script>
