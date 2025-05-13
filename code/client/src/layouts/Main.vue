<template>
	<VContainer fluid v-if="isMounted" class="!tw-h-max">
		<NavigationBar />
		<VContainer class="tw-h-full" fluid>
			<VRow class="tw-mt-10 tw-h-5/6">
				<VCol>
					<RouterView class="mt-5" />
				</VCol>
			</VRow>
		</VContainer>
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
