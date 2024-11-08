export declare type ApiInformation = {
	environments: ApiInformationEnvironment;
};
export declare type ApiInformationConfiguration = {
	url: string;
	description: string;
};
export declare type ApiInformationEnvironment = {
	[key: string]: ApiInformationEnvironmentConfiguration;
};
export declare type ApiInformationEnvironmentConfiguration = {
	name: string;
	apis: {
		[key: string]: ApiInformationConfiguration;
	};
};
