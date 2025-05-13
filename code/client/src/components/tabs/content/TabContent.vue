<template>
	<VWindowItem eager>
		<slot name="prepend" />
		<slot />
		<slot name="append" />
	</VWindowItem>
</template>

<script setup lang="ts">
import { LocaleText } from '@/types/locale/text';
export interface CardTabContentComponentProperties {
	title?: LocaleText;
}
const componentProperties = withDefaults(defineProps<CardTabContentComponentProperties>(), {});
</script>
