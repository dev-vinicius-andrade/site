import { ComponentExtendedEmits } from '@/types/component/emits';
import { ComponentExtendedProperties } from '@/types/component/properties';

export declare type PropertiesBinder<T> = ComponentExtendedProperties<T>;
export declare type EmitsBinder<T> = ComponentExtendedEmits<T>;
export declare type IPropertiesEmitsBinder<T> = PropertiesBinder<T> & EmitsBinder<T>;
