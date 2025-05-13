import { LocaleMessagesTemplates } from '@/types/locale/messages/templates';

export const messages: LocaleMessagesTemplates = {
	templates: {
		loading: 'Carregando',
		loadingWithElipsis: "@:{'templates.loading'}...",
		notFound: 'Não encontrado',
		areYouSure: 'Tem certeza?',
		areYouSureYouWantToProceed: 'Tem certeza que deseja prosseguir?',
		noContent: 'Nenhum conteúdo',
		noContentAvailable: "@:{'templates.noContent'} disponível",
		noContentType: "@:{'templates.noContent'} de {type}",
		noContentTypeAvailable: "@:{'templates.noContentType'} disponível",
		copyValueToClipboard: 'Copiar valor {value} para área de transferência',
		iAm: 'Eu sou {name}, {role}',
		noDataAvailable: 'Nenhum dado disponível',
		failedToActionWithStatus: 'Falha ao {action}. Código de status: {status}',
		age: '{age} anos',
		yearsOfExperience: '{years} anos de experiência',
		// Add your templates here
	},
};
