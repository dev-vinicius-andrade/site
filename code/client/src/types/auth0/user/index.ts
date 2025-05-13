import { IUserMetaData } from '@/types/auth0/user/metaData';
export declare type User = {
	[x: string]: any;
	name?: string;
	given_name?: string;
	family_name?: string;
	middle_name?: string;
	nickname?: string;
	preferred_username?: string;
	profile?: string;
	picture?: string;
	website?: string;
	email?: string;
	email_verified?: boolean;
	gender?: string;
	birthdate?: string;
	zoneinfo?: string;
	locale?: string;
	phone_number?: string;
	phone_number_verified?: boolean;
	address?: string;
	updated_at?: string;
	sub?: string;
	id?: string;
	permissions?: string[];
	metaData?: IUserMetaData;
	realm_access?: {
		roles?: string[];
	};
	resource_access?: {
		[key: string]: {
			roles?: string[];
		};
	};
};

export default User;
