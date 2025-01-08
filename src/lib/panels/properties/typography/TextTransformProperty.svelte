<script lang="ts">
	import RadioButtonGroup from '$lib/components/RadioButtonGroup.svelte';
	import { getPropertyValue } from '$lib/helpers';
	import { updateIframeStylesheet } from '$lib/shared.svelte';

	let textTransformValue = $state('');
	let textTransforms = ['none', 'capitalize', 'uppercase', 'lowercase'];
	let prevValue = null; // Track previous value

	$effect(() => {
		const newValue = getPropertyValue('textTransform', '', true);

		// Only update if value actually changed
		if (newValue !== prevValue) {
			prevValue = newValue;
			textTransformValue = newValue;
		}
	});
</script>

<h3>Text Transform</h3>
<RadioButtonGroup>
	{#snippet content()}
		{#each textTransforms as value}
			<input
				type="radio"
				id="text-transform-{value}"
				{value}
				bind:group={textTransformValue}
				onchange={() => {
					updateIframeStylesheet('text-transform', value);
				}}
			/>
			<label for="text-transform-{value}">
				{value}
			</label>
		{/each}
	{/snippet}
</RadioButtonGroup>
