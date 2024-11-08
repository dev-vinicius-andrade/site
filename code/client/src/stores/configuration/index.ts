import axios from 'axios';
import { defineStore } from 'pinia';
import { ConfigurationType } from '@/types/configurations';
import { removeCommentsFromJson } from '@/helpers';
import { useNotificationsStore } from '@/stores/notification';
import { Nullable } from '@/types/nullable';
export const useConfigurationsStore = defineStore('ConfigurationsStore', {
	state: () => ({
		configurations: useStorage('configurations', {} as ConfigurationType, localStorage),
		loadingConfigurationInterval: useTypedStorage<Nullable<NodeJS.Timeout>>('loadingConfigurationInterval', null),
		isConfigurationLoaded: useTypedStorage<boolean>('isConfigurationLoaded', false),
		isLoadingConfiguration: useTypedStorage<boolean>('isLoadingConfiguration', false),
	}),
	actions: {
		set(configurations?: ConfigurationType | string) {
			const snackBarStore = useNotificationsStore();
			try {
				this.configurations = (
					isString(configurations)
						? JSON.parse(removeCommentsFromJson(configurations as string))
						: configurations
				) as ConfigurationType;
			} catch (error) {
				snackBarStore.error({ text: `Error in set configurations, ${error}` });
			}
		},
		async get(fromCache: boolean = true) {
			try {
				if (fromCache && this.configurations && !isObjectEmpty(this.configurations)) return this.configurations;
				const response = await axios.get('/configurations');
				this.set(response.status !== 200 ? null : response.data);
				return this.configurations;
			} catch (error) {
				return null;
			}
		},
		async loadConfiguration(retryInterval: number = 3) {
			const self = this;
			this.loadingConfigurationInterval = setInterval(async () => {
				try {
					this.isLoadingConfiguration = true;
					const configuration = await self.get();
					self.isConfigurationLoaded = !!configuration;
					if (!configuration) return;
					if (!self.loadingConfigurationInterval) return;
					clearInterval(self.loadingConfigurationInterval);
					self.loadingConfigurationInterval = null;
					this.isLoadingConfiguration = false;
				} catch (error) {
					console.error('Failed to load configuration:', error);
				}
			}, retryInterval);
		},
	},
});
