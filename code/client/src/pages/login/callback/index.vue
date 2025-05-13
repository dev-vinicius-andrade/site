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
		if (!authStore.authService?.isUserLoggedIn) {
			await handleLoginCallbackWithErrorsAsync(authStore.authService?.initializationError);
			return;
		}

		await handleLoginCallbackWithSuccessAsync();
	} catch (error) {
		console.error('Failed to handle login callback:', error);
	}
}
async function handleLoginCallbackWithErrorsAsync(errors?: any) {
	const notificationStore = useNotificationsStore();
	notificationStore.error({ text: getText('error') });
	return router.push({ name: '/login' });
}
async function handleLoginCallbackWithSuccessAsync() {
	try {
		const userStore = useUserStore();
		const authStore = useAuthStore();
		if (!authStore.authService?.isUserLoggedIn) {
			return;
		}
		authStore.data.isAuthenticated = true;
		const user = await authStore.getUserData();
		const permissionStore = usePermissionsStore();
		authStore.renewToken();
		userStore.set(user);
		await permissionStore.setPermissions(await authStore.getToken());
		await router.push(authStore.getUserHomeRoute());
	} catch (error) {
		console.error('Failed to handle login callback with success:', error);
	}
}
onBeforeMount(async () => {
	await handleLoginCallBackAsync();
});
</script>
