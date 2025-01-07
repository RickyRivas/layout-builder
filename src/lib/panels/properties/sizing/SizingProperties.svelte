<script lang="ts">
	import { iframeState, updateIframeStylesheet } from '$lib/shared.svelte';
	import UnitInput from '$lib/panels/properties/UnitInput.svelte';
	import { getSelectorForStyle } from '$lib/helpers';
	import PanelGroup from '$lib/components/PanelGroup.svelte';

	let sizing = $state({
		// Width values
		['width']: '',
		['min-width']: '',
		['max-width']: '',
		// Height values
		['height']: '',
		['min-height']: '',
		['max-height']: ''
	});

	// Watch for element selection
	$effect(() => {
		if (!iframeState.selected) return;

		// Find matching rule in stylesheet
		const rules = Array.from(iframeState.stylesheet.cssRules);
		const selector = getSelectorForStyle(); // your selector function

		const existingRule = rules.find((rule) => rule.selectorText === selector);

		sizing.width = existingRule?.style.width || 'auto';
		sizing['min-width'] = existingRule?.style.minWidth || 'auto';
		sizing['max-width'] = existingRule?.style.maxWidth || 'none';

		sizing.height = existingRule?.style.height || 'auto';
		sizing['min-height'] = existingRule?.style.minHeight || 'auto';
		sizing['min-height'] = existingRule?.style.maxHeight || 'none';
	});
</script>

<PanelGroup title="Sizing">
	{#snippet panelContent()}
		{#each Object.entries(sizing) as [key, value]}
			<div class="form-control">
				<UnitInput
					name={key}
					label={key.replaceAll('-', ' ')}
					{value}
					onUpdate={(e) => {
						updateIframeStylesheet(key, e);
					}}
				/>
			</div>
		{/each}
	{/snippet}
</PanelGroup>
