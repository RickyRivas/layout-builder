<script>
	// this component only takes one snippet code and land at a time
	// formatting/highlighting
	import Prism from 'prismjs';
	import beautify from 'js-beautify';
	import 'prismjs/components/prism-javascript';
	import 'prismjs/components/prism-css';
	import 'prismjs/components/prism-markup';
	import { formatOpts } from '$lib/utils';

	let { snippet, lang, text = '' } = $props();
	let copyBtn;

	const beautifyFunctions = {
		html: beautify.html,
		css: beautify.css,
		javascript: beautify.javascript
	};

	const prismLanguages = {
		html: Prism.languages.markup,
		css: Prism.languages.css,
		javascript: Prism.languages.javascript
	};
	function onclick() {
		const beautifyFunction = beautifyFunctions[lang] || ((x) => x);

		navigator.clipboard.writeText(beautifyFunction(snippet, formatOpts));
		copyBtn.classList.add('success');

		setTimeout(() => {
			copyBtn.classList.remove('success');
		}, 1000);
	}
</script>

<button class="btn" {onclick} bind:this={copyBtn}>{text ? text : 'Copy'}</button>
