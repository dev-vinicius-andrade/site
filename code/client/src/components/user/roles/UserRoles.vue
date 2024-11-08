<template>
	<Loading v-if="isLoading || !isMounted" />
	<VChip v-else v-for="role in userRoles" size="small" variant="tonal" color="primary">{{ role }}</VChip>
</template>
<script setup lang="ts">
import Roles from '@/enums/auth/roles';
import { usePermissionsStore } from '@/stores/permissions';
import { Nullable } from '@/types/nullable';

const token = defineModel<Nullable<string>>('token', { default: null });
const userRoles = ref<Roles[]>([]);
const isMounted = ref(false);
const isLoading = ref(false);
async function getUserRoles() {
	if (!token.value) {
		userRoles.value = [];
		return;
	}
	isLoading.value = true;
	const permissionStore = usePermissionsStore();
	if (!token.value) return;
	permissionStore.setPermissions(token.value);
	userRoles.value = permissionStore.get();
	isLoading.value = false;
}
watch(
	() => token.value,
	async () => {
		await getUserRoles();
	},
	{ immediate: true },
);
onMounted(() => {
	getUserRoles();
	isMounted.value = true;
});
</script>
