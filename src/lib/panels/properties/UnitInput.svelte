<script>
	import { iframeState } from '$lib/shared.svelte';

	let { value, onUpdate, name, label = '' } = $props();
	let currentElement = $state(null);

	const units = ['px', 'em', 'rem', '%', 'auto', 'none'];
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
			// Special handling for 'auto'
			if (value === 'auto' || value === 'none') {
				numericValue = '';
				currentUnit = 'auto';
				return;
			}

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
		if (newUnit === 'auto' || value === 'none') {
			onUpdate('auto');
			return;
		}

		if (newNumericValue) {
			// Convert to integer
			const intValue = parseInt(newNumericValue);
			if (!isNaN(intValue)) {
				const newValue = `${intValue}${newUnit}`;
				onUpdate(newValue);
			}
		}
	}

	$effect(() => {
		if (currentUnit === 'auto') {
			numericValue = '';
		}
	});

	function changeUnit(newUnit) {
		currentUnit = newUnit;
		updateValue(numericValue, newUnit);
		showUnitsList = false;
	}
</script>

<div class="unit-input">
	<label for="unit-input-{name}">
		{#if label}
			{label}
		{/if}
		<input
			id="unit-input-{name}"
			name="unit-input-{name}"
			type="text"
			bind:value={numericValue}
			oninput={() => updateValue(numericValue, currentUnit)}
		/>
	</label>
	<button
		class="unit-button"
		onclick={(e) => {
			showUnitsList = !showUnitsList;
			const newIndex = showUnitsList ? '1' : 'auto';
			e.target.parentElement.style.zIndex = newIndex;
		}}
	>
		{currentUnit}
	</button>

	{#if showUnitsList}
		<div class="units-list">
			{#each units as unit}
				<button
					class="unit-option"
					class:active={unit === currentUnit}
					onclick={(e) => changeUnit(unit)}
				>
					{unit}
				</button>
			{/each}
		</div>
	{/if}
</div>

<style lang="less">
	.unit-input {
		display: flex;
		position: relative;

		input {
			text-align: center;
			width: 100%;
		}

		.units-list {
			position: absolute;
			top: 100%;
			right: 0;
			display: flex;
			flex-direction: column;
			align-items: stretch;
			text-align: center;
			padding: 2px;
			width: 100%;
			background-color: var(--primary);
		}
	}
</style>
