<template>
	<Dialog v-model="reactiveModel">
		<template #activator="{ actions }">
			<slot name="activator" :actions="actions" />
		</template>
		<template #default="{ actions }">
			<slot :actions="actions">
				<VCard>
					<slot name="title" :close="actions.close">
						<VCardTitle>
							<slot name="titleContent" :close="actions.close">
								<span>{{ componentProperties.title }}</span>
							</slot>
						</VCardTitle>
					</slot>
					<slot name="subtitle" :close="actions.close" v-if="hasSubtitle">
						<VCardSubtitle>
							<slot name="subtitleContent" :close="actions.close">
								<span>{{ componentProperties.subtitle }}</span>
							</slot>
						</VCardSubtitle>
					</slot>
					<slot name="content" :close="actions.close">
						<VCardText>
							<slot name="cardText" :close="actions.close">
								<span>{{ componentProperties.text }}</span>
							</slot>
						</VCardText>
					</slot>
					<slot name="actions" :close="actions.close">
						<VCardActions>
							<slot name="actionsContent" :close="actions.close">
								<VSpacer v-if="componentProperties.actionsOnRight" />
								<VBtn @click="onCancelClicked">
									<slot name="cancelText" :close="actions.close">
										<span>{{ componentProperties.cancelText }}</span>
									</slot>
								</VBtn>
								<VBtn @click="onConfirmClicked">
									<slot name="confirmText" :close="actions.close">
										<span>{{ componentProperties.confirmText }}</span>
									</slot>
								</VBtn>
							</slot>
						</VCardActions>
					</slot>
				</VCard>
			</slot>
		</template>
	</Dialog>
</template>
<script setup lang="ts">
import { Events } from '@/enums';
import { DialogActions } from '@/types/component/dialog';
const slots = useSlots();
export interface IConfirmationDialogComponentProperties {
	actionsOnRight?: boolean;
	title?: string;
	text?: string;
	subtitle?: string;
	cancelText?: string;
	confirmText?: string;
}
export interface IConfirmationDialogComponentEvents {
	(e: Events.onConfirmClicked, actions?: DialogActions): void;
	(e: Events.onCancelClicked, actions?: DialogActions): void;
}
const componentProperties = withDefaults(defineProps<IConfirmationDialogComponentProperties>(), {
	actionsOnRight: true,
	text: getTextFromKey('components.confirmationDialog.text'),
	title: getTextFromKey('components.confirmationDialog.title'),
	cancelText: getTextFromKey('buttons.cancel'),
	confirmText: getTextFromKey('buttons.confirm'),
});
const emits = defineEmits<IConfirmationDialogComponentEvents>();
const reactiveModel = defineModel<boolean>({
	default: false,
});
function closeDialog() {
	reactiveModel.value = false;
}
function showDialog() {
	reactiveModel.value = true;
}
function onCancelClicked() {
	closeDialog();
	emits(Events.onCancelClicked, { show: showDialog, close: closeDialog });
}

function onConfirmClicked() {
	emits(Events.onConfirmClicked, { show: showDialog, close: closeDialog });
}
const hasSubtitle = computed(() => {
	return !!slots.subtitle || !!componentProperties.subtitle || !!slots.subtitleContent;
});
</script>
