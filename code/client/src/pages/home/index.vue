<template>
	<VContainer class="tw-h-full" fluid>
		<VRow>
			<VCol class="tw-h-full tw-justify-center tw-items-center" :cols="biographyColumns">
				<BiographyCard class="tw-h-full !tw-max-w-screen-sm" />
			</VCol>
			<VCol :cols="contentColumns" class="tw-h-full">
				<AboutProfessionalRole />
				<AboutExperience class="tw-mt-5" />
				<AboutExperienceTotals class="tw-mt-5" />
			</VCol>
		</VRow>
	</VContainer>
</template>
<script setup lang="ts">
const display = useVuetifyDisplay();
const biographyColumns = computed<number>(() => {
	if (display.mdAndUp.value) return 4;
	return 12;
});
const contentColumns = computed<number>(() => {
	if (display.mdAndUp.value) return 7;
	return 12;
});
</script>
