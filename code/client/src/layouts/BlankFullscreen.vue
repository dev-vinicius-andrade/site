<template>
	<VContainer fluid v-if="isMounted" class="!tw-h-dvh !tw-w-screen tw-m-0 tw-p-0">
		<RouterView />
	</VContainer>
</template>
<script setup lang="ts">
const isMounted = ref(false);
onMounted(() => {
	isMounted.value = true;
});
</script>
