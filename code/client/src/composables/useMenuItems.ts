import { ComputedRef } from 'vue';
// import { getText } from '@/helpers';
import { Menu } from '@/types/menu/item';
import { Position } from '@/enums/position';
import Roles from '@/enums/auth/roles';
// import Roles from '@/enums/auth/roles';
// import { Position } from '@/enums/position';
function getMenuItems(): { menuItems: ComputedRef<Menu[]> } {
	const menuItems = computed<Menu[]>(() => [
		// {
		// 	title: getText({ key: 'menu.users' }),
		// 	appendIcon: 'mdi-account-group',
		// 	to: { name: '/users' },
		// 	position: Position.left,
		// 	authorizedRoles: [Roles.ENGINEERING],
		// }
		{
			title: getText({ key: 'menu.home' }),
			prependIcon: 'mdi-home',
			to: { name: '/' },
			position: Position.left,
			authorizedRoles: [Roles.NONE],
		},
		{
			title: getText({ key: 'menu.admin' }),
			prependIcon: 'mdi-cog',
			to: { name: '/admin' },
			position: Position.right,
			authorizedRoles: [Roles.ADMIN],
		},
	]);
	return { menuItems };
}

export function useMenuItemsWithIcons(): MenuItemsWithIcons {
	const { menuItems } = getMenuItems();
	const menuItemsWithIcons = menuItems;
	return { menuItemsWithIcons };
}
export function useMenuItemsWithoutIcons(): MenuItemsWithoutIcons {
	const { menuItems } = getMenuItems();
	const menuItemsWithoutIcons = computed(() =>
		menuItems.value.map(item => {
			const { prependIcon, appendIcon, ...itemWithoutIcons } = item;
			return itemWithoutIcons;
		}),
	);
	return { menuItemsWithoutIcons };
}
export function useMenuItems(): MenuItems {
	const { menuItemsWithIcons } = useMenuItemsWithIcons();
	const { menuItemsWithoutIcons } = useMenuItemsWithoutIcons();
	return {
		menuItemsWithIcons,
		menuItemsWithoutIcons,
	};
}

export declare type MenuItemsWithIcons = { menuItemsWithIcons: ComputedRef<Menu[]> };
export declare type MenuItemsWithoutIcons = { menuItemsWithoutIcons: ComputedRef<Menu[]> };
export declare type MenuItems = MenuItemsWithIcons & MenuItemsWithoutIcons;
