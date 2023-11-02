import EzMonaco from '../dist/dev/ezMonaco.js';

const opts = {
	value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
	theme: 'vs-dark',
	language: 'javascript',
	// minimap: { enabled: false },
	// automaticLayout: true,
}

const ezMonaco = new EzMonaco();
let editor = ezMonaco.create(document.getElementById('editor'), opts);
editor.updateOptions({ minimap: { enabled: false } });
console.log(editor.getValue());