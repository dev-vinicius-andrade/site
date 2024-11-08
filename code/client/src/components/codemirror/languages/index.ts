import { CodemirrorLanguageType } from '@/components/codemirror/types';

export async function getLanguage(languageType: CodemirrorLanguageType) {
	switch (languageType.id) {
		case 'angular':
			return (await import('@codemirror/lang-angular')).angular;
		case 'cpp':
			return (await import('@codemirror/lang-cpp')).cpp;
		case 'csharp':
			return (await import('@replit/codemirror-lang-csharp')).csharp;
		case 'css':
			return (await import('@codemirror/lang-css')).css;
		case 'html':
			return (await import('@codemirror/lang-html')).html;
		case 'java':
			return (await import('@codemirror/lang-java')).java;
		case 'javascript':
			return (await import('@codemirror/lang-javascript')).javascript;
		case 'json':
			return (await import('@codemirror/lang-json')).json;
		case 'less':
			return (await import('@codemirror/lang-less')).less;
		case 'markdown':
			return (await import('@codemirror/lang-markdown')).markdown;
		case 'php':
			return (await import('@codemirror/lang-php')).php;
		case 'python':
			return (await import('@codemirror/lang-python')).python;
		case 'rust':
			return (await import('@codemirror/lang-rust')).rust;
		case 'sass':
			return (await import('@codemirror/lang-sass')).sass;
		case 'sql':
			return (await import('@codemirror/lang-sql')).sql;
		case 'vue':
			return (await import('@codemirror/lang-vue')).vue;
		case 'wast':
			return (await import('@codemirror/lang-wast')).wast;
		case 'xml':
			return (await import('@codemirror/lang-xml')).xml;
		case 'yaml':
			return (await import('@/components/codemirror/languages/yaml')).yaml;
		case 'text':
			return (await import('@/components/codemirror/languages/text')).text;
		default:
			return (await import('@/components/codemirror/languages/text')).text;
	}
}
