<template>
	<div>
		<slot name="activator" :show="open" :close="close" />
		<VDialog
			v-model="componentData.showDialog"
			persistent
			transition="slide-x-reverse-transition"
			@click:outside="onClickOutside"
			:width="componentProperties.width"
			:min-width="componentProperties.minWidth"
			:max-width="componentProperties.maxWidth"
			:content-class="contentClass"
		>
			<VCard v-show="componentData.showDialog" v-fill-parent>
				<VCardTitle v-if="hasTitle" :class="componentProperties.titleClass">
					<VRow justify="center" align="center">
						<slot name="title">
							<span v-if="componentProperties.title">{{ getText(componentProperties.title) }}</span>
						</slot>
						<VSpacer />
						<VCol v-if="componentProperties.showTopCloseButton" cols="1">
							<VBtn @click.stop.prevent="close" color="transparent" elevation="0" size="medium">
								<IconifyMdiClose />
							</VBtn>
						</VCol>
					</VRow>
				</VCardTitle>

				<slot name="body" :close="close">
					<VCardText>
						<slot name="content-prepend" :show="open" :close="close" />
						<slot :show="open" :close="close">
							<slot name="content" :show="open" :close="close" />
						</slot>
						<slot name="content-append" :show="open" :close="close" />
					</VCardText>
				</slot>
				<VCardActions>
					<slot name="actions" :show="() => setShowDialog(true)" :close="() => setShowDialog(false)" />
				</VCardActions>
			</VCard>
		</VDialog>
	</div>
</template>
<script setup lang="ts">
import { Events } from '@enums';
import { LocaleText } from '@/types/locale/text';
import { Nullable } from '@/types/nullable';
import { DialogActions } from '@/types/component/dialog';
export interface IDialogConfirmComponentProperties {
	modelValue?: boolean;
	modelData?: any;
	title?: Nullable<LocaleText>;
	isActive?: boolean;
	showTopCloseButton?: boolean;
	buttonConfirmText?: LocaleText;
	buttonConfirmColor?: string;
	buttonCancelText?: LocaleText;
	buttonCancelColor?: string;
	titleClass?: string;
	fillHeight?: boolean;
	persistent?: boolean;
	minWidth?: string | number;
	maxWidth?: string | number;
	width?: string | number;
}

export interface IDialogConfirmComponentEvents {
	(e: Events.onOutsideClicked, actions?: DialogActions): void;
	(e: 'update:isActive', val?: boolean): void;
	(e: Events.onModelValueUpdate, visible?: boolean): void;
}

export interface IDialogConfirmComponentData {
	showDialog?: boolean;
}

const componentProperties = withDefaults(defineProps<IDialogConfirmComponentProperties>(), {
	persistent: false,
	fillHeight: true,
	modelValue: false,
	isActive: true,
	buttonConfirmText: () => ({ key: 'buttons.confirm' }),
	buttonCancelText: () => ({ key: 'buttons.cancel' }),
	showTopCloseButton: false,
	buttonCancelColor: 'terciary',
	buttonConfirmColor: 'primary',
	titleClass: 'pt-2 text-wrap',
	width: 'auto',
	minWidth: 650,
	maxWidth: 650,
});
const componentData = reactive<IDialogConfirmComponentData>({
	showDialog: componentProperties.modelValue,
});
const emits = defineEmits<IDialogConfirmComponentEvents>();
const slots = useSlots();
const hasTitle = computed(() => !!slots['title'] || !!componentProperties?.title);
const contentClass = computed(() => {
	return ['side-dialog', componentProperties.fillHeight ? 'fill-height' : ''].join(' ');
});

function onClickOutside(payload: MouseEvent) {
	emits(Events.onOutsideClicked, { show: open, close });
	if (componentProperties.persistent) return;
	setShowDialog(false);
}
function setShowDialog(value: boolean) {
	componentData.showDialog = value;
}
function close() {
	setShowDialog(false);
}
function open() {
	setShowDialog(true);
}
</script>
<style lang="css">
.side-dialog {
	inset-block-start: 0 !important;
	inset-inline-end: 0 !important;
}
</style>
