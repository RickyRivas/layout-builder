<script lang="ts">
	import RadioButtonGroup from '$lib/components/RadioButtonGroup.svelte';
	import { getPropertyValue } from '$lib/helpers';
	import { updateIframeStylesheet } from '$lib/shared.svelte';

	const weightValues = [
		{ value: '400', label: 'Regular' },
		{ value: '500', label: 'Medium' },
		{ value: '600', label: 'Semibold' },
		{ value: '700', label: 'Bold' }
	];

	let fontWeight = $state();
	let prevValue = $state(null);

	$effect(() => {
		const newValue = getPropertyValue('fontWeight');

		if (newValue !== fontWeight) {
			prevValue = newValue;
			fontWeight = newValue;
		}
	});
</script>

<h3>Font Weight</h3>
<RadioButtonGroup>
	{#snippet content()}
		{#each weightValues as { value, label }}
			<input
				type="radio"
				id="font-weight-{value}"
				{value}
				bind:group={fontWeight}
				onchange={() => {
					updateIframeStylesheet('font-weight', value);
				}}
			/>
			<label for="font-weight-{value}">
				{label}
			</label>
		{/each}
	{/snippet}
</RadioButtonGroup>
