import { Nullable } from '@/types/nullable';
import { Locale } from '@/types/locale';
import { Locales } from '@/enums';
import { defineStore } from 'pinia';
const defaultLocale = { locale: Locales.pt, text: { key: 'locales.pt' } } as Locale;
export const useLocaleStore = defineStore('LocaleStore', {
	state: () => ({
		currentLocale: useStorage('currentLocale', defaultLocale, localStorage),
		availableLocales: useStorage(
			'availableLocales',
			[{ locale: Locales.en, text: { key: 'locales.en' } }, defaultLocale] as Locale[],
			localStorage,
		),
	}),
	getters: {
		isPtBr: state => state.currentLocale.locale == Locales.pt,
	},
	actions: {
		set(locale: Nullable<Locale>) {
			this.currentLocale = locale ?? defaultLocale;
		},
		getOrDefault(locale?: string): Locale {
			if (!locale) return defaultLocale;
			const foundLocale = this.availableLocales.find(l => l.locale === locale);
			if (!foundLocale) return defaultLocale;
			return foundLocale;
		},
	},
});
