<template>
	<VContainer fluid v-fill-parent>
		<VRow>
			<VSpacer />
			<VCol>
				<RouteNotFound :details="route" />
			</VCol>
			<VSpacer />
		</VRow>
	</VContainer>
</template>
<script setup lang="ts">
const router = useRouter();
const route = computed(() =>
	getTextFromKey('pages.notFound.route', { params: { route: router.currentRoute.value.path } }),
);
</script>
