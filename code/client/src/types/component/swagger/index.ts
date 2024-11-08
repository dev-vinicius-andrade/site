import { Nullable } from '@/types/nullable';
export declare type SwaggerDefaultParameterLocation = 'query' | 'path' | 'header' | 'cookie' | 'body' | '*';
export declare type SwaggerOverrideDefaultParameterOptions = {
	name: string;
	location: SwaggerDefaultParameterLocation[];
	defaultValue?: Nullable<any>;
};
