<template>
	<VBtn v-if="!isLogged" @click.stop="authStore.login">{{ loginButtonLabel }}</VBtn>
	<ButtonDropdown v-else>
		<template #activator="{ props }">
			<VBtn v-if="isLogged" v-bind="props" variant="plain" prepend-icon="mdi-account">{{
				getText({ key: 'menu.account' })
			}}</VBtn>
		</template>
		<VList>
			<VListItem @click="authStore.logout">
				<VListItemTitle>{{ getText({ key: 'menu.logout' }) }}</VListItemTitle>
			</VListItem>
		</VList>
	</ButtonDropdown>
</template>
<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const isLogged = ref<boolean>(false);
const loginButtonLabel = computed(() => getTextFromKey('buttons.login'));
onMounted(async () => {
	isLogged.value = authStore.isLogged();
});
</script>
