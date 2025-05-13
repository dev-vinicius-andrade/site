<template>
	<div class="!tw-h-dvh !tw-w-screen tw-flex tw-items-center tw-justify-center">
		<VContainer class="tw-m-0 tw-p-0">
			<RowCentralizedContent
				class="!tw-h-full !tw-w-full !tw-flex !tw-justify-items-center !tw-align-middle"
				content-columns="6"
			>
				<VCardActions>
					<VSpacer />
					<ThemeSelector />
					<LocaleSelector />
				</VCardActions>
				<VEmptyState class="elevation-5 tw-rounded-[50px] tw-bg-app-primary">
					<template #headline>
						<span class="tw-text-app-background/50">
							{{ getText({ key: 'pages.forbidden.title' }) }}
						</span>
					</template>
					<template #title>
						<span class="tw-text-app-secondary">
							{{ getText({ key: 'pages.forbidden.description' }) }}
						</span>
					</template>
					<template #media>
						<VIcon size="56px" class="!tw-text-app-background/50">mdi-alert-circle-outline</VIcon>
					</template>
					<VRow v-if="componentProperties.to" justify="start" align="start">
						<VCol class="text-left">
							<VAlert border="start" border-color="amber-darken-3">
								<span class="font-italic font-weight-medium">
									{{ componentProperties.to }}
								</span>
							</VAlert>
						</VCol>
					</VRow>
					<template #actions>
						<VBtn class="pa-2 !tw-bg-app-secondary" @click="goToUserHome">
							<span class="!tw-text-app-background tw-font-bold">
								{{ getText({ key: 'pages.forbidden.goToHomeButtonText' }) }}
							</span>
							<VIcon class="!tw-text-app-background">mdi-home-outline</VIcon>
						</VBtn>
						<VBtn class="pa-2 !tw-bg-app-secondary" @click="logout" v-if="isAuthenticated">
							<span class="!tw-text-app-background tw-font-bold">
								{{ getText({ key: 'buttons.logout' }) }}
							</span>
							<VIcon class="!tw-text-app-background">mdi-logout</VIcon>
						</VBtn>
						<VBtn v-else class="pa-2 !tw-bg-app-secondary" @click="login">
							<span class="!tw-text-app-background tw-font-bold">
								{{ getText({ key: 'buttons.login' }) }}
							</span>
							<VIcon class="!tw-text-app-background">mdi-login</VIcon>
						</VBtn>
					</template>
				</VEmptyState>
			</RowCentralizedContent>
			<RowCentralizedContent content-column-classes="tw-text-end"> </RowCentralizedContent>
		</VContainer>
	</div>
</template>
<script setup lang="ts">
import RowCentralizedContent from '@/components/row/RowCentralizedContent.vue';
import { useAuthStore } from '@/stores/auth';
import { VCardActions, VEmptyState } from 'vuetify/components';

export interface IForbiddenViewComponentProperties {
	to?: string;
}
const componentProperties: IForbiddenViewComponentProperties = withDefaults(
	defineProps<IForbiddenViewComponentProperties>(),
	{},
);
const authStore = useAuthStore();
const router = useRouter();
const isAuthenticated = computed(() => authStore.isLogged());
async function logout() {
	await authStore.logout();
}
async function goToUserHome() {
	await router.push(authStore.getUserHomeRoute() ?? '/');
}
async function login() {
	await authStore.login();
}
</script>
