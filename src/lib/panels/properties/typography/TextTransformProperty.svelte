<script lang="ts">
	import RadioButton from '$lib/components/RadioButton.svelte';
	import RadioButtonGroup from '$lib/components/RadioButtonGroup.svelte';
	import { getPropertyValue } from '$lib/helpers';
	import { textTransforms } from '$lib/properties';
	import { updateIframeStylesheet } from '$lib/shared.svelte';

	let textTransformValue = $state('');
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

<RadioButtonGroup label={'Text Transform'}>
	{#snippet content()}
		{#each textTransforms as { value, label, path }}
			<RadioButton
				group={textTransformValue}
				{value}
				{label}
				{path}
				property="text-transform"
				onChange={(newValue) => {
					updateIframeStylesheet('text-transform', newValue);
				}}
			/>
		{/each}
	{/snippet}
</RadioButtonGroup>
