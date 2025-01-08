<script lang="ts">
	import ColorPicker from '$lib/components/ColorPicker.svelte';
	import PanelGroup from '$lib/components/PanelGroup.svelte';
	import { getPropertyValue } from '$lib/helpers';
	import { updateIframeStylesheet } from '$lib/shared.svelte';

	let backgroundColor = $state('#000000');
	let prevValue = null; // Track previous value

	$effect(() => {
		const newValue = getPropertyValue('background-color', '', true);

		// Only update if value actually changed
		if (newValue !== prevValue) {
			prevValue = newValue;
			backgroundColor = newValue;
		}
	});

	function handleColorUpdate(newColor) {
		backgroundColor = newColor;
		updateIframeStylesheet('background-color', newColor);
	}
</script>

<PanelGroup title="Background">
	{#snippet panelContent()}
		<ColorPicker value={backgroundColor} onUpdate={handleColorUpdate} />
	{/snippet}
</PanelGroup>
