<template>
	<div>
		<VContainer fluid class="" v-if="hasError || isLoading">
			<VRow v-if="isLoading">
				<LoadingWithLogo />
			</VRow>
			<VRow v-else-if="hasError">
				{{ error }}
			</VRow>
		</VContainer>
		<MarkdownRender :source="markdown" />
	</div>
</template>
<script setup lang="ts">
import MarkdownRender from 'vue-markdown-render';
import { Nullable } from '@/types/nullable';
import axios from 'axios';
import { useLocaleStore } from '@/stores/locale';
declare type Source = {
	url?: Nullable<string>;
	fromAssets?: boolean;
};
declare type ComponentProperties = {
	markdown?: Nullable<string>;
	useLocale?: boolean;
	localeSources?: {
		[key: Locales | string]: Source;
	};
} & Source;
const componentProperties = withDefaults(defineProps<ComponentProperties>(), {
	url: null,
	markdown: null,
	fromAssets: false,
	useLocale: false,
});
const localeStore = useLocaleStore();
const isMounted = ref<boolean>(false);
const isLoaded = ref<boolean>(false);
const error = ref<Nullable<any>>(null);
const markdownValue = ref<Nullable<string>>(null);
const hasError = computed<boolean>(() => error.value !== null);
const isLoading = computed<boolean>(() => !isLoaded.value && !hasError.value);
const markdown = computed<string>(() => {
	if (isNullOrEmpty(markdownValue.value)) return '';
	return markdownValue.value as string;
});
async function fetchFromExternalUrl(url: string) {
	if (isNullOrEmpty(componentProperties.url)) {
		error.value = 'No URL provided';
		return;
	}
	try {
		const response = await axios(url);
		if (!response.status || response.status !== 200) {
			error.value = response.statusText;
			markdownValue.value = null;
			isLoaded.value = false;
			return;
		}
		markdownValue.value = response.data;
		isLoaded.value = true;
	} catch (e) {
		error.value = e;
		markdownValue.value = null;
		isLoaded.value = false;
	}
}
async function fetchFromAssets(url: string) {
	try {
		const markdownModule = await import(/* @vite-ignore */ `@/assets/markdowns/${url}`);
		markdownValue.value = markdownModule.default;
	} catch (e) {
		error.value = e;
		markdownValue.value = null;
		isLoaded.value = false;
	}
}

function useRawMarkdown() {
	markdownValue.value = componentProperties.markdown;
	isLoaded.value = true;
	error.value = null;
}
const isLoadFromRawMarkdown = computed<boolean>(() => {
	return (
		!componentProperties.fromAssets &&
		!isNullOrEmpty(componentProperties.markdown) &&
		isNullOrEmpty(componentProperties.url)
	);
});
const isLoadFromAssets = computed<boolean>(() => {
	return componentProperties.fromAssets && isNullOrEmpty(componentProperties.markdown);
});
const isLoadFromExternalUrl = computed<boolean>(() => {
	return !isLoadFromRawMarkdown.value && !isLoadFromAssets.value;
});

function handleInvalidProperties(errorMessage?: string) {
	markdownValue.value = null;
	isLoaded.value = false;
	error.value = errorMessage ?? 'Invalid properties';
}

async function loadMarkDownFromUrl(url: string) {
	if (isLoadFromAssets.value) {
		await fetchFromAssets(url);
		return;
	}

	if (isLoadFromExternalUrl.value) {
		await fetchFromExternalUrl(url);
		return;
	}
	handleInvalidProperties('You must provide a URL or markdown content');
}
async function loadMarkdownUsingLocale() {
	const { locale } = localeStore.currentLocale;
	//const localeSourcesLength = componentProperties.localeSources?.length ?? 0;
	// if (isNullOrEmpty(componentProperties.localeSources) || localeSourcesLength === 0 ) {
	// 	handleInvalidProperties('No locale sources provided');
	// 	return;
	// }
	const localeSources = componentProperties.localeSources ?? ({} as Record<string, Source>);
	try {
		const source = localeSources[locale];
		if (isNullOrEmpty(source)) {
			await loadMarkDownFromUrl(`${componentProperties.url}/${locale}.md`);
			return;
		}
		await loadMarkDownFromUrl(`${source}/${locale}.md`);
	} catch (e: any) {
		error.value = e;
		markdownValue.value = null;
		isLoaded.value = false;
	}
}
async function loadMarkdown() {
	if (isLoadFromRawMarkdown.value) {
		useRawMarkdown();
		return;
	}
	if (!componentProperties.useLocale) {
		await loadMarkDownFromUrl(componentProperties.url as string);
		return;
	}
	if (componentProperties.useLocale) {
		await loadMarkdownUsingLocale();
		return;
	}

	handleInvalidProperties();
}
onMounted(async () => {
	await loadMarkdown();
	isMounted.value = true;
});
</script>
