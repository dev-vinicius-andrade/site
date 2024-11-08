<template>
	<img :src="logo" :width="componentProperties.width" alt="Logo" />
</template>
<script setup lang="ts">
import { useLogo } from '@/composables/useLogo';
declare type ComponentProperties = {
	width?: string | number;
	alt?: string;
	dark?: boolean;
	light?: boolean;
};
const componentProperties = withDefaults(defineProps<ComponentProperties>(), {
	width: '100vw',
});
const { logo } = useLogo();
</script>
