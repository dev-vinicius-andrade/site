<template>
	<div class="loading-wrapper">
		<div class="loading-inner">
			<Logo width="100vh" />
		</div>
		<div class="loading-content"></div>
	</div>
</template>
<script setup lang="ts">
// const theme = useVuetifyTheme()
</script>
<style scoped>
.loading-wrapper {
	position: fixed;
	block-size: 100%;
	inline-size: 100%;
	inset-block-start: 0;
	inset-inline-start: 0;
}

.loading-inner {
	position: absolute;
	display: block;
	block-size: 30px;
	font-size: 20px;
	inline-size: 100px;
	inset-block-start: 50%;
	inset-inline-start: 50%;
	margin-block: -45px 0;
	margin-inline: -45px 0;
	text-align: center;
}

.loading-content {
	position: relative;
	display: block;
	border: 3px solid transparent;
	animation: loader 2s linear infinite;
	block-size: 170px;
	border-block-end-color: rgb(121, 61, 185);
	border-block-start-color: rgb(121, 61, 185);
	border-radius: 50%;
	inline-size: 170px;
	inset-block-start: 50%;
	inset-inline-start: 50%;
	margin-block: -85px 0;
	margin-inline: -85px 0;
}

@keyframes loader {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}
</style>
