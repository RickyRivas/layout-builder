<script lang="ts">
	import RadioButtonGroup from '$lib/components/RadioButtonGroup.svelte';
	import { getPropertyValue } from '$lib/helpers';
	import { updateIframeStylesheet } from '$lib/shared.svelte';

	const alignValues = ['start', 'left', 'center', 'right', 'justify'];

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

<h3>Text Align</h3>
<RadioButtonGroup>
	{#snippet content()}
		{#each alignValues as value}
			<input
				type="radio"
				name="text-align"
				id="text-align-{value}"
				{value}
				bind:group={textAlignValue}
				onchange={() => updateIframeStylesheet('text-align', textAlignValue)}
			/>
			<label for="text-align-{value}">
				{value}
			</label>
		{/each}
	{/snippet}
</RadioButtonGroup>
