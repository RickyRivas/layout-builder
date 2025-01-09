<script>
	import { iframeState } from '$lib/shared.svelte';

	let { value, onUpdate, name, label = '', allowedUnits } = $props();
	let currentElement = $state(null);

	let showUnitsList = $state(false);
	let currentUnit = $state('px');
	let numericValue = $state('');
	let inputValue = $state();

	$effect(() => {
		if (!iframeState.selected) return;

		// Reset values if element changed
		if (currentElement !== iframeState.selected) {
			numericValue = '';
			currentUnit = 'px';
			currentElement = iframeState.selected;
		}

		if (value) {
			inputValue = ['auto', 'none', 'normal'].includes(currentUnit) ? currentUnit : numericValue;

			// Handle special values
			if (['auto', 'none', '0', 'normal'].includes(value)) {
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
		console.log('updateValue()', newNumericValue, newUnit);
		// Handle special values
		if (['auto', 'none', 'normal'].includes(newUnit)) {
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

		// no value, will also remove from stylesheet
		if (!newNumericValue) {
			onUpdate(0);
		}
	}

	$effect(() => {
		if (['auto', 'none'].includes(currentUnit)) {
			numericValue = '';
		}
	});

	// no value
	$effect(() => {
		if (!inputValue) inputValue = 0;
	});

	function changeUnit(newUnit) {
		currentUnit = newUnit;
		updateValue(numericValue, newUnit);
		showUnitsList = false;
	}
</script>

<div class="form-control" style:z-index={showUnitsList ? 777 : 'auto'}>
	<div class="unit-input-container">
		{#if label}
			<label for="unit-input-{name}">
				{label}
			</label>
		{/if}
		<div class="unit-input-field">
			<input
				id="unit-input-{name}"
				name="unit-input-{name}"
				type="text"
				bind:value={inputValue}
				disabled={['auto', 'none', 'normal'].includes(currentUnit)}
				oninput={(e) => updateValue(e.target.value, currentUnit)}
			/>
			<button class="unit-list-button" onclick={() => (showUnitsList = !showUnitsList)}>
				{currentUnit}
			</button>
		</div>

		{#if showUnitsList}
			<div class="unit-input-list">
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
</div>

<style lang="less">
	.unit-input-container {
		display: block;
		position: relative;

		.unit-input-field {
			display: flex;
			position: relative;
			border-radius: var(--border-radius);
			background: var(--border-color);

			.unit-list-button {
				border-radius: 0px;
				border: 0;
				font-size: 12px;
				line-height: 40px;
				background: none;
				padding: 0 1em;
				text-transform: uppercase;
				background-color: var(--for);
			}
		}

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

		.unit-input-list {
			display: flex;
			flex-direction: column;
			gap: 2px;
			position: absolute;
			top: calc(100% + 2px);
			background-color: #fff;
			padding: 2px;
			width: 100%;
			border-radius: var(--border-radius);
			box-shadow: var(--box-shadow);

			.unit-option {
				display: block;
				width: 100%;
				text-align: center;
				font-size: 16px;
				line-height: 40px;
				border: 0px;
				background-color: #fff;
				border-radius: calc(var(--border-radius) / 2);
				transition: background-color 0.33s ease;
				&:hover,
				&.selected {
					background-color: var(--border-color);
				}
			}
		}
	}
</style>
