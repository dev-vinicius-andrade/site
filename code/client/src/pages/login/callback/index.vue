<template>
	<LoadingWithLogo />
</template>
<script setup lang="ts">
import router from '@/router';
import { useAuthStore } from '@/stores/auth';
import { useConfigurationsStore } from '@/stores/configuration';
import { useNotificationsStore } from '@/stores/notification';
import { usePermissionsStore } from '@/stores/permissions';
import { useUserStore } from '@/stores/user';

const authStore = useAuthStore();
async function handleLoginCallBackAsync() {
	try {
		const configurationStore = useConfigurationsStore();
		if (!authStore.authService) {
			await authStore.bootstrapAuthService(configurationStore.configurations);
		}
		await authStore.authService?.handleRedirectCallback();
		const isAuthenticated = await authStore.authService?.isAuthenticated();
		if (!isAuthenticated) await handleLoginCallbackWithErrorsAsync();
		else await handleLoginCallbackWithSuccessAsync();
	} catch (error) {
		console.error('Failed to handle login callback:', error);
	}
}
async function handleLoginCallbackWithErrorsAsync() {
	const notificationStore = useNotificationsStore();
	notificationStore.error({ text: getText('error') });
	return router.push({ name: '/login' });
}
async function handleLoginCallbackWithSuccessAsync() {
	try {
		const userStore = useUserStore();
		const authStore = useAuthStore();
		authStore.data.isAuthenticated = true;
		const user = await authStore.authService?.getUser();
		const permissionStore = usePermissionsStore();
		authStore.renewToken();
		userStore.set(user);
		await permissionStore.setPermissions(await authStore.getToken());
		router.push(authStore.getUserHomeRoute());
	} catch (error) {
		console.error('Failed to handle login callback with success:', error);
	}
}
onBeforeMount(async () => {
	await handleLoginCallBackAsync();
});
</script>
