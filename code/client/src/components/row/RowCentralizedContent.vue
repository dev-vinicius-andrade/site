<template>
	<VRow>
		<VSpacer />
		<VCol :cols="contentColumns" :class="contentColumnClasses">
			<slot />
		</VCol>
		<VSpacer />
	</VRow>
</template>
<script setup lang="ts">
const contentColumnClasses = defineModel<string | number>('contentColumnClasses', {
	required: false,
	default: 'grid justify-items-center',
});
const contentColumns = defineModel<number | string>('contentColumns', { required: false, default: 6 });
</script>
