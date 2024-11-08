<template>
	<Codemirror v-model="code" @ready="onReady" :extensions="extensions" class="tw-w-full" v-if="isMounted" />
</template>
<script setup lang="ts">
import { Codemirror } from 'vue-codemirror';

import { LocaleText } from '@/types/locale/text';
import { CodeMirrorData } from '@/types/component/codemirror-custom';
import { CodemirrorLanguageType, CodeMirrorReadyPayload } from '@/components/codemirror/types';
import { Nullable } from '@/types/nullable';
import { Compartment, EditorState, Extension } from '@codemirror/state';
import { highlightSelectionMatches } from '@codemirror/search';
import {
	rectangularSelection,
	lineNumbers,
	highlightActiveLineGutter,
	highlightSpecialChars,
	drawSelection,
	highlightActiveLine,
	dropCursor,
} from '@codemirror/view';
import { useCodeMirror } from '@/components/codemirror/composables';
import { getLanguage } from '@/components/codemirror/languages';
import { LanguageSupport } from '@codemirror/language';
declare type ComponentProperties = {
	codeBackgroundColor?: string;
	modelValue?: string;
	readOnlyLines?: number[];
	language?: Function;
	placeholder?: LocaleText;
	readonly?: boolean;
	codeMirrorHeight?: string;
};
declare type ComponentEvents = {
	(e: Events.change, codeMirrorData: CodeMirrorData): void;
	(e: Events.onModelValueUpdate, value: string): void;
};
declare type CodemirrorConfigData = {
	readonlyConfig?: Nullable<Compartment>;
	themeConfig?: Nullable<Compartment>;
	languageTypeConfig?: Nullable<Compartment>;
	languageType?: CodemirrorLanguageType | string;
	languageTypeService?: any;
	theme?: {
		theme?: string;
	} & any;
};
const {
	autoDetectLanguageType,
	autocompletion,
	bracketMatching,
	closeBrackets,
	defaultHighlightStyle,
	foldGutter,
	getIndentation,
	getSelectedLanguageIndentation,
	getTheme,
	getThemes,
	history,
	indentOnInput,
	indentSelectedLanguage,
	indentService,
	indentWithTab,
	syntaxHighlighting,
} = useCodeMirror();

const codeMirrorConfig = ref<CodemirrorConfigData>({});
const codemirror = ref<Nullable<CodeMirrorReadyPayload>>(null);
const code = defineModel<string>({ default: '' });
const reactiveLanguageType = defineModel<CodemirrorLanguageType | string>('languageType', {
	default: CodemirrorLanguageType.text,
});
const isMounted = ref(false);
const componentProperties = withDefaults(defineProps<ComponentProperties>(), {
	readonly: false,
	codeMirrorHeight: '100%',
});
function onReady(payload: CodeMirrorReadyPayload) {
	codemirror.value = payload;
}
function configureReadonly(): Extension {
	if (!codeMirrorConfig.value) return [];
	codeMirrorConfig.value.readonlyConfig = new Compartment();
	return codeMirrorConfig.value.readonlyConfig.of(EditorState.readOnly.of(componentProperties.readonly));
}
function basicSetup() {
	return [
		highlightActiveLineGutter(),
		highlightSpecialChars(),
		history(),
		foldGutter(),
		drawSelection(),
		dropCursor(),
		EditorState.allowMultipleSelections.of(true),
		indentOnInput(),
		bracketMatching(),
		closeBrackets(),
		autocompletion(),
		rectangularSelection(),
		highlightActiveLine(),
		highlightSelectionMatches(),
		indentService.of((context, pos) => {
			const previousLine = context.lineAt(pos, -1);
			const match = previousLine.text.match(/^(\s)*/);
			if (!match || match.length <= 0) return 0;
			return match[0].length;
		}),
	];
}
async function setupDefaultTheme() {
	if (!codeMirrorConfig.value.theme?.theme) return await getTheme('default');
	const theme =
		typeof codeMirrorConfig.value.theme.theme === 'string'
			? await getTheme(codeMirrorConfig.value.theme)
			: codeMirrorConfig.value.theme;

	return theme;
}
async function createThemeConfig() {
	const { theme } = await setupDefaultTheme();
	console.log(theme);
	codeMirrorConfig.value.themeConfig = new Compartment();
	return codeMirrorConfig.value.themeConfig.of(theme);
}
async function setupDefaultLanguageType() {
	codeMirrorConfig.value.languageType = codeMirrorConfig.value.languageType;
	if (!codeMirrorConfig.value.languageType) codeMirrorConfig.value.languageType = CodemirrorLanguageType.javascript;
	if (typeof codeMirrorConfig.value.languageType === 'string') {
		codeMirrorConfig.value.languageType = CodemirrorLanguageType.getLanguageType(
			reactiveLanguageType.value as string,
		);
		reactiveLanguageType.value = codeMirrorConfig.value.languageType;
		const language = await getLanguage(codeMirrorConfig.value.languageType);
		codeMirrorConfig.value.languageTypeService = language;
		return language;
	}
	const { language, languageType } = autoDetectLanguageType(code.value);
	codeMirrorConfig.value.languageType = languageType;
	reactiveLanguageType.value = languageType;
	codeMirrorConfig.value.languageTypeService = language;
	return language;
}
async function createLanguageTypeConfig() {
	codeMirrorConfig.value.languageTypeConfig = new Compartment();
	codeMirrorConfig.value.languageTypeService = await setupDefaultLanguageType();
	return codeMirrorConfig.value.languageTypeConfig.of(codeMirrorConfig.value.languageTypeService());
}
const extensions = [configureReadonly(), basicSetup(), await createThemeConfig(), await createLanguageTypeConfig()];

onMounted(async () => {
	isMounted.value = true;
});
</script>
