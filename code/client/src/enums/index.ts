export enum Events {
	onFetched = 'onFetched',
	onConverted = 'onConverted',
	onSelected = 'onSelected',
	onAddClicked = 'onAddClicked',
	onSortClicked = 'onSortClicked',
	onSearch = 'onSearch',
	onScroll = 'onScroll',
	onLoadMore = 'onLoadMore',
	onScrollDelayed = 'onScrollDelayed',
	onModelValueUpdate = 'update:modelValue',
	onModelValid = 'update:valid',
	onModelIsOpen = 'update:isOpen',
	onConfirmClicked = 'onConfirmClicked',
	onCancelClicked = 'onCancelClicked',
	onOutsideClicked = 'onOutsideClicked',
	onSaveClicked = 'onSaveClicked',
	onDeleteClicked = 'onDeleteClicked',
	onContinueClicked = 'onContinueClicked',
	onPreviewClicked = 'onPreviewClicked',
	onApplyClicked = 'onApplyClicked',
	onSelectionChanged = 'onSelectionChanged',
	onClick = 'onClick',
	onDismissClicked = 'onDismissClicked',
	onValidationChanged = 'onValidationChanged',
	onValidChanged = 'onValidChanged',
	onFinish = 'onFinish',
	click = 'click',
	change = 'change',
	blur = 'blur',
	onConfigClicked = 'onConfigClicked',
	onImportClicked = 'onImportClicked',
	onReturnClicked = 'onReturnClicked',
	saved = 'saved',
	updated = 'updated',
}

export enum StringCase {
	none = 'none',
	upper = 'upper',
	lower = 'lower',
	camel = 'camel',
	pascal = 'pascal',
}

export enum CrudActions {
	add = 'add',
	edit = 'edit',
	delete = 'delete',
	list = 'list',
	get = 'get',
	view = 'view',
}

export enum FileExtensions {
	zip = 'zip',
	gzip = 'gzip',
}

export enum Debounce {
	wait = 500,
}
export enum Locales {
	pt = 'pt',
	en = 'en',
}
export enum ConditionOperator {
	Contains = 'contains',
	Equals = '==',
	NotEquals = '!=',
	GreaterThan = '>',
	LessThan = '<',
	GreaterThanOrEqual = '>=',
	LessThanOrEqual = '<=',
}
export enum DatatableServerSortByOrder {
	asc = 'asc',
	desc = 'desc',
}
