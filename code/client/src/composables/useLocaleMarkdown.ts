import { useLocaleStore } from '@/stores/locale';
import { Nullable } from '@/types/nullable';
export declare type LocaleMarkdownResult = {
	success: ComputedRef<boolean>;
	error?: Nullable<any>;
	content?: ComputedRef<Nullable<string>>;
	isLoaded: ComputedRef<boolean>;
};
export function useLocaleMarkdown(markDownAssetsPath: string): LocaleMarkdownResult {
	const localeStore = useLocaleStore(); // Access Pinia store for locale
	const markdownContent = ref(null);
	const error = ref<Nullable<any>>(null);

	const loadMarkdown = async () => {
		try {
			const locale = localeStore.currentLocale.locale; // Assume `locale` is stored in Pinia
			const markdownPath = `@/assets/markdowns/${markDownAssetsPath}/${locale}.md`;

			const markdownModule = await import(/* @vite-ignore */ markdownPath);
			markdownContent.value = markdownModule.default;

			error.value = null;
		} catch (e: any) {
			error.value = `Failed to load markdown file: ${e.message}`;
		}
	};

	// Load markdown whenever the locale changes
	watch(
		() => localeStore.currentLocale.locale,
		async () => {
			await loadMarkdown();
		},
		{ immediate: true },
	);

	return {
		content: computed(() => markdownContent.value),
		error,
		isLoaded: computed(() => isNullOrEmpty(error) && !isNullOrEmpty(markdownContent.value)),
		success: computed(() => isNullOrEmpty(error) && !isNullOrEmpty(markdownContent.value)),
	};
}
