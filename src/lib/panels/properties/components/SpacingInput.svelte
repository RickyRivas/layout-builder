<script>
	import { iframeState } from '$lib/shared.svelte';

	let { value, onUpdate } = $props();
	let currentElement = $state(null);

	const units = ['px', 'em', 'rem', '%'];
	let showUnitsList = $state(false);
	let currentUnit = $state('px');
	let numericValue = $state('');

	// When value prop changes, parse it into numeric and unit parts
	$effect(() => {
		if (!iframeState.selected) return;

		// Reset values if element changed
		if (currentElement !== iframeState.selected) {
			numericValue = '';
			currentUnit = 'px';
			currentElement = iframeState.selected;
		}

		if (value) {
			const match = value.match(/^([\d.]+)(\D+)$/);
			if (match) {
				// Convert to integer
				const intValue = parseInt(match[1]);
				numericValue = isNaN(intValue) ? '' : intValue.toString();
				currentUnit = match[2];
			}
		}
	});

	function updateValue(newNumericValue, newUnit) {
		if (newNumericValue) {
			// Convert to integer
			const intValue = parseInt(newNumericValue);
			if (!isNaN(intValue)) {
				const newValue = `${intValue}${newUnit}`;
				onUpdate(newValue);
			}
		}
	}

	function changeUnit(newUnit) {
		currentUnit = newUnit;
		updateValue(numericValue, newUnit);
		showUnitsList = false;
	}
</script>

<div class="spacing-input">
	<input
		type="text"
		bind:value={numericValue}
		oninput={() => updateValue(numericValue, currentUnit)}
	/>
	<button class="unit-button" onclick={() => (showUnitsList = !showUnitsList)}>
		{currentUnit}
	</button>

	{#if showUnitsList}
		<div class="units-list">
			{#each units as unit}
				<button
					class="unit-option"
					class:active={unit === currentUnit}
					onclick={() => changeUnit(unit)}
				>
					{unit}
				</button>
			{/each}
		</div>
	{/if}
</div>

<style lang="less">
	.spacing-input {
		display: flex;
		position: relative;

		input {
			text-align: center;
		}

		.units-list {
			position: absolute;
			top: 100%;
			right: 0;
			text-align: center;
			background-color: var(--primary);
		}
	}
</style>
