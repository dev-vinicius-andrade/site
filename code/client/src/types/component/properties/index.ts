import { Nullable } from '@/types/nullable';
import type { ExtractComponentProperties } from '@/types/component/properties/extract';
export declare type ComponentExtendedProperties<T> = {
	properties?: ExtractComponentProperties<T>;
};
export declare type ComponentProperties = {
	[key: string]: unknown;
};
export declare type ModelValueComponentProperties<T> = {
	modelValue?: T | Nullable<T>;
} & ComponentProperties;
export declare type ReadonlyComponentProperties = {
	readonly?: boolean;
};
export declare type DisabledComponentProperties = {
	disabled?: boolean;
};
