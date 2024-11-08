<template>
	<div>
		<div class="tw-flex tw-items-center tw-place-content-center">
			<NavigationBarMenuButtonsButton
				v-for="(_, index) in componentProperties.leftMenuItems"
				v-model="componentProperties.leftMenuItems[index]"
				:key="`menu-item-buttons-left-${index}`"
				:variant="componentProperties.variant"
			/>

			<VSpacer />

			<NavigationBarMenuButtonsButton
				v-for="(_, index) in componentProperties.rightMenuItems"
				v-model="componentProperties.rightMenuItems[index]"
				:key="`menu-item-buttons-left-${index}`"
				:variant="componentProperties.variant"
			/>
			<!-- <Configurations /> -->
			<!-- <VCol>
			<NavigationBarMenuButtonsButton
				v-for="(_, index) in componentProperties.rightMenuItems"
				v-model="componentProperties.rightMenuItems[index]"
				:key="`menu-item-buttons-left-${index}`"
				:variant="componentProperties.variant"
			/>
		</VCol> -->
		</div>
	</div>
</template>
<script setup lang="ts">
import { Menu } from '@/types/menu/item';
import { Position } from '@/enums/position';
import type { ButtonVariant } from '@/types/vuetify';
export interface IMenuButtonComponentProperties {
	leftMenuItems: Menu[];
	rightMenuItems: Menu[];
	variant?: ButtonVariant;
	localePosition?: Position;
}
const componentProperties = withDefaults(defineProps<IMenuButtonComponentProperties>(), {
	leftMenuItems: () => [],
	rightMenuItems: () => [],
	variant: 'plain',
});
</script>
