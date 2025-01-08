<script lang="ts">
	import { getPropertyValue } from '$lib/helpers';
	import { updateIframeStylesheet } from '$lib/shared.svelte';

	let color = $state('');
	let prevValue = null; // Track previous value

	$effect(() => {
		const newValue = getPropertyValue('color', '', true);

		// Only update if value actually changed
		if (newValue !== prevValue) {
			prevValue = newValue;
			color = newValue;
		}
	});
</script>

<div class="form-control">
	<label for="input-color">Color</label>
	<input
		id="input-color"
		type="color"
		bind:value={color}
		onchange={(e) => {
			updateIframeStylesheet('color', e.target.value);
		}}
	/>
</div>
