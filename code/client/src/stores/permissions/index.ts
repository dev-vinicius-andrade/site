import { Roles } from '@enums/auth/roles';
import { defineStore } from 'pinia';
import { PermissionDataWrapper } from '@/types/permissions/wrapper';
import { Nullable } from '@/types/nullable';

import { useTypedStorage } from '@composables/useTypedStorage';
import { User } from '@/types/auth0/user';
import { useConfigurationsStore } from '@/stores/configuration';
const rolesMap = new Map<string, Roles>(Object.values(Roles).map(v => [v.toLowerCase(), v]));
const defaulData: PermissionDataWrapper = {
	permissions: [Roles.NONE],
};

export const usePermissionsStore = defineStore('PermissionsStore', {
	state: () => ({
		data: useTypedStorage<PermissionDataWrapper>('permissions', defaulData),
	}),
	actions: {
		set(permissions: Nullable<PermissionDataWrapper>) {
			this.data.permissions = permissions?.permissions ?? defaulData.permissions;
		},
		get() {
			return this.data.permissions ?? defaulData.permissions;
		},
		setPermissions(token?: string): Nullable<Roles[]> {
			if (!token) return [Roles.NONE];
			const configurationsStore = useConfigurationsStore();
			const rolesNamespace =
				configurationsStore?.configurations?.authentication?.rolesNamespace ??
				import.meta.env.VITE_APP_AUTH_ROLES_NAMESPACE;

			const userData = JSON.parse(atob(token.split('.')[1])) as User;
			const roles = (userData[`${rolesNamespace}`] as Nullable<string[]>) ?? userData?.realm_access?.roles ?? [];
			const permissions = roles.map(role => this.getRole(role)).filter(role => !!role) as Roles[];
			this.data.permissions = permissions;
			return permissions;
		},
		getRole(role?: Nullable<string>): Nullable<Roles> {
			if (!role) return null;
			try {
				return rolesMap.get(role.toLowerCase()) ?? null;
			} catch (error) {
				console.error(error);
				return null;
			}
		},
		clearData() {
			this.data.permissions = defaulData.permissions;
		},
	},
});
