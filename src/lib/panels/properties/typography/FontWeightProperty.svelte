<script lang="ts">
	import RadioButtonGroup from '$lib/components/RadioButtonGroup.svelte';
	import { getPropertyValue } from '$lib/helpers';
	import { updateIframeStylesheet } from '$lib/shared.svelte';

	const weightValues = [
		{ value: '300', label: '300 - Light' },
		{ value: '400', label: '400 - Regular' },
		{ value: '500', label: '500 - Medium' },
		{ value: '600', label: '600 - Semibold' },
		{ value: '700', label: '700 - Bold' }
	];

	let fontWeight = $state();
	let prevValue = $state(null);

	$effect(() => {
		const newValue = getPropertyValue('fontWeight', '', true);

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
					console.log(value);
					updateIframeStylesheet('font-weight', value);
				}}
			/>
			<label for="font-weight-{value}">
				{label}
			</label>
		{/each}
	{/snippet}
</RadioButtonGroup>
