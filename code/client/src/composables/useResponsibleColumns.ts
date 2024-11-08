export declare type ResponsibleColumnsBreakpointsOptions = {
	sm?: ResponsibleColumns;
	md?: ResponsibleColumns;
	lg?: ResponsibleColumns;
	smAndDown?: ResponsibleColumns;
	mdAndDown?: ResponsibleColumns;
	lgAndDown?: ResponsibleColumns;
	smAndUp?: ResponsibleColumns;
	mdAndUp?: ResponsibleColumns;
	lgAndUp?: ResponsibleColumns;
	mobile?: ResponsibleColumns;
};
export declare type ResponsibleColumns = number | string;
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

		if (display.lgAndDown.value) return options.lgAndDown;
		if (display.mdAndDown.value) return options.mdAndDown;
		if (display.smAndDown.value) return options.smAndDown;
		if (display.lgAndUp.value) return options.lgAndUp;
		if (display.mdAndUp.value) return options.mdAndUp;
		if (display.smAndUp.value) return options.smAndUp;

		return useResponsibleColumns(options).value;
	});
}
export function useResponsibleColumns(
	options: ResponsibleColumnsBreakpointsOptions = defaultResponsibleColumnsBreakpointsOptions,
) {
	const display = useVuetifyDisplay();
	return computed<ResponsibleColumns>(() => {
		if (display.smAndDown.value && options.smAndDown !== undefined) return options.smAndDown;
		if (display.mdAndDown.value && options.mdAndDown !== undefined) return options.mdAndDown;
		if (display.lgAndDown.value && options.lgAndDown !== undefined) return options.lgAndDown;

		if (display.smAndUp.value && options.smAndUp !== undefined) return options.smAndUp;
		if (display.mdAndUp.value && options.mdAndUp !== undefined) return options.mdAndUp;
		if (display.lgAndUp.value && options.lgAndUp !== undefined) return options.lgAndUp;
		if (display.sm.value && options.sm !== undefined) return options.sm;
		if (display.md.value && options.md !== undefined) return options.md;
		if (display.lg.value && options.lg !== undefined) return options.lg;
		return 'auto';
	});
}
