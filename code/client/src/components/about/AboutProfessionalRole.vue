<template>
	<VContainer fluid class="">
		<VRow class="">
			<span class="tw-text-justify">
				<MultiColorText
					:text="getTextFromKey('texts.softwareEngineer')"
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
		<RowCentralizedContent
			class="tw-w-full tw-p-0 !tw-mt-5"
			content-columns="auto"
			content-column-classes="tw-p-0 tw-text-justify"
		>
			<span class="tw-text-justify">
				{{ getTextFromKey('components.about.professionalRole') }}
			</span>
		</RowCentralizedContent>
	</VContainer>
</template>
<style></style>
