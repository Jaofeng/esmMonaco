import * as monaco from 'monaco-editor/esm/vs/editor/editor.main.js';

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

if (document.getElementById('monaco-style') === null) {
	let head = document.getElementsByTagName('HEAD')[0];
	let link = document.createElement('link');
	link.id = 'monaco-style';
	link.rel = 'stylesheet';
	link.type = 'text/css';
	link.href = `${__jsPath}/esmMonaco${(__isMinify ? '.min' : '')}.css`;
	head.appendChild(link);
}

export default monaco;
