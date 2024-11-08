import { ConfigurationType } from '@/types/configurations';
import { useConfigurationsStore } from '@/stores/configuration';
import { Nullable } from '@/types/nullable';
export declare type ConfigWatcherOptions = {
	retryInterval: number;
	fromCache: boolean;
	startImmediatly: boolean;
};
export async function useConfigWatcher(options?: Partial<ConfigWatcherOptions>) {
	const defaultOptions = {
		retryInterval: 1,
		fromCache: true,
		startImmediatly: true,
	} as ConfigWatcherOptions;
	const mergedOptions = {
		...defaultOptions,
		...(options ?? {}),
	};
	const interval = ref<Nullable<NodeJS.Timeout>>();
	const isLoadingConfiguration = ref<boolean>();
	const configurationStore = useConfigurationsStore();
	const configuration = ref<Nullable<ConfigurationType>>();
	async function loadConfiguration() {
		interval.value = setInterval(async () => {
			try {
				isLoadingConfiguration.value = true;
				const cfg = await configurationStore.get(mergedOptions.fromCache);
				if (!cfg) return;
				if (!interval.value) return;
				configuration.value = cfg;
				clearInterval(interval.value);
				interval.value = null;
				isLoadingConfiguration.value = false;
			} catch (error) {
				console.error('Failed to load configuration:', error);
			}
		}, mergedOptions.retryInterval);
	}
	function stopLoadConfigurationInterval() {
		if (!interval.value) return;
		clearInterval(interval.value);
	}
	if (mergedOptions.startImmediatly) await loadConfiguration();
	return {
		configuration,
		configurationStore,
		isLoadingConfiguration,
		loadConfiguration,
		stopLoadConfigurationInterval,
	};
}
