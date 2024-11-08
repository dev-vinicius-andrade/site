<template>
	<VMenu v-model="showItems">
		<template v-slot:activator="{ props }">
			<slot name="activator" :props="props" :close="close" :show="show">
				<VBtn color="transparent" size="small" elevation="0" />
			</slot>
		</template>
		<slot :close="close" :show="show">
			<VList>
				<VListItem @click="onDropdownItemClick">
					<VListItemTitle>{{ getTextFromKey('variations.item.text') }}</VListItemTitle>
				</VListItem>
			</VList>
		</slot>
	</VMenu>
</template>
<script setup lang="ts">
const showItems = defineModel<boolean>({ default: false, type: Boolean, required: false });
function onDropdownItemClick() {
	showItems.value = false;
}
function close() {
	showItems.value = false;
}
function show() {
	showItems.value = true;
}
</script>
