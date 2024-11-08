import { Variation } from '@/types/locale';

export interface LocaleMenu {
	menu: {
		[key: string]: string | Variation;
	};
}
