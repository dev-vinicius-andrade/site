<template>
	<div>
		<p v-for="(lineConfig, index) in lineConfigs" :key="index">
			<span :class="lineClasses(lineConfig)">{{ lineConfig.text }}</span>
		</p>
	</div>
</template>
<script setup lang="ts">
declare type LineOptions = {
	color: string;
	groupLines?: number[];
};
declare type LineConfig = {
	color: string;
	text: string;
};
declare type ComponentProperties = {
	text: string;
	fontSize?: string;
	uppercase?: boolean;
	linesOptions: LineOptions[];
	breakBy?: string;
	bold?: boolean;
};
const componentProperties = withDefaults(defineProps<ComponentProperties>(), {
	fontSize: 'tw-text-2xl',
	uppercase: false,
	linesOptions: () => [],
	breakBy: ' ',
});
const lineConfigs = computed<LineConfig[]>(() => {
	const splitedLines = componentProperties.text.split(componentProperties.breakBy);
	if (componentProperties.linesOptions.length === 0) return splitedLines.map(text => ({ color: '', text }));
	const lineConfigs: LineConfig[] = [];
	for (let i = 0; i < componentProperties.linesOptions.length; i++) {
		const group = componentProperties.linesOptions[i];
		const lines = group.groupLines ? group.groupLines.map(index => splitedLines[index]) : splitedLines;
		const text = lines.join(' ');
		lineConfigs.push({ color: group.color, text });
	}
	return lineConfigs;
});
const lineClasses = computed(() => (line: LineConfig) => {
	const classes = ['tw-text-center', componentProperties.fontSize, line.color];
	if (componentProperties.uppercase) classes.push('tw-uppercase');
	if (componentProperties.bold) classes.push('tw-font-bold');
	return classes.join(' ');
});
</script>
