<template>
	<VContainer fluid class="">
		<VRow class="">
			<span class="tw-text-justify">
				<MultiColorText
					:text="getTextFromKey('texts.softwareEngineer')"
					:lines-options="[
						{ color: 'tw-text-app-primary', groupLines: [0], class: 'tw-text-[70px]' },
						{ color: 'tw-text-app-secondary', groupLines: '*', class: 'tw-text-[70px]' },
					]"
					uppercase
					bold
					font-size="tw-text-5xl"
				>
				</MultiColorText>
			</span>
		</VRow>
		<RowLeftContent
			class="tw-w-full tw-p-0 !tw-mt-5"
			content-columns="auto"
			content-column-classes="tw-p-0 tw-text-justify tw-whitespace-pre tw-text-wrap"
		>
			<span>
				{{ getTextFromKey('components.about.professionalRole') }}
			</span>
		</RowLeftContent>
	</VContainer>
</template>
<style></style>
