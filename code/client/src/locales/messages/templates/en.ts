import { LocaleMessagesTemplates } from '@/types/locale/messages/templates';

export const messages: LocaleMessagesTemplates = {
	templates: {
		loading: 'Loading',
		loadingWithElipsis: "@:{'templates.loading'}...",
		notFound: 'Not Found',
		areYouSure: 'Are you sure?',
		areYouSureYouWantToProceed: 'Are you sure you want to proceed?',
		noContent: 'Nenhum conteúdo',
		noContentAvailable: "@:{'templates.noContent'} disponível",
		noContentType: "@:{'templates.noContent'} de {type}",
		noContentTypeAvailable: "@:{'templates.noContentType'} disponível",
		copyValueToClipboard: 'Copiar valor {value} para área de transferência',

		noDataAvailable: 'Nenhum dado disponível',
		failedToActionWithStatus: 'Failed to {action}. Status code: {status}',
		iAm: 'I am {name}, {role}',
		age: '{age} years old',
		// Add your templates here
	},
};
