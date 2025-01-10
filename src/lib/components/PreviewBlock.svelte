<script>
	// component block
	import Prism from 'prismjs';
	import beautify from 'js-beautify';
	import 'prismjs/components/prism-javascript';
	import 'prismjs/components/prism-css';
	import 'prismjs/components/prism-markup';

	import { onMount } from 'svelte';
	import { generateUnformattedCss, generateUnformattedHtml } from '$lib/helpers';

	let formatOpts = {
		inline: [''],
		wrap_line_length: 100,
		indent_size: 2,
		preserve_newlines: true,
		indent_inner_html: true,
		unformatted: [''], // Consider specifying tags or remove if not needed
		content_unformatted: [''] // Same as above
	};

	const codeToDisplay = {
		html: generateUnformattedHtml() || '',
		css: generateUnformattedCss() || ''
		// javascript: ''
	};

	const beautifyFunctions = {
		html: beautify.html,
		css: beautify.css,
		js: beautify.js
	};

	const prismLanguages = {
		html: Prism.languages.markup,
		css: Prism.languages.css,
		js: Prism.languages.javascript
	};

	let formattedCode, activeIndex;
	let copyBtn;
	let selectedSnippet = Object.entries(codeToDisplay)[0];
	let success;

	function formatAndHighlightCode(index, code, tech) {
		activeIndex = index;
		const beautifyFunction = beautifyFunctions[tech] || ((x) => x);
		const language = prismLanguages[tech] || Prism.languages.markup;
		selectedSnippet = Object.entries(codeToDisplay)[index];

		if (!code) {
			formattedCode = `<pre>${tech} snippet not included.</pre>`;
		} else {
			formattedCode = Prism.highlight(beautifyFunction(code, formatOpts), language, tech);
		}
	}

	function copy() {
		const beautifyFunction = beautifyFunctions[selectedSnippet[0]] || ((x) => x);
		navigator.clipboard
			.writeText(beautifyFunction(selectedSnippet[1], formatOpts))
			.then(() => {
				success = true;
				setTimeout(() => (success = false), 1000);
			})
			.catch(() => alert('Failed to copy!')); // Basic error handling
	}

	onMount(() => {
		formatAndHighlightCode(0, codeToDisplay.html, 'html');
	});
</script>

<div id="preview-block">
	<div class="preview-container">
		<button
			class="btn"
			onclick={copy}
			class:success
			bind:this={copyBtn}
			disabled={!selectedSnippet[1]}
		>
			copy
		</button>
		<div class="options">
			{#each Object.entries(codeToDisplay) as [tech, snippet], i}
				<button
					class="btn"
					onclick={() => formatAndHighlightCode(i, snippet, tech)}
					class:active={i === activeIndex}
					disabled={i === activeIndex || !snippet}
				>
					{tech}
				</button>
			{/each}
		</div>
	</div>
	<div class="display">
		<pre>{@html formattedCode}</pre>
	</div>
</div>
