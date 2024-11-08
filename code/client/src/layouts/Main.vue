<template>
	<VContainer fluid v-if="isMounted" class="!tw-h-max">
		<NavigationBar />
		<RouterView class="mt-5" />
	</VContainer>
	<VContainer fluid v-fill-parent v-else>
		<VRow>
			<VSpacer />
			<VCol><Loading /></VCol>
			<VSpacer />
		</VRow>
	</VContainer>
</template>
<script setup lang="ts">
import { VSpacer } from 'vuetify/components';

const isMounted = ref(false);
onMounted(() => {
	isMounted.value = true;
});
</script>
