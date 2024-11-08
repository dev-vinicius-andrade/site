import { useLocaleStore } from '@/stores/locale';
import { Locale } from '@/types/locale';
import i18n from '@plugins/i18n';
export function useLocaleWatcher() {
	const localeStore = useLocaleStore();
	function switchLocale(newLocale?: Locale) {
		if (!newLocale) return;
		const { locale, messages } = i18n.global;
		locale.value = newLocale.locale;
		const messagesValue = messages.value as any;
		if (!messagesValue) return;
	}
	const localeWatcher = watch(
		() => localeStore.currentLocale,
		currentLocale => switchLocale(currentLocale),
	);
	switchLocale(localeStore.currentLocale);
	return {
		localeWatcher,
		switchLocale,
	};
}
