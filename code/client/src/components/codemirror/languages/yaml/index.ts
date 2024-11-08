import parser from 'js-yaml';
import { Diagnostic, linter } from '@codemirror/lint';
import { StreamLanguage } from '@codemirror/language';
import * as yamlMode from '@codemirror/legacy-modes/mode/yaml';
import { EditorView } from '@codemirror/view';
function customLinter() {
	const yaml = StreamLanguage.define(yamlMode.yaml);
	const yamlLint = linter((view: EditorView) => {
		const diagnostics: Diagnostic[] = [];
		const text = view.state.doc.toString();
		try {
			parser.load(text);
		} catch (e: any) {
			const loc = e.mark;
			const from = loc ? loc.position : 0;
			const to = from;
			const severity = 'error';

			diagnostics.push({
				from,
				to,
				message: e.message,
				severity,
			});
		}
		return diagnostics;
	});
	return [yaml, yamlLint];
}
export const yaml = customLinter;
