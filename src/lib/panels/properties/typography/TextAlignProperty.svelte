<script lang="ts">
	import RadioButton from '$lib/components/RadioButton.svelte';
	import RadioButtonGroup from '$lib/components/RadioButtonGroup.svelte';
	import { getPropertyValue } from '$lib/helpers';
	import { textAlignValues } from '$lib/properties';
	import { updateIframeStylesheet } from '$lib/shared.svelte';

	let textAlignValue = $state('');
	let prevValue = $state(null);

	$effect(() => {
		let newValue = getPropertyValue('textAlign', '', true);
		if (newValue !== prevValue) {
			prevValue = newValue;
			textAlignValue = prevValue;
		}
	});
</script>

<RadioButtonGroup label="Text Align">
	{#snippet content()}
		{#each textAlignValues as { value, label, path }}
			<RadioButton
				group={textAlignValue}
				{value}
				{label}
				{path}
				property="text-align"
				onChange={(newValue) => {
					updateIframeStylesheet('text-align', newValue);
				}}
			/>
		{/each}
	{/snippet}
</RadioButtonGroup>
