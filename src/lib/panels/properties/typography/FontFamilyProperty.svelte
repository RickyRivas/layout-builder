<script lang="ts">
	import { iframeState, updateIframeStylesheet } from '$lib/shared.svelte';

	// store in global style iframe state later
	const availableFonts = ['Inter', 'Roboto Slab', 'Playfair Display'];

	let selectedFont = $state('');

	$effect(() => {
		if (!iframeState.selected) return;
		selectedFont = getComputedStyle(iframeState.selected).fontFamily;
	});

	function updateFont(font) {
		updateIframeStylesheet(
			'font-family',
			`"${font}", ${font.includes(' ') ? 'serif' : 'sans-serif'}`
		);
	}
</script>

<h3>Font Family</h3>
<div class="chips-radio-group">
	{#each availableFonts as font}
		<input
			type="radio"
			name="font-family"
			id="font-family-{font}"
			class:active={selectedFont.split(',')[0].replace(/['"]/g, '').trim() === font}
			value={font}
			bind:group={selectedFont}
			onchange={() => updateFont(font)}
		/>
		<label for="font-family-{font}" style:font-family={font}>
			{font}
		</label>
	{/each}
</div>
