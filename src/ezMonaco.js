import * as monaco from './node_modules/monaco-editor/esm/vs/editor/editor.main.js';
import { setLocaleData } from './node_modules/monaco-editor-nls';
import zh_TW from './node_modules/monaco-editor-nls/locale/zh-hant';

const __getRunningScript = new Error().stack.match(/([^ \(\n])*([a-z]*:\/\/\/?)*?[a-z0-9\/\\]*\.js/ig)[0];
const __jsPath = (function () {
	let _p = __getRunningScript.substring(window.location.origin.length).split('/');
	_p.pop();
	return _p.join('/');
})();
const __isMinify = (function () {
	let _p = __getRunningScript.substring(window.location.origin.length).split("/");
	return /\.min\.js$/.test(_p[_p.length - 1]);
})();

self.MonacoEnvironment = {
	getWorkerUrl: function (moduleId, label) {
		switch (label) {
			case 'json': return __jsPath + '/vs/language/json/json.worker.js';
			case 'css':
			case 'scss':
			case 'less': return __jsPath + '/vs/language/css/css.worker.js';
			case 'html':
			case 'handlebars':
			case 'razor': return __jsPath + '/vs/language/html/html.worker.js';
			case 'typescript':
			case 'javascript': return __jsPath + '/vs/language/typescript/ts.worker.js';
			default: return __jsPath + '/vs/editor/editor.worker.js';
		}
	}
};

setLocaleData(zh_TW);

class EzMonaco {
	#monaco;

	constructor() {
		let head = document.getElementsByTagName('HEAD')[0];
		if (document.getElementById('ezMonaco') === null) {
			let link = document.createElement('link');
			link.id = 'ezMonaco';
			link.rel = 'stylesheet';
			link.type = 'text/css';
			link.href = `${__jsPath}/ezMonaco${(__isMinify ? '.min' : '')}.css`;
			head.appendChild(link);
		}
		this.#monaco = monaco;
	}

	/** 取得 Monaco Editor 本體
	 * @returns {monaco} Monaco Editor 本體
	 */
	get monaco() { return this.#monaco; }
	/** 取得 Monaco Editor 的 editor Namespace 本體
	 * @returns {monaco.editor} Monaco Editor 的 editor Namespace 本體
	 */
	get editor() { return this.#monaco.editor; }
	/** 取得 Monaco Editor 的 languages Namespace 本體
	 * @returns {monaco.languages} Monaco Editor 的 languages Namespace 本體
	 */
	get languages() { return this.#monaco.languages; }

	/** 建立 Monaco Editor 編輯器
	 * @param {HTMLElement} container 放置編輯器的容器
	 * @param {monaco.editor.IStandaloneEditorConstructionOptions} options 編輯器設定
	 * @returns {monaco.editor.IStandaloneCodeEditor} 編輯器
	 */
	create(container, options) { return this.#monaco.editor.create(container, options); }

	/** 取得 Monaco Editor 本體
	 * @returns {monaco} Monaco Editor 本體
	 */
	static get monaco() { return monaco; }
	/** 取得 Monaco Editor 的 editor Namespace 本體
	 * @returns {monaco.editor} Monaco Editor 的 editor Namespace 本體
	 */
	static get editor() { return monaco.editor; }
	/** 取得 Monaco Editor 的 languages Namespace 本體
	 * @returns {monaco.languages} Monaco Editor 的 languages Namespace 本體
	 */
	static get languages() { return monaco.languages; }

	/** 建立 Monaco Editor 編輯器
	 * @param {HTMLElement} container 放置編輯器的容器
	 * @param {monaco.editor.IStandaloneEditorConstructionOptions} options 編輯器設定
	 * @returns {monaco.editor.IStandaloneCodeEditor} 編輯器
	 */
	static create(container, options) { return new EzMonaco().create(container, options); }
}

export default EzMonaco;

// export default monaco;