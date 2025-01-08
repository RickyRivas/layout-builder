<script lang="ts">
	import RadioButtonGroup from '$lib/components/RadioButtonGroup.svelte';
	import { getPropertyValue } from '$lib/helpers';
	import { updateIframeStylesheet } from '$lib/shared.svelte';

	let fontStyle = $state('');
	let fontStyles = ['normal', 'italic', 'oblique'];
	let prevValue = null; // Track previous value

	$effect(() => {
		const newValue = getPropertyValue('fontStyle', '', true);

		// Only update if value actually changed
		if (newValue !== prevValue) {
			prevValue = newValue;
			fontStyle = newValue;
		}
	});
</script>

<h3>Font Style</h3>
<RadioButtonGroup>
	{#snippet content()}
		{#each fontStyles as value}
			<input
				type="radio"
				id="font-style-{value}"
				{value}
				bind:group={fontStyle}
				onchange={() => {
					updateIframeStylesheet('font-style', value);
				}}
			/>
			<label for="font-style-{value}">
				{value}
			</label>
		{/each}
	{/snippet}
</RadioButtonGroup>
