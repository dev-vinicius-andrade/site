<template>
	<VList>
		<VListItem
			v-for="(item, index) in componentProperties.modelValue"
			:key="`menu-item-list-item-${index}`"
			:append-icon="appendIcon(item) ? item.appendIcon : undefined"
			:prepend-icon="prependIcon(item) ? item.prependIcon : undefined"
			:title="item.title"
			:to="item.to"
		/>
	</VList>
</template>
<script setup lang="ts">
import { Menu } from '@/types/menu/item';

export declare type IMenuItemsProperties = {
	modelValue: Menu[];
	appendIcon?: boolean;
	prependIcon?: boolean;
};
const componentProperties = withDefaults(defineProps<IMenuItemsProperties>(), {
	modelValue: () => [],
	appendIcon: true,
	prependIcon: false,
});
const appendIcon = computed(() => (item: Menu) => item.appendIcon && !item.prependIcon && hasIcon(item?.appendIcon));
const prependIcon = computed(() => (item: Menu) => item.prependIcon && !item.appendIcon && hasIcon(item?.prependIcon));
function hasIcon(icon?: string): boolean {
	return !isNullOrUndefined(icon);
}
</script>
