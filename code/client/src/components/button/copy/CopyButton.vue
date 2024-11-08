<template>
	<VTooltip :model-value="data.showTooltip" :open-on-hover="false" :location="properties.tooltipLocation">
		<template v-slot:activator="{ props }">
			<VBtn
				icon
				:color="properties.buttonColor"
				:size="properties.size"
				:elevation="elevation"
				@click="copyData"
				v-on:hover="data.showTooltip = false"
				v-bind="props"
			>
				<VIcon :color="data.iconColor">{{ data.icon }}</VIcon>
			</VBtn>
		</template>
		Copied to clipboard
	</VTooltip>
</template>
<script setup lang="ts">
import { Nullable } from '@/types/nullable';
import type { Anchor } from '@/types/vuetify';
export interface CopyButtonProps {
	size?: string;
	elevation?: number | undefined;
	data?: Nullable<string>;
	tooltipLocation?: Anchor;
	showAsCopiedTimeoutMs?: number;
	buttonColor?: string;
	changeIconOnCopy?: boolean;
}
export interface CopyButtonData {
	showTooltip: boolean;
	icon: string;
	iconColor?: string;
}
const properties = withDefaults(defineProps<CopyButtonProps>(), {
	size: 'small',
	elevation: 0,
	tooltipLocation: 'end',
	buttonColor: 'transparent',
	showAsCopiedTimeoutMs: 1000,
	changeIconOnCopy: true,
});
const data = reactive<CopyButtonData>({
	showTooltip: false,
	icon: 'mdi-content-copy',
	iconColor: 'grey',
});
function showTooltip() {
	data.showTooltip = true;
	setTimeout(() => {
		data.showTooltip = false;
	}, properties.showAsCopiedTimeoutMs);
}
function changeIconOnCopy() {
	if (!properties.changeIconOnCopy) return;
	data.icon = 'mdi-check';
	data.iconColor = 'green';
	setTimeout(() => {
		data.icon = 'mdi-content-copy';
		data.iconColor = 'grey';
	}, properties.showAsCopiedTimeoutMs);
}
async function copyData() {
	if (!properties?.data) return;
	await navigator.clipboard.writeText(properties.data);
	changeIconOnCopy();
	showTooltip();
	return true;
}
</script>
