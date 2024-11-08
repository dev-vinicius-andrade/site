<template>
	<VContainer fluid>
		<RowCentralizedContent>
			<VCard elevation="5" style="border-radius: 20px">
				<VCardActions>
					<VCardTitle class="mt-5 ml-5">
						<span>
							{{ getText({ key: 'pages.forbidden.title' }) }}
						</span>
					</VCardTitle>
					<VSpacer />
					<LocaleSelector />
				</VCardActions>

				<VCardText>
					<VRow justify="center" align="center">
						<VCol class="text-center" cols="2"
							><VSpacer /><VIcon size="100" color="amber-darken-3">mdi-alert-circle-outline</VIcon
							><VSpacer
						/></VCol>
						<VSpacer />
						<VCol cols="8">
							<VRow justify="start" align="start">
								<span class="text-subtitle-1">
									{{ getText({ key: 'pages.forbidden.description' }) }}
								</span>
							</VRow>
							<VRow v-if="componentProperties.to" justify="start" align="start">
								<VCol class="text-left">
									<VAlert border="start" border-color="amber-darken-3">
										<span class="font-italic font-weight-medium">
											{{ componentProperties.to }}
										</span>
									</VAlert>
								</VCol>
							</VRow>
						</VCol>
						<VSpacer />
					</VRow>
				</VCardText>
				<VCardActions>
					<RowCentralizedContent>
						<VBtn class="pa-2" @click="goToUserHome" v-if="isAuthenticated">
							{{ getText({ key: 'pages.forbidden.goToHomeButtonText' }) }}
						</VBtn>
					</RowCentralizedContent>
				</VCardActions>
			</VCard>
		</RowCentralizedContent>
		<RowCentralizedContent content-column-classes="tw-text-end">
			<VBtn append-icon="mdi-logout" class="pa-2" variant="text" @click="logout" v-if="isAuthenticated">
				{{ getText({ key: 'buttons.logout' }) }}
			</VBtn>
			<VBtn append-icon="mdi-login" class="pa-2" variant="text" @click="login">
				{{ getText({ key: 'buttons.login' }) }}
			</VBtn>
		</RowCentralizedContent>
	</VContainer>
</template>
<script setup lang="ts">
import RowCentralizedContent from '@/components/row/RowCentralizedContent.vue';
import { useAuthStore } from '@/stores/auth';
import { VCardActions } from 'vuetify/components';

export interface IForbiddenViewComponentProperties {
	to?: string;
}
const componentProperties: IForbiddenViewComponentProperties = withDefaults(
	defineProps<IForbiddenViewComponentProperties>(),
	{},
);
const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.data.isAuthenticated);
async function logout() {
	await authStore.logout();
}
async function goToUserHome() {
	const router = useRouter();
	router.push(authStore.getUserHomeRoute());
}
async function login() {
	await authStore.login();
}
</script>
