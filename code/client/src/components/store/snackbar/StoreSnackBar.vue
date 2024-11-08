<template>
	<VSnackbar
		v-model="showSnackBar"
		v-if="notificationStore.notification"
		:timeout="notificationStore.notification.timeout ?? 3000"
		:color="notificationStore.notification.color??defaultSnackBarOptions.color!"
		:location="notificationStore.notification.location?? defaultSnackBarOptions.location as any"
	>
		<VIcon v-if="notificationStore.notification?.icon" class="mr-2">
			{{ notificationStore.notification?.icon }}</VIcon
		>
		<span v-if="isLocaleTextComputed">
			{{ getText(notificationStore.notification?.text) }}
		</span>
		<span v-else>
			{{ notificationStore.notification?.text }}
		</span>
		<Dialog>
			<template #activator="{ actions }">
				<VIcon v-if="notificationStore.notification?.details" @click="actions.show"> mdi-open-in-new </VIcon>
			</template>
			<VCard>
				<VCardTitle> {{ getText(notificationStore.notification?.text) }} </VCardTitle>
				<VCardText>
					<pre v-if="isNotificationDetailSerializable">
 {{ JSON.stringify(notificationStore.notification?.details, null, '\t') }} </pre
					>
					<span v-else> {{ notificationStore.notification?.details! }}</span>
				</VCardText>
			</VCard>
		</Dialog>
	</VSnackbar>
</template>
<script setup lang="ts">
import { useNotificationsStore, defaultSnackBarOptions } from '@/stores/notification';

const notificationStore = useNotificationsStore();

const showSnackBar = ref(false);
const isLocaleTextComputed = computed(() => {
	if (!notificationStore?.notification?.text) return false;
	return isLocaleText(notificationStore.notification.text);
});
watch(
	() => notificationStore.notification,
	() => {
		showSnackBar.value = true;
		setTimeout(() => {
			showSnackBar.value = false;
		}, notificationStore.notification?.timeout ?? defaultSnackBarOptions.timeout);
	},
);
const isNotificationDetailSerializable = computed(() => {
	if (!notificationStore.notification) return false;
	if (!notificationStore?.notification?.details) return false;
	return typeof notificationStore.notification.details === 'object';
});
</script>
