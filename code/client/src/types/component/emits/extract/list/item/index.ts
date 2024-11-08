import { ComponentExtendedEmits } from '@/types/component/emits';
import { LocaleText } from '@/types/locale/text';
import { VListItem } from 'vuetify/lib/components/VList/index.mjs';
export declare type ListItem = ComponentExtendedEmits<typeof VListItem> & {
	id: string;
	title?: LocaleText;
};
