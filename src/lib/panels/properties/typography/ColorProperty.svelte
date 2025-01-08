<script lang="ts">
	import ColorPicker from '$lib/components/ColorPicker.svelte';
	import { getPropertyValue } from '$lib/helpers';
	import { updateIframeStylesheet } from '$lib/shared.svelte';

	let prevValue = null;
	let color = $state('#000000');

	$effect(() => {
		const newValue = getPropertyValue('color', '', true);

		if (newValue !== prevValue) {
			prevValue = newValue;
			color = newValue;
		}
	});

	function handleColorUpdate(newColor) {
		color = newColor;
		updateIframeStylesheet('color', newColor);
	}
</script>

<ColorPicker value={color} onUpdate={handleColorUpdate} />
