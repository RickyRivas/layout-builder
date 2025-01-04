<script lang="ts">
	import { findDefaultPropertyValue } from '$lib/helpers';
	import { iframeState, updateIframeStylesheet } from '$lib/shared.svelte';
	import { displayValues } from '$lib/properties';
	import PropertyGroup from './PropertyGroup.svelte';

	let selectedDisplayValue = $state();

	function handlePropertyChange(value) {
		if (!iframeState.selected) return;

		selectedDisplayValue = value;
		updateIframeStylesheet(iframeState.selected, 'display', value);
	}

	// watch for when an element is selected or created
	$effect(() => {
		if (!iframeState.selected) return;

		const computedValue = findDefaultPropertyValue(iframeState.selected, 'display', displayValues);

		// only update if value has changed
		if (computedValue !== selectedDisplayValue) {
			selectedDisplayValue = computedValue;
		}
	});
</script>

<PropertyGroup title="Display">
	{#snippet propertyContent()}
		<div class="chips-radio-group">
			{#each displayValues as value, i}
				<input
					type="radio"
					name="display-property"
					id="display-property-{value}"
					{value}
					checked={value === selectedDisplayValue}
					onchange={() => handlePropertyChange(value)}
				/>
				<label for="display-property-{value}">
					{value}
				</label>
			{/each}
		</div>
	{/snippet}
</PropertyGroup>
