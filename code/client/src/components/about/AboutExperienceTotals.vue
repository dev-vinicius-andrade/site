<template>
	<VContainer fluid class="">
		<VRow class="">
			<VCol v-for="(experience, index) in experiences" :key="index" :cols="contentColumns">
				<VCard color="transparent" elevation="0">
					<VCardTitle class="!tw-text-5xl tw-font-bold">
						<RowRightContent content-columns="auto">
							<AnimatedNumber
								:number="experience.experience"
								:append="experience.titleAppended"
								:prepend="experience.titlePrepended"
								:delay-ms="500"
							/>
						</RowRightContent>
					</VCardTitle>
					<VCardText>
						<span class="tw-text-xl tw-text-slate-700"> {{ experience.title }}</span>
					</VCardText>
				</VCard>
			</VCol>
		</VRow>
	</VContainer>
</template>
<script setup lang="ts">
import { LocaleText } from '@/types/locale/text';
import { VCardText } from 'vuetify/components';

declare type ExperienceTotal = {
	title: string;
	titlePrepended?: string;
	titleAppended?: string;
	experience: number;
};
const experiences = computed<ExperienceTotal[]>(() => [
	{
		title: getTextFromKey('components.about.experienceTotals.yearsOfExperience'),
		experience: 11,
		titleAppended: '+',
	},
	{
		title: getTextFromKey('components.about.experienceTotals.softwareEngineer'),
		experience: 11,
		titleAppended: '+',
	},
	{
		title: getTextFromKey('components.about.experienceTotals.fullStackDeveloper'),
		experience: 10,
		titleAppended: '+',
	},
	{
		title: getTextFromKey('components.about.experienceTotals.softwareArchitecture'),
		experience: 10,
		titleAppended: '+',
	},
	{
		title: getTextFromKey('components.about.experienceTotals.knownProgramingLanguages'),
		experience: 10,
		titleAppended: '+',
	},
]);
const contentColumns = useResponsibleColumnsFromListLength(experiences.value.length);
</script>
