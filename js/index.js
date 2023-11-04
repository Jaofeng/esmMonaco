import monaco from '../dist/dev/esmMonaco.js';

const $ = document.querySelector.bind(document);
const opts = {
	value: [
		'function x() {',
		'\tconsole.log("Hello world!");',
		'}',
		'x();',
		`console.log('Hello world!')`,
		`console.warn('Hello world!')`,
		`console.error('Hello world!', new Error('Error message'))`,
	].join('\n'),
	theme: 'vs-dark',
	language: 'javascript',
	minimap: { enabled: false },
	automaticLayout: true,
}

const _orig_console = console;
const _new_console = {
	log: function () {
		_orig_console.log.apply(this, arguments);
		let _p = document.createElement('p');
		_p.classList.add('log');
		_p.innerHTML = Array.from(arguments).join(' ');
		$('#console').append(_p);
		__scrollToBottom();
	},
	warn: function () {
		_orig_console.warn.apply(this, arguments);
		let _p = document.createElement('p');
		_p.classList.add('warn');
		_p.innerHTML = Array.from(arguments).join(' ');
		$('#console').append(_p);
		__scrollToBottom();
	},
	error: function () {
		_orig_console.error.apply(this, arguments);
		let reg = /\s+at\s+(.*)/i;
		let _p = document.createElement('p');
		_p.classList.add('err');
		Array.from(arguments).forEach((arg) => {
			if (arg instanceof Error) {
				arg.stack.split('\n').forEach((line) => {
					let _s = document.createElement('span');
					_s.innerHTML = line;
					if (reg.test(line))
						_s.classList.add('at');
					_p.append(_s);
					_p.append(document.createElement('br'));
				});
			} else {
				let _s = document.createElement('span');
				_s.innerHTML = arg + '&nbsp;';
				_p.append(_s);
			}
		});
		$('#console').append(_p);
		__scrollToBottom();
	},
	clear: function () {
		_orig_console.clear.apply(this, arguments);
		$('#console').replaceChildren();
		__scrollToBottom();
	}
};
function __scrollToBottom() {
	$('#console').scrollTop = $('#console').scrollHeight;
}
let _editor;

function _init(e) {
	const btnPlay = $('#btnPlay');
	btnPlay.addEventListener('click', _execute);

	_editor = monaco.editor.create(document.getElementById('monaco'), opts);
	_editor.focus();
	window.addEventListener('resize', () => {
		// make editor as small as possible
		_editor.layout({ width: 0, height: 0 })
		const parent = _editor.getDomNode().parentElement
		// wait for next frame to ensure last layout finished
		window.requestAnimationFrame(() => {
			// get the parent dimensions and re-layout the editor
			const rect = parent.getBoundingClientRect()
			_editor.layout({ width: rect.width, height: rect.height })
		});
	});
}

function _execute(e) {
	console = _new_console;
	const code = _editor.getValue();
	try {
		const _func = new Function(code);
		_func();
	} catch (err) {
		console.error(err);
	}
	console = _orig_console;
}

document.addEventListener('DOMContentLoaded', _init);
