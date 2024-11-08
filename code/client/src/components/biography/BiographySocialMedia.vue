<template>
	<VRow>
		<VBtn class="tw-text-2xl tw-p-1" size="50px" variant="outlined" @click.stop.prevent="goToGithub"
			><IconifyFaGithub
		/></VBtn>
		<VBtn class="tw-text-2xl tw-p-1" size="50px" variant="outlined" @click.stop.prevent="goToLinkedin"
			><IconifyFaLinkedin
		/></VBtn>
		<VBtn class="tw-text-2xl tw-p-1" size="50px" variant="outlined" @click.stop.prevent="goToStackoverflow"
			><IconifyMdiStackoverflow
		/></VBtn>
		<Dialog>
			<template #activator="{ actions }">
				<VBtn
					class="tw-text-2xl tw-p-1 tw-ml-1.5"
					size="50px"
					variant="outlined"
					@click.stop.prevent="actions.show"
					><IconifyMdiEmail
				/></VBtn>
			</template>
		</Dialog>
	</VRow>
</template>
<script setup lang="ts">
import { useConfigurationsStore } from '@/stores/configuration';

const configurationsStore = useConfigurationsStore();
function goToGithub() {
	openLinkInNewTab(configurationsStore.configurations.social.github);
}
function goToLinkedin() {
	openLinkInNewTab(configurationsStore.configurations.social.linkedin);
}
function goToStackoverflow() {
	openLinkInNewTab(configurationsStore.configurations.social.stackoverflow);
}
function openLinkInNewTab(link: string) {
	window.open(link, '_blank');
}
</script>
