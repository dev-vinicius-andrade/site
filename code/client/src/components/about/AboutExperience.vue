<template>
	<VContainer fluid class="">
		<VRow class="">
			<span class="tw-text-justify">
				<MultiColorText
					:text="yearsOfExperience"
					:lines-options="[
						{ color: '', groupLines: [0] },
						{ color: 'tw-text-slate-700', groupLines: [1, 2] },
					]"
					uppercase
					bold
					font-size="tw-text-5xl"
				>
				</MultiColorText>
			</span>
		</VRow>
	</VContainer>
</template>
<script setup lang="ts">
const yearsOfExperience = computed<string>(() =>
	getTextFromKey('templates.yearsOfExperience', { params: { years: 11 } }),
);
</script>
