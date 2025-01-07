<script lang="ts">
	import { updateIframeStylesheet } from '$lib/shared.svelte';
	import UnitInput from '$lib/panels/properties/UnitInput.svelte';
	import { lineHeightUnits } from '$lib/units';
	import { getPropertyValue } from '$lib/helpers';

	let value = $state('');
	let prevValue = null; // Track previous value

	$effect(() => {
		const newValue = getPropertyValue('lineHeight');

		// Only update if value actually changed
		if (newValue !== prevValue) {
			prevValue = newValue;
			value = newValue;
		}
	});
</script>

<h3>Line Height</h3>
<UnitInput
	{value}
	name="line-height"
	allowedUnits={lineHeightUnits}
	onUpdate={(newValue) => updateIframeStylesheet('line-height', newValue)}
/>
