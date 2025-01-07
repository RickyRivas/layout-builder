<!-- panels/properties/typography/FontWeightProperty.svelte -->
<script lang="ts">
	import { iframeState, updateIframeStylesheet } from '$lib/shared.svelte';

	const weightValues = [
		{ value: '400', label: 'Regular' },
		{ value: '500', label: 'Medium' },
		{ value: '600', label: 'Semibold' },
		{ value: '700', label: 'Bold' }
	];

	let selectedWeight = $state('');

	$effect(() => {
		if (!iframeState.selected) return;
		selectedWeight = getComputedStyle(iframeState.selected).fontWeight;
	});

	function updateWeight(value: string) {
		updateIframeStylesheet('font-weight', value);
	}
</script>

<h3>Font Weight</h3>
<div class="chips-radio-group">
	{#each weightValues as { value, label }}
		<input
			type="radio"
			name="font-weight"
			id="font-weight-{value}"
			{value}
			bind:group={selectedWeight}
			onchange={() => updateWeight(value)}
		/>
		<label for="font-weight-{value}">
			{label}
		</label>
	{/each}
</div>
