<script lang="ts">
	import { getSelectorForStyle } from '$lib/helpers';
	import { iframeState, updateIframeStylesheet } from '$lib/shared.svelte';
	import UnitInput from '../UnitInput.svelte';

	let fontSize = $state('');

	$effect(() => {
		if (!iframeState.selected) return;
		const rules = Array.from(iframeState.stylesheet.cssRules);
		const selector = getSelectorForStyle();
		const existingRule = rules.find(
			(rule) => rule instanceof CSSStyleRule && rule.selectorText === selector
		);

		// Use computed style if no declared style exists
		fontSize = existingRule?.style.fontSize || getComputedStyle(iframeState.selected).fontSize;
	});
</script>

<h3>Font Size</h3>
<UnitInput
	name={'font-size'}
	value={fontSize}
	onUpdate={(value) => updateIframeStylesheet('font-size', value)}
/>
