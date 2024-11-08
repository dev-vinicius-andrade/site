import { LocaleMessagesForm } from '@/types/locale/messages/form';

export const messages: LocaleMessagesForm = {
	form: {
		rules: {
			templates: {
				fieldRequired: "@:{'texts.field'} {field} é obrigatório",
				timeMustBeGreaterThan: "@:{'texts.field'} {field} deve ser maior que {comparingField}",
			},
		},
	},
};
