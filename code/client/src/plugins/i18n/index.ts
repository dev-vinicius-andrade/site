import { getFileName } from '@helpers';
import { createI18n } from 'vue-i18n';
import _merge from 'lodash/merge';
import _set from 'lodash/set';
const localeMessagesFiles = import.meta.glob<{ default: any }>('@locales/messages/*/*.ts', { eager: true });
const datetimeFormatsFiles = import.meta.glob<{ default: any }>('@locales/datetimeFormats/*.ts', { eager: true });
const validLocale = localStorage.currentLocale ? JSON.parse(localStorage.currentLocale).locale : 'pt';
let messages = {};
let datetimeFormats = {};
Object.entries(localeMessagesFiles).forEach(([key, value]) => {
	const localeFromFileName = getFileName(key);
	const valueAsAny = value as any;
	messages = _merge(messages, _set({}, localeFromFileName, valueAsAny.messages));
});
Object.entries(datetimeFormatsFiles).forEach(([key, value]) => {
	const localeFromFileName = getFileName(key);
	datetimeFormats = _merge(datetimeFormats, _set({}, localeFromFileName, value.default));
});
const i18n = createI18n({
	legacy: false,
	locale: validLocale,
	fallbackLocale: 'pt',
	messages,
	fallbackWarn: process.env.NODE_ENV !== 'production',
	missingWarn: process.env.NODE_ENV !== 'production',
	datetimeFormats,
	warnHtmlMessage: false,
});
export default i18n;
