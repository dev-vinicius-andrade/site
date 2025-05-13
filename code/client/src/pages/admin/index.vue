<template>
	<VContainer class="tw-h-full" fluid>
		<AdminMain></AdminMain>
	</VContainer>
</template>
<script setup lang="ts">
// import { Configuration, TypeApi } from '@/services/api';
// import { useApiBuilderOf, useUrlBuilder } from '@/services/api/composables/open-api';
// const isMounted = ref(false);
onMounted(async () => {
	try {
		const { api } = await useApi();
		api.createAuthorizedApi().listSupportedLanguage({});
		// const authorized = api.createAuthorizedApi();
		// const unauthorized = api.createUnauthorizedApi();
		// const authorizedResponse = await authorized.vversionContentTypeAuthenticatedGet('1');
		// const unauthorizedResponse = await unauthorized.vversionContentTypeUnauthenticatedGet('1');
	} catch (error) {
		console.error(error);
	}

	// api
});
</script>
