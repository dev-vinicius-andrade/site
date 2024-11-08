<template>
	<VContainer fluid class="tw-h-20 tw-flex tw-fixed tw-top-5 tw-left-5 tw-z-50">
		<VRow class="tw-relative tw-w-11/12 tw-items-center tw-content-center">
			<VCol :cols="menuBarColumns" class="!tw-h-full tw-flex tw-items-center tw-content-center">
				<div class="tw-rounded-[50px] tw-p-2 elevation-5 bg-surface !tw-h-full !tw-w-full">
					<div
						class="tw-h-full tw-w-full tw-flex tw-justify-center tw-items-center tw-align-middle"
						v-if="display.smAndDown.value && !componentProperties.menuIconOnRight"
					>
						<VBtn @click.stop.prevent="toogleNavigationbar" icon="mdi-menu" class="tw-border-none" />
					</div>
					<NavigationBarMenuButtons
						v-if="display.mdAndUp.value"
						:left-menu-items="leftMenuItems"
						:right-menu-items="rightMenuItems"
						:locale-position="Position.right"
						class="tw-relative tw-mr-1 tw-items-center tw-content-center !tw-h-full"
					/>
				</div>
				<div
					class="tw-h-full tw-w-full tw-flex tw-justify-center tw-items-center tw-align-middle"
					v-if="display.smAndDown.value && componentProperties.menuIconOnRight"
				>
					<VBtn @click.stop.prevent="toogleNavigationbar" icon="mdi-menu" class="tw-border-none" />
				</div>
			</VCol>
			<VSpacer />
			<VCol cols="auto">
				<LocaleSelector show-icon />
			</VCol>
			<VCol cols="auto">
				<ThemeSelector show-icon />
			</VCol>
		</VRow>
		<VNavigationDrawer v-if="display.smAndDown.value" v-model="showNavigationbar" :class="navigationDrawerClass">
			<NavigationMenuList :model-value="navigationDrawerMenuItems" />
		</VNavigationDrawer>
	</VContainer>
</template>
<script setup lang="ts">
import { Menu } from '@/types/menu/item';
import { Position } from '@enums/position';
import Roles from '@/enums/auth/roles';
import { usePermissionsStore } from '@/stores/permissions';

export interface INavigationBarComponentProperties {
	menuIconOnRight?: boolean;
}
const componentProperties = withDefaults(defineProps<INavigationBarComponentProperties>(), {
	menuIconOnRight: false,
});
const display = useVuetifyDisplay();
const permissionStore = usePermissionsStore();
const isMounted = ref<boolean>(false);
const { menuItemsWithIcons, menuItemsWithoutIcons } = useMenuItems();
const showNavigationbar = ref(false);

const menuBarColumns = computed<number>(() => {
	return display.mdAndUp.value ? 8 : 2;
});
const leftMenuItems = computed<Menu[]>(() =>
	getMenuItemsForUserRoles(
		menuItemsWithoutIcons.value.filter(item => !item.position || item.position === Position.left),
	),
);
const rightMenuItems = computed<Menu[]>(() => {
	const items = menuItemsWithoutIcons.value.filter(item => item.position && item.position === Position.right);
	return [...getMenuItemsForUserRoles(items)];
});
function getMenuItemsForUserRoles(menuItems: Menu[]) {
	const userRoles = permissionStore.get();
	if (!userRoles)
		return menuItems.filter(
			item =>
				!item.authorizedRoles || item.authorizedRoles.length === 0 || item.authorizedRoles.includes(Roles.NONE),
		);
	return menuItems.filter(
		item =>
			!item.authorizedRoles ||
			item.authorizedRoles.length === 0 ||
			item.authorizedRoles.some(role => userRoles.includes(role)),
	);
}
const navigationDrawerMenuItems = computed<Menu[]>(() => {
	return [...getMenuItemsForUserRoles(menuItemsWithIcons.value)];
});
function toogleNavigationbar() {
	showNavigationbar.value = !showNavigationbar.value;
}
const navigationDrawerClass = computed(() => {
	const classes = ['!tw-rounded-xl'];
	if (showNavigationbar.value) classes.push('tw-ml-5');
	if (display.smAndDown.value) classes.push('!tw-mt-[100px] tw-max-h-[87.5%]');
	return classes.join(' ');
});
onMounted(() => {
	isMounted.value = true;
});
</script>
<style lang="css" scoped></style>
