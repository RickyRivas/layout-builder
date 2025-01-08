<script lang="ts">
	import { getPropertyValue } from '$lib/helpers';
	import { updateIframeStylesheet } from '$lib/shared.svelte';
	import { fontSizeUnits } from '$lib/units';
	import UnitInput from '../UnitInput.svelte';

	let fontSize = $state('');
	let prevValue = null; // Track previous value

	$effect(() => {
		const newValue = getPropertyValue('fontSize', '', true);

		// Only update if value actually changed
		if (newValue !== prevValue) {
			prevValue = newValue;
			fontSize = newValue;
		}
	});
</script>

<div class="form-control">
	<UnitInput
		allowedUnits={fontSizeUnits}
		label="Font Size"
		name={'font-size'}
		value={fontSize}
		onUpdate={(e) => updateIframeStylesheet('font-size', e)}
	/>
</div>
