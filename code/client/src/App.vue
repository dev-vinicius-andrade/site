<template>
	<Suspense v-fill-parent>
		<VLocaleProvider :locale="localeStore.currentLocale.locale" v-fill-parent>
			<StoreSnackBar />
			<VApp class="pa-0 ma-0 tw-min-h-dvh !tw-h-max tw-max-w-full" v-fill-parent>
				<VMain class="tw-min-h-dvh !tw-h-max tw-max-w-full pa-0 ma-0">
					<RouterView />
				</VMain>
				<!-- <VMain v-if="!isLoading" class="pa-0 ma-0">
					<RouterView />
				</VMain>
				<VMain v-else>
					<Loading v-fill-parent />
				</VMain> -->
			</VApp>
		</VLocaleProvider>
		<template v-slot:fallback>
			<Loading v-fill-parent />
		</template>
	</Suspense>
</template>

<script lang="ts" setup>
import { useThemeWatcher } from '@/composables/useThemeWatcher';
import { useAuthStore } from '@/stores/auth';
import { useLocaleStore } from '@/stores/locale';
import { Nullable } from '@/types/nullable';
const localeStore = useLocaleStore();
import { VMain } from 'vuetify/components';
useLocaleWatcher();
useThemeWatcher();
const isMounted = ref<boolean>(false);
export declare type Intervals = {
	configuration?: Nullable<NodeJS.Timeout>;
	auth?: Nullable<NodeJS.Timeout>;
};
export declare type Loadings = {
	auth: boolean;
	configuration: boolean;
};
onMounted(async () => {
	const authStore = useAuthStore();
	const isAuthenticated = await authStore.authService?.isAuthenticated();
	authStore.data.isAuthenticated = !!isAuthenticated;

	isMounted.value = true;
});
</script>
