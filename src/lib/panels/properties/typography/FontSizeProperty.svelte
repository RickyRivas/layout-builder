<script lang="ts">
	import { getPropertyValue } from '$lib/helpers';
	import { updateIframeStylesheet } from '$lib/shared.svelte';
	import { fontSizeUnits } from '$lib/units';
	import UnitInput from '../UnitInput.svelte';

	let fontSize = $state('');
	let prevValue = null; // Track previous value

	$effect(() => {
		const newValue = getPropertyValue('fontSize');

		// Only update if value actually changed
		if (newValue !== prevValue) {
			prevValue = newValue;
			fontSize = newValue;
		}
	});
</script>

<h3>Font Size</h3>
<UnitInput
	allowedUnits={fontSizeUnits}
	name={'font-size'}
	value={fontSize}
	onUpdate={(e) => updateIframeStylesheet('font-size', e)}
/>
