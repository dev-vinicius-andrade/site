import { LocaleMessagesForm } from '@/types/locale/messages/form';
export const messages: LocaleMessagesForm = {
	form: {
		rules: {
			templates: {
				fieldRequired: "@:{'texts.field'} {field} is required",
				timeMustBeGreaterThan: "@:{'texts.field'} {field} must be greater than {comparingField}",
			},
		},
	},
};
