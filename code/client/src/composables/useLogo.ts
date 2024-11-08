import logoDark from '@assets/icons/dark/dark.svg';
import logoLight from '@assets/icons/light/light.svg';
import { useThemeStore } from '@/stores/theme';
import ThemeEnum from '@/enums/theme';
export declare type UseLogoOptions = {
	dark?: boolean;
	light?: boolean;
	inverted?: boolean;
};
export function useLogo(options?: UseLogoOptions) {
	const themeStore = useThemeStore();
	const logo = computed(() => {
		if (options?.dark && !options?.light) return logoDark;
		if (options?.light && !options?.dark) return logoLight;
		const theme = themeStore.data.currentTheme;
		if (options?.inverted) return theme === ThemeEnum.Dark ? logoLight : logoDark;
		return theme === ThemeEnum.Dark ? logoDark : logoLight;
	});

	return {
		logo: logo,
		logos: { dark: logoDark, light: logoLight },
	};
}
