<template>
	<VCard
		class="tw-rounded-[25px] elevation-5"
		:theme="themeStore.data.currentTheme === ThemeEnum.Light ? 'dark' : 'light'"
	>
		<VCardTitle>
			<RowRightContent content-columns="2" class="tw-mr-2">
				<div>
					<VAvatar :image="logo" size="56px" />
				</div>
			</RowRightContent>
		</VCardTitle>
		<VCardText>
			<RowCentralizedContent
				class="mt-5 tw-items-center tw-justify-center tw-content-center"
				content-columns="auto"
			>
				<div :class="avatarWrapperClass" :style="{ maxWidth: imageWidth }">
					<VImg :src="avatar" :width="imageWidth" aspect-ratio="16/9" :class="avatarRoundClass" />
				</div>
			</RowCentralizedContent>

			<RowCentralizedContent content-columns="8" class="tw-text-center tw-text-2xl tw-font-bold">
				<span class="tw-uppercase"> {{ name }}</span>
			</RowCentralizedContent>
			<RowCentralizedContent content-columns="8" class="tw-text-center tw-text-2xl tw-font-bold">
				<VChip class="tw-uppercase" color="primary"> {{ ageText }}</VChip>
			</RowCentralizedContent>
			<RowCentralizedContent content-columns="10" class="tw-text-lg !tw-text-center">
				<span class="!tw-text-center">{{ getTextFromKey('components.biography.about') }}</span>
			</RowCentralizedContent>

			<VCardActions class="tw-mt-5">
				<RowCentralizedContent content-columns="auto">
					<BiographySocialMedia />
				</RowCentralizedContent>
			</VCardActions>
		</VCardText>
	</VCard>
</template>
<script setup lang="ts">
import BiographySocialMedia from '@/components/biography/BiographySocialMedia.vue';
import ThemeEnum from '@/enums/theme';
import { useConfigurationsStore } from '@/stores/configuration';
import { useThemeStore } from '@/stores/theme';
import avatar from '@assets/images/avatar/avatar.png';
const { logo } = useLogo({ inverted: true });
const configurationsStore = useConfigurationsStore();
const themeStore = useThemeStore();
const name = computed(() => {
	return configurationsStore.configurations.biography.name;
});
const age = computed(() => {
	const birthday = configurationsStore.configurations.biography.birthday;
	if (!birthday) return null; // return null if birthday is not available

	const birthDate = new Date(birthday);
	const today = new Date();

	let age = today.getFullYear() - birthDate.getFullYear();
	const monthDifference = today.getMonth() - birthDate.getMonth();

	// Adjust age if the birthday hasn't occurred yet this year
	if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}

	return age;
});
const ageText = computed(() => {
	return getTextFromKey('templates.age', { params: { age: age.value } });
});
const imageWidth = computed(() => '256px');
const avatarRoundClass = computed(() => 'tw-rounded-lg');
const avatarWrapperClass = computed(() => {
	const classes = [avatarRoundClass.value, 'tw-bg-gradient-to-b'];
	classes.push(themeStore.data.currentTheme === ThemeEnum.Dark ? 'tw-from-[#b4b96b]' : 'tw-from-[#fff]');
	return classes.join(' ');
});
</script>
