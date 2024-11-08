import { LocaleText } from '@/types/locale/text';
import { EditorState, SelectionRange, Compartment } from '@codemirror/state';
import { EditorView } from '@codemirror/view';

import { WritableComputedRef } from 'vue';
export interface ICodeMirrorCode {
	code: string | WritableComputedRef<string>;
}
export interface IStructureHtml {
	structureHtml?: string;
	typeVariable?: string;
	icon?: string;
}

export interface ICodeMirrorData extends ICodeMirrorCode {
	view?: EditorView;
	state?: EditorState;
	container?: HTMLDivElement;
	cursorPosition?: number;
	selectionRange?: SelectionRange;
	placeholder?: LocaleText;
	readonlyConfig: Compartment;
	nameVariable?: string;
	selectedTypeVariable?: IStructureHtml;
}
export interface ICodeMirrorDataWithExtensions extends ICodeMirrorData {}
export interface ICodeMirrorPosition {
	anchor: number;
	head?: number;
}
export declare type CodeMirrorCode = ICodeMirrorCode;
export declare type CodeMirrorData = ICodeMirrorData;
export declare type CodeMirrorDataWithExtensions = ICodeMirrorDataWithExtensions;
export declare type CodeMirrorPosition = ICodeMirrorPosition;
