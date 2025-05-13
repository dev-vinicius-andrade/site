import { ResponsibleColumns, ResponsibleColumnsBreakpointsOptions } from '@/types';
import { Nullable } from '@/types/nullable';

export const defaultResponsibleColumnsBreakpointsOptions: ResponsibleColumnsBreakpointsOptions = {};

export function useResponsibleColumnsFromListLength(
	length: number,
	options: ResponsibleColumnsBreakpointsOptions = defaultResponsibleColumnsBreakpointsOptions,
): ComputedRef<ResponsibleColumns> {
	const display = useVuetifyDisplay();
	const MAX_COLUMNS = 12;

	return computed<ResponsibleColumns>(() => {
		if (length <= 0) return 'auto';
		if (display.lgAndDown.value && isNullOrEmpty(options.lgAndDown)) return 4;
		if (display.mdAndDown.value && isNullOrEmpty(options.mdAndDown)) return 6;
		if (display.smAndDown.value && isNullOrEmpty(options.smAndDown)) return MAX_COLUMNS;

		if (display.lgAndUp.value && isNullOrEmpty(options.lgAndUp)) return 4;
		if (display.mdAndUp.value && isNullOrEmpty(options.mdAndUp)) return 6;
		if (display.smAndUp.value && isNullOrEmpty(options.smAndUp)) return 12;

		if (display.lg.value && isNullOrEmpty(options.lg)) return 4;
		if (display.md.value && isNullOrEmpty(options.md)) return 6;
		if (display.sm.value && isNullOrEmpty(options.sm)) return 12;

		// user defined

		if (display.lgAndDown.value) return options.lgAndDown ?? 4;
		if (display.mdAndDown.value) return options.mdAndDown ?? 6;
		if (display.smAndDown.value) return options.smAndDown ?? 12;
		if (display.lgAndUp.value) return options.lgAndUp ?? 4;
		if (display.mdAndUp.value) return options.mdAndUp ?? 6;
		if (display.smAndUp.value) return options.smAndUp ?? 12;

		return useResponsibleColumns(options).value;
	});
}
export function useResponsibleColumns(options?: Nullable<ResponsibleColumnsBreakpointsOptions>) {
	const display = useVuetifyDisplay();

	return computed<ResponsibleColumns>(() => {
		if (display.smAndDown.value && !isNullOrEmpty(options?.smAndDown)) return options!.smAndDown!;
		if (display.mdAndDown.value && !isNullOrEmpty(options?.mdAndDown)) return options!.mdAndDown!;
		if (display.lgAndDown.value && !isNullOrEmpty(options?.lgAndDown)) return options!.lgAndDown!;

		if (display.smAndUp.value && !isNullOrEmpty(options?.smAndUp)) return options!.smAndUp!;
		if (display.mdAndUp.value && !isNullOrEmpty(options?.mdAndUp)) return options!.mdAndUp!;
		if (display.lgAndUp.value && !isNullOrEmpty(options?.lgAndUp)) return options!.lgAndUp!;
		if (display.sm.value && !isNullOrEmpty(options?.sm)) return options!.sm!;
		if (display.md.value && !isNullOrEmpty(options?.md)) return options!.md!;
		if (display.lg.value && !isNullOrEmpty(options?.lg)) return options!.lg!;
		return 'auto';
	});
}
