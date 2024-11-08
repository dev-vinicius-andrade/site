<template>
	<span :class="textClasses">
		<!-- <span class="tw-bg-clip-text tw-text-transparent tw-bg-gradient-to-r tw-from-[#475569] tw-to-[#fff] tw-uppercase"> -->
		<slot />
	</span>
</template>
<script setup lang="ts">
import ThemeEnum from '@/enums/theme';
import { useThemeStore } from '@/stores/theme';

declare type ComponentProperties = {
	reverseColors?: boolean;
	direction?: 'to-r' | 'to-l' | 'to-t' | 'to-b' | 'to-tr' | 'to-tl' | 'to-br' | 'to-bl';
	firstColor?: string;
	secondColor?: string;
	firstColorDark?: string;
	secondColorDark?: string;
	uppercase?: boolean;
	fontSize?: string;
};
const componentProperties = withDefaults(defineProps<ComponentProperties>(), {
	reverseColors: false,
	direction: 'to-r',
	firstColor: '#fff',
	secondColor: '#353334',
	firstColorDark: '#fff',
	secondColorDark: '#353334',
	uppercase: false,
});
const themeStore = useThemeStore();
const direction = computed(() => {
	switch (componentProperties.direction) {
		case 'to-r':
			return 'tw-bg-gradient-to-r';
		case 'to-l':
			return 'tw-bg-gradient-to-l';
		case 'to-t':
			return 'tw-bg-gradient-to-t';
		case 'to-b':
			return 'tw-bg-gradient-to-b';
		case 'to-tr':
			return 'tw-bg-gradient-to-tr';
		case 'to-tl':
			return 'tw-bg-gradient-to-tl';
		case 'to-br':
			return 'tw-bg-gradient-to-br';
		case 'to-bl':
			return 'tw-bg-gradient-to-bl';
		default:
			return 'tw-bg-gradient-to-r';
	}
});
const color = computed(() => {
	const { currentTheme } = themeStore.data;

	if (currentTheme === ThemeEnum.Dark && !componentProperties.reverseColors)
		return [
			`tw-from-[${componentProperties.firstColorDark}]`,
			`tw-to-[${componentProperties.secondColorDark}]`,
		].join(' ');
	else if (currentTheme === ThemeEnum.Dark && componentProperties.reverseColors)
		return [
			`tw-from-[${componentProperties.secondColorDark}]`,
			`tw-to-[${componentProperties.firstColorDark}]`,
		].join(' ');
	else if (currentTheme !== ThemeEnum.Dark && !componentProperties.reverseColors)
		return [`tw-from-[${componentProperties.firstColor}]`, `tw-to-[${componentProperties.secondColor}]`].join(' ');

	return [`tw-from-[${componentProperties.secondColor}]`, `tw-to-[${componentProperties.firstColor}]`].join(' ');
});
const textClasses = computed(() => {
	const classes = ['tw-bg-clip-text', 'tw-text-transparent', direction.value, color.value, 'tw-to-100%'];
	if (componentProperties.uppercase) classes.push('tw-uppercase');
	if (componentProperties.fontSize) classes.push(componentProperties.fontSize);
	console.log(classes);
	return classes.join(' ');
});
</script>
