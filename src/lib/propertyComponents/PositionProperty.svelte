<script>
	import { findDefaultPropertyValue } from '$lib/helpers';
	import { positionValues, offsetProperties } from '$lib/properties';
	import { iframeState, updateIframeStylesheet } from '../../routes/shared.svelte';

	let selectedPositionValue = $state();

	let offsetValues = $state({
		top: '',
		right: '',
		bottom: '',
		left: '',
		zIndex: ''
	});

	$effect(() => {
		if (iframeState.selected) {
			// update pos values
			selectedPositionValue = findDefaultPropertyValue(
				iframeState.selected,
				'position',
				positionValues
			);

			// update offset values
			offsetProperties.forEach((prop) => {
				offsetValues[prop] = getComputedStyle(iframeState.selected)[prop];
			});
		}
	});

	function updateOffsetValue(property, value) {
		updateIframeStylesheet(iframeState.selected, property, value);
		offsetValues[property] = value;
	}
</script>

<h3>Position</h3>
{#each positionValues as value, i}
	<label for="position-property-{value}">
		<input
			type="radio"
			name="position-property"
			id="position-property-{value}"
			{value}
			checked={value === selectedPositionValue}
			onchange={() => {
				selectedPositionValue = value;
				updateIframeStylesheet(iframeState.selected, 'position', value);
			}}
		/>
		{value}
	</label>
{/each}

{#if selectedPositionValue === 'absolute' || selectedPositionValue === 'relative' || selectedPositionValue === 'fixed'}
	<div class="offset-controls">
		<h4>Offset</h4>
		{#each offsetProperties as property}
			<div class="form-control">
				<label for="offset-control-{property}">
					{property}
					<input
						type="text"
						bind:value={offsetValues[property]}
						name="offset-control"
						id="offset-control-{property}"
						onchange={(e) => updateOffsetValue(updateOffsetValue(property, e.target.value))}
					/>
				</label>
			</div>
		{/each}
	</div>
{/if}
