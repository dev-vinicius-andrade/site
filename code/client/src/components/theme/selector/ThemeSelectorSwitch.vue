<template>
	<VListItem>
		<VListItemTitle>
			<VRow justify="center" align="center" class="pa-1">
				<VCol v-if="prependIcon">
					<ThemeIcon class="mt-1" />
				</VCol>
				<VCol cols="auto">
					<VSwitch v-model="reactiveModel" :label="label" hide-details class="ma-1" />
				</VCol>
				<VCol v-if="appendIcon">
					<ThemeIcon class="mt-1" />
				</VCol>
			</VRow>
		</VListItemTitle>
	</VListItem>
</template>
<script setup lang="ts">
import ThemeEnum from '@/enums/theme';
import { useThemeStore } from '@/stores/theme';

export interface IThemeSelectorSwitchComponentProperties {
	showIcon?: boolean;
	iconOnly?: boolean;
	prependIcon?: boolean;
	appendIcon?: boolean;
}
const componentProperties = withDefaults(defineProps<IThemeSelectorSwitchComponentProperties>(), {
	showIcon: true,
	iconOnly: true,
	prependIcon: false,
	appendIcon: true,
});
const localeStore = useThemeStore();
const label = computed(() => (componentProperties.iconOnly ? '' : getText({ key: 'variations.theme.Text' })));
const prependIcon = computed(
	() => componentProperties.showIcon && componentProperties.prependIcon && !componentProperties.appendIcon,
);
const appendIcon = computed(
	() => componentProperties.showIcon && componentProperties.appendIcon && !componentProperties.prependIcon,
);
const reactiveModel = computed({
	get: () => localeStore.data.currentTheme === ThemeEnum.Dark,
	set: (value: boolean) => {
		localeStore.data.currentTheme = value ? ThemeEnum.Dark : ThemeEnum.Light;
	},
});
</script>
