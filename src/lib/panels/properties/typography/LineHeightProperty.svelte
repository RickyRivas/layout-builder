<script lang="ts">
	import { updateIframeStylesheet } from '$lib/shared.svelte';
	import UnitInput from '$lib/panels/properties/UnitInput.svelte';
	import { lineHeightUnits } from '$lib/units';
	import { getPropertyValue } from '$lib/helpers';

	let value = $state('');
	let prevValue = null; // Track previous value

	$effect(() => {
		const newValue = getPropertyValue('lineHeight', 'normal', true);

		// Only update if value actually changed
		if (newValue !== prevValue) {
			prevValue = newValue;
			value = newValue;
		}
	});
</script>

<UnitInput
	{value}
	width="half"
	label="Line Height"
	name="line-height"
	allowedUnits={lineHeightUnits}
	onUpdate={(newValue) => updateIframeStylesheet('line-height', newValue)}
/>
