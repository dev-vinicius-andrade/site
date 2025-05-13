import { Roles } from '@/enums/auth/roles';
import { ApiInformation } from '@/types/api/information';
import { Nullable } from '@/types/nullable';

export declare type ApiConfiguration = {
	base_url: string;
};
export declare type PermissionDataWrapper = {
	permissions: Roles[];
};
export declare type ConfigurationAuthentication = {
	timeoutInSeconds: Nullable<number>;
	scope: string;
	issuerUri: Nullable<string>;
	clientId: Nullable<string>;
	rolesNamespace: Nullable<string>;
};
export declare type IntegrationApiConfiguration = {
	baseUrl: string;
};
export declare type IntegrationsConfiguration = {
	api: {
		[key: string]: IntegrationApiConfiguration;
	};
};
export declare type BiographyConfiguration = {
	name: string;
	birthday: Date;
};
export declare type SocialConfiguration = {
	[key: string]: string;
};
export declare type ConfigurationType = {
	biography: BiographyConfiguration;
	social: SocialConfiguration;
	enableAccount: boolean;
	apis: ApiInformation;
	integrations: IntegrationsConfiguration;
	authentication: Nullable<ConfigurationAuthentication>;
};
