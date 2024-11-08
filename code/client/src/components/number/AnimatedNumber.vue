<template>
	<span> {{ prepend }}{{ displayedNumber }}{{ append }}</span>
</template>
<script setup lang="ts">
declare type ComponentProperties = {
	number: number;
	delayMs?: number;
	append?: string;
	prepend?: string;
};
const displayedNumber = ref<number>(0);
const isMounted = ref<boolean>(false);
const componentProperties = withDefaults(defineProps<ComponentProperties>(), {
	number: 10,
	delayMs: 1000,
});
function animate() {
	//if (isMounted.value) return;
	const startTime = performance.now();
	const updateNumber = (currentTime: number) => {
		const elapsed = currentTime - startTime;
		const progress = Math.min(elapsed / componentProperties.delayMs, 1);
		displayedNumber.value = Math.floor(progress * componentProperties.number);
		if (progress < 1) requestAnimationFrame(updateNumber);
		else displayedNumber.value = componentProperties.number;
	};
	requestAnimationFrame(updateNumber);
}
watch(
	() => componentProperties.number,
	() => {
		if (isMounted.value) animate();
	},
	{ immediate: true },
);
onMounted(() => {
	isMounted.value = true;
	animate();
});
</script>
