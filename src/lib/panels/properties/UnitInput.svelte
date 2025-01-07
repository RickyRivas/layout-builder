<script>
	import { iframeState } from '$lib/shared.svelte';

	let { value, onUpdate, name, label = '', allowedUnits } = $props();
	let currentElement = $state(null);

	let showUnitsList = $state(false);
	let currentUnit = $state('px');
	let numericValue = $state('');

	$effect(() => {
		if (!iframeState.selected) return;

		// Reset values if element changed
		if (currentElement !== iframeState.selected) {
			numericValue = '';
			currentUnit = 'px';
			currentElement = iframeState.selected;
		}

		if (value) {
			// Handle special values
			if (['auto', 'none', '0'].includes(value)) {
				numericValue = value === '0' ? '0' : '';
				currentUnit = value;
				return;
			}

			// Parse numeric values with units
			const match = value.match(/^([\d.]+)(\D+)$/);
			if (match) {
				const intValue = parseInt(match[1]);
				numericValue = isNaN(intValue) ? '' : intValue.toString();
				currentUnit = match[2];
			}
		}
	});

	function updateValue(newNumericValue, newUnit) {
		// Handle special values
		if (['auto', 'none'].includes(newUnit)) {
			onUpdate(newUnit);
			return;
		}

		// Handle numeric values
		if (newNumericValue || newNumericValue === '0') {
			const intValue = parseInt(newNumericValue);
			if (!isNaN(intValue) || newNumericValue === '0') {
				const newValue = `${intValue}${newUnit}`;
				onUpdate(newValue);
			}
		}
	}

	$effect(() => {
		if (['auto', 'none'].includes(currentUnit)) {
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
	{#if label}
		<label for="unit-input-{name}">
			{label}
		</label>
	{/if}
	<div>
		<input
			id="unit-input-{name}"
			name="unit-input-{name}"
			type="text"
			value={['auto', 'none'].includes(currentUnit) ? currentUnit : numericValue}
			disabled={['auto', 'none'].includes(currentUnit)}
			oninput={(e) => updateValue(e.target.value, currentUnit)}
		/>
		<button class="unit-button" onclick={() => (showUnitsList = !showUnitsList)}>
			{currentUnit}
		</button>
	</div>

	{#if showUnitsList}
		<div class="units-list">
			{#each allowedUnits as unit}
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
	.unit-input {
		display: block;
		position: relative;

		label {
			width: 100%;
			display: block;
		}

		input {
			width: 100%;
		}

		& > div {
			display: flex;
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
