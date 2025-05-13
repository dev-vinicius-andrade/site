<template>
	<VContainer fluid class="!tw-h-dvh !tw-p-0 !tw-m-0">
		<RowCentralizedContent content-columns="6" class="!tw-h-screen tw-items-center">
			<VCard elevation="5">
				<VCardActions>
					<VSpacer />
					<LocaleSelector />
				</VCardActions>
				<VEmptyState :image="logo" :min-width="width">
					<template #headline>
						<RowCentralizedContent content-columns="12">
							<VCardTitle class="tw-text-wrap tw-text-center"
								>{{ headline }} {{ getTextFromKey('pages.login.headLineAppend') }}
								<span class="tw-font-bold"
									>andradev<span class="tw-text-app-secondary">.io</span></span
								></VCardTitle
							>
						</RowCentralizedContent>
					</template>

					<RowCentralizedContent content-columns="12">
						<VCardSubtitle class="tw-text-wrap tw-text-center">
							{{ description }}
						</VCardSubtitle>
					</RowCentralizedContent>
					<RowCentralizedContent content-columns="12" v-if="!disableLoginButton">
						<VBtn
							width="100%"
							variant="outlined"
							@click="auth"
							:disabled="disableLoginButton"
							:loading="disableLoginButton"
							>{{ loginButtonText }}</VBtn
						>
					</RowCentralizedContent>
					<div v-else class="mt-5">
						<VAlert
							:title="disabledLoginInfo.title"
							:text="disabledLoginInfo.message"
							type="info"
							variant="tonal"
						>
							<RowCentralizedContent content-columns="10" class="mt-5">
								<VBtn
									width="100%"
									variant="outlined"
									@click="reloadConfigurations"
									append-icon="mdi-reload"
									:loading="isReloadingConfigurations"
									>{{ disabledLoginInfo.action }}</VBtn
								>
							</RowCentralizedContent>
						</VAlert>
					</div>
				</VEmptyState>
			</VCard>
		</RowCentralizedContent>
	</VContainer>
</template>
<script setup lang="ts">
import { useLogo } from '@/composables/useLogo';

import { useAuthStore } from '@/stores/auth';
import { useConfigurationsStore } from '@/stores/configuration';
const { logo } = useLogo();
const authStore = useAuthStore();

const configurationStore = useConfigurationsStore();

const width = ref<string>('256px');
const headline = computed(() => getTextFromKey('pages.login.headline'));
const description = computed(() => getTextFromKey('pages.login.description'));
const loginButtonText = computed(() => getTextFromKey('pages.login.button'));

const disableLoginButton = ref<boolean>(true);
const isReloadingConfigurations = ref<boolean>(false);
async function auth() {
	await authStore.login();
}

const disabledLoginInfo = computed(() => {
	const reason = getTextFromKey('pages.login.disabledLoginAlert.reasons.configurationsNotLoaded');
	return {
		title: getTextFromKey('pages.login.disabledLoginAlert.title'),
		message: getTextFromKey('pages.login.disabledLoginAlert.message', { params: { reason } }),
		action: getTextFromKey('pages.login.disabledLoginAlert.reloadButtonText'),
	};
});
watch(
	() => configurationStore.isConfigurationLoaded,
	value => {
		disableLoginButton.value = !value;
	},
	{ immediate: true },
);
async function reloadConfigurations() {
	isReloadingConfigurations.value = true;
	await configurationStore.loadConfiguration();
	isReloadingConfigurations.value = false;
}
onMounted(async () => {
	//router.push(authStore?.getUserHomeRoute());
});
</script>
