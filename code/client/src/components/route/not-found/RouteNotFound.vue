<template>
	<VEmptyState :headline="title" :text="message">
		<template v-slot:default>
			<slot name="default">
				{{ details }}
			</slot>
		</template>
	</VEmptyState>
</template>
<script setup lang="ts">
import { VEmptyState } from 'vuetify/components';

const title = computed(() => getTextFromKey('pages.notFound.title'));
const message = computed(() => getTextFromKey('pages.notFound.message'));
const details = defineModel<string>('details', { type: String, required: true });
</script>
