<template>
	<VRow>
		<slot name="prepend" />
		<VCol :cols="contentColumns" :class="contentColumnClasses">
			<slot />
		</VCol>
		<slot name="append" />
	</VRow>
</template>
<script setup lang="ts">
const contentColumnClasses = defineModel<string>('contentColumnClasses', {
	required: false,
	default: 'grid justify-items-center',
});
const contentColumns = defineModel<number | string>('contentColumns', { required: false, default: 6 });
</script>
