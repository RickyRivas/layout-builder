<script lang="ts">
	import { findDefaultPropertyValue } from '$lib/helpers';
	import { iframeState, updateIframeStylesheet } from '../../routes/shared.svelte';
	import { displayValues } from '$lib/properties';

	let selectedDisplayValue = $state();

	// watch for when an element is selected or created
	$effect(() => {
		if (iframeState.selected) {
			selectedDisplayValue = findDefaultPropertyValue(
				iframeState.selected,
				'display',
				displayValues
			);
		}
	});
</script>

<h3>Display Property</h3>
{#each displayValues as value, i}
	<label for="display-property-{value}">
		<input
			type="radio"
			name="display-property"
			id="display-property-{value}"
			{value}
			checked={value === selectedDisplayValue}
			onchange={() => {
				selectedDisplayValue = value;
				updateIframeStylesheet(iframeState.selected, 'display', value);
			}}
		/>
		{value}
	</label>
{/each}
