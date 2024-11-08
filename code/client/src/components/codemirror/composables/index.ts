import { indentWithTab, history } from '@codemirror/commands';
import { closeBrackets, autocompletion } from '@codemirror/autocomplete';
import { getLanguage } from '@/components/codemirror/languages';
import {
	indentOnInput,
	foldGutter,
	bracketMatching,
	defaultHighlightStyle,
	syntaxHighlighting,
	indentService,
	getIndentation,
} from '@codemirror/language';
import { EditorState } from '@codemirror/state';
import { CodemirrorLanguageType } from '@/components/codemirror/types';

export function getThemes() {
	const themes = import.meta.glob('@/components/codemirror/themes/*.js', { eager: true });
	const themeNames = Object.keys(themes).map(key => key.replace(/\.\/(.*)\.js/, '$1'));
	return themeNames;
}

export async function getTheme(name: string) {
	const theme = (await import(`@/components/codemirror/themes/${name}.js`)).theme;
	console.log(theme);
	return theme;
}
export const languagePatterns = [
	{ language: 'javascript', pattern: /^(?:function|const|let|var|if|else|for|while|switch|case|break|return)\b/g },
	{ language: 'json', pattern: /^\s*{/ },
	{ language: 'markdown', pattern: /^#+\s+.*/ },
	{ language: 'html', pattern: /<\/?[a-z][\s\S]*>/i },
	{
		language: 'csharp',
		pattern:
			/(?:class|namespace|using|public|private|protected|static|void|if|else|for|while|switch|case|break|return|interface|abstract|enum|operator|Main(string[] args))\b/g,
	},
	{ language: 'xml', pattern: /<\/?[a-z][\s\S]*>/i },
	{ language: 'css', pattern: /(?:\{|\})/ },
	{ language: 'cpp', pattern: /(?:int|float|double|void|if|else|for|while|switch|case|break|return)\b/g },
	{ language: 'angular', pattern: /\b(?:ng-[a-z-]+)\b/g },
	{ language: 'vue', pattern: /<\s*template\s*>[\s\S]*<\/\s*template\s*>/i },
	{ language: 'less', pattern: /(?:\{|\})/ },
	{ language: 'python', pattern: /(?:def|class|if|else|for|while|import|from|as|return)\b/g },
	{ language: 'php', pattern: /<\?php/ },
	{ language: 'rust', pattern: /(?:fn|struct|impl|if|else|for|while|match|return)\b/g },
	{ language: 'sass', pattern: /(?:\{|\})/ },
	{
		language: 'sql',
		pattern: /(?:SELECT|INSERT|UPDATE|DELETE|FROM|WHERE|JOIN|GROUP BY|ORDER BY|CREATE| DROP|EXEC|SET|TRUNCATE)\b/gi,
	},
	{ language: 'wast', pattern: /\b(?:module|func|memory|table|data|export|import|param|result)\b/g },
];
export function autoDetectLanguageType(content: string) {
	let detectedLanguage;
	// Loop through the language patterns and check if any match
	for (const { language, pattern } of languagePatterns) {
		if (pattern.test(content)) {
			detectedLanguage = language;
			break;
		}
	}
	const languageType = CodemirrorLanguageType.getLanguageType(detectedLanguage) ?? CodemirrorLanguageType.text;
	const language = getLanguage(languageType);
	return { language, languageType };
}

function getSelectedLanguageIndentation(state: EditorState, language: CodemirrorLanguageType) {
	const line = state.doc.lineAt(state.selection.main.head);

	const indentation = getIndentation(state, line.number);
	return indentation;
}

export function indentSelectedLanguage(state: EditorState, language: CodemirrorLanguageType) {
	const indentation = getSelectedLanguageIndentation(state, language);
	return indentation;
}
export function useCodeMirror() {
	return {
		indentWithTab,
		history,
		closeBrackets,
		autocompletion,
		getTheme,
		indentOnInput,
		foldGutter,
		bracketMatching,
		defaultHighlightStyle,
		syntaxHighlighting,
		indentService,
		getThemes,
		getSelectedLanguageIndentation,
		indentSelectedLanguage,
		autoDetectLanguageType,
		getIndentation,
	};
}
