<script lang="ts">
	import PanelGroup from '$lib/components/PanelGroup.svelte';
	import { getPropertyValue } from '$lib/helpers';
	import { updateIframeStylesheet } from '$lib/shared.svelte';

	let backgroundColor = $state('');
	let prevValue = null; // Track previous value

	$effect(() => {
		const newValue = getPropertyValue('background-color', '', true);

		// Only update if value actually changed
		if (newValue !== prevValue) {
			prevValue = newValue;
			backgroundColor = newValue;
		}
	});
</script>

<PanelGroup title="Background">
	{#snippet panelContent()}
		<div class="form-control">
			<label for="input-background-color">background-color</label>
			<input
				id="input-background-color"
				type="color"
				bind:value={backgroundColor}
				onchange={(e) => {
					updateIframeStylesheet('background-color', e.target.value);
				}}
			/>
		</div>
	{/snippet}
</PanelGroup>
