<template>
	<IconifyLineMdMoonFilledAltLoop
		v-if="themeStore.data.currentTheme === ThemeEnum.Dark"
		:size="componentProperties.size"
		:class="componentProperties.class"
	/>
	<IconifyLineMdLightbulbFilled
		v-if="themeStore.data.currentTheme === ThemeEnum.Light"
		:size="componentProperties.size"
		:class="componentProperties.class"
	/>
</template>
<script setup lang="ts">
import ThemeEnum from '@/enums/theme';
import { useThemeStore } from '@/stores/theme';

export interface IThemeIconComponentProperties {
	size?: string;
	class?: string;
}
const themeStore = useThemeStore();
const componentProperties = withDefaults(defineProps<IThemeIconComponentProperties>(), {
	size: '2.25rem',
	class: 'mt-4 ml-4',
});
</script>
