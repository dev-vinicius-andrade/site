import { TagStyle } from '@codemirror/language';
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
export declare type CodemirrorThemeSettings = {
	background: string;
	foreground: string;
	caret: string;
	selection: string;
	lineHighlight: string;
	gutterBackground: string;
	gutterForeground: string;
};
export declare type CodemirrorThemeOptions = {
	variant: 'light' | 'dark';
	settings: CodemirrorThemeSettings;
	styles: TagStyle[];
};
export class CodemirrorLanguageType {
	// CUSTOM LANGUAGE TYPES
	static text = new CodemirrorLanguageType('text', 'Text', 'vscode-icons:file-type-text', true);
	static ini = new CodemirrorLanguageType('ini', 'INI', 'vscode-icons:file-type-ini', true);
	static yaml = new CodemirrorLanguageType('yaml', 'YAML', 'vscode-icons:file-type-yaml', true);
	static powershell = new CodemirrorLanguageType('powershell', 'Powershell', 'devicon:powershell', true);
	static bash = new CodemirrorLanguageType('bash', 'Bash', 'devicon:bash', true);

	// CODE MIRROR LANGUAGE TYPES
	static javascript = new CodemirrorLanguageType('javascript', 'Javascript', 'devicon-javascript', true);
	static html = new CodemirrorLanguageType('html', 'HTML', 'devicon-html5', true);
	static css = new CodemirrorLanguageType('css', 'CSS', 'devicon-css3-wordmark', true);
	static json = new CodemirrorLanguageType('json', 'JSON', 'vscode-icons:file-type-json', true);
	static xml = new CodemirrorLanguageType('xml', 'XML', 'vscode-icons:file-type-xml', true);
	static markdown = new CodemirrorLanguageType('markdown', 'Markdown', 'vscode-icons:file-type-markdown', true);
	static python = new CodemirrorLanguageType('python', 'Python', 'devicon-python-wordmark', true);
	static sql = new CodemirrorLanguageType('sql', 'SQL', 'devicon:azuresqldatabase', true);
	static csharp = new CodemirrorLanguageType('csharp', 'C#', 'devicon:csharp', true);

	// DISABLED LANGUAGE TYPES
	static typescript = new CodemirrorLanguageType('typescript', 'Typescript', 'devicon-typescript', false);
	static php = new CodemirrorLanguageType('php', 'PHP', 'devicon-php', false);
	static java = new CodemirrorLanguageType('java', 'Java', 'devicon-java-wordmark', false);
	static c = new CodemirrorLanguageType('c', 'C', 'devicon:c', false);
	static cpp = new CodemirrorLanguageType('cpp', 'C++', 'devicon:cplusplus', false);
	static go = new CodemirrorLanguageType('go', 'Go', 'devicon:go-wordmark', false);
	static ruby = new CodemirrorLanguageType('ruby', 'Ruby', 'devicon:ruby-wordmark', false);
	static rust = new CodemirrorLanguageType('rust', 'Rust', 'vscode-icons:file-type-rust', false);
	static swift = new CodemirrorLanguageType('swift', 'Swift', 'devicon:swift', false);
	static kotlin = new CodemirrorLanguageType('kotlin', 'Kotlin', 'devicon:kotlin-wordmark', false);
	static dart = new CodemirrorLanguageType('dart', 'Dart', 'devicon:dart', false);
	static scala = new CodemirrorLanguageType('scala', 'Scala', 'devicon:scala', false);
	static groovy = new CodemirrorLanguageType('groovy', 'Groovy', 'devicon:groovy', false);
	static perl = new CodemirrorLanguageType('perl', 'Perl', 'devicon:perl', false);
	static lua = new CodemirrorLanguageType('lua', 'Lua', 'devicon:lua', false);
	static r = new CodemirrorLanguageType('r', 'R', 'devicon:r', false);
	static matlab = new CodemirrorLanguageType('matlab', 'Matlab', 'devicon:matlab', false);
	readonly id: string;
	readonly label: string;
	readonly icon: string;
	readonly enabled: boolean;
	constructor(id: string, label: string, icon: string, enabled: boolean) {
		this.id = id;
		this.label = label;
		this.icon = icon;
		this.enabled = enabled;
	}
	static getLanguageType(id?: string): CodemirrorLanguageType {
		if (!id) return this.text;
		const type = (this as any)[id];
		if (type && type instanceof CodemirrorLanguageType && type.enabled) return type;
		throw new Error(`LanguageType ${id} not found or not enabled`);
	}
	static getEnabledLanguageTypes() {
		return Object.values(CodemirrorLanguageType).filter(type => type.enabled);
	}
	toString() {
		return this.id;
	}
}
export declare type CodeMirrorReadyPayload = {
	view: EditorView;
	state: EditorState;
	container: HTMLDivElement;
};
