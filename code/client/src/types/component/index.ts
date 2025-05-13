export declare type UiComponent<T> = T;
export declare type UiComponentWithId<T> = T & {
	ui_id: string;
};
export type ExtractComponentProps<TComponent> = TComponent extends new () => { $props: infer P } ? P : never;
