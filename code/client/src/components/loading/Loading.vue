<template>
	<VMain>
		<VContainer v-fill-height fluid v-fill-parent>
			<VRow align="center" justify="center" v-fill-parent>
				<VSpacer />
				<VCol cols="auto">
					<VContainer>
						<VRow align="center" justify="center">
							<VProgressCircular indeterminate size="56" :bg-color="bgColor" />
						</VRow>
					</VContainer>
				</VCol>
			</VRow>
			<VSpacer />
		</VContainer>
	</VMain>
</template>
<script setup lang="ts">
const bgColor = defineModel<string>('bgColor', { default: 'transparent', type: String, required: false });
</script>
