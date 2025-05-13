<template>
	<VContainer fluid class="">
		<VRow class="">
			<span class="tw-text-justify">
				<MultiColorText
					:text="yearsOfExperience"
					:lines-options="[
						{
							color: 'tw-text-app-primary',
							groupLines: [0, 1, 2],
							class: ['tw-text-[70px]'],
						},
						{
							color: 'tw-text-app-secondary',
							groupLines: [3],
							class: ['tw-text-[70px]'],
						},
					]"
					uppercase
					bold
					font-size="tw-text-5xl"
				>
				</MultiColorText>
			</span>
		</VRow>
		<VRow>
			<Markdown url="experience/summary" from-assets use-locale />
		</VRow>
	</VContainer>
</template>
<script setup lang="ts">
const yearsOfExperience = computed<string>(() =>
	getTextFromKey('templates.yearsOfExperience', { params: { years: '11' } }),
);
</script>
