import { defineStore } from 'pinia';

import { LocaleText } from '@/types/locale/text';
import { Anchor } from '@/types/vuetify';
interface ISnackBarNotification extends ISnackBarOptions {
	text?: LocaleText | string;
	details?: any;
}
interface ISnackBarStoreState {
	notification?: ISnackBarNotification;
}
export interface ISnackBarOptions {
	location?: Anchor;
	timeout?: number;
	color?: string;
	icon?: string;
	multiLine?: boolean;
}
export const defaultSnackBarOptions: ISnackBarOptions = {
	location: 'top right',
	timeout: 3000,
	color: 'primary',
	multiLine: true,
	icon: 'mdi-information-outline',
};
export const useNotificationsStore = defineStore('NotificationsStore', {
	state: (): ISnackBarStoreState => {
		return {
			notification: undefined,
		};
	},
	actions: {
		clear() {
			this.notification = undefined;
		},
		notify({ text, details, location, timeout, multiLine, icon, color }: ISnackBarNotification) {
			this.notification = {
				location: location ?? defaultSnackBarOptions.location,
				timeout: timeout ?? defaultSnackBarOptions.timeout,
				multiLine: !!multiLine,
				icon: icon ?? defaultSnackBarOptions.icon,
				color: color ?? defaultSnackBarOptions.color,
				details,
				text,
			};
		},
		success({ text, details, location, timeout, multiLine }: ISnackBarNotification) {
			const notification = {
				location,
				timeout,
				multiLine,
				text,
				details,
				color: 'success',
				icon: 'mdi-check',
			} as ISnackBarNotification;
			this.notify(notification);
		},
		successFromKey(key: string, { details, location, timeout, multiLine }: ISnackBarNotification) {
			const notification = {
				location,
				timeout,
				multiLine,
				text: getTextFromKey(key),
				details,
				color: 'success',
				icon: 'mdi-check',
			} as ISnackBarNotification;
			this.notify(notification);
		},
		error({ text, details, location, timeout, multiLine }: ISnackBarNotification) {
			const notification = {
				location,
				timeout,
				multiLine,
				text,
				details,
				color: 'error',
				icon: 'mdi-close-circle',
			} as ISnackBarNotification;
			this.notify(notification);
		},
		errorFromKey(key: string, { details, location, timeout, multiLine }: ISnackBarNotification) {
			const notification = {
				location,
				timeout,
				multiLine,
				text: getTextFromKey(key),
				details,
				color: 'error',
				icon: 'mdi-close-circle',
			} as ISnackBarNotification;
			this.notify(notification);
		},
		info({ text, details, location, timeout, multiLine }: ISnackBarNotification) {
			const notification = {
				location,
				timeout,
				multiLine,
				text,
				details,
				color: 'info',
				icon: 'mdi-alert-circle-outline',
			} as ISnackBarNotification;
			this.notify(notification);
		},
		infoFromKey(key: string, { details, location, timeout, multiLine }: ISnackBarNotification) {
			const notification = {
				location,
				timeout,
				multiLine,
				text: getTextFromKey(key),
				details,
				color: 'info',
				icon: 'mdi-alert-circle-outline',
			} as ISnackBarNotification;
			this.notify(notification);
		},

		warning({ text, details, location, timeout, multiLine }: ISnackBarNotification) {
			const notification = {
				location,
				timeout,
				multiLine,
				text,
				details,
				color: 'warning',
				icon: 'mdi-alert-circle-outline',
			} as ISnackBarNotification;

			this.notify(notification);
		},
		warningFromKey(key: string, { details, location, timeout, multiLine }: ISnackBarNotification) {
			const notification = {
				location,
				timeout,
				multiLine,
				text: getTextFromKey(key),
				details,
				color: 'warning',
				icon: 'mdi-alert-circle-outline',
			} as ISnackBarNotification;

			this.notify(notification);
		},
	},
});
