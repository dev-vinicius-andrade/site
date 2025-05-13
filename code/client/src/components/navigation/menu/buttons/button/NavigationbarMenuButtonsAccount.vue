<template>
	<div>
		<VBtn>{{ loginButtonLabel }}</VBtn>
	</div>
</template>
<script setup lang="ts">
const loginButtonLabel = computed(() => getTextFromKey('buttons.login'));
</script>
