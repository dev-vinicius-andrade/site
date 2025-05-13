import { useAppTheme } from '@/composables/useAppTheme';
import ThemeEnum from '@/enums/theme';
import { useThemeStore } from '@/stores/theme';

export function useThemeWatcher() {
	const { switchTheme } = useAppTheme();
	const themeStore = useThemeStore();
	const theme = computed<ThemeEnum>(() => themeStore.data.currentTheme);

	const themeWatcher = watch(
		() => themeStore.data.currentTheme,
		currentTheme => switchTheme(currentTheme),
	);
	switchTheme(themeStore.data.currentTheme);
	return {
		themeWatcher,
		theme,
	};
}
