import { Variation } from '@/types/locale';
export interface LocaleLocales {
	locales: {
		[key: string]: string | Variation;
	};
}
