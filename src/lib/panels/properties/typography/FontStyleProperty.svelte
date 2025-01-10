<script lang="ts">
	import DynamicIcon from '$lib/components/DynamicIcon.svelte';
	import RadioButton from '$lib/components/RadioButton.svelte';
	import RadioButtonGroup from '$lib/components/RadioButtonGroup.svelte';
	import { getPropertyValue } from '$lib/helpers';
	import { fontStyles } from '$lib/properties';
	import { updateIframeStylesheet } from '$lib/shared.svelte';
	let fontStyle = $state('');
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

<RadioButtonGroup label={'Font Style'}>
	{#snippet content()}
		{#each fontStyles as { value, label, path }}
			<RadioButton
				group={fontStyle}
				{value}
				{label}
				{path}
				property="font-style"
				onChange={(newValue) => {
					updateIframeStylesheet('font-style', newValue);
				}}
			/>
		{/each}
	{/snippet}
</RadioButtonGroup>
