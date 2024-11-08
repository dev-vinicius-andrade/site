<template>
	<div>
		<slot name="activator" :actions="{ show, close }" />
		<VDialog
			v-model="reactiveModel"
			:class="componentProperties.class"
			:width="width"
			:fullscreen="componentProperties.fullscreen"
			@blur="onBlur"
		>
			<slot :actions="{ show, close }" />
		</VDialog>
	</div>
</template>
<script setup lang="ts">
import { Events } from '@/enums';
import { DialogActions } from '@/types/component/dialog';

export interface IDialogComponentProperties {
	showDialog?: boolean;
	class?: string;
	fullscreen?: boolean;
}
export interface IDialogComponentData {}
export interface IDialogComponentEvents {
	(e: Events.onModelValueUpdate, value?: boolean): void;
	(e: Events.blur, actions?: DialogActions): void;
}

const componentProperties = withDefaults(defineProps<IDialogComponentProperties>(), {
	class: '',
	showDialog: true,
	fullscreen: false,
});

const emits = defineEmits<IDialogComponentEvents>();
const display = useVuetifyDisplay();
const reactiveModel = defineModel<boolean>({
	default: false,
});
const width = computed(() => {
	if (componentProperties.fullscreen) return '100%';
	return display.smAndUp ? 650 : 'auto';
});

function show() {
	reactiveModel.value = true;
}
function close() {
	reactiveModel.value = false;
}
function onBlur() {
	emits(Events.blur, { show, close });
}
watch(
	() => reactiveModel.value,
	value => {
		if (!reactiveModel.value) emits(Events.blur, { show, close });
	},
);
</script>
