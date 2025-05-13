<template>
	<Suspense v-fill-parent>
		<VLocaleProvider :locale="localeStore.currentLocale.locale" v-fill-parent>
			<StoreSnackBar />
			<VApp :class="appClasses" v-fill-parent>
				<VMain class="tw-min-h-dvh !tw-h-max tw-max-w-full pa-0 ma-0">
					<RouterView v-if="isMounted" />
					<Loading v-fill-parent v-else />
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
import ThemeEnum from '@/enums/theme';
import { useAuthStore } from '@/stores/auth';
import { useConfigurationsStore } from '@/stores/configuration';
import { useLocaleStore } from '@/stores/locale';
import { usePermissionsStore } from '@/stores/permissions';
import { useUserStore } from '@/stores/user';
import { Nullable } from '@/types/nullable';
const localeStore = useLocaleStore();
import { VMain } from 'vuetify/components';
useLocaleWatcher();
const { theme } = useThemeWatcher();
const router = useRouter();
const isMounted = ref<boolean>(false);
export declare type Intervals = {
	configuration?: Nullable<NodeJS.Timeout>;
	auth?: Nullable<NodeJS.Timeout>;
};
export declare type Loadings = {
	auth: boolean;
	configuration: boolean;
};
const appClasses = computed<string>(() => {
	const classes = ['pa-0', 'ma-0', 'tw-min-h-dvh', '!tw-h-max', 'tw-max-w-full'];
	classes.push(theme.value === ThemeEnum.Dark ? 'app-dark' : 'app-light');
	return classes.join(' ');
});
const authStore = useAuthStore();
const userStore = useUserStore();
const permissionsStore = usePermissionsStore();
const configurationStore = useConfigurationsStore();
async function bootstrap() {
	const isLogged = authStore.isLogged();
	if (isLogged) return;
	await authStore.clearData();
	await userStore.clearData();
	await permissionsStore.clearData();
}
onMounted(async () => {
	await bootstrap();

	isMounted.value = true;
});
</script>
